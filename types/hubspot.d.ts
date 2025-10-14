interface HubSpotFormCreateOptions {
  portalId: string;
  formId: string;
  target: string;
  region?: string;
  inlineMessage?: string;
  cssRequired?: string;
  cssClass?: string;
  prefill?: Record<string, unknown>;
  onFormReady?: (form: HTMLFormElement) => void;
  onFormSubmit?: (form: HTMLFormElement) => void;
  onFormSubmitted?: (form: HTMLFormElement) => void;
  [key: string]: unknown;
}

interface HubSpotFormsAPI {
  create(options: HubSpotFormCreateOptions): void;
}

type HubSpotTrackCommand =
  | ["trackEvent", string, Record<string, unknown>?]
  | ["identify", string, Record<string, unknown>?]
  | ["trackPageView", string?]
  | unknown[];

interface HubSpotAPI {
  forms?: HubSpotFormsAPI;
  push?: (command: HubSpotTrackCommand) => unknown;
  [key: string]: unknown;
}

declare global {
  interface Window {
    hbspt?: HubSpotAPI;
  }
}

export {};
