/* ============================================================
   Shared reviewer logic.
   reviewer.html loads a subject data file (window.SUBJECT), then calls init(SUBJECT, META).

   Subject data (all optional except TOPICS):
     TOPICS     {key: {n:"Name", c:"lav", g:"Group"}}   sections; g groups them into parts
     MCQ        [topic, question, [correct, wrong, wrong, wrong], explanation]
                [topic, "morse", statement1, statement2, "TF"|"FT"|"TT"|"FF", explanation]
     IDQ        [topic, question, [accepted answers], display answer, explanation]
     TFQ        [topic, statement, true|false, explanation]
     MCQ_SETS   [{key, name, group, c}]   split MCQs into one quiz per group
     studyHTML, FLIPS, PEARLS            study cards tab (hidden when absent)
   ============================================================ */
function init(SUBJECT, META){
const {TOPICS} = SUBJECT;
const MCQ = SUBJECT.MCQ || [], IDQ = SUBJECT.IDQ || [], TFQ = SUBJECT.TFQ || [];
const FLIPS = SUBJECT.FLIPS || [], PEARLS = SUBJECT.PEARLS || [];
const HAS_STUDY = !!SUBJECT.studyHTML;
const GROUPS = [...new Set(Object.values(TOPICS).map(t => t.g).filter(Boolean))];
const K = s => SUBJECT.id + '-' + s;   // per-subject storage keys (pcol1-mastered, cp1-stats, ...)
const $ = id => document.getElementById(id);

/* ---------------- Utilities ---------------- */
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const norm=s=>String(s).toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g,'').replace(/β/g,'beta').replace(/[^a-z0-9]/g,'');
function lev(a,b){const m=a.length,n=b.length;if(!m)return n;if(!n)return m;let p=Array.from({length:n+1},(_,i)=>i);
  for(let i=1;i<=m;i++){const c=[i];for(let j=1;j<=n;j++)c[j]=Math.min(p[j]+1,c[j-1]+1,p[j-1]+(a[i-1]===b[j-1]?0:1));p=c}return p[n]}
function matchId(input,acc){const x=norm(input);if(!x)return false;
  return acc.some(a=>{const y=norm(a);if(x===y)return true;const tol=y.length>=9?2:y.length>=5?1:0;return lev(x,y)<=tol});}
const topicPill=t=>`<span class="pill p-${(TOPICS[t]||{}).c||'lav'}">${esc((TOPICS[t]||{}).n||t)}</span>`;

/* ---------------- Page chrome ---------------- */
document.title = META.title + ' · Bloom Reviewer';
$('subjTitle').textContent = META.title;
$('subjSub').textContent = META.subtitle || '';
$('paneTitle').textContent = META.title;
$('subjFolder').classList.add('f-' + (META.folder || 'pastel-pinstripe'));
$('footSrc').textContent = META.source || META.title;
const NOTES = ["one question at a time ✿","you are not behind","small steps still count","proud of you for showing up","breathe, then one more","future RPh in progress ♡"];
$('helloNote').textContent = NOTES[Math.floor(Math.random()*NOTES.length)];

/* Other folders in the sidebar */
$('otherFolders').innerHTML = (window.SUBJECTS||[]).filter(s=>s.id!==SUBJECT.id).map(s=>
  `<a class="folder-link" href="reviewer.html?s=${encodeURIComponent(s.id)}"><span class="mini-folder f-${esc(s.folder||'pastel-pinstripe')}"><i></i></span><span><b>${esc(s.title)}</b><small>${esc(s.subtitle||'')}</small></span></a>`
).join('') + `<a class="folder-link home-link" href="index.html"><span class="home-ic">⌂</span><span><b>Home</b><small>all folders</small></span></a>`;

/* Study cards (optional) */
if(HAS_STUDY){
  $('studyGrid').innerHTML = SUBJECT.studyHTML;
  /* Phone-friendly tables: remember each column's heading on its cells */
  document.querySelectorAll('#studyGrid .tbl').forEach(t=>{
    const head=t.querySelector('tr'); if(!head||!head.querySelector('th')) return;
    head.classList.add('tbl-head');
    const labels=[...head.children].map(th=>th.textContent.trim());
    [...t.querySelectorAll('tr')].slice(1).forEach(tr=>[...tr.children].forEach((td,i)=>{ if(labels[i]) td.dataset.label=labels[i]; }));
  });
} else {
  document.querySelectorAll('[data-study]').forEach(el=>el.hidden=true);
}

