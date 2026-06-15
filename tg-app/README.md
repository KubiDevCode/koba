# Видеоархив: подробная карта фронтенда

Этот каталог содержит фронтенд Telegram Mini App для общего архива фото и видео.

Пользователь может:

- увидеть доступные ему группы;
- вступить в группу по приглашению;
- открыть события конкретной группы;
- посмотреть общий календарь событий;
- открыть фото, видео и список участников события;
- увидеть свой Telegram-профиль и доступные группы.

Сейчас это **кликабельный frontend-макет**. Настоящего API, авторизации и загрузки файлов пока нет. Все группы, события и участники находятся в mock-данных.

---

## Быстрый запуск

Установить зависимости:

```powershell
cd tg-app
npm install
```

Запустить режим разработки:

```powershell
npm run dev
```

Обычно Vite откроется на `http://localhost:5173`. Если этот порт занят, Vite выберет следующий, например `5174`.

Проверить код:

```powershell
npm run lint
npm run build
```

Запустить production-сборку для проверки:

```powershell
npm run preview
```

Собрать приложение и сразу запустить production preview:

```powershell
npm run share
```

Команда `share` сама собирает приложение, но **не запускает ngrok**.

---

## Как поделиться приложением через ngrok

Для других людей лучше раздавать production-сборку, а не Vite dev-сервер.

Первый терминал:

```powershell
cd tg-app
npm run share -- --port 4173
```

Второй терминал:

```powershell
ngrok http --url=musky-payee-magnetic.ngrok-free.dev 4173
```

Публичная ссылка:

```text
https://musky-payee-magnetic.ngrok-free.dev
```

Почему не стоит направлять ngrok на `npm run dev`:

- dev-сервер отдаёт десятки отдельных `.tsx`-модулей;
- он загружает React Refresh и служебные файлы Vite;
- через бесплатный ngrok это может грузиться очень долго;
- production-сборка отдаёт только HTML, готовый JavaScript и CSS.

У другого человека ссылка работает только пока:

- твой компьютер включён;
- запущен production preview;
- запущен ngrok;
- есть интернет;
- адрес ngrok направлен на правильный порт.

---

## Команды из `package.json`

### `npm run dev`

Запускает Vite в режиме разработки.

```json
"dev": "vite --host"
```

Особенности:

- изменения кода появляются почти сразу;
- работает Hot Module Replacement;
- удобно использовать только во время разработки;
- не рекомендуется раздавать другим людям через ngrok.

### `npm run build`

Проверяет TypeScript и создаёт production-сборку в каталоге `dist`.

```json
"build": "tsc -b && vite build"
```

Если команда падает, значит в коде есть ошибка типов или проблема сборки.

### `npm run lint`

Проверяет код ESLint:

```json
"lint": "eslint ."
```

Линтер ищет потенциальные ошибки, неправильное использование React hooks и неиспользуемый код.

### `npm run preview`

Запускает уже собранный каталог `dist`.

```json
"preview": "vite preview --host"
```

Перед этим обычно нужно выполнить `npm run build`.

### `npm run share`

Сначала собирает проект, затем запускает production preview:

```json
"share": "npm run build && vite preview --host"
```

---

## Как приложение запускается

Цепочка запуска:

```text
index.html
    ↓
src/main.tsx
    ↓
src/app/App.tsx
    ↓
pages + widgets + features + entities + shared
```

### `index.html`

Главный HTML-файл.

В нём находятся:

- `<div id="root"></div>` — место, куда React вставляет приложение;
- подключение Telegram Web App SDK;
- подключение `src/main.tsx`;
- название вкладки и цвет темы.

Telegram SDK подключается этой строкой:

```html
<script src="https://telegram.org/js/telegram-web-app.js"></script>
```

После загрузки SDK появляется:

```ts
window.Telegram?.WebApp
```

### `src/main.tsx`

Самая первая точка входа React.

Она:

1. находит HTML-элемент `#root`;
2. создаёт React root;
3. рендерит главный компонент `<App />`;
4. включает `StrictMode` для дополнительных проверок React в разработке.

Этот файл обычно почти не меняется.

### `src/app/App.tsx`

Главный координатор приложения.

`App` не рисует карточки и страницы вручную. Его задача:

