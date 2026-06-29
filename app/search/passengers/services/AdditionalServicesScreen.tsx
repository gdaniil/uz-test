"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";

type Params = Record<string, string | string[] | undefined>;

const services = [
  { title: "Постіль", price: "+80 ₴", added: true },
  { title: "Вода (0.5 л)", price: "+15 ₴" },
  { title: "М’ясний обід", price: "+125 ₴" },
  { title: "Вегетаріанський обід", price: "+125 ₴" },
  { title: "Квиток на улюбленця", price: "+25 ₴" },
  { title: "Квиток на багаж", price: "+25 ₴" },
];

function first(value: string | string[] | undefined, fallback: string) {
  if (Array.isArray(value)) return value[0] ?? fallback;
  return value ?? fallback;
}

function formatTickets(count: number) {
  if (count % 10 === 1 && count % 100 !== 11) return `${count} квиток`;
  if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100)) return `${count} квитки`;
  return `${count} квитків`;
}

function HeaderBackIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M0 16C0 7.16344 7.16344 0 16 0C24.8366 0 32 7.16344 32 16C32 24.8366 24.8366 32 16 32C7.16344 32 0 24.8366 0 16Z" fill="white" fillOpacity="0.12" />
      <path d="M18 20L14 16L18 12" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function HeaderHourglassIcon() {
  return (
    <svg width="7" height="11" viewBox="0 0 7 11" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M0.988281 10.103C0.683919 10.103 0.44222 10.0171 0.263184 9.84521C0.0877279 9.67334 0 9.42806 0 9.10938V9.0127C0 8.67611 0.0734049 8.34131 0.220215 8.0083C0.370605 7.67529 0.558594 7.3584 0.78418 7.05762C1.00977 6.75326 1.23893 6.47754 1.47168 6.23047C1.70443 5.9834 1.90316 5.77572 2.06787 5.60742C2.24333 5.43555 2.33285 5.25114 2.33643 5.0542C2.34359 4.85726 2.25407 4.66748 2.06787 4.48486C1.90316 4.32015 1.70443 4.11426 1.47168 3.86719C1.23893 3.62012 1.00977 3.34619 0.78418 3.04541C0.558594 2.74105 0.370605 2.42236 0.220215 2.08936C0.0734049 1.75635 0 1.41976 0 1.07959V0.999023C0 0.676758 0.0877279 0.429688 0.263184 0.257812C0.44222 0.0859375 0.683919 0 0.988281 0H5.51611C5.82406 0 6.06576 0.0859375 6.24121 0.257812C6.41667 0.429688 6.50439 0.676758 6.50439 0.999023V1.07959C6.50439 1.41976 6.4292 1.75635 6.27881 2.08936C6.132 2.42236 5.9458 2.74105 5.72021 3.04541C5.49463 3.34619 5.26546 3.62012 5.03271 3.86719C4.79997 4.11426 4.59945 4.32015 4.43115 4.48486C4.25212 4.66748 4.16439 4.85726 4.16797 5.0542C4.17155 5.25114 4.25928 5.43555 4.43115 5.60742C4.59945 5.77572 4.79997 5.9834 5.03271 6.23047C5.26546 6.47754 5.49463 6.75326 5.72021 7.05762C5.9458 7.3584 6.132 7.67529 6.27881 8.0083C6.4292 8.34131 6.50439 8.67611 6.50439 9.0127V9.10938C6.50439 9.42806 6.41667 9.67334 6.24121 9.84521C6.06576 10.0171 5.82406 10.103 5.51611 10.103H0.988281Z" fill="white" />
    </svg>
  );
}

function SuccessIcon({ color = "#EF9010" }: { color?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M12.67 5.33L7.33 10.67L4.67 8" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9.33 5.33L4 10.67L1.33 8" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M8 3.33V12.67" stroke="#213786" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M3.33 8H12.67" stroke="#213786" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ComfortBadgeIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <g clipPath="url(#comfort-badge-clip)">
        <path d="M20 40C28.7641 40 33.636 40 36.818 36.818C40 33.636 40 28.767 40 20C40 11.233 40 6.36398 36.818 3.18198C33.636 0 28.7641 0 20 0C11.2359 0 6.36398 0 3.18198 3.18198C0 6.36398 0 11.2359 0 20C0 28.7641 0 33.636 3.18198 36.818C6.36398 40 11.2359 40 20 40Z" fill="url(#comfort-badge-gradient)" />
        <g clipPath="url(#comfort-star-clip)">
          <path d="M19.9998 25.75L13.8278 28.995L15.0068 22.122L10.0068 17.255L16.9068 16.255L19.9928 10.002L23.0788 16.255L29.9788 17.255L24.9788 22.122L26.1578 28.995L19.9998 25.75Z" fill="white" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </g>
      <defs>
        <linearGradient id="comfort-badge-gradient" x1="3.92857" y1="3.21429" x2="34.2857" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#D58110" />
          <stop offset="1" stopColor="#EAA242" />
        </linearGradient>
        <clipPath id="comfort-badge-clip">
          <rect width="40" height="40" fill="white" />
        </clipPath>
        <clipPath id="comfort-star-clip">
          <rect width="24" height="24" fill="white" transform="translate(8 8)" />
        </clipPath>
      </defs>
    </svg>
  );
}