/* ---------------- Question objects ---------------- */
const MORSE_CODES = ["TF","FT","TT","FF"];
const MORSE_TEXT = {TF:"Statement 1 is TRUE, Statement 2 is FALSE", FT:"Statement 1 is FALSE, Statement 2 is TRUE", TT:"BOTH statements are TRUE", FF:"BOTH statements are FALSE"};
function mcqItem(r,i){
  if(r[1]==='morse'){
    const code=r[4], others=MORSE_CODES.filter(c=>c!==code);
    return {id:"m"+i, topic:r[0], morse:true, s1:r[2], s2:r[3], code, exp:r[5],
      q:`Statement 1: ${r[2]}  ·  Statement 2: ${r[3]}`,
      opts:[MORSE_TEXT[code], ...others.map(c=>MORSE_TEXT[c])],
      order:MORSE_CODES.map(c=>c===code?0:1+others.indexOf(c))};   // fixed A–D order
  }
  return {id:"m"+i, topic:r[0], q:r[1], opts:r[2], exp:r[3]};
}
const LEVELS = {
  mcq:{type:"mcq",name:"Level 1 · Multiple Choice",accent:"var(--lav)",pill:"p-lav",desc:"Core concept checks with 4 options.",
       items:MCQ.map(mcqItem)},
  id:{type:"id",name:"Level 2 · Identification",accent:"var(--sage)",pill:"p-sage",desc:"Type the key term, enzyme, drug or mnemonic. Small typos are forgiven.",
      items:IDQ.map((r,i)=>({id:"i"+i,topic:r[0],q:r[1],acc:r[2],disp:r[3],exp:r[4]}))},
  tf:{type:"tf",name:"Level 3 · True or False",accent:"var(--peach)",pill:"p-peach",desc:"Nuanced statements on clinical exceptions and rationales.",
      items:TFQ.map((r,i)=>({id:"t"+i,topic:r[0],q:r[1],ans:r[2],exp:r[3]}))}
};
for(const k of Object.keys(LEVELS)){
  if(!LEVELS[k].items.length){ delete LEVELS[k]; const t=document.querySelector('.tab[data-tab="'+k+'"]'); if(t) t.hidden=true; }
}
/* Optional: one MCQ quiz per topic group */
if(SUBJECT.MCQ_SETS && LEVELS.mcq){
  const all = LEVELS.mcq.items;
  delete LEVELS.mcq;
  document.querySelector('.tab[data-tab="mcq"]').hidden = true;
  const nav = document.querySelector('nav.tabs'), before = document.querySelector('.tab[data-tab="id"]');
  const main = document.querySelector('main'), loadMsg = $('loadMsg');
  SUBJECT.MCQ_SETS.forEach((set, i) => {
    const items = all.filter(x => (TOPICS[x.topic] || {}).g === set.group);
    if(!items.length) return;
    const key = 'mcq-' + set.key, c = set.c || ['lav','sage','peach','sky','rose','butter'][i % 6];
    LEVELS[key] = {type:"mcq", name:`${i+1} · ${set.name}`, accent:`var(--${c})`, pill:`p-${c}`, color:c,
      desc: set.desc || `Practice questions on ${set.name}.`, items};
    const tab = document.createElement('button');
    tab.className = 'tab'; tab.setAttribute('role','tab'); tab.dataset.tab = key; tab.setAttribute('aria-selected','false');
    tab.innerHTML = `<span class="dot" style="background:var(--${c})"></span><span class="t-name">${i+1} · ${esc(set.name)}</span><span class="badge" id="b-${key}">–</span><span class="t-bar"><i id="tb-${key}"></i></span>`;
    nav.insertBefore(tab, before);
    const panel = document.createElement('section');
    panel.className = 'panel'; panel.id = 'p-' + key;
    main.insertBefore(panel, loadMsg);
  });
}
const T = k => LEVELS[k].type;
const hasMorse = k => LEVELS[k].items.some(x=>x.morse);
const TOTAL = Object.values(LEVELS).reduce((a,l)=>a+l.items.length,0);

