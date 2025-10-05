import { useCallback, useMemo, useState } from "react";
import {
  submitChatIntake,
  type ChatIntakePayload,
} from "@/lib/api/chat-intake";

export type UseChatIntakeVariables = ChatIntakePayload;

interface UseChatIntakeState {
  mutateAsync: (variables: UseChatIntakeVariables) => Promise<{
    ok: boolean;
    contactId?: string;
  }>;
  isLoading: boolean;
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: Error | null;
  reset: () => void;
}

export function useChatIntake(): UseChatIntakeState {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const reset = useCallback(() => {
    setIsLoading(false);
    setIsSuccess(false);
    setError(null);
  }, []);

  const mutateAsync = useCallback(
    async (variables: UseChatIntakeVariables) => {
      setIsLoading(true);
      setError(null);
      setIsSuccess(false);

      try {
        const payload: ChatIntakePayload = {
          ...variables,
          source: variables.source ?? "website-prechat",
          pageUrl:
            variables.pageUrl ??
            (typeof window !== "undefined" ? window.location.href : undefined),
        };

        const result = await submitChatIntake(payload);
        setIsSuccess(true);
        return result;
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Erreur inconnue"));
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return useMemo(
    () => ({
      mutateAsync,
      isLoading,
      isPending: isLoading,
      isSuccess,
      isError: !!error,
      error,
      reset,
    }),
    [mutateAsync, isLoading, isSuccess, error, reset]
  );
}
