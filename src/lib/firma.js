/* =========================================================
   Datele firmei — folosite în subsol și în datele
   structurate pentru Google (schema.org).
   ---------------------------------------------------------
   COMPLETEAZĂ câmpurile goale ("") cu datele reale.
   Câmpurile goale nu apar pe site.
   ========================================================= */

export const firma = {
  nume: "ROBENA TRADING",
  // Denumirea completă din Registrul Comerțului, ex. "ROBENA TRADING SRL"
  denumireLegala: "",
  cui: "", // ex. "RO12345678"
  regCom: "", // ex. "J33/123/2020"

  telefon: "+40740413699",
  telefonAfisat: "0740 413 699",
  email: "robena.trading@yahoo.com",

  adresa: {
    strada: "", // ex. "Str. Exemplu nr. 1"
    localitate: "", // ex. "Suceava"
    judet: "", // ex. "Suceava"
    codPostal: "",
  },
};

/** Datele firmei în format schema.org (Organization). */
export function organizationSchema(siteUrl, descriere) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: firma.nume,
    url: siteUrl,
    logo: {
      "@type": "ImageObject",
      url: `${siteUrl}/images/logo-robena.png`,
    },
    description: descriere,
    email: firma.email,
    telephone: firma.telefon,
    areaServed: { "@type": "Country", name: "România" },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: firma.telefon,
      email: firma.email,
      contactType: "sales",
      areaServed: "RO",
      availableLanguage: ["Romanian"],
    },
  };

  if (firma.denumireLegala) schema.legalName = firma.denumireLegala;
  if (firma.cui) schema.vatID = firma.cui;

  if (firma.adresa.strada) {
    schema.address = {
      "@type": "PostalAddress",
      streetAddress: firma.adresa.strada,
      addressLocality: firma.adresa.localitate,
      addressRegion: firma.adresa.judet,
      postalCode: firma.adresa.codPostal || undefined,
      addressCountry: "RO",
    };
  }

  return schema;
}
