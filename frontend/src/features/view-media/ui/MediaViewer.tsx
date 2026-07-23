import { Image, MoreHorizontal, Play, Send, Video, X } from "lucide-react";
import type { ReactNode } from "react";
import type { ArchiveEvent, Media } from "../../../entities/archive";

type Props = {
  event: ArchiveEvent | null;
  media: Media | null;
  onClose: () => void;
};

export function MediaViewer({ event, media, onClose }: Props) {
  if (!event || !media) return null;

  const mediaType = media.type === "video" ? "Видео" : "Фото";

  return (
    <div
      className="fixed inset-0 z-40 grid place-items-center bg-slate-950"
      onClick={onClose}
    >
      <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between bg-gradient-to-b from-black/75 to-transparent p-4 text-white">
        <button
          type="button"
          onClick={onClose}
          aria-label="Закрыть"
          className="grid h-9 w-9 place-items-center"
        >
          <X size={21} />
        </button>
        <span className="text-xs font-bold">
          {mediaType} · {event.title}
        </span>
        <button
          type="button"
          aria-label="Меню"
          className="grid h-9 w-9 place-items-center"
          onClick={(event) => event.stopPropagation()}
        >
          <MoreHorizontal size={21} />
        </button>
      </div>

      <img className="max-h-[75vh] w-full object-contain" src={media.src} alt="" />

      {media.type === "video" && (
        <button
          type="button"
          className="absolute grid h-16 w-16 place-items-center rounded-full bg-red-600 text-white"
          aria-label="Воспроизвести"
          onClick={(event) => event.stopPropagation()}
        >
          <Play size={26} fill="currentColor" />
        </button>
      )}

      <div className="absolute inset-x-0 bottom-0 z-10 flex justify-around bg-gradient-to-t from-black/85 to-transparent px-3 py-6 text-white">
        <ViewerAction icon={<Image size={18} />} label="В альбом" />
        <ViewerAction icon={<Send size={18} />} label="Поделиться" />
        <ViewerAction icon={<Video size={18} />} label="Оригинал" />
      </div>
    </div>
  );
}

function ViewerAction({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <button
      type="button"
      className="flex items-center gap-1 bg-transparent text-[10px] font-bold"
      onClick={(event) => event.stopPropagation()}
    >
      {icon}
      {label}
    </button>
  );
}
