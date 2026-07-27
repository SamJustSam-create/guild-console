# guild-console

**A modern Discord community management toolkit** — a growing collection of browser-side tools that simplify server administration and automate repetitive tasks, delivered as a single Tampermonkey userscript.

> ⚠️ **Early stage.** guild-console is being built one feature at a time. Today it ships a single tool: **one-click "enable all permissions" for a role.** The broader platform (members, applications, moderation, events, analytics) is on the [roadmap](#roadmap) — not built yet.

---

## Current features

### 🔓 Enable all permissions
Adds a floating **Enable all permissions** button to Discord. On a role's **Permissions** tab it flips every permission toggle to **ON** in one click. You still review and click Discord's own **Save Changes** bar — the script never saves for you.

### 🩺 Diagnose
A companion **Diagnose** button that reports which toggle elements it can see on the page and copies the details to your clipboard. Handy when Discord changes its layout and the main button stops finding toggles.

---

## Installation

1. Install a userscript manager — [Tampermonkey](https://www.tampermonkey.net/) (Chrome, Edge, Firefox, Safari) or [Violentmonkey](https://violentmonkey.github.io/).
2. Click to install: **[guild-console.user.js](https://github.com/SamJustSam-create/guild-console/raw/main/guild-console.user.js)** — Tampermonkey will show an install prompt; confirm it.
   *(Alternative: open the Tampermonkey dashboard → **Create a new script** → paste the contents of `guild-console.user.js` → **Ctrl+S**.)*
3. Because the header's `@downloadURL` / `@updateURL` point at this repo, Tampermonkey will auto-update the script whenever you push a new version (with a bumped `@version`).

---

## Usage

1. Open **Server Settings → Roles**, pick a role, and open its **Permissions** tab.
2. Click the blue **Enable all permissions** button (bottom-right corner).
3. A toast tells you how many toggles it flipped.
4. Review the changes, then click Discord's **Save Changes** bar to commit them.

---

## How it works

The script injects its buttons and keeps them alive across Discord's single-page navigation using a `MutationObserver`. When you click **Enable all permissions**, it collects every toggle on the page — both classic `<input type="checkbox">` switches and accessible `[role="switch"]` elements — and flips any that are currently **OFF**, using a native click for checkboxes and a full pointer-event sequence for switches.

---

## Notes & caveats

- **It doesn't save for you.** You always review and click Discord's Save Changes bar yourself.
- **It can't grant access you don't have.** Discord enforces permissions server-side — if your account lacks *Manage Roles* / *Administrator*, the save is rejected.
- **Enabling everything also turns on *Administrator*,** which by itself already grants every permission.
- **Run it on the role Permissions tab only.** Elsewhere it could flip unrelated on/off switches; it never acts until you click the button.
- **Discord changes its UI often.** If the button stops finding toggles, click **Diagnose** and open an issue with the output.
- **Terms of Service.** This automates Discord's own settings UI inside your browser — very different from a self-bot making API calls, but UI automation still sits in a gray area of Discord's ToS. Use it on servers you administer, at your own discretion.

---

## Roadmap

Planned guild-console tools (not yet implemented):

- [ ] Member management dashboard
- [ ] Bulk role assignment
- [ ] Application / onboarding review
- [ ] Moderation shortcuts
- [ ] Event management
- [ ] Server analytics

---

## Contributing

Issues and pull requests are welcome. If you're reporting a broken toggle, please include the output of the **Diagnose** button and your Discord client (web / desktop) so it's reproducible.

---

## License

[MIT](LICENSE) © anothersxm
