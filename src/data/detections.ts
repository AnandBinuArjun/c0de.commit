export type RuleFormat = "Sigma" | "YARA" | "Suricata";

export interface DetectionRule {
  id: string;
  title: string;
  format: RuleFormat;
  description: string;
  attack: { id: string; name: string; tactic: string }[];
  falsePositives: string;
  code: string;
  language: string;
}

/**
 * Reference detection rules authored for the CODE.COMMIT lab.
 * They are illustrative starting points. They have NOT been validated against
 * production telemetry and must be tuned and tested before deployment.
 */
export const DETECTION_RULES: DetectionRule[] = [
  {
    id: "cc-sigma-001",
    title: "Encoded PowerShell command line",
    format: "Sigma",
    description: "PowerShell launched with an encoded command argument, a common way to hide script content.",
    attack: [{ id: "T1059.001", name: "Command and Scripting Interpreter: PowerShell", tactic: "Execution" }],
    falsePositives: "Legitimate administration and deployment tooling that passes encoded commands.",
    language: "yaml",
    code: `title: Encoded PowerShell Command Line
status: experimental
description: Detects PowerShell started with an encoded command argument.
logsource:
  category: process_creation
  product: windows
detection:
  selection_img:
    Image|endswith:
      - '\\powershell.exe'
      - '\\pwsh.exe'
  selection_cli:
    CommandLine|contains:
      - ' -enc '
      - ' -encodedcommand '
  condition: selection_img and selection_cli
falsepositives:
  - Administrative and deployment scripts
level: medium
tags:
  - attack.execution
  - attack.t1059.001`,
  },
  {
    id: "cc-sigma-002",
    title: "Certutil used to download a file",
    format: "Sigma",
    description: "certutil.exe fetching content from a URL, a living-off-the-land transfer technique.",
    attack: [{ id: "T1105", name: "Ingress Tool Transfer", tactic: "Command and Control" }],
    falsePositives: "Rare administrative certificate retrieval from internal URLs.",
    language: "yaml",
    code: `title: Certutil URL Cache Download
status: experimental
description: Detects certutil.exe being used to download content over HTTP(S).
logsource:
  category: process_creation
  product: windows
detection:
  selection:
    Image|endswith: '\\certutil.exe'
    CommandLine|contains|all:
      - 'urlcache'
      - 'http'
  condition: selection
falsepositives:
  - Internal certificate retrieval scripts
level: high
tags:
  - attack.command_and_control
  - attack.t1105`,
  },
  {
    id: "cc-sigma-003",
    title: "LSASS memory dump via comsvcs MiniDump",
    format: "Sigma",
    description: "rundll32 invoking comsvcs.dll MiniDump, commonly used to dump process memory for credentials.",
    attack: [{ id: "T1003.001", name: "OS Credential Dumping: LSASS Memory", tactic: "Credential Access" }],
    falsePositives: "Very rare. Treat as high-confidence and investigate.",
    language: "yaml",
    code: `title: Process Memory Dump via comsvcs MiniDump
status: experimental
description: Detects rundll32 calling the comsvcs.dll MiniDump export.
logsource:
  category: process_creation
  product: windows
detection:
  selection:
    CommandLine|contains|all:
      - 'comsvcs'
      - 'minidump'
  condition: selection
falsepositives:
  - Rare debugging activity by administrators
level: high
tags:
  - attack.credential_access
  - attack.t1003.001`,
  },
  {
    id: "cc-sigma-004",
    title: "Windows event log cleared with wevtutil",
    format: "Sigma",
    description: "Event logs cleared from the command line, a typical indicator-removal step.",
    attack: [{ id: "T1070.001", name: "Indicator Removal: Clear Windows Event Logs", tactic: "Defense Evasion" }],
    falsePositives: "Planned maintenance or image preparation.",
    language: "yaml",
    code: `title: Windows Event Log Cleared via wevtutil
status: experimental
description: Detects wevtutil used to clear an event log.
logsource:
  category: process_creation
  product: windows
detection:
  selection_img:
    Image|endswith: '\\wevtutil.exe'
  selection_cli:
    CommandLine|contains:
      - ' cl '
      - 'clear-log'
  condition: selection_img and selection_cli
falsepositives:
  - Image preparation and approved maintenance
level: medium
tags:
  - attack.defense_evasion
  - attack.t1070.001`,
  },
  {
    id: "cc-sigma-005",
    title: "Download piped directly into a shell (Linux)",
    format: "Sigma",
    description: "curl or wget output piped into sh/bash, executing remote content without inspection.",
    attack: [
      { id: "T1105", name: "Ingress Tool Transfer", tactic: "Command and Control" },
      { id: "T1059.004", name: "Command and Scripting Interpreter: Unix Shell", tactic: "Execution" },
    ],
    falsePositives: "Some vendor installers are distributed this way.",
    language: "yaml",
    code: `title: Remote Download Piped to Shell
status: experimental
description: Detects curl or wget output piped into a shell interpreter.
logsource:
  category: process_creation
  product: linux
detection:
  selection_dl:
    CommandLine|contains:
      - 'curl '
      - 'wget '
  selection_pipe:
    CommandLine|contains:
      - '| sh'
      - '|sh'
      - '| bash'
      - '|bash'
  condition: selection_dl and selection_pipe
falsepositives:
  - Vendor install scripts
level: medium
tags:
  - attack.execution
  - attack.t1059.004
  - attack.command_and_control
  - attack.t1105`,
  },
  {
    id: "cc-yara-001",
    title: "ELF dropper using busybox for tool transfer",
    format: "YARA",
    description: "Small ELF binaries containing shell-based fetch-and-execute strings typical of IoT dropper behaviour.",
    attack: [{ id: "T1105", name: "Ingress Tool Transfer", tactic: "Command and Control" }],
    falsePositives: "Legitimate embedded firmware utilities that shell out to wget.",
    language: "text",
    code: `rule CC_ELF_Busybox_Dropper_Reference
{
    meta:
        description = "Reference rule: ELF with busybox/wget fetch-and-execute strings"
        author = "CODE.COMMIT"
        status = "illustrative - tune and test before use"
    strings:
        $s1 = "/bin/busybox" ascii
        $s2 = "wget http" ascii
        $s3 = "chmod 777" ascii
        $s4 = "tftp -g" ascii
    condition:
        uint32(0) == 0x464c457f and filesize < 2MB and 2 of ($s*)
}`,
  },
  {
    id: "cc-yara-002",
    title: "PowerShell download cradle in script content",
    format: "YARA",
    description: "Script files combining a web client with in-memory execution, a common staging pattern.",
    attack: [{ id: "T1059.001", name: "Command and Scripting Interpreter: PowerShell", tactic: "Execution" }],
    falsePositives: "Installers and configuration-management scripts that fetch content.",
    language: "text",
    code: `rule CC_PowerShell_Download_Cradle_Reference
{
    meta:
        description = "Reference rule: web client plus in-memory execution"
        author = "CODE.COMMIT"
        status = "illustrative - tune and test before use"
    strings:
        $dl1 = "DownloadString" ascii wide nocase
        $dl2 = "Net.WebClient" ascii wide nocase
        $ex1 = "Invoke-Expression" ascii wide nocase
        $ex2 = "IEX" ascii wide
    condition:
        filesize < 1MB and 1 of ($dl*) and 1 of ($ex*)
}`,
  },
  {
    id: "cc-suri-001",
    title: "Repeated Telnet login attempts from one source",
    format: "Suricata",
    description: "Many Telnet login attempts from a single source within a minute, typical of IoT credential brute forcing.",
    attack: [{ id: "T1110.001", name: "Brute Force: Password Guessing", tactic: "Credential Access" }],
    falsePositives: "Legacy device management by automated tooling.",
    language: "text",
    code: `alert tcp any any -> $HOME_NET 23 (msg:"CODE.COMMIT REF Telnet login attempts burst"; flow:to_server,established; content:"login"; nocase; threshold:type both, track by_src, count 10, seconds 60; classtype:attempted-admin; sid:9000001; rev:1;)`,
  },
  {
    id: "cc-suri-002",
    title: "Wget request to a bare IP address",
    format: "Suricata",
    description: "HTTP requests using a Wget user agent to an IP-literal host, often used to fetch payloads.",
    attack: [{ id: "T1105", name: "Ingress Tool Transfer", tactic: "Command and Control" }],
    falsePositives: "Scripted updates fetching from internal servers addressed by IP.",
    language: "text",
    code: `alert http $HOME_NET any -> $EXTERNAL_NET any (msg:"CODE.COMMIT REF Wget UA to bare IP host"; flow:established,to_server; http.user_agent; content:"Wget/"; startswith; http.host; pcre:"/^\\d{1,3}(\\.\\d{1,3}){3}(:\\d+)?$/"; classtype:trojan-activity; sid:9000002; rev:1;)`,
  },
  {
    id: "cc-suri-003",
    title: "Unusually long DNS query name",
    format: "Suricata",
    description: "Very long DNS names can indicate data encoded into queries (tunnelling or exfiltration).",
    attack: [{ id: "T1071.004", name: "Application Layer Protocol: DNS", tactic: "Command and Control" }],
    falsePositives: "Some CDN and anti-virus lookup schemes use long labels.",
    language: "text",
    code: `alert dns $HOME_NET any -> any any (msg:"CODE.COMMIT REF Unusually long DNS query"; dns.query; bsize:>100; classtype:bad-unknown; sid:9000003; rev:1;)`,
  },
];
