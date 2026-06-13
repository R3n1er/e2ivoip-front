'use client';

import Link from "next/link";
import { SecureEmail } from "@/components/secure-email";
import { Question, ArrowsClockwise, House, Phone } from '@/lib/icons';

export default function OfflinePage() {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-red-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="mx-auto w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6">
          <Question size={24} className="text-red-600" aria-hidden="true" />
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Vous êtes hors ligne
        </h1>

        <p className="text-gray-600 mb-8">
          Il semble que vous n&apos;ayez pas de connexion internet. Vérifiez votre
          connexion et réessayez.
        </p>

        <button
          type="button"
          onClick={handleRefresh}
          className="w-full bg-gradient-to-r from-red-600 to-blue-700 text-white font-semibold py-3 px-6 rounded-lg hover:from-red-700 hover:to-blue-800 transition-all duration-200 flex items-center justify-center gap-2 mb-6"
        >
          <ArrowsClockwise size={24} aria-hidden="true" />
          Réessayer
        </button>

        <div className="space-y-3">
          <Link
            href="/"
            className="w-full bg-gray-100 text-gray-700 font-medium py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <House size={24} aria-hidden="true" />
            Retour à l&apos;accueil
          </Link>

          <div className="flex gap-3">
            <a
              href="tel:+33189560500"
              className="flex-1 bg-green-100 text-green-700 font-medium py-3 px-4 rounded-lg hover:bg-green-200 transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <Phone size={16} aria-hidden="true" />
              Appeler
            </a>

            <SecureEmail
              address="contact"
              mode="mailto"
              className="flex-1 bg-blue-100 text-blue-700 font-medium py-3 px-4 rounded-lg hover:bg-blue-200 transition-colors duration-200 flex items-center justify-center gap-2"
              label="Email"
            />
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-2">
            Besoin d&apos;aide immédiatement ?
          </p>
          <div className="text-sm text-gray-600">
            <p>
              📞{" "}
              <a href="tel:+33189560500" className="font-bold hover:underline">
                01 89 56 05 00
              </a>
            </p>
            <p>
              📧{" "}
              <SecureEmail
                address="contact"
                className="font-bold text-gray-600"
              />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
