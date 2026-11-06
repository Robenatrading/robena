/* =========================================================
   Texte SEO pentru paginile de categorie
   ---------------------------------------------------------
   Cheia este slug-ul categoriei din Supabase.
   - descriere: meta description (max. ~155 caractere)
   - intro: textul afișat sub titlul categoriei
   Pentru o categorie nouă, fără intrare aici, se folosește
   automat un text general.
   ========================================================= */

export const categoriiSeo = {
  "mobilier-medical": {
    descriere:
      "Mobilier medical pentru spitale, clinici și cabinete: paturi de examinare, canapele de consultație, mese de instrumentar, paravane, dulapuri și taburete.",
    intro:
      "Mobilier medical pentru spitale, clinici, cabinete medicale, laboratoare și centre de recuperare: paturi și canapele de examinare, mese de consultație, mese și cărucioare pentru instrumentar din inox, măsuțe Mayo, paravane, dulapuri medicale, scaune pentru recoltare și taburete reglabile. Dimensiunile, materialele și culorile pot fi adaptate cerințelor din caietul de sarcini.",
  },
  "mobilier-metalic": {
    descriere:
      "Mobilier metalic pentru instituții și companii: dulapuri, fișete, clasificatoare, vestiare, rafturi metalice și banchete pentru sala de așteptare.",
    intro:
      "Mobilier metalic robust pentru arhive, birouri, vestiare, depozite și săli de așteptare: dulapuri și fișete metalice cu închidere, clasificatoare pentru dosare A4, vestiare, rafturi metalice, banchete cu 1–5 locuri și scaune pentru vizitatori. Potrivit pentru instituții publice, unități sanitare, școli și companii.",
  },
  "mobilier-de-birou": {
    descriere:
      "Mobilier de birou pentru instituții publice și companii: birouri din PAL melaminat, dulapuri și scaune ergonomice, în diverse dimensiuni și culori.",
    intro:
      "Mobilier de birou pentru instituții publice, școli, unități sanitare și companii: birouri din PAL melaminat, dulapuri pentru documente și scaune de birou ergonomice. Produsele pot fi livrate în diferite dimensiuni, culori și configurații, în funcție de spațiu și de cerințele beneficiarului.",
  },
  aparatura: {
    descriere:
      "Aparatură medicală: defibrilatoare AED, monitoare de funcții vitale, aspiratoare chirurgicale, concentratoare de oxigen, tensiometre și pulsoximetre.",
    intro:
      "Aparatură medicală pentru spitale, clinici, cabinete și servicii de urgență: defibrilatoare externe automate (AED), monitoare pentru funcții vitale, aspiratoare chirurgicale, concentratoare de oxigen, nebulizatoare, tensiometre și pulsoximetre profesionale.",
  },
  echipamente: {
    descriere:
      "Echipamente pentru unități sanitare: cărucioare medicale multifuncționale, cărucioare platformă din inox și saltele antidecubit cu compresor.",
    intro:
      "Echipamente pentru spitale, centre de îngrijire și unități sanitare: cărucioare medicale multifuncționale cu sertare, cărucioare de transfer și cărucioare platformă pliabile din inox, saltele antidecubit tubulare cu compresor.",
  },
  textile: {
    descriere:
      "Textile medicale și de spital: lenjerie din bumbac și TNT, halate, costume medicale, huse impermeabile, aleze, pături, perne și saboți medicali.",
    intro:
      "Textile pentru spitale, clinici, cămine și centre de îngrijire: cearceafuri, fețe de pernă, perne, pilote și pături, lenjerie, halate, pijamale, combinezoane și bonete de unică folosință din TNT, câmpuri medicale sterile și nesterile, costume medicale, huse impermeabile pentru saltea și pernă, aleze reutilizabile și saboți medicali.",
  },
  consumabile: {
    descriere:
      "Consumabile medicale și de curățenie: seringi sterile, mănuși de unică folosință, saci menajeri, lavete, bureți și folie stretch pentru ambalare.",
    intro:
      "Consumabile pentru unități sanitare, instituții și companii: seringi sterile de unică folosință, mănuși de unică folosință, saci menajeri, lavete și bureți pentru curățenie, folie stretch pentru ambalare.",
  },
  "alte-produse": {
    descriere:
      "Produse pentru spitale și instituții: cântare medicale cu taliometru, scaune de transport pacienți, scaune WC, cărucioare platformă, scări din aluminiu.",
    intro:
      "Alte produse utile pentru spitale, centre de îngrijire și instituții: cântare medicale cu taliometru, scaune pliabile pentru transportul pacienților, scaune WC de cameră, cărucioare platformă, scări din aluminiu și saci pentru transport.",
  },
};

export function seoCategorie(categorie) {
  const text = categoriiSeo[categorie.slug];
  const numeMic = categorie.nume.toLowerCase();

  return {
    descriere:
      text?.descriere ??
      `${categorie.nume} pentru spitale, clinici, instituții publice, școli și companii din România. Solicitați ofertă de la ROBENA TRADING.`,
    intro:
      text?.intro ??
      `Descoperă produsele din categoria ${numeMic}, disponibile în diferite variante și configurații, adaptate cerințelor beneficiarilor.`,
  };
}
