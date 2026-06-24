type Props = {
  loading: boolean;
  error: string | null;
  userId: number | undefined;
};

export function DataStatus({ loading, error, userId }: Props) {
  if (!userId) {
    return (
      <section className="px-4 pb-4">
        <p className="rounded-lg bg-white p-3 text-sm text-slate-500">
          Локальный режим: используются моковые данные.
        </p>
      </section>
    );
  }

  if (loading) {
    return (
      <section className="px-4 pb-4">
        <p className="rounded-lg bg-white p-3 text-sm text-slate-500">
          Загружаем данные...
        </p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="px-4 pb-4">
        <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>
      </section>
    );
  }

  return null;
}