/* ---------------- Saved progress ---------------- */
let mastered = new Set(store.get(K('mastered'),[]));     // ever answered correctly
let wrong = new Set(store.get(K('wrong'),[]));           // most recent answer was wrong
let best = store.get(K('best'),{});                      // best % per quiz (full run)
let stats = Object.assign({answered:0,correct:0,streak:0,bestStreak:0}, store.get(K('stats'),{}));
const saveSets=()=>{store.set(K('mastered'),[...mastered]);store.set(K('wrong'),[...wrong]);};

function updateSidebar(){
  store.set(K('total'),TOTAL);
  const ids=new Set(Object.values(LEVELS).flatMap(l=>l.items.map(x=>x.id)));
  const n=[...mastered].filter(id=>ids.has(id)).length;
  $('masteryLbl').textContent=`Mastered ${n} / ${TOTAL}`;
  $('masteryBar').style.width=(TOTAL?n/TOTAL*100:0)+'%';
  $('stAcc').textContent = stats.answered ? Math.round(stats.correct/stats.answered*100)+'%' : '–';
  $('stAns').textContent = stats.answered;
  $('stStreak').textContent = stats.streak;
  $('stMiss').textContent = [...wrong].filter(id=>ids.has(id)).length;
  for(const k in LEVELS){
    const L=LEVELS[k], m=L.items.filter(x=>mastered.has(x.id)).length;
    const b=$('b-'+k); if(b) b.textContent = best[k]!=null ? best[k]+'%' : L.items.length+'q';
    const tb=$('tb-'+k); if(tb) tb.style.width=(m/L.items.length*100)+'%';
  }
}

/* ---------------- Quiz state ---------------- */
const S={};
for(const k in LEVELS) S[k]={topic:'all',kind:'all',queue:[],pos:0,results:{},picks:{},answered:false,mode:'all',optOrder:{}};

function inTopic(x,sel){ if(sel==='all') return true; if(sel.startsWith('g:')) return (TOPICS[x.topic]||{}).g===sel.slice(2); return x.topic===sel; }
function inKind(x,kind){ if(kind==='mcq') return !x.morse; if(kind==='morse') return !!x.morse; if(kind==='missed') return wrong.has(x.id); return true; }
function poolFor(k){const st=S[k];return LEVELS[k].items.filter(x=>inTopic(x,st.topic)&&inKind(x,st.kind))}
function startLevel(k,mode){
  const st=S[k]; st.mode=mode||'all';
  const pool = st.mode==='mistakes' ? LEVELS[k].items.filter(x=>st.results[x.id]===false) : poolFor(k);
  st.queue=shuffle(pool.map(x=>x.id)); st.pos=0; st.results={}; st.picks={}; st.answered=false; st.optOrder={};
  renderLevel(k);
}
const itemById=(k,id)=>LEVELS[k].items.find(x=>x.id===id);

/* Keep the progress bar + question in view (below the phone top bar) instead of jumping to the page top */
function keepInView(k){
  const target=document.querySelector('#p-'+k+' .qprog'); if(!target) return;
  const bar=document.querySelector('.pane-bar');
  const barH=bar&&getComputedStyle(bar).display!=='none'?bar.getBoundingClientRect().height:0;
  const top=target.getBoundingClientRect().top;
  const card=document.querySelector('#p-'+k+' .card');
  const bottom=card?card.getBoundingClientRect().bottom:top;
  if(top<barH+4 || bottom>window.innerHeight) window.scrollTo({top:window.scrollY+top-barH-10,behavior:'instant'});
}

