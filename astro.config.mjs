// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://robena.ro",

  // Categoria „Alte produse” a fost desființată (7 nov. 2026):
  // adresele vechi duc la noile pagini, ca să nu apară erori 404.
  redirects: {
    "/produse/alte-produse": "/produse/echipamente/",
    "/produse/alte-produse/cantar-taliometru-robena-trading":
      "/produse/aparatura/cantar-taliometru-robena-trading/",
    "/produse/alte-produse/carucior-transport-robena-trading":
      "/produse/echipamente/carucior-transport-robena-trading/",
    "/produse/alte-produse/scaun-transport-pacienti-fotoliu-rulant-robena-trading":
      "/produse/echipamente/scaun-transport-pacienti-fotoliu-rulant-robena-trading/",
    "/produse/alte-produse/scara-aluminiu-robena-trading":
      "/produse/echipamente/scara-aluminiu-robena-trading/",
    "/produse/alte-produse/scaun-wc-robena-trading":
      "/produse/echipamente/scaun-wc-robena-trading/",
    "/produse/alte-produse/sac-transport-cadavre-robena-trading":
      "/produse/consumabile/sac-transport-cadavre-robena-trading/",
  },

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    sitemap({
      filter: (page) =>
        !page.includes("/admin") &&
        !page.includes("/test-supabase") &&
        !page.endsWith("/produs/")
    }),
  ],
});