- хранить текущее состояние навигации;
- помнить выбранную группу;
- помнить выбранное событие;
- помнить выбранное медиа;
- открывать и закрывать модальные окна;
- передавать данные и callbacks нужным страницам.

Основные состояния:

```ts
const [view, setView] = useState<View>("groups");
const [activeGroup, setActiveGroup] = useState(groups[0]);
const [activeEvent, setActiveEvent] = useState(groups[0].events[0]);
const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);
const [inviteOpen, setInviteOpen] = useState(false);
const [participantsOpen, setParticipantsOpen] = useState(false);
```

Что они означают:

| Состояние | Назначение |
|---|---|
| `view` | Какой экран сейчас открыт |
| `activeGroup` | Какая группа выбрана |
| `activeEvent` | Какое событие выбрано |
| `selectedMedia` | Какое фото или видео открыто в просмотрщике |
| `inviteOpen` | Открыта ли модалка приглашения |
| `participantsOpen` | Открыт ли список участников |

Тип экранов:

```ts
type View = "groups" | "calendar" | "profile" | "group" | "event";
```

Сейчас полноценный роутер не используется. Страница выбирается обычной проверкой:

```tsx
{view === "calendar" && <CalendarPage />}
```

Для текущего небольшого макета этого достаточно. Когда появятся URL, browser history и глубокие ссылки, стоит подключить React Router.

---

## Архитектура FSD

Проект разделён по принципам Feature-Sliced Design:

```text
src/
├── app/
├── pages/
├── widgets/
├── features/
├── entities/
└── shared/
```

Смысл слоёв:

```text
app
 ↓
pages
 ↓
widgets
 ↓
features
 ↓
entities
 ↓
shared
```

Верхний слой может использовать нижний. Нижний слой не должен импортировать верхний.

Например:

- `pages/event` может использовать `entities/archive`;
- `entities/archive` может использовать `shared`;
- `shared` не должен импортировать `pages/event`;
- `entities/archive` не должен знать про конкретную страницу.

### Зачем нужны `index.ts`

У слайсов есть публичные точки входа:

```text
entities/archive/index.ts
features/join-group/index.ts
pages/calendar/index.ts
```

Вместо импорта внутреннего файла:

```ts
import { GroupListItem } from "../entities/archive/ui/GroupListItem";
```

используется публичный API:

```ts
import { GroupListItem } from "../entities/archive";
```

Так внутреннюю структуру слайса можно менять без переписывания всех импортов.

---

## Полная структура проекта

```text
src/
├── app/
│   ├── App.tsx
│   └── styles/
│       └── index.css
│
├── pages/
│   ├── groups/
│   ├── group/
│   ├── event/
│   ├── calendar/
│   └── profile/
│
├── widgets/
│   └── bottom-navigation/
│
├── features/
│   ├── join-group/
│   ├── view-media/
│   └── view-participants/
│
├── entities/
│   └── archive/
│       ├── model/
│       ├── ui/
│       └── index.ts
│
├── shared/
│   ├── lib/
│   └── ui/
│
└── main.tsx
```

---

## Слой `entities/archive`

Этот слой описывает главную предметную область приложения: архив групп, событий и медиа.

### `model/types.ts`

Содержит TypeScript-типы данных.

#### `Media`

Описывает одно фото или видео:

```ts
type Media = {
  id: number;
  type: "photo" | "video";
  src: string;
  duration?: string;
};
```

| Поле | Значение |
|---|---|
| `id` | Уникальный идентификатор |
| `type` | Тип медиа: фото или видео |
| `src` | Ссылка на изображение/превью |
| `duration` | Длительность видео, для фото не нужна |

#### `Participant`

Описывает участника события:

```ts
type Participant = {
  id: number;
  name: string;
  avatar: string;
};
```

#### `ArchiveEvent`

Описывает событие:

```ts
type ArchiveEvent = {
  id: number;
  title: string;
  date: string;
  shortDate: string;
  time: string;
  location: string;
  description: string;
  cover: string;
  media: Media[];
  participants: Participant[];
};
```

`date` используется для полного отображения, например `22 июня 2026`.

`shortDate` используется в компактных карточках, например `22 июн`.

#### `Group`

Описывает группу:

