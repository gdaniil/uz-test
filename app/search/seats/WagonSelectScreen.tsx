"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type Params = Record<string, string | string[] | undefined>;

type Seat = {
  n: string;
  x: number;
  y?: number;
  shelf?: boolean;
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
  { n: "2", x: 150, y: 16 },
  { n: "5", x: 208, y: 16 },
  { n: "6", x: 260, y: 16 },
  { n: "9", x: 318, y: 16 },
  { n: "10", x: 370, y: 16 },
  { n: "3", x: 98, y: 66, shelf: true },
  { n: "4", x: 150, y: 66, shelf: true },
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

const availableSeatsByCar: Record<string, string[]> = {
  "Вагон 3": ["1", "5", "8", "10", "13", "16", "17"],
  "Вагон 4": ["2", "4", "7", "9", "12", "15", "18"],
  "Вагон 5": ["3", "6", "10", "11", "14", "17"],
};

const cars = [
  {
    name: "Вагон 3",
    seats: "17 верхніх | 8 нижніх",
    meta: [
      { icon: "climate", label: "Кондиціонер" },
      { icon: "new", label: "Новий вагон" },
    ],
  },
  {
    name: "Вагон 4",
    seats: "11 верхніх | 6 нижніх",
    meta: [
      { icon: "climate", label: "Кондиціонер" },
      { icon: "new", label: "Новий вагон" },
      { icon: "accessible", label: "Місця для людей з інвалідністю" },
    ],
  },
  {
    name: "Вагон 5",
    seats: "15 верхніх | 7 нижніх",
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

function formatTickets(count: number) {
  if (count % 10 === 1 && count % 100 !== 11) return `${count} квиток`;
  if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100)) return `${count} квитки`;
  return `${count} квитків`;
}

function seatRailClass(seat: Seat) {
  if (seat.y === 16) return "has-rail-top";
  if (seat.y === 66) return "has-rail-bottom";
  return Number(seat.n) % 2 === 1 ? "has-rail-top" : "has-rail-bottom";
}

function SeatView({
  seat,
  available,
  selected,
  onToggle,
}: {
  seat: Seat;
  available: boolean;
  selected: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      className={[
        "results-wagon-seat",
        seat.shelf ? "is-shelf" : "",
        seatRailClass(seat),
        available ? "is-available" : "is-disabled",
        selected ? "is-selected" : "",
      ].filter(Boolean).join(" ")}
      style={{ left: seat.x, top: seat.y ?? 144 }}
      type="button"
      aria-label={`Місце ${seat.n}`}
      aria-pressed={selected}
      disabled={!available}
      onClick={onToggle}
    >
      <span>{available ? seat.n : ""}</span>
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

function ClimateIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <rect width="24" height="24" rx="12" fill="#213786" fillOpacity="0.07" />
      <g clipPath="url(#climate-icon-clip)">
        <path d="M11.9996 4.66699C12.3676 4.66699 12.6664 4.96497 12.6665 5.33301V6H13.3335C13.6426 6.00014 13.911 6.21286 13.982 6.51367C14.0529 6.8145 13.9078 7.12442 13.6314 7.2627L12.6665 7.74512V9.28027L14.0259 10.0596L15.3511 9.29492L15.2867 8.21875C15.2681 7.91012 15.4642 7.62898 15.7603 7.54004C16.0564 7.45121 16.3743 7.57799 16.5288 7.8457L16.8628 8.42285L17.44 8.08887C17.7587 7.90505 18.166 8.01457 18.3501 8.33301C18.5342 8.65179 18.4257 9.05998 18.107 9.24414L17.5288 9.57715L17.8628 10.1543C18.0174 10.422 17.9677 10.7617 17.7427 10.9736C17.5176 11.1856 17.1755 11.2143 16.9175 11.0439L16.0181 10.4502L14.688 11.2178L14.6919 12.7842L16.0181 13.5498L16.9175 12.9561C17.1755 12.7857 17.5176 12.8144 17.7427 13.0264C17.9678 13.2383 18.0174 13.578 17.8628 13.8457L17.5298 14.4229L18.107 14.7559C18.4257 14.94 18.5352 15.3482 18.3511 15.667C18.167 15.9857 17.7588 16.0951 17.44 15.9111L16.8628 15.5771L16.5298 16.1543C16.3752 16.422 16.0564 16.5488 15.7603 16.46C15.4642 16.371 15.2681 16.0899 15.2867 15.7812L15.3511 14.7051L14.022 13.9375L12.6665 14.7246V16.2549L13.6314 16.7373C13.9077 16.8756 14.0529 17.1855 13.982 17.4863C13.911 17.7871 13.6425 17.9998 13.3335 18H12.6665V18.667C12.6664 19.035 12.3676 19.333 11.9996 19.333C11.6316 19.3329 11.3337 19.035 11.3335 18.667V18H10.6665C10.3574 18 10.0882 17.7872 10.0171 17.4863C9.94625 17.1855 10.0922 16.8755 10.3687 16.7373L11.3335 16.2549V14.7197L9.97319 13.9395L8.64897 14.7051L8.71342 15.7812C8.73194 16.0898 8.53579 16.371 8.23979 16.46C7.94367 16.5489 7.62485 16.4221 7.47026 16.1543L7.13725 15.5771L6.5601 15.9111C6.24131 16.0952 5.83312 15.9857 5.64897 15.667C5.46487 15.3481 5.57425 14.94 5.89311 14.7559L6.47026 14.4229L6.13725 13.8457C5.98266 13.5779 6.03228 13.2383 6.25737 13.0264C6.48245 12.8145 6.82362 12.7857 7.08158 12.9561L7.98197 13.5498L9.31108 12.7822L9.30619 11.2148L7.98197 10.4502L7.08158 11.0439C6.82364 11.2143 6.48245 11.1855 6.25737 10.9736C6.03228 10.7617 5.98266 10.4221 6.13725 10.1543L6.47026 9.57715L5.89311 9.24414C5.57425 9.06005 5.46487 8.65187 5.64897 8.33301C5.83313 8.01434 6.24132 7.90482 6.5601 8.08887L7.13725 8.42285L7.47026 7.8457C7.62485 7.57794 7.94367 7.4511 8.23979 7.54004C8.53574 7.62907 8.73194 7.91022 8.71342 8.21875L8.64897 9.29492L9.97807 10.0625L11.3335 9.27441V7.74512L10.3687 7.2627C10.0922 7.12444 9.94712 6.81456 10.0181 6.51367C10.0891 6.21277 10.3574 6.00001 10.6665 6H11.3335V5.33301C11.3337 4.96508 11.6316 4.66718 11.9996 4.66699ZM10.6392 11.2197L10.6441 12.7871L12.0044 13.5674L13.3589 12.7783L13.355 11.2119L11.9947 10.4316L10.6392 11.2197Z" fill="#2E469E" />
      </g>
      <defs>
        <clipPath id="climate-icon-clip">
          <rect width="16" height="16" fill="white" transform="translate(4 4)" />
        </clipPath>
      </defs>
    </svg>
  );
}

function NewWagonIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <rect width="24" height="24" rx="12" fill="#EF9010" fillOpacity="0.1" />
      <g clipPath="url(#new-wagon-icon-clip)">
        <path d="M11.9999 15.8333L7.88522 17.9967L8.67122 13.4147L5.33789 10.17L9.93789 9.50332L11.9952 5.33466L14.0526 9.50332L18.6526 10.17L15.3192 13.4147L16.1052 17.9967L11.9999 15.8333Z" fill="#E89A30" stroke="#E89A30" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <defs>
        <clipPath id="new-wagon-icon-clip">
          <rect width="16" height="16" fill="white" transform="translate(4 4)" />
        </clipPath>
      </defs>
    </svg>
  );
}

function AccessibleIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <rect width="24" height="24" rx="12" fill="#EFF1F6" />
      <g clipPath="url(#accessible-icon-clip)">
        <path d="M11.3333 8.66667C12.0697 8.66667 12.6667 8.06971 12.6667 7.33333C12.6667 6.59695 12.0697 6 11.3333 6C10.597 6 10 6.59695 10 7.33333C10 8.06971 10.597 8.66667 11.3333 8.66667Z" fill="#6C6E75" stroke="#6C6E75" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M11.3335 8.66663V14H14.0002L16.6668 17.3333" stroke="#6C6E75" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M11.3335 11.3334H14.6668" stroke="#6C6E75" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8.66684 11.6666C8.18917 11.8644 7.76406 12.1707 7.42512 12.5611C7.08618 12.9515 6.8427 13.4154 6.71393 13.9161C6.58516 14.4168 6.57463 14.9406 6.68317 15.4461C6.79171 15.9516 7.01635 16.4249 7.33932 16.8286C7.6623 17.2324 8.07476 17.5554 8.54409 17.7723C9.01342 17.9891 9.52677 18.0938 10.0435 18.0781C10.5603 18.0624 11.0663 17.9267 11.5216 17.6817C11.9769 17.4367 12.369 17.0892 12.6668 16.6666" stroke="#6C6E75" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <defs>
        <clipPath id="accessible-icon-clip">
          <rect width="16" height="16" fill="white" transform="translate(4 4)" />
        </clipPath>
      </defs>
    </svg>
  );
}

function CarMetaIcon({ name }: { name: string }) {
  if (name === "new") return <NewWagonIcon />;
  if (name === "accessible") return <AccessibleIcon />;
  return <ClimateIcon />;
}

