/* =========================================================
   Formatarea descrierilor de produs
   ---------------------------------------------------------
   Descrierile din Supabase sunt text simplu, cu:
   - rânduri goale între paragrafe
   - liste cu "*", "-", "–" sau "•" la început de rând
   - text îngroșat între **steluțe**
   Aici le transformăm în HTML curat (paragrafe + liste)
   și într-un text scurt pentru meta description.
   ========================================================= */

const MARCAJ_LISTA = /^\s*(?:[*•·▪]|-|–|—)\s*/;

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatareInline(text) {
  return escapeHtml(text).replace(
    /\*\*(.+?)\*\*/g,
    "<strong>$1</strong>"
  );
}

function esteRandDeLista(rand) {
  return MARCAJ_LISTA.test(rand) && rand.replace(MARCAJ_LISTA, "").length > 0;
}

/**
 * Elimină primul rând dacă repetă exact numele produsului
 * (unele descrieri încep cu titlul, care e deja în H1).
 */
function faraTitluRepetat(text, numeProdus) {
  if (!numeProdus) return text;

  const randuri = text.split("\n");
  const primul = (randuri[0] ?? "").trim().toLowerCase();

  if (primul && primul === numeProdus.trim().toLowerCase()) {
    return randuri.slice(1).join("\n");
  }

  return text;
}

/**
 * Transformă descrierea în HTML: paragrafe, titluri scurte
 * (ex. "Caracteristici:") și liste cu buline.
 */
export function descriereHtml(text, numeProdus = "") {
  const curat = faraTitluRepetat(
    String(text ?? "").replace(/\r\n?/g, "\n"),
    numeProdus
  ).trim();

  if (!curat) return "";

  const randuri = curat.split("\n").map((r) => r.trim());
  const html = [];
  let lista = [];
  let paragraf = [];

  const inchideLista = () => {
    if (lista.length) {
      html.push(
        `<ul>${lista.map((li) => `<li>${formatareInline(li)}</li>`).join("")}</ul>`
      );
      lista = [];
    }
  };

  const inchideParagraf = () => {
    if (paragraf.length) {
      const continut = paragraf.join(" ");

      // Rând scurt care se termină cu ":" → subtitlu
      if (
        paragraf.length === 1 &&
        continut.length <= 60 &&
        continut.endsWith(":")
      ) {
        html.push(`<h2>${formatareInline(continut.slice(0, -1))}</h2>`);
      } else {
        html.push(`<p>${formatareInline(continut)}</p>`);
      }

      paragraf = [];
    }
  };

  for (const rand of randuri) {
    if (!rand) {
      inchideParagraf();
      inchideLista();
      continue;
    }

    if (esteRandDeLista(rand)) {
      inchideParagraf();
      lista.push(rand.replace(MARCAJ_LISTA, ""));
    } else {
      inchideLista();
      paragraf.push(rand);
    }
  }

  inchideParagraf();
  inchideLista();

  return html.join("\n");
}

/**
 * Text simplu, fără marcaje, pe un singur rând.
 */
export function descriereText(text, numeProdus = "") {
  return faraTitluRepetat(String(text ?? "").replace(/\r\n?/g, "\n"), numeProdus)
    .split("\n")
    .map((r) => r.replace(MARCAJ_LISTA, "").trim())
    .filter(Boolean)
    .join(" ")
    .replace(/\*\*/g, "")
    .replace(/\s+/g, " ")
    .replace(/\s+([:;,.])/g, "$1")
    .trim();
}

/**
 * Text pentru meta description: maximum ~155 caractere,
 * tăiat la final de propoziție sau de cuvânt, nu în mijlocul lui.
 */
export function descriereScurta(text, numeProdus = "", max = 155) {
  const simplu = descriereText(text, numeProdus);

  if (simplu.length <= max) return simplu;

  const taiat = simplu.slice(0, max);
  const finalPropozitie = taiat.lastIndexOf(". ");

  if (finalPropozitie >= 90) {
    return taiat.slice(0, finalPropozitie + 1);
  }

  const finalCuvant = taiat.lastIndexOf(" ");

  return `${taiat.slice(0, finalCuvant).replace(/[,;:–-]\s*$/, "")}…`;
}
