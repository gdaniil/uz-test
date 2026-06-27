"use client";

import Link from "next/link";
import { Globe2, MoreVertical, Plus, Repeat2, X } from "lucide-react";
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

const STOPS = [
  { station: "Чернігів", times: ["15:17"], stop: "початкова", status: "start" },
  { station: "Ніжин", times: ["15:55", "15:58"], stop: "3 хв", status: "middle" },
  { station: "Роздільна 1", times: ["20:11", "20:14"], stop: "12 хв", status: "middle" },
  { station: "Жмеринка", times: ["21:08", "21:11"], stop: "2 хв", status: "end" },
];

const INFO_BANNERS = [
  {
    id: 1,
    bg: "linear-gradient(173deg, rgba(20,35,20,0.25) 0%, rgba(31,47,46,0.88) 60%)",
    bgImage: "https://images.unsplash.com/photo-1708458664323-a8865bc0f9ca?auto=format&fit=crop&w=800&q=80",
    title: "Спецзамовлення квитків для військових",
    desc: "Ви військовий і маєте терміново їхати у справах, проте всі квитки вже викуплені?",
    pill: "Квитки для військових",
  },
  {
    id: 2,
    bg: "linear-gradient(180deg, rgba(37,3,58,0.45) 0%, rgba(59,16,87,0.9) 100%)",
    bgImage: "https://images.unsplash.com/photo-1561821632-0ac8d40ad4d1?auto=format&fit=crop&w=800&q=80",
    title: "Залізна родина",
    desc: "524 поранених та 582 загиблих — це ціна порятунку мільйонів українців для Укрзалізниці.",
    pill: "Підтримати родини працівників УЗ",
  },
  {
    id: 3,
    bg: "linear-gradient(173deg, rgba(14,63,122,0.5) 0%, rgba(26,96,152,0.85) 60%)",
    bgImage: "https://images.unsplash.com/photo-1603411724506-7dcf41be8673?auto=format&fit=crop&w=800&q=80",
    title: "Залізні друзі",
    desc: "Перетворюйте кожен кілометр залізничної подорожі на «обіймашки» та обмінюйте їх на подарунки від партнерів!",
    pill: "До програми лояльності",
  },
];

