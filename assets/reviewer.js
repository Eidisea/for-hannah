/* Shared reviewer logic. reviewer.html loads a subject data file (window.SUBJECT), then calls init(). */
function init(SUBJECT, META){
const {TOPICS} = SUBJECT;
const MCQ = SUBJECT.MCQ || [], IDQ = SUBJECT.IDQ || [], TFQ = SUBJECT.TFQ || [];
const FLIPS = SUBJECT.FLIPS || [], PEARLS = SUBJECT.PEARLS || [];
/* Topic groups (parts), e.g. TOPICS.defs = {n:"Definition of terms", c:"lav", g:"Antibacterials"} */
const GROUPS = [...new Set(Object.values(TOPICS).map(t => t.g).filter(Boolean))];
const K = s => SUBJECT.id + '-' + s;   // per-subject storage keys (pcol1-mastered, pcol1-best, ...)

/* ---------------- Page chrome from subject metadata ---------------- */
document.title = META.title + ' · Bloom Reviewer';
document.getElementById('subjTitle').textContent = META.title;
document.getElementById('subjSub').textContent = META.subtitle || '';
document.getElementById('subjFolder').classList.add('f-' + (META.folder || 'pastel-pinstripe'));
document.getElementById('studyGrid').innerHTML = SUBJECT.studyHTML;
document.getElementById('footSrc').textContent = META.source || META.title;

/* ---------------- Build question objects ---------------- */
const LEVELS = {
  mcq:{name:"Level 1 · Multiple Choice",short:"MCQ",accent:"var(--lav)",pill:"p-lav",desc:"Core concept checks with 4 options. Use keys 1–4 to answer and Enter for next.",
       items:MCQ.map((r,i)=>({id:"m"+i,topic:r[0],q:r[1],opts:r[2],exp:r[3]}))},
  id:{name:"Level 2 · Identification",short:"ID",accent:"var(--sage)",pill:"p-sage",desc:"Type the key term, enzyme, drug or mnemonic. Small typos are forgiven.",
      items:IDQ.map((r,i)=>({id:"i"+i,topic:r[0],q:r[1],acc:r[2],disp:r[3],exp:r[4]}))},
  tf:{name:"Level 3 · True or False",short:"T/F",accent:"var(--peach)",pill:"p-peach",desc:"Nuanced statements on clinical exceptions and withdrawal rationales. Press T or F.",
      items:TFQ.map((r,i)=>({id:"t"+i,topic:r[0],q:r[1],ans:r[2],exp:r[3]}))}
};
/* Drop quiz levels this subject has no questions for, and hide their tabs */
for(const k of Object.keys(LEVELS)){
  if(!LEVELS[k].items.length){ delete LEVELS[k]; const t=document.querySelector('.tab[data-tab="'+k+'"]'); if(t) t.hidden=true; }
}
if(Object.keys(LEVELS).length===1 && LEVELS.mcq){
  LEVELS.mcq.name="Practice Quiz · Multiple Choice";
  LEVELS.mcq.desc="Pure multiple choice, grouped by section. Use keys 1–4 to answer and Enter for next.";
  const t=document.querySelector('.tab[data-tab="mcq"]');
  if(t) t.innerHTML='<span class="dot" style="background:var(--lav)"></span>Multiple Choice <span class="badge" id="b-mcq">–</span>';
}
const TOTAL = Object.values(LEVELS).reduce((a,l)=>a+l.items.length,0);
let mastered = new Set(store.get(K('mastered'),[]));
let best = store.get(K('best'),{});

function updateMastery(){
  store.set(K('total'),TOTAL);
  const n=[...mastered].filter(id=>Object.values(LEVELS).some(l=>l.items.some(x=>x.id===id))).length;
  document.getElementById('masteryLbl').textContent=`Mastered ${n} / ${TOTAL}`;
  document.getElementById('masteryBar').style.width=(n/TOTAL*100)+'%';
  for(const k in LEVELS){const b=document.getElementById('b-'+k); b.textContent= best[k]!=null? best[k]+'%':LEVELS[k].items.length+'q';}
}

/* ---------------- Utilities ---------------- */
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const norm=s=>String(s).toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g,'').replace(/β/g,'beta').replace(/[^a-z0-9]/g,'');
function lev(a,b){const m=a.length,n=b.length;if(!m)return n;if(!n)return m;let p=Array.from({length:n+1},(_,i)=>i);
  for(let i=1;i<=m;i++){const c=[i];for(let j=1;j<=n;j++)c[j]=Math.min(p[j]+1,c[j-1]+1,p[j-1]+(a[i-1]===b[j-1]?0:1));p=c}return p[n]}
