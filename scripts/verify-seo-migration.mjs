#!/usr/bin/env node
/**
 * Vérifie qu'aucune URL de l'ancien site HubSpot ne se perd après la migration.
 *
 * Usage :
 *   node scripts/verify-seo-migration.mjs https://mon-preview.vercel.app
 *   node scripts/verify-seo-migration.mjs            # cible la prod par défaut
 *
 * À lancer sur la preview Vercel AVANT la bascule DNS, puis sur la production
 * juste APRÈS. Sortie en code 1 si au moins une URL est perdue, afin de pouvoir
 * brancher le script sur une CI.
 *
 * Référentiel : 29 URLs répondant en 200 sur www.e2i-voip.com (sitemap.xml +
 * crawl de la navigation, relevé du 2026-08-15).
 */

const BASE = (process.argv[2] || "https://www.e2i-voip.com").replace(/\/$/, "");

/**
 * Chaque entrée : [ancienne URL, destination attendue].
 * `null` signifie « doit répondre 200 directement, sans redirection ».
 */
const EXPECTATIONS = [
  // --- Pages conservées à l'identique --------------------------------------
  ["/", null],
  ["/blog", null],
  ["/contact", null],
  ["/mentions-legales", null],

  // --- Pages renommées : redirection 301 attendue ---------------------------
  ["/devis", "/devis-en-ligne"],
  ["/politique-confidentialites", "/politique-confidentialite"],
  ["/fr/presentation-e2i-voip", "/qui-sommes-nous"],
  ["/integration-3cx", "/telephonie-3cx"],
  ["/integration-pbx-voip", "/telephonie-entreprise/pbx-yeastar"],
  ["/passerelles-trunk-sip", "/telephonie-entreprise/trunk-sip-compteur"],
  ["/gigaset-fusion", "/telephonie-entreprise"],

  // --- Blog : tags et pagination -------------------------------------------
  ["/blog/tag/3cx", "/blog/categorie/3cx"],
  ["/blog/tag/pabx", "/blog/categorie/pabx"],
  ["/blog/tag/trunk-sip", "/blog/categorie/trunk-sip"],
  ["/blog/tag/voip", "/blog/categorie/voip"],
  ["/blog/page/2", "/blog"],

  // --- Articles : slugs HubSpot préservés, doivent répondre 200 -------------
  ["/blog/3-raisons-pour-lesquelles-votre-entreprise-devrait-passer-à-la-voip-et-abandonner-le-rnis", null],
  ["/blog/3cx-cfd-comment-automatiser-vos-flux-dappels-entrants", null],
  ["/blog/3cx-edition-ia-changements-v20-update-9", null],
  ["/blog/5-avantages-de-3cx-pour-son-standard-téléphonique-dentreprise", null],
  ["/blog/comment-3cx-a-fait-face-à-un-piratage-et-reste-une-solution-de-téléphonie-fiable", null],
  ["/blog/comparaison-3cx-vs-ringover", null],
  ["/blog/fin-du-réseau-cuivre-en-2030-anticipez-la-migration-de-votre-téléphonie-voip", null],
  ["/blog/la-signature-man-pour-une-téléphonie-dentreprise-fiable-et-conforme", null],
  ["/blog/profiter-de-la-fin-du-cuivre-pour-remplacer-son-pabx-en-entreprise", null],
  ["/blog/transcription-ia-appels-3cx-update-9", null],
  ["/blog/trunk-sip-dans-les-drom-le-guide-2025-pour-choisir-un-opérateur-voip-local", null],
  ["/blog/téléphonie-ip-dentreprise-pourquoi-opter-pour-3cx-en-2025", null],
  ["/blog/utiliser-son-smartphone-et-etre-disponible-meme-en-mobilité-avec-son-standard-téléphonique", null],
];

const GREEN = "\x1b[32m";
const RED = "\x1b[31m";
const YELLOW = "\x1b[33m";
const DIM = "\x1b[2m";
const RESET = "\x1b[0m";

