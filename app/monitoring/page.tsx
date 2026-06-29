import { MonitoringScreen } from "./MonitoringScreen";

export default function MonitoringPage() {
  return (
    <main className="stage">
      <section className="phone" aria-label="Відстежуються місця">
        <MonitoringScreen />
      </section>
    </main>
  );
}
