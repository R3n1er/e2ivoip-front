"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  BESOINS_NUMEROS,
  EN_TETE_FORMULAIRE,
  TEXTE_CONSENTEMENT_RGPD,
  type BesoinNumeros,
} from "@/lib/devis-3cx-free/formulaire";

type Statut = "repos" | "envoi" | "envoye" | "erreur";

/**
 * Demande de devis 3CX Free.
 *
 * La validation côté client sert le confort ; la route
 * /api/3cx-free/devis revalide tout. Anti-spam invisible : BotID
 * (instrumentation-client.ts), champ piège `website` et délai de saisie.
 */
export function Devis3cxFreeForm() {
  const [champs, setChamps] = useState({
    nom: "",
    prenom: "",
    societe: "",
    siret: "",
    telephoneFixe: "",
    telephoneMobile: "",
    email: "",
    nombreNumeros: "",
    message: "",
    website: "",
  });
  const [besoinNumeros, setBesoinNumeros] = useState<BesoinNumeros | "">("");
  const [consentementRgpd, setConsentementRgpd] = useState(false);
  const [formStartedAt] = useState(() => Date.now());
  const [statut, setStatut] = useState<Statut>("repos");
  const [erreur, setErreur] = useState("");

  const maj = (cle: keyof typeof champs) => (e: { target: { value: string } }) =>
    setChamps((c) => ({ ...c, [cle]: e.target.value }));

  async function envoyer(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErreur("");
    if (!besoinNumeros) {
      setErreur("Sélectionnez votre besoin en numéros de téléphone.");
      return;
    }
    if (!consentementRgpd) {
      setErreur("Pour envoyer votre demande, acceptez le traitement de vos données.");
      return;
    }
    setStatut("envoi");
    try {
      const res = await fetch("/api/3cx-free/devis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-E2I-Form": EN_TETE_FORMULAIRE,
        },
        body: JSON.stringify({
          ...champs,
          nombreNumeros: champs.nombreNumeros ? Number(champs.nombreNumeros) : null,
          besoinNumeros,
          consentementRgpd,
          formStartedAt,
          pageUrl: typeof window !== "undefined" ? window.location.href : "",
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setErreur(data.error ?? "Votre demande n’a pas pu être envoyée. Veuillez réessayer.");
        setStatut("erreur");
        return;
      }
      setStatut("envoye");
    } catch {
      setErreur("La connexion a été interrompue. Veuillez réessayer.");
      setStatut("erreur");
    }
  }

  if (statut === "envoye") {
    return (
      <div role="status" className="rounded-2xl border border-ui-border bg-white p-8 shadow-lg">
        <h2 className="mb-4 text-2xl font-bold text-gray-dark">Votre demande a bien été reçue</h2>
        <p className="text-ui-muted">
          Vous avez indiqué l&rsquo;adresse <strong>{champs.email}</strong> pour nos échanges.
          Un conseiller E2I VoIP vous contactera pour faire le point sur vos besoins en téléphonie et préparer votre devis.
        </p>
      </div>
    );
  }

  return (
    <form
      aria-label="Demande de devis 3CX Free"
      onSubmit={envoyer}
      className="rounded-2xl border border-ui-border bg-white p-6 shadow-lg sm:p-8"
    >
      <fieldset className="mb-8">
        <legend className="mb-4 text-lg font-bold text-gray-dark">Vos coordonnées</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <Champ id="devis-nom" libelle="Nom" requis>
            <Input id="devis-nom" value={champs.nom} onChange={maj("nom")} autoComplete="family-name" required />
          </Champ>
          <Champ id="devis-prenom" libelle="Prénom" requis>
            <Input id="devis-prenom" value={champs.prenom} onChange={maj("prenom")} autoComplete="given-name" required />
          </Champ>
          <Champ id="devis-societe" libelle="Société" requis>
            <Input id="devis-societe" value={champs.societe} onChange={maj("societe")} autoComplete="organization" required />
          </Champ>
          <Champ id="devis-siret" libelle="SIRET">
            <Input id="devis-siret" value={champs.siret} onChange={maj("siret")} inputMode="numeric" placeholder="Votre SIRET à 14 chiffres" />
          </Champ>
          <Champ id="devis-mobile" libelle="Téléphone mobile" requis>
            <Input id="devis-mobile" type="tel" value={champs.telephoneMobile} onChange={maj("telephoneMobile")} autoComplete="tel" required />
          </Champ>
          <Champ id="devis-fixe" libelle="Téléphone fixe">
            <Input id="devis-fixe" type="tel" value={champs.telephoneFixe} onChange={maj("telephoneFixe")} />
          </Champ>
          <div className="sm:col-span-2">
            <Champ id="devis-email" libelle="E-mail" requis>
              <Input id="devis-email" type="email" value={champs.email} onChange={maj("email")} autoComplete="email" required />
            </Champ>
          </div>
        </div>
      </fieldset>

      <fieldset className="mb-8">
        <legend className="mb-4 text-lg font-bold text-gray-dark">
          Vos besoins en numéros de téléphone <span className="text-red-primary">*</span>
        </legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {BESOINS_NUMEROS.map((b) => (
            <label key={b.valeur} className="flex items-center gap-3 rounded-lg border border-ui-border p-3 text-sm text-gray-dark">
              <input
                type="radio"
                name="besoinNumeros"
                value={b.valeur}
                checked={besoinNumeros === b.valeur}
                onChange={() => setBesoinNumeros(b.valeur)}
                className="accent-red-primary"
              />
              {b.libelle}
            </label>
          ))}
        </div>
        <div className="mt-4 max-w-xs">
          <Champ id="devis-nombre-numeros" libelle="Nombre de numéros">
            <Input id="devis-nombre-numeros" type="number" min={1} max={999} value={champs.nombreNumeros} onChange={maj("nombreNumeros")} />
          </Champ>
        </div>
      </fieldset>

      <div className="mb-6">
        <Champ id="devis-message" libelle="Message" requis>
          <Textarea id="devis-message" rows={5} value={champs.message} onChange={maj("message")} required />
        </Champ>
      </div>

      <div className="absolute left-[-10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="devis-website">Site web</label>
        <input id="devis-website" name="website" value={champs.website} onChange={maj("website")} tabIndex={-1} autoComplete="off" />
      </div>

      <label className="mb-6 flex items-start gap-3 text-sm text-gray-dark">
        <input
          type="checkbox"
          checked={consentementRgpd}
          onChange={(e) => setConsentementRgpd(e.target.checked)}
          required
          aria-label={TEXTE_CONSENTEMENT_RGPD}
          className="mt-1 accent-red-primary"
        />
        <span>
          {TEXTE_CONSENTEMENT_RGPD} <span className="text-red-primary">*</span>
        </span>
      </label>

      {erreur && (
        <p role="alert" className="mb-4 text-sm font-medium text-red-primary">
          {erreur}
        </p>
      )}

      <Button type="submit" disabled={statut === "envoi"} className="w-full sm:w-auto">
        {statut === "envoi" ? "Envoi en cours…" : "Envoyer ma demande"}
      </Button>
    </form>
  );
}

function Champ({ id, libelle, requis, children }: { id: string; libelle: string; requis?: boolean; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-sm font-medium text-gray-dark">
        {libelle}{" "}
        {requis ? <span className="text-red-primary">*</span> : <span className="text-gray-secondary">(facultatif)</span>}
      </label>
      {children}
    </div>
  );
}
