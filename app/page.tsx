"use client";

import { Search } from "lucide-react";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { flushSync } from "react-dom";

type Field = "from" | "to";
type Tab = "search" | "tickets";

type Station = {
  city: string;
  station: string;
  region?: string;
};

const stations: Station[] = [
  { city: "Київ", station: "Київ-Пасажирський" },
  { city: "Львів", station: "Львів" },
  { city: "Дніпро", station: "Дніпро-Головний" },
  { city: "Одеса", station: "Одеса-Головна" },
  { city: "Харків", station: "Харків-Пасажирський" },
  { city: "Запоріжжя", station: "Запоріжжя-1" },
  { city: "Івано-Франківськ", station: "Івано-Франківськ" },
  { city: "Вінниця", station: "Вінниця" },
  { city: "Чернівці", station: "Чернівці" },
  { city: "Полтава", station: "Полтава-Київська" },
  { city: "Ужгород", station: "Ужгород" },
  { city: "Краматорськ", station: "Краматорськ" },
];

// ---- Tickets Tab ----

type TicketData = {
  date: string;
  labels: { text: string; bg: string }[];
  departure: { time: string; station: string };
  arrival: { time: string; station: string };
  duration: string;
  notice?: string;
  transfer?: { time: string; station: string; layover: string };
  passengerCount: number;
  showButton?: boolean;
};

const TICKETS: TicketData[] = [
  {
    date: "22 Жовтня, п'ятниця",
    labels: [
      { text: "116K", bg: "#1b2d6d" },
      { text: "ІС+", bg: "#3a5cb5" },
    ],
    departure: { time: "15:17", station: "Київ" },
    arrival: { time: "21:08", station: "Жмеринка" },
    duration: "5 год 51 хв",
    notice: "Потяг прибуває на 11 колію",
    passengerCount: 2,
    showButton: true,
  },
  {
    date: "25 Жовтня, понеділок",
    labels: [{ text: "116K", bg: "#1b2d6d" }],
    departure: { time: "15:17", station: "Жмеринка" },
    arrival: { time: "21:08", station: "Київ" },
    duration: "5 год 51 хв",
    transfer: {
      time: "17:34",
      station: "Полтава",
      layover: "Пересадка 2 год 21 хв",
    },
    passengerCount: 2,
  },
];

function HistoryIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <g clipPath="url(#clip-history)">
        <path d="M8 5.33334V8.00001L9.33333 9.33334" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2.03333 7.33332C2.18272 5.86669 2.86683 4.50639 3.95515 3.51196C5.04346 2.51753 6.45979 1.95857 7.93391 1.94174C9.40803 1.9249 10.8368 2.45136 11.9475 3.42067C13.0582 4.38999 13.7733 5.7343 13.9561 7.19714C14.139 8.65997 13.7769 10.1389 12.9389 11.3518C12.1009 12.5647 10.8458 13.4267 9.41285 13.7732C7.97994 14.1198 6.4696 13.9266 5.16999 13.2307C3.87038 12.5348 2.87247 11.3847 2.36666 9.99998M2.03333 13.3333V9.99998H5.36666" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
      <defs>
        <clipPath id="clip-history"><rect width="16" height="16" fill="white"/></clipPath>
      </defs>
    </svg>
  );
}

function QrIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <g clipPath="url(#clip-qr)">
        <path d="M7.49998 3.33331H4.16665C3.70641 3.33331 3.33331 3.70641 3.33331 4.16665V7.49998C3.33331 7.96022 3.70641 8.33331 4.16665 8.33331H7.49998C7.96022 8.33331 8.33331 7.96022 8.33331 7.49998V4.16665C8.33331 3.70641 7.96022 3.33331 7.49998 3.33331Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M5.83331 14.1667V14.175" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M15.8334 3.33331H12.5C12.0398 3.33331 11.6667 3.70641 11.6667 4.16665V7.49998C11.6667 7.96022 12.0398 8.33331 12.5 8.33331H15.8334C16.2936 8.33331 16.6667 7.96022 16.6667 7.49998V4.16665C16.6667 3.70641 16.2936 3.33331 15.8334 3.33331Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M5.83331 5.83331V5.84165" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M7.49998 11.6667H4.16665C3.70641 11.6667 3.33331 12.0398 3.33331 12.5V15.8334C3.33331 16.2936 3.70641 16.6667 4.16665 16.6667H7.49998C7.96022 16.6667 8.33331 16.2936 8.33331 15.8334V12.5C8.33331 12.0398 7.96022 11.6667 7.49998 11.6667Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M14.1667 5.83331V5.84165" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M11.6667 11.6667H14.1667" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16.6667 11.6667V11.675" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M11.6667 11.6667V14.1667" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M11.6667 16.6667H14.1667" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M14.1667 14.1667H16.6667" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16.6667 14.1667V16.6667" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
      <defs>
        <clipPath id="clip-qr"><rect width="20" height="20" fill="white"/></clipPath>
      </defs>
    </svg>
  );
}

function TransferIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <g clipPath="url(#clip-transfer)">
        <path d="M7.33329 14C7.33329 14.3682 7.63177 14.6666 7.99996 14.6666C8.36815 14.6666 8.66663 14.3682 8.66663 14C8.66663 13.6318 8.36815 13.3333 7.99996 13.3333C7.63177 13.3333 7.33329 13.6318 7.33329 14Z" fill="#2C2E32" stroke="#2C2E32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M7.33329 1.99998C7.33329 2.36817 7.63177 2.66665 7.99996 2.66665C8.36815 2.66665 8.66663 2.36817 8.66663 1.99998C8.66663 1.63179 8.36815 1.33331 7.99996 1.33331C7.63177 1.33331 7.33329 1.63179 7.33329 1.99998Z" fill="#2C2E32" stroke="#2C2E32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M5.33329 7.99998C5.33329 9.47274 6.5272 10.6666 7.99996 10.6666C9.47272 10.6666 10.6666 9.47274 10.6666 7.99998C10.6666 6.52722 9.47272 5.33331 7.99996 5.33331C6.5272 5.33331 5.33329 6.52722 5.33329 7.99998Z" stroke="#2C2E32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
      <defs>
        <clipPath id="clip-transfer"><rect width="16" height="16" fill="white"/></clipPath>
      </defs>
    </svg>
  );
}