/** Suit la chaîne de redirections et retourne le parcours complet. */
async function trace(path) {
  const hops = [];
  let url = BASE + encodeURI(path);

  for (let i = 0; i < 10; i++) {
    const response = await fetch(url, { redirect: "manual" });
    const status = response.status;

    if (status >= 300 && status < 400) {
      const location = response.headers.get("location");
      if (!location) return { status, hops, final: url };
      hops.push(status);
      url = new URL(location, url).toString();
      continue;
    }
    return { status, hops, final: url };
  }
  return { status: 0, hops, final: url, error: "Trop de redirections" };
}

async function main() {
  console.log(`\nVérification de la migration SEO sur ${BASE}\n`);

  const failures = [];
  const warnings = [];

  for (const [path, expected] of EXPECTATIONS) {
    let result;
    try {
      result = await trace(path);
    } catch (error) {
      failures.push({ path, reason: `Requête échouée : ${error.message}` });
      console.log(`${RED}✗${RESET} ${path}\n  ${DIM}${error.message}${RESET}`);
      continue;
    }

    const finalPath = decodeURIComponent(new URL(result.final).pathname);
    const expectedPath = expected ?? path;
    const arrivedWhereExpected = finalPath === expectedPath;

    if (result.status !== 200) {
      failures.push({
        path,
        reason: `statut ${result.status} (attendu 200 sur ${expectedPath})`,
      });
      console.log(
        `${RED}✗${RESET} ${path}\n  ${DIM}→ statut ${result.status}, arrivée sur ${finalPath}${RESET}`
      );
      continue;
    }

    if (!arrivedWhereExpected) {
      failures.push({
        path,
        reason: `arrive sur ${finalPath} au lieu de ${expectedPath}`,
      });
      console.log(
        `${RED}✗${RESET} ${path}\n  ${DIM}→ arrive sur ${finalPath}, attendu ${expectedPath}${RESET}`
      );
      continue;
    }

    // Une redirection de migration doit être permanente (301) : un 302 ne
    // transfère pas l'autorité SEO vers la nouvelle URL.
    const temporary = result.hops.filter((code) => code === 302 || code === 307);
    if (expected && temporary.length > 0) {
      warnings.push({
        path,
        reason: `redirection temporaire (${temporary.join(", ")}) au lieu de 301`,
      });
      console.log(
        `${YELLOW}!${RESET} ${path} → ${finalPath}\n  ${DIM}redirection ${temporary.join(", ")} : utiliser un 301${RESET}`
      );
      continue;
    }

    const chain = result.hops.length ? ` ${DIM}(${result.hops.join(" → ")})${RESET}` : "";
    console.log(`${GREEN}✓${RESET} ${path}${expected ? ` → ${finalPath}` : ""}${chain}`);
  }

  const total = EXPECTATIONS.length;
  const ok = total - failures.length - warnings.length;

  console.log(`\n${"─".repeat(60)}`);
  console.log(`${GREEN}${ok} OK${RESET}   ${YELLOW}${warnings.length} avertissement(s)${RESET}   ${RED}${failures.length} échec(s)${RESET}   sur ${total} URLs`);

  if (failures.length > 0) {
    console.log(`\n${RED}URLs perdues — ne pas basculer en production :${RESET}`);
    for (const { path, reason } of failures) {
      console.log(`  • ${path} — ${reason}`);
    }
    process.exit(1);
  }

  if (warnings.length > 0) {
    console.log(`\n${YELLOW}À corriger avant la bascule :${RESET}`);
    for (const { path, reason } of warnings) {
      console.log(`  • ${path} — ${reason}`);
    }
  }

  console.log(`\n${GREEN}Aucune URL perdue.${RESET}\n`);
}

main().catch((error) => {
  console.error(`${RED}Erreur inattendue :${RESET}`, error);
  process.exit(1);
});
