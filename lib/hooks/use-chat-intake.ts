import { useMutation } from "@tanstack/react-query";

export type ChatIntakePayload = {
  firstName?: string;
  lastName?: string;
  email: string;
  phone?: string;
  mobile?: string;
  message?: string;
  source?: string;
  conversationId?: string;
  pageUrl?: string;
};

export function useChatIntake() {
  return useMutation({
    mutationFn: async (payload: ChatIntakePayload) => {
      const res = await fetch("/api/hubspot/ingest-conversation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(await res.text());
      return res.json() as Promise<{ ok: boolean; contactId?: string }>;
    },
  });
}
