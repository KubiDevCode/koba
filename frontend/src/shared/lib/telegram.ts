type TelegramWebApp = {
  ready: () => void;
  expand: () => void;
  initData?: string;
  initDataUnsafe?: {
    start_param?: string;
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

export function getTelegramUserId() {
  return window.Telegram?.WebApp?.initDataUnsafe?.user?.id;
}

export function getTelegramStartParam() {
  return window.Telegram?.WebApp?.initDataUnsafe?.start_param ?? null;
}