function topicOptions(k){
  const L=LEVELS[k], st=S[k];
  const topicsHere=[...new Set(L.items.map(x=>x.topic))];
  const groupsHere=GROUPS.filter(g=>topicsHere.some(t=>TOPICS[t].g===g));
  const opt=(v,label,n)=>`<option value="${v}" ${st.topic===v?'selected':''}>${esc(label)} (${n})</option>`;
  const cnt=v=>L.items.filter(x=>inTopic(x,v)).length;
  return `<option value="all">All sections (${L.items.length})</option>` + (groupsHere.length>1
    ? groupsHere.map(g=>{const ts=topicsHere.filter(t=>TOPICS[t].g===g);
        return `<optgroup label="${esc(g)}">${opt('g:'+g,'All '+g,cnt('g:'+g))}${ts.map(t=>opt(t,TOPICS[t].n,cnt(t))).join('')}</optgroup>`;}).join('')
    : topicsHere.map(t=>opt(t,TOPICS[t].n,cnt(t))).join(''));
}
function kindOptions(k){
  const st=S[k], L=LEVELS[k], o=(v,label)=>`<option value="${v}" ${st.kind===v?'selected':''}>${label}</option>`;
  const missed=L.items.filter(x=>wrong.has(x.id)).length;
  return o('all','All question types') + (hasMorse(k)
      ? o('mcq',`Multiple choice only (${L.items.filter(x=>!x.morse).length})`) + o('morse',`Morse type only (${L.items.filter(x=>x.morse).length})`) : '')
    + o('missed',`Missed before (${missed})`);
}

function renderLevel(k){
  const L=LEVELS[k], st=S[k], el=$('p-'+k);
  const done=Object.keys(st.results).length, correct=Object.values(st.results).filter(Boolean).length;
  const total=st.queue.length;
  const nMorse=L.items.filter(x=>x.morse).length;
  const kindLabel = nMorse ? (nMorse===L.items.length ? 'Morse' : 'MCQ + Morse') : (T(k)==='mcq'?'MCQ':T(k)==='tf'?'T/F':'ID');
  const head=`
  <div class="intro">
    <div style="flex:1;min-width:220px">
      <span class="pill ${L.pill}">${kindLabel} · ${L.items.length} questions</span>
      <h2 style="margin-top:6px">${esc(L.name)}</h2>
      <p>${esc(L.desc)}${T(k)!=='id'?' Keys 1–4 (or T/F) answer, Enter goes next.':''}</p>
    </div>
  </div>
  <div class="qtop">
    <select class="sel" id="sel-${k}" aria-label="Filter by section">${topicOptions(k)}</select>
    <select class="sel" id="kind-${k}" aria-label="Filter by question type">${kindOptions(k)}</select>
    <div class="stats">
      <span class="stat">✓ <b>${correct}</b> correct</span>
      <span class="stat">✗ <b>${done-correct}</b> missed</span>
      ${st.mode==='mistakes'?'<span class="stat drill">mistakes drill</span>':''}
    </div>
    <div class="spacer"></div>
    <button class="btn ghost" id="restart-${k}">↻ Restart</button>
  </div>
  <div class="qprog"><div class="lbl"><span>Question ${Math.min(st.pos+1,total)} of ${total}</span><span>${total?Math.round(done/total*100):0}% done</span></div>
    <div class="bar"><i style="width:${total?done/total*100:0}%"></i></div></div>`;
  let body='';
  if(st.pos>=total){ body=summaryHTML(k); }
  else{
    const it=itemById(k,st.queue[st.pos]);
    const qHTML = it.morse
      ? `<p class="qtext">Evaluate the two statements:</p>
         <div class="morse"><div class="ms"><span class="ms-n">1</span><p>${esc(it.s1)}</p></div><div class="ms"><span class="ms-n">2</span><p>${esc(it.s2)}</p></div></div>`
      : `<p class="qtext">${esc(it.q)}</p>`;
    body=`<div class="card qcard" style="--accent:${L.accent}">
      <div class="qmeta"><span class="qnum">#${st.pos+1}</span>${topicPill(it.topic)}${it.morse?'<span class="pill p-butter">morse type</span>':''}</div>
      ${qHTML}
      <div id="ans-${k}">${answerHTML(k,it)}</div>
      <div id="fb-${k}" aria-live="polite"></div>
      <div class="qnav">
        <button class="btn soft" id="prev-${k}" ${st.pos===0?'disabled':''}>← Previous</button>
        <div class="qnav-r"><button class="btn soft" id="skip-${k}">Skip</button><button class="btn" id="next-${k}" disabled>Next →</button></div>
      </div>
    </div>`;
  }
  el.innerHTML=head+body;
  $('sel-'+k).onchange=e=>{st.topic=e.target.value;startLevel(k,'all')};
  $('kind-'+k).onchange=e=>{st.kind=e.target.value;startLevel(k,'all')};
  $('restart-'+k).onclick=()=>startLevel(k,'all');
  if(st.pos<total) wireQuestion(k); else wireSummary(k);
}

