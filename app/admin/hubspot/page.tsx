"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Gear, CheckCircle, XCircle, Lock, ArrowsClockwise, Link } from '@/lib/icons';

export default function HubSpotAdminPage() {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Vérifier si l'access token est disponible
    const checkConnection = async () => {
      try {
        // Tester la connexion en essayant de récupérer un article
        const response = await fetch("/api/hubspot/test-connection");
        const data = await response.json();
        setIsConnected(data.connected);
      } catch {
        setIsConnected(false);
      }
    };

    checkConnection();
  }, []);

  const handleConnect = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/hubspot/auth-url");
      const data = await response.json();

      if (!response.ok || !data.authUrl) {
        throw new Error(data.error || "URL d'autorisation indisponible");
      }

      window.location.href = data.authUrl;
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Erreur lors de la génération de l'URL d'autorisation"
      );
      setIsLoading(false);
    }
  };

  const handleTestConnection = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/hubspot/test-connection");
      const data = await response.json();

      if (data.connected) {
        setIsConnected(true);
      } else {
        setError(data.error || "Erreur de connexion");
        setIsConnected(false);
      }
    } catch {
      setError("Erreur lors du test de connexion");
      setIsConnected(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Administration HubSpot
          </h1>
          <p className="text-gray-600">
            Gérez l&apos;authentification OAuth et la synchronisation du blog
            HubSpot
          </p>
        </div>

        <div className="grid gap-6">
          {/* Statut de connexion */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gear size={24} aria-hidden="true" />
                Statut de connexion
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {isConnected ? (
                    <CheckCircle size={24} className="text-green-500" aria-hidden="true" />
                  ) : (
                    <XCircle size={24} className="text-red-500" aria-hidden="true" />
                  )}
                  <div>
                    <p className="font-medium">
                      {isConnected ? "Connecté" : "Non connecté"}
                    </p>
                    <p className="text-sm text-gray-500">
                      {isConnected
                        ? "L'application est authentifiée avec HubSpot"
                        : "Authentification requise pour accéder au blog"}
                    </p>
                  </div>
                </div>
                <Badge variant={isConnected ? "default" : "destructive"}>
                  {isConnected ? "Actif" : "Inactif"}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Configuration OAuth */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock size={24} aria-hidden="true" />
                Configuration OAuth
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Client ID
                  </label>
                  <div className="bg-gray-100 p-2 rounded text-sm font-mono">
                    {process.env.NEXT_PUBLIC_HUBSPOT_CLIENT_ID ||
                      "Non configuré"}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Redirect URI
                  </label>
                  <div className="bg-gray-100 p-2 rounded text-sm font-mono">
                    {process.env.NEXT_PUBLIC_HUBSPOT_REDIRECT_URI ||
                      "Non configuré"}
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={handleConnect}
                  disabled={isLoading}
                  className="flex items-center gap-2"
                >
                  {isLoading ? (
                    <ArrowsClockwise size={16} className="animate-spin" aria-hidden="true" />
                  ) : (
                    <Lock size={16} aria-hidden="true" />
                  )}
                  {isConnected ? "Reconnecter" : "Se connecter"}
                </Button>

                <Button
                  variant="outline"
                  onClick={handleTestConnection}
                  disabled={isLoading}
                  className="flex items-center gap-2"
                >
                  <ArrowsClockwise size={16} aria-hidden="true" />
                  Tester la connexion
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Scopes autorisés */}
          <Card>
            <CardHeader>
              <CardTitle>Permissions autorisées</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {[
                  "content",
                  "cms.blog.read",
                  "cms.blog_posts.read",
                  "cms.domains.read",
                  "cms.functions.read",
                  "cms.knowledge_base.articles.read",
                  "cms.knowledge_base.settings.read",
                  "cms.membership.access_groups.read",
                  "cms.performance.read",
                  "oauth",
                ].map((scope) => (
                  <Badge
                    key={scope}
                    variant="secondary"
                    className="justify-start"
                  >
                    {scope}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => window.open("/blog", "_blank")}
                >
                  <Link size={16} className="mr-2" aria-hidden="true" />
                  Voir le blog
                </Button>

                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() =>
                    window.open(
                      "https://developers.hubspot.com/docs/api/cms/blogs/blog-posts",
                      "_blank"
                    )
                  }
                >
                  <Link size={16} className="mr-2" aria-hidden="true" />
                  Documentation API HubSpot
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Messages d'erreur */}
          {error && (
            <Card className="border-red-200 bg-red-50">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 text-red-700">
                  <XCircle size={24} aria-hidden="true" />
                  <p className="font-medium">Erreur : {error}</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
