import { Grid2X2 } from "lucide-react";
import type { EventWithGroup } from "../model/types";

type Props = {
  event: EventWithGroup;
  onClick: () => void;
};

export function EventPreviewCard({ event, onClick }: Props) {
  return (
    <button className="event-card" onClick={onClick}>
      <img src={event.cover} alt="" />
      <span className="event-date">{event.shortDate}</span>
      <span className="event-card-copy">
        <strong>{event.title}</strong>
        <span>
          {event.group.name} · <Grid2X2 size={8} /> {event.media.length}
        </span>
      </span>
    </button>
  );
}
