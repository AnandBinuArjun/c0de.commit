import type { ContentSeriesItem, InsightLessonItem } from "@/types";

function buildSeriesLessons(
  seriesSlug: string,
  publishedLessons: Omit<InsightLessonItem, "seriesSlug">[],
  placeholderTitles: string[]
): InsightLessonItem[] {
  const fullLessons: InsightLessonItem[] = publishedLessons.map((lesson) => ({
    ...lesson,
    seriesSlug,
  }));

  placeholderTitles.forEach((title, idx) => {
    const lessonNumber = publishedLessons.length + idx + 1;
    const slug = `${seriesSlug}-lesson-${String(lessonNumber).padStart(2, "0")}`;
    fullLessons.push({
      slug,
      seriesSlug,
      lessonNumber,
      title,
      summary: `[STRUCTURED CURRICULUM PLACEHOLDER — LESSON ${String(lessonNumber).padStart(2, "0")}/20] Scheduled educational module in the @c0de.commit Instagram series. Full article body is intentionally unpopulated until published to prevent fabricated content.`,
      threatExplanation:
        "This lesson slot is part of the planned 20-post CODE.COMMIT technical education curriculum. In accordance with CODE.COMMIT content integrity rules, full prose is not fabricated for unreleased outline lessons.",
      realisticExample:
        "Awaiting publication of the corresponding @c0de.commit Instagram briefing and technical breakdown.",
      defensiveRecommendations: [
        "Follow preceding foundational lessons in this series",
        "Review related engineering controls in the CODE.COMMIT Research Lab",
      ],
      furtherReading: [
        "https://instagram.com/c0de.commit",
        "https://owasp.org/",
      ],
      isPlaceholder: true,
      publishedAt: "Planned Module",
    });
  });

  return fullLessons;
}

