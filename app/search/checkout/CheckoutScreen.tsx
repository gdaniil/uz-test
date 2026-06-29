"use client";

import { X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Params = Record<string, string | string[] | undefined>;

function first(value: string | string[] | undefined, fallback: string) {
  if (Array.isArray(value)) return value[0] ?? fallback;
  return value ?? fallback;
}

function formatTickets(count: number) {
  if (count % 10 === 1 && count % 100 !== 11) return `${count} квиток`;
  if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100)) return `${count} квитки`;
  return `${count} квитків`;
}

function useCountdown(initialSeconds: number) {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSecondsLeft((value) => Math.max(0, value - 1));
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

function HourglassIcon() {
  return (
    <svg width="7" height="11" viewBox="0 0 7 11" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M0.988 10.103C0.684 10.103 0.442 10.017 0.263 9.845C0.088 9.673 0 9.428 0 9.109V9.013C0 8.676 0.073 8.341 0.22 8.008C0.371 7.675 0.559 7.358 0.784 7.058C1.01 6.753 1.239 6.478 1.472 6.23C1.704 5.983 1.903 5.776 2.068 5.607C2.243 5.436 2.333 5.251 2.336 5.054C2.344 4.857 2.254 4.667 2.068 4.485C1.903 4.32 1.704 4.114 1.472 3.867C1.239 3.62 1.01 3.346 0.784 3.045C0.559 2.741 0.371 2.422 0.22 2.089C0.073 1.756 0 1.42 0 1.08V0.999C0 0.677 0.088 0.43 0.263 0.258C0.442 0.086 0.684 0 0.988 0H5.516C5.824 0 6.066 0.086 6.241 0.258C6.417 0.43 6.504 0.677 6.504 0.999V1.08C6.504 1.42 6.429 1.756 6.279 2.089C6.132 2.422 5.946 2.741 5.72 3.045C5.495 3.346 5.265 3.62 5.033 3.867C4.8 4.114 4.599 4.32 4.431 4.485C4.252 4.667 4.164 4.857 4.168 5.054C4.172 5.251 4.259 5.436 4.431 5.607C4.599 5.776 4.8 5.983 5.033 6.23C5.265 6.478 5.495 6.753 5.72 7.058C5.946 7.358 6.132 7.675 6.279 8.008C6.429 8.341 6.504 8.676 6.504 9.013V9.109C6.504 9.428 6.417 9.673 6.241 9.845C6.066 10.017 5.824 10.103 5.516 10.103H0.988Z" fill="currentColor" />
    </svg>
  );
}

function TicketIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <g clipPath="url(#checkout-ticket-clip)">
        <path d="M10 3.333V4.667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10 7.333V8.667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10 11.333V12.667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3.333 3.333H12.667C13.02 3.333 13.359 3.474 13.609 3.724C13.86 3.974 14 4.313 14 4.667V6.667C13.646 6.667 13.307 6.807 13.057 7.057C12.807 7.307 12.667 7.646 12.667 8C12.667 8.354 12.807 8.693 13.057 8.943C13.307 9.193 13.646 9.333 14 9.333V11.333C14 11.687 13.86 12.026 13.609 12.276C13.359 12.526 13.02 12.667 12.667 12.667H3.333C2.98 12.667 2.641 12.526 2.391 12.276C2.14 12.026 2 11.687 2 11.333V9.333C2.354 9.333 2.693 9.193 2.943 8.943C3.193 8.693 3.333 8.354 3.333 8C3.333 7.646 3.193 7.307 2.943 7.057C2.693 6.807 2.354 6.667 2 6.667V4.667C2 4.313 2.14 3.974 2.391 3.724C2.641 3.474 2.98 3.333 3.333 3.333Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <defs>
        <clipPath id="checkout-ticket-clip">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

function ApplePayMark() {
  return (
    <svg className="checkout-apple-mark" width="38" height="24" viewBox="0 0 38 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <rect x=".5" y=".5" width="37" height="23" rx="1.5" fill="white" stroke="#D5DAE7" />
      <text x="7" y="15.6" fill="#000" fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif" fontSize="11" fontWeight="600">Pay</text>
    </svg>
  );
}

function MoreIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M8 3.5V3.51M8 8V8.01M8 12.5V12.51" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

function PaymentChevronIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M16 .5C24.56 .5 31.5 7.44 31.5 16S24.56 31.5 16 31.5.5 24.56.5 16 7.44 .5 16 .5Z" fill="#EFF1F6" />
      <path d="M16 .5C24.56 .5 31.5 7.44 31.5 16S24.56 31.5 16 31.5.5 24.56.5 16 7.44 .5 16 .5Z" stroke="#D5DAE7" />
      <g clipPath="url(#checkout-payment-chevron-clip)">
        <path d="M14 12L18 16L14 20" stroke="#2C2A29" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <defs>
        <clipPath id="checkout-payment-chevron-clip">
          <rect width="16" height="16" fill="white" transform="translate(8 8)" />
        </clipPath>
      </defs>
    </svg>
  );
}

