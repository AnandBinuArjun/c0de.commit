"use client";

import React, { useCallback, useEffect, useState } from "react";
import { CheckCircle2, Lightbulb, Trophy } from "lucide-react";
import { digestHex } from "@/lib/security/lab-engine";
import { ToolFrame, buttonCls, inputCls, labelCls } from "@/components/tools/lab-ui";
import { cn } from "@/lib/utils";

interface Challenge {
  id: string;
  title: string;
  category: string;
  points: number;
  prompt: string;
  data: string;
  hint: string;
  /** SHA-256 of the normalised answer (lowercased, whitespace removed). */
  answerHash: string;
}

const JWT_CHALLENGE_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJndWVzdCIsIm5vdGUiOiJjY3tqd3RfcGF5bG9hZHNfYXJlX3JlYWRhYmxlfSJ9.c2lnbmF0dXJl";

const CHALLENGES: Challenge[] = [
  {
    id: "encoding",
    title: "Not encryption",
    category: "Encoding",
    points: 10,
    prompt: "This string was 'protected' with an encoding, not a key. Recover the flag (format: CC{...}).",
    data: "Q0N7QkFTRTY0X0lTX05PVF9FTkNSWVBUSU9OfQ==",
    hint: "The trailing '==' is a strong clue about the encoding. Try the lab's encoding workbench.",
    answerHash: "135c9816a4d6409ed733e5ac28ac778b1cd8d23f17bd5baed5026ab6a4d5501f",
  },
  {
    id: "caesar",
    title: "Julius would be disappointed",
    category: "Classical crypto",
    points: 15,
    prompt: "A shift cipher with a small fixed shift hides this flag (letters only; punctuation is unchanged). Recover the flag.",
    data: "ff{fdhvdu_lv_wulyldoob_eurnhq}",
    hint: "The flag starts with 'cc'. Work out the shift from the first two letters.",
    answerHash: "95b6bdb79e6c7ba5ee058a3f37b68f44e77bd776ce66d9bef10e74c50380e34d",
  },
  {
    id: "hex",
    title: "Another view of the same bytes",
    category: "Encoding",
    points: 10,
    prompt: "Hexadecimal is just a way of writing bytes. Convert this back to text to find the flag.",
    data: "63637b6865785f69735f6a7573745f616e6f746865725f766965777d",
    hint: "Each pair of hex digits is one ASCII character. 0x63 is 'c'.",
    answerHash: "8493c38254f74e3ab6b44f9f9dd826b644685000dd9243b2afc473849de33ae8",
  },
  {
    id: "jwt",
    title: "Claims are not secret",
    category: "Web security",
    points: 20,
    prompt: "A developer put a note in this token's payload assuming nobody could read it. Find the flag.",
    data: JWT_CHALLENGE_TOKEN,
    hint: "A JWT's second segment is base64url-encoded JSON. The JWT inspector decodes it.",
    answerHash: "ac1925579ed4f9075b0288aadb6e03ee20e4b9295e9bd001cc1b78149718c435",
  },
  {
    id: "cwe",
    title: "Know your weakness",
    category: "Secure coding",
    points: 10,
    prompt: "A query is built by concatenating user input into a SQL string. What is the CWE number for this weakness? (Just the number.)",
    data: "SELECT * FROM users WHERE name = '" + "$input" + "'",
    hint: "It is one of the most common weaknesses in the CWE catalogue. See the secure code gallery.",
    answerHash: "cd70bea023f752a0564abb6ed08d42c1440f2e33e29914e55e0be1595e24f45a",
  },
];

const STORAGE_KEY = "cc-ctf-v1";

interface Progress {
  solved: string[];
  hints: string[];
}

function normalise(answer: string): string {
  return answer.toLowerCase().replace(/\s+/g, "").replace(/^cwe-/, "");
}

function awarded(c: Challenge, hintsUsed: boolean): number {
  return hintsUsed ? Math.ceil(c.points / 2) : c.points;
}