export const INSIGHTS_SERIES: ContentSeriesItem[] = [
  {
    slug: "phishing-and-social-engineering",
    title: "Phishing & Social Engineering",
    subtitle: "Series 01 · Deconstructing human-layer manipulation, AITM proxies, and domain deception",
    description:
      "A 20-part technical education curriculum from @c0de.commit examining how modern phishing campaigns bypass legacy awareness training, abuse reverse-proxy kits, and exploit OAuth consent flows—and how engineering teams build phishing-resistant controls.",
    instagramHandle: "@c0de.commit",
    totalPlannedPosts: 20,
    categoryTag: "HUMAN & IDENTITY DEFENCE",
    lessons: buildSeriesLessons(
      "phishing-and-social-engineering",
      [
        {
          slug: "anatomy-of-modern-social-engineering-lures",
          lessonNumber: 1,
          title: "Anatomy of a Modern Social Engineering Lure: Why Urgency Defeats Routine Checks",
          summary:
            "How attackers combine authority, artificial urgency, and contextual recon to trigger rapid cognitive shortcuts before a user inspects technical indicators.",
          threatExplanation:
            "Social engineering rarely relies on crude spelling mistakes anymore. Adversaries harvest public organizational charts, vendor invoice schedules, and GitHub commit metadata to craft pretexts that match ongoing engineering or finance workflows. By pairing a plausible operational blocker (e.g., an expired TLS certificate, failed payroll update, or suspended cloud account) with a tight deadline, the attacker forces fast, reflexive action.",
          realisticExample:
            "An on-call developer receives a Slack or email alert appearing to originate from the team's CI/CD provider warning that outbound build webhooks have been paused due to a billing verification failure, linking to a lookalike domain (`ci-status-verify[.]com`).",
          defensiveRecommendations: [
            "Enforce out-of-band verification channels for any credential, MFA reset, or payment routing change.",
            "Deploy phishing-resistant FIDO2/WebAuthn authenticators bound to origin domains so lookalike domains cannot receive valid assertions.",
            "Establish a zero-blame security reporting workflow so employees report suspicious clicks immediately.",
          ],
          furtherReading: [
            "https://attack.mitre.org/techniques/T1566/",
            "https://pages.nist.gov/800-63-3/",
          ],
          isPlaceholder: false,
          publishedAt: "2026-10-05",
        },
        {
          slug: "adversary-in-the-middle-aitm-reverse-proxy-phishing",
          lessonNumber: 2,
          title: "Adversary-in-the-Middle (AiTM) Reverse-Proxy Phishing & Session Cookie Theft",
          summary:
            "Understanding how reverse-proxy phishing frameworks relay real-time authentication traffic to steal post-authentication session cookies even when SMS or TOTP MFA is enabled.",
          threatExplanation:
            "Traditional phishing pages simply harvested static usernames and passwords. Modern Adversary-in-the-Middle (AiTM) toolkits act as a transparent TLS reverse proxy sitting between the victim and the genuine identity provider. As the user enters their password and completes a 6-digit TOTP or push notification challenge, the proxy forwards the challenge and intercepts the resulting authenticated session cookie (`Set-Cookie`).",
          realisticExample:
            "A user clicks an invoice link hosted on an attacker-controlled proxy server. The user enters their real password and approves a push prompt on their phone. The attacker captures the issued session token and replays it in another browser without needing the password or MFA device again.",
          defensiveRecommendations: [
            "Migrate privileged and workforce accounts to FIDO2 / Passkey (WebAuthn) authentication, which cryptographically binds the challenge to the exact browser origin domain.",
            "Configure Continuous Access Evaluation (CAE) and device-bound token protection (e.g., requiring compliant device certificates alongside session tokens).",
            "Monitor for impossible-travel token replay where an authentication occurs on one ASN and the session token is immediately used from another.",
          ],
          furtherReading: [
            "https://attack.mitre.org/techniques/T1539/",
            "https://fidoalliance.org/fido2/",
          ],
          isPlaceholder: false,
          publishedAt: "2026-10-12",
        },
        {
          slug: "oauth-consent-phishing-and-illicit-app-grants",
          lessonNumber: 3,
          title: "OAuth Consent Phishing: Compromising Cloud Accounts Without Stealing Passwords",
          summary:
            "How attackers trick users into granting third-party OAuth applications persistent read/write API permissions to corporate email and cloud storage.",
          threatExplanation:
            "In OAuth consent phishing, the attacker never touches the victim's password or MFA code. Instead, the victim is directed to the legitimate Microsoft Entra ID or Google Workspace authorization endpoint and prompted to authorize a malicious third-party OAuth app requesting scopes such as `Mail.ReadWrite` or `Files.Read.All`. Once consented, the attacker receives an OAuth refresh token that persists even if the user changes their password.",
          realisticExample:
            "A productivity plugin prompt asks a user to 'Sign in with Work Account to view shared document'. The legitimate identity provider displays a permission consent screen; once clicked, the attacker's backend receives persistent API access.",
          defensiveRecommendations: [
            "Restrict end-user OAuth application consent so only verified, admin-approved applications can request sensitive API scopes.",
            "Audit existing OAuth service principals and revoke unused or high-privilege third-party grants regularly.",
            "Alert on newly registered multi-tenant OAuth applications requesting mail, directory, or storage scopes.",
          ],
          furtherReading: [
            "https://attack.mitre.org/techniques/T1528/",
          ],
          isPlaceholder: false,
          publishedAt: "2026-10-19",
        },
      ],
      [
        "Homograph Attacks, Punycode Domains & Lookalike Brand Infrastructure",
        "Business Email Compromise (BEC) & Vendor Thread Hijacking",
        "QR Code Phishing (Quishing): Shifting the Attack from Desktop to Mobile",
        "MFA Fatigue & Push Bombing: Exploiting Human Notification Overload",
        "Voice Phishing (Vishing) & Helpdesk Identity Verification Bypass",
        "Browser-in-the-Browser (BitB) Pop-up Spoofing Techniques",
        "Malicious Calendar Invites & Collaborative Document Lures",
        "Developer-Targeted Social Engineering: Fake Job Assessments & Trojan Repositories",
        "SPF, DKIM & DMARC Enforcement: Stopping Direct Domain Spoofing",
        "Brand Indicators for Message Identification (BIMI) & MTA-STS Hardening",
        "DetectingNewly Registered Lookalike Domains with Certificate Transparency Logs",
        "Designing Phishing Simulations That Educate Rather Than Alienate",
        "Securing Executive & High-Profile Communications Against Spearphishing",
        "Incident Triage Playbook: First 15 Minutes After a Confirmed Phishing Click",
        "Browser Isolation & Link-Wrapping Tradeoffs in Enterprise Environments",
        "AI-Assisted Lure Detection: Lexical & Behavioral Heuristics",
        "Series 01 Capstone: Building a Defense-in-Depth Anti-Phishing Architecture",
      ]
    ),
  },
  {
    slug: "password-security-mfa-and-account-protection",
    title: "Password Security, MFA & Account Protection",
    subtitle: "Series 02 · Credential hygiene, cryptographic hashing, MFA hierarchies, and session defense",
    description:
      "A 20-part engineering and personal digital safety curriculum exploring how credentials fail, how password stuffing and infostealers operate, and how to architect resilient authentication using Argon2id, password managers, and hardware-backed passkeys.",
    instagramHandle: "@c0de.commit",
    totalPlannedPosts: 20,
    categoryTag: "AUTHENTICATION & ACCESS",
    lessons: buildSeriesLessons(
      "password-security-mfa-and-account-protection",
      [
        {
          slug: "credential-stuffing-and-why-password-reuse-is-systemic-risk",
          lessonNumber: 1,
          title: "Credential Stuffing & Breach Replay: Why Password Reuse Turns One Leak Into Total Compromise",
          summary:
            "How automated credential-stuffing frameworks test billions of leaked email/password pairs across SaaS, banking, and developer portals.",
          threatExplanation:
            "When a third-party forum or minor web service suffers a database breach, attackers extract email and password combinations and feed them into distributed credential-stuffing bots. Because human users frequently reuse identical or slightly modified passwords (`Summer2025!` -> `Summer2026!`) across accounts, attackers gain unauthorized access to completely unrelated services without breaking a single cryptographic cipher.",
          realisticExample:
            "An engineer uses the same password for a hobbyist community site and their personal cloud DNS registrar. Months after the community site is breached, automated bots log into the DNS registrar and hijack domain records.",
          defensiveRecommendations: [
            "Generate a unique, high-entropy random password (16+ characters or 4+ word passphrase) for every single service using a dedicated password manager.",
            "Integrate breached-password checks (such as k-Anonymity HIBP range queries) during user registration and password rotation.",
            "Follow NIST SP 800-63B guidance: eliminate arbitrary periodic password expiration rules that encourage predictable incremental passwords.",
          ],
          furtherReading: [
            "https://pages.nist.gov/800-63-3/sp800-63b.html",
            "https://attack.mitre.org/techniques/T1110.004/",
          ],
          isPlaceholder: false,
          publishedAt: "2026-10-22",
        },
        {
          slug: "mfa-strength-hierarchy-sms-totp-push-and-fido2-passkeys",
          lessonNumber: 2,
          title: "The MFA Strength Hierarchy: Comparing SMS, Authenticator TOTP, Push, and FIDO2 Passkeys",
          summary:
            "Not all multi-factor authentication is equal. A technical breakdown of SIM swapping, TOTP relay vulnerabilities, and cryptographic origin binding.",
          threatExplanation:
            "Any MFA significantly reduces bulk automated takeover compared to password-only login, but specific factors have distinct threat models. SMS OTPs are vulnerable to SIM-swap social engineering and SS7/telecom interception. Time-based One-Time Passwords (TOTP) and standard push prompts improve security over SMS, yet remain phishable via real-time Adversary-in-the-Middle (AiTM) proxies. FIDO2/WebAuthn hardware keys and passkeys solve this by signing an origin-bound cryptographic challenge.",
          realisticExample:
            "An organization moves from SMS to TOTP authenticator apps, stopping SIM-swap attacks, and subsequently enforces FIDO2 security keys for AWS root and GitHub organization owners to eliminate AiTM proxy risk.",
          defensiveRecommendations: [
            "Disable SMS/Voice as a primary or fallback MFA factor for privileged and administrative accounts.",
            "Use number-matching and geolocation context if push-based MFA is deployed.",
            "Adopt FIDO2 security keys or synced/device-bound Passkeys for all Tier-0 infrastructure, source control, and identity administration.",
          ],
          furtherReading: [
            "https://www.cisa.gov/MFA",
            "https://w3c.github.io/webauthn/",
          ],
          isPlaceholder: false,
          publishedAt: "2026-10-29",
        },
        {
          slug: "password-storage-engineering-argon2id-salting-and-peppers",
          lessonNumber: 3,
          title: "Password Storage for Engineers: Memory-Hard Hashing with Argon2id, Salts & Peppers",
          summary:
            "How backend engineers must store credentials so that even a database read compromise does not yield crackable plaintext passwords.",
          threatExplanation:
            "Fast general-purpose cryptographic hashes like SHA-256 or MD5 can be computed at billions of guesses per second on modern GPUs, making unsalted or fast-hashed password tables trivial to crack offline. Secure password storage requires a deliberate, memory-hard key derivation function with a unique cryptographic random salt per credential.",
          realisticExample:
            "A backend authentication service hashes user passwords with Argon2id (configured with appropriate memory cost, iterations, and parallelism) and mixes in a secret server-side HMAC pepper stored in a dedicated KMS/HSM separate from the PostgreSQL database.",
          defensiveRecommendations: [
            "Use Argon2id (OWASP primary recommendation) with a unique 16-byte cryptographic random salt per password.",
            "Never truncate user passwords silently or disallow spaces and special characters (allow up to at least 64–128 characters).",
            "Store an application-wide secret pepper in KMS or environment secrets separate from the database storage volume.",
          ],
          furtherReading: [
            "https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html",
          ],
          isPlaceholder: false,
          publishedAt: "2026-11-05",
        },
      ],
      [
        "How Password Managers Work Under the Hood: Vault Encryption & Zero-Knowledge Architecture",
        "Protecting Your Master Password & Emergency Recovery Kit Design",
        "Infostealer Malware & Browser Credential Databases: Why 'Save Password in Browser' Is Risky",
        "Session Token Security: HttpOnly, Secure, SameSite & Short-Lived Refresh Rotation",
        "Account Recovery Weaknesses: Securing Password Reset Flows & Magic Links",
        "SIM Swapping & Telecom Account Takeover: Hardening Your Mobile Carrier Profile",
        "Hardware Security Keys in Practice: Primary + Backup Key Registration Strategy",
        "OAuth & Social Login ('Sign in with...') Security Implications",
        "Detecting Brute-Force & Credential Stuffing at the API Edge Without Locking Out Legitimate Users",
        "Service Accounts, API Keys & Personal Access Tokens: Rotating Non-Human Identities",
        "Secrets in Git: Preventing and Remediating Leaked `.env` Files and Commit History",
        "Zero-Trust Device Posture & Conditional Access Policies",
        "Shared Team Credentials: Safe Delegation Without Sharing Plaintext Passwords",
        "Biometrics vs. Knowledge Factors: Privacy and Security Tradeoffs",
        "Auditing Connected Devices, Active Sessions & Authorized Apps Quarterly",
        "Step-Up Authentication for High-Risk Actions (Billing, Role Changes, Data Export)",
        "Series 02 Capstone: Personal & Enterprise Account Hardening Blueprint",
      ]
    ),
  },
  {
    slug: "malware-and-ransomware-understand-detect-defend",
    title: "Malware & Ransomware: Understand, Detect & Defend",
    subtitle: "Series 03 · Execution chains, persistence mechanisms, telemetry detection, and resilient recovery",
    description:
      "A 20-part defensive engineering and threat analysis series breaking down how contemporary malware families and ransomware operations gain initial access, establish persistence, evade defenses, and how defenders architect resilient detection and immutable backups.",
    instagramHandle: "@c0de.commit",
    totalPlannedPosts: 20,
    categoryTag: "THREAT DETECTION & DFIR",
    lessons: buildSeriesLessons(
      "malware-and-ransomware-understand-detect-defend",
      [
        {
          slug: "ransomware-kill-chain-initial-access-to-double-extortion",
          lessonNumber: 1,
          title: "The Modern Ransomware Kill Chain: From Initial Access & Dwell Time to Double Extortion",
          summary:
            "Understanding why ransomware is no longer an instantaneous single-file infection, but the final stage of a multi-day human-operated intrusion.",
          threatExplanation:
            "Modern enterprise ransomware incidents rarely happen the moment a user opens a file. Instead, initial access brokers or commodity loaders (via phishing, exposed RDP/VPN appliances, or unpatched edge vulnerabilities) establish a foothold first. Operators then spend hours or days performing internal reconnaissance, dumping credentials, moving laterally to domain controllers or cloud storage, and exfiltrating sensitive data ('double extortion') before finally deploying encryption payloads.",
          realisticExample:
            "An exposed, unpatched edge VPN appliance without MFA allows an attacker onto an internal subnet. Over 72 hours, the intruder enumerates SMB shares, targets backup administration consoles, and only triggers encryption after staging data exfiltration.",
          defensiveRecommendations: [
            "Focus detection engineering on early kill-chain phases (credential dumping, lateral movement, anomalous internal discovery) rather than waiting for file-encryption alerts.",
            "Eliminate internet-exposed RDP/SSH management interfaces and enforce phishing-resistant MFA on all remote access gateways.",
            "Segment network zones so workstation subnets cannot directly reach hypervisor management or backup storage planes.",
          ],
          furtherReading: [
            "https://www.cisa.gov/stopransomware",
            "https://attack.mitre.org/techniques/T1486/",
          ],
          isPlaceholder: false,
          publishedAt: "2026-11-09",
        },
        {
          slug: "infostealers-and-loaders-the-silent-precursors-to-breaches",
          lessonNumber: 2,
          title: "Infostealers & Initial Access Loaders: How Session Tokens Fuel Downstream Breaches",
          summary:
            "How commodity infostealer malware harvests browser SQLite cookie stores, developer tokens, and VPN profiles from unmanaged or personal endpoints.",
          threatExplanation:
            "Infostealer payloads (often delivered via malvertising, trojanized software utilities, or fake updates) execute rapidly in user space to read browser local storage, saved passwords, active session cookies, SSH keys, and cloud CLI credential files (`~/.aws/credentials`). Stolen logs are bundled and sold to downstream threat actors who use the captured session tokens to walk directly into corporate SaaS environments.",
          realisticExample:
            "A contractor downloads a trojanized utility on an unmanaged home desktop where they are also logged into a corporate web portal. The infostealer extracts the active browser session cookie, allowing an attacker to hijack the session.",
          defensiveRecommendations: [
            "Block corporate SaaS access from unmanaged personal endpoints lacking verified device posture and EDR protection.",
            "Enforce short session lifetimes and hardware-backed token binding so exported cookie databases cannot be replayed on foreign hosts.",
            "Restrict software installation rights through application allowlisting and standard user privileges.",
          ],
          furtherReading: [
            "https://attack.mitre.org/techniques/T1555.003/",
          ],
          isPlaceholder: false,
          publishedAt: "2026-11-16",
        },
        {
          slug: "immutable-backups-and-ransomware-recovery-engineering",
          lessonNumber: 3,
          title: "Immutable Backups & the 3-2-1-1-0 Architecture: Engineering True Recovery Capability",
          summary:
            "Why standard online backups get deleted during a ransomware attack, and how object-lock immutability and isolated control planes ensure survivability.",
          threatExplanation:
            "Adversaries actively hunt for backup servers, VSS shadow copies (`vssadmin delete shadows`), and cloud storage snapshots before deploying ransomware. If your backup console uses the same Active Directory or cloud IAM administrative plane as your production servers, a single compromised domain or cloud administrator account allows the attacker to wipe backups first.",
          realisticExample:
            "An engineering team configures cross-account S3 Object Lock in Compliance Mode with a separate identity boundary and hardware MFA Delete, ensuring that even if the primary production AWS account is compromised, backup snapshots cannot be altered or deleted prior to retention expiry.",
          defensiveRecommendations: [
            "Implement the 3-2-1-1-0 backup rule: 3 copies of data, 2 different media types, 1 offsite, 1 strictly immutable/air-gapped copy, and 0 unverified recovery errors.",
            "Isolate backup storage and control planes into a separate cloud organization/account with zero trust dependencies on production directory services.",
            "Run scheduled, automated restoration drills to measure actual Recovery Time Objective (RTO) and verify backup integrity.",
          ],
          furtherReading: [
            "https://attack.mitre.org/techniques/T1490/",
          ],
          isPlaceholder: false,
          publishedAt: "2026-11-21",
        },
      ],
      [
        "How Malware Establishes Persistence: Scheduled Tasks, Registry Run Keys & Systemd Units",
        "Living off the Land Binaries (LOLBins): How Attackers Abuse Built-in OS Utilities",
        "Process Injection & Fileless Execution in Volatile Memory",
        "Command and Control (C2) Beaconing: DNS Tunneling, HTTPS Jitter & Domain Fronting",
        "Botnet Architectures: Lessons from SENTINEL-IoT Mirai & Gafgyt Telemetry",
        "Static vs. Dynamic Malware Triage: Safe Sandboxing Principles",
        "YARA & Sigma Rules: Writing High-Signal Detection Signatures",
        "Endpoint Detection and Response (EDR) Telemetry vs. Legacy Antivirus Signatures",
        "Supply Chain Malware: Typosquatted npm/PyPI Packages & Compromised Build Scripts",
        "Container & Linux Server Malware: Cryptominers, Rootkits & Exposed Docker Daemons",
        "Lateral Movement Mechanics: SMB, WMI, SSH Agent Forwarding & Cloud Instance Metadata",
        "Data Exfiltration Detection: Identifying Staging Archives and Anomalous Egress",
        "Memory Forensics in Action: Spotting Hollowed Processes with Volatility 3",
        "Incident Containment Playbook: Isolating Hosts Without Destroying Forensic Evidence",
        "Ransomware Negotiation, Legal Disclosure & Regulatory Realities",
        "Hardening Endpoints: ASR Rules, Least Privilege & Macro Restrictions",
        "Series 03 Capstone: Building a Resilient Malware Detection & Recovery Architecture",
      ]
    ),
  },
];

export function getAllInsightLessons(): InsightLessonItem[] {
  return INSIGHTS_SERIES.flatMap((series) => series.lessons);
}

export function getInsightLessonBySlug(slug: string): {
  lesson: InsightLessonItem;
  series: ContentSeriesItem;
  nextLesson?: InsightLessonItem;
  prevLesson?: InsightLessonItem;
} | undefined {
  for (const series of INSIGHTS_SERIES) {
    const idx = series.lessons.findIndex((item) => item.slug === slug);
    if (idx !== -1) {
      return {
        lesson: series.lessons[idx],
        series,
        prevLesson: idx > 0 ? series.lessons[idx - 1] : undefined,
        nextLesson: idx < series.lessons.length - 1 ? series.lessons[idx + 1] : undefined,
      };
    }
  }
  return undefined;
}
