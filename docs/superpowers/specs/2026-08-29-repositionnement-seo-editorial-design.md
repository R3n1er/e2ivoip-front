# Repositionnement SEO & éditorial — lots A et B

Date : 2026-08-29
Source : Handoff « Audit SEO & branding e2i-voip.com » (score 58/100)
Statut : spec validée, prêt pour planification

## Objectif

Corriger les défauts SEO techniques qui dégradent l'indexation, et sortir le
discours d'entrée du site du registre « prix » pour l'installer sur
l'expertise DOM et la continuité de service.

Deux lots, livrés dans l'ordre, dans une seule PR à commits séparés.

## Périmètre

Inclus :

- Lot A — correctifs techniques SEO (canonical, title, footer, superlatif,
  `sameAs`, Twitter meta)
- Lot B — repositionnement éditorial de la home et de `/nos-services`

Exclus, à planifier ensuite (lot C) :

- Bloc de preuve TBF sur la home
- Page `/cas-client/groupe-tbf`
- Refonte des pages produit « Sur devis »
- GEO/AEO sur le blog

## Écarts constatés entre l'audit et le code

L'audit a été mené par `web_fetch` sur deux pages. Vérification faite contre
le code, trois écarts :

1. **Le canonical touche 9 pages, pas une.** `app/qui-sommes-nous`,
   `app/contact`, `app/assistance`, `app/nos-services`, `app/telephonie-3cx`,
   `app/telephonie-entreprise/pbx-yeastar`, `.../trunk-sip-compteur`,
   `.../trunk-sip-illimite`, `.../trunk-sip-agents-ia/layout.tsx`.

2. **Le JSON-LD est déjà correct.** `lib/structured-data.ts` déclare
   `["Organization", "LocalBusiness"]` avec `areaServed` couvrant Guadeloupe,
   Martinique, Guyane et La Réunion (ligne 147). Seul `sameAs` (LinkedIn)
   manque. L'audit ne pouvait pas le constater : `web_fetch` ne lit pas les
   balises `<script>`.

3. **Le title dupliqué apparaît deux fois** dans
   `app/qui-sommes-nous/page.tsx` — lignes 11 (metadata) et 17 (openGraph).
   Le suffixe marque contamine aussi l'aperçu social.

4. **Le « -20 % » structure 5 pages**, pas seulement la home. Sur
   `/nos-services` il porte la meta description, un bullet, un titre de carte,
   un paragraphe et le CTA final.

## Lot A — correctifs techniques

### A1. Canonical

**Cause.** Next.js App Router fusionne les métadonnées du layout racine avec
celles de chaque page. `app/layout.tsx:48-50` déclare `canonical: "/"`. Toute
page ne déclarant pas `alternates` hérite de ce canonical et signale à Google
qu'elle duplique la home.

**Correctif.** Retirer `alternates.canonical` de `app/layout.tsx`. Déclarer un
canonical explicite sur les 9 pages orphelines et sur `app/page.tsx`.

**Choix : supprimer le fallback plutôt que le corriger.** Tant qu'un canonical
par défaut existe à la racine, toute page créée ensuite héritera à nouveau du
défaut. Sans fallback, une page sans canonical n'en émet aucun — neutre pour
Google, là où un canonical faux est nuisible.

**Garde-fou.** Un test parcourt les fichiers de `app/` exportant des
métadonnées et vérifie que chacun déclare un canonical correspondant à sa
route. Le commentaire `app/layout.tsx:47` documentait déjà la bonne intention ;
rien ne la vérifiait.

### A2. Title dupliqué

`app/qui-sommes-nous/page.tsx` lignes 11 et 17 : retirer le suffixe
` | E2I VoIP` du title de page. Le `title.template` du layout racine le
rajoute. Corriger les deux occurrences.

### A3. Superlatif juridiquement exposé

`components/about-section-simple.tsx:116` : « Seul opérateur de services
télécom avec Trunk SIP dédiés » → « L'un des rares opérateurs à proposer des
Trunk SIP dédiés ».

Un superlatif absolu non prouvable relève de l'allégation trompeuse au sens de
l'article L121-2 du code de la consommation. Ce point est dans le lot A et non
B : c'est une correction de conformité, pas un choix éditorial.

### A4. Footer

`components/layout/footer.tsx:261` : `© 2025` → `new Date().getFullYear()`.

### A5. JSON-LD

Ajouter `sameAs` (LinkedIn) à `organizationSchema()`. Le reste est déjà
conforme — ne pas y toucher.

### A6. Twitter meta

Sur chaque page déclarant un bloc `twitter`, aligner `twitter:title` et
`twitter:description` sur le `title` et la `description` de la page. Une page
qui ne déclare pas de bloc `twitter` n'en reçoit pas : l'héritage racine est
correct dans ce cas, seule la divergence est un défaut.

### A7. Specs 3CX PRO — arbitrage requis

