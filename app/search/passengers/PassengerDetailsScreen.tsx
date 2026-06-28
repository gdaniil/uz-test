"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

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

function PassengerChip({ initials, name, tone, image }: { initials: string; name: string; tone: string; image?: string }) {
  return (
    <button className="passenger-chip" type="button">
      <span className="passenger-avatar" style={{ background: tone }}>
        {image ? <img src={image} alt="" /> : initials}
      </span>
      <strong>{name}</strong>
    </button>
  );
}

function TextField({ label, autoFocus }: { label: string; autoFocus?: boolean }) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!autoFocus) return;
    const focusTimer = window.setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 80);
    return () => window.clearTimeout(focusTimer);
  }, [autoFocus]);

  return (
    <label className="passenger-field">
      <span>{label}</span>
      <input
        ref={inputRef}
        aria-label={label}
        autoComplete="new-password"
        autoCorrect="off"
        autoFocus={autoFocus}
        spellCheck={false}
      />
    </label>
  );
}

function AddBenefitIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <g clipPath="url(#passenger-add-benefit-clip)">
        <path d="M10 17.5C14.1421 17.5 17.5 14.1421 17.5 10C17.5 5.85786 14.1421 2.5 10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 14.1421 5.85786 17.5 10 17.5Z" stroke="#213786" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7.5 10H12.5" stroke="#213786" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10 7.5V12.5" stroke="#213786" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <defs>
        <clipPath id="passenger-add-benefit-clip">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

function Toggle() {
  const [enabled, setEnabled] = useState(false);

  return (
    <button
      className={`passenger-toggle${enabled ? " is-on" : ""}`}
      type="button"
      aria-label="Зберегти пасажира"
      aria-pressed={enabled}
      onClick={() => setEnabled((value) => !value)}
    >
      <span />
    </button>
  );
}

export function PassengerDetailsScreen({ params }: { params: Params }) {
  const from = first(params.from, "Київ");
  const to = first(params.to, "Жмеринка");
  const fromStation = first(params.fromStation, from);
  const toStation = first(params.toStation, to);
  const date = first(params.date, "");
  const ticketCount = Number(first(params.ticketCount, "2")) || 2;
  const seatsHref = {
    pathname: "/search/seats",
    query: { from, fromStation, to, toStation, date },
  };

  return (
    <>
      <div aria-hidden="true" className="results-status-tint" />
      <main className="stage">
        <section className="phone results-phone passenger-phone" aria-label="Дані пасажирів">
          <header className="results-header passenger-header">
            <div className="results-header-main">
              <Link className="results-back" href={seatsHref} aria-label="Назад до вибору місць">
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

          <nav className="passenger-chips" aria-label="Збережені пасажири">
            <PassengerChip initials="ЄР" name="Єлизавета Р." tone="#c53d3d" />
            <PassengerChip initials="ВМ" name="Веніамін М." tone="#d7d8df" image="https://www.figma.com/api/mcp/asset/1243d348-a14d-40cd-a4b1-904d983604a4" />
            <PassengerChip initials="АА" name="Альберт А." tone="#3d5fc5" />
          </nav>

          <section className="passenger-sheet">
            <div className="passenger-content">
              <div className="passenger-form-card">
                <TextField label="Прізвище" autoFocus />
                <TextField label="Ім’я" />
              </div>

              <button className="passenger-add-benefit" type="button">
                <span>Додати пільгу</span>
                <i><AddBenefitIcon /></i>
              </button>

              <div className="passenger-save-row">
                <span>Зберегти пасажира</span>
                <Toggle />
              </div>
            </div>
          </section>

          <div className="passenger-bottom-bar">
            <div>
              <strong>343.96 ₴</strong>
              <span>Вартість квитка</span>
            </div>
            <button type="button">Підтвердити</button>
          </div>
        </section>
      </main>
    </>
  );
}
