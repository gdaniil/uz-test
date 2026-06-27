"use client";

import { Search } from "lucide-react";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { BottomNav } from "./components/BottomNav";
import { BottomSheetContent } from "./components/BottomSheetContent";

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

const SHEET_COLLAPSED = 454;
const SHEET_EXPANDED = 48;

export default function Home() {
  const [from, setFrom] = useState<Station | null>(null);
  const [to, setTo] = useState<Station | null>(null);
  const [activeField, setActiveField] = useState<Field | null>(null);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const sheetRef = useRef<HTMLElement>(null);
  const [sheetSnap, setSheetSnap] = useState<"collapsed" | "expanded">("collapsed");
  const drag = useRef({ active: false, startY: 0, startTop: 0 });

  const onSheetPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    drag.current = {
      active: true,
      startY: e.clientY,
      startTop: sheetSnap === "collapsed" ? SHEET_COLLAPSED : SHEET_EXPANDED,
    };
    if (sheetRef.current) sheetRef.current.style.transition = "none";
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onSheetPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current.active || !sheetRef.current) return;
    const delta = e.clientY - drag.current.startY;
    const top = Math.max(SHEET_EXPANDED, Math.min(SHEET_COLLAPSED, drag.current.startTop + delta));
    sheetRef.current.style.top = `${top}px`;
  };

  const onSheetPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current.active || !sheetRef.current) return;
    drag.current.active = false;
    const delta = e.clientY - drag.current.startY;
    const rawTop = Math.max(SHEET_EXPANDED, Math.min(SHEET_COLLAPSED, drag.current.startTop + delta));
    const next = rawTop < (SHEET_COLLAPSED + SHEET_EXPANDED) / 2 ? "expanded" : "collapsed";
    const targetTop = next === "collapsed" ? SHEET_COLLAPSED : SHEET_EXPANDED;
    sheetRef.current.style.transition = "top 0.45s cubic-bezier(0.32, 0.72, 0, 1)";
    sheetRef.current.style.top = `${targetTop}px`;
    setSheetSnap(next);
  };

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

  return (
    <main className="stage">
      <section className="phone" aria-label="Прототип пошуку квитків">
        <header className="brand-header">
          <img className="brand-logo" src="/icons/uz-wordmark.svg" alt="Укрзалізниця" />
          <div className="header-actions">
            <button className="bonus-pill" type="button" aria-label="Баланс бонусів: 1500">
              <img src="/icons/uz-bonus-silver.svg" alt="" />
              <span>1500</span>
            </button>
            <button className="header-icon-button" type="button" aria-label="Сповіщення">
              <img src="/icons/notification-muted.svg" alt="" />
            </button>
          </div>
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

        <section className="static-sheet" ref={sheetRef as React.RefObject<HTMLElement>} aria-hidden="true">
          <div
            className="sheet-handle-area"
            onPointerDown={onSheetPointerDown}
            onPointerMove={onSheetPointerMove}
            onPointerUp={onSheetPointerUp}
            onPointerCancel={onSheetPointerUp}
          >
            <div className="handle" />
          </div>
          <BottomSheetContent />
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

        <BottomNav active="search" />
      </section>
    </main>
  );
}