```ts
type Group = {
  id: number;
  name: string;
  members: number;
  role: "Участник" | "По приглашению";
  cover: string;
  avatar: string;
  events: ArchiveEvent[];
};
```

#### `EventWithGroup`

Обычное событие не содержит ссылку на родительскую группу. Для общего календаря нужно знать, к какой группе относится событие.

Поэтому используется:

```ts
type EventWithGroup = ArchiveEvent & {
  group: Group;
};
```

### `model/mock-data.ts`

Содержит временные тестовые данные:

- `mediaPool`;
- `participants`;
- `groups`;
- вложенные события.

Именно здесь нужно менять тестовые:

- названия групп;
- события;
- картинки;
- участников;
- даты;
- количество медиа.

Когда появится backend, `groups` из mock-файла будет заменён данными API.

### UI-компоненты сущности архива

Эти компоненты отображают данные архива, но не управляют страницами и навигацией самостоятельно.

#### `GroupListItem`

Строка группы на главном экране.

Показывает:

- аватар группы;
- название;
- количество участников;
- роль пользователя.

Принимает:

```ts
{
  group: Group;
  onClick: () => void;
}
```

Компонент не знает, куда переходить. Он только вызывает `onClick`, а родитель решает, что делать.

#### `EventPreviewCard`

Большая карточка ближайшего события.

Показывает:

- обложку;
- короткую дату;
- название;
- группу;
- количество медиа.

#### `CalendarEventItem`

Одна строка общего календаря.

Сам разбивает:

```ts
event.shortDate
```

на день и месяц:

```ts
const [day, month] = event.shortDate.split(" ");
```

#### `TimelineEventItem`

Одна строка события внутри страницы конкретной группы.

Показывает:

- дату;
- обложку;
- название;
- место;
- количество медиа.

#### `MediaGallery`

Рисует сетку фото и видео.

Для видео дополнительно показывает:

- иконку воспроизведения;
- длительность.

При нажатии вызывает:

```ts
onOpenMedia(item)
```

#### `ParticipantPreview`

Компактно показывает участников события:

- первые шесть аватаров;
- первые три имени;
- количество оставшихся участников.

#### `GroupAccessItem`

Строка группы в профиле пользователя.

Показывает название, аватар, роль и значок доступа.

---

## Слой `pages`

Страница собирает полноценный экран из компонентов нижних слоёв.

Страница может:

- принимать данные;
- отображать секции;
- вызывать callbacks;
- использовать entity-компоненты;
- использовать shared-компоненты.

Страница не должна хранить глобальную навигацию приложения.

### `pages/groups/GroupsPage`

Главный экран.

Содержит:

- приветствие;
- вводный блок архива;
- поиск по группам;
- список доступных групп;
- ближайшие события.

Локальное состояние:

```ts
const [query, setQuery] = useState("");
```

Оно находится внутри страницы, потому что поисковая строка нужна только этому экрану.

Фильтрация:

```ts
const filteredGroups = groups.filter(...);
```

Callbacks:

| Callback | Что делает |
|---|---|
| `onOpenGroup` | Открывает выбранную группу |
| `onOpenEvent` | Открывает выбранное событие |
| `onOpenInvite` | Открывает приглашение |
| `onOpenProfile` | Открывает профиль |
| `onOpenCalendar` | Открывает календарь |

Внутренний компонент `ArchiveIntro` нужен только этой странице, поэтому он оставлен в том же файле.

### `pages/group/GroupPage`

Экран конкретной группы.

Содержит:

- hero-обложку группы;
- название и роль;
- список событий группы;
- кнопку назад;
- кнопку добавления события-заглушку.

Использует `TimelineEventItem` для каждого события.

### `pages/event/EventPage`

Экран конкретного события.

Содержит:

- заголовок;
- обложку и информацию события;
- превью участников;
- галерею фото и видео;
- кнопки открытия участников и медиа.

Внутренний компонент `EventSummary` отображает:

- дату;
- время;
- место;
- описание.

### `pages/calendar/CalendarPage`

Общий календарь всех событий всех групп.

Получает уже подготовленный массив:

```ts
EventWithGroup[]
```

и рендерит `CalendarEventItem`.

Сейчас выбор месяца является визуальной заглушкой. Он не меняет список.

