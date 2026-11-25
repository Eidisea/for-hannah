/* ============================================================
   Hannah's folders: one entry per subject, shown on the home page.
   To add a subject:
     1. Create subjects/<id>.js (copy the shape of pcol1.js or pcol2.js)
     2. Add an entry below with the same id
   ------------------------------------------------------------
   folder  = pattern style. Pick one of:
             "pastel-pinstripe" "butter-stripe" "sage-gingham" "rose-diamond"
             "sky-airmail" "olive-awning" "pink-damask" "peony" "lilac-dots"
   doodle  = little drawing on the folder (optional). Pick one of:
             "dragonfly" "ducks" "stamp" "daisy" "stars" "cat" "heart" or ""
   ============================================================ */
window.SUBJECTS = [
  {
    id: "pcol1",
    title: "PCOL 1",
    subtitle: "Finals · Chemotherapy",
    source: "PCOL 1 Finals annotated lecture",
    folder: "pastel-pinstripe",
    doodle: "dragonfly",
    total: 197
  },
  {
    id: "pcol2",
    title: "PCOL 2",
    subtitle: "Finals · Pure MCQ",
    source: "PCOL 2 Lec Final Notes (Luayon)",
    folder: "peony",
    doodle: "ducks",
    total: 144
  }
];

/* One-time move: the first reviewer used to be saved as "pcol2" before it was renamed PCOL 1.
   Move that saved progress to "pcol1" once, so the new PCOL 2 folder starts fresh. */
(function(){
  try{
    if(localStorage.getItem('bloom-moved-pcol2-to-pcol1')) return;
    ['mastered','best','tab','total'].forEach(k => {
      const v = localStorage.getItem('pcol2-' + k);
      if(v != null){
        if(localStorage.getItem('pcol1-' + k) == null) localStorage.setItem('pcol1-' + k, v);
        localStorage.removeItem('pcol2-' + k);
      }
    });
    localStorage.setItem('bloom-moved-pcol2-to-pcol1', '1');
  }catch(e){}
})();
