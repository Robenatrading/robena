/* =========================================================
   Pregătește automat pozele de produs înainte de încărcare.
   ---------------------------------------------------------
   1. Elimină fundalul deschis (alb / gri foarte deschis)
      care atinge marginile pozei → devine transparent,
      ca produsul să pară așezat direct pe pagina albă.
      Pozele cu fundal închis sau colorat (ex. o cameră)
      rămân neschimbate.
   2. Micșorează poza: latura mare maximum 1200 px.
   3. O salvează ca WebP (cu transparență), calitate 82%.
   Dacă browserul nu poate face conversia, se încarcă originalul.
   ========================================================= */

const TOLERANTA = 30; // cât de diferit poate fi un pixel de culoarea fundalului

function eliminaFundal(imageData) {
  const { data, width: w, height: h } = imageData;

  // 1. Culoarea fundalului = media pixelilor de pe margini
  let r = 0, g = 0, b = 0, n = 0;
  const margine = [];
  for (let x = 0; x < w; x++) margine.push(x, (h - 1) * w + x);
  for (let y = 0; y < h; y++) margine.push(y * w, y * w + w - 1);

  for (const i of margine) {
    const k = i * 4;
    if (data[k + 3] < 10) continue; // deja transparent
    r += data[k]; g += data[k + 1]; b += data[k + 2]; n++;
  }
  if (n === 0) return false; // marginile sunt deja transparente

  r /= n; g /= n; b /= n;

  // Fundalul trebuie să fie deschis (alb / gri deschis)
  if (Math.min(r, g, b) < 200) return false;

  // Marginile trebuie să fie aproape uniforme, ca la o poză de studio
  // (o fotografie cu cameră, pereți sau podea rămâne neschimbată)
  let apropiate = 0;
  for (const i of margine) {
    const k = i * 4;
    const d = Math.max(Math.abs(data[k] - r), Math.abs(data[k + 1] - g), Math.abs(data[k + 2] - b));
    if (d <= 10 || data[k + 3] < 10) apropiate++;
  }
  if (apropiate / margine.length < 0.9) return false;

  // 2. Umplere de la margini spre interior, doar prin pixeli asemănători fundalului
  const vizitat = new Uint8Array(w * h);
  const coada = new Int32Array(w * h);
  let cap = 0, coadaLen = 0;

  const distanta = (p) => {
    const k = p * 4;
    return Math.max(Math.abs(data[k] - r), Math.abs(data[k + 1] - g), Math.abs(data[k + 2] - b));
  };

  for (const p of margine) {
    if (!vizitat[p] && (distanta(p) <= TOLERANTA || data[p * 4 + 3] < 10)) {
      vizitat[p] = 1;
      coada[coadaLen++] = p;
    }
  }

  while (cap < coadaLen) {
    const p = coada[cap++];
    const x = p % w;
    const vecini = [x > 0 ? p - 1 : -1, x < w - 1 ? p + 1 : -1, p - w, p + w];
    for (const v of vecini) {
      if (v < 0 || v >= w * h || vizitat[v]) continue;
      if (distanta(v) <= TOLERANTA || data[v * 4 + 3] < 10) {
        vizitat[v] = 1;
        coada[coadaLen++] = v;
      }
    }
  }

  // 3. Fundalul devine transparent, cu margine fină (fără contur dur)
  for (let i = 0; i < coadaLen; i++) {
    const p = coada[i];
    const d = distanta(p);
    const alfa = Math.max(0, Math.min(1, (d - TOLERANTA * 0.4) / (TOLERANTA * 0.6)));
    data[p * 4 + 3] = Math.round(data[p * 4 + 3] * alfa);
  }

  return true;
}

export async function comprimaImagine(fisier, laturaMaxima = 1200, calitate = 0.82) {
  try {
    if (!fisier || !fisier.type?.startsWith("image/")) return fisier;

    const bitmap = await createImageBitmap(fisier);
    const scara = Math.min(1, laturaMaxima / Math.max(bitmap.width, bitmap.height));
    const latime = Math.round(bitmap.width * scara);
    const inaltime = Math.round(bitmap.height * scara);

    const canvas = document.createElement("canvas");
    canvas.width = latime;
    canvas.height = inaltime;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    ctx.drawImage(bitmap, 0, 0, latime, inaltime);
    bitmap.close?.();

    const imageData = ctx.getImageData(0, 0, latime, inaltime);
    if (eliminaFundal(imageData)) {
      ctx.putImageData(imageData, 0, 0);
    }

    const blob = await new Promise((resolve) =>
      canvas.toBlob(resolve, "image/webp", calitate)
    );

    if (!blob || blob.type !== "image/webp") {
      return fisier;
    }

    const numeNou = fisier.name.replace(/\.[^.]+$/, "") + ".webp";

    return new File([blob], numeNou, { type: "image/webp" });
  } catch (eroare) {
    console.warn("Imaginea nu a putut fi pregătită, se încarcă originalul:", eroare);
    return fisier;
  }
}
