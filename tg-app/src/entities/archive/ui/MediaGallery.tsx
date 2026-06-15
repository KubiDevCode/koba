import { Play } from "lucide-react";
import type { Media } from "../model/types";

type Props = {
  media: Media[];
  onOpenMedia: (media: Media) => void;
};

export function MediaGallery({ media, onOpenMedia }: Props) {
  return (
    <div className="gallery-grid">
      {media.map((item) => (
        <button
          className="media-tile"
          key={item.id}
          onClick={() => onOpenMedia(item)}
        >
          <img src={item.src} alt="" />
          {item.type === "video" && (
            <span className="video-mark">
              <Play size={14} fill="currentColor" />
              {item.duration}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
