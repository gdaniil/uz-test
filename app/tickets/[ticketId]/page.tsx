import { TicketOpenScreen } from "./TicketOpenScreen";

type OpenTicketPageProps = {
  params: Promise<{ ticketId: string }>;
};

export default async function OpenTicketPage({ params }: OpenTicketPageProps) {
  const { ticketId } = await params;

  return (
    <>
      {/* iOS 26 Safari reads the topmost position:fixed element's background for the status bar tint */}
      <div aria-hidden="true" style={{ position: "fixed", top: 0, left: 0, right: 0, height: "max(env(safe-area-inset-top), 6px)", background: "#eff1f6", zIndex: 9999, pointerEvents: "none" }} />
      <main className="stage">
        <section className="phone ticket-open-phone" aria-label="Відкритий квиток">
          <TicketOpenScreen ticketId={ticketId} />
        </section>
      </main>
    </>
  );
}
