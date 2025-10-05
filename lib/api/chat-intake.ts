/**
 * API function for chat intake submission
 * Replaces the TanStack Query hook with a simple async function
 */

export type ChatIntakePayload = {
  firstName?: string;
  lastName?: string;
  company?: string;
  email: string;
  phone?: string;
  mobile?: string;
  message?: string;
  source?: string;
  conversationId?: string;
  pageUrl?: string;
};

/**
 * Submit chat intake data to HubSpot API
 */
export async function submitChatIntake(
  payload: ChatIntakePayload
): Promise<{ ok: boolean; contactId?: string }> {
  const res = await fetch("/api/hubspot/ingest-conversation", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "Erreur lors de la soumission");
  }

  return res.json();
}
