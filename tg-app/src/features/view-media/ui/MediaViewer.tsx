import { Image, MoreHorizontal, Play, Send, Video, X } from "lucide-react";
import type { ReactNode } from "react";
import type { ArchiveEvent, Media } from "../../../entities/archive";

type Props = {
  event: ArchiveEvent;
  media: Media | null;
  onClose: () => void;
};

export function MediaViewer({ event, media, onClose }: Props) {
  if (!media) return null;

  const mediaType = media.type === "video" ? "Видео" : "Фото";

  return (
    <div className="media-viewer" onClick={onClose}>
      <div className="viewer-top">
        <button onClick={onClose} aria-label="Закрыть">
          <X size={21} />
        </button>
        <span>{mediaType} · {event.title}</span>
        <button aria-label="Меню">
          <MoreHorizontal size={21} />
        </button>
      </div>

      <img src={media.src} alt="" />

      {media.type === "video" && (
        <button className="play-button" aria-label="Воспроизвести">
          <Play size={26} fill="currentColor" />
        </button>
      )}

      <div className="viewer-bottom">
        <ViewerAction icon={<Image size={18} />} label="В альбом" />
        <ViewerAction icon={<Send size={18} />} label="Поделиться" />
        <ViewerAction icon={<Video size={18} />} label="Оригинал" />
      </div>
    </div>
  );
}

function ViewerAction({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <button>
      {icon}
      {label}
    </button>
  );
}