### `pages/profile/ProfilePage`

Экран профиля.

Показывает:

- имя Telegram-пользователя;
- статус идентификации;
- список доступных групп;
- кнопку вступления по приглашению.

Внутренний компонент `ProfileSummary` нужен только этой странице.

---

## Слой `widgets`

Widget — самостоятельный крупный блок интерфейса, который используется страницами или приложением.

### `BottomNavigation`

Нижняя навигация между основными экранами:

- группы;
- события;
- профиль.

Тип допустимых основных экранов:

```ts
type MainView = "groups" | "calendar" | "profile";
```

Это не включает `group` и `event`, потому что на вложенных экранах нижняя навигация скрывается.

Внутренний `NavigationItem` нужен только этому widget, поэтому наружу не экспортируется.

---

## Слой `features`

Feature описывает пользовательское действие.

### `features/join-group/JoinGroupModal`

Сценарий вступления в группу по коду.

Локальные состояния:

```ts
const [inviteCode, setInviteCode] = useState("");
const [groupFound, setGroupFound] = useState(false);
```

Сейчас проверка кода ненастоящая:

```ts
onClick={() => setGroupFound(true)}
```

Когда появится backend, здесь должен быть запрос:

```ts
await fetch("/api/groups/join", ...)
```

После закрытия модалки состояние сбрасывается функцией `close`.

### `features/view-participants/ParticipantsModal`

Открывает полный список участников выбранного события.

Получает:

```ts
{
  event: ArchiveEvent;
  open: boolean;
  onClose: () => void;
}
```

Использует общий `SheetModal`.

### `features/view-media/MediaViewer`

Полноэкранный просмотр выбранного фото или видео.

Если `media === null`, компонент ничего не рендерит:

```ts
if (!media) return null;
```

Для видео показывает кнопку воспроизведения.

Кнопки `В альбом`, `Поделиться`, `Оригинал` пока являются визуальными заглушками.

---

## Слой `shared`

Shared содержит максимально универсальный код, который не знает о группах, событиях и бизнес-логике.

### `shared/lib/telegram.ts`

Описывает минимальную часть Telegram Web App API, используемую приложением.

#### `initializeTelegramApp`

```ts
export function initializeTelegramApp() {
  const app = window.Telegram?.WebApp;
  app?.ready();
  app?.expand();
}
```

Что происходит:

- `ready()` сообщает Telegram, что Mini App загрузился;
- `expand()` просит Telegram раскрыть Mini App по высоте;
- `?.` предотвращает ошибку, если приложение открыли в обычном браузере.

#### `getTelegramFirstName`

Получает имя пользователя из Telegram:

```ts
window.Telegram?.WebApp?.initDataUnsafe?.user?.first_name
```

Если приложение открыто не из Telegram, возвращает тестовое имя `Степан`.

Важно: `initDataUnsafe` подходит для отображения имени, но ему нельзя доверять на backend. Для авторизации нужно отправлять и проверять подписанный `initData`.

### `shared/ui/IconButton`

Универсальная кнопка с иконкой.

Варианты:

```ts
variant?: "default" | "subtle" | "glass";
```

| Вариант | Использование |
|---|---|
| `default` | Обычная светлая кнопка |
| `subtle` | Спокойная кнопка в заголовке события |
| `glass` | Полупрозрачная кнопка поверх обложки |

`label` становится `aria-label` и нужен для доступности:

```tsx
<IconButton label="Назад">
  <ArrowLeft />
</IconButton>
```

### `shared/ui/PageHeader`

Общий верхний заголовок страницы.

Принимает:

```ts
{
  eyebrow: string;
  title: ReactNode;
  action?: ReactNode;
  home?: boolean;
}
```

`action` позволяет передать кнопку или аватар справа.

`home` добавляет отдельный CSS-класс домашнего заголовка.

### `shared/ui/SectionHeading`

Заголовок секции внутри страницы.

Используется для блоков:

- группы;
- ближайшие события;
- участники;
- фото и видео;
- доступные группы.

Принимает произвольный `action`, например кнопку `Все` или `Добавить`.

### `shared/ui/SheetModal`

Общий каркас нижней модалки.

Он отвечает за:

