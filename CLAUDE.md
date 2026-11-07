# Proiect: robena.ro (ROBENA TRADING)

## Cum vrea Robert explicațiile
- Mereu în română, pas cu pas: „Pasul 1, Pasul 2…”, fiecare cu unde se dă click, ce buton, scurtături de tastatură și un „Ca să verifici” la final.
- Fișierele necesare se atașează/indică din nou de fiecare dată.
- Robert nu e programator: explicații simple, fără jargon.

## Cum e construit site-ul
- Astro 7 + Tailwind 4, găzduit pe GitHub Pages (repo Robenatrading/robena, ramura main).
- Datele (produse, categorii) în Supabase; pozele de produs noi în `public/images/produse/catalog/*.webp`, pozele de categorie în `public/images/categorii/*.webp`.
- Domeniul: ROTLD → Cloudflare (DNS + cache) → GitHub Pages.
- Formular contact: Supabase Edge Function `trimite-solicitare` + Resend.

## Automatizări (gata configurate)
- `.github/workflows/deploy.yml`: publică la push, zilnic (cron) și la `workflow_dispatch`; la final golește cache-ul Cloudflare (secretele CLOUDFLARE_ZONE_ID, CLOUDFLARE_API_TOKEN).
- Supabase: webhook-uri (trigger) pe tabelele `produse` și `categorii` → Edge Function `publica-site` → pornește workflow-ul (secrete GITHUB_TOKEN, WEBHOOK_SECRET). Orice salvare din admin republică site-ul în ~2–3 min.

## Ce s-a făcut (6–7 nov. 2026)
- SEO: descrieri formatate (`src/lib/descriere.js`), texte pe categorii (`src/lib/categoriiSeo.js`), H1 homepage, meta description < 160, 404, noindex pe admin, fără schema Product (nu avem prețuri – Robert nu vrea prețuri).
- Subsol simplu pe un rând (`src/components/Footer.astro`); date firmă în `src/lib/firma.js` (CUI/Reg. Com. lăsate goale intenționat).
- Viteză: poze WebP, `src/lib/imagini.js`; adminul micșorează și scoate fundalul automat la încărcare (`src/lib/comprimaImagine.js`).
- Admin categorii (`src/pages/admin-categorii.astro`); meniul și 404 citesc categoriile din baza de date (`src/lib/categoriiSite.js`).
- Categoriile apar în ordine alfabetică (localeCompare „ro”).
- Categoria „Alte produse” desființată; produsele mutate în Aparatură / Echipamente / Consumabile; redirecționări în `astro.config.mjs`.
- Catalog nou: 5 categorii (Sterilizare, Dezinfectanți, Echipamente de protecție, ATI și urgență, Instrumentar chirurgical) + 53 produse; texte originale, NU copiate de pe medical-expert.ro.
- Pozele: generate de Robert în Gemini, câte 4 produse pe imagine (grilă 2×2), tăiate în 4, decupate la obiect, fundal alb → transparent, WebP. Legate de produse prin SQL `update public.produse set imagine = '/images/produse/catalog/<slug>.webp' where slug = '<slug>';`.
- 7 nov. 2026: tranșa 1 de poze (6 categorii + 37 produse) publicată; „Alte produse” desființată efectiv (6 produse mutate, redirecționări adăugate).
- 7 nov. 2026: 50 de produse noi preluate de pe neomed.ro (Robert are acordul Neomed): pozele lor, decupate fără fundal (WebP, max 800 px), și descrieri SEO originale (nume generice, fără mărci/coduri). Ordine 154–203. Paturile albe pe fundal gri au fost „albite” (fundal → alb) în loc de decupate.
- Pentru texte mari în SQL Editor (Supabase): se încarcă fișierul .sql printr-un input de fișier injectat în pagină, nu prin tastare.

## Ce mai e de făcut
- Lipsesc pozele Gemini pentru: categoriile Aparatură medicală, Consumabile, Echipamente, Instrumentar chirurgical, Mobilier medical, Sterilizare (format orizontal 3:2) și grilele de produse vechi P02, P04, P06, P08, P10, P12, P14:
  - P02: scaun transport pacienți, scaun WC, aspirator chirurgical, defibrilator AED
  - P04: bureți curățenie, folie stretch, lavete, mănuși
  - P06: cărucior cu sertare, saltea antidecubit, birou în L, birou PAL
  - P08: masă instrumentar, măsuță Mayo, cărucior inox cu bol, paravan pliabil
  - P10: suport perfuzii, taburet medical, banchetă PVC, banchetă metalică
  - P12: aleză, bonetă TNT, câmpuri TNT, cearșaf bumbac
  - P14: husă pernă, halat polar, halat spital, halat TNT
- Slug-urile corespunzătoare sunt în tabelul `produse` (Supabase); grila e mereu: stânga sus, dreapta sus, stânga jos, dreapta jos.
- Opțional: câmp „Cod CPV” pe produse (util pentru SEAP).

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
