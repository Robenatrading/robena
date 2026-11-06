/* =========================================================
   Imagini optimizate
   ---------------------------------------------------------
   Pozele din /public/images au și o variantă .webp, mult
   mai mică (de ~20–50 de ori). Pe pagini folosim varianta
   .webp; .png rămâne doar pentru Facebook/WhatsApp (og:image).
   Pozele din Supabase Storage rămân neschimbate.
   ========================================================= */

export function imagineRapida(src) {
  if (typeof src !== "string") return src;

  if (/^\/(images\/|pat-medical-robena-trading\.png)/.test(src) && /\.png$/i.test(src)) {
    return src.replace(/\.png$/i, ".webp");
  }

  return src;
}