Contradiction relevée : « 4 appels simultanés minimum » (home) contre
« +50 postes » (`/qui-sommes-nous`). Donnée commerciale, non tranchable sans
Alban. À soulever en cours d'exécution.

## Lot B — repositionnement éditorial

### B1. Hero (`components/homepage-hero-section-simple.tsx`)

| Élément | Après |
|---|---|
| Badge | Opérateur de services télécom · Antilles, Guyane, La Réunion |
| H1 | Le réseau cuivre s'arrête en 2027. Votre téléphonie DOM est-elle prête ? |
| Sous-titre | Trunk SIP éligibles Antilles-Guyane et La Réunion, portabilité de vos numéros locaux, migration sans coupure. Nous accompagnons les entreprises des DOM depuis 15 ans. |
| CTA 1 | Parler à un expert DOM → `/contact` |
| CTA 2 | inchangé (Trunk SIP) |
| Stat 4 | 60+ — Postes migrés sur 3 territoires, lien vers l'ancre TBF de `/qui-sommes-nous` |

**Emphase visuelle.** Le `<span>` rouge portait « Économisez 20% ». Il porte
désormais « s'arrête en 2027 » : le point de tension visuel passe du chiffre
d'économie à l'échéance réglementaire.

**H1 : pourquoi cette formulation.** L'option A du handoff ne plaçait aucune
entité territoriale dans le H1, laissant le finding n°4 à moitié traité.
« DOM » y est intégré et « janvier » retiré — la date reste juste plus
longtemps sans perdre l'urgence.

**CTA : pourquoi `/contact` et non `/devis-en-ligne`.** Le handoff traitait le
CTA comme un problème de libellé. C'est un problème de parcours : annoncer un
diagnostic et livrer un formulaire de devis est une rupture de promesse, pire
que la situation actuelle. `/contact` tient la promesse sans page à créer.
« Devis en ligne » reste dans le menu.

**Stat TBF : option (a) retenue.** La stat renvoie vers la preuve existante
dans `/qui-sommes-nous:300`. Afficher « 60+ postes » sans preuve accessible
reproduirait le défaut du « -20 % » : un chiffre non substantié. Le bloc de
preuve sur la home est la suite immédiate (lot C).

### B2. `/nos-services`

Cinq occurrences du « -20 % » à retraiter : meta description (ligne 22),
bullet de bénéfice (48), titre de carte (134), paragraphe (215), CTA final
(385). Le CTA final passe en « Parler à un expert DOM ».

Angle de remplacement aligné sur la hero : l'argument porteur devient la
continuité de service (éligibilité Trunk SIP DOM, portabilité des numéros
locaux, migration sans coupure) au lieu de l'économie tarifaire. Le titre de
carte « 20% d'économies » cède sa place à un bénéfice de même nature —
couverture territoriale ou continuité — et non à une reformulation du prix.

### B3. `components/about-section-simple.tsx`

Stat « 20% » du bloc chiffres : même traitement que la hero.

### B4. Meta description de la home

Réécriture avec les entités territoriales (Guadeloupe, Martinique, Guyane,
La Réunion) et l'angle cuivre 2027.

### Pages non touchées

`/telephonie-entreprise/pbx-yeastar`, `.../trunk-sip-compteur`,
`/qui-sommes-nous` conservent « jusqu'à 20 % ». Cette formulation de plafond
est juridiquement plus solide que l'affirmatif et légitime en bas de tunnel,
une fois la valeur établie.

## Tests

**Lot A — assertions vraies ou fausses, TDD strict.**

- Canonical : chaque page exportant des métadonnées déclare un canonical
  correspondant à sa route. Échoue sur 9 pages au départ.
- Title : aucun title de page ne contient le suffixe marque que `template`
  rajoute.
- Footer : l'année affichée est l'année courante.

**Lot B — verrouillage des décisions éditoriales.**

- Absence de « Seul opérateur » dans les composants
- Absence de « Économisez 20 % » sur la home et `/nos-services`
- Présence de « DOM » dans le H1 de la home
- CTA principal de la hero pointant vers `/contact`

Ces tests ne jugent pas la qualité éditoriale ; ils protègent les arbitrages
de cette session contre une régression.

## Séquence

1. Lot A complet, avec ses tests
2. `npm run validate` — 6 contrôles
3. Lot B sur base saine
4. `npm run validate`

Le lot A ne dépend d'aucune décision restante et reste livrable seul si
l'exécution s'interrompt.

## Livraison

Branche dédiée depuis `dev` à jour (`42d24d3`), commits atomiques séparés
A / B, PR vers `dev`. Pas de merge par l'agent.

Note : la branche courante `fix/legal-registry-test-external-manifest`
(PR #42) n'est pas la base — partir de `dev`.

## Dette assumée

**Le H1 « cuivre 2027 » a une durée de vie limitée.** L'extinction du cuivre
est un levier réel mais daté : il porte environ 18 mois puis s'éteint. Ce H1
devra être repensé fin 2027. Ce n'est pas un défaut du choix, c'est une
échéance à inscrire au calendrier.
