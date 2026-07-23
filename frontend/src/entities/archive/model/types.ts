export type Media = {
  id: string;
  type: "photo" | "video";
  src: string;
  duration?: string;
  embedUrl?: string;
  watchUrl?: string;
  thumbnailUrl?: string | null;
  youtubeVideoId?: string;
  title?: string;
};

export type Participant = {
  id: string;
  name: string;
  avatar: string;
};

export type ArchiveEvent = {
  id: string;
  groupId: number;
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
