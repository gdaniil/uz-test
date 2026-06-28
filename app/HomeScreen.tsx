"use client";

import { Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { BottomNav } from "./components/BottomNav";
import { BottomSheetContent } from "./components/BottomSheetContent";
import { DatePickerSheet } from "./components/DatePickerSheet";

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

const MONTHS_SHORT = ["Січ", "Лют", "Бер", "Кві", "Тра", "Чер", "Лип", "Сер", "Вер", "Жов", "Лис", "Гру"];
const DAYS_SHORT = ["Нд", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];

function formatDate(date: Date | null): string {
  if (!date) return "Дата відправлення";
  return `${date.getDate()} ${MONTHS_SHORT[date.getMonth()]}, ${DAYS_SHORT[date.getDay()]}`;
}

const SHEET_COLLAPSED = 454;
const SHEET_EXPANDED = 48;

export function HomeScreen() {
  const [from, setFrom] = useState<Station | null>(null);
  const [to, setTo] = useState<Station | null>(null);
  const [activeField, setActiveField] = useState<Field | null>(null);
  const [query, setQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const sheetRef = useRef<HTMLElement>(null);
  const [sheetSnap, setSheetSnap] = useState<"collapsed" | "expanded">("collapsed");
  const drag = useRef({ active: false, startY: 0, startTop: 0 });

  const onSheetPointerDown = (e: React.PointerEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    const startedOnHandle = Boolean(target.closest(".sheet-handle-area"));
    const startedInScrollableContent = Boolean(target.closest(".sheet-scroll"));

    if (sheetSnap === "expanded" && startedInScrollableContent && !startedOnHandle) return;

    drag.current = {
      active: true,
      startY: e.clientY,
      startTop: sheetSnap === "collapsed" ? SHEET_COLLAPSED : SHEET_EXPANDED,
    };
    if (sheetRef.current) sheetRef.current.style.transition = "none";
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onSheetPointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (!drag.current.active || !sheetRef.current) return;
    const delta = e.clientY - drag.current.startY;
    const top = Math.max(SHEET_EXPANDED, Math.min(SHEET_COLLAPSED, drag.current.startTop + delta));
    sheetRef.current.style.top = `${top}px`;
  };

  const onSheetPointerUp = (e: React.PointerEvent<HTMLElement>) => {
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
    <>
      {/* iOS 26 Safari reads the topmost position:fixed element's background for the status bar tint */}
      <div aria-hidden="true" style={{ position: "fixed", top: 0, left: 0, right: 0, height: "max(env(safe-area-inset-top), 6px)", background: "#213786", zIndex: 9999, pointerEvents: "none" }} />
    <main className="stage">
      <section className="phone" aria-label="Прототип пошуку квитків">
        <header className="brand-header">
          <img className="brand-logo" src="/icons/uz-wordmark.svg" alt="Укрзалізниця" />
          <div className="header-actions">
            <button className="bonus-pill" type="button" aria-label="Баланс бонусів: 1500">
              <img src="/icons/uz-bonus-silver.svg" alt="" />
              <span>1500</span>
            </button>
            <Link href="/notifications" className="header-icon-button" aria-label="Сповіщення">
              <img src="/icons/notification-muted.svg" alt="" />
            </Link>
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
              <button
                type="button"
                className="date-trigger"
                onClick={() => setShowDatePicker(true)}
              >
                <img src="/icons/search-calendar.svg" alt="" />
                <span>{formatDate(selectedDate)}</span>
              </button>
              <div><img src="/icons/search-add.svg" alt="" /><span>Зворотний<br />квиток</span></div>
            </div>

            <button className="search-button" type="button">
              Знайти
            </button>
          </div>

        </section>

        <section
          className={`static-sheet ${sheetSnap === "collapsed" ? "is-collapsed" : "is-expanded"}`}
          ref={sheetRef as React.RefObject<HTMLElement>}
          aria-hidden="true"
          onPointerDown={onSheetPointerDown}
          onPointerMove={onSheetPointerMove}
          onPointerUp={onSheetPointerUp}
          onPointerCancel={onSheetPointerUp}
        >
          <div
            className="sheet-handle-area"
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

        <DatePickerSheet
          open={showDatePicker}
          selected={selectedDate}
          onSelect={(date) => setSelectedDate(date)}
          onClose={() => setShowDatePicker(false)}
        />

        <BottomNav active="search" />
      </section>
    </main>
    </>
  );
}
