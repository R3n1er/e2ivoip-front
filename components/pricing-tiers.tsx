import { CTAButton } from "@/components/ui/cta-button";

interface PricingTier {
  calls: number;
  description: string;
  features: string[];
}

interface PricingTiersProps {
  tiers: PricingTier[];
  quoteUrl: string;
  title?: string;
}

export function PricingTiers({
  tiers,
  quoteUrl,
  title = "Choisir la capacité d'appels",
}: PricingTiersProps) {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 max-w-3xl">
          <h2 className="text-3xl font-black tracking-[-0.04em] text-gray-dark md:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-gray-600">
            Un appel simultané correspond à une conversation en cours. Le bon palier dépend de vos pics d'activité, pas du nombre total de collaborateurs.
          </p>
        </div>

        <div className="grid border-y border-gray-200 md:grid-cols-2 xl:grid-cols-5">
          {tiers.map((tier) => (
            <article
              key={tier.calls}
              className="border-b border-gray-200 py-8 md:px-6 md:[&:nth-child(odd)]:border-r xl:border-b-0 xl:border-r xl:last:border-r-0 xl:[&:nth-child(odd)]:border-r"
            >
              <div className="font-mono text-4xl font-bold tabular-nums text-blue-marine">
                {tier.calls}
              </div>
              <h3 className="mt-1 font-semibold text-gray-dark">appels simultanés</h3>
              <p className="mt-3 min-h-10 text-sm leading-relaxed text-gray-600">
                {tier.description}
              </p>
              <ul className="mt-6 space-y-3 border-t border-gray-200 pt-5 text-sm text-gray-700">
                {tier.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-10">
          <CTAButton href={quoteUrl} icon="Calculator" external>
            Dimensionner mon projet
          </CTAButton>
        </div>
      </div>
    </section>
  );
}
