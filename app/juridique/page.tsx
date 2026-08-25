import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { DownloadSimple, Shield, Scales } from "@/lib/icons";
import {
  LEGAL_PAGES,
  LEGAL_PDFS,
  legalHref,
} from "@/lib/legal/documents";
import { LegalBreadcrumb } from "@/components/legal/breadcrumb";

export const metadata: Metadata = {
  title: "Documents juridiques | E2I VoIP",
  description:
    "Tous les documents juridiques d'E2I VoIP au même endroit : CGV, conditions particulières VoIP et Trunk SIP, accord de sous-traitance RGPD, politique de confidentialité, mentions légales et exercice des droits.",
  keywords:
    "documents juridiques, CGV, DPA, RGPD, mentions légales, E2I VoIP",
  alternates: {
    canonical: "https://www.e2i-voip.com/juridique",
  },
  openGraph: {
    title: "Documents juridiques | E2I VoIP",
    description:
      "CGV, conditions particulières, accord de sous-traitance RGPD, politique de confidentialité et mentions légales d'E2I VoIP.",
    type: "website",
  },
};

export default function JuridiqueHubPage() {
  return (
    <>
      <LegalBreadcrumb />

      {/* Hero */}
      <section className="py-16 bg-gradient-to-r from-blue-900/85 via-blue-800/80 to-red-600/85 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-lg">
              Documents juridiques
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Tous les documents qui encadrent nos services et protègent vos
              données, réunis au même endroit.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-12">

            {/* Pages de l'espace juridique */}
            <Card className="shadow-lg">
              <CardContent className="p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256" className="text-red-600 mr-3" aria-hidden="true"><path d="M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160ZM200,216H56V40h88V88a8,8,0,0,0,8,8h48V216Zm-32-80a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,136Zm0,32a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,168Z"></path></svg>Pages</h2>
                <ul className="divide-y divide-gray-200">
                  {LEGAL_PAGES.map((doc) => (
                    <li key={doc.slug}>
                      <Link
                        href={legalHref(doc.slug)}
                        className="group flex items-start justify-between gap-4 py-4 hover:bg-red-50/50 transition-colors rounded-lg px-2 -mx-2"
                      >
                        <div>
                          <p className="font-medium text-gray-900 group-hover:text-red-primary transition-colors">
                            {doc.title}
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            {doc.description}
                          </p>
                        </div>
                        <span
                          aria-hidden="true"
                          className="text-red-primary opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-1"
                        >
                          →
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* PDFs contractuels téléchargeables */}
            <Card className="shadow-lg border-l-4 border-red-600">
              <CardContent className="p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-2 flex items-center">
                  <Scales size={24} className="text-red-600 mr-3" aria-hidden="true" />
                  Documents contractuels (PDF)
                </h2>
                <p className="text-sm text-gray-500 mb-6">
                  Versions officielles en vigueur au 30 août 2026.
                </p>
                <ul className="space-y-4">
                  {LEGAL_PDFS.map((doc) => (
                    <li
                      key={doc.slug}
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg border border-gray-200"
                    >
                      <div className="flex items-start space-x-3">
                        <Shield size={20} className="text-red-600 mt-1 flex-shrink-0" aria-hidden="true" />
                        <div>
                          <p className="font-medium text-gray-900">{doc.title}</p>
                          <p className="text-sm text-gray-500 mt-0.5">
                            {doc.version} · {doc.pages} pages
                            {doc.onlinePageSlug && (
                              <span className="ml-2">
                                <Link
                                  href={legalHref(doc.onlinePageSlug)}
                                  className="text-red-primary underline hover:text-red-700 transition-colors"
                                >
                                  Lire en ligne
                                </Link>
                              </span>
                            )}
                          </p>
                        </div>
                      </div>
                      <a
                        href={doc.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors duration-200 whitespace-nowrap"
                      >
                        <DownloadSimple size={16} className="mr-2" aria-hidden="true" />
                        Télécharger
                      </a>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Aide */}
            <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-600">
                <strong>Besoin d&rsquo;aide ?</strong> Pour toute question sur ces
                documents ou pour exercer vos droits sur vos données personnelles,
                consultez la page{" "}
                <Link
                  href="/juridique/exercer-mes-droits"
                  className="text-red-primary underline"
                >
                  Exercer mes droits
                </Link>{" "}
                ou{" "}
                <Link href="/contact" className="text-red-primary underline">
                  contactez-nous
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
