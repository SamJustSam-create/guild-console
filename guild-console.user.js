// ==UserScript==
// @name         guild-console
// @namespace    https://github.com/SamJustSam-create/guild-console
// @version      1.1.0
// @description  Adds a button to enable all permissions for the currently-open Discord role.
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

  const BTN_ID   = 'enable-all-perms-btn';
  const DIAG_ID  = 'enable-all-perms-diag';
  const TOAST_ID = 'enable-all-perms-toast';

  function toast(msg) {
    let t = document.getElementById(TOAST_ID);
    if (!t) {
      t = document.createElement('div');
      t.id = TOAST_ID;
      Object.assign(t.style, {
        position: 'fixed', bottom: '110px', right: '20px', zIndex: 2147483647,
        background: '#1e1f22', color: '#fff', padding: '8px 12px',
        borderRadius: '8px', font: '13px/1.4 sans-serif',
        boxShadow: '0 4px 12px rgba(0,0,0,.4)', pointerEvents: 'none',
        opacity: '0', transition: 'opacity .2s', maxWidth: '280px'
      });
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.style.opacity = '1';
    clearTimeout(t._hideTimer);
    t._hideTimer = setTimeout(() => { t.style.opacity = '0'; }, 4000);
  }

  // Fire a full, bubbling pointer+mouse+click sequence so React handlers
  // that listen on pointerdown/mousedown (not just click) still react.
  function hardClick(el) {
    const opts = { bubbles: true, cancelable: true, view: window };
    ['pointerdown', 'mousedown', 'pointerup', 'mouseup', 'click'].forEach(type => {
      const Ctor = type.startsWith('pointer') && window.PointerEvent ? PointerEvent : MouseEvent;
      el.dispatchEvent(new Ctor(type, opts));
    });
  }

  // Collect the permission toggles regardless of which component Discord uses.
  function collectToggles() {
    const checkboxes = Array.from(document.querySelectorAll('input[type="checkbox"]'));
    const roleSwitches = Array.from(document.querySelectorAll('[role="switch"]'));
    return { checkboxes, roleSwitches };
  }

  function enableAll() {
    const { checkboxes, roleSwitches } = collectToggles();
    let flipped = 0;

    // Strategy A: real checkbox inputs (Discord's classic switch). A native
    // .click() toggles `checked` and fires the change event React listens for.
    checkboxes.forEach(cb => {
      if (!cb.checked) { cb.click(); flipped++; }
    });

    // Strategy B: accessible role="switch" divs/buttons with aria-checked.
    roleSwitches.forEach(sw => {
      if (sw.getAttribute('aria-checked') === 'false') { hardClick(sw); flipped++; }
    });

    if (!checkboxes.length && !roleSwitches.length) {
      toast('No toggles found on this page. Open a role’s Permissions tab, then click again. If it still fails, use Diagnose.');
      return;
    }
    if (!flipped) {
      toast('Everything was already ON (or nothing was OFF to flip).');
      return;
    }
    toast(`Flipped ${flipped} toggle${flipped === 1 ? '' : 's'} to ON. Review, then click Discord’s "Save Changes".`);
  }

  // Copies a compact report of what's on the page to the clipboard so the
  // exact toggle markup can be inspected if auto-enable still doesn't work.
  function diagnose() {
    const { checkboxes, roleSwitches } = collectToggles();
    const trim = (el) => el ? el.outerHTML.slice(0, 600) : '(none)';
    const report =
`Discord toggle diagnostic
URL: ${location.href}
checkbox inputs found: ${checkboxes.length}
  first checkbox: ${trim(checkboxes[0])}
role=switch elements found: ${roleSwitches.length}
  first role=switch: ${trim(roleSwitches[0])}`;

    console.log('[guild-console]', report);
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(report)
        .then(() => toast('Diagnostic copied to clipboard (also in console). Paste it into a GitHub issue.'))
        .catch(() => toast('Diagnostic logged to console (clipboard blocked). Copy it from DevTools.'));
    } else {
      toast('Diagnostic logged to the console (F12). Copy it from there.');
    }
  }

  function makeBtn(id, text, bottom, bg, handler) {
    const btn = document.createElement('button');
    btn.id = id;
    btn.type = 'button';
    btn.textContent = text;
    Object.assign(btn.style, {
      position: 'fixed', right: '20px', bottom, zIndex: 2147483647,
      background: bg, color: '#fff', border: 'none',
      padding: '10px 14px', borderRadius: '8px', cursor: 'pointer',
      font: '600 13px/1 sans-serif', boxShadow: '0 4px 12px rgba(0,0,0,.4)'
    });
    btn.addEventListener('click', handler);
    return btn;
  }

  function addButtons() {
    if (!document.body) return;
    if (!document.getElementById(BTN_ID)) {
      document.body.appendChild(makeBtn(BTN_ID, 'Enable all permissions', '20px', '#5865f2', enableAll));
    }
    if (!document.getElementById(DIAG_ID)) {
      document.body.appendChild(makeBtn(DIAG_ID, 'Diagnose', '64px', '#4e5058', diagnose));
    }
  }

  // Discord is a single-page app that rebuilds the DOM on navigation,
  // so re-inject the buttons whenever they disappear.
  addButtons();
  const observer = new MutationObserver(() => addButtons());
  observer.observe(document.documentElement, { childList: true, subtree: true });
})();
