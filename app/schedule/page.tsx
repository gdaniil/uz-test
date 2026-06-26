import { BottomNav } from "../components/BottomNav";
import { ScheduleScreen } from "./ScheduleScreen";

export default function SchedulePage() {
  return (
    <main className="stage">
      <section className="phone" aria-label="Табло">
        <ScheduleScreen />
        <BottomNav active="schedule" />
      </section>
    </main>
  );
}
