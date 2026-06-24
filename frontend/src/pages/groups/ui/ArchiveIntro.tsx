import { Camera } from "lucide-react";

export function ArchiveIntro() {
  return (
    <section className="mx-3 mb-6 flex min-h-44 items-end justify-between gap-5 rounded-lg bg-slate-900 p-5 text-white">
      <div className="max-w-[70%]">
        <span className="mb-5 inline-flex items-center gap-2 text-[11px] font-extrabold uppercase text-slate-300">
          <Camera size={15} />
          Все важное вместе
        </span>
        <h2 className="mb-2 max-w-72 text-3xl font-extrabold leading-tight">
          Моменты вашей компании
        </h2>
        <p className="text-xs leading-5 text-slate-300">
          Фото и видео разложены по группам, событиям и датам.
        </p>
      </div>
      <div className="min-w-18 border-l border-white/25 pl-4">
        <strong className="block text-3xl font-extrabold text-amber-400">
          74
        </strong>
        <span className="text-[10px] text-slate-300">новых медиа</span>
      </div>
    </section>
  );
}
