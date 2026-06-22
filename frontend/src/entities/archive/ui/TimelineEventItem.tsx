import { Grid2X2, MapPin } from "lucide-react";
import type { ArchiveEvent } from "../model/types";

type Props = {
  event: ArchiveEvent;
  onClick: () => void;
};

export function TimelineEventItem({ event, onClick }: Props) {
  const [day, month] = event.shortDate.split(" ");

  return (
    <button className="timeline-event" onClick={onClick}>
      <span className="date-tile">
        <strong>{day}</strong>
        <span>{month}</span>
      </span>
      <img src={event.cover} alt="" />
      <span className="timeline-copy">
        <strong>{event.title}</strong>
        <span><MapPin size={13} /> {event.location}</span>
        <span><Grid2X2 size={13} /> {event.media.length} медиа</span>
      </span>
    </button>
  );
}
