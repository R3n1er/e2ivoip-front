"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { MagnifyingGlass, Question, Funnel, UserCircle, Calendar, Tag } from '@/lib/icons';

interface BlogFilters {
  query: string;
  author: string;
  year: number | null;
  tags: string[];
  sortBy: "newest" | "oldest" | "relevance";
}

interface BlogSearchProps {
  onSearch: (filters: BlogFilters) => void;
  availableAuthors: string[];
  availableYears: number[];
  availableTags: string[];
  totalResults?: number;
  isLoading?: boolean;
}

export function BlogSearch({
  onSearch,
  availableAuthors,
  availableYears,
  availableTags,
  totalResults = 0,
  isLoading = false,
}: BlogSearchProps) {
  const [filters, setFilters] = useState<BlogFilters>({
    query: "",
    author: "",
    year: null,
    tags: [],
    sortBy: "newest",
  });
  const [showFilters, setShowFilters] = useState(false);

  // Supprimé pour éviter la boucle infinie
  // useEffect(() => {
  //   onSearch(filters);
  // }, [filters, onSearch]);

  const handleQueryChange = (query: string) =>
    setFilters((prev) => ({ ...prev, query }));
  const handleAuthorChange = (author: string) =>
    setFilters((prev) => ({ ...prev, author }));
  const handleYearChange = (year: number | null) =>
    setFilters((prev) => ({ ...prev, year }));
  const handleTagToggle = (tag: string) =>
    setFilters((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag],
    }));
  const handleSortChange = (sortBy: BlogFilters["sortBy"]) =>
    setFilters((prev) => ({ ...prev, sortBy }));
  const clearFilters = () =>
    setFilters({
      query: "",
      author: "",
      year: null,
      tags: [],
      sortBy: "newest",
    });
  const hasActiveFilters =
    filters.author || filters.year || filters.tags.length > 0;

  return (
    <div className="space-y-6">
      {/* Barre de recherche principale */}
      <div className="relative">
        <MagnifyingGlass size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" aria-hidden="true" />
        <Input
          type="text"
          placeholder="Rechercher dans les articles..."
          value={filters.query}
          onChange={(e) => handleQueryChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onSearch(filters);
            }
          }}
          className="pl-10 pr-4 py-3 text-lg border-gray-200 focus:border-red-primary focus:ring-red-primary"
          disabled={isLoading}
        />
        {isLoading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-red-primary"></div>
          </div>
        )}
      </div>

      {/* Statistiques et boutons de tri */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Statistiques */}
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Question size={16} aria-hidden="true" />
            <span>
              {totalResults} article{totalResults !== 1 ? "s" : ""}
            </span>
          </div>
          {filters.query && (
            <div className="flex items-center gap-1 text-red-primary">
              <MagnifyingGlass size={16} aria-hidden="true" />
              <span>"{filters.query}"</span>
            </div>
          )}
        </div>
        {/* Tri et filtres */}
        <div className="flex items-center gap-3">
          {/* Tri */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">
              Trier par :
            </span>
            <div className="flex gap-1">
              {[
                { key: "newest" as const, label: "Plus récent" },
                { key: "oldest" as const, label: "Plus ancien" },
                { key: "relevance" as const, label: "Pertinence" },
              ].map(({ key, label }) => (
                <Button
                  key={key}
                  variant={filters.sortBy === key ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleSortChange(key)}
                  className={cn(
                    "text-xs",
                    filters.sortBy === key &&
                      "bg-red-primary hover:bg-red-600 border-red-primary"
                  )}
                  disabled={isLoading}
                >
                  {label}
                </Button>
              ))}
            </div>
          </div>
          {/* Bouton filtres */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2"
            disabled={isLoading}
          >
            <Funnel size={16} aria-hidden="true" />
            Filtres
            {hasActiveFilters && (
              <Badge
                variant="destructive"
                className="ml-1 px-1.5 py-0.5 text-xs"
              >
                {
                  [filters.author, filters.year, ...filters.tags].filter(
                    Boolean
                  ).length
                }
              </Badge>
            )}
          </Button>
          {/* Bouton clear filtres */}
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-gray-500 hover:text-gray-700"
              disabled={isLoading}
            >
              Effacer
            </Button>
          )}
        </div>
      </div>
      {/* Panneau de filtres */}
      {showFilters && (
        <Card className="border-gray-200">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <Funnel size={20} className="text-red-primary" aria-hidden="true" />
              Filtres avancés
            </CardTitle>
            <CardDescription>
              Affinez votre recherche avec nos filtres
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Filtre par auteur */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <UserCircle size={16} aria-hidden="true" />
                Auteur
              </label>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={!filters.author ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleAuthorChange("")}
                  className={cn(
                    "text-xs",
                    !filters.author &&
                      "bg-red-primary hover:bg-red-600 border-red-primary"
                  )}
                  disabled={isLoading}
                >
                  Tous les auteurs
                </Button>
                {availableAuthors.map((author) => (
                  <Button
                    key={author}
                    variant={filters.author === author ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleAuthorChange(author)}
                    className={cn(
                      "text-xs",
                      filters.author === author &&
                        "bg-red-primary hover:bg-red-600 border-red-primary"
                    )}
                    disabled={isLoading}
                  >
                    {author}
                  </Button>
                ))}
              </div>
            </div>
            {/* Filtre par année */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Calendar size={16} aria-hidden="true" />
                Année de publication
              </label>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={!filters.year ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleYearChange(null)}
                  className={cn(
                    "text-xs",
                    !filters.year &&
                      "bg-red-primary hover:bg-red-600 border-red-primary"
                  )}
                  disabled={isLoading}
                >
                  Toutes les années
                </Button>
                {availableYears
                  .sort((a, b) => b - a)
                  .map((year) => (
                    <Button
                      key={year}
                      variant={filters.year === year ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleYearChange(year)}
                      className={cn(
                        "text-xs",
                        filters.year === year &&
                          "bg-red-primary hover:bg-red-600 border-red-primary"
                      )}
                      disabled={isLoading}
                    >
                      {year}
                    </Button>
                  ))}
              </div>
            </div>
            {/* Filtre par tags */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Tag size={16} aria-hidden="true" />
                Mots-clés
              </label>
              <div className="flex flex-wrap gap-2">
                {availableTags.map((tag) => (
                  <Button
                    key={tag}
                    variant={filters.tags.includes(tag) ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleTagToggle(tag)}
                    className={cn(
                      "text-xs",
                      filters.tags.includes(tag) &&
                        "bg-red-primary hover:bg-red-600 border-red-primary"
                    )}
                    disabled={isLoading}
                  >
                    {tag}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      {/* Affichage des filtres actifs */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-gray-600">Filtres actifs :</span>
          {filters.author && (
            <Badge variant="secondary" className="flex items-center gap-1">
              <UserCircle size={16} aria-hidden="true" />
              {filters.author}
              <button
                onClick={() => handleAuthorChange("")}
                className="ml-1 hover:text-red-600 transition-colors"
                disabled={isLoading}
              >
                ×
              </button>
            </Badge>
          )}
          {filters.year && (
            <Badge variant="secondary" className="flex items-center gap-1">
              <Calendar size={16} aria-hidden="true" />
              {filters.year}
              <button
                onClick={() => handleYearChange(null)}
                className="ml-1 hover:text-red-600 transition-colors"
                disabled={isLoading}
              >
                ×
              </button>
            </Badge>
          )}
          {filters.tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="flex items-center gap-1"
            >
              <Tag size={16} aria-hidden="true" />
              {tag}
              <button
                onClick={() => handleTagToggle(tag)}
                className="ml-1 hover:text-red-600 transition-colors"
                disabled={isLoading}
              >
                ×
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
