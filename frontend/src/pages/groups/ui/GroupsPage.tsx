import { useState } from "react";
import type { EventWithGroup, Group } from "../../../entities/archive";
import { PageHeader } from "../../../shared/ui/page-header";
import { ArchiveIntro } from "./ArchiveIntro";
import { GroupsListSection } from "./GroupsListSection";
import { UpcomingEventsSection } from "./UpcomingEventsSection";

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
  const filteredGroups = groups.filter((group) =>
    group.name.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <>
      <PageHeader
        home
        eyebrow="Видеоархив"
        title={<>Привет, {userName}</>}
        action={
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full bg-red-500 text-sm font-extrabold text-white"
            onClick={onOpenProfile}
            aria-label="Профиль"
          >
            {userName.slice(0, 1)}
          </button>
        }
      />

      <ArchiveIntro />

      <GroupsListSection
        query={query}
        groups={filteredGroups}
        onQueryChange={setQuery}
        onOpenGroup={onOpenGroup}
        onOpenInvite={onOpenInvite}
      />

      <UpcomingEventsSection
        events={events}
        onOpenCalendar={onOpenCalendar}
        onOpenEvent={onOpenEvent}
      />
    </>
  );
}