- затемнённый фон;
- закрытие по нажатию на фон;
- кнопку закрытия;
- иконку;
- заголовок;
- описание;
- область содержимого;
- прокрутку длинной модалки.

Features передают в него только своё содержимое.

Без этого компонента каждая модалка повторяла бы одну и ту же разметку.

---

## Стили

Все стили сейчас находятся в:

```text
src/app/styles/index.css
```

Это сделано для простоты макета.

CSS-классы привязаны к компонентам:

| Пример класса | Компонент |
|---|---|
| `.group-row` | `GroupListItem` |
| `.calendar-event` | `CalendarEventItem` |
| `.media-tile` | `MediaGallery` |
| `.participant-preview` | `ParticipantPreview` |
| `.bottom-nav` | `BottomNavigation` |
| `.invite-sheet` | `SheetModal` |

Когда проект станет больше, стили можно переносить внутрь соответствующих FSD-слайсов:

```text
entities/archive/ui/GroupListItem.module.css
shared/ui/icon-button/IconButton.module.css
```

Пока единый файл проще редактировать и просматривать.

---

## Поток данных при открытии события

Пример: пользователь открывает событие из календаря.

```text
CalendarPage
    ↓ вызывает onOpenEvent(event)
App.openEventWithGroup(event)
    ↓
App.openEvent(event, event.group)
    ↓ обновляет activeGroup
    ↓ обновляет activeEvent
    ↓ меняет view на "event"
EventPage получает activeGroup и activeEvent
```

Компоненты не изменяют глобальное состояние напрямую. Они вызывают callbacks, переданные из `App`.

---

## Поток данных при открытии медиа

```text
MediaGallery
    ↓ onOpenMedia(media)
EventPage
    ↓ передаёт callback дальше
App.setSelectedMedia(media)
    ↓
MediaViewer получает selectedMedia
```

При закрытии:

```ts
setSelectedMedia(null)
```

После этого `MediaViewer` возвращает `null` и исчезает.

---

## Поток Telegram-данных

При запуске приложения:

```ts
useEffect(initializeTelegramApp, []);
```

`initializeTelegramApp` сообщает Telegram, что приложение готово.

Имя пользователя читается один раз:

```ts
const [userName] = useState(getTelegramFirstName);
```

Почему через функцию:

```ts
useState(getTelegramFirstName)
```

React вызовет функцию только при создании состояния, а не при каждом рендере.

Сейчас Telegram используется только для:

- получения имени;
- вызова `ready`;
- вызова `expand`.

Авторизация через проверку `initData` ещё не реализована.

---

## Как добавить новую группу в mock-данные

Открой:

```text
src/entities/archive/model/mock-data.ts
```

Добавь объект в массив `groups`:

```ts
{
  id: 4,
  name: "Новая группа",
  members: 12,
  role: "Участник",
  cover: "https://...",
  avatar: "https://...",
  events: [],
}
```

Важно:

- `id` должен быть уникальным;
- `events` должен быть массивом;
- `role` должен соответствовать типу `Group`;
- изображения должны быть доступны по HTTPS.

---

## Как добавить событие

Добавь объект в `events` нужной группы:

```ts
{
  id: 401,
  title: "Новое событие",
  date: "20 июля 2026",
  shortDate: "20 июл",
  time: "18:00",
  location: "Москва",
  description: "Описание события",
  cover: "https://...",
  media: [],
  participants: [],
}
```

---

## Как добавить новый экран

Например, нужен экран настроек.

### 1. Создать страницу

```text
src/pages/settings/ui/SettingsPage.tsx
src/pages/settings/index.ts
```

### 2. Экспортировать страницу

```ts
export { SettingsPage } from "./ui/SettingsPage";
```

### 3. Добавить экран в тип `View`

В `src/app/App.tsx`:

```ts
type View = MainView | "group" | "event" | "settings";
```

### 4. Добавить отображение

```tsx
{view === "settings" && <SettingsPage />}
```

### 5. Передать callback кнопке

```tsx
onClick={() => setView("settings")}
```

Если экран должен быть в нижней навигации, его также нужно добавить в `MainView` и `BottomNavigation`.

---

## Как добавить новый кастомный shared-компонент

Например, нужен универсальный `EmptyState`.

Создай:

