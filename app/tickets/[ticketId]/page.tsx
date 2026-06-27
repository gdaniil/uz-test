import type { Viewport } from "next";
import { TicketOpenScreen } from "./TicketOpenScreen";

export const viewport: Viewport = {
  themeColor: "#eff1f6",
};

export default function OpenTicketPage() {
  return (
    <main className="stage">
      <section className="phone ticket-open-phone" aria-label="Відкритий квиток">
        <TicketOpenScreen />
      </section>
    </main>
  );
}
