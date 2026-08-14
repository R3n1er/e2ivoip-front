import { Phone } from "@/lib/icons";

interface GeographicLocation {
  region: string;
  phone: string;
  tel: string;
}

interface GeographicAdvantageProps {
  locations: GeographicLocation[];
}

const TERRITORY_EXPERTISE = [
  "Centralisation des appels entre les DOM et la métropole",
  "Gestion des horaires par site",
  "Numéros locaux et portabilité selon éligibilité",
  "Configuration des agences et utilisateurs mobiles",
];

const SUPPORT = [
  "Supervision de l'instance 3CX",
  "Prise en main à distance selon le besoin",
  "Support par mail et téléphone",
  "Coordination avec notre réseau de partenaires",
];

export function GeographicAdvantage({ locations }: GeographicAdvantageProps) {
  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-black tracking-[-0.04em] text-gray-dark md:text-4xl">
            Une téléphonie pensée pour vos sites
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-gray-600">
            E2I VoIP accompagne les entreprises en Guadeloupe, Martinique, Guyane, à La Réunion et en France métropolitaine.
          </p>
        </div>

        <div className="mt-12 grid gap-12 border-y border-gray-200 py-10 lg:grid-cols-2">
          <div>
            <h3 className="text-xl font-semibold text-gray-dark">Déploiement multisite</h3>
            <ul className="mt-5 space-y-3 text-gray-700">
              {TERRITORY_EXPERTISE.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-dark">Exploitation et support</h3>
            <ul className="mt-5 space-y-3 text-gray-700">
              {SUPPORT.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
        </div>

        <div className="mt-12">
          <h3 className="text-xl font-semibold text-gray-dark">Contacts par territoire</h3>
          <div className="mt-5 grid border-t border-gray-200 sm:grid-cols-2 lg:grid-cols-5">
            {locations.map((location) => (
              <a
                key={location.region}
                href={`tel:${location.tel}`}
                suppressHydrationWarning
                className="group border-b border-gray-200 py-5 sm:px-4 lg:border-r lg:last:border-r-0"
              >
                <span className="block text-sm font-semibold text-gray-dark group-hover:text-red-primary">
                  {location.region}
                </span>
                <span className="mt-2 flex items-center font-mono text-sm tabular-nums text-red-primary">
                  <Phone size={16} className="mr-2" aria-hidden="true" />
                  {location.phone}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
