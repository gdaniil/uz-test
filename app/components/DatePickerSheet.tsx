"use client";

import { useEffect, useRef, useState } from "react";

const DAYS_UA = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"];
const MONTHS_SHORT = ["Січ", "Лют", "Бер", "Кві", "Тра", "Чер", "Лип", "Сер", "Вер", "Жов", "Лис", "Гру"];
const DAYS_SHORT = ["Нд", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
const MONTHS_UA = [
  "Січень", "Лютий", "Березень", "Квітень", "Травень", "Червень",
  "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень",
];

function startOfMonth(year: number, month: number) {
  return new Date(year, month, 1);
}

function daysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

// Monday-based offset (0 = Mon … 6 = Sun)
function firstDayOffset(year: number, month: number) {
  const d = new Date(year, month, 1).getDay(); // 0=Sun
  return (d + 6) % 7;
}

interface Props {
  open: boolean;
  selected: Date | null;
  onSelect: (date: Date) => void;
  onClose: () => void;
}

export function DatePickerSheet({ open, selected, onSelect, onClose }: Props) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [view, setView] = useState(() => {
    const d = selected ?? today;
    return { year: d.getFullYear(), month: d.getMonth() };
  });

  useEffect(() => {
    if (open) {
      const d = selected ?? today;
      setView({ year: d.getFullYear(), month: d.getMonth() });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const prevMonth = () => {
    setView(({ year, month }) => {
      if (month === 0) return { year: year - 1, month: 11 };
      return { year, month: month - 1 };
    });
  };

  const nextMonth = () => {
    setView(({ year, month }) => {
      if (month === 11) return { year: year + 1, month: 0 };
      return { year, month: month + 1 };
    });
  };

  const canGoPrev = (() => {
    const prev = view.month === 0
      ? { year: view.year - 1, month: 11 }
      : { year: view.year, month: view.month - 1 };
    return (
      prev.year > today.getFullYear() ||
      (prev.year === today.getFullYear() && prev.month >= today.getMonth())
    );
  })();

  const total = daysInMonth(view.year, view.month);
  const offset = firstDayOffset(view.year, view.month);
  const cells: (number | null)[] = [
    ...Array(offset).fill(null),
    ...Array.from({ length: total }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  const isSel = (day: number) =>
    selected !== null &&
    selected !== undefined &&
    selected.getFullYear() === view.year &&
    selected.getMonth() === view.month &&
    selected.getDate() === day;

  const isToday = (day: number) =>
    today.getFullYear() === view.year &&
    today.getMonth() === view.month &&
    today.getDate() === day;

  const isPast = (day: number) => {
    const d = new Date(view.year, view.month, day);
    return d < today;
  };

  const handleDay = (day: number) => {
    if (isPast(day)) return;
    onSelect(new Date(view.year, view.month, day));
  };

  // Drag-to-dismiss
  const sheetRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, startY: 0 });

  const onPointerDown = (e: React.PointerEvent) => {
    drag.current = { active: true, startY: e.clientY };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (!drag.current.active) return;
    drag.current.active = false;
    if (e.clientY - drag.current.startY > 60) onClose();
  };

  return (
    <>
      <div
        className={`cal-overlay${open ? " cal-overlay--open" : ""}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={sheetRef}
        className={`cal-sheet${open ? " cal-sheet--open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Вибір дати"
      >
        <div
          className="cal-handle-area"
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
        >
          <div className="cal-handle" />
        </div>

        <div className="cal-header">
          <button
            className="cal-nav"
            type="button"
            onClick={prevMonth}
            disabled={!canGoPrev}
            aria-label="Попередній місяць"
          >
            <ChevronLeft />
          </button>
          <span className="cal-month-label">
            {MONTHS_UA[view.month]} {view.year}
          </span>
          <button
            className="cal-nav"
            type="button"
            onClick={nextMonth}
            aria-label="Наступний місяць"
          >
            <ChevronRight />
          </button>
        </div>

        <div className="cal-weekdays">
          {DAYS_UA.map((d) => (
            <span key={d} className="cal-wd">{d}</span>
          ))}
        </div>

        <div className="cal-grid">
          {cells.map((day, idx) =>
            day === null ? (
              <span key={`e${idx}`} />
            ) : (
              <button
                key={day}
                type="button"
                className={[
                  "cal-day",
                  isSel(day) ? "cal-day--sel" : "",
                  isToday(day) && !isSel(day) ? "cal-day--today" : "",
                  isPast(day) ? "cal-day--past" : "",
                ].filter(Boolean).join(" ")}
                onClick={() => handleDay(day)}
                aria-pressed={isSel(day)}
                aria-disabled={isPast(day)}
              >
                {day}
              </button>
            )
          )}
        </div>

        <div className="cal-footer">
          <button className="cal-confirm" type="button" onClick={onClose}>
            {selected
              ? `Обрати · ${selected.getDate()} ${MONTHS_SHORT[selected.getMonth()]}, ${DAYS_SHORT[selected.getDay()]}`
              : "Обрати"}
          </button>
        </div>
      </div>
    </>
  );
}

const ChevronLeft = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChevronRight = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
