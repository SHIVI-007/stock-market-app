/**
 * Applies the saved (or system) theme before first paint, so there is never a
 * flash of the wrong theme.
 *
 * This is the pattern Next.js documents for themes (see the "Preventing flash
 * before hydration" guide): an inline script that runs during HTML *parsing*,
 * before React is involved. `session-provider.tsx` re-applies the value after
 * React's development-mode remount clears it.
 *
 * Mirrors `lib/theme/theme.ts`; keep the two in step.
 */
const THEME_SCRIPT = `(function(){try{
    var stored = localStorage.getItem('smf-theme');
    var pref = (stored === 'light' || stored === 'dark' || stored === 'system') ? stored : 'system';
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var dark = pref === 'system' ? prefersDark : pref === 'dark';
    var el = document.documentElement;
    el.classList.toggle('dark', dark);
    el.setAttribute('data-theme', dark ? 'dark' : 'light');
  }catch(e){ document.documentElement.classList.add('dark'); }})();`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />;
}
