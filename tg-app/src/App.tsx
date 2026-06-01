import { useEffect, useState } from "react";

type TelegramWebApp = {
  ready: () => void;
  expand: () => void;
  initDataUnsafe?: {
    user?: {
      first_name?: string;
    };
  };
  sendData: (data: string) => void;
};

declare global {
  interface Window {
    Telegram?: {
      WebApp?: TelegramWebApp;
    };
  }
}

function App() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    if (!tg) return;

    tg.ready();
    tg.expand();

    setUser(tg.initDataUnsafe?.user);
  }, []);

  const sendToBot = () => {
    window.Telegram?.WebApp?.sendData(JSON.stringify({
      action: "buy",
      item: "test"
    }));
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Mini App</h1>

      {user && (
        <p>Привет, {user.first_name}</p>
      )}

      <button onClick={sendToBot}>
        Отправить в бота
      </button>
    </div>
  );
}

export default App;
