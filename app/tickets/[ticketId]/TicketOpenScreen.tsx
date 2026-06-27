"use client";

import Link from "next/link";
import { MoreVertical, Plus, X } from "lucide-react";
import { useState } from "react";

type OpenTicket = {
  id: string;
  passenger: string;
  initials: string;
  passengerType: string;
  car: string;
  seat: string;
  track: string;
  seatDetails: string;
};

const OPEN_TICKETS: OpenTicket[] = [
  {
    id: "rk-44",
    passenger: "Реншейн-Горбунов Костянтин",
    initials: "РК",
    passengerType: "Пасажир · Студентський",
    car: "Вагон 8",
    seat: "Місце 44",
    track: "Колія 11",
    seatDetails: "Купе 2 · Місце 44 · Нижнє",
  },
  {
    id: "op-33",
    passenger: "Олійник Поліна",
    initials: "ОП",
    passengerType: "Пасажир · Повний",
    car: "Вагон 8",
    seat: "Місце 33",
    track: "Колія 11",
    seatDetails: "Купе 2 · Місце 33 · Верхнє",
  },
];

const upperSeats = [
  { n: "1", x: 0, y: 16 },
  { n: "2", x: 52, y: 16 },
  { n: "5", x: 110, y: 16 },
  { n: "6", x: 162, y: 16 },
  { n: "9", x: 220, y: 16 },
  { n: "10", x: 272, y: 16 },
  { n: "3", x: 0, y: 66, shelf: true },
  { n: "4", x: 52, y: 66, shelf: true },
  { n: "33", x: 110, y: 66, shelf: true },
  { n: "44", x: 162, y: 66, shelf: true },
  { n: "11", x: 220, y: 66, shelf: true },
  { n: "12", x: 272, y: 66, shelf: true },
];

const lowerSeats = [
  { n: "1", x: 0 },
  { n: "4", x: 52, shelf: true },
  { n: "1", x: 110 },
  { n: "4", x: 162, shelf: true },
  { n: "1", x: 220 },
  { n: "4", x: 272, shelf: true },
];

function Header({ activeIndex, total, onSelect }: { activeIndex: number; total: number; onSelect: (index: number) => void }) {
  return (
    <div className="ticket-open-header">
      <div className="ticket-open-top-fade" />
      <div className="ticket-open-nav">
        <Link className="ticket-close-btn" href="/tickets" aria-label="Назад до квитків">
          <X size={28} strokeWidth={2.1} />
        </Link>
        <div className="ticket-open-dots" aria-label={`${activeIndex + 1} з ${total} квитків`}>
          {Array.from({ length: total }, (_, index) => (
            <button
              key={index}
              className={index === activeIndex ? "active" : ""}
              type="button"
              aria-label={`Показати квиток ${index + 1}`}
              aria-current={index === activeIndex ? "true" : undefined}
              onClick={() => onSelect(index)}
            />
          ))}
        </div>
        <div className="ticket-open-nav-spacer" />
      </div>
    </div>
  );
}

function TicketSummary() {
  return (
    <section className="open-ticket-summary" aria-label="Маршрут">
      <h1>116K · 22 жовтня</h1>
      <p>Київ → Жмеринка</p>
      <p>15:17 – 21:08, в дорозі 5 год 51 хв</p>
    </section>
  );
}

function QrCard({ ticket }: { ticket: OpenTicket }) {
  return (
    <section className="open-ticket-card qr-card" aria-label="Посадковий QR-квиток">
      <p className="ticket-card-caption">Посадковий QR-квиток</p>
      <img className="ticket-qr-img" src="/icons/open-ticket-qr.png" alt="QR-код квитка" />
      <div className="ticket-chips">
        <span>{ticket.car}</span>
        <span>{ticket.seat}</span>
        <span>{ticket.track}</span>
      </div>
    </section>
  );
}

