export type Media = {
  id: number;
  type: "photo" | "video";
  src: string;
  duration?: string;
};

export type Participant = {
  id: number;
  name: string;
  avatar: string;
};

export type ArchiveEvent = {
  id: number;
  title: string;
  date: string;
  shortDate: string;
  time: string;
  location: string;
  description: string;
  cover: string;
  media: Media[];
  participants: Participant[];
};

export type Group = {
  id: number;
  name: string;
  members: number;
  role: "Участник" | "По приглашению";
  cover: string;
  avatar: string;
  events: ArchiveEvent[];
};

export type EventWithGroup = ArchiveEvent & {
  group: Group;
};