```text
src/shared/ui/empty-state/EmptyState.tsx
src/shared/ui/empty-state/index.ts
```

Компонент:

```tsx
type Props = {
  title: string;
  description: string;
};

export function EmptyState({ title, description }: Props) {
  return (
    <section>
      <h2>{title}</h2>
      <p>{description}</p>
    </section>
  );
}
```

Публичный экспорт:

```ts
export { EmptyState } from "./EmptyState";
```

Shared-компонент не должен знать про конкретные группы или события.

---

## Как подключить настоящий backend

Сейчас данные импортируются так:

```ts
import { groups } from "../entities/archive";
```

В будущем нужно:

1. создать API-клиент;
2. отправлять Telegram `initData` backend;
3. получать группы пользователя;
4. хранить данные в состоянии;
5. показывать loading и error состояния.

Пример будущего API-клиента:

```text
src/shared/api/client.ts
```

```ts
export async function apiRequest(path: string, options?: RequestInit) {
  const initData = window.Telegram?.WebApp?.initData;

  return fetch(`/api${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `tma ${initData}`,
      ...options?.headers,
    },
  });
}
```

После этого в `entities/archive` можно добавить запросы групп и событий.

---

## Что пока является заглушкой

Сейчас не реализованы:

- настоящая Telegram-авторизация;
- проверка приглашения;
- сохранение вступления в группу;
- загрузка фото и видео;
- воспроизведение видео;
- отправка медиа;
- создание событий;
- выбор месяца календаря;
- настройки профиля;
- backend API;
- база данных для архива;
- настоящие права доступа.

Кнопки этих действий сейчас нужны только для демонстрации интерфейса.

---

## Частые вопросы

### Почему приложение работает в браузере без Telegram?

Код использует optional chaining:

```ts
window.Telegram?.WebApp
```

Если Telegram API отсутствует, приложение не падает и использует тестовое имя.

### Почему нельзя доверять `initDataUnsafe`?

Потому что данные на frontend можно изменить вручную.

Для авторизации backend должен проверять подписанную строку:

```ts
window.Telegram.WebApp.initData
```

### Почему страницы получают много callbacks?

Потому что глобальное состояние пока находится в `App`.

Страница сообщает о действии:

```ts
onOpenEvent(event)
```

но сама не решает, как устроена глобальная навигация.

Для текущего размера это прозрачно. Позже можно подключить React Router и state manager.

### Почему mock-данные находятся в `entities`, а не в `pages`?

Потому что группы и события являются сущностями предметной области и используются несколькими страницами.

### Почему `SheetModal` находится в `shared`, а `JoinGroupModal` в `features`?

`SheetModal` ничего не знает про приглашения. Это универсальный каркас.

`JoinGroupModal` реализует конкретное пользовательское действие: вступление в группу.

---

## Рекомендуемый порядок изучения проекта

Если хочешь разобраться без хаоса, открывай файлы в таком порядке:

1. `src/main.tsx`
2. `src/app/App.tsx`
3. `src/entities/archive/model/types.ts`
4. `src/entities/archive/model/mock-data.ts`
5. `src/pages/groups/ui/GroupsPage.tsx`
6. `src/entities/archive/ui/GroupListItem.tsx`
7. `src/pages/event/ui/EventPage.tsx`
8. `src/entities/archive/ui/MediaGallery.tsx`
9. `src/features/join-group/ui/JoinGroupModal.tsx`
10. `src/shared/ui/sheet-modal/SheetModal.tsx`
11. `src/shared/lib/telegram.ts`
12. `src/app/styles/index.css`

После этого станет понятно:

- откуда берутся данные;
- кто хранит состояние;
- как страницы вызывают переходы;
- чем feature отличается от shared-компонента;
- как Telegram подключён к React.

---

## Главное правило проекта

Перед созданием нового компонента задай вопрос:

```text
Это конкретный экран?
→ pages

Это крупный самостоятельный блок?
→ widgets

Это пользовательское действие?
→ features

Это отображение группы, события или медиа?
→ entities/archive

Это универсальная кнопка, модалка или helper?
→ shared

Это запуск и сборка всего приложения?
→ app
```

Если придерживаться этого правила, проект останется понятным даже после подключения backend, загрузки файлов и настоящей авторизации.
