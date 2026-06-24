import { Plus, Search } from "lucide-react";
import { GroupListItem, type Group } from "../../../entities/archive";
import { IconButton } from "../../../shared/ui/icon-button";
import { SectionHeading } from "../../../shared/ui/section-heading";

type Props = {
  query: string;
  groups: Group[];
  onQueryChange: (query: string) => void;
  onOpenGroup: (group: Group) => void;
  onOpenInvite: () => void;
};

export function GroupsListSection({
  query,
  groups,
  onQueryChange,
  onOpenGroup,
  onOpenInvite,
}: Props) {
  return (
    <section className="px-4 pb-6">
      <SectionHeading
        eyebrow="Ваш доступ"
        title="Группы"
        action={
          <IconButton label="Вступить по приглашению" onClick={onOpenInvite}>
            <Plus size={20} />
          </IconButton>
        }
      />

      <label className="mb-3 flex h-11 items-center gap-2 rounded-lg bg-slate-200 px-3 text-slate-500">
        <Search size={18} />
        <input
          className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-500"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Найти группу"
        />
      </label>

      <div className="grid gap-2">
        {groups.map((group) => (
          <GroupListItem
            key={group.id}
            group={group}
            onClick={() => onOpenGroup(group)}
          />
        ))}
      </div>
    </section>
  );
}
