type Props = {
  title: string;
  onBack: () => void;
};

export function EmptyState({ title, onBack }: Props) {
  return (
    <section className="px-4 py-8">
      <div className="rounded-lg bg-white p-5">
        <h2 className="text-lg font-extrabold text-slate-950">{title}</h2>
        <button
          type="button"
          className="mt-4 text-sm font-extrabold text-red-600"
          onClick={onBack}
        >
          Назад
        </button>
      </div>
    </section>
  );
}