function answerHTML(k,it){
  if(T(k)==='mcq'){
    if(!S[k].optOrder[it.id]) S[k].optOrder[it.id]=it.order||shuffle([0,1,2,3]);
    return `<div class="opts${it.morse?' morse-opts':''}">${S[k].optOrder[it.id].map((oi,n)=>`<button class="opt" data-oi="${oi}"><span class="k">${"ABCD"[n]}</span><span>${esc(it.opts[oi])}</span></button>`).join('')}</div>`;
  }
  if(T(k)==='tf') return `<div class="tf"><button class="opt" data-v="1">🌿 True</button><button class="opt" data-v="0">🍑 False</button></div>`;
  return `<form class="idrow" id="idf" autocomplete="off"><input id="idin" placeholder="Type your answer…" aria-label="Your answer" autocomplete="off" spellcheck="false"><button class="btn sage" type="submit">Check</button></form>`;
}

function refreshCounters(k){
  const st=S[k], done=Object.keys(st.results).length, correct=Object.values(st.results).filter(Boolean).length;
  const s=document.querySelectorAll('#p-'+k+' .stat b'); if(s[0]){s[0].textContent=correct;s[1].textContent=done-correct;}
  const bar=document.querySelector('#p-'+k+' .qprog .bar i'); if(bar) bar.style.width=(done/st.queue.length*100)+'%';
  const lbl=document.querySelector('#p-'+k+' .qprog .lbl span:last-child'); if(lbl) lbl.textContent=Math.round(done/st.queue.length*100)+'% done';
}
function unlockNav(k){
  S[k].answered=true;
  $('next-'+k).disabled=false;
  $('skip-'+k).classList.add('hidden');
}
function record(k,it,ok,pick){
  const st=S[k]; st.results[it.id]=ok; st.picks[it.id]=pick;
  stats.answered++; if(ok){stats.correct++;stats.streak++;stats.bestStreak=Math.max(stats.bestStreak,stats.streak);} else stats.streak=0;
  store.set(K('stats'),stats);
  if(ok){mastered.add(it.id);wrong.delete(it.id);} else wrong.add(it.id);
  saveSets(); updateSidebar(); refreshCounters(k); unlockNav(k);
  $('next-'+k).focus({preventScroll:true});
}
function feedback(k,ok,answerText,exp,extra){
  $('fb-'+k).innerHTML=`<div class="fb ${ok?'ok':'no'}">
    <div class="h">${ok?'✨ Correct!':'💭 Not quite'}</div>
    ${!ok&&answerText?`<p>Correct answer: <span class="ans">${esc(answerText)}</span></p>`:''}
    <p>${esc(exp)}</p>${extra||''}</div>`;
}

/* Paint a question exactly as it was answered (used after Previous) */
function paintMcq(k,it,pick){
  document.querySelectorAll('#ans-'+k+' .opt').forEach(x=>{x.disabled=true; const xi=+x.dataset.oi;
    if(xi===0)x.classList.add('ok'); else if(xi===pick)x.classList.add('no'); else x.classList.add('dim');});
}
function paintTf(k,it){
  document.querySelectorAll('#ans-'+k+' .opt').forEach(x=>{x.disabled=true; x.classList.add((x.dataset.v==='1')===it.ans?'ok':'no');});
}

