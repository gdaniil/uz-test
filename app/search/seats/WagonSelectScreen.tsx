"use client";

import { ChevronDown, Snowflake, Star, Wifi } from "lucide-react";
import Link from "next/link";

type Params = Record<string, string | string[] | undefined>;

type Seat = {
  n: string;
  x: number;
  y?: number;
  shelf?: boolean;
  selected?: boolean;
  disabled?: boolean;
};

const MONTHS_SHORT = ["Січ", "Лют", "Бер", "Кві", "Тра", "Чер", "Лип", "Сер", "Вер", "Жов", "Лис", "Гру"];
const MONTHS_GENITIVE = [
  "січня",
  "лютого",
  "березня",
  "квітня",
  "травня",
  "червня",
  "липня",
  "серпня",
  "вересня",
  "жовтня",
  "листопада",
  "грудня",
];
const DAYS_SHORT = ["Нд", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];

const upperSeats: Seat[] = [
  { n: "1", x: 98, y: 16 },
  { n: "2", x: 150, y: 16, disabled: true },
  { n: "5", x: 208, y: 16 },
  { n: "6", x: 260, y: 16 },
  { n: "9", x: 318, y: 16 },
  { n: "10", x: 370, y: 16 },
  { n: "3", x: 98, y: 66, shelf: true },
  { n: "4", x: 150, y: 66, shelf: true, selected: true },
  { n: "7", x: 208, y: 66, shelf: true },
  { n: "8", x: 260, y: 66, shelf: true },
  { n: "11", x: 318, y: 66, shelf: true },
  { n: "12", x: 370, y: 66, shelf: true },
];

const lowerSeats: Seat[] = [
  { n: "13", x: 98 },
  { n: "14", x: 150, shelf: true },
  { n: "15", x: 208 },
  { n: "16", x: 260, shelf: true },
  { n: "17", x: 318 },
  { n: "18", x: 370, shelf: true },
];

const cars = [
  {
    name: "Вагон 3",
    seats: "17 місць",
    meta: [
      { icon: Snowflake, label: "Кондиціонер" },
      { icon: Star, label: "Фірмовий" },
    ],
  },
  {
    name: "Вагон 4",
    seats: "14 місць",
    meta: [
      { icon: Snowflake, label: "Кондиціонер" },
      { icon: Star, label: "Фірмовий" },
      { icon: Wifi, label: "Безпересадковий вагон" },
    ],
  },
  {
    name: "Вагон 5",
    seats: "22 місця",
    meta: [],
  },
];

function first(value: string | string[] | undefined, fallback: string) {
  if (Array.isArray(value)) return value[0] ?? fallback;
  return value ?? fallback;
}

function startOfDay(date: Date) {
  const next = new Date(date);
  next.setHours(0, 0, 0, 0);
  return next;
}

function parseDate(value: string) {
  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) return startOfDay(new Date());
  return new Date(year, month - 1, day);
}

function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function sameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function buildDateStrip(selectedDate: Date) {
  const today = startOfDay(new Date());
  const selected = selectedDate < today ? today : selectedDate;
  let start = addDays(selected, -2);
  if (start < today) start = today;
  return Array.from({ length: 5 }, (_, index) => addDays(start, index));
}

function formatHeaderDate(date: Date) {
  return `${date.getDate()} ${MONTHS_GENITIVE[date.getMonth()]}`;
}

function formatCompactDate(date: Date) {
  return `${date.getDate()} ${MONTHS_SHORT[date.getMonth()].toLocaleLowerCase("uk")}, ${DAYS_SHORT[date.getDay()].toLocaleLowerCase("uk")}`;
}

function SeatView({ seat }: { seat: Seat }) {
  return (
    <button
      className={[
        "results-wagon-seat",
        seat.shelf ? "is-shelf" : "",
        seat.selected ? "is-selected" : "",
        seat.disabled ? "is-disabled" : "",
      ].filter(Boolean).join(" ")}
      style={{ left: seat.x, top: seat.y ?? 144 }}
      type="button"
      aria-label={`Місце ${seat.n}`}
      disabled={seat.disabled}
    >
      <span>{seat.disabled ? "" : seat.n}</span>
    </button>
  );
}

function HeaderBackIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M0 16C0 7.16344 7.16344 0 16 0C24.8366 0 32 7.16344 32 16C32 24.8366 24.8366 32 16 32C7.16344 32 0 24.8366 0 16Z" fill="white" fillOpacity="0.12" />
      <g clipPath="url(#results-back-clip)">
        <path d="M18 20L14 16L18 12" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <defs>
        <clipPath id="results-back-clip">
          <rect width="16" height="16" fill="white" transform="translate(8 8)" />
        </clipPath>
      </defs>
    </svg>
  );
}

function HeaderInfoIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M0 16C0 7.16344 7.16344 0 16 0V0C24.8366 0 32 7.16344 32 16V16C32 24.8366 24.8366 32 16 32V32C7.16344 32 0 24.8366 0 16V16Z" fill="white" fillOpacity="0.12" />
      <g clipPath="url(#results-info-clip)">
        <path d="M16 22C19.3137 22 22 19.3137 22 16C22 12.6863 19.3137 10 16 10C12.6863 10 10 12.6863 10 16C10 19.3137 12.6863 22 16 22Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16 13.3333H16.0067" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M15.3333 16H15.9999V18.6667H16.6666" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <defs>
        <clipPath id="results-info-clip">
          <rect width="16" height="16" fill="white" transform="translate(8 8)" />
        </clipPath>
      </defs>
    </svg>
  );
}

function HeaderHourglassIcon() {
  return (
    <svg width="7" height="11" viewBox="0 0 7 11" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M0.988281 10.103C0.683919 10.103 0.44222 10.0171 0.263184 9.84521C0.0877279 9.67334 0 9.42806 0 9.10938V9.0127C0 8.67611 0.0734049 8.34131 0.220215 8.0083C0.370605 7.67529 0.558594 7.3584 0.78418 7.05762C1.00977 6.75326 1.23893 6.47754 1.47168 6.23047C1.70443 5.9834 1.90316 5.77572 2.06787 5.60742C2.24333 5.43555 2.33285 5.25114 2.33643 5.0542C2.34359 4.85726 2.25407 4.66748 2.06787 4.48486C1.90316 4.32015 1.70443 4.11426 1.47168 3.86719C1.23893 3.62012 1.00977 3.34619 0.78418 3.04541C0.558594 2.74105 0.370605 2.42236 0.220215 2.08936C0.0734049 1.75635 0 1.41976 0 1.07959V0.999023C0 0.676758 0.0877279 0.429688 0.263184 0.257812C0.44222 0.0859375 0.683919 0 0.988281 0H5.51611C5.82406 0 6.06576 0.0859375 6.24121 0.257812C6.41667 0.429688 6.50439 0.676758 6.50439 0.999023V1.07959C6.50439 1.41976 6.4292 1.75635 6.27881 2.08936C6.132 2.42236 5.9458 2.74105 5.72021 3.04541C5.49463 3.34619 5.26546 3.62012 5.03271 3.86719C4.79997 4.11426 4.59945 4.32015 4.43115 4.48486C4.25212 4.66748 4.16439 4.85726 4.16797 5.0542C4.17155 5.25114 4.25928 5.43555 4.43115 5.60742C4.59945 5.77572 4.79997 5.9834 5.03271 6.23047C5.26546 6.47754 5.49463 6.75326 5.72021 7.05762C5.9458 7.3584 6.132 7.67529 6.27881 8.0083C6.4292 8.34131 6.50439 8.67611 6.50439 9.0127V9.10938C6.50439 9.42806 6.41667 9.67334 6.24121 9.84521C6.06576 10.0171 5.82406 10.103 5.51611 10.103H0.988281ZM3.71143 4.13037C3.80452 4.0516 3.92985 3.93164 4.0874 3.77051C4.24495 3.60938 4.41504 3.43034 4.59766 3.2334C4.78027 3.03646 4.95394 2.83773 5.11865 2.63721C5.28337 2.43669 5.41406 2.25586 5.51074 2.09473C5.5752 1.99089 5.59489 1.89958 5.56982 1.8208C5.54834 1.73844 5.4821 1.69727 5.37109 1.69727H1.1333C1.02588 1.69727 0.959635 1.73844 0.93457 1.8208C0.909505 1.89958 0.929199 1.99089 0.993652 2.09473C1.09391 2.25586 1.22461 2.43669 1.38574 2.63721C1.55046 2.83773 1.72412 3.03646 1.90674 3.2334C2.08936 3.43034 2.25944 3.60938 2.41699 3.77051C2.57454 3.93164 2.69987 4.0516 2.79297 4.13037C2.95768 4.2736 3.11165 4.34521 3.25488 4.34521C3.39811 4.34521 3.55029 4.2736 3.71143 4.13037Z" fill="white" />
    </svg>
  );
}

