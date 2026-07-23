import { Plus } from "lucide-react";
import type { ArchiveEvent } from "../../../entities/archive";
import { MediaGallery, useArchiveUiStore } from "../../../entities/archive";
import { SectionHeading } from "../../../shared/ui/section-heading";

type Props = {
  event: ArchiveEvent;
};

export function EventMediaSection({ event }: Props) {
  const openMedia = useArchiveUiStore((state) => state.openMedia);

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
      <MediaGallery
        media={event.media}
        onOpenMedia={(media) => openMedia(event.id, media.id)}
      />
    </section>
  );
}
