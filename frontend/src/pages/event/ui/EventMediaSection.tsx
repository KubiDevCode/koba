import { Plus } from "lucide-react";
import type { ArchiveEvent, Media } from "../../../entities/archive";
import { MediaGallery } from "../../../entities/archive";
import { SectionHeading } from "../../../shared/ui/section-heading";

type Props = {
  event: ArchiveEvent;
  onOpenMedia: (media: Media) => void;
};

export function EventMediaSection({ event, onOpenMedia }: Props) {
  return (
    <section className="px-4 pb-6">
      <SectionHeading
        eyebrow="Общий архив"
        title="Фото и видео"
        action={
          <button
            type="button"
            className="inline-flex items-center gap-1 rounded-lg bg-slate-900 px-3 py-2 text-xs font-extrabold text-white"
          >
            <Plus size={18} />
            Добавить
          </button>
        }
      />
      <MediaGallery media={event.media} onOpenMedia={onOpenMedia} />
    </section>
  );
}
