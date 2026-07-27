# Security Policy

## Supported versions

guild-console ships as a single userscript. Only the latest released version receives fixes.

| Version           | Supported |
| ----------------- | --------- |
| latest (`main`)   | ✅        |
| older tags        | ❌        |

## Reporting a vulnerability

Please **do not** open a public issue for security problems.

Report privately through GitHub instead:

1. Open the repository's **Security** tab.
2. Click **Report a vulnerability** (private vulnerability reporting is enabled).

That opens a private advisory thread where you can share details. Reports will be acknowledged within 7 days.

## Scope

This userscript automates parts of Discord's own web UI inside your browser. It requests no tokens and makes no external network calls of its own. In-scope reports include: the script injecting or exfiltrating data, making unexpected network requests, or manipulating the page in ways beyond its documented "enable all permissions" / "diagnose" behavior.