function DirectionChevronStack() {
  return (
    <span className="results-direction-chevrons" aria-hidden>
      <ChevronDown size={16} strokeWidth={2.4} />
      <ChevronDown size={16} strokeWidth={2.4} />
      <ChevronDown size={16} strokeWidth={2.4} />
    </span>
  );
}

function CarCard({ car }: { car: (typeof cars)[number] }) {
  return (
    <section className="results-car-card" aria-label={car.name}>
      <div className="results-car-title">
        <strong>{car.name}</strong>
        <span>{car.seats}</span>
      </div>

      <div className="results-wagon-window" aria-label="Схема місць">
        <div className="results-wagon-map">
          <div className="results-wagon-shell" />
          <div className="results-wagon-wc">WC</div>
          <div className="results-wagon-divider top d1" />
          <div className="results-wagon-divider top d2" />
          <div className="results-wagon-divider top d3" />
          <div className="results-wagon-divider top d4" />
          <div className="results-wagon-divider bottom d1" />
          <div className="results-wagon-divider bottom d2" />
          <div className="results-wagon-divider bottom d3" />
          <div className="results-wagon-divider bottom d4" />
          {upperSeats.map((seat) => (
            <SeatView key={`${car.name}-${seat.n}-${seat.x}-${seat.y}`} seat={seat} />
          ))}
          {lowerSeats.map((seat) => (
            <SeatView key={`${car.name}-lower-${seat.n}-${seat.x}`} seat={seat} />
          ))}
        </div>
      </div>

      {car.meta.length > 0 && (
        <div className="results-car-meta">
          {car.meta.map(({ icon: Icon, label }) => (
            <span key={`${car.name}-${label}`}>
              <i><Icon size={16} strokeWidth={2.2} /></i>
              {label}
            </span>
          ))}
        </div>
      )}
    </section>
  );
}

export function WagonSelectScreen({ params }: { params: Params }) {
  const from = first(params.from, "Київ");
  const to = first(params.to, "Жмеринка");
  const fromStation = first(params.fromStation, from);
  const toStation = first(params.toStation, to);
  const selectedDate = parseDate(first(params.date, ""));
  const visibleDates = buildDateStrip(selectedDate);

  return (
    <>
      <div aria-hidden="true" className="results-status-tint" />
      <main className="stage">
        <section className="phone results-phone" aria-label="Результати пошуку квитків">
          <header className="results-header">
            <div className="results-header-main">
              <Link className="results-back" href="/" aria-label="Назад до пошуку">
                <HeaderBackIcon />
              </Link>
              <div className="results-route-head">
                <h1>116К {from} — {to}</h1>
                <p>{formatCompactDate(selectedDate)}</p>
              </div>
              <button className="results-info" type="button" aria-label="Інформація">
                <HeaderInfoIcon />
              </button>
            </div>

            <div className="results-progress-row">
              <div className="results-progress-top">
                <span>Потяг</span>
                <button type="button">
                  <HeaderHourglassIcon />
                  14:34, 2 квитки
                  <ChevronDown size={12} strokeWidth={2.4} />
                </button>
              </div>
              <div className="results-progress" aria-hidden>
                <span className="active" />
                <span />
                <span />
                <span />
              </div>
            </div>
          </header>

          <nav className="results-date-strip" aria-label="Дати відправлення">
            {visibleDates.map((date) => {
              const active = sameDay(date, selectedDate);
              return (
                <Link
                  key={date.toISOString()}
                  className={`results-date-cell${active ? " active" : ""}`}
                  href={{
                    pathname: "/search/results",
                    query: {
                      from,
                      fromStation,
                      to,
                      toStation,
                      date: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`,
                    },
                  }}
                  aria-current={active ? "date" : undefined}
                >
                  <strong>{date.getDate()} {MONTHS_SHORT[date.getMonth()]}</strong>
                  <span>{DAYS_SHORT[date.getDay()]}</span>
                </Link>
              );
            })}
          </nav>

          <div className="results-scroll">
            {cars.map((car) => (
              <CarCard key={car.name} car={car} />
            ))}
          </div>

          <div className="results-sticky-bottom">
            <button className="results-passenger-pill" type="button">
              <DirectionChevronStack />
              Мої дані
            </button>

            <div className="results-pay-bar">
              <div>
                <strong>203.96 ₴</strong>
                <button type="button">
                  2 квитка
                  <ChevronDown size={16} strokeWidth={2.4} />
                </button>
              </div>
              <button className="results-next-button" type="button">Далі</button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
