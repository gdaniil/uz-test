"use client";

import { useState } from "react";

type TrainEntry = {
  number: string;
  from: string;
  to: string;
  time: string;
  track: string;
  delayed?: boolean;
  delayMinutes?: number;
};

type ScheduleMode = "arrival" | "departure";

const TRAINS: TrainEntry[] = [
  { number: "0513", from: "Київ-Пасажирський", to: "Гречани", time: "9:38", track: "8" },
  { number: "0513", from: "Київ-Пасажирський", to: "Гречани", time: "9:44", track: "3" },
  { number: "0513", from: "Київ-Пасажирський", to: "Гречани", time: "11:02", track: "–", delayed: true, delayMinutes: 10 },
  { number: "0513", from: "Київ-Пасажирський", to: "Гречани", time: "22:22", track: "–" },
];

function SwitchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <g clipPath="url(#clip-switch-sched)">
        <path d="M2 5.33334L4.66667 2.66667L7.33333 5.33334" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4.66667 2.66667V8.66667" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8.66667 10.6667L11.3333 13.3333L14 10.6667" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M11.3333 6.66666V13.3333" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <defs>
        <clipPath id="clip-switch-sched"><rect width="16" height="16" fill="white" /></clipPath>
      </defs>
    </svg>
  );
}

function AlertIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <g clipPath="url(#clip-alert-sched)">
        <path d="M12 15V15.01M12 9V11V9Z" stroke="#E89A30" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M5 19H19C19.3263 18.9977 19.6471 18.9156 19.9344 18.7609C20.2217 18.6061 20.4667 18.3834 20.6482 18.1122C20.8297 17.841 20.942 17.5295 20.9754 17.2049C21.0089 16.8803 20.9624 16.5525 20.84 16.25L13.74 4C13.567 3.6874 13.3135 3.42683 13.0058 3.24539C12.698 3.06394 12.3473 2.96825 11.99 2.96825C11.6327 2.96825 11.282 3.06394 10.9742 3.24539C10.6665 3.42683 10.413 3.6874 10.24 4L3.14 16.25C3.01994 16.5456 2.97233 16.8656 3.00115 17.1833C3.02997 17.501 3.13437 17.8073 3.30565 18.0764C3.47693 18.3456 3.71011 18.5698 3.98573 18.7305C4.26134 18.8912 4.57139 18.9836 4.89 19" stroke="#E89A30" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <defs>
        <clipPath id="clip-alert-sched"><rect width="24" height="24" fill="white" /></clipPath>
      </defs>
    </svg>
  );
}

export function ScheduleScreen() {
  const [mode, setMode] = useState<ScheduleMode>("arrival");

  return (
    <div className="schedule-page">
      <div className="schedule-header">
        <h1 className="schedule-title">Табло</h1>
        <button className="schedule-station-btn" type="button">
          <SwitchIcon />
          <span>Київ-Пасажирський</span>
        </button>
      </div>

      <div className="schedule-card">
        <div className="schedule-seg" role="group" aria-label="Режим табло">
          <button
            className={`schedule-seg-btn${mode === "arrival" ? " active" : ""}`}
            type="button"
            onClick={() => setMode("arrival")}
          >
            Прибуття
          </button>
          <button
            className={`schedule-seg-btn${mode === "departure" ? " active" : ""}`}
            type="button"
            onClick={() => setMode("departure")}
          >
            Відправлення
          </button>
        </div>

        <div className="schedule-list">
          <div className="sched-header-row">
            <span className="sc-train">Потяг</span>
            <span className="sc-route">Сполучення</span>
            <span className="sc-time">Час</span>
            <span className="sc-track">Колія</span>
          </div>

          {TRAINS.map((train, i) => (
            <div key={i} className={`sched-entry${train.delayed ? " is-delayed" : ""}`}>
              <div className={`sched-row${train.delayed ? " orange" : " green"}`}>
                <span className="sc-train">{train.number}</span>
                <div className="sc-route">
                  <span>{train.from}</span>
                  <span>→ {train.to}</span>
                </div>
                <span className="sc-time">{train.time}</span>
                <span className={`sc-track${train.track === "–" ? " sc-track-muted" : " sc-track-white"}`}>
                  {train.track}
                </span>
              </div>
              {train.delayed && (
                <div className="sched-delay-banner">
                  <AlertIcon />
                  <span>Потяг затримується на {train.delayMinutes} хвилин</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
