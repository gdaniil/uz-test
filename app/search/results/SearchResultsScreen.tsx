"use client";

import { Fragment, useState } from "react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

type Params = Record<string, string | string[] | undefined>;

const MONTHS_SHORT = ["Січ", "Лют", "Бер", "Кві", "Тра", "Чер", "Лип", "Сер", "Вер", "Жов", "Лис", "Гру"];
const MONTHS_GENITIVE = [
  "січня", "лютого", "березня", "квітня", "травня", "червня",
  "липня", "серпня", "вересня", "жовтня", "листопада", "грудня",
];
const DAYS_SHORT = ["Нд", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];

type TrainClass = { label: string; seats: number; price: string };
type Train = {
  number: string;
  type?: string;
  badge?: "cheapest" | "fastest";
  depart: string;
  arrive: string;
  duration: string;
  from: string;
  to: string;
  classes: TrainClass[];
};
type TransferTrain = {
  id: string;
  service: string;
  operators: "suburban" | "bus";
  depart: string;
  arrive: string;
  duration: string;
  from: string;
  to: string;
  transfer: {
    title: string;
    details: string[];
    price: string;
  };
};

const trains: Train[] = [
  {
    number: "116К",
    type: "IC+",
    badge: "cheapest",
    depart: "15:17",
    arrive: "21:08",
    duration: "5 год 51 хв",
    from: "Київ-Пасажирський",
    to: "Підзамче",
    classes: [
      { label: "1 клас", seats: 134, price: "441 ₴" },
      { label: "2 клас", seats: 88, price: "791 ₴" },
    ],
  },
  {
    number: "080 К",
    badge: "fastest",
    depart: "15:17",
    arrive: "21:08",
    duration: "5 год 51 хв",
    from: "Дарниця",
    to: "Підзамче",
    classes: [
      { label: "Плацкарт", seats: 9, price: "203 ₴" },
      { label: "Купе", seats: 36, price: "434 ₴" },
      { label: "Люкс", seats: 21, price: "1 021 ₴" },
    ],
  },
];

const transferTrains: TransferTrain[] = [
  {
    id: "transfer-polissia-743",
    service: "дальній + приміський",
    operators: "suburban",
    depart: "11:21",
    arrive: "21:08",
    duration: "5 год 51 хв",
    from: "Київ-Пасажирський",
    to: "Підзамче",
    transfer: {
      title: "1 пересадка",
      details: ["Полтава: 2 год 21 хв"],
      price: "від 1434 ₴",
    },
  },
  {
    id: "transfer-darnytsia-080",
    service: "дальній + автобус",
    operators: "bus",
    depart: "23:39",
    arrive: "11:08",
    duration: "5 год 51 хв",
    from: "Київ-Пасажирський",
    to: "Підзамче",
    transfer: {
      title: "2 пересадки",
      details: ["Полтава: 2 год 21 хв", "Кропивницький 45 хв"],
      price: "від 1434 ₴",
    },
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

function formatCompactDate(date: Date) {
  return `${date.getDate()} ${MONTHS_SHORT[date.getMonth()].toLocaleLowerCase("uk")}, ${DAYS_SHORT[date.getDay()].toLocaleLowerCase("uk")}`;
}

function HeaderBackIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M0 16C0 7.16344 7.16344 0 16 0C24.8366 0 32 7.16344 32 16C32 24.8366 24.8366 32 16 32C7.16344 32 0 24.8366 0 16Z" fill="white" fillOpacity="0.12" />
      <g clipPath="url(#tl-back-clip)">
        <path d="M18 20L14 16L18 12" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <defs>
        <clipPath id="tl-back-clip">
          <rect width="16" height="16" fill="white" transform="translate(8 8)" />
        </clipPath>
      </defs>
    </svg>
  );
}

function HeaderInfoIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M0 16C0 7.16344 7.16344 0 16 0C24.8366 0 32 7.16344 32 16C32 24.8366 24.8366 32 16 32C7.16344 32 0 24.8366 0 16Z" fill="white" fillOpacity="0.12" />
      <g clipPath="url(#tl-info-clip)">
        <path d="M16 22C19.3137 22 22 19.3137 22 16C22 12.6863 19.3137 10 16 10C12.6863 10 10 12.6863 10 16C10 19.3137 12.6863 22 16 22Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16 13.3333H16.0067" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M15.3333 16H15.9999V18.6667H16.6666" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <defs>
        <clipPath id="tl-info-clip">
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

function SortIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <g clipPath="url(#clip-sort)">
        <path d="M7.9165 4.16669H4.58317C4.35305 4.16669 4.1665 4.35324 4.1665 4.58335V7.91669C4.1665 8.14681 4.35305 8.33335 4.58317 8.33335H7.9165C8.14662 8.33335 8.33317 8.14681 8.33317 7.91669V4.58335C8.33317 4.35324 8.14662 4.16669 7.9165 4.16669Z" stroke="#2C2E32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M7.9165 11.6667H4.58317C4.35305 11.6667 4.1665 11.8532 4.1665 12.0834V15.4167C4.1665 15.6468 4.35305 15.8334 4.58317 15.8334H7.9165C8.14662 15.8334 8.33317 15.6468 8.33317 15.4167V12.0834C8.33317 11.8532 8.14662 11.6667 7.9165 11.6667Z" stroke="#2C2E32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M11.6665 12.5L14.1665 15L16.6665 12.5" stroke="#2C2E32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M14.1665 15V5" stroke="#2C2E32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
      <defs>
        <clipPath id="clip-sort"><rect width="20" height="20" fill="white"/></clipPath>
      </defs>
    </svg>
  );
}

function TransferIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <g clipPath="url(#clip-transfer)">
        <path d="M9.16683 17.5C9.16683 17.9603 9.53993 18.3334 10.0002 18.3334C10.4604 18.3334 10.8335 17.9603 10.8335 17.5C10.8335 17.0398 10.4604 16.6667 10.0002 16.6667C9.53993 16.6667 9.16683 17.0398 9.16683 17.5Z" stroke="#2C2A29" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9.16683 2.50002C9.16683 2.96026 9.53993 3.33335 10.0002 3.33335C10.4604 3.33335 10.8335 2.96026 10.8335 2.50002C10.8335 2.03978 10.4604 1.66669 10.0002 1.66669C9.53993 1.66669 9.16683 2.03978 9.16683 2.50002Z" stroke="#2C2A29" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M6.66683 10C6.66683 11.841 8.15921 13.3334 10.0002 13.3334C11.8411 13.3334 13.3335 11.841 13.3335 10C13.3335 8.15907 11.8411 6.66669 10.0002 6.66669C8.15921 6.66669 6.66683 8.15907 6.66683 10Z" stroke="#2C2A29" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
      <defs>
        <clipPath id="clip-transfer"><rect width="20" height="20" fill="white"/></clipPath>
      </defs>
    </svg>
  );
}

function NoSeatsIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <g clipPath="url(#clip-noseats)">
        <path d="M9.16683 15C9.60886 15 10.0328 15.1756 10.3453 15.4881C10.6579 15.8007 10.8335 16.2246 10.8335 16.6666C10.8335 17.1087 10.6579 17.5326 10.3453 17.8452C10.0328 18.1577 9.60886 18.3333 9.16683 18.3333L5.8335 18.3333M4.16683 16.6666L4.16683 4.99998C4.16683 4.55795 4.34242 4.13403 4.65499 3.82147C4.96755 3.50891 5.39147 3.33331 5.8335 3.33331L9.16683 3.33331C9.60886 3.33331 10.0328 3.50891 10.3453 3.82147C10.6579 4.13403 10.8335 4.55795 10.8335 4.99998C10.8335 5.44201 10.6579 5.86593 10.3453 6.17849C10.0328 6.49105 9.60886 6.66665 9.16683 6.66665L7.50016 6.66665L7.50016 13.3633" stroke="#2C2E32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M10.8333 5L15 5C15.2514 4.99972 15.5015 5.03736 15.7417 5.11167M17.3917 6.7675C17.4639 7.00494 17.5004 7.25181 17.5 7.5L17.5 14.1667C17.5 14.8297 17.2366 15.4656 16.7678 15.9344C16.2989 16.4033 15.663 16.6667 15 16.6667L10.8333 16.6667" stroke="#2C2E32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M17.5 3.33331L2.5 18.3333" stroke="#2C2E32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
      <defs>
        <clipPath id="clip-noseats"><rect width="20" height="20" fill="white"/></clipPath>
      </defs>
    </svg>
  );
}

