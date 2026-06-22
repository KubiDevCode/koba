type TelegramWebApp = {
  ready: () => void;
  expand: () => void;
  initData?: string;
  initDataUnsafe?: {
    user?: {
      id?: number;
      first_name?: string;
      last_name?: string;
      username?: string;
    };
  };
};

declare global {
  interface Window {
    Telegram?: {
      WebApp?: TelegramWebApp;
    };
  }
}

export function initializeTelegramApp() {
  const app = window.Telegram?.WebApp;
  app?.ready();
  app?.expand();
}

export function getTelegramFirstName() {
  return window.Telegram?.WebApp?.initDataUnsafe?.user?.first_name ?? "Степан";
}