function wireQuestion(k){
  const st=S[k], it=itemById(k,st.queue[st.pos]);
  const next=()=>{ if(!st.answered) return; st.pos++; st.answered=false; renderLevel(k); keepInView(k); };
  $('next-'+k).onclick=next;
  $('prev-'+k).onclick=()=>{ if(st.pos>0){ st.pos--; renderLevel(k); keepInView(k); } };
  $('skip-'+k).onclick=()=>{ st.queue.push(st.queue.splice(st.pos,1)[0]); renderLevel(k); keepInView(k); };
  const prior = st.results[it.id];
  st.answered = prior!==undefined;

  if(T(k)==='mcq'){
    if(st.answered){ paintMcq(k,it,st.picks[it.id]); feedback(k,prior,it.opts[0],it.exp); unlockNav(k); return; }
    document.querySelectorAll('#ans-'+k+' .opt').forEach(b=>b.onclick=()=>{
      if(st.answered)return;
      const oi=+b.dataset.oi, ok=oi===0;
      paintMcq(k,it,oi); record(k,it,ok,oi); feedback(k,ok,it.opts[0],it.exp);
    });
  } else if(T(k)==='tf'){
    if(st.answered){ paintTf(k,it); feedback(k,prior,it.ans?'True':'False',it.exp); unlockNav(k); return; }
    document.querySelectorAll('#ans-'+k+' .opt').forEach(b=>b.onclick=()=>{
      if(st.answered)return;
      const v=b.dataset.v==='1', ok=v===it.ans;
      paintTf(k,it); record(k,it,ok,v); feedback(k,ok,it.ans?'True':'False',it.exp);
    });
  } else {
    const f=$('idf'), inp=$('idin');
    const lock=(ok,text)=>{ inp.value=text; inp.readOnly=true; inp.classList.add(ok?'ok':'no'); f.querySelector('button').disabled=true; };
    if(st.answered){ lock(prior,st.picks[it.id]||''); feedback(k,prior,it.disp,it.exp); unlockNav(k); f.onsubmit=e=>{e.preventDefault();next();}; return; }
    setTimeout(()=>inp.focus({preventScroll:true}),50);
    f.onsubmit=e=>{
      e.preventDefault();
      if(st.answered){next();return;}
      if(!inp.value.trim()){inp.classList.add('no');setTimeout(()=>inp.classList.remove('no'),400);return;}
      const ok=matchId(inp.value,it.acc);
      lock(ok,inp.value); record(k,it,ok,inp.value);
      feedback(k,ok,it.disp,it.exp, ok?`<p style="margin-top:8px">Accepted answer: <span class="ans">${esc(it.disp)}</span></p>`:`<p style="margin-top:10px"><button class="btn ghost" id="override" style="padding:6px 12px;border:1px solid var(--no-bd)">I meant that, so count it as correct</button></p>`);
      const ov=$('override');
      if(ov) ov.onclick=()=>{
        st.results[it.id]=true; mastered.add(it.id); wrong.delete(it.id); saveSets();
        stats.correct++; stats.streak++; stats.bestStreak=Math.max(stats.bestStreak,stats.streak); store.set(K('stats'),stats);
        updateSidebar(); refreshCounters(k);
        inp.classList.remove('no'); inp.classList.add('ok');
        feedback(k,true,'',it.exp,`<p style="margin-top:8px">Counted as correct ✓ (expected: <span class="ans">${esc(it.disp)}</span>)</p>`);
      };
    };
  }
}