function PassengerSummary() {
  return (
    <section className="services-passenger">
      <div>
        <strong>Єлизавета Р.</strong>
        <span>Студентський, АА123456</span>
      </div>
      <span className="passenger-avatar services-avatar">ЄР</span>
    </section>
  );
}

function ComfortCard() {
  return (
    <section className="services-comfort-card">
      <div className="services-comfort-body">
        <div className="services-comfort-head">
          <ComfortBadgeIcon />
          <div>
            <h2>Набір «Комфорт»</h2>
            <p>Усе необхідне для довгої дороги</p>
          </div>
        </div>
        <ul className="services-comfort-list">
          <li><SuccessIcon />Постіль (80 ₴)</li>
          <li><SuccessIcon />Вода (15 ₴)</li>
          <li><SuccessIcon />Бойовий чай (30 ₴)</li>
        </ul>
      </div>
      <div className="services-comfort-bottom">
        <strong>100 ₴</strong>
        <span>125 ₴</span>
        <button type="button">Додати набір</button>
      </div>
    </section>
  );
}

function ServiceRow({ title, price, added }: { title: string; price: string; added?: boolean }) {
  return (
    <div className="services-row">
      <div>
        <strong>{title}</strong>
        <span>{price}</span>
      </div>
      {added ? (
        <button className="services-added" type="button">
          <SuccessIcon color="#2c2a29" />
          Додано
        </button>
      ) : (
        <button className="services-plus" type="button" aria-label={`Додати ${title}`}>
          <PlusIcon />
        </button>
      )}
    </div>
  );
}

export function AdditionalServicesScreen({ params }: { params: Params }) {
  const from = first(params.from, "Київ");
  const to = first(params.to, "Жмеринка");
  const fromStation = first(params.fromStation, from);
  const toStation = first(params.toStation, to);
  const date = first(params.date, "");
  const ticketCount = Number(first(params.ticketCount, "2")) || 2;
  const backHref = {
    pathname: "/search/passengers",
    query: { from, fromStation, to, toStation, date, ticketCount },
  };
  const checkoutHref = {
    pathname: "/search/checkout",
    query: { from, fromStation, to, toStation, date, ticketCount },
  };

  return (
    <>
      <div aria-hidden="true" className="results-status-tint" />
      <main className="stage">
        <section className="phone results-phone passenger-phone services-phone" aria-label="Додаткові послуги">
          <header className="results-header passenger-header">
            <div className="results-header-main">
              <Link className="results-back" href={backHref} aria-label="Назад до даних пасажира">
                <HeaderBackIcon />
              </Link>
              <div className="results-route-head passenger-route-head">
                <h1>Квиток 1/2</h1>
                <p>2 вагон, 7 місце</p>
              </div>
              <span className="passenger-header-spacer" aria-hidden />
            </div>

            <div className="results-progress-row passenger-progress-row">
              <div className="results-progress-top">
                <span>Дані пасажирів</span>
                <button type="button">
                  <HeaderHourglassIcon />
                  12:04, {formatTickets(ticketCount)}
                  <ChevronDown size={12} strokeWidth={2.4} />
                </button>
              </div>
              <div className="results-progress passenger-progress" aria-hidden>
                <span />
                <span />
                <span />
                <span />
              </div>
            </div>
          </header>

          <PassengerSummary />

          <section className="services-sheet">
            <div className="services-content">
              <ComfortCard />

              <section className="services-list-section">
                <h2>Або оберіть самостійно</h2>
                <div className="services-list-card">
                  {services.map((service) => (
                    <ServiceRow key={service.title} {...service} />
                  ))}
                </div>
              </section>
            </div>
          </section>

          <div className="passenger-bottom-bar services-bottom-bar">
            <div>
              <strong>343.96 ₴</strong>
              <span>Вартість квитка</span>
            </div>
            <Link href={checkoutHref}>Підтвердити</Link>
          </div>
        </section>
      </main>
    </>
  );
}
