# Workflow n8n — Tunnel de leads Trunk SIP (Tally 7RpEBa)

**Fichier** : `tally-tarifs-trunk-sip.workflow.json`
**Flux** : formulaire Tally `7RpEBa` → webhook n8n → email tarifs (Resend, PDF joint) + lead HubSpot.

```
Tally (submit) → Webhook n8n → Extraire les champs ─┬→ Resend : email + PDF tarifs
                                                    └→ HubSpot : créer/MAJ contact (lead)
```

## Installation (5 étapes)

### 1. Importer le workflow

Dans n8n : **Workflows → Import from File** → sélectionner
`tally-tarifs-trunk-sip.workflow.json`.

### 2. Créer la credential Resend

- Type : **Header Auth** (nom : `Resend API`)
- Name : `Authorization`
- Value : `Bearer re_xxxxxxxx` (clé API depuis [resend.com/api-keys](https://resend.com/api-keys))
- ⚠️ Le domaine `e2i-voip.com` doit être **vérifié dans Resend** (DNS SPF/DKIM)
  pour envoyer depuis `commerciaux@e2i-voip.com`.

### 3. Brancher HubSpot

Sur le nœud **HubSpot — Créer/MAJ le contact**, sélectionner la credential
HubSpot existante (ou en créer une avec le Private App token).
Scopes requis : `crm.objects.contacts.read` + `crm.objects.contacts.write`.

### 4. Renseigner l'URL du PDF tarifs

Dans le nœud **Resend — Email tarifs au prospect**, remplacer
`REMPLACER_PAR_URL_DU_PDF_TARIFS` par l'URL directe du PDF de la grille
tarifaire (lien non devinable, ex. stockage objet privé avec URL signée
longue durée). Resend télécharge le fichier et le joint à l'email.

> Mise à jour des tarifs = remplacer le PDF à cette URL. Aucune modification
> du workflow nécessaire.

### 5. Activer et brancher Tally

1. **Activer** le workflow (toggle en haut à droite) → copier l'**URL de
   production** du nœud Webhook (`https://<ton-n8n>/webhook/tally-tarifs-trunk-sip`).
2. Dans Tally, form `7RpEBa` : **Integrations → Webhooks → Connect** →
   coller l'URL.
3. Tester : soumettre le formulaire sur
   `/telephonie-entreprise/trunk-sip-compteur` et vérifier la réception
   de l'email + le contact dans HubSpot.

## Mapping des champs Tally

L'extraction se fait par libellé (insensible à la casse, correspondance partielle) :

| Libellé Tally attendu | Variable workflow | Usage |
|---|---|---|
| Nom et prénom | `nomComplet`, `prenom`, `nom` | Email + HubSpot |
| Email professionnel | `email` | Destinataire + clé HubSpot |
| Nom de l'entreprise | `entreprise` | Email + HubSpot company |
| Téléphone | `telephone` | HubSpot phone |

⚠️ Si les libellés des champs changent dans Tally, adapter le nœud
**Extraire les champs**.
