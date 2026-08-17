"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  STUDIO_DEMOS,
  STUDIO_DEMO_CATEGORIES,
  type StudioDemoCategory,
} from "@/lib/studio-demos";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Headphones,
  Microphone,
  Music,
  Envelope,
  Phone,
  Play,
  User,
  Users,
  Warning,
} from "@/lib/icons";

const CATEGORY_OPTIONS: { value: StudioDemoCategory; label: string }[] = [
  { value: "pre-decroche", label: "Pré-décroché" },
  { value: "attente", label: "Attente" },
  { value: "fermeture", label: "Fermeture / répondeur" },
  { value: "occupation", label: "Occupation / dissuasion" },
  { value: "additionnel", label: "Message additionnel" },
];

const TONE_OPTIONS = [
  { value: "chaleureux", label: "Chaleureux" },
  { value: "corporate", label: "Corporate" },
  { value: "dynamique", label: "Dynamique" },
  { value: "prestige", label: "Prestige" },
];

const VOICE_OPTIONS = [
  { value: "masculine", label: "Voix masculine" },
  { value: "feminine", label: "Voix féminine" },
];

const LANGUAGE_OPTIONS = [
  { value: "fr", label: "Français" },
  { value: "fr-en", label: "Français + version anglaise" },
  { value: "en", label: "Anglais" },
  { value: "es", label: "Espagnol" },
  { value: "other", label: "Autre (préciser en note)" },
];

const MUSIC_OPTIONS = [
  { value: "bibliotheque", label: "Choisir dans la bibliothèque E2I VoIP" },
  { value: "import", label: "J’importe ma propre musique libre de droits" },
  { value: "aucune", label: "Aucune musique (message vocal uniquement)" },
];

const STEP_TITLES = [
  "Type de message",
  "Modèle de texte",
  "Personnalisation",
  "Vos coordonnées",
  "Récapitulatif",
];

