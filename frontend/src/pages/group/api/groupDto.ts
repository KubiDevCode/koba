export type BackendUser = {
    id: string;
    firstName: string | null;
    username: string | null;
};

export type BackendEvent = {
    id: string;
    title: string;
    description: string | null;
    date: string;
    users: BackendUser[];
};

export type BackendChat = {
    id: string;
    title: string | null;
    users: BackendUser[];
    events: BackendEvent[];
};
