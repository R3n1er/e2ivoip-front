"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getHubSpotAuthUrl } from "@/lib/hubspot-blog";
import {
  ExternalLink,
  CheckCircle,
  XCircle,
  RefreshCw,
  Lock,
  Unlock,
  Settings,
  TestTube,
} from "lucide-react";

interface ScopeTestResult {
  name: string;
  scopes: string[];
  success: boolean;
  error?: string;
}

interface ScopeTestRecommendation {
  name: string;
  recommendation: string;
  error?: string;
}

interface ScopeTestResults {
  tests: ScopeTestResult[];
  recommendations: ScopeTestRecommendation[];
}

export default function HubSpotAdminPage() {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [scopeTestResults, setScopeTestResults] =
    useState<ScopeTestResults | null>(null);
  const [isTestingScopes, setIsTestingScopes] = useState(false);

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

  const handleConnect = () => {
    setIsLoading(true);
    setError(null);

    try {
      const authUrl = getHubSpotAuthUrl();
      window.location.href = authUrl;
    } catch {
      setError("Erreur lors de la génération de l'URL d'autorisation");
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

  const handleTestScopes = async () => {
    setIsTestingScopes(true);
    setError(null);

    try {
      const response = await fetch("/api/hubspot/test-scopes");
      const data = await response.json();
      setScopeTestResults(data);
    } catch {
      setError("Erreur lors du test des scopes");
    } finally {
      setIsTestingScopes(false);
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
                <Settings className="w-5 h-5" />
                Statut de connexion
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {isConnected ? (
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  ) : (
                    <XCircle className="w-6 h-6 text-red-500" />
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
                <Lock className="w-5 h-5" />
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
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <Unlock className="w-4 h-4" />
                  )}
                  {isConnected ? "Reconnecter" : "Se connecter"}
                </Button>

                <Button
                  variant="outline"
                  onClick={handleTestConnection}
                  disabled={isLoading}
                  className="flex items-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Tester la connexion
                </Button>

                <Button
                  variant="outline"
                  onClick={handleTestScopes}
                  disabled={isTestingScopes}
                  className="flex items-center gap-2"
                >
                  {isTestingScopes ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <TestTube className="w-4 h-4" />
                  )}
                  Tester les scopes
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Résultats des tests de scopes */}
          {scopeTestResults && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TestTube className="w-5 h-5" />
                  Résultats des tests de scopes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {scopeTestResults.recommendations?.map(
                    (test: ScopeTestRecommendation, index: number) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{test.name}</h4>
                          <Badge
                            variant={
                              test.recommendation.includes("✅")
                                ? "default"
                                : "destructive"
                            }
                          >
                            {test.recommendation}
                          </Badge>
                        </div>
                        {test.error && (
                          <p className="text-sm text-red-600 mt-2">
                            Erreur: {test.error}
                          </p>
                        )}
                      </div>
                    )
                  )}
                </div>
              </CardContent>
            </Card>
          )}

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
                  <ExternalLink className="w-4 h-4 mr-2" />
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
                  <ExternalLink className="w-4 h-4 mr-2" />
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
                  <XCircle className="w-5 h-5" />
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