export function CtfSandbox() {
  const [progress, setProgress] = useState<Progress>({ solved: [], hints: [] });
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [feedback, setFeedback] = useState<Record<string, "wrong" | undefined>>({});

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed: unknown = JSON.parse(raw);
        if (typeof parsed === "object" && parsed !== null) {
          const p = parsed as Partial<Progress>;
          setProgress({
            solved: Array.isArray(p.solved) ? p.solved.filter((x): x is string => typeof x === "string") : [],
            hints: Array.isArray(p.hints) ? p.hints.filter((x): x is string => typeof x === "string") : [],
          });
        }
      }
    } catch {
      /* storage unavailable or corrupt: start fresh */
    }
  }, []);

  const save = useCallback((next: Progress) => {
    setProgress(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  }, []);

  const submit = async (c: Challenge) => {
    const guess = normalise(answers[c.id] ?? "");
    if (!guess) return;
    const hash = await digestHex("SHA-256", guess);
    if (hash === c.answerHash) {
      setFeedback((f) => ({ ...f, [c.id]: undefined }));
      if (!progress.solved.includes(c.id)) save({ ...progress, solved: [...progress.solved, c.id] });
    } else {
      setFeedback((f) => ({ ...f, [c.id]: "wrong" }));
    }
  };

  const score = CHALLENGES.filter((c) => progress.solved.includes(c.id)).reduce((s, c) => s + awarded(c, progress.hints.includes(c.id)), 0);
  const total = CHALLENGES.reduce((s, c) => s + c.points, 0);

  return (
    <ToolFrame
      title="Safe CTF sandbox"
      description="Five beginner challenges that run entirely in your browser: no targets, no network, no exploitation. Progress is saved only on this device. Using a hint halves the points."
    >
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-brand-border bg-background/60 p-4">
        <div className="flex items-center gap-2 font-mono text-sm text-text-primary">
          <Trophy className="h-4 w-4 text-brand-primary" />
          <span aria-live="polite">Score {score} / {total}</span>
          <span className="text-text-muted">· {progress.solved.length} / {CHALLENGES.length} solved</span>
        </div>
        <button type="button" className={buttonCls} onClick={() => { save({ solved: [], hints: [] }); setAnswers({}); setFeedback({}); }}>Reset progress</button>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {CHALLENGES.map((c) => {
          const solved = progress.solved.includes(c.id);
          const hinted = progress.hints.includes(c.id);
          return (
            <section key={c.id} aria-labelledby={`ctf-${c.id}`} className={cn("space-y-3 rounded-xl border p-4", solved ? "border-brand-primary/60 bg-brand-deep/30" : "border-brand-border bg-background/60")}>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 id={`ctf-${c.id}`} className="font-display text-base font-semibold text-text-primary">{c.title}</h4>
                  <p className="font-mono text-[11px] text-text-muted">{c.category} · {c.points} pts</p>
                </div>
                {solved ? <CheckCircle2 className="h-5 w-5 shrink-0 text-brand-primary" aria-label="Solved" /> : null}
              </div>
              <p className="text-xs text-text-secondary">{c.prompt}</p>
              <pre className="overflow-auto whitespace-pre-wrap break-all rounded-lg border border-brand-border bg-background p-3 font-mono text-xs text-text-primary">{c.data}</pre>
              {hinted ? <p className="flex items-start gap-2 text-xs text-status-warning"><Lightbulb className="mt-0.5 h-3.5 w-3.5 shrink-0" />{c.hint}</p> : (
                <button type="button" className="font-mono text-[11px] text-text-muted underline hover:text-brand-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/50" onClick={() => save({ ...progress, hints: [...progress.hints, c.id] })}>Reveal hint (halves points)</button>
              )}
              {solved ? (
                <p className="font-mono text-xs text-brand-primary">Solved: +{awarded(c, hinted)} pts</p>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); void submit(c); }} className="space-y-2">
                  <label htmlFor={`ans-${c.id}`} className={labelCls}>Your answer</label>
                  <div className="flex flex-col gap-2 sm:flex-row">
                    <input id={`ans-${c.id}`} className={inputCls} value={answers[c.id] ?? ""} onChange={(e) => setAnswers({ ...answers, [c.id]: e.target.value })} autoComplete="off" spellCheck={false} />
                    <button type="submit" className={buttonCls}>Submit</button>
                  </div>
                  {feedback[c.id] === "wrong" ? <p role="alert" className="font-mono text-xs text-status-error">Not quite. Try again.</p> : null}
                </form>
              )}
            </section>
          );
        })}
      </div>
    </ToolFrame>
  );
}
