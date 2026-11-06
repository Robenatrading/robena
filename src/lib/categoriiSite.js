/* =========================================================
   Lista categoriilor pentru meniu și pagina 404.
   Se citește o singură dată din Supabase, la construirea
   site-ului, deci o categorie nouă din admin apare singură
   în meniu după republicare.
   ========================================================= */
import { supabase } from "./supabase.js";

let promisiune;

export function categoriiSite() {
  promisiune ??= supabase
    .from("categorii")
    .select("id, nume, slug, ordine")
    .order("ordine", { ascending: true })
    .then(({ data, error }) => {
      if (error) {
        throw new Error(`Categoriile nu au putut fi încărcate: ${error.message}`);
      }
      return data ?? [];
    });

  return promisiune;
}
