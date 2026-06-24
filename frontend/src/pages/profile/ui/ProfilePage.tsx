import { Check, Link2, Settings } from "lucide-react";
import { GroupAccessItem, type Group } from "../../../entities/archive";
import { IconButton } from "../../../shared/ui/icon-button";
import { PageHeader } from "../../../shared/ui/page-header";
import { SectionHeading } from "../../../shared/ui/section-heading";

type Props = {
  userName: string;
  groups: Group[];
  onOpenGroup: (group: Group) => void;
  onOpenInvite: () => void;
};

export function ProfilePage({
  userName,
  groups,
  onOpenGroup,
  onOpenInvite,
}: Props) {
  return (
    <>
      <PageHeader
        eyebrow="Telegram профиль"
        title="Ваш доступ"
        action={
          <IconButton label="Настройки">
            <Settings size={19} />
          </IconButton>
        }
      />

      <ProfileSummary userName={userName} />

      <section className="px-4 pb-6">
        <SectionHeading
          eyebrow="Разрешения"
          title="Доступные группы"
          action={<strong className="text-lg font-extrabold">{groups.length}</strong>}
        />
        <div className="grid gap-2">
          {groups.map((group) => (
            <GroupAccessItem
              key={group.id}
              group={group}
              onClick={() => onOpenGroup(group)}
            />
          ))}
        </div>
        <button
          type="button"
          className="mt-3 flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-slate-900 text-sm font-extrabold text-white"
          onClick={onOpenInvite}
        >
          <Link2 size={18} />
          Вступить по приглашению
        </button>
      </section>
    </>
  );
}

function ProfileSummary({ userName }: { userName: string }) {
  return (
    <section className="mx-4 mb-6 flex items-center gap-3 rounded-lg bg-slate-900 p-5 text-white">
      <div className="grid h-14 w-14 place-items-center rounded-full bg-red-500 text-lg font-extrabold">
        {userName.slice(0, 1)}
      </div>
      <div>
        <h2 className="mb-1 text-lg font-extrabold">{userName}</h2>
        <p className="text-xs text-slate-300">Идентифицирован через Telegram</p>
      </div>
      <span className="ml-auto grid h-7 w-7 place-items-center rounded-full bg-emerald-600">
        <Check size={15} />
      </span>
    </section>
  );
}
