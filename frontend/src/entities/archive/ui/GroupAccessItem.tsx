import { LockKeyhole } from "lucide-react";
import type { Group } from "../model/types";

type Props = {
  group: Group;
  onClick: () => void;
};

export function GroupAccessItem({ group, onClick }: Props) {
  return (
    <button onClick={onClick}>
      <img src={group.avatar} alt="" />
      <span>
        <strong>{group.name}</strong>
        <small>{group.role}</small>
      </span>
      <LockKeyhole size={17} />
    </button>
  );
}
