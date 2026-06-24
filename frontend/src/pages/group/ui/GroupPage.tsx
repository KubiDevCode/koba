import type { ArchiveEvent, Group } from "../../../entities/archive";
import { GroupEventsSection } from "./GroupEventsSection";
import { GroupHero } from "./GroupHero";

type Props = {
  group: Group;
  onBack: () => void;
  onOpenEvent: (event: ArchiveEvent) => void;
};

export function GroupPage({ group, onBack, onOpenEvent }: Props) {
  return (
    <>
      <GroupHero group={group} onBack={onBack} />
      <GroupEventsSection group={group} onOpenEvent={onOpenEvent} />
    </>
  );
}
