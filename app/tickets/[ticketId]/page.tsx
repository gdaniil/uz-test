import type { Viewport } from "next";
import { TicketOpenScreen } from "./TicketOpenScreen";

export const viewport: Viewport = {
  themeColor: "#eff1f6",
};

type OpenTicketPageProps = {
  params: Promise<{ ticketId: string }>;
};

export default async function OpenTicketPage({ params }: OpenTicketPageProps) {
  const { ticketId } = await params;

  return (
    <main className="stage">
      <section className="phone ticket-open-phone" aria-label="Відкритий квиток">
        <TicketOpenScreen ticketId={ticketId} />
      </section>
    </main>
  );
}