function matchId(input,acc){const x=norm(input);if(!x)return false;
  return acc.some(a=>{const y=norm(a);if(x===y)return true;const tol=y.length>=9?2:y.length>=5?1:0;return lev(x,y)<=tol});}
const topicPill=t=>`<span class="pill p-${TOPICS[t].c}">${TOPICS[t].n}</span>`;

/* ---------------- Quiz state ---------------- */
const S={};
for(const k in LEVELS) S[k]={topic:'all',queue:[],pos:0,results:{},answered:false,mode:'all',optOrder:{},last:null};

function inTopic(x,sel){ if(sel==='all') return true; if(sel.startsWith('g:')) return (TOPICS[x.topic]||{}).g===sel.slice(2); return x.topic===sel; }
function poolFor(k){const st=S[k];return LEVELS[k].items.filter(x=>inTopic(x,st.topic))}
function startLevel(k,mode){
  const st=S[k]; st.mode=mode||'all';
  let pool = st.mode==='mistakes' ? LEVELS[k].items.filter(x=>st.results[x.id]===false) : poolFor(k);
  st.queue=shuffle(pool.map(x=>x.id)); st.pos=0; st.results={}; st.answered=false; st.optOrder={};
  renderLevel(k);
}
function itemById(k,id){return LEVELS[k].items.find(x=>x.id===id)}

/* Keep the progress bar + new question just below the sticky header instead of jumping to the page top */
function keepInView(k){
  const target=document.querySelector('#p-'+k+' .qprog')||document.querySelector('#p-'+k+' .card');
  if(!target) return;
  const headerH=document.querySelector('header').getBoundingClientRect().height;
  const top=target.getBoundingClientRect().top;
  const card=document.querySelector('#p-'+k+' .card');
  const bottom=card?card.getBoundingClientRect().bottom:top;
  // Only scroll when the question isn't already comfortably visible
  if(top<headerH+4 || bottom>window.innerHeight){
    window.scrollTo({top:window.scrollY+top-headerH-10,behavior:'instant'});
  }
}

