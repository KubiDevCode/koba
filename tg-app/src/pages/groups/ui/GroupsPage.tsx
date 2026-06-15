import { Camera, Plus, Search } from "lucide-react";
import { useMemo, useState } from "react";
import {
  EventPreviewCard,
  GroupListItem,
  type EventWithGroup,
  type Group,
} from "../../../entities/archive";
import { IconButton } from "../../../shared/ui/icon-button";
import { PageHeader } from "../../../shared/ui/page-header";
import { SectionHeading } from "../../../shared/ui/section-heading";

type Props = {
  userName: string;
  groups: Group[];
  events: EventWithGroup[];
  onOpenGroup: (group: Group) => void;
  onOpenEvent: (event: EventWithGroup) => void;
  onOpenInvite: () => void;
  onOpenProfile: () => void;
  onOpenCalendar: () => void;
};

export function GroupsPage({
  userName,
  groups,
  events,
  onOpenGroup,
  onOpenEvent,
  onOpenInvite,
  onOpenProfile,
  onOpenCalendar,
}: Props) {
  const [query, setQuery] = useState("");
  const filteredGroups = useMemo(
    () => groups.filter((group) => group.name.toLowerCase().includes(query.toLowerCase())),
    [groups, query],
  );

  return (
    <>
      <PageHeader
        home
        eyebrow="Видеоархив"
        title={<>Привет, {userName}</>}
        action={
          <button
            className="avatar-button"
            onClick={onOpenProfile}
            aria-label="Профиль"
          >
            {userName.slice(0, 1)}
          </button>
        }
      />

      <ArchiveIntro />

      <section className="section-block">
        <SectionHeading
          eyebrow="Ваш доступ"
          title="Группы"
          action={
            <IconButton label="Вступить по приглашению" onClick={onOpenInvite}>
              <Plus size={20} />
            </IconButton>
          }
        />

        <label className="search-field">
          <Search size={18} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Найти группу"
          />
        </label>

        <div className="group-list">
          {filteredGroups.map((group) => (
            <GroupListItem
              key={group.id}
              group={group}
              onClick={() => onOpenGroup(group)}
            />
          ))}
        </div>
      </section>

      <section className="section-block">
        <SectionHeading
          compact
          eyebrow="Скоро"
          title="Ближайшие события"
          action={
            <button className="text-button" onClick={onOpenCalendar}>
              Все
            </button>
          }
        />
        <div className="event-strip">
          {events.slice(0, 3).map((event) => (
            <EventPreviewCard
              key={event.id}
              event={event}
              onClick={() => onOpenEvent(event)}
            />
          ))}
        </div>
      </section>
    </>
  );
}

function ArchiveIntro() {
  return (
    <section className="intro-band">
      <div className="intro-copy">
        <span className="intro-label">
          <Camera size={15} />
          Всё важное вместе
        </span>
        <h2>Моменты вашей компании</h2>
        <p>Фото и видео разложены по группам, событиям и датам.</p>
      </div>
      <div className="intro-stats">
        <strong>74</strong>
        <span>новых медиа</span>
      </div>
    </section>
  );
}
