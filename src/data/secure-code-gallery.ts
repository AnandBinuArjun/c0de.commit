export interface CodeExample {
  id: string;
  cwe: string;
  title: string;
  language: string;
  risk: string;
  vulnerable: string;
  fixed: string;
  why: string;
}

/** Illustrative, minimal examples for education. Not extracted from client work. */
export const SECURE_CODE_GALLERY: CodeExample[] = [
  {
    id: "sqli",
    cwe: "CWE-89",
    title: "SQL injection",
    language: "TypeScript",
    risk: "An attacker alters the query to read or modify arbitrary data.",
    vulnerable: `// User input concatenated into SQL
const rows = await db.query(
  "SELECT * FROM users WHERE email = '" + req.body.email + "'"
);`,
    fixed: `// Parameterised query: input is never parsed as SQL
const rows = await db.query(
  "SELECT * FROM users WHERE email = $1",
  [req.body.email]
);`,
    why: "Parameters keep data and code separate, so input cannot change the query structure.",
  },
  {
    id: "xss",
    cwe: "CWE-79",
    title: "Cross-site scripting",
    language: "TSX",
    risk: "Attacker-controlled markup executes script in a victim's session.",
    vulnerable: `// Renders untrusted HTML directly
<div dangerouslySetInnerHTML={{ __html: comment.body }} />`,
    fixed: `// React escapes text by default
<div>{comment.body}</div>

// If HTML is genuinely required, sanitise with an allowlist first
// import DOMPurify from "dompurify";
// <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(comment.body) }} />`,
    why: "Contextual output encoding neutralises markup; a strict CSP adds a second layer.",
  },
  {
    id: "path",
    cwe: "CWE-22",
    title: "Path traversal",
    language: "TypeScript",
    risk: "Input such as ../../etc/passwd escapes the intended directory.",
    vulnerable: `const file = path.join(UPLOAD_DIR, req.query.name);
res.sendFile(file);`,
    fixed: `const resolved = path.resolve(UPLOAD_DIR, req.query.name);
if (!resolved.startsWith(path.resolve(UPLOAD_DIR) + path.sep)) {
  return res.status(400).send("Invalid path");
}
res.sendFile(resolved);`,
    why: "Resolve to an absolute path, then verify it still sits inside the allowed base directory.",
  },
  {
    id: "ssrf",
    cwe: "CWE-918",
    title: "Server-side request forgery",
    language: "TypeScript",
    risk: "The server is tricked into calling internal services or cloud metadata endpoints.",
    vulnerable: `const res = await fetch(req.body.url);
return res.text();`,
    fixed: `const ALLOWED = new Set(["api.partner.example"]);
const url = new URL(req.body.url);
if (url.protocol !== "https:" || !ALLOWED.has(url.hostname)) {
  throw new Error("Destination not permitted");
}
// Also block redirects and resolve DNS to reject private ranges
const res = await fetch(url, { redirect: "error" });
return res.text();`,
    why: "An allowlist of destinations, no redirects, and private-range blocking remove the attacker's ability to pivot inward.",
  },
  {
    id: "secrets",
    cwe: "CWE-798",
    title: "Hard-coded credentials",
    language: "Python",
    risk: "Secrets committed to source control are exposed to everyone with repository access.",
    vulnerable: `DB_PASSWORD = "Sup3rS3cret!"
conn = connect(host="db", user="app", password=DB_PASSWORD)`,
    fixed: `import os
conn = connect(
    host=os.environ["DB_HOST"],
    user=os.environ["DB_USER"],
    password=os.environ["DB_PASSWORD"],  # injected from a secret manager
)`,
    why: "Keep secrets out of code; inject them at runtime and rotate them if they were ever committed.",
  },
  {
    id: "deser",
    cwe: "CWE-502",
    title: "Unsafe deserialisation",
    language: "Python",
    risk: "Unpickling attacker-controlled bytes can execute arbitrary code.",
    vulnerable: `import pickle
data = pickle.loads(request.get_data())`,
    fixed: `import json
data = json.loads(request.get_data())
# Validate the structure with a schema (e.g. pydantic) before use`,
    why: "Use a data-only format and validate its shape; never deserialise untrusted input with a code-capable format.",
  },
  {
    id: "hash",
    cwe: "CWE-916",
    title: "Weak password hashing",
    language: "Python",
    risk: "Fast hashes let attackers test billions of guesses per second after a breach.",
    vulnerable: `import hashlib
stored = hashlib.md5(password.encode()).hexdigest()`,
    fixed: `from argon2 import PasswordHasher
ph = PasswordHasher()           # Argon2id by default
stored = ph.hash(password)
ph.verify(stored, candidate)    # raises on mismatch`,
    why: "A memory-hard, salted, adaptive function makes bulk guessing expensive.",
  },
];