function summaryHTML(k){
  const L=LEVELS[k], st=S[k];
  const ids=st.queue, total=ids.length;
  if(!total) return `<div class="card"><h3>No questions here 🌱</h3><p>Nothing matches this filter yet. Pick another section or question type.</p></div>`;
  const correct=ids.filter(id=>st.results[id]).length, pct=Math.round(correct/total*100);
  const missed=ids.filter(id=>st.results[id]===false);
  const skipped=ids.filter(id=>st.results[id]===undefined);
  if(st.mode==='all' && st.topic==='all' && st.kind==='all'){ if(best[k]==null||pct>best[k]){best[k]=pct;store.set(K('best'),best);updateSidebar();} }
  const review = HAS_STUDY ? 'the matching study cards' : 'your notes for these sections';
  const msg = pct>=90?['Board-ready! 🌸','You are blooming. Keep it fresh with a quick mistakes drill.']:pct>=75?['So close to mastery 🌿','A few soft spots left. Drill the misses below.']:pct>=50?['Good progress 🍑',`Review ${review}, then retry your mistakes.`]:['Every expert started here 🌱',`Read ${review}, then try again.`];
  const C=2*Math.PI*62;
  const ring=`<div class="ring"><svg viewBox="0 0 150 150"><circle cx="75" cy="75" r="62" fill="none" stroke="var(--surface-2)" stroke-width="14"/>
    <circle cx="75" cy="75" r="62" fill="none" stroke="${L.accent}" stroke-width="14" stroke-linecap="round" stroke-dasharray="${C}" stroke-dashoffset="${C}" id="ringArc"/></svg>
    <div class="v"><div><b>${pct}%</b><small>${correct} / ${total}</small></div></div></div>`;
  const list=missed.map(id=>{const it=itemById(k,id);const a=T(k)==='mcq'?it.opts[0]:T(k)==='tf'?(it.ans?'True':'False'):it.disp;
    const q=it.morse?`<div class="miss-ms"><b>1.</b> ${esc(it.s1)}</div><div class="miss-ms"><b>2.</b> ${esc(it.s2)}</div>`:`<b>${esc(it.q)}</b>`;
    return `<div class="miss">${topicPill(it.topic)}<div style="margin-top:6px">${q}</div><div style="margin-top:4px">→ <span class="a">${esc(a)}</span></div><div class="note" style="margin-top:4px">${esc(it.exp)}</div></div>`}).join('');
  return `<div class="card" style="--accent:${L.accent}">
    <div class="sum">${ring}<div><span class="pill ${L.pill}">${st.mode==='mistakes'?'Mistakes drill complete':'Set complete'}</span><h2 style="margin-top:6px">${msg[0]}</h2><p style="margin:0;color:var(--muted)">${msg[1]}${skipped.length?` (${skipped.length} unanswered)`:''}</p>
      <div class="acts"><button class="btn rose" id="retryMiss-${k}" ${missed.length?'':'disabled'}>🎯 Retry mistakes only (${missed.length})</button><button class="btn soft" id="retryAll-${k}">↻ Retry all</button></div></div></div>
    ${missed.length?`<h3 style="margin-top:24px">Review your misses</h3><div class="missed">${list}</div>`:`<p style="margin-top:20px;text-align:center;font-weight:700">Perfect run, no mistakes to drill! 🏆</p>`}
  </div>`;
}
function wireSummary(k){
  const st=S[k];
  const m=$('retryMiss-'+k), a=$('retryAll-'+k);
  if(m) m.onclick=()=>startLevel(k,'mistakes');
  if(a) a.onclick=()=>startLevel(k,'all');
  const arc=$('ringArc');
  if(arc){const total=st.queue.length,c=st.queue.filter(id=>st.results[id]).length,C=2*Math.PI*62;
    requestAnimationFrame(()=>{arc.style.transition='stroke-dashoffset 1.1s cubic-bezier(.3,1.2,.5,1)';arc.style.strokeDashoffset=C*(1-c/total)}); if(c/total>=.9) confetti();}
}
function confetti(){
  const box=document.createElement('div');box.className='confetti';
  const cols=['var(--rose)','var(--lav)','var(--sage)','var(--peach)','var(--butter)','var(--sky)'];
  for(let i=0;i<60;i++){const p=document.createElement('i');p.style.left=Math.random()*100+'vw';p.style.background=cols[i%cols.length];
    p.style.animationDuration=(1.8+Math.random()*1.8)+'s';p.style.animationDelay=(Math.random()*.5)+'s';box.appendChild(p);}
  document.body.appendChild(box);setTimeout(()=>box.remove(),4200);
}

