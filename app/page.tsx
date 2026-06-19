"use client";

import { Circle, Clock3, Search, TrainFront } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

type Field = "from" | "to";

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

export default function Home() {
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

  useEffect(() => {
    if (!activeField) return;
    const timer = window.setTimeout(() => inputRef.current?.focus(), 220);
    return () => window.clearTimeout(timer);
  }, [activeField]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveField(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const openPicker = (field: Field) => {
    setActiveField(field);
    setQuery("");
  };

  const selectStation = (station: Station) => {
    if (activeField === "from") {
      setFrom(station);
      setActiveField("to");
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

  return (
    <main className="stage">
      <section className="phone" aria-label="Прототип пошуку квитків">
        <header className="brand-header">
          <div className="wordmark">УКРЗАЛІЗНИЦЯ</div>
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
            <TrainFront size={42} />
          </article>
          <h2 className="recent-title">Ви шукали</h2>
          <article className="recent-card">
            <Clock3 size={22} />
            <div><strong>Київ → Дніпро</strong><small>22 жовтня, 1 пасажир</small></div>
          </article>
        </section>

        <nav className="tabbar" aria-label="Головна навігація">
          <span><Clock3 size={21} />Розклад</span>
          <span className="selected"><Search size={21} />Пошук</span>
          <span><TrainFront size={21} />Квитки</span>
          <span><Circle size={21} />Профіль</span>
        </nav>

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
                  <img src="/icons/picker-station.png" alt="" />
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
      </section>
    </main>
  );
}
