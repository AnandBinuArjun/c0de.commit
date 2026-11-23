import React from "react";
import { z } from "zod";
import { ExternalLink, GitBranch, Star } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import { formatDate } from "@/lib/utils";

const repoSchema = z.array(
  z.object({
    name: z.string(),
    html_url: z.string().url(),
    description: z.string().nullable(),
    language: z.string().nullable(),
    stargazers_count: z.number(),
    pushed_at: z.string(),
    fork: z.boolean(),
  })
);

type Repo = z.infer<typeof repoSchema>[number];

async function loadRepos(): Promise<Repo[] | null> {
  try {
    const res = await fetch(
      "https://api.github.com/users/AnandBinuArjun/repos?sort=pushed&per_page=12",
      { headers: { Accept: "application/vnd.github+json" }, next: { revalidate: 3600 } }
    );
    if (!res.ok) return null;
    const parsed = repoSchema.safeParse(await res.json());
    if (!parsed.success) return null;
    return parsed.data.filter((r) => !r.fork && r.html_url.startsWith("https://github.com/")).slice(0, 6);
  } catch {
    return null;
  }
}

/** Server component: live data from the public GitHub API, validated with Zod. */
export async function GithubActivity() {
  const repos = await loadRepos();

  return (
    <div className="space-y-4">
      {repos && repos.length > 0 ? (
        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {repos.map((r) => (
            <li key={r.name}>
              <a href={r.html_url} target="_blank" rel="noopener noreferrer" className="flex h-full min-h-[44px] flex-col gap-2 rounded-xl border border-brand-border/70 bg-background-elevated/50 p-4 transition-colors hover:border-brand-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/50">
                <span className="flex items-center justify-between gap-2">
                  <span className="flex items-center gap-2 font-mono text-sm text-text-primary"><GitBranch className="h-4 w-4 text-brand-primary" />{r.name}</span>
                  <ExternalLink className="h-3.5 w-3.5 text-text-muted" aria-hidden />
                </span>
                <span className="line-clamp-2 text-xs text-text-secondary">{r.description ?? "No description provided."}</span>
                <span className="mt-auto flex items-center gap-3 font-mono text-[11px] text-text-muted">
                  {r.language ? <span>{r.language}</span> : null}
                  <span className="inline-flex items-center gap-1"><Star className="h-3 w-3" />{r.stargazers_count}</span>
                  <span>Pushed {formatDate(r.pushed_at)}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p className="rounded-xl border border-brand-border/70 bg-background-elevated/50 p-5 text-sm text-text-secondary">
          Live repository activity is unavailable right now. Browse everything directly at{" "}
          <a href={SITE_CONFIG.githubProfileUrl} target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">{SITE_CONFIG.githubProfileUrl}</a>.
        </p>
      )}
      <p className="font-mono text-[11px] text-text-muted">Source: public GitHub API, refreshed hourly. Shows non-fork repositories only.</p>
    </div>
  );
}
