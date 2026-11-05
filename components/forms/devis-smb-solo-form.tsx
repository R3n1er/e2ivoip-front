"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  BESOINS_NUMEROS,
  EN_TETE_FORMULAIRE,
  FORMULES,
  LONGUEUR_MAX_MESSAGE,
  TEXTE_CONSENTEMENT_RGPD,
  type BesoinNumeros,
  type FormuleChoisie,
} from "@/lib/3cx-smb-solo/formulaire";

type Statut = "repos" | "envoi" | "envoye" | "erreur";

/**
 * Demande de devis 3CX SMB SOLO.
 *
 * La validation côté client sert le confort ; la route
 * /api/3cx-smb-solo/devis revalide tout. Anti-spam invisible : BotID
 * (instrumentation-client.ts), champ piège `website` et délai de saisie.
 */
export function DevisSmbSoloForm() {
  const [champs, setChamps] = useState({
    nom: "",
    prenom: "",
    societe: "",
    siret: "",
    telephoneFixe: "",
    telephoneMobile: "",
    email: "",
    message: "",
    website: "",
  });
  const [formule, setFormule] = useState<FormuleChoisie | "">("");
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
      setErreur("Sélectionnez ce que vous souhaitez faire de votre numéro.");
      return;
    }
    if (!formule) {
      setErreur("Sélectionnez la formule qui vous intéresse.");
      return;
    }
    if (!consentementRgpd) {
      setErreur("Pour envoyer votre demande, acceptez le traitement de vos données.");
      return;
    }
    setStatut("envoi");
    try {
      const res = await fetch("/api/3cx-smb-solo/devis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-E2I-Form": EN_TETE_FORMULAIRE,
        },
        body: JSON.stringify({
          ...champs,
          formule,
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
          Un conseiller E2I VoIP vous contactera pour faire le point sur votre ligne et préparer
          votre devis.
        </p>
      </div>
    );
  }

  return (
    <form
      aria-label="Demande de devis 3CX SMB SOLO"
      onSubmit={envoyer}
      className="rounded-2xl border border-ui-border bg-white p-6 shadow-lg sm:p-8"
    >
      <fieldset className="mb-8">
        <legend className="mb-4 text-lg font-bold text-gray-dark">Vos coordonnées</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <Champ id="solo-nom" libelle="Nom" requis>
            <Input id="solo-nom" value={champs.nom} onChange={maj("nom")} autoComplete="family-name" required />
          </Champ>
          <Champ id="solo-prenom" libelle="Prénom" requis>
            <Input id="solo-prenom" value={champs.prenom} onChange={maj("prenom")} autoComplete="given-name" required />
          </Champ>
          <Champ id="solo-societe" libelle="Nom de votre activité">
            <Input
              id="solo-societe"
              value={champs.societe}
              onChange={maj("societe")}
              autoComplete="organization"
              placeholder="Nom commercial, si vous en avez un"
            />
          </Champ>
          <Champ id="solo-siret" libelle="SIRET">
            <Input
              id="solo-siret"
              value={champs.siret}
              onChange={maj("siret")}
              inputMode="numeric"
              placeholder="14 chiffres, si vous l’avez"
            />
          </Champ>
          <Champ id="solo-mobile" libelle="Téléphone mobile" requis>
            <Input id="solo-mobile" type="tel" value={champs.telephoneMobile} onChange={maj("telephoneMobile")} autoComplete="tel" required />
          </Champ>
          <Champ id="solo-fixe" libelle="Téléphone fixe">
            <Input id="solo-fixe" type="tel" value={champs.telephoneFixe} onChange={maj("telephoneFixe")} />
          </Champ>
          <div className="sm:col-span-2">
            <Champ id="solo-email" libelle="E-mail" requis>
              <Input id="solo-email" type="email" value={champs.email} onChange={maj("email")} autoComplete="email" required />
            </Champ>
          </div>
        </div>
      </fieldset>

      <fieldset className="mb-8">
        <legend className="mb-4 text-lg font-bold text-gray-dark">
          Votre numéro <span className="text-red-primary">*</span>
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
      </fieldset>

      <fieldset className="mb-8">
        <legend className="mb-4 text-lg font-bold text-gray-dark">
          La formule qui vous intéresse <span className="text-red-primary">*</span>
        </legend>
        <div className="grid gap-3">
          {FORMULES.map((f) => (
            <label key={f.valeur} className="flex items-center gap-3 rounded-lg border border-ui-border p-3 text-sm text-gray-dark">
              <input
                type="radio"
                name="formule"
                value={f.valeur}
                checked={formule === f.valeur}
                onChange={() => setFormule(f.valeur)}
                className="accent-red-primary"
              />
              {f.libelle}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mb-6">
        <Champ id="solo-message" libelle="Votre besoin en quelques lignes" requis>
          <Textarea
            id="solo-message"
            rows={5}
            value={champs.message}
            onChange={maj("message")}
            maxLength={LONGUEUR_MAX_MESSAGE}
            placeholder="Votre activité, le numéro à conserver, vos horaires d’appel…"
            required
          />
        </Champ>
      </div>

      <div className="absolute left-[-10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="solo-website">Site web</label>
        <input id="solo-website" name="website" value={champs.website} onChange={maj("website")} tabIndex={-1} autoComplete="off" />
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
