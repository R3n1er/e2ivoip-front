# Checklist déploiement — anti-spam formulaire RGPD

Cette checklist est lue **avant** de fusionner la PR #85 vers `main` / `dev`. Elle vérifie que les variables d'environnement minimales existent sur Vercel pour que le double opt-in fonctionne.

## Variables obligatoires (sinon 500 silencieux)

| Variable | Utilisée par | Comportement si absente |
|---|---|---|
| `RESEND_API_KEY` | POST `/api/rgpd/demande`, GET `/api/rgpd/confirm` | **500** au premier POST — le visiteur voit « L'envoi de votre demande a échoué » |
| `RESEND_FROM_EMAIL` | Idem | **500** — idem |
| `RGPD_EMAIL_TO` | GET `/api/rgpd/confirm` uniquement | Le mail interne ne part jamais → le demandeur reçoit le mail de confirmation mais Alban/ADV ne voit jamais la demande |

Ces trois variables existent probablement déjà sur Vercel (le formulaire studio et le formulaire de contact marchent en prod). **Avant de merger**, vérifier dans **Vercel → Project Settings → Environment Variables** que ces trois variables sont présentes pour l'environnement **Production** (et Preview si tu veux tester avant).

## Variables natives Vercel (auto-injectées)

| Variable | Source | Nécessaire pour |
|---|---|---|
| `VERCEL_OIDC_TOKEN` | Auto-injectée par Vercel | BotID — sans elle, `checkBotId()` throw « VERCEL_OIDC_TOKEN is not set » (500). **Le projet Vercel doit avoir l'option OIDC activée.** |

Si OIDC n'est pas activé sur le projet Vercel, **chaque POST RGPD retournera 500**. Vérifier dans **Vercel → Project Settings → Security → OIDC Token** → activé.

## Variables optionnelles

| Variable | Effet |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | URL absolue du lien de confirmation dans le mail. Si non set, on déduit depuis l'origine de la requête. **Recommandé en prod** : `https://www.e2i-voip.com` |
| `TURNSTILE_SECRET_KEY` | Si set, exige un token Turnstile en plus de BotID. Cumul possible mais inutile — BotID suffit. |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Active le widget Turnstile côté client. Idem : cumul inutile avec BotID. |

## Comment vérifier en prod après merge

### Smoke test depuis un browser (le plus rapide)

1. Va sur https://www.e2i-voip.com/juridique/exercer-mes-droits?status=confirmed
2. Tu dois voir le bandeau vert « Votre demande est confirmée » en haut de la page
3. Si tu vois un 404, 500, ou rien : rouvre la PR, le code n'est pas déployé

### Smoke test depuis la ligne de commande

```bash
# Test 1 : page de statut confirmée
curl -s -o /dev/null -w "HTTP %{http_code}\n" \
  https://www.e2i-voip.com/juridique/exercer-mes-droits?status=confirmed
# Attendu : 200

# Test 2 : la page contient bien le bandeau
curl -s "https://www.e2i-voip.com/juridique/exercer-mes-droits?status=confirmed" \
  | grep -c "Votre demande est confirmée"
# Attendu : au moins 1

# Test 3 : POST sans données → doit renvoyer 403 (intent manquant),
# pas 500 (env var manquante).
curl -i -X POST https://www.e2i-voip.com/api/rgpd/demande \
  -H "Content-Type: application/json" \
  -H "x-e2i-form: rgpd-rights" \
  -d '{}'
# Attendu : HTTP/2 403 avec body {"error":"..."}
# Si 500 : il manque RESEND_API_KEY ou RESEND_FROM_EMAIL
```

### Test fonctionnel de bout en bout (10 min)

1. Va sur https://www.e2i-voip.com/juridique/exercer-mes-droits
2. Remplis le formulaire avec ton adresse email pro
3. Tu reçois un mail de confirmation dans les 30 secondes
4. Clique sur le lien dans le mail
5. Tu dois arriver sur la même page avec le bandeau vert « Votre demande est confirmée »
6. En parallèle, ta boîte ADV (RGPD_EMAIL_TO) reçoit le mail interne avec tous les détails

Si tu reçois le mail mais que le clic renvoie un bandeau rouge « Lien invalide » : la preview Vercel a redémarré entre les deux (perte du store de tokens en mémoire). C'est une limite documentée — le demandeur doit resoumettre.

## Rollback

Si le déploiement casse en prod, le rollback est `vercel rollback` (CLI) ou via le dashboard Vercel → Deployments → Promote previous.

Le code de la PR n'altère pas le contrat du formulaire côté UI au-delà du wording (« Consultez votre boîte mail pour confirmer »). Un rollback est donc invisible côté visiteur tant qu'on reste sur l'ancien comportement.

## Limite des previews Vercel

Les previews Vercel de ce repo sont protégées par **Vercel Deployment Protection** (SSO requis). Impossible de tester le flow en preview sans merge — `curl` renvoie 302 vers le SSO Vercel même pour les pages publiques.

C'est pour ça que le test fonctionnel de bout en bout (ci-dessus) ne peut se faire qu'après merge vers `main`.