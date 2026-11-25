/* Shared helpers for every page: safe storage + light/dark theme */
const store = {
  get(k, d){ try{ const v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); }catch(e){ return d; } },
  set(k, v){ try{ localStorage.setItem(k, JSON.stringify(v)); }catch(e){} }
};

/* Theme: light by default; the toggle choice is remembered across all pages.
   (Older visitors may have saved it under 'pcol2-theme', so fall back to that.) */
(function(){
  const root = document.documentElement;
  const saved = store.get('bloom-theme', null) || store.get('pcol2-theme', null) || 'light';
  root.setAttribute('data-theme', saved);
  document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('themeBtn');
    if(!btn) return;
    btn.addEventListener('click', () => {
      const nxt = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', nxt);
      store.set('bloom-theme', nxt);
    });
  });
})();