/* ---------------- Keyboard ---------------- */
document.addEventListener('keydown',e=>{
  const k=currentTab; if(!LEVELS[k]) return;
  if(e.target.tagName==='SELECT'||e.target.tagName==='INPUT') return;
  const st=S[k]; if(st.pos>=st.queue.length) return;
  if(e.key==='ArrowLeft'){const p=$('prev-'+k); if(p&&!p.disabled) p.click(); return;}
  if((e.key==='Enter'||e.key==='ArrowRight')&&st.answered){e.preventDefault();$('next-'+k).click();return;}
  if(st.answered||T(k)==='id') return;
  if(T(k)==='mcq'){const n={'1':0,'2':1,'3':2,'4':3,'a':0,'b':1,'c':2,'d':3}[e.key.toLowerCase()];
    if(n!=null){const b=document.querySelectorAll('#ans-'+k+' .opt')[n]; if(b)b.click();}}
  if(T(k)==='tf'){const key=e.key.toLowerCase(); if(key==='t')document.querySelector('#ans-'+k+' .opt[data-v="1"]').click(); if(key==='f')document.querySelector('#ans-'+k+' .opt[data-v="0"]').click();}
});

/* ---------------- Sections (sidebar tabs) ---------------- */
let currentTab='study';
const side=$('side'), scrim=$('scrim');
const openSide=o=>{side.classList.toggle('open',o);scrim.classList.toggle('on',o);document.body.classList.toggle('side-open',o);};
$('menuBtn').onclick=()=>openSide(true);
$('sideClose').onclick=()=>openSide(false);
scrim.onclick=()=>openSide(false);
document.addEventListener('keydown',e=>{if(e.key==='Escape')openSide(false);});

function showTab(t){
  currentTab=t;
  document.querySelectorAll('.tab').forEach(b=>b.setAttribute('aria-selected',b.dataset.tab===t));
  document.querySelectorAll('.panel').forEach(p=>p.classList.toggle('on',p.id==='p-'+t));
  if(LEVELS[t] && !S[t].queue.length) startLevel(t,'all');
  const sel=document.querySelector('.tab[data-tab="'+t+'"] .t-name');
  $('paneSection').textContent = sel ? sel.textContent : 'Study Cards';
  store.set(K('tab'),t);
}
document.querySelectorAll('.tab').forEach(b=>b.onclick=()=>{showTab(b.dataset.tab);openSide(false);window.scrollTo({top:0})});

/* ---------------- Study chips, flips, pearls ---------------- */
if(HAS_STUDY){
  const chips=$('studyChips');
  const chip=t=>`<button class="chip ${t==='all'?'on':''}" data-t="${t}">${t==='all'?'🌼 All':esc(TOPICS[t].n)}</button>`;
  chips.innerHTML = GROUPS.length
    ? chip('all') + GROUPS.map(g=>`<span class="chip-group">${esc(g)}</span>`+Object.keys(TOPICS).filter(t=>TOPICS[t].g===g).map(chip).join('')).join('')
    : ['all',...Object.keys(TOPICS)].map(chip).join('');
  chips.onclick=e=>{const b=e.target.closest('.chip');if(!b)return;
    chips.querySelectorAll('.chip').forEach(c=>c.classList.toggle('on',c===b));
    const t=b.dataset.t; document.querySelectorAll('#studyGrid .study').forEach(c=>c.classList.toggle('hidden',t!=='all'&&!c.dataset.topic.split(' ').includes(t)));};
  if($('flips')){
    $('flips').innerHTML=FLIPS.map(f=>`<button class="flip" aria-label="Mnemonic ${f[0]}: tap to reveal"><div class="in"><div class="f bg-${f[3]}"><span class="mn">${f[0]}</span><small>${f[1]}</small></div><div class="b"><div><span>${f[2]}</span></div></div></div></button>`).join('');
    $('flips').onclick=e=>{const b=e.target.closest('.flip');if(b)b.classList.toggle('on')};
  }
  if($('pearls')) $('pearls').innerHTML=PEARLS.map(p=>`<div class="pearl"><span class="ic">${p[0]}</span><span>${p[1]}</span></div>`).join('');
}

updateSidebar();
const first = HAS_STUDY ? 'study' : Object.keys(LEVELS)[0];
const savedTab = store.get(K('tab'), first);
showTab((savedTab==='study'&&HAS_STUDY)||LEVELS[savedTab] ? savedTab : first);
}
