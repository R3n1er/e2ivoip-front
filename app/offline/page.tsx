'use client';

import { WifiOff, RefreshCw, Home, Phone, Mail } from "lucide-react";
import Link from "next/link";

export default function OfflinePage() {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-red-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        {/* Icône Offline */}
        <div className="mx-auto w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6">
          <WifiOff className="w-10 h-10 text-red-600" />
        </div>

        {/* Titre */}
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Vous êtes hors ligne
        </h1>

        {/* Description */}
        <p className="text-gray-600 mb-8">
          Il semble que vous n'ayez pas de connexion internet. Vérifiez votre
          connexion et réessayez.
        </p>

        {/* Bouton de rafraîchissement */}
        <button
          onClick={handleRefresh}
          className="w-full bg-gradient-to-r from-red-600 to-blue-700 text-white font-semibold py-3 px-6 rounded-lg hover:from-red-700 hover:to-blue-800 transition-all duration-200 flex items-center justify-center gap-2 mb-6"
        >
          <RefreshCw className="w-5 h-5" />
          Réessayer
        </button>

        {/* Actions alternatives */}
        <div className="space-y-3">
          <Link
            href="/"
            className="block w-full bg-gray-100 text-gray-700 font-medium py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5" />
            Retour à l'accueil
          </Link>

          <div className="flex gap-3">
            <a
              href="tel:+33123456789"
              className="flex-1 bg-green-100 text-green-700 font-medium py-3 px-4 rounded-lg hover:bg-green-200 transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" />
              Appeler
            </a>

            <a
              href="mailto:contact@e2ivoip.fr"
              className="flex-1 bg-blue-100 text-blue-700 font-medium py-3 px-4 rounded-lg hover:bg-blue-200 transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <Mail className="w-4 h-4" />
              Email
            </a>
          </div>
        </div>

        {/* Informations de contact */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-2">
            Besoin d'aide immédiatement ?
          </p>
          <div className="text-sm text-gray-600">
            <p>
              📞 <strong>01 23 45 67 89</strong>
            </p>
            <p>
              📧 <strong>contact@e2ivoip.fr</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