function SuburbanOperatorsIcon() {
  return (
    <svg className="tl-operators-icon" width="56" height="32" viewBox="0 0 56 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <rect x="24.5" y="0.5" width="31" height="31" rx="15.5" fill="white"/>
      <rect x="24.5" y="0.5" width="31" height="31" rx="15.5" stroke="#D5DAE7"/>
      <g clipPath="url(#suburban-clip-a)">
        <path d="M41.6668 10.1667C41.2248 10.1667 40.8009 10.3423 40.4883 10.6548C40.1758 10.9674 40.0002 11.3913 40.0002 11.8334V20.1667C40.0002 20.6087 39.8246 21.0326 39.512 21.3452C39.1994 21.6578 38.7755 21.8334 38.3335 21.8334" stroke="#213786" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M32.5 20.1667H35.8333V23.5H32.5V20.1667Z" fill="#213786" stroke="#213786" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M44.1665 8.5H47.4998V11.8333H44.1665V8.5Z" fill="#213786" stroke="#213786" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
      <rect x="0.5" y="0.5" width="31" height="31" rx="15.5" fill="white"/>
      <rect x="0.5" y="0.5" width="31" height="31" rx="15.5" stroke="#D5DAE7"/>
      <g clipPath="url(#suburban-clip-b)">
        <path d="M21.9805 16.875L24.333 21.8613H9.33301L9.3584 16.875H21.9805ZM16.0215 10.167C16.8083 10.1603 17.5823 10.3666 18.2607 10.7646C18.9391 11.1627 19.4967 11.7371 19.874 12.4267L21.1641 15.1523H9.33594V10.167H16.0215Z" fill="#213786"/>
      </g>
      <defs>
        <clipPath id="suburban-clip-a"><rect width="20" height="20" fill="white" transform="translate(30 6)"/></clipPath>
        <clipPath id="suburban-clip-b"><rect width="20" height="20" fill="white" transform="translate(6 6)"/></clipPath>
      </defs>
    </svg>
  );
}

function BusOperatorsIcon() {
  return (
    <svg className="tl-operators-icon" width="56" height="32" viewBox="0 0 56 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <rect x="24" width="32" height="32" rx="16" fill="#64D900"/>
      <rect x="24.5" y="0.5" width="31" height="31" rx="15.5" stroke="#D5DAE7"/>
      <text x="40" y="13" textAnchor="middle" fill="white" fontSize="7" fontWeight="800">FLIX</text>
      <text x="40" y="21" textAnchor="middle" fill="white" fontSize="7" fontWeight="800">BUS</text>
      <rect x="0.5" y="0.5" width="31" height="31" rx="15.5" fill="white"/>
      <rect x="0.5" y="0.5" width="31" height="31" rx="15.5" stroke="#D5DAE7"/>
      <g clipPath="url(#bus-clip-a)">
        <path d="M21.9805 16.875L24.333 21.8613H9.33301L9.3584 16.875H21.9805ZM16.0215 10.167C16.8083 10.1603 17.5823 10.3666 18.2607 10.7646C18.9391 11.1627 19.4967 11.7371 19.874 12.4267L21.1641 15.1523H9.33594V10.167H16.0215Z" fill="#213786"/>
      </g>
      <defs>
        <clipPath id="bus-clip-a"><rect width="20" height="20" fill="white" transform="translate(6 6)"/></clipPath>
      </defs>
    </svg>
  );
}


