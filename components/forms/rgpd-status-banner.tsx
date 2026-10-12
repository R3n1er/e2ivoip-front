import Link from "next/link";

/**
 * Bandeau affiché en haut de la page /juridique/exercer-mes-droits quand
 * le visiteur revient d'un clic sur le lien de confirmation (GET
 * /api/rgpd/confirm redirige vers la même page avec un query param).
 *
 * Quatre statuts possibles :
 *  - `confirmed` : succès, message de récapitulatif
 *  - `already` : second clic sur le même lien, déjà traité
 *  - `expired` : lien expiré (>24h)
 *  - `invalid` : lien corrompu ou inconnu
 *
 * Le composant est volontairement minimal : un seul rôle ARIA par statut,
 * pas d'animation, pour rester lisible sans JavaScript.
 */

type Status = "confirmed" | "expired" | "invalid" | "already" | null;

interface StatusConfig {
  title: string;
  description: React.ReactNode;
  containerClass: string;
  titleClass: string;
  role: "status" | "alert";
}

const STATUS_CONFIG: Record<NonNullable<Status>, StatusConfig> = {
  confirmed: {
    title: "Votre demande est confirmée",
    description:
      "Notre équipe vous répondra dans un délai d'un mois à compter de cette confirmation. Un accusé de réception vient de vous être envoyé par mail.",
    containerClass: "border-blue-marine-100 bg-blue-marine-50",
    titleClass: "text-blue-marine",
    role: "status",
  },
  already: {
    title: "Cette demande a déjà été traitée",
    description:
      "Le lien de confirmation a déjà été utilisé. Si vous n'avez pas reçu de réponse dans un délai d'un mois, contactez-nous à l'adresse figurant dans nos mentions légales.",
    containerClass: "border-blue-marine-100 bg-blue-marine-50",
    titleClass: "text-blue-marine",
    role: "status",
  },
  expired: {
    title: "Le lien de confirmation a expiré",
    description:
      "Les liens de confirmation sont valables 24 heures. Pour renouveler votre demande, utilisez le formulaire ci-dessous.",
    containerClass: "border-red-primary-100 bg-red-primary-50",
    titleClass: "text-red-primary",
    role: "alert",
  },
  invalid: {
    title: "Lien de confirmation invalide",
    description:
      "Ce lien est corrompu ou n'est pas reconnu. Pour exercer vos droits, utilisez le formulaire ci-dessous.",
    containerClass: "border-red-primary-100 bg-red-primary-50",
    titleClass: "text-red-primary",
    role: "alert",
  },
};

export function RgpdStatusBanner({ status }: { status: Status }) {
  if (!status) return null;

  const config = STATUS_CONFIG[status];

  return (
    <div
      role={config.role}
      aria-live={config.role === "alert" ? "assertive" : "polite"}
      className={`mb-12 rounded-lg border p-6 ${config.containerClass}`}
      data-testid={`rgpd-status-banner-${status}`}
    >
      <h2 className={`mb-2 text-xl font-bold ${config.titleClass}`}>
        {config.title}
      </h2>
      <p className="text-sm leading-relaxed text-gray-dark">
        {config.description}{" "}
        <Link
          href="/contact"
          className="font-medium underline hover:no-underline"
        >
          Nous contacter
        </Link>
        .
      </p>
    </div>
  );
}