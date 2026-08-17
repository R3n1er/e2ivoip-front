"use client";

import { useRef, useState } from "react";
import { Play, SpeakerHigh } from "@/lib/icons";

interface AudioPlayerProps {
  src: string;
  label?: string;
  client?: string;
  duration?: string;
}

/**
 * Player audio léger pour les exemples de messages d'attente.
 *
 * Utilise la balise <audio> native avec un UI custom minimal.
 * Le fichier audio est fourni par le client (placeholder si vide).
 */
export function AudioPlayer({
  src,
  label,
  client,
  duration,
}: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-3">
      <button
        onClick={togglePlay}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-primary text-white transition-colors hover:bg-red-600"
        aria-label={isPlaying ? "Pause" : "Lecture"}
        type="button"
      >
        {isPlaying ? (
          <SpeakerHigh size={18} weight="fill" aria-hidden="true" />
        ) : (
          <Play size={18} weight="fill" aria-hidden="true" />
        )}
      </button>
      <div className="min-w-0 flex-1">
        {client && (
          <p className="truncate text-sm font-semibold text-gray-900">
            {client}
          </p>
        )}
        {label && (
          <p className="truncate text-xs text-gray-500">{label}</p>
        )}
      </div>
      {duration && (
        <span className="shrink-0 text-xs text-gray-400">{duration}</span>
      )}
      {/* <audio> caché — controls gérés par le bouton custom */}
      <audio
        ref={audioRef}
        src={src}
        onEnded={() => setIsPlaying(false)}
        className="hidden"
        preload="none"
      />
    </div>
  );
}