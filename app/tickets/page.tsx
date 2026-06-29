import { BottomNav } from "../components/BottomNav";
import { TicketsScreen } from "./TicketsScreen";

type Props = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function first(value: string | string[] | undefined) {
  if (Array.isArray(value)) return value[0];
  return value;
}

export default async function TicketsPage({ searchParams }: Props) {
  const params = (await searchParams) ?? {};
  const showSuccessToast = first(params.payment) === "success";

  return (
    <main className="stage">
      <section className="phone" aria-label="Придбані квитки">
        <TicketsScreen showSuccessToast={showSuccessToast} />
        <BottomNav active="tickets" />
      </section>
    </main>
  );
}