function Header({ activeIndex, total, onSelect, isMap }: { activeIndex: number; total: number; onSelect: (index: number) => void; isMap?: boolean }) {
  return (
    <div className={`ticket-open-header${isMap ? " is-map" : ""}`}>
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
        <button className="ticket-open-map-btn" type="button" aria-label="Відкрити карту">
          <Globe2 size={22} strokeWidth={2.1} />
        </button>
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

function TicketLabels() {
  return (
    <div className="info-ticket-labels" aria-hidden>
      <span>116K</span>
      <span>ІС+</span>
    </div>
  );
}

function RouteMiniCard() {
  return (
    <section className="open-ticket-card info-route-card" aria-label="Маршрут поїзда">
      <TicketLabels />
      <div className="info-route-body">
        <div className="info-route-main">
          <div className="info-route-station">
            <strong>15:17</strong>
            <span>Київ</span>
          </div>
          <div className="info-route-line" aria-hidden>
            <span />
            <em>5 год 51 хв</em>
            <span />
          </div>
          <div className="info-route-station right">
            <strong>21:08</strong>
            <span>Жмеринка</span>
          </div>
        </div>
        <div className="info-delay">
          <span />
          Потяг прибуває на 11 колію
        </div>
      </div>
    </section>
  );
}

function TripMap() {
  return (
    <section className="trip-map" aria-label="Карта маршруту Київ — Жмеринка">
      <div className="map-grid" />
      <div className="map-park park-one" />
      <div className="map-park park-two" />
      <div className="map-water water-one" />
      <div className="map-water water-two" />
      <div className="map-road road-one">M 05</div>
      <div className="map-road road-two">E 95</div>
      <svg className="map-route-svg" viewBox="0 0 375 460" aria-hidden>
        <path className="map-route-shadow" d="M92 130 C132 174 157 197 190 233 C221 267 247 312 287 360" />
        <path className="map-route-line" d="M92 130 C132 174 157 197 190 233 C221 267 247 312 287 360" />
      </svg>
      <div className="map-pin map-pin-start">
        <span />
        Київ
      </div>
      <div className="map-pin map-pin-end">
        <span />
        Жмеринка
      </div>
    </section>
  );
}

function ActionIcon({ children }: { children: React.ReactNode }) {
  return <span className="info-action-icon">{children}</span>;
}

function LuggageIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M19 7H5C3.89543 7 3 7.89543 3 9V18C3 19.1046 3.89543 20 5 20H19C20.1046 20 21 19.1046 21 18V9C21 7.89543 20.1046 7 19 7Z" stroke="#213786" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 7V5C8 4.46957 8.21071 3.96086 8.58579 3.58579C8.96086 3.21071 9.46957 3 10 3H14C14.5304 3 15.0391 3.21071 15.4142 3.58579C15.7893 3.96086 16 4.46957 16 5V7" stroke="#213786" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 12V12.01" stroke="#213786" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 13C5.79158 14.4067 8.87403 15.1394 12 15.1394C15.126 15.1394 18.2084 14.4067 21 13" stroke="#213786" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function AssistantIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M11 7C12.1046 7 13 6.10457 13 5C13 3.89543 12.1046 3 11 3C9.89543 3 9 3.89543 9 5C9 6.10457 9.89543 7 11 7Z" stroke="#213786" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11 7V15H15L19 20" stroke="#213786" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11 11H16" stroke="#213786" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7.00001 11.5C6.2835 11.7967 5.64584 12.2561 5.13743 12.8417C4.62902 13.4273 4.26381 14.1231 4.07065 14.8742C3.8775 15.6253 3.8617 16.411 4.02451 17.1692C4.18733 17.9275 4.52428 18.6374 5.00874 19.243C5.4932 19.8486 6.11189 20.3332 6.81589 20.6585C7.51989 20.9837 8.28991 21.1408 9.06507 21.1172C9.84022 21.0937 10.5993 20.8901 11.2822 20.5226C11.9651 20.1552 12.5532 19.6339 13 19" stroke="#213786" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PdfIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M14 3V7C14 7.26522 14.1054 7.51957 14.2929 7.70711C14.4804 7.89464 14.7348 8 15 8H19" stroke="#213786" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M17 21H7C6.46957 21 5.96086 20.7893 5.58579 20.4142C5.21071 20.0391 5 19.5304 5 19V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H14L19 8V19C19 19.5304 18.7893 20.0391 18.4142 20.4142C18.0391 20.7893 17.5304 21 17 21Z" stroke="#213786" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 9H10" stroke="#213786" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 13H15" stroke="#213786" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 17H15" stroke="#213786" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M3 13.9999C3.83 14.6419 5.077 15.0169 6.5 14.9999C7.923 15.0169 9.17 14.6419 10 13.9999C10.83 13.3579 12.077 12.9829 13.5 12.9999C14.923 12.9829 16.17 13.3579 17 13.9999" stroke="#213786" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8.00004 3C7.68355 3.22717 7.42711 3.52797 7.25289 3.87642C7.07866 4.22488 6.99188 4.6105 7.00004 5C6.99188 5.3895 7.07866 5.77512 7.25289 6.12358C7.42711 6.47203 7.68355 6.77283 8.00004 7" stroke="#213786" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 3C11.6835 3.22717 11.4271 3.52797 11.2529 3.87642C11.0787 4.22488 10.9919 4.6105 11 5C10.9919 5.3895 11.0787 5.77512 11.2529 6.12358C11.4271 6.47203 11.6835 6.77283 12 7" stroke="#213786" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 10H17V15C17 16.5913 16.3679 18.1174 15.2426 19.2426C14.1174 20.3679 12.5913 21 11 21H9C7.4087 21 5.88258 20.3679 4.75736 19.2426C3.63214 18.1174 3 16.5913 3 15V10Z" stroke="#213786" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16.7461 16.7259C17.1927 16.931 17.6828 17.0231 18.1734 16.9944C18.6639 16.9656 19.1399 16.8167 19.5595 16.5609C19.9791 16.3051 20.3294 15.9501 20.5796 15.5272C20.8298 15.1043 20.9724 14.6264 20.9946 14.1355C21.0169 13.6446 20.9182 13.1557 20.7073 12.7119C20.4964 12.268 20.1797 11.8828 19.785 11.59C19.3903 11.2973 18.9298 11.1059 18.4438 11.0329C17.9579 10.9598 17.4614 11.0072 16.9981 11.1709" stroke="#213786" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LiveActivityIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M10 6H7C6.46957 6 5.96086 6.21071 5.58579 6.58579C5.21071 6.96086 5 7.46957 5 8V17C5 17.5304 5.21071 18.0391 5.58579 18.4142C5.96086 18.7893 6.46957 19 7 19H16C16.5304 19 17.0391 18.7893 17.4142 18.4142C17.7893 18.0391 18 17.5304 18 17V14" stroke="#2C2A29" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 7C14 7.79565 14.3161 8.55871 14.8787 9.12132C15.4413 9.68393 16.2044 10 17 10C17.7956 10 18.5587 9.68393 19.1213 9.12132C19.6839 8.55871 20 7.79565 20 7C20 6.20435 19.6839 5.44129 19.1213 4.87868C18.5587 4.31607 17.7956 4 17 4C16.2044 4 15.4413 4.31607 14.8787 4.87868C14.3161 5.44129 14 6.20435 14 7Z" stroke="#2C2A29" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TripActions() {
  return (
    <section className="open-ticket-card info-actions" aria-label="Дії з поїздкою">
      <button type="button">
        <ActionIcon><LuggageIcon /></ActionIcon>
        Придбати перевізний
      </button>
      <button type="button">
        <ActionIcon><AssistantIcon /></ActionIcon>
        Замовити вокзального помічника
      </button>
      <button type="button">
        <ActionIcon><PdfIcon /></ActionIcon>
        Показати PDF-квиток
      </button>
      <button type="button">
        <ActionIcon><MenuIcon /></ActionIcon>
        Переглянути меню
      </button>
      <div className="info-actions-divider" />
      <button className="info-action-live" type="button">
        <ActionIcon><LiveActivityIcon /></ActionIcon>
        Live Activity
        <span className="info-toggle" aria-hidden />
      </button>
    </section>
  );
}

function StopsCard() {
  const visibleBeforeLink = STOPS.slice(0, 2);
  const visibleAfterLink = STOPS.slice(2);

  return (
    <section className="open-ticket-card stops-card" aria-label="Станції маршруту">
      <div className="stops-header">
        <span>Маршрут</span>
        <strong>5 год 51 хв ∙ 18 станцій</strong>
      </div>
      <div className="stops-divider" />
      <div className="stops-table">
        <div className="stops-table-head">
          <span>Час</span>
          <span>Станція</span>
          <span>Зупинка</span>
        </div>
        <div className="stops-list stops-list-top">
          {visibleBeforeLink.map((stop) => (
            <div key={stop.station} className={`stop-row ${stop.status}`}>
              <span className="stop-time">
                {stop.times.map((time) => (
                  <span key={time}>{time}</span>
                ))}
              </span>
              <span className={`stop-marker ${stop.status}`} aria-hidden />
              <strong>{stop.station}</strong>
              <span className="stop-duration">{stop.stop}</span>
            </div>
          ))}
        </div>
        <button className="all-stops-btn" type="button">
          <Repeat2 size={24} strokeWidth={2} />
          Всі станції (16)
        </button>
        <div className="stops-list stops-list-bottom">
          {visibleAfterLink.map((stop) => (
            <div key={stop.station} className={`stop-row ${stop.status}`}>
              <span className="stop-time">
                {stop.times.map((time) => (
                  <span key={time}>{time}</span>
                ))}
              </span>
              <span className={`stop-marker ${stop.status}`} aria-hidden />
              <strong>{stop.station}</strong>
              <span className="stop-duration">{stop.stop}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CafeDetailIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden>
      <path d="M20 40C28.7641 40 33.636 40 36.818 36.818C40 33.636 40 28.767 40 20C40 11.233 40 6.36398 36.818 3.18198C33.636 0 28.7641 0 20 0C11.2359 0 6.36398 0 3.18198 3.18198C0 6.36398 0 11.2359 0 20C0 28.7641 0 33.636 3.18198 36.818C6.36398 40 11.2359 40 20 40Z" fill="#D4D5D6" />
      <path d="M11 21.9999C11.83 22.6419 13.077 23.0169 14.5 22.9999C15.923 23.0169 17.17 22.6419 18 21.9999C18.83 21.3579 20.077 20.9829 21.5 20.9999C22.923 20.9829 24.17 21.3579 25 21.9999" stroke="#2C2A29" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 11C15.6835 11.2272 15.4271 11.528 15.2529 11.8764C15.0787 12.2249 14.9919 12.6105 15 13C14.9919 13.3895 15.0787 13.7751 15.2529 14.1236C15.4271 14.472 15.6835 14.7728 16 15" stroke="#2C2A29" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20 11C19.6835 11.2272 19.4271 11.528 19.2529 11.8764C19.0787 12.2249 18.9919 12.6105 19 13C18.9919 13.3895 19.0787 13.7751 19.2529 14.1236C19.4271 14.472 19.6835 14.7728 20 15" stroke="#2C2A29" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11 18H25V23C25 24.5913 24.3679 26.1174 23.2426 27.2426C22.1174 28.3679 20.5913 29 19 29H17C15.4087 29 13.8826 28.3679 12.7574 27.2426C11.6321 26.1174 11 24.5913 11 23V18Z" stroke="#2C2A29" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M24.7461 24.7259C25.1927 24.931 25.6828 25.0231 26.1734 24.9944C26.6639 24.9656 27.1399 24.8167 27.5595 24.5609C27.9791 24.3051 28.3294 23.9501 28.5796 23.5272C28.8298 23.1043 28.9724 22.6264 28.9946 22.1355C29.0169 21.6446 28.9182 21.1557 28.7073 20.7119C28.4964 20.268 28.1797 19.8828 27.785 19.59C27.3903 19.2973 26.9298 19.1059 26.4438 19.0329C25.9579 18.9598 25.4614 19.0072 24.9981 19.1709" stroke="#2C2A29" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ClockDetailIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden>
      <path d="M20 40C28.7641 40 33.636 40 36.818 36.818C40 33.636 40 28.767 40 20C40 11.233 40 6.36398 36.818 3.18198C33.636 0 28.7641 0 20 0C11.2359 0 6.36398 0 3.18198 3.18198C0 6.36398 0 11.2359 0 20C0 28.7641 0 33.636 3.18198 36.818C6.36398 40 11.2359 40 20 40Z" fill="#D4D5D6" />
      <path d="M20 29C24.9706 29 29 24.9706 29 20C29 15.0294 24.9706 11 20 11C15.0294 11 11 15.0294 11 20C11 24.9706 15.0294 29 20 29Z" stroke="#2C2A29" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20 15V20L23 23" stroke="#2C2A29" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function WeatherDetailIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden>
      <path d="M20 40C28.7641 40 33.636 40 36.818 36.818C40 33.636 40 28.767 40 20C40 11.233 40 6.36398 36.818 3.18198C33.636 0 28.7641 0 20 0C11.2359 0 6.36398 0 3.18198 3.18198C0 6.36398 0 11.2359 0 20C0 28.7641 0 33.636 3.18198 36.818C6.36398 40 11.2359 40 20 40Z" fill="#D4D5D6" />
      <path d="M14 25H25C26.933 25 28.5 23.433 28.5 21.5C28.5 19.567 26.933 18 25 18C24.654 18 24.318 18.05 24 18.144C23.465 15.779 21.351 14 18.82 14C15.881 14 13.5 16.381 13.5 19.32C13.5 19.614 13.524 19.902 13.57 20.182C11.832 20.395 10.5 21.876 10.5 23.667C10.5 24.403 11.097 25 11.833 25H14Z" stroke="#2C2A29" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M27 12V10.5" stroke="#2C2A29" strokeWidth="2" strokeLinecap="round" />
      <path d="M31.95 14.05L33.01 12.99" stroke="#2C2A29" strokeWidth="2" strokeLinecap="round" />
      <path d="M34 19H35.5" stroke="#2C2A29" strokeWidth="2" strokeLinecap="round" />
      <path d="M22.05 14.05L20.99 12.99" stroke="#2C2A29" strokeWidth="2" strokeLinecap="round" />
      <path d="M27 15.5C28.933 15.5 30.5 17.067 30.5 19" stroke="#2C2A29" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function DetailRow({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="trip-detail-row">
      <span>{icon}</span>
      <div>
        <strong>{title}</strong>
        <p>{text}</p>
      </div>
    </div>
  );
}

function TripDetails() {
  return (
    <section className="open-ticket-card trip-details" aria-label="Деталі поїздки">
      <DetailRow icon={<CafeDetailIcon />} title="Вагон-ресторан" text="WOG-кафе у 6 вагоні." />
      <DetailRow icon={<ClockDetailIcon />} title="Зміна часового поясу (-1 год)" text="Прибуття у 17:00 по Варшаві (18:00 по Києву)" />
      <DetailRow icon={<WeatherDetailIcon />} title="Погода у Жмеринці" text="+21° без опадів" />
    </section>
  );
}

function InfoBanners() {
  return (
    <section className="info-banners banners-track" aria-label="Корисні пропозиції">
      {INFO_BANNERS.map((banner) => (
        <div
          key={banner.id}
          className="banner-item"
          style={{
            backgroundImage: `${banner.bg}, url(${banner.bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="banner-body">
            <div className="banner-text">
              <p className="banner-title">{banner.title}</p>
              <p className="banner-desc">{banner.desc}</p>
            </div>
            <div className="banner-pill">
              <span>{banner.pill}</span>
              <span aria-hidden>›</span>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

function TripInfoScreen() {
  return (
    <div className="ticket-info-scroll">
      <TripMap />
      <div className="ticket-info-sheet">
        <div className="sheet-grabber" aria-hidden />
        <RouteMiniCard />
        <TripActions />
        <StopsCard />
        <TripDetails />
        <InfoBanners />
      </div>
    </div>
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
    </div>
  );
}

export function TicketOpenScreen() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const totalSlides = OPEN_TICKETS.length + 1;

  function showPreviousTicket() {
    setActiveIndex((index) => Math.max(0, index - 1));
  }

  function showNextTicket() {
    setActiveIndex((index) => Math.min(totalSlides - 1, index + 1));
  }

  function handleTouchStart(event: React.TouchEvent<HTMLDivElement>) {
    setTouchStart({ x: event.touches[0].clientX, y: event.touches[0].clientY });
    setIsDragging(true);
  }

  function handleTouchMove(event: React.TouchEvent<HTMLDivElement>) {
    if (!touchStart) return;

    const touch = event.touches[0];
    const deltaX = touch.clientX - touchStart.x;
    const deltaY = touch.clientY - touchStart.y;
    const isHorizontalSwipe = Math.abs(deltaX) > Math.abs(deltaY) * 1.15;

    if (!isHorizontalSwipe) return;

    const isAtFirstTicket = activeIndex === 0 && deltaX > 0;
    const isAtLastTicket = activeIndex === totalSlides - 1 && deltaX < 0;
    const resistedDelta = deltaX * 0.28;

    setDragOffset(isAtFirstTicket || isAtLastTicket ? resistedDelta : deltaX);
  }

  function handleTouchEnd(event: React.TouchEvent<HTMLDivElement>) {
    if (!touchStart) {
      setIsDragging(false);
      return;
    }

    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - touchStart.x;
    const deltaY = touch.clientY - touchStart.y;

    setTouchStart(null);
    setIsDragging(false);
    setDragOffset(0);

    if (Math.abs(deltaX) < 48 || Math.abs(deltaX) < Math.abs(deltaY) * 1.2) return;

    if (deltaX < 0) {
      showNextTicket();
    } else {
      showPreviousTicket();
    }
  }

  return (
    <div className="ticket-open-page">
      <div className="ticket-open-viewport" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
        <div
          className={`ticket-open-track${isDragging ? " is-dragging" : ""}`}
          style={{ transform: `translate3d(calc(${-activeIndex * 100}% + ${dragOffset}px), 0, 0)` }}
        >
          {OPEN_TICKETS.map((ticket) => (
            <div key={ticket.id} className="ticket-open-scroll">
              <TicketSummary />
              <QrCard ticket={ticket} />
              <PassengerCard ticket={ticket} />
              <WagonScheme ticket={ticket} />
            </div>
          ))}
          <TripInfoScreen />
        </div>
      </div>
      <Header activeIndex={activeIndex} total={totalSlides} onSelect={setActiveIndex} isMap={activeIndex === totalSlides - 1} />
      {activeIndex < OPEN_TICKETS.length && <WalletBar />}
    </div>
  );
}