function Money({ children, strong = false }: { children: string; strong?: boolean }) {
  return <span className={strong ? "checkout-money checkout-money-strong" : "checkout-money"}>{children}</span>;
}

function TicketBlock({ wagon, passenger, total, services }: { wagon: string; passenger: string; total: string; services: Array<[string, string]> }) {
  return (
    <section className="checkout-ticket">
      <div className="checkout-ticket-head">
        <TicketIcon />
        <span>{wagon}</span>
        <MoreIcon />
      </div>
      <div className="checkout-row checkout-person">
        <strong>{passenger}</strong>
        <Money strong>{total}</Money>
      </div>
      {services.map(([label, price]) => (
        <div className="checkout-row checkout-service" key={label}>
          <span>{label}</span>
          <Money>{price}</Money>
        </div>
      ))}
    </section>
  );
}

export function CheckoutScreen({ params }: { params: Params }) {
  const router = useRouter();
  const from = first(params.from, "Київ");
  const to = first(params.to, "Жмеринка");
  const fromStation = first(params.fromStation, from);
  const toStation = first(params.toStation, to);
  const date = first(params.date, "");
  const ticketCount = Number(first(params.ticketCount, "2")) || 2;
  const bookingTime = useCountdown(606);
  const seatsHref = {
    pathname: "/search/seats",
    query: { from, fromStation, to, toStation, date, ticketCount },
  };
  const handlePay = () => {
    router.push("/tickets?payment=success");
  };

  return (
    <>
      <div aria-hidden="true" className="results-status-tint checkout-status-tint" />
      <main className="stage">
        <section className="phone checkout-phone" aria-label="Оплата">
          <header className="checkout-header">
            <div className="checkout-title">
              <h1>Оплата</h1>
              <p>{formatTickets(ticketCount)}</p>
            </div>
            <Link className="checkout-cancel" href={seatsHref} aria-label="Скасувати оплату">
              <X size={16} strokeWidth={2.1} />
              <span>Скасувати</span>
            </Link>
          </header>

          <div className="checkout-reserved">
            <HourglassIcon />
            <span>Забронювали вибрані місця на {bookingTime}</span>
          </div>

          <section className="checkout-sheet">
            <div className="checkout-trip">
              <h2>116К Київ — Полтава</h2>
              <p>24 жов, чт, 15:17</p>
            </div>

            <div className="checkout-tickets">
              <TicketBlock
                wagon="Вагон 5, місце 44"
                passenger="Веніамін Матусевич"
                total="313.96 ₴"
                services={[
                  ["+ Постіль", "80 ₴"],
                  ["+ Вода (0.5л)", "15 ₴"],
                ]}
              />
              <TicketBlock
                wagon="Вагон 5, місце 33"
                passenger="Єлизавета Рєзнік"
                total="253.96 ₴"
                services={[["+ Бойовий чай ", "25 ₴"]]}
              />
            </div>

            <div className="checkout-divider" />

            <div className="checkout-summary">
              <div className="checkout-row">
                <span>Квитки</span>
                <Money>500 ₴</Money>
              </div>
              <div className="checkout-row">
                <span>Додаткові послуги</span>
                <Money>67.92 ₴</Money>
              </div>
            </div>
          </section>

          <div className="checkout-pay-panel">
            <div className="checkout-pay-method">
              <ApplePayMark />
              <strong>Apple Pay</strong>
              <button type="button" aria-label="Обрати спосіб оплати">
                <PaymentChevronIcon />
              </button>
            </div>
            <div className="checkout-pay-action">
              <div>
                <strong>567.92 ₴</strong>
                <span>До сплати</span>
              </div>
              <button type="button" aria-label="Оплатити Apple Pay" onClick={handlePay}>
                <span>Pay</span>
              </button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