function TicketCard({ ticket }: { ticket: TicketData }) {
  const hasTransfer = Boolean(ticket.transfer);

  return (
    <div className="ticket-card">
      {/* Train type labels */}
      <div className="ticket-labels">
        {ticket.labels.map((l) => (
          <span key={l.text} className="ticket-label" style={{ background: l.bg }}>
            {l.text}
          </span>
        ))}
      </div>

      {/* Route */}
      <div className={`ticket-route-section${hasTransfer ? " gap-md" : ""}`}>
        <div className="ticket-stations">
          <div className="ticket-station">
            <span className="t-time">{ticket.departure.time}</span>
            <span className="t-station">{ticket.departure.station}</span>
          </div>

          <div className="ticket-route-line">
            <div className="route-dot route-dot-start" />
            <div className="route-track">
              <span className="route-dur">{ticket.duration}</span>
            </div>
            <div className="route-dot route-dot-end" />
          </div>

          <div className="ticket-station ticket-station-right">
            <span className="t-time">{ticket.arrival.time}</span>
            <span className="t-station">{ticket.arrival.station}</span>
          </div>
        </div>

        {ticket.notice && (
          <div className="ticket-notice">
            <div className="notice-dot" />
            <span className="notice-text">{ticket.notice}</span>
          </div>
        )}

        {ticket.transfer && (
          <div className="ticket-transfer">
            <TransferIcon />
            <span className="transfer-station">
              {ticket.transfer.time} {ticket.transfer.station}
            </span>
            <span className="transfer-layover">{ticket.transfer.layover}</span>
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="ticket-divider-wrap">
        <div className="ticket-divider" />
      </div>

      {/* Passengers */}
      <div className={`ticket-passengers${ticket.showButton ? "" : " pb"}`}>
        <div className="ticket-avatars">
          <div className="ticket-avatar avatar-red">ЄР</div>
          <div className="ticket-avatar avatar-photo">ДГ</div>
        </div>
        <span className="passengers-label">{ticket.passengerCount} пасажири</span>
      </div>

      {/* Show tickets CTA */}
      {ticket.showButton && (
        <div className="ticket-btn-wrap">
          <button className="show-tickets-btn" type="button">
            <QrIcon />
            Показати квитки
          </button>
        </div>
      )}
    </div>
  );
}

function TicketsTab() {
  return (
    <div className="tickets-page">
      <div className="tickets-header-row">
        <h1 className="tickets-title">Придбані квитки</h1>
        <button className="archive-btn" type="button">
          <HistoryIcon />
          Архів
        </button>
      </div>

      <div className="tickets-content">
        {TICKETS.map((ticket) => (
          <div key={ticket.date} className="ticket-group">
            <div className="ticket-date">{ticket.date}</div>
            <TicketCard ticket={ticket} />
          </div>
        ))}
      </div>
    </div>
  );
}

// ---- Main Component ----

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>("search");
  const [from, setFrom] = useState<Station | null>(null);
  const [to, setTo] = useState<Station | null>(null);
  const [activeField, setActiveField] = useState<Field | null>(null);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("uk");
    if (!normalized) return stations.slice(0, 6);
    return stations.filter(({ city, station }) =>
      `${city} ${station}`.toLocaleLowerCase("uk").includes(normalized),
    );
  }, [query]);

  useLayoutEffect(() => {
    if (!activeField) return;
    inputRef.current?.focus({ preventScroll: true });
  }, [activeField]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveField(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const openPicker = (field: Field) => {
    flushSync(() => {
      setActiveField(field);
      setQuery("");
    });
    inputRef.current?.focus({ preventScroll: true });
  };

  const selectStation = (station: Station) => {
    if (activeField === "from") {
      flushSync(() => {
        setFrom(station);
        setActiveField("to");
        setQuery("");
      });
      inputRef.current?.focus({ preventScroll: true });
      return;
    }
    if (activeField === "to") {
      setTo(station);
      setActiveField(null);
    }
    setQuery("");
  };

  const swapStations = () => {
    setFrom(to);
    setTo(from);
  };

  const switchTab = (tab: Tab) => {
    setActiveField(null);
    setActiveTab(tab);
  };

  return (
    <main className="stage">
      <section className="phone" aria-label="Прототип пошуку квитків">
        {activeTab === "tickets" && <TicketsTab />}

        {activeTab === "search" && (
          <>
            <header className="brand-header">
              <img className="brand-logo" src="/icons/uz-wordmark.svg" alt="Укрзалізниця" />
            </header>

            <div className="tabs" aria-label="Тип сполучення">
              <button className="tab active" type="button"><img src="/icons/tab-uz.svg" alt="" />Дальні</button>
              <button className="tab" type="button"><img src="/icons/tab-suburban.svg" alt="" />Приміські</button>
              <button className="tab" type="button"><img src="/icons/tab-city-express.svg" alt="" />City Express</button>
            </div>

            <section className="search-card">
              <div className="route-box">
                <button className="route-row" type="button" onClick={() => openPicker("from")}>
                  <img className="route-step" src="/icons/search-step-from.svg" alt="" />
                  <span className="route-copy">
                    <strong>{from?.city ?? "Звідки"}</strong>
                    <small>{from?.station ?? "Станція відправлення"}</small>
                  </span>
                </button>

                <div className="route-divider">
                  <img className="route-connector" src="/icons/search-route-line.svg" alt="" />
                  <span />
                  <button className="swap" type="button" aria-label="Поміняти станції місцями" onClick={swapStations}>
                    <img src="/icons/search-switch.svg" alt="" />
                  </button>
                </div>

                <button className="route-row" type="button" onClick={() => openPicker("to")}>
                  <img className="route-step" src="/icons/search-step-to.svg" alt="" />
                  <span className="route-copy">
                    <strong>{to?.city ?? "Куди"}</strong>
                    <small>{to?.station ?? "Станція прибуття"}</small>
                  </span>
                </button>
              </div>

              <div className="dates-panel">
                <div className="date-row">
                  <div><img src="/icons/search-calendar.svg" alt="" /><span>22 Жовтня</span></div>
                  <div><img src="/icons/search-add.svg" alt="" /><span>Зворотний<br />квиток</span></div>
                </div>

                <button className="search-button" type="button">
                  Знайти
                </button>
              </div>
            </section>

            <section className="static-sheet" aria-hidden="true">
              <div className="handle" />
              <article className="notice-card">
                <div>
                  <h2>Подорожуйте Україною</h2>
                  <p>Знаходьте потрібні рейси та купуйте квитки онлайн.</p>
                </div>
              </article>
            </section>

            <div className={`picker ${activeField ? "open" : ""}`} aria-hidden={!activeField}>
              <section className="picker-route" aria-label="Пошук маршруту">
                {(["from", "to"] as const).map((field) => {
                  const isActive = activeField === field;
                  const selected = field === "from" ? from : to;
                  const placeholder = field === "from" ? "Звідки" : "Куди";

                  return (
                    <div className={`picker-route-row ${isActive ? "active" : ""}`} key={field}>
                      {field === "from" ? (
                        <button className="picker-back" type="button" aria-label="Закрити пошук" onClick={() => setActiveField(null)}>
                          <img src="/icons/picker-back.svg" alt="" />
                        </button>
                      ) : <span className="picker-row-spacer" />}

                      {isActive ? (
                        <input
                          ref={inputRef}
                          value={query}
                          onChange={(event) => setQuery(event.target.value)}
                          placeholder={placeholder}
                          aria-label={placeholder}
                          autoFocus
                          autoComplete="off"
                          autoCorrect="off"
                          spellCheck={false}
                        />
                      ) : (
                        <button className={`picker-route-value ${selected ? "selected" : ""}`} type="button" onClick={() => openPicker(field)}>
                          {selected?.city ?? placeholder}
                        </button>
                      )}
                    </div>
                  );
                })}

                <button className="picker-switch" type="button" aria-label="Поміняти станції місцями" onClick={swapStations}>
                  <img src="/icons/search-switch.svg" alt="" />
                </button>
              </section>

              <section className="picker-results" aria-live="polite">
                <div className="picker-results-list">
                  {results.map((station) => (
                    <button className="picker-station" type="button" key={station.station} onClick={() => selectStation(station)}>
                      <img src="/icons/picker-station.svg" alt="" />
                      <span>{station.station}</span>
                    </button>
                  ))}
                  {results.length === 0 && (
                    <div className="picker-empty">
                      <Search size={24} />
                      <strong>Нічого не знайдено</strong>
                      <span>Перевірте назву міста або станції</span>
                    </div>
                  )}
                </div>
              </section>
            </div>
          </>
        )}

        <nav className="tabbar" aria-label="Головна навігація">
          <button
            className={activeTab === "search" ? "selected" : ""}
            onClick={() => switchTab("search")}
          >
            <img src="/icons/tabbar-search.svg" alt="" />
            Пошук
          </button>
          <button
            className={activeTab === "tickets" ? "selected" : ""}
            onClick={() => switchTab("tickets")}
          >
            <img src="/icons/tabbar-tickets.svg" alt="" />
            Квитки
          </button>
          <button>
            <img src="/icons/tabbar-schedule.svg" alt="" />
            Табло
          </button>
          <button>
            <img src="/icons/tabbar-profile.svg" alt="" />
            Профіль
          </button>
        </nav>
      </section>
    </main>
  );
}
