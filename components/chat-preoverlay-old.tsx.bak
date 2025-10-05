"use client";

import React, { useState } from "react";
import { useChatIntake } from "@/lib/hooks/use-chat-intake";

export function ChatPreOverlay() {
  const [open, setOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const { mutateAsync, isPending } = useChatIntake();

  const canSubmit =
    email.trim().length > 3 &&
    firstName.trim() &&
    lastName.trim() &&
    company.trim();

  async function startChat() {
    if (!canSubmit) return;
    await mutateAsync({
      firstName,
      lastName,
      company,
      email,
      phone,
      pageUrl: window.location.href,
      source: "website-prechat",
    });
    // Identification HubSpot et ouverture du widget si présent
    try {
      (window as any)._hsq = (window as any)._hsq || [];
      (window as any)._hsq.push([
        "identify",
        { email, firstname: firstName, lastname: lastName, phone },
      ]);
      (window as any).HubSpotConversations?.widget?.open?.();
    } catch {}
    setOpen(false);
  }

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="btn btn-primary shadow-xl"
        >
          Démarrer le chat
        </button>
      )}
      {open && (
        <div className="w-[320px] p-4 rounded-2xl shadow-2xl bg-white border">
          <h3 className="font-bold text-gray-900 mb-2">Avant de commencer</h3>
          <p className="text-sm text-gray-600 mb-3">
            On fait connaissance en 4 infos simples.
          </p>
          <div className="space-y-2">
            <input
              className="input input-bordered w-full"
              placeholder="Prénom"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              className="input input-bordered w-full"
              placeholder="Nom"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <input
              className="input input-bordered w-full"
              placeholder="Entreprise"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
            <input
              className="input input-bordered w-full"
              placeholder="Email*"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="input input-bordered w-full"
              placeholder="Téléphone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="mt-3 flex gap-2">
            <button
              onClick={() => setOpen(false)}
              className="btn btn-ghost flex-1"
            >
              Annuler
            </button>
            <button
              onClick={startChat}
              disabled={!canSubmit || isPending}
              className="btn btn-primary flex-1"
            >
              {isPending ? "Envoi..." : "Ouvrir le chat"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
