import { Play } from "lucide-react";
import type { Media } from "../model/types";

type Props = {
  media: Media[];
  onOpenMedia: (media: Media) => void;
};

export function MediaGallery({ media, onOpenMedia }: Props) {
  return (
    <div className="grid grid-cols-3 gap-1 sm:grid-cols-4">
      {media.map((item) => (
        <button
          type="button"
          className="relative aspect-square overflow-hidden rounded bg-slate-200"
          key={item.id}
          onClick={() => onOpenMedia(item)}
        >
          <img className="h-full w-full object-cover" src={item.src} alt="" />
          {item.type === "video" && (
            <span className="absolute bottom-1 right-1 inline-flex items-center gap-1 rounded bg-slate-950/65 px-1.5 py-1 text-[9px] font-extrabold text-white">
              <Play size={12} fill="currentColor" />
              {item.duration}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