function fillScript(template: string, values: Record<string, string>): string {
  return template.replace(/\{([^}]+)\}/g, (_, key) => values[key] || `{${key}}`);
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function StudioDevisForm() {
  const searchParams = useSearchParams();
  const initialDemoId = searchParams.get("demo");

  const [step, setStep] = useState(1);
  const [category, setCategory] = useState<StudioDemoCategory>("pre-decroche");
  const [demoId, setDemoId] = useState<string | undefined>(undefined);
  const [company, setCompany] = useState("");
  const [contactName, setContactName] = useState("");
  const [customScript, setCustomScript] = useState("");
  const [tone, setTone] = useState("chaleureux");
  const [voice, setVoice] = useState("masculine");
  const [language, setLanguage] = useState("fr");
  const [music, setMusic] = useState("bibliotheque");
  const [notes, setNotes] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );

  useEffect(() => {
    if (initialDemoId) {
      const demo = STUDIO_DEMOS.find((d) => d.id === initialDemoId);
      if (demo) {
        setCategory(demo.category);
        setDemoId(demo.id);
      }
    }
  }, [initialDemoId]);

  const filteredDemos = useMemo(
    () => STUDIO_DEMOS.filter((d) => d.category === category),
    [category]
  );

  const selectedDemo = useMemo(
    () => STUDIO_DEMOS.find((d) => d.id === demoId),
    [demoId]
  );

  const finalScript = useMemo(() => {
    const source = customScript.trim()
      ? customScript
      : selectedDemo?.script || "";
    return fillScript(source, {
      entreprise: company || "votre entreprise",
      contact: contactName || "votre contact",
    });
  }, [customScript, selectedDemo, company, contactName]);

  function validateStep(currentStep: number): boolean {
    const nextErrors: Record<string, string> = {};
    if (currentStep === 1 && !category) {
      nextErrors.category = "Choisissez un type de message.";
    }
    if (currentStep === 3) {
      if (!tone) nextErrors.tone = "Choisissez un ton.";
      if (!voice) nextErrors.voice = "Choisissez une voix.";
      if (!language) nextErrors.language = "Choisissez une langue.";
      if (!music) nextErrors.music = "Choisissez une option musique.";
    }
    if (currentStep === 4) {
      if (!firstName.trim()) nextErrors.firstName = "Le prénom est requis.";
      if (!lastName.trim()) nextErrors.lastName = "Le nom est requis.";
      if (!email.trim()) {
        nextErrors.email = "L’email est requis.";
      } else if (!isValidEmail(email)) {
        nextErrors.email = "L’email n’est pas valide.";
      }
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function goNext() {
    if (!validateStep(step)) return;
    if (step === 2 && !customScript.trim() && !demoId) {
      // Certaines catégories n'ont pas encore de modèle enregistré : le texte
      // libre est alors la seule voie, le message doit le dire.
      setErrors({
        script: filteredDemos.length
          ? "Sélectionnez un modèle ou rédigez votre texte."
          : "Rédigez votre texte pour continuer.",
      });
      return;
    }
    setStep((s) => Math.min(s + 1, 5));
  }

  function goBack() {
    setStep((s) => Math.max(s - 1, 1));
  }

  async function handleSubmit() {
    if (!validateStep(4)) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/studio/devis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone,
          company,
          category,
          demoId,
          customScript: customScript.trim() ? customScript : undefined,
          finalScript,
          tone,
          voice,
          language,
          music,
          notes,
          pageUrl: typeof window !== "undefined" ? window.location.href : "",
        }),
      });
      if (res.ok) {
        setStatus("success");
      } else {
        const data = await res.json().catch(() => ({}));
        setErrors({ submit: data.error || "Une erreur est survenue." });
        setStatus("error");
      }
    } catch {
      setErrors({ submit: "Une erreur réseau est survenue." });
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="max-w-lg w-full text-center border-green-200">
          <CardContent className="p-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check size={32} className="text-green-600" aria-hidden="true" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Demande envoyée
            </h1>
            <p className="text-gray-600 mb-6">
              Notre équipe commerciale étudie votre projet et vous recontacte
              sous 24 h ouvrées.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild variant="outline">
                <a href="/studio-attente">Retour au studio</a>
              </Button>
              <Button asChild className="bg-red-primary hover:bg-red-700 text-white">
                <a href="/">Retour à l’accueil</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 md:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-black tracking-[-0.04em] text-gray-dark mb-3">
            Devis studio voix humaines
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            Construisez votre message étape par étape. Notre équipe vous envoie
            un devis personnalisé sous 24 h.
          </p>
        </div>

        {/* Progression */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            {STEP_TITLES.map((title, idx) => {
              const num = idx + 1;
              const active = num === step;
              const done = num < step;
              return (
                <div key={title} className="flex flex-col items-center flex-1">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mb-1
                      ${done ? "bg-green-500 text-white" : active ? "bg-red-primary text-white" : "bg-gray-200 text-gray-500"}`}
                    aria-current={active ? "step" : undefined}
                  >
                    {done ? <Check size={16} /> : num}
                  </div>
                  <span
                    className={`hidden sm:block text-xs text-center ${active ? "font-semibold text-gray-dark" : "text-gray-400"}`}
                  >
                    {title}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-red-primary transition-all duration-300"
              style={{ width: `${(step / 5) * 100}%` }}
            />
          </div>
        </div>

        <Card className="border-gray-200 shadow-sm">
          <CardContent className="p-6 md:p-8">
            {/* ÉTAPE 1 : Type de message */}
            {step === 1 && (
              <fieldset className="space-y-4">
                <legend className="text-lg font-bold text-gray-dark mb-4 flex items-center gap-2">
                  <Headphones className="text-red-primary" size={24} />
                  Quel type de message souhaitez-vous ?
                </legend>
                <div className="grid sm:grid-cols-2 gap-3">
                  {CATEGORY_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      aria-label={`Choisir ${opt.label}`}
                      onClick={() => {
                        setCategory(opt.value);
                        setDemoId(undefined);
                        setCustomScript("");
                        setErrors((e) => ({ ...e, category: "" }));
                      }}
                      className={`text-left p-4 rounded-xl border-2 transition-all
                        ${category === opt.value
                          ? "border-red-primary bg-red-50"
                          : "border-gray-200 hover:border-red-primary/50"}`}
                    >
                      <span className="font-semibold text-gray-dark">
                        {opt.label}
                      </span>
                      <p className="text-sm text-gray-500 mt-1">
                        {STUDIO_DEMO_CATEGORIES[opt.value].description}
                      </p>
                    </button>
                  ))}
                </div>
                {errors.category && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <Warning size={16} /> {errors.category}
                  </p>
                )}
              </fieldset>
            )}

            {/* ÉTAPE 2 : Modèle de texte */}
            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-lg font-bold text-gray-dark flex items-center gap-2">
                  <Microphone className="text-red-primary" size={24} />
                  {filteredDemos.length > 0
                    ? "Choisissez un modèle ou rédigez votre texte"
                    : "Rédigez votre texte"}
                </h2>

                {filteredDemos.length === 0 && (
                  <p className="text-sm text-gray-500 bg-gray-50 border border-gray-200 rounded-xl p-4">
                    Aucun modèle enregistré pour cette catégorie&nbsp;: rédigez
                    votre texte ci-dessous, notre studio vous accompagnera dans
                    sa mise en forme.
                  </p>
                )}

                {filteredDemos.length > 0 && (
                  <div className="space-y-3">
                    <p className="text-sm text-gray-500">Modèles suggérés :</p>
                    {filteredDemos.map((demo) => (
                      <button
                        key={demo.id}
                        type="button"
                        onClick={() => {
                          setDemoId(demo.id);
                          setCustomScript("");
                          setVoice(demo.voice);
                          setErrors((e) => ({ ...e, script: "" }));
                        }}
                        className={`w-full text-left p-4 rounded-xl border-2 transition-all
                          ${demoId === demo.id
                            ? "border-red-primary bg-red-50"
                            : "border-gray-200 hover:border-red-primary/50"}`}
                      >
                        <div className="flex items-start gap-3">
                          <Play
                            size={20}
                            className="text-red-primary shrink-0 mt-1"
                            aria-hidden="true"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="font-semibold text-gray-dark">
                                {demo.title}
                              </span>
                              <span className="text-xs text-gray-400">
                                {demo.duration}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1 italic">
                              &ldquo;{demo.script.replace(/\{entreprise\}/g, "votre entreprise")}&rdquo;
                            </p>
                            <audio
                              controls
                              src={demo.src}
                              className="w-full mt-3 h-8"
                              preload="none"
                            >
                              Votre navigateur ne supporte pas la lecture audio.
                            </audio>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                <div className="space-y-2">
                  <label htmlFor="custom-script" className="block text-sm font-medium text-gray-700">
                    {filteredDemos.length > 0
                      ? "Ou rédigez votre propre texte"
                      : "Votre texte *"}
                  </label>
                  <Textarea
                    id="custom-script"
                    value={customScript}
                    onChange={(e) => {
                      setCustomScript(e.target.value);
                      if (e.target.value.trim()) setDemoId(undefined);
                      setErrors((e2) => ({ ...e2, script: "" }));
                    }}
                    placeholder="Ex. : Bienvenue chez {entreprise}. Nous prenons votre appel dans quelques instants... Utilisez {entreprise} pour insérer le nom de l’entreprise."
                    rows={5}
                  />
                </div>
                {errors.script && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <Warning size={16} /> {errors.script}
                  </p>
                )}
              </div>
            )}

            {/* ÉTAPE 3 : Personnalisation */}
            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-lg font-bold text-gray-dark flex items-center gap-2">
                  <Users className="text-red-primary" size={24} />
                  Personnalisez votre message
                </h2>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                      Nom de l’entreprise
                    </label>
                    <Input
                      id="company"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Société Exemple"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700">
                      Nom du contact (si répondeur mobile)
                    </label>
                    <Input
                      id="contact-name"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="Jean Dupont"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="tone" className="block text-sm font-medium text-gray-700">Ton</label>
                    <select
                      id="tone"
                      value={tone}
                      onChange={(e) => setTone(e.target.value)}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      {TONE_OPTIONS.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                    {errors.tone && <p className="text-xs text-red-600">{errors.tone}</p>}
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="voice" className="block text-sm font-medium text-gray-700">Voix</label>
                    <select
                      id="voice"
                      value={voice}
                      onChange={(e) => setVoice(e.target.value)}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      {VOICE_OPTIONS.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                    {errors.voice && <p className="text-xs text-red-600">{errors.voice}</p>}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="language" className="block text-sm font-medium text-gray-700">Langue</label>
                    <select
                      id="language"
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      {LANGUAGE_OPTIONS.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                    {errors.language && <p className="text-xs text-red-600">{errors.language}</p>}
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="music" className="block text-sm font-medium text-gray-700">Musique</label>
                    <select
                      id="music"
                      value={music}
                      onChange={(e) => setMusic(e.target.value)}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      {MUSIC_OPTIONS.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                    {errors.music && <p className="text-xs text-red-600">{errors.music}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                    Notes complémentaires
                  </label>
                  <Textarea
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Langue supplémentaire, dates d’enregistrement souhaitées, contraintes techniques..."
                    rows={3}
                  />
                </div>
              </div>
            )}

            {/* ÉTAPE 4 : Coordonnées */}
            {step === 4 && (
              <div className="space-y-6">
                <h2 className="text-lg font-bold text-gray-dark flex items-center gap-2">
                  <User className="text-red-primary" size={24} />
                  Vos coordonnées
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                      Prénom *
                    </label>
                    <Input
                      id="firstName"
                      value={firstName}
                      onChange={(e) => {
                        setFirstName(e.target.value);
                        setErrors((e2) => ({ ...e2, firstName: "" }));
                      }}
                    />
                    {errors.firstName && <p className="text-xs text-red-600">{errors.firstName}</p>}
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                      Nom *
                    </label>
                    <Input
                      id="lastName"
                      value={lastName}
                      onChange={(e) => {
                        setLastName(e.target.value);
                        setErrors((e2) => ({ ...e2, lastName: "" }));
                      }}
                    />
                    {errors.lastName && <p className="text-xs text-red-600">{errors.lastName}</p>}
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email professionnel *
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setErrors((e2) => ({ ...e2, email: "" }));
                    }}
                  />
                  {errors.email && <p className="text-xs text-red-600">{errors.email}</p>}
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Téléphone
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+33 1 23 45 67 89"
                  />
                </div>
              </div>
            )}

            {/* ÉTAPE 5 : Récap */}
            {step === 5 && (
              <div className="space-y-6">
                <h2 className="text-lg font-bold text-gray-dark flex items-center gap-2">
                  <Check className="text-red-primary" size={24} />
                  Récapitulatif
                </h2>

                <div className="bg-blue-marine/5 border border-blue-marine/20 rounded-xl p-4">
                  <h3 className="font-semibold text-gray-dark mb-2 flex items-center gap-2">
                    <Music size={20} className="text-blue-marine" />
                    Votre message final
                  </h3>
                  <p className="text-gray-700 italic whitespace-pre-wrap">
                    &ldquo;{finalScript}&rdquo;
                  </p>
                </div>

                <dl className="grid sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <dt className="text-gray-500">Type</dt>
                    <dd className="font-medium text-gray-dark">
                      {STUDIO_DEMO_CATEGORIES[category].label}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-gray-500">Modèle</dt>
                    <dd className="font-medium text-gray-dark">
                      {selectedDemo?.title || "Texte personnalisé"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-gray-500">Ton / Voix / Langue</dt>
                    <dd className="font-medium text-gray-dark">
                      {tone} / {voice} / {language}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-gray-500">Musique</dt>
                    <dd className="font-medium text-gray-dark">
                      {MUSIC_OPTIONS.find((o) => o.value === music)?.label}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-gray-500">Entreprise</dt>
                    <dd className="font-medium text-gray-dark">{company || "—"}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-500">Contact</dt>
                    <dd className="font-medium text-gray-dark">
                      {firstName} {lastName} — {email}
                    </dd>
                  </div>
                </dl>

                {errors.submit && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <Warning size={16} /> {errors.submit}
                  </p>
                )}
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
              <Button
                type="button"
                variant="outline"
                onClick={goBack}
                disabled={step === 1 || status === "loading"}
              >
                <ArrowLeft size={18} className="mr-2" />
                Précédent
              </Button>

              {step < 5 ? (
                <Button
                  type="button"
                  onClick={goNext}
                  className="bg-red-primary hover:bg-red-700 text-white"
                  disabled={status === "loading"}
                >
                  Suivant
                  <ArrowRight size={18} className="ml-2" />
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={handleSubmit}
                  className="bg-red-primary hover:bg-red-700 text-white"
                  disabled={status === "loading"}
                >
                  {status === "loading" ? "Envoi en cours..." : "Envoyer ma demande"}
                  <Envelope size={18} className="ml-2" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Bloc appel */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 mb-3">
            Vous préférez en parler directement ?
          </p>
          <Button asChild variant="outline" className="gap-2">
            <a href="tel:+594594963500">
              <Phone size={18} aria-hidden="true" />
              05 94 96 35 00
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function StudioDevisPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <Card className="max-w-lg w-full text-center">
            <CardContent className="p-8">
              <p className="text-gray-600">Chargement du formulaire…</p>
            </CardContent>
          </Card>
        </div>
      }
    >
      <StudioDevisForm />
    </Suspense>
  );
}
