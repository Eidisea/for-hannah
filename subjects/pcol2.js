/* PCOL 2 Finals: Antibacterials · Antiprotozoals–Antivirals · Anticancer drugs
   Pure MCQ reviewer, built from "LUAYON-PCOL 2 LEC-FINAL NOTES" and Hannah's requested sections.
   Data file for reviewer.html?s=pcol2. Listed in subjects/subjects.js. */
window.SUBJECT = (function(){

/* ---------------- Sections (topics), grouped into the 3 parts ---------------- */
const AB = "Antibacterials", AV = "Antiprotozoals–Antivirals", CA = "AntiCA Drugs";
const TOPICS = {
  defs:     {n:"Definition of terms",                 c:"lav",    g:AB},
  statcid:  {n:"Bacteriostatic vs bactericidal",      c:"sky",    g:AB},
  resist:   {n:"Mechanisms of resistance",            c:"rose",   g:AB},
  pens:     {n:"Types of penicillins",                c:"peach",  g:AB},
  vanco:    {n:"Vancomycin",                          c:"lav",    g:AB},
  tpm:      {n:"3PM",                                 c:"rose",   g:AB},
  linez:    {n:"Linezolid",                           c:"sage",   g:AB},
  folate:   {n:"DHFR vs DHPS",                        c:"butter", g:AB},
  fq:       {n:"Fluoroquinolone coverage",            c:"sky",    g:AB},
  pire:     {n:"PIRE (anti-TB)",                      c:"sage",   g:AB},
  codes:    {n:"Letter codes: amoebicides, antimalarials, trypanosomiasis", c:"peach", g:AV},
  lifecycle:{n:"Viral life cycle & drugs",            c:"lav",    g:AV},
  entry:    {n:"Enfuvirtide vs maraviroc",            c:"sky",    g:AV},
  caterms:  {n:"Cancer terms",                        c:"rose",   g:CA},
  cycle:    {n:"Cell cycle & antineoplastics",        c:"butter", g:CA},
  rescue:   {n:"Rescue drugs / antidotes",            c:"sage",   g:CA},
  chemoman: {n:"Chemo-Man",                           c:"peach",  g:CA}
};

/* ---------------- Multiple choice (first option = correct; shuffled at runtime) ---------------- */
const MCQ = [
/* ===== Definition of terms ===== */
["defs","Per the notes, which term means drugs DERIVED FROM microorganisms that also TARGET microorganisms?",["Antibiotics","Antimicrobials","Antiseptics","Disinfectants"],"Antibiotics are derived from microorganisms and target other microorganisms (e.g., penicillin from Penicillium). That is why the lecture's 'antimicrobial agents' definition (substances produced by microorganisms) actually refers to antibiotics, which are derived naturally only."],
["defs","Which term covers agents that target microbes and may be either NATURAL or SYNTHETIC (e.g., antibacterials)?",["Antimicrobials","Antibiotics","Bacteriocins","Probiotics"],"Antimicrobials target microbes in general, natural or synthetic. Antibacterials are an example under this umbrella."],
["defs","The lecture defines antimicrobial agents as 'substances produced by microorganisms which inhibit growth and cause destruction of other microorganisms.' The annotation says this definition really refers to:",["Antibiotics (naturally derived only)","Synthetic antibacterials","Antivirals","Antiseptics"],"Being 'produced by microorganisms' is the hallmark of antibiotics. Synthetic agents (like sulfonamides) don't fit that wording."],
["defs","Which is NOT one of the six things needed to select the most appropriate antimicrobial?",["Brand popularity","Identity of the organism","Site of the infection","Cost of therapy"],"The six: identity of the organism, its susceptibility, site of infection, patient factors, safety and efficacy of the agent, and cost of therapy."],
["defs","'Adult vs child vs elderly, pregnant, CKD' are examples of which selection factor?",["Patient factors","Susceptibility of the organism","Site of infection","Cost of therapy"],"The notes list adult, child, elderly, pregnant women and CKD patients under patient factors."],
["defs","Isoniazid, which acts mainly on mycobacteria, is the lecture's example of a:",["Narrow-spectrum antimicrobial","Broad-spectrum antimicrobial","Extended-spectrum antimicrobial","Bactericidal antiseptic"],"Narrow spectrum = acts on a single or limited group of organisms. Isoniazid targets mycobacteria (cause of TB)."],
["defs","Ampicillin is called EXTENDED-spectrum because, compared with penicillin (G+), it adds coverage of:",["Some Gram(−) rods (E. coli, H. influenzae, P. mirabilis, S. typhi)","Mycobacteria","Rickettsiae and amoebae","MRSA"],"Ampicillin keeps G+ cocci and bacilli (enterococci, Listeria) and adds selected G− rods. The annotation calls it an 'addition of role'."],
["defs","When the causative organism is not yet known, which is given FIRST according to the notes?",["A broad-spectrum agent, then narrow once identified","A narrow-spectrum agent first","No antimicrobial until culture returns","An antiseptic"],"1st given: broad spectrum, then shift to narrow spectrum once the organism is identified."],
["defs","The 'minimum dose required', i.e., the lowest concentration that inhibits visible bacterial growth, is the:",["MIC (minimum inhibitory concentration)","Cmax","AUC","Therapeutic index"],"MIC = minimum inhibitory concentration. Dosing parameters like Cmax/MIC, AUC/MIC and T>MIC are all measured against it."],

/* ===== Bacteriostatic vs bactericidal ===== */
["statcid","Bacteriostatic agents are best described as:",["Reversible stoppage: they inhibit growth","Irreversible killing of bacteria","Agents that only work on viruses","Agents that dissolve biofilms"],"Static = reversible stoppage (inhibits growth); cidal = irreversible killing."],
["statcid","Which drug group is BACTERICIDAL (FACPVM)?",["Aminoglycosides","Tetracyclines","Clindamycin","Chloramphenicol"],"CIDAL = FACPVM: Fluoroquinolones, Aminoglycosides, Cephalosporins, Penicillin, Vancomycin, Metronidazole."],
["statcid","Which drug is BACTERIOSTATIC (CCESTT)?",["Trimethoprim","Vancomycin","Metronidazole","Cephalosporins"],"STATIC = CCESTT: Chloramphenicol, Clindamycin, Erythromycin, Sulfamethoxazole, Tetracyclines, Trimethoprim."],
["statcid","In the mnemonic CCESTT, the 'S' stands for:",["Sulfamethoxazole","Streptomycin","Spectinomycin","Sulbactam"],"Chloramphenicol, Clindamycin, Erythromycin, Sulfamethoxazole, Tetracyclines, Trimethoprim."],
["statcid","In the mnemonic FACPVM, the 'M' stands for:",["Metronidazole","Macrolides","Meropenem","Minocycline"],"Fluoroquinolones, Aminoglycosides, Cephalosporins, Penicillin, Vancomycin, Metronidazole. Macrolides (erythromycin) are on the static side."],
["statcid","Why are static + cidal combinations generally NOT recommended?",["Cidal drugs need actively growing bacteria; a static drug given first lowers the cidal effect","They always cause nephrotoxicity","They chelate each other in the gut","Static drugs inactivate β-lactamase"],"From the notes: if static is given first, the cidal effect decreases. Combination is rare because cidal agents need the bacteria to be actively growing."],

/* ===== Mechanisms of resistance ===== */
["resist","How many main mechanisms of antibacterial resistance does the lecture list?",["3","2","4","5"],"Three main methods: (1) altered targets, (2) decreased accumulation, (3) enzymatic inactivation."],
["resist","Resistance due to a MUTATION of the drug's target is called:",["Altered target","Decreased accumulation","Enzymatic inactivation","Increased efflux"],"Mechanism #1: altered targets (mutation of the target), e.g., altered DNA gyrase gives fluoroquinolone resistance."],
["resist","'Decreased accumulation' of a drug inside bacteria happens through:",["↓ Permeability (can't get in) or ↑ efflux (gets in but is pumped out)","Mutation of PBPs only","Destruction of the β-lactam ring","Binding of the drug to plasma proteins"],"Annotations: ↓ permeability = 'hindi makapasok' (can't enter); ↑ efflux = 'nakapasok pero pinalabas' (entered but was pushed out)."],
["resist","Alteration of DNA gyrase leading to fluoroquinolone resistance is an example of:",["Altered target","Enzymatic inactivation","Decreased permeability","Increased efflux"],"The slide's example of target alteration: an altered DNA gyrase means quinolones can't bind."],
["resist","Bacteroides became resistant to tetracycline because of a plasmid-mediated protein that:",["Promotes efflux of the drug","Hydrolyzes the drug","Mutates the 30S subunit","Blocks porin channels"],"Tetracycline efflux is the slide's ↑ efflux example (decreased accumulation)."],
["resist","Neisseria gonorrhoeae is now largely resistant to penicillin mainly because of:",["Penicillinase (enzymatic inactivation)","Altered DNA gyrase","Efflux pumps","Loss of porins"],"β-lactamases (penicillinases) destroy the β-lactam nucleus: mechanism #3, enzymatic inactivation."],
["resist","β-lactams enter Gram-negative cells through porin channels. Some resistant organisms have altered porins through which carbapenems do not pass. This is:",["Decreased permeability","Altered target","Enzymatic inactivation","Increased efflux"],"Fewer or altered porins mean the drug can't get in ('hindi makapasok'), so accumulation decreases."],

/* ===== Types of penicillins ===== */
["pens","Which penicillin is poorly absorbed from the GI tract and is therefore given IV/parenterally?",["Penicillin G (benzylpenicillin)","Penicillin V","Amoxicillin","Dicloxacillin"],"Pen G: oral doses would have to be very large, so it's given IV/parenterally. Pen V is acid-stable and taken orally."],
["pens","Penicillin V (phenoxymethyl penicillin) is notable for being:",["Acid-stable, so it can be taken orally","The most potent antipseudomonal penicillin","Penicillinase-resistant","Withdrawn for nephritis"],"Pen V is acid-stable, hence given orally ('orally – Vava' in the notes)."],
["pens","Natural penicillins remain the drug of choice for:",["Gas gangrene (C. perfringens) and syphilis (T. pallidum)","MRSA bacteremia","Pseudomonas pneumonia","Typhoid fever"],"Main target G(+). They are also prone to β-lactamase, e.g., from Staphylococcus aureus."],
["pens","Which group of penicillins is remembered by the mnemonic CONDOM?",["Penicillinase-resistant (antistaphylococcal) penicillins","Aminopenicillins","Antipseudomonal penicillins","Natural penicillins"],"Cloxacillin, Oxacillin, Nafcillin, DiclOxacillin, Methicillin."],
["pens","Methicillin is off the market because of a high incidence of:",["Interstitial nephritis","Red man syndrome","Gray baby syndrome","Hepatotoxicity"],"Methicillin was withdrawn for interstitial nephritis. Its name survives in MRSA (methicillin-resistant S. aureus)."],
["pens","Which aminopenicillin has BETTER GI absorption than ampicillin?",["Amoxicillin","Carbenicillin","Piperacillin","Nafcillin"],"Ampicillin is more frequently given parenterally (often + sulbactam as Unasyn). Amoxicillin is absorbed better orally."],
["pens","Aminopenicillins have a spectrum similar to Pen G but are MORE effective against:",["G(+) bacilli","Mycobacteria","Anaerobic cocci","MRSA"],"Per the slide: antibacterial spectrum similar to Pen G but more effective against G(+) bacilli."],
["pens","Which is the MOST potent ureidopenicillin, used for nosocomial infections?",["Piperacillin","Ticarcillin","Carbenicillin","Ampicillin"],"Antipseudomonal penicillins: carboxypenicillins (carbenicillin, ticarcillin) and ureidopenicillins (piperacillin [most potent], azlocillin)."],
["pens","Carbenicillin and ticarcillin belong to which subgroup?",["Carboxypenicillins (antipseudomonal)","Ureidopenicillins","Aminopenicillins","Penicillinase-resistant penicillins"],"Carboxypenicillins = carbenicillin, ticarcillin. Both are antipseudomonal."],
["pens","Antipseudomonal penicillins are used for nosocomial (hospital-acquired) infections caused by which group of bugs?",["ESKAPE pathogens","3PM organisms","ARAm organisms","HENPECKS organisms"],"HAI → ESKAPE: Enterococcus, S. aureus, Klebsiella, Acinetobacter, Pseudomonas, Enterobacter."],

/* ===== Vancomycin ===== */
["vanco","Vancomycin belongs to which antibiotic class?",["Glycopeptide","Aminoglycoside","Oxazolidinone","β-lactam"],"Vancomycin is a glycopeptide cell-wall synthesis inhibitor."],
["vanco","Vancomycin inhibits cell wall synthesis by binding to:",["The D-Ala-D-Ala terminus","PBP3","The 23S rRNA","DNA gyrase"],"It caps the D-Ala-D-Ala terminus of peptidoglycan precursors. It doesn't depend on PBPs, which is why it works on MRSA."],
["vanco","Vancomycin has systemic activity against MRSA in which infections?",["Pneumonia, bacteremia and endocarditis","Uncomplicated UTI only","Malaria and amebiasis","Fungal meningitis"],"MRSA pneumonia, bacteremia and endocarditis."],
["vanco","Vancomycin is the drug of choice for pseudomembranous colitis, whose causative agent is:",["Clostridioides (Clostridium) difficile","Clostridium perfringens","Bacteroides fragilis","Entamoeba histolytica"],"C. difficile is the causative agent. (C. perfringens causes gas gangrene, which is treated with Pen G.)"],
["vanco","Red Man syndrome (flushing) from vancomycin is caused by:",["Rapid infusion","Taking it with dairy","Low serum levels","Concurrent vitamin B6"],"It's a rate-related flushing reaction from rapid IV infusion."],
["vanco","How is Red Man syndrome prevented or managed, per the notes?",["Slow IV infusion and an antihistamine (e.g., diphenhydramine/Benadryl)","Doubling the dose","Switching to oral penicillin","Giving MESNA"],"Treat with slow intravenous infusion and an antihistamine such as Benadryl."],
["vanco","Besides flushing, which other ADR of vancomycin is listed?",["Nephrotoxicity","Gray baby syndrome","Tooth discoloration","Optic neuritis"],"ADR: flushing (Red Man syndrome) and nephrotoxicity."],

/* ===== 3PM ===== */
["tpm","Tetracyclines do NOT work on '3PM'. These organisms are:",["Proteus, Providencia, Pseudomonas, Morganella","Pneumococcus, Pertussis, Plague, Mycoplasma","Proteus, Pasteurella, Pseudomonas, Moraxella","Plasmodium, Pneumocystis, Pseudomonas, Mycobacteria"],"3PM = Proteus, Providencia, Pseudomonas, Morganella."],
["tpm","Which organism is NOT part of 3PM?",["Rickettsia","Proteus","Providencia","Morganella"],"Rickettsiae are the opposite case: tetracyclines are their drug of choice."],
["tpm","The '3PM' list is a limitation of which drug class?",["Tetracyclines","Fluoroquinolones","Aminoglycosides","Carbapenems"],"The note on the tetracycline slide: 'does not work on 3PM'."],
["tpm","Tetracyclines are the drug of choice for infections caused by:",["Rickettsiae","Pseudomonas","Proteus","Morganella"],"DOC for Rickettsiae, but useless against 3PM."],
["tpm","Which tetracyclines' absorption is NOT impaired by food?",["Doxycycline and minocycline","Tetracycline and chlortetracycline","Demeclocycline and methacycline","Oxytetracycline only"],"Food impairs absorption except for doxycycline and minocycline. Antacids, dairy and divalent cations (Ca, Mg, Fe) or Al form chelates and ↓ absorption."],
["tpm","Expired tetracycline (TTC) can cause:",["Fanconi-like syndrome","Gray baby syndrome","Red man syndrome","Hemorrhagic cystitis"],"An annotation on the slide: expired TTC → Fanconi-like syndrome."],

/* ===== Linezolid ===== */
["linez","Linezolid belongs to which drug class?",["Oxazolidinone","Glycopeptide","Lincosamide","Macrolide"],"Linezolid is an oxazolidinone."],
["linez","Linezolid inhibits protein synthesis by binding to:",["23S ribosomal RNA of the 50S subunit","16S rRNA of the 30S subunit","D-Ala-D-Ala","DNA-dependent RNA polymerase"],"It binds the 23S rRNA of the 50S subunit."],
["linez","Linezolid's binding prevents:",["Formation of the ribosome (initiation) complex","Peptidoglycan cross-linking","Folate synthesis","DNA supercoil relaxation"],"It prevents formation of the ribosome complex needed to start translation."],
["linez","Linezolid is described in the notes as a:",["'Last resort drug'","First-line drug for UTI","Drug of choice for typhoid","Topical-only agent"],"It is reserved for resistant Gram-positive infections such as MRSA and VRE."],
["linez","On the rational dosing slide, linezolid is listed under which PK/PD parameter?",["AUC/MIC (exposure-dependent)","Cmax/MIC (concentration-dependent)","T>MIC (time-dependent)","None"],"AUC/MIC = VAFATL: Vancomycin, Azithromycin, Fluoroquinolones, Aminoglycosides, Tigecycline, Linezolid."],

/* ===== DHFR vs DHPS ===== */
["folate","Sulfonamides are structural analogs of which compound?",["PABA (para-aminobenzoic acid)","Folinic acid","Thymidine","Guanine"],"Sulfonamides are synthetic PABA analogs that compete with PABA."],
["folate","Sulfonamides competitively inhibit which enzyme?",["Dihydropteroate synthetase (DHPS)","Dihydrofolate reductase (DHFR)","Thymidylate synthase","Ornithine decarboxylase"],"Sulfonamides → dihydropteroate SYNTHETASE, blocking the genesis of dihydrofolic acid."],
["folate","Trimethoprim inhibits which enzyme?",["Dihydrofolate reductase (DHFR)","Dihydropteroate synthetase (DHPS)","DNA gyrase","Reverse transcriptase"],"Trimethoprim blocks DHFR, the next step (dihydrofolic acid → tetrahydrofolic acid)."],
["folate","Which order is correct in the bacterial folate pathway?",["PABA → (DHPS) → dihydrofolic acid → (DHFR) → tetrahydrofolic acid → purines → DNA","PABA → (DHFR) → dihydrofolic acid → (DHPS) → tetrahydrofolic acid","Tetrahydrofolic acid → (DHFR) → dihydrofolic acid → PABA","Purines → (DHPS) → PABA → DNA"],"Synthetase comes first (sulfonamides), then reductase (trimethoprim). Tip: 'S before R', the same order as Sulfa then tRimethoprim."],
["folate","Combining sulfamethoxazole with trimethoprim (cotrimoxazole) is an example of:",["Synergism (1 + 1 = 3), from sequential blockade","Potentiation (1 + 0 = 2)","Antagonism","Additive toxicity only"],"The two drugs block two sequential enzymes, giving synergism. (β-lactamase inhibitors show potentiation instead.)"],
["folate","Proguanil (in atovaquone-proguanil) inhibits plasmodial:",["Dihydrofolate reductase","Dihydropteroate synthetase","Neuraminidase","Ornithine decarboxylase"],"An annotation links proguanil's target to trimethoprim's (bacterial DHFR); both inhibit DHFR."],
["folate","Methotrexate, an antifolate anticancer drug, inhibits:",["Dihydrofolate reductase (and thymidylate synthase)","Dihydropteroate synthetase","Topoisomerase I","Tubulin polymerization"],"From the antimetabolite pathway slide, methotrexate inhibits thymidylate synthase and dihydrofolate reductase. Its antidote is leucovorin (folinic acid)."],

/* ===== Fluoroquinolone coverage (1st table) ===== */
["fq","Fluoroquinolones exert their action by inhibiting:",["DNA gyrase (topoisomerase II) and topoisomerase IV","Dihydrofolate reductase","50S peptidyl transferase","Cell wall transpeptidase"],"DNA gyrase relaxes positively supercoiled DNA; topoisomerase IV separates replicated chromosomes into daughter cells."],
["fq","The prototype quinolone, a urinary antiseptic, is:",["Nalidixic acid","Ciprofloxacin","Levofloxacin","Moxifloxacin"],"1st gen nalidixic acid is the prototype urinary antiseptic."],
["fq","Per the spectrum table, the 1st generation (nalidixic acid) has:",["Moderate Gram(−) activity","Excellent S. pneumoniae activity","Anaerobic activity","Activity against MRSA"],"1st gen: moderate Gram −ve activity (uncomplicated UTIs)."],
["fq","Which generation is noted as 'synergistic with β-lactams' and has expanded G(−) plus some G(+) and atypical activity?",["2nd generation (ciprofloxacin)","1st generation (nalidixic acid)","3rd generation (levofloxacin)","4th generation (moxifloxacin)"],"2nd gen ciprofloxacin: expanded Gram −ve, some Gram +ve and atypicals, synergistic with β-lactams."],
["fq","Which fluoroquinolone has EXCELLENT activity against Streptococcus pneumoniae?",["Levofloxacin (3rd gen)","Nalidixic acid (1st gen)","Ciprofloxacin (2nd gen)","Norfloxacin"],"3rd gen levofloxacin: expanded G−, improved G+ and atypicals, excellent S. pneumoniae activity."],
["fq","Which generation adds ANAEROBIC activity?",["4th generation (moxifloxacin, gemifloxacin)","3rd generation (levofloxacin)","2nd generation (ciprofloxacin)","1st generation (nalidixic acid)"],"4th gen: improved Gram +ve activity and anaerobic activity."],
["fq","Moxifloxacin and gemifloxacin belong to which generation?",["4th","3rd","2nd","1st"],"4th generation: moxifloxacin, gemifloxacin."],

/* ===== PIRE ===== */
["pire","PIRE ranks anti-TB drugs by hepatotoxicity. From MOST to LEAST it is:",["Pyrazinamide > Isoniazid > Rifampicin > Ethambutol","Isoniazid > Pyrazinamide > Ethambutol > Rifampicin","Rifampicin > Isoniazid > Pyrazinamide > Ethambutol","Ethambutol > Rifampicin > Isoniazid > Pyrazinamide"],"PIRE: P is the most hepatotoxic and E the least."],
["pire","The MOST hepatotoxic anti-TB drug is:",["Pyrazinamide","Ethambutol","Rifampicin","Streptomycin"],"Pyrazinamide acidifies the intracellular environment and inhibits fatty acid synthesis. It is the most hepatotoxic anti-TB drug."],
["pire","The LEAST hepatotoxic of the first-line drugs (last letter of PIRE) is:",["Ethambutol","Isoniazid","Pyrazinamide","Rifampicin"],"E = ethambutol is least hepatotoxic. Its key ADR is optic neuritis ('bulag')."],
["pire","Which first-line drug causes red-orange urine, needing patient counseling for reassurance?",["Rifampicin","Isoniazid","Pyrazinamide","Ethambutol"],"Rifampicin inhibits RNA synthesis. Its red-orange urine is harmless, so counsel reassurance."],
["pire","Peripheral neuropathy from isoniazid is prevented by taking:",["Vitamin B6 (pyridoxine)","Vitamin B12","Folic acid","Vitamin K"],"INH inhibits mycolic acid synthesis. ADR: peripheral neuropathy, treated with vitamin B6."],
["pire","Ethambutol inhibits ___ synthesis and causes ___.",["Arabinogalactan; optic neuritis","Mycolic acid; peripheral neuropathy","RNA; red-orange urine","Fatty acid; hepatotoxicity"],"Ethambutol inhibits arabinogalactan synthesis; ADR: optic neuritis."],
["pire","Which is a SECOND-line anti-TB drug noted as a recent replacement for ethambutol?",["Moxifloxacin","Isoniazid","Rifampicin","Pyrazinamide"],"Second line: streptomycin, capreomycin, cycloserine, moxifloxacin, bedaquiline."],

/* ===== Letter codes: amoebicides, antimalarials, trypanosomiasis ===== */
["codes","The organism that causes amoebiasis is:",["Entamoeba histolytica","Giardia lamblia","Plasmodium vivax","Trypanosoma cruzi"],"E. histolytica. The usual manifestation is dysentery (intestinal inflammation causing severe diarrhea)."],
["codes","MIXED amoebicides (luminal + systemic), code 'MT', are:",["Metronidazole, Tinidazole","Mefloquine, Tetracycline","Melarsoprol, Tinidazole","Miltefosine, Trimethoprim"],"MT = Metronidazole (Flagyl), Tinidazole. They target trophozoites in the lumen and in the body."],
["codes","LUMINAL amoebicides, code 'IP', are:",["Iodoquinol, Paromomycin","Isoniazid, Pyrazinamide","Ivermectin, Praziquantel","Iodoquinol, Primaquine"],"IP ('Iodo-Para') targets trophozoites in the intestines."],
["codes","SYSTEMIC amoebicides, code 'CD', are:",["Chloroquine, Dehydroemetine","Clindamycin, Doxycycline","Cotrimoxazole, Dapsone","Chloramphenicol, Diloxanide"],"CD targets trophozoites in other organs (liver, blood)."],
["codes","Which is the MIXED amoebicide of choice for amebic infections?",["Metronidazole","Iodoquinol","Chloroquine","Paromomycin"],"Metronidazole has ferredoxin-like, low-redox-potential electron transport proteins. A/E: nausea, vomiting, epigastric distress, abdominal cramps."],
["codes","Paromomycin is an aminoglycoside that is:",["Only effective against the luminal forms of E. histolytica","A systemic amoebicide for liver abscess","An antimalarial for hypnozoites","Given IM for trypanosomiasis"],"Luminal only. A/E: GI distress, diarrhea."],
["codes","Chloroquine is combined with metronidazole for amebic liver abscess, but it is NOT useful for:",["Luminal amebiasis","Malaria prophylaxis","Liver trophozoites","Erythrocytic malaria"],"It eliminates trophozoites in liver abscesses but is not useful in treating luminal amebiasis."],
["codes","Drugs effective against the ERYTHROCYTIC form of malaria (code AACQMP) include all EXCEPT:",["Primaquine","Artemisinin","Chloroquine","Mefloquine"],"AACQMP = Artemisinin, Atovaquone/proguanil, Chloroquine, Quinine, Mefloquine, Pyrimethamine. Primaquine acts on exoerythrocytic (liver) and gametocytic forms."],
["codes","The only agent that prevents relapse of P. vivax and P. ovale (the 'radical cure') is:",["Primaquine","Chloroquine","Quinine","Artemether"],"Primaquine (an 8-aminoquinoline) eradicates primary exoerythrocytic (liver) forms and hypnozoites."],
["codes","Chloroquine (a 4-aminoquinoline) kills the parasite by:",["Binding heme and preventing its polymerization to hemozoin","Inhibiting ornithine decarboxylase","Cleaving an endoperoxide bridge","Inhibiting plasmodial DHFR"],"Chloroquine is the DOC for both treatment and chemoprophylaxis. Free heme causes oxidative damage that lyses the parasite and the RBC."],
["codes","Artemisinin (from Artemisia annua, sweet wormwood) acts through:",["Free radicals from cleavage of its endoperoxide bridge by heme iron","Inhibition of mitochondrial electron transport","Blocking chloride channels","Inhibiting viral neuraminidase"],"The free radicals are toxic and cause cell lysis. It is the recommended first-line drug for multidrug-resistant P. falciparum."],
["codes","Cinchonism (nausea, tinnitus, vertigo) is the ADR of:",["Quinine","Mefloquine","Atovaquone","Primaquine"],"Quinine is an alkaloid from the bark of the cinchona tree."],
["codes","Melarsoprol (trivalent arsenical, slow IV) is the only drug for LATE-stage (CNS) trypanosomiasis due to:",["T. brucei rhodesiense (East African)","T. brucei gambiense (West African)","T. cruzi","Leishmania"],"Melarsoprol covers late rhodesiense and can itself cause CNS toxicity. Late gambiense gets eflornithine."],
["codes","Eflornithine, an irreversible inhibitor of ornithine decarboxylase, is first-line for:",["Late-stage T. brucei gambiense (West African)","Early T. b. rhodesiense","Chagas disease","Amebic liver abscess"],"It halts polyamine production, so the parasite stops dividing."],
["codes","Suramin (IV) is used primarily for EARLY-stage (no CNS) African trypanosomiasis due to:",["T. brucei rhodesiense","T. brucei gambiense","T. cruzi","P. falciparum"],"Suramin = early rhodesiense. Pentamidine = T. b. gambiense (and an alternative for Pneumocystis)."],
["codes","Nifurtimox (oral) and benznidazole are used for:",["T. cruzi (Chagas disease)","T. brucei gambiense","E. histolytica","P. vivax relapse"],"Benznidazole is a nitroimidazole with a mechanism similar to nifurtimox."],

/* ===== Viral life cycle & drugs ===== */
["lifecycle","On the viral life cycle picture, viral ATTACHMENT and ENTRY is blocked by the 'EDMP' drugs:",["Enfuvirtide, Docosanol, Maraviroc, Palivizumab","Efavirenz, Didanosine, Melarsoprol, Primaquine","Entecavir, Dolutegravir, Mefloquine, Pentamidine","Etravirine, Darunavir, Metronidazole, Paromomycin"],"EDMP: enfuvirtide (HIV), docosanol (HSV), maraviroc (HIV), palivizumab (RSV)."],
["lifecycle","Viral UNCOATING of influenza is blocked by the 'AR' drugs:",["Amantadine, Rimantadine","Acyclovir, Ribavirin","Atazanavir, Raltegravir","Abacavir, Rilpivirine"],"Adamantanes (amantadine, rimantadine) are limited to influenza A."],
["lifecycle","Which stage of the viral life cycle do neuraminidase inhibitors (oseltamivir, zanamivir) block?",["Viral release","Uncoating","Integration","Penetration"],"They inhibit neuraminidase, preventing the release of new virions and their spread from cell to cell (flu A and B)."],
["lifecycle","Penetration of HBV/HCV is blocked (per the diagram) by:",["Interferon-alfa","Oseltamivir","Maraviroc","Lamivudine"],"The picture shows interferon-alfa (HBV, HCV) blocking penetration."],
["lifecycle","HIV INTEGRATION is blocked by INSTIs, which end in:",["'-gravir' (e.g., raltegravir, dolutegravir)","'-navir'","'-ivir'","'-vudine'"],"Integrase inhibitors block insertion of proviral DNA into the host genome. A/E: nausea, diarrhea; they chelate with antacids."],
["lifecycle","Protease inhibitors (HIV, HCV), which block viral protein maturation, end in:",["'-navir' (e.g., atazanavir, darunavir)","'-gravir'","'-ciclovir'","'-mantadine'"],"PIs inhibit HIV aspartyl protease (retropepsin), which cleaves the viral polyprotein."],
["lifecycle","Viral NUCLEIC ACID SYNTHESIS (reverse transcription in HIV) is blocked by:",["NRTIs and NNRTIs (HIV); nucleoside/nucleotide analogs (HSV, HBV)","Neuraminidase inhibitors","CCR5 antagonists","Interferon-gamma only"],"The most commonly used NRTIs (LETA) are lamivudine, emtricitabine, tenofovir and abacavir."],
["lifecycle","Ritonavir and cobicistat ('RC') act as pharmacokinetic enhancers by inhibiting:",["CYP3A","Neuraminidase","Reverse transcriptase","P-glycoprotein only"],"They boost other PIs (and cobicistat boosts elvitegravir) by inhibiting CYP3A."],
["lifecycle","Oseltamivir (Tamiflu) is given ___, while zanamivir is given ___.",["Orally as a prodrug; by inhalation","By inhalation; IV","IV; orally","Subcutaneously; orally"],"Oseltamivir causes GI discomfort (take with food); zanamivir can irritate the respiratory tract."],

/* ===== Enfuvirtide vs maraviroc ===== */
["entry","Enfuvirtide is classified as a:",["Fusion inhibitor","CCR5 antagonist","Protease inhibitor","Integrase inhibitor"],"Enfuvirtide is a polypeptide fusion inhibitor."],
["entry","Enfuvirtide works by binding to:",["gp41, preventing the conformational change needed for fusion","The CCR5 coreceptor","Reverse transcriptase","Viral neuraminidase"],"By binding gp41 it stops the conformational change that lets HIV fuse with the cell."],
["entry","How is enfuvirtide administered?",["Subcutaneously","Orally","By inhalation","Topically"],"Being a polypeptide, it is given subcutaneously."],
["entry","Maraviroc is an entry inhibitor that blocks the:",["CCR5 coreceptor","gp41 fusion protein","CD4 receptor itself","Integrase enzyme"],"Maraviroc blocks CCR5, the coreceptor that works with gp41 to let HIV enter through the membrane."],
["entry","Which ADR is associated with maraviroc?",["Severe hepatotoxicity","Red man syndrome","Optic neuritis","Hemorrhagic cystitis"],"Maraviroc is associated with severe hepatotoxicity."],
["entry","Which statement correctly contrasts the 'EM' entry inhibitors?",["Enfuvirtide binds gp41 (SC); maraviroc blocks CCR5 (oral, hepatotoxic)","Enfuvirtide blocks CCR5; maraviroc binds gp41","Both are integrase inhibitors","Both are given by inhalation"],"EM = Enfuvirtide (fusion inhibitor, gp41, SC) and Maraviroc (CCR5 coreceptor blocker, severe hepatotoxicity)."],

/* ===== Cancer terms ===== */
["caterms","Cancer refers to a large number of diseases characterized by:",["Abnormal cells that divide uncontrollably and can infiltrate and destroy normal tissue","Only benign growths","Infections by oncogenic bacteria","Temporary inflammation"],"Cancer = abnormal cell growth. Development of abnormal cells that divide uncontrollably and infiltrate and destroy normal body tissue."],
["caterms","A NEOPLASM is:",["A new, abnormal growth of tissue that can be benign or malignant","Always a malignant tumor","A cancer of blood-forming tissue","A secondary site of cancer"],"Mnemonic NBMI: Neoplasm, Benign, Malignant, In situ."],
["caterms","A tumor that is not cancerous and does not spread to other parts of the body is:",["Benign","Malignant","Invasive","Metastatic"],"Benign tumors don't spread, though the notes warn they may still progress to malignant."],
["caterms","Cancer that is still in its original place, has not spread to nearby tissue, and is considered NON-invasive is:",["In situ","Invasive","Metastatic","Malignant"],"In situ is similar to benign in that it has not spread."],
["caterms","A cancerous tumor with the ability to invade surrounding tissues and spread to other organs is:",["Malignant","Benign","In situ","Neoplasm only"],"Malignant tumors can invade other organs, e.g., liver and lungs."],
["caterms","Breast cancer that has spread to the lungs: the lungs are the:",["Secondary site","Primary site","In situ site","Adjuvant site"],"PMSI: the primary site is where the cancer began; a secondary site is where it has spread to."],
["caterms","The PROCESS by which cancer cells spread from where they originated to other parts of the body is:",["Metastasis","Invasion","Neoplasia","Palliation"],"Metastasis ('kalatan'), the M in PMSI (Primary site, Secondary site, Metastasis, Invasive)."],
["caterms","Cancer that has spread from the original layer of cells into nearby tissue is called:",["Invasive","In situ","Benign","Primary"],"Invasive cancer has spread into nearby tissue, which in situ cancer has not."],
["caterms","Cancer that begins in the SKIN or in tissues that line the inner organs is a:",["Carcinoma","Sarcoma","Leukemia","Lymphoma"],"CSLL: Carcinoma (skin and linings), Sarcoma (bone, muscle, fat, cartilage), Leukemia (blood-forming tissue), Lymphoma (lymph nodes)."],
["caterms","Cancer that begins in bone, muscle, fat or cartilage is a:",["Sarcoma","Carcinoma","Leukemia","Lymphoma"],"Sarcoma. The notes give joint sarcoma as an example."],
["caterms","Cancer that starts in blood-forming tissue like bone marrow is:",["Leukemia","Lymphoma","Carcinoma","Sarcoma"],"Leukemia is noted as hard to treat."],
["caterms","Treatment given AFTER the main treatment (e.g., chemo after surgery) to kill any remaining cancer cells is:",["Adjuvant therapy","Palliative care","Targeted therapy","In situ therapy"],"Treatment mnemonic 'At This Point': Adjuvant, Targeted, Palliative. Adjuvant therapy plays a supporting role."],
["caterms","Medical care focused on improving quality of life by managing symptoms (pain, nausea, fatigue), without treating the cause, is:",["Palliative care","Adjuvant therapy","Targeted therapy","Curative surgery"],"Palliative care is for when cure isn't the goal ('pag malala na'). It doesn't treat the cause of cancer."],
["caterms","The log-kill (fractional kill) hypothesis states that a given dose of chemotherapy kills:",["A constant FRACTION (percentage) of tumor cells, regardless of tumor size","A constant NUMBER of cells per dose","All cells in one dose","Only resting (G0) cells"],"It follows first-order kinetics: a constant percentage, not a constant amount, is killed per dose."],

/* ===== Cell cycle & antineoplastics ===== */
["cycle","Which phase of the cell cycle is the LONGEST (~40%), preparing for DNA synthesis?",["G1","S","G2","M"],"Phases: G1 ~40% (longest), S ~39% (DNA synthesis), G2 ~19%, M ~2% (mitosis)."],
["cycle","DNA replication occurs in which phase?",["S phase","G1 phase","G2 phase","M phase"],"S = synthesis: replication of the DNA genome (~39%)."],
["cycle","CELL CYCLE–NONSPECIFIC drugs (act in any phase) include:",["Alkylating agents, antitumor antibiotics, nitrosoureas","Antimetabolites, taxanes, vinca alkaloids","Steroids, epothilones, podophyllotoxins","Only vinca alkaloids"],"Nonspecific: Alkylating agents, Antibiotics, Nitrosoureas."],
["cycle","Antimetabolites are cell-cycle specific and act in which phase (code 'SA')?",["S phase","G1 phase","G2 phase","M phase"],"Antimetabolites interfere with purine or pyrimidine precursors, so they target the S phase."],
["cycle","Which drug class acts in G1 (code '1S')?",["Steroids","Taxanes","Antimetabolites","Podophyllotoxins"],"G1 = Steroids (1S)."],
["cycle","Which pair acts in the G2 phase (code '2EP')?",["Epothilones and podophyllotoxins","Taxanes and vinca alkaloids","Steroids and antimetabolites","Alkylating agents and nitrosoureas"],"G2 = Epothilones and Podophyllotoxins (2EP). Bleomycin also causes cells to accumulate in G2."],
["cycle","Which drugs act in the M phase (code 'MTV')?",["Taxanes and vinca alkaloids","Antimetabolites and steroids","Epothilones and podophyllotoxins","Nitrosoureas and alkylating agents"],"M = Taxanes, Vinca alkaloids (MTV)."],
["cycle","Vinca alkaloids (vincristine, vinblastine from Catharanthus roseus) act by:",["Inhibiting microtubule synthesis, blocking mitosis in metaphase (M phase)","Promoting microtubule polymerization and stabilization","Inhibiting topoisomerase I","Alkylating guanine N7"],"Vinca alkaloids are microtubule synthesis inhibitors, so mitosis stops in metaphase. ADR: phlebitis or cellulitis, GI upset, alopecia."],
["cycle","Taxanes (paclitaxel, docetaxel from the yew tree) act in G2/M by:",["Promoting polymerization and stabilization of microtubules","Inhibiting microtubule assembly","Blocking thymidylate synthase","Intercalating into DNA"],"Taxanes are the opposite of vincas: they over-stabilize microtubules so the spindle can't dissolve. ADR: peripheral neuropathy, neutropenia, leukopenia."],
["cycle","Epipodophyllotoxins (etoposide, teniposide; '-poside') form a complex with:",["Topoisomerase II (cuts and religates double-stranded DNA)","Topoisomerase I (single-stranded DNA)","Tubulin","Dihydrofolate reductase"],"They come from mayapple root (Podophyllum peltatum). ADR: myelosuppression."],
["cycle","Camptothecins (topotecan, irinotecan; '-tecan') inhibit:",["Topoisomerase I (cuts and religates single DNA strands)","Topoisomerase II","Ornithine decarboxylase","Microtubule polymerization"],"Remember 'tec1n' for topo I. They come from the Camptotheca acuminata tree in China."],
["cycle","Alkylating agents alkylate DNA at which position?",["N7 of guanine","N3 of adenine","C5 of cytosine","O2 of thymine"],"Alkylation at guanine N7 causes miscoding, strand breakage, and cross-linking of DNA."],

/* ===== Rescue drugs / antidotes ===== */
["rescue","The antidote (rescue drug) for cyclophosphamide/ifosfamide-induced hemorrhagic cystitis is:",["MESNA","Leucovorin","Dexrazoxane","Pyridoxine"],"Their metabolite acrolein causes hemorrhagic cystitis, and MESNA protects the bladder."],
["rescue","Leucovorin (folinic acid) is the antidote for which drug class?",["Antifolates (methotrexate, pemetrexed, pralatrexate)","Anthracyclines","Nitrogen mustards","Vinca alkaloids"],"The antifolates ('-trexate') cause myelosuppression, and folinic acid (Leucovorin) is the rescue."],
["rescue","Dexrazoxane is the antidote used with:",["Anthracyclines (doxorubicin, daunorubicin…)","Cyclophosphamide","Methotrexate","Cisplatin"],"Anthracyclines cause myelosuppression and cardiotoxicity, and dexrazoxane is listed as their antidote."],
["rescue","A patient on methotrexate develops severe myelosuppression. Which rescue drug fits?",["Leucovorin (folinic acid)","MESNA","Dexrazoxane","Vitamin K"],"Folinic acid bypasses the blocked dihydrofolate reductase step."],
["rescue","Which pairing of drug and antidote is CORRECT?",["Ifosfamide – MESNA","Doxorubicin – MESNA","Methotrexate – dexrazoxane","Cyclophosphamide – leucovorin"],"MESNA goes with the nitrogen mustards (cyclophosphamide, ifosfamide), leucovorin with antifolates, and dexrazoxane with anthracyclines."],
["rescue","Cyclophosphamide forms the active metabolites phosphoramide mustard (cytotoxic) and acrolein. Acrolein is responsible for:",["Hemorrhagic cystitis","Cardiotoxicity","Pulmonary fibrosis","Ototoxicity"],"Acrolein is the reason MESNA is needed."],

/* ===== Chemo-Man ===== */
["chemoman","On Chemo-Man, cisplatin and carboplatin are linked to:",["Ototoxicity and nephrotoxicity","Pulmonary fibrosis","Cardiotoxicity","Conjunctivitis"],"Platinum analogs ('platin'): severe nausea and vomiting, plus ototoxicity (high-frequency hearing loss, tinnitus) and nephrotoxicity. Cisplatin is more toxic than carboplatin."],
["chemoman","Which Chemo-Man pair causes PULMONARY FIBROSIS?",["Bleomycin and busulfan","Vincristine and vinblastine","Cisplatin and carboplatin","5-FU and 6-MP"],"Bleomycin: pulmonary toxicity. Busulfan is known to cause pulmonary fibrosis."],
["chemoman","Doxorubicin and daunorubicin (and trastuzumab/Herceptin) are linked on Chemo-Man to:",["Cardiotoxicity","Hemorrhagic cystitis","Peripheral neuropathy","Keratitis"],"Anthracyclines target the heart, with dexrazoxane as the protective antidote."],
["chemoman","Cytarabine on Chemo-Man is linked to:",["Conjunctivitis and keratitis","Pulmonary fibrosis","Ototoxicity","Liver fibrosis"],"Cytarabine affects the eyes (conjunctivitis, keratitis)."],
["chemoman","Cyclophosphamide and ifosfamide on Chemo-Man are linked to:",["Hemorrhagic cystitis","Cardiotoxicity","Optic neuritis","Ototoxicity"],"These nitrogen mustards affect the bladder, which MESNA protects."],
["chemoman","Vincristine and the taxanes (e.g., paclitaxel) share which Chemo-Man toxicity?",["Peripheral neuropathy","Myelosuppression only","Pulmonary fibrosis","Hemorrhagic cystitis"],"Both disturb microtubules (in opposite ways) and cause peripheral neuropathy."],
["chemoman","Vinblastine, unlike vincristine, is mainly linked on Chemo-Man to:",["Myelosuppression","Peripheral neuropathy","Cardiotoxicity","Ototoxicity"],"Vinblastine's main toxicity is myelosuppression, while vincristine's is neuropathy. A classic board distinction."],
["chemoman","Methotrexate on Chemo-Man is linked to:",["Myelosuppression, mucositis and liver fibrosis","Pulmonary fibrosis only","Hemorrhagic cystitis","Keratitis"],"Its antidote is leucovorin (folinic acid)."],
["chemoman","5-Fluorouracil on Chemo-Man is linked to:",["Myelosuppression and GI upset","Cardiotoxicity","Ototoxicity","Hemorrhagic cystitis"],"5-FU (IV) is the most widely used agent for colorectal cancer, and capecitabine is its oral prodrug."],
["chemoman","6-Mercaptopurine on Chemo-Man is linked to:",["Myelosuppression","Pulmonary fibrosis","Peripheral neuropathy","Ototoxicity"],"6-MP (a purine antagonist) was the first of its group found to have clinical efficacy in cancer therapy."]
];

/* ---------------- Mnemonic flip cards ---------------- */
const FLIPS = [
["CCESTT","Bacteriostatic","<b>C</b>hloramphenicol · <b>C</b>lindamycin · <b>E</b>rythromycin · <b>S</b>ulfamethoxazole · <b>T</b>etracyclines · <b>T</b>rimethoprim","sky"],
["FACPVM","Bactericidal","<b>F</b>luoroquinolones · <b>A</b>minoglycosides · <b>C</b>ephalosporins · <b>P</b>enicillin · <b>V</b>ancomycin · <b>M</b>etronidazole","lav"],
["CONDOM","Penicillinase-resistant","<b>C</b>loxacillin · <b>O</b>xacillin · <b>N</b>afcillin · <b>D</b>icl<b>O</b>xacillin · <b>M</b>ethicillin (withdrawn: interstitial nephritis)","rose"],
["3PM","Tetracyclines fail","<b>P</b>roteus · <b>P</b>rovidencia · <b>P</b>seudomonas · <b>M</b>organella","peach"],
["PIRE","Hepatotoxicity","Most → least: <b>P</b>yrazinamide &gt; <b>I</b>soniazid &gt; <b>R</b>ifampicin &gt; <b>E</b>thambutol","sage"],
["MT · IP · CD","Amoebicides","Mixed: <b>M</b>etronidazole, <b>T</b>inidazole<br>Luminal: <b>I</b>odoquinol, <b>P</b>aromomycin<br>Systemic: <b>C</b>hloroquine, <b>D</b>ehydroemetine","butter"],
["AACQMP","Erythrocytic malaria","<b>A</b>rtemisinin · <b>A</b>tovaquone/proguanil · <b>C</b>hloroquine · <b>Q</b>uinine · <b>M</b>efloquine · <b>P</b>yrimethamine","lav"],
["EDMP · AR","Viral entry / uncoating","Entry: <b>E</b>nfuvirtide, <b>D</b>ocosanol, <b>M</b>araviroc, <b>P</b>alivizumab<br>Uncoating: <b>A</b>mantadine, <b>R</b>imantadine","sky"],
["EM","Entry inhibitors","<b>E</b>nfuvirtide: gp41 fusion inhibitor, SC<br><b>M</b>araviroc: CCR5 blocker, hepatotoxic","rose"],
["NBMI · PMSI","Cancer terms","Neoplasm, Benign, Malignant, In situ<br>Primary site, Secondary site, Metastasis, Invasive","peach"],
["CSLL · ATP","Types & treatment","Carcinoma, Sarcoma, Leukemia, Lymphoma<br><b>A</b>t <b>T</b>his <b>P</b>oint: Adjuvant, Targeted, Palliative","butter"],
["1S·SA·2EP·MTV","Cell cycle","G1 Steroids · S Antimetabolites · G2 Epothilones, Podophyllotoxins · M Taxanes, Vinca<br>Nonspecific: Alkylating, Antibiotics, Nitrosoureas","sage"]
];

/* ---------------- Board pearls ---------------- */
const PEARLS = [
["💊","Methicillin left the market for <b>interstitial nephritis</b>, not because of MRSA."],
["🌹","Red Man syndrome comes from <b>rapid</b> vancomycin infusion. Slow it down and give an antihistamine."],
["🦠","Tetracyclines skip <b>3PM</b> (Proteus, Providencia, Pseudomonas, Morganella) but are the DOC for Rickettsiae."],
["🧪","Sulfa comes before tRimethoprim: <b>DHP-Synthetase</b> first, then <b>DHF-Reductase</b>."],
["🫁","Pyrazinamide is the most hepatotoxic and ethambutol the least (PIRE). Moxifloxacin is second-line."],
["🦟","Primaquine is the 'radical cure' (it kills hypnozoites) and isn't in AACQMP."],
["🧬","Enfuvirtide binds <b>gp41</b> (SC). Maraviroc blocks <b>CCR5</b> (hepatotoxic)."],
["🔁","Vinca alkaloids <b>stop</b> microtubules from forming; taxanes <b>freeze</b> them in place. Both act in M phase."],
["🛟","Rescue trio: <b>MESNA</b> for cyclophosphamide/ifosfamide, <b>leucovorin</b> for methotrexate, <b>dexrazoxane</b> for anthracyclines."],
["🧍","Chemo-Man: platins hit ears and kidneys, bleomycin and busulfan the lungs, '-rubicins' the heart, the mustards the bladder."]
];

/* ---------------- Diagrams (original SVGs) ---------------- */
function viralCycleSVG(){
  const cx = 420, cy = 288, rPill = 160, rxBox = 322, ryBox = 262;
  const stages = [
    {a:210, s:"Attachment & entry", t:"EDMP", l:["Enfuvirtide, Maraviroc (HIV)","Docosanol (HSV), Palivizumab (RSV)"], c:"var(--rose)"},
    {a:256, s:"Penetration",        t:"Interferon-α", l:["(HBV, HCV)"], c:"var(--peach)"},
    {a:302, s:"Uncoating",          t:"AR", l:["Amantadine, Rimantadine","(influenza A only)"], c:"var(--butter)"},
    {a:352, s:"Nucleic acid synthesis", t:"NRTIs · NNRTIs", l:["(HIV) + nucleoside/nucleotide","analogs (HSV, HBV)"], c:"var(--sage)"},
    {a:32,  s:"Integration",        t:"INSTIs  “-gravir”", l:["raltegravir, dolutegravir (HIV)"], c:"var(--sky)"},
    {a:88,  s:"Protein maturation", t:"PIs  “-navir”", l:["atazanavir, darunavir (HIV, HCV)"], c:"var(--lav)"},
    {a:145, s:"Release",            t:"Neuraminidase inhib.", l:["oseltamivir, zanamivir (flu A & B)"], c:"var(--rose)"}
  ];
  const P = (r, a, ry) => [cx + r * Math.cos(a * Math.PI / 180), cy + (ry || r) * Math.sin(a * Math.PI / 180)];
  let g = `<circle cx="${cx}" cy="${cy}" r="${rPill}" fill="var(--lav-t)" stroke="var(--lav)" stroke-width="3" stroke-dasharray="10 8"/>
    <text x="${cx}" y="${cy-8}" text-anchor="middle" class="s-ink" font-size="17" font-weight="800">host cell</text>
    <text x="${cx}" y="${cy+14}" text-anchor="middle" class="s-muted" font-size="12">follow the stages clockwise ↻</text>`;
  stages.forEach((s, i) => {
    const [px, py] = P(rPill, s.a), [bx, by] = P(rxBox, s.a, ryBox);
    const label = `${i+1}. ${s.s}`, pw = Math.round(label.length * 6.6 + 22);
    g += `<line x1="${px}" y1="${py}" x2="${bx}" y2="${by}" stroke="var(--muted)" stroke-width="1.5" stroke-dasharray="3 4"/>`;
    g += `<rect x="${bx-92}" y="${by-27}" width="184" height="${s.l.length > 1 ? 56 : 44}" rx="12" fill="var(--surface)" stroke="${s.c}" stroke-width="2.5"/>
      <text x="${bx}" y="${by-9}" text-anchor="middle" class="s-ink" font-size="13" font-weight="800">${s.t}</text>
      ${s.l.map((t, j) => `<text x="${bx}" y="${by+7+j*14}" text-anchor="middle" class="s-muted" font-size="10.5">${t}</text>`).join('')}`;
    g += `<rect x="${px-pw/2}" y="${py-14}" width="${pw}" height="28" rx="14" fill="${s.c}"/>
      <text x="${px}" y="${py+4}" text-anchor="middle" fill="#2c2a33" font-size="11" font-weight="800">${label}</text>`;
  });
  return `<svg class="diagram" viewBox="0 0 840 590" role="img" aria-label="Viral life cycle with the drugs that block each stage">${g}</svg>`;
}

function cellCycleSVG(){
  const cx = 405, cy = 210, R = 150, r = 92;
  const segs = [ // order: M (top) then G1, S, G2 clockwise
    {n:"M", p:2,  c:"#f2a7bb", d:"Taxanes, Vinca (MTV)"},
    {n:"G1",p:40, c:"#f7c09a", d:"Steroids (1S)"},
    {n:"S", p:39, c:"#f6d77a", d:"Antimetabolites (SA)"},
    {n:"G2",p:19, c:"#a9d8b0", d:"Epothilones, Podophyllotoxins (2EP)"}
  ];
  const P = (rad, deg) => [cx + rad * Math.cos(deg * Math.PI / 180), cy + rad * Math.sin(deg * Math.PI / 180)];
  let a0 = -90, g = "";
  segs.forEach(s => {
    const a1 = a0 + s.p * 3.6, big = (a1 - a0) > 180 ? 1 : 0;
    const [x1,y1] = P(R,a0), [x2,y2] = P(R,a1), [x3,y3] = P(r,a1), [x4,y4] = P(r,a0);
    g += `<path d="M${x1},${y1} A${R},${R} 0 ${big} 1 ${x2},${y2} L${x3},${y3} A${r},${r} 0 ${big} 0 ${x4},${y4} Z" fill="${s.c}" stroke="var(--surface)" stroke-width="3"/>`;
    const mid = (a0 + a1) / 2, [lx,ly] = P((R + r) / 2, mid);
    if(s.p > 5) g += `<text x="${lx}" y="${ly-2}" text-anchor="middle" fill="#2c2a33" font-size="17" font-weight="800">${s.n}</text><text x="${lx}" y="${ly+15}" text-anchor="middle" fill="#2c2a33" font-size="12" font-weight="700">${s.p}%</text>`;
    const [ox,oy] = P(R + 16, mid), right = Math.cos(mid * Math.PI / 180) >= 0;
    const [tx,ty] = P(R + 34, mid);
    g += `<line x1="${P(R,mid)[0]}" y1="${P(R,mid)[1]}" x2="${ox}" y2="${oy}" stroke="var(--muted)" stroke-width="1.5"/>
      <text x="${tx}" y="${ty+4}" text-anchor="${right ? 'start' : 'end'}" class="s-ink" font-size="12.5" font-weight="800">${s.n === 'M' ? 'M 2%: ' : ''}${s.d}</text>`;
    a0 = a1;
  });
  g += `<circle cx="${cx}" cy="${cy}" r="${r-8}" fill="var(--surface)"/>
    <text x="${cx}" y="${cy-6}" text-anchor="middle" class="s-ink" font-size="15" font-weight="800">the cell</text>
    <text x="${cx}" y="${cy+12}" text-anchor="middle" class="s-ink" font-size="15" font-weight="800">cycle</text>
    <path d="M${P(R,-60)[0]},${P(R,-60)[1]} q46,-46 70,-6" fill="none" stroke="var(--muted)" stroke-width="1.6" stroke-dasharray="4 4"/>
    <text x="${P(R,-60)[0]+70}" y="${P(R,-60)[1]-34}" class="s-muted" font-size="12" font-weight="700">G0 (resting)</text>`;
  return `<svg class="diagram" viewBox="0 0 690 420" role="img" aria-label="Cell cycle phases with the antineoplastic classes acting in each">${g}</svg>`;
}

function chemoManSVG(){
  const L = (y, drug, adr, tx, ty) => `<text x="16" y="${y}" class="s-ink" font-size="13.5" font-weight="800">${drug}</text>
    <text x="16" y="${y+16}" class="s-muted" font-size="11.5">${adr}</text>
    <line x1="254" y1="${y+4}" x2="${tx}" y2="${ty}" stroke="var(--rose-d)" stroke-width="1.6"/><circle cx="${tx}" cy="${ty}" r="3.5" fill="var(--rose-d)"/>`;
  const R = (y, drug, adr, tx, ty) => `<text x="548" y="${y}" class="s-ink" font-size="13.5" font-weight="800">${drug}</text>
    <text x="548" y="${y+16}" class="s-muted" font-size="11.5">${adr}</text>
    <line x1="540" y1="${y+4}" x2="${tx}" y2="${ty}" stroke="var(--lav-d)" stroke-width="1.6"/><circle cx="${tx}" cy="${ty}" r="3.5" fill="var(--lav-d)"/>`;
  const body = `
    <g stroke="#d9a58a" stroke-width="2.5" stroke-linejoin="round">
      <path d="M352,140 L270,250" stroke="#f6c9a8" stroke-width="22" stroke-linecap="round"/>
      <path d="M408,140 L490,250" stroke="#f6c9a8" stroke-width="22" stroke-linecap="round"/>
      <path d="M355,330 L340,478" stroke="#f6c9a8" stroke-width="28" stroke-linecap="round"/>
      <path d="M405,330 L420,478" stroke="#f6c9a8" stroke-width="28" stroke-linecap="round"/>
      <path d="M330,140 Q380,120 430,140 Q452,240 428,338 Q380,356 332,338 Q308,240 330,140Z" fill="#f9d6bd"/>
      <ellipse cx="333" cy="82" rx="9" ry="14" fill="#f6c9a8"/><ellipse cx="427" cy="82" rx="9" ry="14" fill="#f6c9a8"/>
      <circle cx="380" cy="80" r="46" fill="#f9d6bd"/>
    </g>
    <circle cx="364" cy="74" r="5" fill="#3a2f2a"/><circle cx="396" cy="74" r="5" fill="#3a2f2a"/>
    <path d="M368,98 q12,9 24,0" fill="none" stroke="#c25a72" stroke-width="2.5" stroke-linecap="round"/>
    <ellipse cx="358" cy="190" rx="17" ry="30" fill="#f4b8c8" stroke="#d98aa0" stroke-width="1.5"/>
    <ellipse cx="402" cy="190" rx="17" ry="30" fill="#f4b8c8" stroke="#d98aa0" stroke-width="1.5"/>
    <path d="M388,232c-8-6-14-10-14-16 0-4 3-7 7-7 3 0 5 2 7 4 2-2 4-4 7-4 4 0 7 3 7 7 0 6-6 10-14 16z" fill="#e05a78"/>
    <ellipse cx="356" cy="252" rx="22" ry="12" fill="#c98a6e" opacity=".85"/>
    <path d="M370,272 q10,-8 20,0 t20,0 q-4,12 -20,10 t-20,-10z" fill="#f2c0a0" stroke="#d9a58a" stroke-width="1.5"/>
    <path d="M343,286 q-10,8 0,18 q8,-4 4,-10 q-4,-4 -4,-8z" fill="#b8746a"/><path d="M417,286 q10,8 0,18 q-8,-4 -4,-10 q4,-4 4,-8z" fill="#b8746a"/>
    <ellipse cx="380" cy="320" rx="15" ry="10" fill="#f7d77a" stroke="#d8b44a" stroke-width="1.5"/>
    <line x1="340" y1="360" x2="333" y2="455" stroke="#e8a0a0" stroke-width="5" stroke-linecap="round" stroke-dasharray="2 7"/>
    <line x1="420" y1="360" x2="427" y2="455" stroke="#e8a0a0" stroke-width="5" stroke-linecap="round" stroke-dasharray="2 7"/>`;
  return `<svg class="diagram" viewBox="0 0 770 500" role="img" aria-label="Chemo-Man: organ toxicities of anticancer drugs">${body}
    ${L(44,"Cisplatin + Carboplatin","ototoxicity, nephrotoxicity",326,84)}
    ${L(124,"Methotrexate","myelosuppression, mucositis, liver fibrosis",356,252)}
    ${L(214,"5-Fluorouracil","myelosuppression, GI upset",372,276)}
    ${L(300,"Cyclophosphamide + Ifosfamide","hemorrhagic cystitis",368,320)}
    ${L(410,"6-Mercaptopurine","myelosuppression",336,420)}
    ${R(44,"Cytarabine","conjunctivitis, keratitis",398,74)}
    ${R(140,"Bleomycin + Busulfan","pulmonary fibrosis",412,186)}
    ${R(222,"Doxorubicin, Daunorubicin","cardiotoxicity (+ trastuzumab)",396,222)}
    ${R(312,"Vincristine · Taxanes","peripheral neuropathy",490,252)}
    ${R(410,"Vinblastine","myelosuppression",424,420)}
  </svg>`;
}

/* ---------------- Study cards (HTML) ---------------- */
const STUDY_HTML = `
<!-- ======================= ANTIBACTERIALS ======================= -->
<article class="card study" data-topic="defs">
  <h3><span class="num bg-lav">1</span>Definition of terms</h3>
  <div class="three">
    <div class="box bg-rose"><h4>Antibiotics</h4>Drugs <b>derived from microorganisms</b> that <b>target</b> other microorganisms (naturally derived only).</div>
    <div class="box bg-lav"><h4>Antimicrobials</h4>Target <b>microbes</b>; can be <b>natural or synthetic</b>. Example: antibacterials.</div>
    <div class="box bg-sage"><h4>Antibacterials</h4>The antimicrobials that act on <b>bacteria</b>.</div>
  </div>
  <p class="note">The lecture's definition, "substances produced by microorganisms that inhibit or destroy other microorganisms", refers to <b>antibiotics</b>.</p>
  <div class="flow">
    <div class="step bg-butter">Isoniazid<br><small>narrow: mycobacteria only</small></div>
    <div class="step bg-sage">Ampicillin<br><small>extended: adds G(−) rods</small></div>
    <div class="step bg-peach">Tetracycline<br><small>broad: also ARAm (Actinomyces, Rickettsiae, Amoebae)</small></div>
  </div>
  <p class="note">Give broad-spectrum first when the bug is unknown, then narrow. <b>MIC</b> is the minimum inhibitory concentration (minimum dose required). Selection needs the organism's <b>identity</b> and <b>susceptibility</b>, the <b>site</b>, <b>patient factors</b> (adult, child, elderly, pregnant, CKD), <b>safety/efficacy</b>, and <b>cost</b>.</p>
</article>

<article class="card study" data-topic="statcid">
  <h3><span class="num bg-sky">2</span>Bacteriostatic vs bactericidal</h3>
  <div class="two">
    <div class="box bg-sky"><h4>Static: reversible stoppage <span class="mn">· CCESTT</span></h4>
      <ul><li><b>C</b>hloramphenicol</li><li><b>C</b>lindamycin</li><li><b>E</b>rythromycin</li><li><b>S</b>ulfamethoxazole</li><li><b>T</b>etracyclines</li><li><b>T</b>rimethoprim</li></ul><p class="note">Inhibits growth.</p></div>
    <div class="box bg-lav"><h4>Cidal: irreversible killing <span class="mn">· FACPVM</span></h4>
      <ul><li><b>F</b>luoroquinolones</li><li><b>A</b>minoglycosides</li><li><b>C</b>ephalosporins</li><li><b>P</b>enicillin</li><li><b>V</b>ancomycin</li><li><b>M</b>etronidazole</li></ul><p class="note">Kills.</p></div>
  </div>
  <div class="box bg-rose"><b>Trap:</b> if the static drug is given first, the cidal effect drops. Combinations are rare and generally not recommended, because cidal drugs need <b>actively growing</b> bacteria.</div>
</article>

<article class="card study" data-topic="resist">
  <h3><span class="num bg-rose">3</span>Mechanisms of resistance (3 main methods)</h3>
  <div class="three">
    <div class="box bg-peach"><h4>① Altered target</h4>Mutation of the target.<br><i>e.g., altered DNA gyrase gives FQ resistance.</i></div>
    <div class="box bg-sky"><h4>② ↓ Accumulation</h4><b>↓ Permeability:</b> can't get in (altered porins; carbapenems can't pass).<br><b>↑ Efflux:</b> gets in, then pumped out (tetracycline in <i>Bacteroides</i>).</div>
    <div class="box bg-lav"><h4>③ Enzymatic inactivation</h4>Enzymes destroy the drug.<br><i>e.g., penicillinase in <b>N. gonorrhoeae</b>; β-lactamases in Enterobacter.</i></div>
  </div>
</article>

<article class="card study wide" data-topic="pens">
  <h3><span class="num bg-peach">4</span>Types of penicillins</h3>
  <div class="tbl-wrap"><table class="tbl">
    <tr><th>Type</th><th>Members</th><th>Key points</th></tr>
    <tr><td><b>Natural</b><br><small>main target G(+)</small></td><td>Pen G (benzylpenicillin)<br>Pen V (phenoxymethyl)</td><td>Pen G: poor GI absorption, so <b>IV/parenteral</b>. Pen V: <b>acid-stable, oral</b>. DOC for <b>gas gangrene</b> (<i>C. perfringens</i>) and <b>syphilis</b> (<i>T. pallidum</i>). Prone to β-lactamase.</td></tr>
    <tr><td><b>Penicillinase-resistant</b><br><span class="mn" style="color:var(--rose-d)">CONDOM</span></td><td><b>C</b>loxacillin, <b>O</b>xacillin, <b>N</b>afcillin, <b>D</b>icl<b>O</b>xacillin, <b>M</b>ethicillin</td><td>Antistaphylococcal. <b>Methicillin is off the market: high incidence of interstitial nephritis.</b> (MRSA keeps the name.)</td></tr>
    <tr><td><b>Aminopenicillins</b></td><td>Ampicillin, Amoxicillin</td><td>Like Pen G but better vs <b>G(+) bacilli</b>. Ampicillin: more often parenteral (+ sulbactam = Unasyn). Amoxicillin: <b>better GI absorption</b>.</td></tr>
    <tr><td><b>Antipseudomonal</b></td><td>Carboxy: carbenicillin, ticarcillin<br>Ureido: <b>piperacillin</b> (most potent), azlocillin</td><td>Used for <b>nosocomial</b> (hospital-acquired) infections caused by the <span class="mn">ESKAPE</span> bugs.</td></tr>
  </table></div>
</article>

<article class="card study" data-topic="vanco">
  <h3><span class="num bg-lav">5</span>Vancomycin</h3>
  <div class="two">
    <div class="box bg-lav"><h4>What it is</h4><ul><li><b>Glycopeptide</b>, bactericidal</li><li>Binds the <b>D-Ala-D-Ala terminus</b>, so cell wall synthesis stops</li><li>Systemic <b>MRSA</b> activity: pneumonia, bacteremia, endocarditis</li><li>DOC for <b>pseudomembranous colitis</b> (<i>C. difficile</i>)</li></ul></div>
    <div class="box bg-rose"><h4>ADRs</h4><ul><li><b>Red Man syndrome</b> (flushing) from <b>rapid infusion</b></li><li>Treat with <b>slow IV infusion</b> and an antihistamine (Benadryl)</li><li><b>Nephrotoxic</b></li></ul></div>
  </div>
</article>

<article class="card study" data-topic="tpm">
  <h3><span class="num bg-rose">6</span>3PM: where tetracyclines fail</h3>
  <div class="flow">
    <div class="step bg-rose"><span class="mn" style="font-size:1.6rem">P</span><br>Proteus</div>
    <div class="step bg-peach"><span class="mn" style="font-size:1.6rem">P</span><br>Providencia</div>
    <div class="step bg-butter"><span class="mn" style="font-size:1.6rem">P</span><br>Pseudomonas</div>
    <div class="step bg-lav"><span class="mn" style="font-size:1.6rem">M</span><br>Morganella</div>
  </div>
  <div class="box bg-sky"><h4>Tetracycline quick facts</h4>Four fused rings · <b>bacteriostatic</b>, broad-spectrum · DOC for <b>Rickettsiae</b> · food ↓ absorption (except <b>doxycycline, minocycline</b>) · antacids, dairy and Ca/Mg/Fe/Al form <b>chelates</b> · ADR: GI upset, tooth discoloration, growth retardation · <b>expired TTC causes Fanconi-like syndrome</b>.</div>
</article>

<article class="card study" data-topic="linez">
  <h3><span class="num bg-sage">7</span>Linezolid</h3>
  <div class="two">
    <div class="box bg-sage"><h4>Profile</h4><ul><li><b>Oxazolidinone</b> class</li><li>Binds <b>23S rRNA of the 50S</b> subunit</li><li>Prevents formation of the <b>ribosome (initiation) complex</b></li><li><b>"Last resort drug"</b> (resistant G+ such as MRSA and VRE)</li></ul></div>
    <div class="box bg-butter"><h4>Where it sits</h4><ul><li>Protein synthesis inhibitor (50S, with chloramphenicol, macrolides and clindamycin)</li><li>Dosing: <b>AUC/MIC</b> group (VAFATL)</li></ul></div>
  </div>
</article>

<article class="card study" data-topic="folate">
  <h3><span class="num bg-butter">8</span>DHPS vs DHFR</h3>
  <div class="flow" style="flex-direction:column;align-items:stretch">
    <div class="step" style="background:var(--surface-2)">PABA</div>
    <div class="flow"><div class="step bg-rose" style="flex:2">Dihydropteroate <b>synthetase</b> (DHPS)</div><div class="step bg-lav">⊖ Sulfonamides<br><small>PABA analogs</small></div></div>
    <div class="step" style="background:var(--surface-2)">Dihydrofolic acid</div>
    <div class="flow"><div class="step bg-rose" style="flex:2">Dihydrofolate <b>reductase</b> (DHFR)</div><div class="step bg-sage">⊖ Trimethoprim (bacteria)<br><small>also pyrimethamine and proguanil (plasmodia), methotrexate (cancer)</small></div></div>
    <div class="step" style="background:var(--surface-2)">Tetrahydrofolic acid → purines → DNA</div>
  </div>
  <p class="note"><b>S</b>ynthetase before <b>R</b>eductase, the same order as <b>S</b>ulfa before t<b>R</b>imethoprim. Blocking both gives <b>synergism</b> (1 + 1 = 3, cotrimoxazole).</p>
</article>

<article class="card study" data-topic="fq">
  <h3><span class="num bg-sky">9</span>Fluoroquinolone coverage (the spectrum table)</h3>
  <p>MOA: inhibit <b>DNA gyrase (topo II)</b> and <b>topoisomerase IV</b>. Prototype: <b>nalidixic acid</b> (urinary antiseptic).</p>
  <div class="tbl-wrap"><table class="tbl">
    <tr><th>Gen</th><th>Drug</th><th>Antimicrobial spectrum</th></tr>
    <tr><td>1st</td><td>Nalidixic acid</td><td><b>Moderate Gram −ve</b> activity</td></tr>
    <tr><td>2nd</td><td>Ciprofloxacin</td><td>Expanded G−ve; some <b>G+ve</b> and atypicals; <b>synergistic with β-lactams</b></td></tr>
    <tr><td>3rd</td><td>Levofloxacin</td><td>Expanded G−ve; improved G+ve and atypicals; <b>excellent vs <i>S. pneumoniae</i></b></td></tr>
    <tr><td>4th</td><td>Moxifloxacin, gemifloxacin</td><td>Improved G+ve <b>and anaerobic</b> activity</td></tr>
  </table></div>
</article>

<article class="card study" data-topic="pire">
  <h3><span class="num bg-sage">10</span>PIRE: anti-TB hepatotoxicity</h3>
  <div class="flow">
    <div class="step bg-rose" style="flex:1.6"><span class="mn" style="font-size:1.4rem">P</span> Pyrazinamide<br><small>MOST hepatotoxic</small></div><span class="arr">›</span>
    <div class="step bg-peach" style="flex:1.3"><span class="mn" style="font-size:1.4rem">I</span> Isoniazid</div><span class="arr">›</span>
    <div class="step bg-butter"><span class="mn" style="font-size:1.4rem">R</span> Rifampicin</div><span class="arr">›</span>
    <div class="step bg-sage" style="flex:.8"><span class="mn" style="font-size:1.4rem">E</span> Ethambutol<br><small>least</small></div>
  </div>
  <div class="tbl-wrap"><table class="tbl">
    <tr><th>RIPE</th><th>MOA</th><th>Key ADR</th></tr>
    <tr><td>Rifampicin</td><td>Inhibits RNA synthesis</td><td>Red-orange urine, so counsel <b>reassurance</b></td></tr>
    <tr><td>Isoniazid</td><td>Inhibits mycolic acid synthesis</td><td>Peripheral neuropathy (give <b>B6</b>)</td></tr>
    <tr><td>Pyrazinamide</td><td>Acidifies; inhibits fatty acid synthesis</td><td><b>Most hepatotoxic</b></td></tr>
    <tr><td>Ethambutol</td><td>Inhibits arabinogalactan synthesis</td><td><b>Optic neuritis</b></td></tr>
  </table></div>
  <p class="note">Second line: streptomycin, capreomycin, cycloserine, <b>moxifloxacin</b> (recent replacement for ethambutol), bedaquiline.</p>
</article>

<!-- ================== ANTIPROTOZOALS – ANTIVIRALS ================== -->
<article class="card study wide" data-topic="codes">
  <h3><span class="num bg-peach">11</span>Letter codes: amoebicides · antimalarials · trypanosomiasis</h3>
  <div class="three">
    <div class="box bg-sage"><h4>Amoebicides <small>(E. histolytica, dysentery)</small></h4>
      <p><span class="mn" style="font-size:1.3rem">MT</span> <b>Mixed</b> (luminal + systemic): <b>M</b>etronidazole (DOC, Flagyl), <b>T</b>inidazole (2nd-gen nitroimidazole; also giardiasis, trichomoniasis)</p>
      <p><span class="mn" style="font-size:1.3rem">IP</span> <b>Luminal</b>: <b>I</b>odoquinol (trophozoite and cyst), <b>P</b>aromomycin (aminoglycoside, luminal only)</p>
      <p><span class="mn" style="font-size:1.3rem">CD</span> <b>Systemic</b>: <b>C</b>hloroquine (liver abscess with metronidazole; not luminal), <b>D</b>ehydroemetine (IM)</p></div>
    <div class="box bg-lav"><h4>Antimalarials <small>(female Anopheles)</small></h4>
      <p><span class="mn" style="font-size:1.3rem">AACQMP</span> act on the <b>erythrocytic</b> form: <b>A</b>rtemisinin, <b>A</b>tovaquone/proguanil, <b>C</b>hloroquine, <b>Q</b>uinine, <b>M</b>efloquine, <b>P</b>yrimethamine</p>
      <p><b>Primaquine</b> acts on exoerythrocytic (liver) and gametocytic forms; it is the "radical cure" for vivax/ovale hypnozoites.</p>
      <p class="note">Chloroquine: heme can't form hemozoin. Artemisinin: endoperoxide bridge. Quinine: cinchonism. Atovaquone-proguanil: travelers. Mefloquine: given with an artemisinin.</p></div>
    <div class="box bg-peach"><h4>Trypanosomiasis</h4>
      <p><b><i>T. b. gambiense</i></b> (West African): <b>Pentamidine</b> (also PCP); late stage: <b>Eflornithine</b> (ornithine decarboxylase).</p>
      <p><b><i>T. b. rhodesiense</i></b> (East African): early: <b>Suramin</b> (IV); late CNS: <b>Melarsoprol</b> (arsenical, slow IV, CNS toxic).</p>
      <p><b><i>T. cruzi</i></b> (Chagas): <b>Nifurtimox</b> (oral), <b>Benznidazole</b>.</p></div>
  </div>
</article>

<article class="card study wide" data-topic="lifecycle">
  <h3><span class="num bg-lav">12</span>Viral life cycle & the drugs that block it</h3>
  ${viralCycleSVG()}
  <p class="note">Suffix clues: <b>-gravir</b> means integrase, <b>-navir</b> means protease, <b>-ivir</b> means neuraminidase. Most commonly used NRTIs (<b>LETA</b>): lamivudine, emtricitabine, tenofovir, abacavir. Boosters (<b>RC</b>): ritonavir and cobicistat inhibit CYP3A.</p>
</article>

<article class="card study" data-topic="entry">
  <h3><span class="num bg-sky">13</span>Enfuvirtide vs maraviroc (<span class="mn">EM</span>)</h3>
  <div class="tbl-wrap"><table class="tbl">
    <tr><th></th><th>Enfuvirtide</th><th>Maraviroc</th></tr>
    <tr><td><b>Class</b></td><td>Fusion inhibitor (polypeptide)</td><td>Entry inhibitor (CCR5 antagonist)</td></tr>
    <tr><td><b>Target</b></td><td>Binds <b>gp41</b> and prevents the conformational change</td><td>Blocks the <b>CCR5 coreceptor</b> that works with gp41</td></tr>
    <tr><td><b>Route</b></td><td><b>Subcutaneous</b></td><td>Oral</td></tr>
    <tr><td><b>Key ADR</b></td><td>Injection-site reactions</td><td><b>Severe hepatotoxicity</b></td></tr>
  </table></div>
  <p class="note">Both act at step 1 (attachment and entry). <b>E</b>nfuvirtide works on fusion; <b>M</b>araviroc works on the receptor.</p>
</article>

<!-- ======================= ANTICANCER ======================= -->
<article class="card study wide" data-topic="caterms">
  <h3><span class="num bg-rose">14</span>Cancer terms</h3>
  <p><b>Cancer</b>: abnormal cell growth. Abnormal cells divide uncontrollably and infiltrate and destroy normal tissue.</p>
  <div class="two">
    <div class="box bg-rose"><h4>Tumor & growth <span class="mn">· NBMI</span></h4><ul><li><b>Neoplasm</b>: new abnormal growth, benign or malignant</li><li><b>Benign</b>: not cancerous, doesn't spread (may still progress)</li><li><b>Malignant</b>: invades and spreads to other organs</li><li><b>In situ</b>: still in its original place; non-invasive</li></ul></div>
    <div class="box bg-sky"><h4>Spread & location <span class="mn">· PMSI</span></h4><ul><li><b>Primary site</b>: where it began</li><li><b>Secondary site</b>: where it spread (breast cancer in the lungs)</li><li><b>Metastasis</b>: the process of spreading</li><li><b>Invasive</b>: spread from the original layer into nearby tissue</li></ul></div>
    <div class="box bg-lav"><h4>Cell & tissue types <span class="mn">· CSLL</span></h4><ul><li><b>Carcinoma</b>: skin and the linings of inner organs</li><li><b>Sarcoma</b>: bone, muscle, fat, cartilage</li><li><b>Leukemia</b>: blood-forming tissue (bone marrow)</li><li><b>Lymphoma</b>: lymph nodes</li></ul></div>
    <div class="box bg-butter"><h4>Treatment <span class="mn">· At This Point</span></h4><ul><li><b>Adjuvant</b>: after the main treatment, kills what's left</li><li><b>Targeted</b>: drugs aimed at specific molecules</li><li><b>Palliative</b>: quality of life; doesn't treat the cause</li></ul></div>
  </div>
  <div class="box bg-peach"><b>Log-kill (fractional kill) hypothesis:</b> each dose kills a constant <b>fraction (%)</b> of tumor cells, not a constant number (first-order kinetics).</div>
</article>

<article class="card study wide" data-topic="cycle">
  <h3><span class="num bg-butter">15</span>Cell cycle & where antineoplastics act</h3>
  <div class="two" style="align-items:center">
    ${cellCycleSVG()}
    <div style="display:grid;gap:10px">
      <div class="box bg-lav"><h4>Cell-cycle <b>nonspecific</b></h4><b>A</b>lkylating agents · <b>A</b>ntitumor antibiotics · <b>N</b>itrosoureas: act in any phase.</div>
      <div class="box bg-sage"><h4>Cell-cycle <b>specific</b> <span class="mn">· 1S · SA · 2EP · MTV</span></h4>G1: <b>S</b>teroids · S: <b>A</b>ntimetabolites · G2: <b>E</b>pothilones, <b>P</b>odophyllotoxins (and bleomycin) · M: <b>T</b>axanes, <b>V</b>inca alkaloids</div>
      <div class="box bg-peach"><h4>Mitotic poisons</h4><b>Vincas</b> (vincristine, vinblastine) block microtubule <b>formation</b> in metaphase. <b>Taxanes</b> (paclitaxel, docetaxel) <b>over-stabilize</b> microtubules.</div>
      <div class="box bg-sky"><h4>Topoisomerase drugs</h4><b>-poside</b> (etoposide) inhibits topo <b>II</b> (double strand). <b>-tecan</b> (topotecan, irinotecan) inhibits topo <b>I</b> (single strand).</div>
    </div>
  </div>
</article>

<article class="card study" data-topic="rescue">
  <h3><span class="num bg-sage">16</span>Rescue drugs / antidotes</h3>
  <div class="three">
    <div class="box bg-sage"><h4>MESNA</h4>for <b>cyclophosphamide, ifosfamide</b>. Their metabolite acrolein causes hemorrhagic cystitis.</div>
    <div class="box bg-butter"><h4>Leucovorin</h4>(folinic acid) for <b>antifolates</b>: methotrexate, pemetrexed, pralatrexate, which cause myelosuppression.</div>
    <div class="box bg-rose"><h4>Dexrazoxane</h4>for <b>anthracyclines</b>: doxorubicin, daunorubicin and the other "-rubicins" (cardiotoxicity, myelosuppression).</div>
  </div>
</article>

<article class="card study wide" data-topic="chemoman">
  <h3><span class="num bg-peach">17</span>Chemo-Man <span class="pill p-peach">3 pts</span></h3>
  ${chemoManSVG()}
  <p class="note">Read it head to toe: platins hit the ears (and kidneys), cytarabine the eyes, bleomycin and busulfan the lungs, the "-rubicins" the heart, methotrexate the mouth and liver, 5-FU the gut, the mustards the bladder, vincristine and taxanes the nerves, and vinblastine, 6-MP, 5-FU and MTX the bone marrow.</p>
</article>

<article class="card study wide" data-topic="defs statcid pens tpm pire codes lifecycle entry caterms cycle">
  <h3><span class="num bg-rose">18</span>Mnemonic flip board <span class="pill p-rose">tap to flip</span></h3>
  <div class="flips" id="flips"></div>
</article>

<article class="card study wide" data-topic="defs statcid resist pens vanco tpm linez folate fq pire codes lifecycle entry caterms cycle rescue chemoman">
  <h3><span class="num bg-butter">19</span>High-yield pearls</h3>
  <div class="pearls" id="pearls"></div>
</article>
`;

/* Three separate multiple-choice quizzes, one per part */
const MCQ_SETS = [
  {key:"ab", name:"Antibacterials",            group:AB, c:"lav"},
  {key:"av", name:"Antiprotozoals–Antivirals", group:AV, c:"sage"},
  {key:"ca", name:"AntiCA Drugs",              group:CA, c:"peach"}
];

return { id:"pcol2", TOPICS, MCQ, MCQ_SETS, FLIPS, PEARLS, studyHTML: STUDY_HTML };
})();
