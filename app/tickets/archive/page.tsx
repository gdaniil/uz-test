import { BottomNav } from "../../components/BottomNav";
import { ArchiveScreen } from "./ArchiveScreen";

export default function TicketsArchivePage() {
  return (
    <main className="stage">
      <section className="phone" aria-label="Архів квитків">
        <ArchiveScreen />
        <BottomNav active="tickets" />
      </section>
    </main>
  );
}
