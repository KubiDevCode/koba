export type BackendUser = {
  id: string;
  firstName: string | null;
  username: string | null;
};

export type BackendMedia = {
  id: string;
  type: "photo" | "video";
  src: string;
  duration?: string;
};

export type BackendEvent = {
  id: string;
  title: string;
  description: string | null;
  date: string;
  users: BackendUser[];
  photos?: BackendMedia[];
};

export type BackendChat = {
  id: string;
  title: string | null;
  avatar: string | null;
  users: BackendUser[];
  events: BackendEvent[];
};

export type BackendEventWithChat = BackendEvent & {
  chat: Pick<BackendChat, "id" | "title" | "users">;
};

export type BackendEventPhotosResponse = {
  photos: BackendMedia[];
};