function CarCard({
  car,
  selectedSeats,
  onToggleSeat,
}: {
  car: (typeof cars)[number];
  selectedSeats: string[];
  onToggleSeat: (seatId: string) => void;
}) {
  const availableSeats = availableSeatsByCar[car.name] ?? [];

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
          {[...upperSeats, ...lowerSeats].map((seat) => {
            const seatId = `${car.name}-${seat.n}`;
            return (
              <SeatView
                key={`${seatId}-${seat.x}-${seat.y ?? 144}`}
                seat={seat}
                available={availableSeats.includes(seat.n)}
                selected={selectedSeats.includes(seatId)}
                onToggle={() => onToggleSeat(seatId)}
              />
            );
          })}
        </div>
      </div>

      {car.meta.length > 0 && (
        <div className="results-car-meta">
          {car.meta.map(({ icon, label }) => (
            <span key={`${car.name}-${label}`}>
              <i><CarMetaIcon name={icon} /></i>
              {label}
            </span>
          ))}
        </div>
      )}
    </section>
  );
}

export function WagonSelectScreen({ params }: { params: Params }) {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const from = first(params.from, "Київ");
  const to = first(params.to, "Жмеринка");
  const fromStation = first(params.fromStation, from);
  const toStation = first(params.toStation, to);
  const selectedDate = parseDate(first(params.date, ""));
  const resultsHref = {
    pathname: "/search/results",
    query: {
      from,
      fromStation,
      to,
      toStation,
      date: `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(2, "0")}`,
    },
  };
  const passengerHref = {
    pathname: "/search/passengers",
    query: {
      from,
      fromStation,
      to,
      toStation,
      date: `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(2, "0")}`,
      ticketCount: String(selectedSeats.length),
      seats: selectedSeats.join(","),
    },
  };
  const ticketLabel = formatTickets(selectedSeats.length);
  const totalPrice = new Intl.NumberFormat("uk-UA", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(selectedSeats.length * 203.96);

  function toggleSeat(seatId: string) {
    setSelectedSeats((current) => (
      current.includes(seatId)
        ? current.filter((id) => id !== seatId)
        : [...current, seatId]
    ));
  }

  return (
    <>
      <div aria-hidden="true" className="results-status-tint" />
      <main className="stage">
        <section className="phone results-phone" aria-label="Результати пошуку квитків">
          <header className="results-header">
            <div className="results-header-main">
              <Link className="results-back" href={resultsHref} aria-label="Назад до списку потягів">
                <HeaderBackIcon />
              </Link>
              <div className="results-route-head">
                <h1>116К {from} — {to}</h1>
                <p>24 жов, чт, 15:17</p>
              </div>
              <button className="results-info" type="button" aria-label="Інформація">
                <HeaderInfoIcon />
              </button>
            </div>

            <div className="results-progress-row">
              <div className="results-progress-top">
                <span>Вибір місць</span>
                <button type="button">
                  <HeaderHourglassIcon />
                  14:34, 2 квитки
                  <ChevronDown size={12} strokeWidth={2.4} />
                </button>
              </div>
              <div className="results-progress results-progress-step-seats" aria-hidden>
                <span className="active" />
                <span />
                <span />
                <span />
              </div>
            </div>
          </header>

          <nav className="results-date-strip results-car-class-strip" aria-label="Класи вагонів">
            <button className="results-date-cell results-class-cell active" type="button" aria-pressed="true">
              <strong>Плацкарт</strong>
              <span>132 місця ∙ 203 ₴</span>
            </button>
            <button className="results-date-cell results-class-cell" type="button">
              <strong>Купе</strong>
              <span>22 місця ∙ 434 ₴</span>
            </button>
            <button className="results-date-cell results-class-cell" type="button">
              <strong>Люкс</strong>
              <span>13 місць ∙ 993 ₴</span>
            </button>
          </nav>

          <div className="results-scroll">
            {cars.map((car) => (
              <CarCard key={car.name} car={car} selectedSeats={selectedSeats} onToggleSeat={toggleSeat} />
            ))}
          </div>

          {selectedSeats.length > 0 && (
            <div className="results-sticky-bottom">
              <button className="results-passenger-pill" type="button">
                <DirectionChevronStack />
                Напрямок руху потяга
              </button>

              <div className="results-pay-bar">
                <div>
                  <strong>{totalPrice} ₴</strong>
                  <button type="button">
                    {ticketLabel}
                    <ChevronDown size={16} strokeWidth={2.4} />
                  </button>
                </div>
                <Link className="results-next-button" href={passengerHref}>Далі</Link>
              </div>
            </div>
          )}
        </section>
      </main>
    </>
  );
}