function renderLevel(k){
  const L=LEVELS[k], st=S[k], el=document.getElementById('p-'+k);
  const done=Object.keys(st.results).length, correct=Object.values(st.results).filter(Boolean).length;
  const total=st.queue.length;
  const topicsHere=[...new Set(L.items.map(x=>x.topic))];
  const head=`
  <div class="intro">
    <div style="flex:1;min-width:240px">
      <span class="pill ${L.pill}">${L.short} · ${L.items.length} questions</span>
      <h2 style="margin-top:6px">${L.name}</h2>
      <p>${L.desc}</p>
    </div>
  </div>
  <div class="qtop">
    <select class="sel" id="sel-${k}" aria-label="Filter by topic">
      <option value="all">All topics (${L.items.length})</option>
      ${GROUPS.length
        ? GROUPS.map(g=>{const ts=topicsHere.filter(t=>TOPICS[t].g===g); if(!ts.length) return '';
            const gv='g:'+g, gn=L.items.filter(x=>inTopic(x,gv)).length;
            return `<optgroup label="${g}"><option value="${gv}" ${st.topic===gv?'selected':''}>All ${g} (${gn})</option>`+
              ts.map(t=>`<option value="${t}" ${st.topic===t?'selected':''}>${TOPICS[t].n} (${L.items.filter(x=>x.topic===t).length})</option>`).join('')+'</optgroup>';}).join('')
        : topicsHere.map(t=>`<option value="${t}" ${st.topic===t?'selected':''}>${TOPICS[t].n} (${L.items.filter(x=>x.topic===t).length})</option>`).join('')}
    </select>
    <div class="stats">
      <span class="stat">✓ <b>${correct}</b> correct</span>
      <span class="stat">✗ <b>${done-correct}</b> missed</span>
      ${best[k]!=null?`<span class="stat">🏅 best <b>${best[k]}%</b></span>`:''}
      ${st.mode==='mistakes'?'<span class="stat" style="background:var(--rose-t);color:var(--rose-d)">Mistakes drill</span>':''}
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
    body=`<div class="card qcard" style="--accent:${L.accent}">
      <div class="qmeta"><span class="qnum">#${st.pos+1}</span>${topicPill(it.topic)}</div>
      <p class="qtext">${esc(it.q)}</p>
      <div id="ans-${k}">${answerHTML(k,it)}</div>
      <div id="fb-${k}" aria-live="polite"></div>
      <div class="qnav"><span class="hint">${k==='mcq'?'<kbd>1</kbd>–<kbd>4</kbd> answer · <kbd>Enter</kbd> next':k==='tf'?'<kbd>T</kbd> / <kbd>F</kbd> answer · <kbd>Enter</kbd> next':'<kbd>Enter</kbd> to check / next'}</span>
        <div style="display:flex;gap:8px"><button class="btn soft" id="skip-${k}">Skip</button><button class="btn" id="next-${k}" disabled>Next →</button></div></div>
    </div>`;
  }
  el.innerHTML=head+body;
  document.getElementById('sel-'+k).onchange=e=>{st.topic=e.target.value;startLevel(k,'all')};
  document.getElementById('restart-'+k).onclick=()=>startLevel(k,'all');
  if(st.pos<total) wireQuestion(k); else wireSummary(k);
}

function answerHTML(k,it){
  if(k==='mcq'){
    if(!S[k].optOrder[it.id]) S[k].optOrder[it.id]=shuffle([0,1,2,3]);
    return `<div class="opts">${S[k].optOrder[it.id].map((oi,n)=>`<button class="opt" data-oi="${oi}"><span class="k">${"ABCD"[n]}</span><span>${esc(it.opts[oi])}</span></button>`).join('')}</div>`;
  }
  if(k==='tf') return `<div class="tf"><button class="opt" data-v="1">🌿 True</button><button class="opt" data-v="0">🍑 False</button></div>`;
  return `<form class="idrow" id="idf" autocomplete="off"><input id="idin" placeholder="Type your answer…" aria-label="Your answer" autocomplete="off" spellcheck="false"><button class="btn sage" type="submit">Check</button></form>`;
}

function record(k,it,ok){
  const st=S[k]; st.results[it.id]=ok; st.answered=true;
  if(ok){mastered.add(it.id);store.set(K('mastered'),[...mastered]);}
  updateMastery();
  const done=Object.keys(st.results).length, correct=Object.values(st.results).filter(Boolean).length;
  const stats=document.querySelectorAll('#p-'+k+' .stat b'); if(stats[0]){stats[0].textContent=correct;stats[1].textContent=done-correct;}
  const bar=document.querySelector('#p-'+k+' .qprog .bar i'); if(bar) bar.style.width=(done/st.queue.length*100)+'%';
  const lbl=document.querySelector('#p-'+k+' .qprog .lbl span:last-child'); if(lbl) lbl.textContent=Math.round(done/st.queue.length*100)+'% done';
  document.getElementById('next-'+k).disabled=false;
  document.getElementById('skip-'+k).classList.add('hidden');
  document.getElementById('next-'+k).focus({preventScroll:true});
}
function feedback(k,ok,answerText,exp,extra){
  document.getElementById('fb-'+k).innerHTML=`<div class="fb ${ok?'ok':'no'}">
    <div class="h">${ok?'✨ Correct!':'💭 Not quite'}</div>
    ${!ok&&answerText?`<p>Correct answer: <span class="ans">${esc(answerText)}</span></p>`:''}
    <p>${esc(exp)}</p>${extra||''}</div>`;
}

function wireQuestion(k){
  const st=S[k], it=itemById(k,st.queue[st.pos]);
  const next=()=>{ if(!st.answered) return; st.pos++; st.answered=false; renderLevel(k); keepInView(k); };
  document.getElementById('next-'+k).onclick=next;
  document.getElementById('skip-'+k).onclick=()=>{ st.queue.push(st.queue.splice(st.pos,1)[0]); renderLevel(k); keepInView(k); };
  if(k==='mcq'){
    const btns=[...document.querySelectorAll('#ans-mcq .opt')];
    btns.forEach(b=>b.onclick=()=>{
      if(st.answered)return;
      const oi=+b.dataset.oi, ok=oi===0;
      btns.forEach(x=>{x.disabled=true; const xi=+x.dataset.oi; if(xi===0)x.classList.add('ok'); else if(x===b)x.classList.add('no'); else x.classList.add('dim');});
      record(k,it,ok); feedback(k,ok,it.opts[0],it.exp);
    });
  } else if(k==='tf'){
    const btns=[...document.querySelectorAll('#ans-tf .opt')];
    btns.forEach(b=>b.onclick=()=>{
      if(st.answered)return;
      const v=b.dataset.v==='1', ok=v===it.ans;
      btns.forEach(x=>{x.disabled=true; const xv=x.dataset.v==='1'; if(xv===it.ans)x.classList.add('ok'); else x.classList.add('no');});
      record(k,it,ok); feedback(k,ok,it.ans?'True':'False',it.exp);
    });
  } else {
    const f=document.getElementById('idf'), inp=document.getElementById('idin');
    setTimeout(()=>inp.focus({preventScroll:true}),50);
    f.onsubmit=e=>{
      e.preventDefault();
      if(st.answered){next();return;}
      if(!inp.value.trim()){inp.classList.add('no');setTimeout(()=>inp.classList.remove('no'),400);return;}
      const ok=matchId(inp.value,it.acc);
      inp.readOnly=true; inp.classList.add(ok?'ok':'no'); f.querySelector('button').disabled=true;
      record(k,it,ok);
      feedback(k,ok,it.disp,it.exp, ok?`<p style="margin-top:8px">Accepted answer: <span class="ans">${esc(it.disp)}</span></p>`:`<p style="margin-top:10px"><button class="btn ghost" id="override" style="padding:6px 12px;border:1px solid var(--no-bd)">I meant that, so count it as correct</button></p>`);
      const ov=document.getElementById('override');
      if(ov) ov.onclick=()=>{ st.results[it.id]=true; mastered.add(it.id); store.set(K('mastered'),[...mastered]); updateMastery();
        inp.classList.remove('no'); inp.classList.add('ok'); feedback(k,true,'',it.exp,`<p style="margin-top:8px">Counted as correct ✓ (expected: <span class="ans">${esc(it.disp)}</span>)</p>`);
        const stats=document.querySelectorAll('#p-id .stat b'); const done=Object.keys(st.results).length,c=Object.values(st.results).filter(Boolean).length; stats[0].textContent=c; stats[1].textContent=done-c; };
    };
  }
}

function summaryHTML(k){
  const L=LEVELS[k], st=S[k];
  const ids=st.queue, total=ids.length;
  if(!total) return `<div class="card"><h3>No questions here 🌱</h3><p>Pick another topic or restart.</p></div>`;
  const correct=ids.filter(id=>st.results[id]).length, pct=Math.round(correct/total*100);
  const missed=ids.filter(id=>st.results[id]===false);
  const skipped=ids.filter(id=>st.results[id]===undefined);
  if(st.mode==='all' && st.topic==='all'){ if(best[k]==null||pct>best[k]){best[k]=pct;store.set(K('best'),best);updateMastery();} }
  const msg = pct>=90?['Board-ready! 🌸','You are blooming. Keep it fresh with a quick mistakes drill.']:pct>=75?['So close to mastery 🌿','A few soft spots left. Drill the misses below.']:pct>=50?['Good progress 🍑','Review the matching study cards, then retry your mistakes.']:['Every expert started here 🌱','Read the study cards for these topics, then try again.'];
  const C=2*Math.PI*62;
  const ring=`<div class="ring"><svg viewBox="0 0 150 150"><circle cx="75" cy="75" r="62" fill="none" stroke="var(--surface-2)" stroke-width="14"/>
    <circle cx="75" cy="75" r="62" fill="none" stroke="${L.accent}" stroke-width="14" stroke-linecap="round" stroke-dasharray="${C}" stroke-dashoffset="${C}" id="ringArc"/></svg>
    <div class="v"><div><b>${pct}%</b><small>${correct} / ${total}</small></div></div></div>`;
  const list=missed.map(id=>{const it=itemById(k,id);const a=k==='mcq'?it.opts[0]:k==='tf'?(it.ans?'True':'False'):it.disp;
    return `<div class="miss">${topicPill(it.topic)}<div style="margin-top:6px"><b>${esc(it.q)}</b></div><div style="margin-top:4px">→ <span class="a">${esc(a)}</span></div><div class="note" style="margin-top:4px">${esc(it.exp)}</div></div>`}).join('');
  return `<div class="card" style="--accent:${L.accent}">
    <div class="sum">${ring}<div><span class="pill ${L.pill}">${st.mode==='mistakes'?'Mistakes drill complete':'Set complete'}</span><h2 style="margin-top:6px">${msg[0]}</h2><p style="margin:0;color:var(--muted)">${msg[1]}${skipped.length?` (${skipped.length} unanswered)`:''}</p>
      <div class="acts"><button class="btn rose" id="retryMiss-${k}" ${missed.length?'':'disabled'}>🎯 Retry mistakes only (${missed.length})</button><button class="btn soft" id="retryAll-${k}">↻ Retry all</button></div></div></div>
    ${missed.length?`<h3 style="margin-top:24px">Review your misses</h3><div class="missed">${list}</div>`:`<p style="margin-top:20px;text-align:center;font-weight:700">Perfect run, no mistakes to drill! 🏆</p>`}
  </div>`;
}
function wireSummary(k){
  const st=S[k];
  const m=document.getElementById('retryMiss-'+k), a=document.getElementById('retryAll-'+k);
  if(m) m.onclick=()=>startLevel(k,'mistakes');
  if(a) a.onclick=()=>startLevel(k,'all');
  const arc=document.getElementById('ringArc');
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
  if(e.target.tagName==='SELECT') return;
  const st=S[k]; if(st.pos>=st.queue.length) return;
  if(k==='id') return; // form handles Enter
  if(e.key==='Enter'&&st.answered){e.preventDefault();document.getElementById('next-'+k).click();return;}
  if(st.answered) return;
  if(k==='mcq'){const map={'1':0,'2':1,'3':2,'4':3,'a':0,'b':1,'c':2,'d':3};const n=map[e.key.toLowerCase()];
    if(n!=null){const b=document.querySelectorAll('#ans-mcq .opt')[n]; if(b)b.click();}}
  if(k==='tf'){const key=e.key.toLowerCase(); if(key==='t')document.querySelector('#ans-tf .opt[data-v="1"]').click(); if(key==='f')document.querySelector('#ans-tf .opt[data-v="0"]').click();}
});

/* ---------------- Tabs ---------------- */
let currentTab='study';
function showTab(t){
  currentTab=t;
  document.querySelectorAll('.tab').forEach(b=>b.setAttribute('aria-selected',b.dataset.tab===t));
  document.querySelectorAll('.panel').forEach(p=>p.classList.toggle('on',p.id==='p-'+t));
  if(LEVELS[t] && !S[t].queue.length) startLevel(t,'all');
  store.set(K('tab'),t);
}
document.querySelectorAll('.tab').forEach(b=>b.onclick=()=>{showTab(b.dataset.tab);window.scrollTo({top:0})});

/* ---------------- Study chips, flips, pearls ---------------- */
(function(){
  const chips=document.getElementById('studyChips');
  const chip=t=>`<button class="chip ${t==='all'?'on':''}" data-t="${t}">${t==='all'?'🌼 All':TOPICS[t].n}</button>`;
  chips.innerHTML = GROUPS.length
    ? chip('all') + GROUPS.map(g=>`<span class="chip-group">${g}</span>`+Object.keys(TOPICS).filter(t=>TOPICS[t].g===g).map(chip).join('')).join('')
    : ['all',...Object.keys(TOPICS)].map(chip).join('');
  chips.onclick=e=>{const b=e.target.closest('.chip');if(!b)return;
    chips.querySelectorAll('.chip').forEach(c=>c.classList.toggle('on',c===b));
    const t=b.dataset.t; document.querySelectorAll('#studyGrid .study').forEach(c=>c.classList.toggle('hidden',t!=='all'&&!c.dataset.topic.split(' ').includes(t)));};
  if(!document.getElementById('flips')||!document.getElementById('pearls')) return;
  document.getElementById('flips').innerHTML=FLIPS.map(f=>`<button class="flip" aria-label="Mnemonic ${f[0]}: tap to reveal"><div class="in"><div class="f bg-${f[3]}"><span class="mn">${f[0]}</span><small>${f[1]}</small></div><div class="b">${f[2]}</div></div></button>`).join('');
  document.getElementById('flips').onclick=e=>{const b=e.target.closest('.flip');if(b)b.classList.toggle('on')};
  document.getElementById('pearls').innerHTML=PEARLS.map(p=>`<div class="pearl"><span class="ic">${p[0]}</span><span>${p[1]}</span></div>`).join('');
})();

updateMastery();
const savedTab=store.get(K('tab'),'study');
showTab(savedTab==='study'||LEVELS[savedTab]?savedTab:'study');
}
