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

      <section className="section-block">
        <SectionHeading
          eyebrow="Разрешения"
          title="Доступные группы"
          action={<strong>{groups.length}</strong>}
        />
        <div className="access-list">
          {groups.map((group) => (
            <GroupAccessItem
              key={group.id}
              group={group}
              onClick={() => onOpenGroup(group)}
            />
          ))}
        </div>
        <button className="invite-wide" onClick={onOpenInvite}>
          <Link2 size={18} />
          Вступить по приглашению
        </button>
      </section>
    </>
  );
}

function ProfileSummary({ userName }: { userName: string }) {
  return (
    <section className="profile-band">
      <div className="profile-avatar">{userName.slice(0, 1)}</div>
      <div>
        <h2>{userName}</h2>
        <p>Идентифицирован через Telegram</p>
      </div>
      <span className="verified">
        <Check size={15} />
      </span>
    </section>
  );
}