function TrainCard({ train }: { train: Train }) {
  return (
    <div className="tl-card">
      <div className="tl-labels">
        <span className="tl-badge tl-badge-number">{train.number}</span>
        {train.type && <span className="tl-badge tl-badge-type">{train.type}</span>}
        {train.badge === "cheapest" && <span className="tl-badge tl-badge-cheapest">Найдешевший</span>}
        {train.badge === "fastest" && <span className="tl-badge tl-badge-fastest">Найшвидший</span>}
      </div>

      <div className="tl-route">
        <div className="tl-endpoint">
          <strong>{train.depart}</strong>
          <span>{train.from}</span>
        </div>
        <div className="tl-line" aria-hidden>
          <span className="tl-dot tl-dot-l" />
          <span className="tl-track" />
          <span className="tl-duration-badge">{train.duration}</span>
          <span className="tl-dot tl-dot-r" />
        </div>
        <div className="tl-endpoint tl-endpoint-right">
          <strong>{train.arrive}</strong>
          <span>{train.to}</span>
        </div>
      </div>

      <div className="tl-prices">
        {train.classes.map((cls, i) => (
          <Fragment key={cls.label}>
            {i > 0 && <div className="tl-price-divider" />}
            <div className="tl-price-cell">
              <span>{cls.label}: {cls.seats}</span>
              <strong>{cls.price}</strong>
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
}

function TransferTrainCard({ train }: { train: TransferTrain }) {
  const isTallTransfer = train.operators === "bus";

  return (
    <div className="tl-card tl-transfer-card">
      <div className="tl-transfer-head">
        <div className="tl-operators" aria-hidden>
          {train.operators === "suburban" ? <SuburbanOperatorsIcon /> : <BusOperatorsIcon />}
        </div>
        <span>{train.service}</span>
      </div>

      <div className="tl-route">
        <div className="tl-endpoint">
          <strong>{train.depart}</strong>
          <span>{train.from}</span>
        </div>
        <div className="tl-line" aria-hidden>
          <span className="tl-dot tl-dot-l" />
          <span className="tl-track" />
          <span className="tl-duration-badge">{train.duration}</span>
          <span className="tl-dot tl-dot-r" />
        </div>
        <div className="tl-endpoint tl-endpoint-right">
          <strong>{train.arrive}</strong>
          <span>{train.to}</span>
        </div>
      </div>

      <div className={`tl-transfer-details${isTallTransfer ? " tall" : ""}`}>
        <div className="tl-transfer-copy">
          <TransferIcon />
          <div>
            <strong>{train.transfer.title}</strong>
            {train.transfer.details.map((detail) => (
              <span key={detail}>{detail}</span>
            ))}
          </div>
        </div>
        <strong className="tl-transfer-price">{train.transfer.price}</strong>
      </div>
    </div>
  );
}

export function SearchResultsScreen({ params }: { params: Params }) {
  const [showTransfers, setShowTransfers] = useState(false);
  const from = first(params.from, "Київ");
  const to = first(params.to, "Полтава");
  const fromStation = first(params.fromStation, from);
  const toStation = first(params.toStation, to);
  const selectedDate = parseDate(first(params.date, ""));
  const visibleDates = buildDateStrip(selectedDate);
  const searchQuery = {
    from,
    fromStation,
    to,
    toStation,
    date: `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(2, "0")}`,
  };

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
                <h1>{from} — {to}</h1>
                <p>{formatCompactDate(selectedDate)}</p>
              </div>
              <button className="results-info" type="button" aria-label="Інформація">
                <HeaderInfoIcon />
              </button>
            </div>

            <div className="results-progress-row">
              <div className="results-progress-top">
                <span>Вибір потяга</span>
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
                  <strong>{date.getDate()} {MONTHS_SHORT[date.getMonth()].toLocaleLowerCase("uk")}</strong>
                  <span>{DAYS_SHORT[date.getDay()]}</span>
                </Link>
              );
            })}
          </nav>

          <div className="tl-scroll">
            <div className="tl-filter-row">
              <button className="tl-filter-icon-btn" type="button" aria-label="Сортування та фільтри">
                <SortIcon />
              </button>
              <button
                className={`tl-filter-pill${showTransfers ? " active" : ""}`}
                type="button"
                aria-pressed={showTransfers}
                onClick={() => setShowTransfers((value) => !value)}
              >
                <TransferIcon />
                з пересадками
              </button>
              <button className="tl-filter-pill" type="button">
                <NoSeatsIcon />
                без вільних місць
              </button>
            </div>

            {trains.map((train, index) => (
              <Fragment key={train.number}>
                <Link className="tl-card-link" href={{ pathname: "/search/seats", query: searchQuery }}>
                  <TrainCard train={train} />
                </Link>
                {showTransfers && transferTrains[index] && (
                  <Link className="tl-card-link" href={{ pathname: "/search/seats", query: searchQuery }}>
                    <TransferTrainCard train={transferTrains[index]} />
                  </Link>
                )}
              </Fragment>
            ))}

            <button className="tl-watch-btn" type="button">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                <g clipPath="url(#clip-watch-bell)">
                  <path d="M10 5C10 4.46957 10.2107 3.96086 10.5858 3.58579C10.9609 3.21071 11.4696 3 12 3C12.5304 3 13.0391 3.21071 13.4142 3.58579C13.7893 3.96086 14 4.46957 14 5C15.1484 5.54303 16.1274 6.38833 16.8321 7.4453C17.5367 8.50227 17.9404 9.73107 18 11V14C18.0753 14.6217 18.2954 15.2171 18.6428 15.7381C18.9902 16.2592 19.4551 16.6914 20 17H4C4.54494 16.6914 5.00981 16.2592 5.35719 15.7381C5.70457 15.2171 5.92474 14.6217 6 14V11C6.05956 9.73107 6.4633 8.50227 7.16795 7.4453C7.8726 6.38833 8.85159 5.54303 10 5" stroke="#2C2E32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 17V18C9 18.7956 9.31607 19.5587 9.87868 20.1213C10.4413 20.6839 11.2044 21 12 21C12.7956 21 13.5587 20.6839 14.1213 20.1213C14.6839 19.5587 15 18.7956 15 18V17" stroke="#2C2E32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M21 6.727C20.3441 5.30025 19.3916 4.02969 18.206 3" stroke="#2C2E32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3 6.727C3.65535 5.30044 4.60715 4.0299 5.792 3" stroke="#2C2E32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </g>
                <defs>
                  <clipPath id="clip-watch-bell"><rect width="24" height="24" fill="white"/></clipPath>
                </defs>
              </svg>
              Відстежувати вільні місця
            </button>
          </div>
        </section>
      </main>
    </>
  );
}
