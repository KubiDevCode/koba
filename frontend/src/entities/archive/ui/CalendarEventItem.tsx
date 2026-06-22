import type { EventWithGroup } from "../model/types";

type Props = {
  event: EventWithGroup;
  onClick: () => void;
};

export function CalendarEventItem({ event, onClick }: Props) {
  const [day, month] = event.shortDate.split(" ");

  return (
    <button className="calendar-event" onClick={onClick}>
      <span className="calendar-line" />
      <span className="calendar-date">
        <strong>{day}</strong>
        <span>{month}</span>
      </span>
      <img src={event.cover} alt="" />
      <span className="calendar-copy">
        <span>{event.group.name}</span>
        <strong>{event.title}</strong>
        <small>{event.time} · {event.location}</small>
      </span>
    </button>
  );
}