function PassengerCard({ ticket }: { ticket: OpenTicket }) {
  return (
    <section className="open-ticket-card passenger-card" aria-label="Пасажир">
      <div className="passenger-main">
        <div className="open-ticket-avatar">{ticket.initials}</div>
        <div>
          <strong>{ticket.passenger}</strong>
          <span>{ticket.passengerType}</span>
        </div>
      </div>
      <div className="open-ticket-divider" />
      <div className="service-pills">
        <button type="button">Постіль</button>
        <button type="button">Дріп кава</button>
        <button className="more-service" type="button">
          <Plus size={16} strokeWidth={2.4} />
          Ще
        </button>
      </div>
    </section>
  );
}

function Seat({ n, x, y = 6, shelf, selected }: { n: string; x: number; y?: number; shelf?: boolean; selected?: boolean }) {
  return (
    <div className={`wagon-seat${shelf ? " shelf" : ""}${selected ? " selected" : ""}`} style={{ left: x, top: y }}>
      <span>{n}</span>
    </div>
  );
}

function WagonScheme({ ticket }: { ticket: OpenTicket }) {
  const selectedSeat = ticket.seat.replace("Місце ", "");

  return (
    <section className="open-ticket-card seat-card" aria-label="Місце у вагоні">
      <div className="seat-card-head">
        <span>Ваше місце</span>
        <strong>{ticket.seatDetails}</strong>
      </div>
      <div className="open-ticket-divider full" />
      <div className="wagon-scroll" aria-hidden>
        <div className="wagon-map">
          <div className="wagon-divider d1 top" />
          <div className="wagon-divider d2 top" />
          <div className="wagon-divider d1 bottom" />
          <div className="wagon-divider d2 bottom" />
          {upperSeats.map((seat) => (
            <Seat key={`${seat.n}-${seat.x}-${seat.y}`} {...seat} selected={seat.n === selectedSeat} />
          ))}
          {lowerSeats.map((seat) => (
            <Seat key={`lower-${seat.n}-${seat.x}`} {...seat} y={144} />
          ))}
        </div>
      </div>
    </section>
  );
}

function WalletBar() {
  return (
    <div className="ticket-open-footer">
      <div className="ticket-open-bottom-fade" />
      <div className="ticket-wallet-actions">
        <button className="wallet-btn" type="button">
          <img src="/icons/apple-wallet.png" alt="" />
          Додати в Wallet
        </button>
        <button className="ticket-more-btn" type="button" aria-label="Більше дій">
          <MoreVertical size={22} strokeWidth={2.3} />
        </button>
      </div>
      <div className="ticket-home-indicator" aria-hidden />
    </div>
  );
}

export function TicketOpenScreen() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const activeTicket = OPEN_TICKETS[activeIndex];

  function showPreviousTicket() {
    setActiveIndex((index) => Math.max(0, index - 1));
  }

  function showNextTicket() {
    setActiveIndex((index) => Math.min(OPEN_TICKETS.length - 1, index + 1));
  }

  function handleTouchEnd(event: React.TouchEvent<HTMLDivElement>) {
    if (!touchStart) return;

    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - touchStart.x;
    const deltaY = touch.clientY - touchStart.y;

    setTouchStart(null);

    if (Math.abs(deltaX) < 48 || Math.abs(deltaX) < Math.abs(deltaY) * 1.2) return;

    if (deltaX < 0) {
      showNextTicket();
    } else {
      showPreviousTicket();
    }
  }

  return (
    <div className="ticket-open-page">
      <div
        key={activeTicket.id}
        className="ticket-open-scroll"
        onTouchStart={(event) => setTouchStart({ x: event.touches[0].clientX, y: event.touches[0].clientY })}
        onTouchEnd={handleTouchEnd}
      >
        <TicketSummary />
        <QrCard ticket={activeTicket} />
        <PassengerCard ticket={activeTicket} />
        <WagonScheme ticket={activeTicket} />
      </div>
      <Header activeIndex={activeIndex} total={OPEN_TICKETS.length} onSelect={setActiveIndex} />
      <WalletBar />
    </div>
  );
}
