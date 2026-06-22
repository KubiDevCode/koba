# TG Archive

Проект разделён на три основные части:

```text
bot/       Telegram-бот на Telegraf
frontend/  Telegram Mini App на React/Vite
backend/   будущий HTTP API для CRUD и связи Mini App с ботом
```

Общие вещи пока лежат в корне:

```text
packages/database/prisma/      Prisma schema и будущие миграции
packages/database/generated/   сгенерированный Prisma client
.env        общие переменные окружения
```

## Запуск

Бот:

```powershell
npm run dev:bot
```

Фронтенд:

```powershell
npm run dev:frontend
```

Сборка фронтенда:

```powershell
npm run build:frontend
```

Линтер фронтенда:

```powershell
npm run lint:frontend
```

Production preview фронтенда для туннеля:

```powershell
npm run share:frontend -- --port 4173
```

## Как я бы развивал дальше

`backend` лучше делать отдельным HTTP-сервисом, а не пихать API прямо в бота.

Причина простая:

- бот отвечает за Telegram-сообщения, команды и polling;
- frontend отвечает за интерфейс Mini App;
- backend отвечает за авторизацию, CRUD, файлы и права доступа;
- Prisma вынесена в `packages/database`, чтобы ей могли пользоваться и bot, и backend.
