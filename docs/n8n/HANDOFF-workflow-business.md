# Handoff — Workflow n8n (Tally 7RpEBa) — ✅ EN PRODUCTION

> **Statut : ✅ opérationnel** (mis en production le 2026-06-12). Le tunnel de leads
> « tarifs Trunk SIP au compteur » tourne : credentials branchées, webhook relié à
> Tally, test de bout en bout validé.
>
> Ce document est **conservé comme référence** (architecture, mapping des champs,
> points de vigilance pour l'exploitation). La checklist d'installation ci-dessous
> est archivée — utile uniquement en cas de re-déploiement ou de migration n8n.

---

## Vue d'ensemble du flux

```
Prospect remplit le form Tally 7RpEBa
  (sur /telephonie-entreprise/trunk-sip-compteur)
        │
        ▼
Webhook n8n  ──→  Extraction des champs  ──┬──→  Resend : email + grille tarifaire PDF
                                           └──→  HubSpot : création/MAJ du contact (lead)
```

**Effet attendu** : le prospect reçoit la grille tarifaire par email en quelques
secondes, et le commercial retrouve le lead dans HubSpot.

---

## ⚠️ Décisions à trancher AVANT de commencer

### D1 — Domaine email : `e2ivoip.fr` ou `e2i-voip.com` ?

Le workflow actuel envoie depuis `commerciaux@e2i-voip.com` et son CTA pointe vers
`www.e2i-voip.com/contact`. **Or le site tourne sur `e2ivoip.fr`** (confirmé dans
`app/sitemap.ts`).

- **Si le domaine email officiel est `e2ivoip.fr`** → il faut corriger le workflow
  (3 occurrences : `from`, `reply_to`, lien CTA) **et** vérifier `e2ivoip.fr` dans Resend.
- **Si `e2i-voip.com` est un domaine pro distinct, volontaire** → ne rien changer,
  mais c'est ce domaine-là qu'il faut vérifier DNS dans Resend.

> 👉 **Tranche ce point en premier.** Tout le reste (vérification DNS Resend,
> cohérence des liens) en dépend. Dis-le-moi et je corrige le JSON en conséquence.

### D2 — Le PDF de la grille tarifaire existe-t-il ?

Le workflow joint un PDF récupéré depuis une URL (`REMPLACER_PAR_URL_DU_PDF_TARIFS`).
Il faut :
- un **PDF de grille tarifaire** finalisé,
- hébergé à une **URL stable et non devinable** (les tarifs sont confidentiels —
  cf. la raison d'être du tunnel de leads).

> Si le PDF n'existe pas encore, c'est un **bloquant produit** indépendant de n8n.

---

## Prérequis (à avoir sous la main avant de commencer)

- [ ] Accès à une instance **n8n** (cloud ou self-hosted) en état de marche
- [ ] Compte **Resend** + clé API (`re_...`)
- [ ] Accès **DNS** du domaine email (pour SPF/DKIM dans Resend)
- [ ] **Private App token HubSpot** avec scopes `crm.objects.contacts.read` +
      `crm.objects.contacts.write`
- [ ] Le **PDF tarifs** hébergé (cf. D2)
- [ ] Accès admin au form **Tally 7RpEBa**

---

## Checklist d'exécution (6 étapes)

### Étape 1 — Importer le workflow dans n8n
- [ ] n8n → **Workflows → Import from File**
- [ ] Sélectionner `docs/n8n/tally-tarifs-trunk-sip.workflow.json`
- [ ] Vérifier que les 4 nœuds apparaissent et sont connectés

### Étape 2 — Credential Resend
- [ ] Dans Resend : créer/récupérer une clé API (`resend.com/api-keys`)
- [ ] **Vérifier le domaine email** (D1) dans Resend → ajouter les
      enregistrements **SPF + DKIM** au DNS, attendre la validation (statut « verified »)
- [ ] Dans n8n : créer une credential **Header Auth** nommée `Resend API`
  - Name : `Authorization`
  - Value : `Bearer re_xxxxxxxx`
- [ ] L'associer au nœud **Resend — Email tarifs au prospect**

### Étape 3 — Credential HubSpot
- [ ] HubSpot → **Settings → Integrations → Private Apps** → créer/récupérer un token
- [ ] Scopes : `crm.objects.contacts.read` + `crm.objects.contacts.write`
- [ ] Dans n8n : créer une credential HubSpot nommée `HubSpot E2I` (token)
- [ ] L'associer au nœud **HubSpot — Créer/MAJ le contact**

### Étape 4 — URL du PDF tarifs
- [ ] Dans le nœud **Resend**, remplacer `REMPLACER_PAR_URL_DU_PDF_TARIFS`
      par l'URL directe du PDF (D2)
- [ ] Vérifier le nom de la pièce jointe :
      `E2I-VoIP-Grille-Tarifaire-Trunk-SIP.pdf`

> 💡 Mettre à jour les tarifs plus tard = remplacer le PDF à cette URL.
> Aucune modification du workflow nécessaire.

### Étape 5 — Activer et brancher Tally
- [ ] **Activer** le workflow (toggle en haut à droite de n8n)
- [ ] Copier l'**URL de production** du nœud Webhook
      (`https://<ton-n8n>/webhook/tally-tarifs-trunk-sip`)
- [ ] Tally, form `7RpEBa` → **Integrations → Webhooks → Connect** → coller l'URL

### Étape 6 — Test de bout en bout
- [ ] Soumettre le formulaire sur
      `https://e2ivoip.fr/telephonie-entreprise/trunk-sip-compteur`
- [ ] Vérifier la **réception de l'email** (avec le PDF joint) sur l'adresse saisie
- [ ] Vérifier la **création du contact** dans HubSpot (lifecycle = lead)
- [ ] Dans n8n → onglet **Executions** : confirmer que l'exécution est verte

---

## Mapping des champs Tally → workflow

L'extraction se fait par **libellé** (insensible casse, correspondance partielle).
Si tu renommes un champ dans Tally, adapte le nœud **Extraire les champs**.

| Libellé Tally attendu | Variable | Usage |
|---|---|---|
| Nom et prénom | `nomComplet` → `prenom` + `nom` | Email + HubSpot |
| Email professionnel | `email` | Destinataire + clé HubSpot |
| Nom de l'entreprise | `entreprise` | Email + HubSpot |
| Téléphone | `telephone` | HubSpot |

---

## Points de vigilance (à connaître)

- **Échecs silencieux** : le webhook répond à Tally *immédiatement* (`onReceived`),
  donc si Resend ou HubSpot échoue, le prospect ne voit rien d'anormal mais
  l'email/le lead ne part pas. → **Surveiller l'onglet Executions de n8n les
  premiers jours.**
- **Délivrabilité email** : sans domaine vérifié dans Resend (SPF/DKIM),
  les emails partiront en spam ou seront rejetés. C'est l'étape 2, non négociable.
- **RGPD** : le formulaire collecte des données pro (email, téléphone). S'assurer
  que la mention de consentement/finalité est présente sur le form Tally.

---

## Qui fait quoi

| Tâche | Côté Alban (interfaces) | Côté code (je peux faire) |
|---|---|---|
| Trancher D1 (domaine) | ✅ décision | ✅ corriger le JSON ensuite |
| Fournir/héberger le PDF (D2) | ✅ | — |
| Credentials Resend / HubSpot | ✅ | — |
| Vérification DNS du domaine | ✅ | — |
| Import + activation n8n | ✅ | — |
| Branchement Tally | ✅ | — |
| Correction du workflow (domaine, libellés) | — | ✅ |
| Doc / ajustement mapping | — | ✅ |

---

## Références
- Workflow importable : `docs/n8n/tally-tarifs-trunk-sip.workflow.json`
- Guide d'installation court : `docs/n8n/README.md`
- Page concernée : `app/telephonie-entreprise/trunk-sip-compteur/page.tsx`
- Composant form : `components/tally-embed-tarifs.tsx`
