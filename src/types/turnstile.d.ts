type TurnstileOptions = {
  sitekey: string;
  callback?: (token: string) => void;
  "error-callback"?: () => void;
  "expired-callback"?: () => void;
  theme?: "light" | "dark" | "auto";
  size?: "normal" | "compact" | "invisible";
  execution?: "render" | "execute";
  appearance?: "always" | "execute" | "interaction-only";
  action?: string;
};

interface TurnstileWidget {
  render: (container: string | HTMLElement, options: TurnstileOptions) => string;
  execute: (widgetId: string) => void;
  reset: (widgetId: string) => void;
  remove: (widgetId: string) => void;
}

interface Window {
  turnstile: TurnstileWidget;
}
