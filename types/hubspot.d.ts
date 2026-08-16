interface HubSpotFormCreateOptions {
  portalId: string;
  formId: string;
  target: string | HTMLElement;
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
  | ["identify", Record<string, string>]
  | ["trackPageView", string?]
  | unknown[];

interface HubSpotAPI {
  forms?: HubSpotFormsAPI;
  push?: (command: HubSpotTrackCommand) => unknown;
  [key: string]: unknown;
}

interface HubSpotConversationsWidget {
  load(options?: { widgetOpen?: boolean }): void;
  open(): void;
  close?(): void;
  remove?(): void;
  status?(): { loaded: boolean };
}

interface HubSpotConversationsAPI {
  widget: HubSpotConversationsWidget;
}

interface HubSpotConversationsSettings {
  loadImmediately?: boolean;
  enableWidgetCookieBanner?: boolean | "ON_WIDGET_LOAD" | "ON_EXIT_INTENT";
  [key: string]: unknown;
}

declare global {
  interface Window {
    hbspt?: HubSpotAPI;
    _hsq?: HubSpotTrackCommand[];
    HubSpotConversations?: HubSpotConversationsAPI;
    hsConversationsOnReady?: Array<() => void>;
    hsConversationsSettings?: HubSpotConversationsSettings;
  }
}

export {};
