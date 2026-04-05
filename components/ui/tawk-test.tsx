"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function TawkTest() {
  const [tawkStatus, setTawkStatus] = useState<
    "loading" | "active" | "inactive" | "error"
  >("loading");
  const [currentPage, setCurrentPage] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    setCurrentPage(pathname);

    // Vérifier si Tawk.to est chargé
    const checkTawkStatus = () => {
      if (window.Tawk_API) {
        setTawkStatus("active");
      } else {
        // Vérifier si on est sur une page exclue
        const excludedPages = ["/contact", "/devis-en-ligne"];
        const isExcluded = excludedPages.some((page) =>
          pathname.includes(page)
        );

        if (isExcluded) {
          setTawkStatus("inactive");
        } else {
          setTawkStatus("error");
        }
      }
    };

    // Attendre un peu pour que le script se charge
    const timer = setTimeout(checkTawkStatus, 2000);

    return () => clearTimeout(timer);
  }, [pathname]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500";
      case "inactive":
        return "bg-yellow-500";
      case "error":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Actif";
      case "inactive":
        return "Désactivé (page exclue)";
      case "error":
        return "Erreur de chargement";
      default:
        return "Chargement...";
    }
  };

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🤖 Test Intégration Tawk.to
            <Badge className={getStatusColor(tawkStatus)}>
              {getStatusText(tawkStatus)}
            </Badge>
          </CardTitle>
          <CardDescription>
            Vérification de l'intégration du chatbot Tawk.to
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2">📄 Page actuelle</h4>
              <p className="text-sm text-gray-600">{currentPage}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">🎯 Widget ID</h4>
              <p className="text-sm text-gray-600">
                688d3cc109ef001928d4773f/1j1jrald3
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2">📋 Pages exclues</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• /contact</li>
              <li>• /devis-en-ligne</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">🔧 Fonctionnalités</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>✅ Chargement automatique sur toutes les pages</li>
              <li>✅ Exclusion des pages contact et devis</li>
              <li>✅ Gestion dynamique du widget</li>
              <li>✅ Intégration avec HubSpot via n8n</li>
            </ul>
          </div>

          {tawkStatus === "active" && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-semibold text-green-800 mb-2">
                ✅ Tawk.to fonctionne correctement
              </h4>
              <p className="text-sm text-green-700">
                Le widget de chat est actif et prêt à recevoir les visiteurs.
              </p>
            </div>
          )}

          {tawkStatus === "inactive" && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-semibold text-yellow-800 mb-2">
                ⚠️ Widget désactivé
              </h4>
              <p className="text-sm text-yellow-700">
                Le widget est désactivé sur cette page (comportement normal).
              </p>
            </div>
          )}

          {tawkStatus === "error" && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h4 className="font-semibold text-red-800 mb-2">
                ❌ Erreur de chargement
              </h4>
              <p className="text-sm text-red-700">
                Le widget Tawk.to n'a pas pu être chargé. Vérifiez la
                configuration.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
