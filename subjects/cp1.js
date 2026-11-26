/* CP1 Finals: Acid-Base Disorders · Acute Kidney Injury · Chronic Kidney Disease
   Quiz-only folder (no study cards / flashcards): one quiz per topic, 100 questions each.

   How it loads: subjects/subjects.js lists the topic files in "parts":
     subjects/cp1/acid-base.js  → window.CP1_Q.ab   (100)
     subjects/cp1/aki.js        → window.CP1_Q.aki  (100)
     subjects/cp1/ckd.js        → window.CP1_Q.ckd  (100)
   reviewer.html loads those first, then this file, which joins them into one SUBJECT. */
window.SUBJECT = (function(){

const AB = "Acid-Base Disorders", AKI = "Acute Kidney Injury", CKD = "Chronic Kidney Disease";

/* Sections inside each topic (used by the section filter in each quiz) */
const TOPICS = {
  ab_basics:   {n:"Basics & buffering",                     c:"lav",    g:AB},
  ab_dx:       {n:"ABG values & diagnosis steps",           c:"sky",    g:AB},
  ab_comp:     {n:"Compensation rules",                     c:"butter", g:AB},
  ab_metacid:  {n:"Metabolic acidosis",                     c:"rose",   g:AB},
  ab_metalk:   {n:"Metabolic alkalosis",                    c:"peach",  g:AB},
  ab_respalk:  {n:"Respiratory alkalosis",                  c:"sage",   g:AB},
  ab_respacid: {n:"Respiratory acidosis",                   c:"lav",    g:AB},
  ab_mixed:    {n:"Mixed acid-base disorders",              c:"sky",    g:AB},

  aki_def:     {n:"Definition & guidelines",                c:"sage",   g:AKI},
  aki_stage:   {n:"RIFLE · AKIN · KDIGO staging",           c:"lav",    g:AKI},
  aki_class:   {n:"Prerenal · intrinsic · postrenal",       c:"peach",  g:AKI},
  aki_labs:    {n:"Laboratory differentiation",             c:"sky",    g:AKI},
  aki_cpdx:    {n:"Clinical presentation & diagnosis",      c:"rose",   g:AKI},
  aki_prev:    {n:"Prevention",                             c:"butter", g:AKI},
  aki_tx:      {n:"Treatment, diuretics & monitoring",      c:"sage",   g:AKI},
  aki_rrt:     {n:"Renal replacement therapy (AEIOU)",      c:"lav",    g:AKI},

  ckd_def:     {n:"Definition & ESRD",                      c:"peach",  g:CKD},
  ckd_stage:   {n:"KDIGO G & A staging",                    c:"sky",    g:CKD},
  ckd_path:    {n:"Risk factors & pathophysiology",         c:"rose",   g:CKD},
  ckd_cp:      {n:"Clinical presentation",                  c:"butter", g:CKD},
  ckd_gen:     {n:"General treatment",                      c:"sage",   g:CKD},
  ckd_anemia:  {n:"Anemia of CKD",                          c:"rose",   g:CKD},
  ckd_mbd:     {n:"Mineral & bone disorder",                c:"lav",    g:CKD},
  ckd_cvd:     {n:"Cardiovascular disease & hyperlipidemia",c:"peach",  g:CKD}
};

const Q = window.CP1_Q || {};
const MCQ = [].concat(Q.ab || [], Q.aki || [], Q.ckd || []);

/* One quiz tab per topic */
const MCQ_SETS = [
  {key:"ab",  name:AB,  group:AB,  c:"lav",   desc:"100 questions on acid-base balance, ABG interpretation, compensation and the four primary and mixed disorders."},
  {key:"aki", name:AKI, group:AKI, c:"sage",  desc:"100 questions on AKI definition, staging, classification, labs, prevention, treatment and RRT."},
  {key:"ckd", name:CKD, group:CKD, c:"peach", desc:"100 questions on CKD definition, KDIGO staging, risk factors, presentation and treatment of complications."}
];

return { id:"cp1", TOPICS, MCQ, MCQ_SETS };
})();
