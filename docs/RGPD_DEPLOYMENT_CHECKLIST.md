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

```bash
# Test smoke : POST sans données → doit renvoyer 403 (intent manquant),
# pas 500 (env var manquante).
curl -i -X POST https://www.e2i-voip.com/api/rgpd/demande \
  -H "Content-Type: application/json" \
  -d '{}'
# Attendu : HTTP/2 403
# Si 500 : il manque RESEND_API_KEY ou RESEND_FROM_EMAIL
```

## Rollback

Si le déploiement casse en prod, le rollback est `vercel rollback` (CLI) ou via le dashboard Vercel → Deployments → Promote previous.

Le code de la PR n'altère pas le contrat du formulaire côté UI au-delà du wording (« Consultez votre boîte mail pour confirmer »). Un rollback est donc invisible côté visiteur tant qu'on reste sur l'ancien comportement.