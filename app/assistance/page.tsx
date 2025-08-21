import { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import WorkingFAQ from "@/components/faq-working";
import {
  Phone,
  Mail,
  MessageCircle,
  Clock,
  Users,
  FileText,
  Video,
  Download,
  ExternalLink,
  MapPin,
  Globe,
} from "lucide-react";
import Link from "next/link";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Assistance & Support - E2I VoIP | Support technique 24/7 DOM-TOM",
  description:
    "Support technique E2I VoIP 24/7. Assistance locale DOM-TOM, hotline 0189 560 500, chat en ligne. Guides, tutoriels 3CX, dépannage téléphonie IP.",
  keywords:
    "assistance E2I VoIP, support technique DOM-TOM, hotline téléphonie IP, dépannage 3CX, support local Martinique Guadeloupe Guyane, chat assistance",
  openGraph: {
    title: "Assistance & Support - E2I VoIP | Support technique 24/7",
    description:
      "Support technique E2I VoIP 24/7. Équipes locales DOM-TOM, chat en ligne, guides et tutoriels.",
    type: "website",
  },
};

export default function AssistancePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-red-primary to-blue-marine overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-red-primary/90 to-blue-marine/90 z-10"></div>
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
              Assistance & <span className="text-white">Support VoIP</span>
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Support technique 3CX et Yeastar • Équipes locales France et
              Outre-mer (Antilles-Guyane, Réunion) • Réponse rapide
            </p>
            <p className="text-lg text-white/80 max-w-2xl mx-auto mt-4">
              Notre équipe d'experts est là pour vous accompagner dans
              l'utilisation de vos solutions téléphoniques
            </p>
          </div>
        </div>
      </section>

      {/* Hotline Support */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            Hotline <span className="text-red-primary">Support</span>
          </h2>
          <Card className="border-red-primary border-2 hover:shadow-xl transition-shadow">
            <CardContent className="p-12">
              <div className="w-20 h-20 bg-red-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <Phone className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Assistance téléphonique directe
              </h3>
              <p className="text-3xl font-bold text-red-primary mb-4">
                0189 560 500
              </p>
              <p className="text-lg text-gray-600 mb-4">
                Lundi - Vendredi : 8h - 18h
              </p>
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-red-100 text-red-800 font-medium">
                Support prioritaire selon contrat client
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Chat Tawk.to intégré */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Chat{" "}
              <span className="text-red-primary">assistance instantanée</span>
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Discutez directement avec nos experts techniques en temps réel
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-6">
              <MessageCircle className="w-12 h-12 text-blue-marine mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Support chat en direct
              </h3>
              <p className="text-gray-600">
                Notre équipe est disponible pour répondre à toutes vos questions
              </p>
            </div>

            {/* Chat Tawk.to intégré */}
            <iframe
              src="https://tawk.to/chat/688d3cc109ef001928d4773f/1j34pnbg2"
              className="w-full h-[600px] border border-gray-200 rounded-lg"
              title="Chat support E2I VoIP"
              allow="microphone; camera"
            />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <WorkingFAQ />
        </div>
      </section>
    </>
  );
}
