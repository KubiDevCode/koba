import type { Group, Media, Participant } from "../../../entities/archive";

const fortniteCover =
    "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=85";
const weekendCover =
    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=85";
const avatar =
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=85";

const participants: Participant[] = [
    { id: 1, name: "kubiDev", avatar },
    { id: 2, name: "Septospace", avatar },
    { id: 3, name: "Y0ldar", avatar },
    { id: 4, name: "electchem", avatar },
];

const fortniteMedia: Media[] = [
    { id: 1, type: "photo", src: fortniteCover },
    {
        id: 2,
        type: "video",
        duration: "0:42",
        src: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?auto=format&fit=crop&w=900&q=85",
    },
    {
        id: 3,
        type: "photo",
        src: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=900&q=85",
    },
];

const weekendMedia: Media[] = [
    { id: 4, type: "photo", src: weekendCover },
    {
        id: 5,
        type: "video",
        duration: "1:08",
        src: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=900&q=85",
    },
];

export const debugGroups: Group[] = [
    {
        id: 1001,
        name: "Фортнайт",
        members: 15,
        role: "Участник",
        cover: fortniteCover,
        avatar,
        events: [
            {
                id: 2001,
                groupId: 1001,
                title: "Вечерний сквад",
                date: "22 июня 2026",
                shortDate: "22 июн.",
                time: "20:30",
                location: "Фортнайт",
                description:
                    "Локальное моковое событие для проверки карточек, участников и галереи без Telegram.",
                cover: fortniteCover,
                media: fortniteMedia,
                participants,
            },
            {
                id: 2002,
                groupId: 1001,
                title: "Лучшие моменты недели",
                date: "18 июня 2026",
                shortDate: "18 июн.",
                time: "19:00",
                location: "Фортнайт",
                description:
                    "Второе событие в группе, чтобы проверить список событий и переходы.",
                cover: weekendCover,
                media: weekendMedia,
                participants: participants.slice(0, 3),
            },
        ],
    },
    {
        id: 1002,
        name: "Лето на даче",
        members: 8,
        role: "По приглашению",
        cover: weekendCover,
        avatar,
        events: [
            {
                id: 2003,
                groupId: 1002,
                title: "Шашлыки и настолки",
                date: "25 июня 2026",
                shortDate: "25 июн.",
                time: "17:00",
                location: "Лето на даче",
                description:
                    "Моковое событие из другой группы для проверки календаря и профиля.",
                cover: weekendCover,
                media: weekendMedia,
                participants: participants.slice(0, 2),
            },
        ],
    },
];
