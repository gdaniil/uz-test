import { BottomNav } from "../components/BottomNav";
import { TicketsScreen } from "./TicketsScreen";

export default function TicketsPage() {
  return (
    <main className="stage">
      <section className="phone" aria-label="Придбані квитки">
        <TicketsScreen />
        <BottomNav active="tickets" />
      </section>
    </main>
  );
}
