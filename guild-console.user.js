// ==UserScript==
// @name         guild-console
// @namespace    https://github.com/SamJustSam-create/guild-console
// @version      1.2.0
// @description  Adds a collapsible, context-aware tools launcher to Discord: one icon that reveals only the tools relevant to the page you're on.
// @author       anothersxm
// @match        https://discord.com/*
// @match        https://*.discord.com/*
// @run-at       document-idle
// @grant        none
// @homepageURL  https://github.com/SamJustSam-create/guild-console
// @supportURL   https://github.com/SamJustSam-create/guild-console/issues
// @downloadURL  https://github.com/SamJustSam-create/guild-console/raw/main/guild-console.user.js
// @updateURL    https://github.com/SamJustSam-create/guild-console/raw/main/guild-console.user.js
// ==/UserScript==

(function () {
  'use strict';

  /* --------------------------------------------------------------------- *
   * Launcher icon
   * To use your own artwork, paste it as a data: URI into ICON_DATA_URI,
   * e.g. const ICON_DATA_URI = 'data:image/png;base64,iVBORw0KGgo...';
   * When empty, the built-in Discord-mark fallback below is used.
   * --------------------------------------------------------------------- */
  const ICON_DATA_URI = 'data:image/png;base64,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';
  const FALLBACK_ICON = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#5865f2">' +
    '<path d="M20.317 4.3698a19.7913 19.7913 0 0 0-4.8851-1.5152.0741.0741 0 0 0-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 0 0-.0785-.037 19.7363 19.7363 0 0 0-4.8852 1.515.0699.0699 0 0 0-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 0 0 .0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 0 0 .0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 0 0-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 0 1-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 0 1 .0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 0 1 .0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 0 1-.0066.1276 12.2986 12.2986 0 0 1-1.873.8914.0766.0766 0 0 0-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 0 0 .0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 0 0 .0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 0 0-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z"/>' +
    '</svg>'
  );
  const iconSrc = () => ICON_DATA_URI || FALLBACK_ICON;

  const IDS = {
    style:    'guild-console-style',
    root:     'guild-console-root',
    launcher: 'guild-console-launcher',
    menu:     'guild-console-menu',
    toast:    'guild-console-toast',
  };

  /* ------------------------------- Toast -------------------------------- */
  function toast(msg) {
    if (!document.body) return;
    let t = document.getElementById(IDS.toast);
    if (!t) {
      t = document.createElement('div');
      t.id = IDS.toast;
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.classList.add('gc-show');
    clearTimeout(t._hideTimer);
    t._hideTimer = setTimeout(() => t.classList.remove('gc-show'), 4000);
  }

  /* ---------------------- Toggle helpers (shared) ----------------------- */
  // Fire a full, bubbling pointer+mouse+click sequence so React handlers
  // that listen on pointerdown/mousedown (not just click) still react.
  function hardClick(el) {
    const opts = { bubbles: true, cancelable: true, view: window };
    ['pointerdown', 'mousedown', 'pointerup', 'mouseup', 'click'].forEach(type => {
      const Ctor = type.startsWith('pointer') && window.PointerEvent ? PointerEvent : MouseEvent;
      el.dispatchEvent(new Ctor(type, opts));
    });
  }

  /* --------------------------- Page detection --------------------------- *
   * Discord settings open as in-app layers that usually don't change the
   * URL, and the same DOM can hold unrelated toggles (notifications, privacy,
   * etc.). So the role Permissions panel is located precisely and every
   * action is scoped to it - never the whole document - to avoid ever
   * flipping unrelated switches.
   *
   * getPermissionsPanel() returns the panel element or null. It anchors on
   * the "Search permissions" box, then walks up to the ancestor that holds
   * both a toggle cluster and stable, user-visible permission names.
   * --------------------------------------------------------------------- */
  const PERM_NAMES = [
    'Administrator', 'Manage Roles', 'Manage Channels', 'Manage Server',
    'Manage Guild', 'Kick Members', 'Ban Members', 'View Channels',
    'Send Messages', 'Mention Everyone', 'Moderate Members',
  ];

  function looksLikePermissionPanel(el) {
    const text = el.textContent || '';
    let hits = 0;
    for (const name of PERM_NAMES) {
      if (text.indexOf(name) !== -1 && ++hits >= 3) return true;
    }
    return false;
  }

  function getPermissionsPanel() {
    const inputs = document.querySelectorAll('input[type="text"], input[type="search"], input:not([type])');
    let anchor = null;
    for (const input of inputs) {
      const label = (input.placeholder || '') + ' ' + (input.getAttribute('aria-label') || '');
      if (/permission/i.test(label)) { anchor = input; break; }
    }
    if (!anchor) return null;

    let el = anchor.parentElement;
    for (let depth = 0; el && depth < 10; depth++, el = el.parentElement) {
      const toggles = el.querySelectorAll('input[type="checkbox"], [role="switch"]').length;
      if (toggles >= 8 && looksLikePermissionPanel(el)) return el;
    }
    return null;
  }

  // Loose signal (read-only tools only): is this a toggle-heavy page at all?
  function hasToggleCluster() {
    return document.querySelectorAll('input[type="checkbox"], [role="switch"]').length >= 8;
  }

  /* ----------------------------- Features ------------------------------- */
  function enableAll() {
    const panel = getPermissionsPanel();
    if (!panel) {
      toast('Couldn’t find a role Permissions panel here. Open a role’s Permissions tab and try again.');
      return;
    }

    const checkboxes = Array.from(panel.querySelectorAll('input[type="checkbox"]'));
    const roleSwitches = Array.from(panel.querySelectorAll('[role="switch"]'));
    let flipped = 0;

    // Strategy A: real checkbox inputs (Discord's classic switch). A native
    // .click() toggles `checked` and fires the change event React listens for.
    checkboxes.forEach(cb => { if (!cb.checked) { cb.click(); flipped++; } });

    // Strategy B: accessible role="switch" elements with aria-checked.
    roleSwitches.forEach(sw => {
      if (sw.getAttribute('aria-checked') === 'false') { hardClick(sw); flipped++; }
    });

    if (!flipped) {
      toast('Everything is already ON (nothing left to flip).');
      return;
    }
    toast(`Flipped ${flipped} permission${flipped === 1 ? '' : 's'} to ON. Review, then click Discord’s "Save Changes".`);
  }

  // Read-only: copies a compact report so detection/toggle markup can be
  // inspected if a tool ever misbehaves. Reports whether the scoped panel
  // was found, which is the key signal to tune if detection breaks.
  function diagnose() {
    const panel = getPermissionsPanel();
    const scope = panel || document;
    const checkboxes = Array.from(scope.querySelectorAll('input[type="checkbox"]'));
    const roleSwitches = Array.from(scope.querySelectorAll('[role="switch"]'));
    const trim = (el) => el ? el.outerHTML.slice(0, 600) : '(none)';
    const report =
`guild-console diagnostic
URL: ${location.href}
permissions panel detected: ${panel ? 'yes' : 'no'}
scope: ${panel ? 'permissions panel' : 'whole document (panel not found)'}
checkbox inputs in scope: ${checkboxes.length}
  first checkbox: ${trim(checkboxes[0])}
role=switch in scope: ${roleSwitches.length}
  first role=switch: ${trim(roleSwitches[0])}`;

    console.log('[guild-console]', report);
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(report)
        .then(() => toast('Diagnostic copied to clipboard (also in the console).'))
        .catch(() => toast('Diagnostic logged to the console (clipboard blocked).'));
    } else {
      toast('Diagnostic logged to the console (F12).');
    }
  }

  /* -------------------------- Feature registry -------------------------- *
   * Add future tools here. Each declares when it is relevant via isRelevant();
   * the menu only renders features that return true for the current page.
   * Mutating tools should gate on getPermissionsPanel()-style precise checks;
   * read-only tools may use looser signals.
   * --------------------------------------------------------------------- */
  const FEATURES = [
    {
      id: 'enable-all',
      label: 'Enable all permissions',
      hint: 'Turn every permission ON for this role',
      isRelevant: () => getPermissionsPanel() !== null,
      run: enableAll,
    },
    {
      id: 'diagnose',
      label: 'Diagnose toggles',
      hint: 'Copy a report of the toggles detected on this page',
      isRelevant: hasToggleCluster,
      run: diagnose,
    },
  ];

  function relevantFeatures() {
    return FEATURES.filter(f => {
      try { return f.isRelevant(); } catch (e) { return false; }
    });
  }

  /* ------------------------------- Menu --------------------------------- */
  function buildMenu() {
    const menu = document.getElementById(IDS.menu);
    if (!menu) return;
    menu.textContent = '';

    const feats = relevantFeatures();
    if (!feats.length) {
      const empty = document.createElement('div');
      empty.className = 'gc-empty';
      empty.textContent = 'No tools for this page yet.';
      menu.appendChild(empty);
      return;
    }

    feats.forEach(f => {
      const item = document.createElement('button');
      item.type = 'button';
      item.className = 'gc-item';
      item.setAttribute('role', 'menuitem');
      item.textContent = f.label;
      if (f.hint) item.title = f.hint;
      item.addEventListener('click', () => { closeMenu(false); f.run(); });
      menu.appendChild(item);
    });
  }

  function isOpen() {
    const menu = document.getElementById(IDS.menu);
    return !!menu && menu.classList.contains('gc-open');
  }

  function openMenu() {
    buildMenu();
    const menu = document.getElementById(IDS.menu);
    const launcher = document.getElementById(IDS.launcher);
    if (menu) menu.classList.add('gc-open');
    if (launcher) launcher.setAttribute('aria-expanded', 'true');
    const first = menu && menu.querySelector('.gc-item');
    if (first) first.focus();
  }

  function closeMenu(refocus) {
    const menu = document.getElementById(IDS.menu);
    const launcher = document.getElementById(IDS.launcher);
    if (menu) menu.classList.remove('gc-open');
    if (launcher) {
      launcher.setAttribute('aria-expanded', 'false');
      if (refocus) launcher.focus();
    }
  }

  function toggleMenu() {
    if (isOpen()) closeMenu(false); else openMenu();
  }

  // Arrow-key navigation between menu items.
  function onMenuKeydown(e) {
    const menu = document.getElementById(IDS.menu);
    if (!menu) return;
    const items = Array.from(menu.querySelectorAll('.gc-item'));
    if (!items.length) return;
    const idx = items.indexOf(document.activeElement);
    if (e.key === 'ArrowDown') { e.preventDefault(); items[(idx + 1) % items.length].focus(); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); items[(idx - 1 + items.length) % items.length].focus(); }
    else if (e.key === 'Home') { e.preventDefault(); items[0].focus(); }
    else if (e.key === 'End') { e.preventDefault(); items[items.length - 1].focus(); }
  }

  /* ------------------------------ Styles -------------------------------- */
  const CSS = `
  #${IDS.root} {
    position: fixed; right: 20px; bottom: 24px; z-index: 2147483647;
    font-family: "gg sans", "Noto Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
  }
  #${IDS.launcher} {
    width: 52px; height: 52px; border-radius: 50%; border: none; padding: 0;
    background: #fff; cursor: pointer; overflow: hidden; display: block;
    box-shadow: 0 4px 14px rgba(0,0,0,.45);
    transition: transform .12s ease, filter .12s ease;
  }
  #${IDS.launcher}:hover { filter: brightness(1.05); transform: translateY(-1px); }
  #${IDS.launcher}:active { transform: translateY(0); }
  #${IDS.launcher} img { width: 100%; height: 100%; object-fit: cover; display: block; pointer-events: none; }
  #${IDS.menu} {
    position: absolute; right: 0; left: auto; bottom: 64px;
    transform: translateY(8px);
    min-width: 230px; background: #1e1f22; color: #dbdee1;
    border: 1px solid rgba(255,255,255,.08); border-radius: 12px; padding: 6px;
    box-shadow: 0 8px 24px rgba(0,0,0,.5);
    opacity: 0; visibility: hidden; transition: opacity .14s ease, transform .14s ease;
  }
  #${IDS.menu}.gc-open { opacity: 1; visibility: visible; transform: translateY(0); }
  #${IDS.menu} .gc-item {
    display: block; width: 100%; text-align: left; background: transparent;
    color: #dbdee1; border: none; border-radius: 8px; padding: 10px 12px;
    font-size: 14px; line-height: 1.2; cursor: pointer;
  }
  #${IDS.menu} .gc-item:hover,
  #${IDS.menu} .gc-item:focus-visible { background: #5865f2; color: #fff; outline: none; }
  #${IDS.menu} .gc-empty { color: #949ba4; font-size: 13px; padding: 10px 12px; }
  #${IDS.toast} {
    position: fixed; right: 20px; bottom: 92px; left: auto;
    background: #111214; color: #fff; padding: 8px 12px; border-radius: 8px;
    font: 13px/1.4 "gg sans", "Noto Sans", Helvetica, Arial, sans-serif;
    box-shadow: 0 4px 12px rgba(0,0,0,.5); max-width: 340px; text-align: left;
    opacity: 0; visibility: hidden; transition: opacity .2s ease, visibility .2s ease;
    pointer-events: none; z-index: 2147483647;
  }
  #${IDS.toast}.gc-show { opacity: 1; visibility: visible; }
  `;

  function injectStyle() {
    if (document.getElementById(IDS.style)) return;
    const s = document.createElement('style');
    s.id = IDS.style;
    s.textContent = CSS;
    (document.head || document.documentElement).appendChild(s);
  }

  /* ------------------------------ Mount --------------------------------- */
  function mount() {
    if (document.getElementById(IDS.root)) return;
    if (!document.body) return;
    injectStyle();

    const root = document.createElement('div');
    root.id = IDS.root;

    const launcher = document.createElement('button');
    launcher.id = IDS.launcher;
    launcher.type = 'button';
    launcher.setAttribute('aria-haspopup', 'menu');
    launcher.setAttribute('aria-expanded', 'false');
    launcher.setAttribute('aria-label', 'guild-console tools');
    launcher.title = 'guild-console tools';
    const img = document.createElement('img');
    img.src = iconSrc();
    img.alt = '';
    launcher.appendChild(img);
    // Outside-click closing is handled by a capture-phase document listener
    // (see below); this handler only toggles.
    launcher.addEventListener('click', toggleMenu);

    const menu = document.createElement('div');
    menu.id = IDS.menu;
    menu.setAttribute('role', 'menu');
    menu.addEventListener('keydown', onMenuKeydown);

    // Launcher first for natural tab order, menu second (positioned via CSS).
    root.appendChild(launcher);
    root.appendChild(menu);
    document.body.appendChild(root);
  }

  /* --------------------------- Global handlers -------------------------- */
  // Close when clicking outside the widget (capture phase so it runs before
  // Discord's own handlers; the root.contains check keeps launcher/menu clicks
  // from self-closing).
  document.addEventListener('click', (e) => {
    const root = document.getElementById(IDS.root);
    if (isOpen() && root && !root.contains(e.target)) closeMenu(false);
  }, true);

  // Close on Escape and return focus to the launcher.
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen()) closeMenu(true);
  });

  // Close on client-side navigation (relevance is re-computed on each open).
  let lastUrl = location.href;
  const onNav = () => {
    if (location.href !== lastUrl) { lastUrl = location.href; closeMenu(false); }
  };
  ['pushState', 'replaceState'].forEach(method => {
    const original = history[method];
    history[method] = function () {
      const result = original.apply(this, arguments);
      onNav();
      return result;
    };
  });
  window.addEventListener('popstate', onNav);

  // Discord rebuilds the DOM on navigation, so re-mount the widget if it ever
  // gets removed. Bail cheaply when it's present, and coalesce work into a
  // single animation frame so we add negligible overhead to Discord's churn.
  let scheduled = false;
  const scheduleMount = () => {
    if (scheduled || document.getElementById(IDS.root)) return;
    scheduled = true;
    requestAnimationFrame(() => { scheduled = false; mount(); });
  };
  mount();
  const observer = new MutationObserver(scheduleMount);
  observer.observe(document.documentElement, { childList: true, subtree: true });
})();
