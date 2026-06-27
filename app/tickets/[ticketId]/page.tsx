import { TicketOpenScreen } from "./TicketOpenScreen";

export default function OpenTicketPage() {
  return (
    <main className="stage">
      <section className="phone ticket-open-phone" aria-label="Відкритий квиток">
        <TicketOpenScreen />
      </section>
    </main>
  );
}
