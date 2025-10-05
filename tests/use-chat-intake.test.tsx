import React from "react";
import { renderHook, act, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useChatIntake } from "@/lib/hooks/forms/use-chat-intake";

describe("useChatIntake", () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={new QueryClient()}>
      {children}
    </QueryClientProvider>
  );

  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ ok: true, contactId: "123" }),
      text: async () => "",
    }) as any;
  });

  it("envoie les champs vers l'endpoint et retourne ok", async () => {
    const { result } = renderHook(() => useChatIntake(), { wrapper });
    await act(async () => {
      await result.current.mutateAsync({
        email: "john@doe.com",
        firstName: "John",
        lastName: "Doe",
        phone: "+33123456789",
      });
    });
    expect(global.fetch).toHaveBeenCalledWith(
      "/api/hubspot/ingest-conversation",
      expect.objectContaining({ method: "POST" })
    );
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  });
});
