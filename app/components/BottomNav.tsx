"use client";

import { Bell, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

type BottomNavProps = {
  active: "search" | "tickets" | "schedule" | "profile";
};

type TabbarMode = {
  monitoring: boolean;
  continueBooking: boolean;
};

const TABBAR_MODE_KEY = "uz-tabbar-mode";
const DEFAULT_TABBAR_MODE: TabbarMode = {
  monitoring: false,
  continueBooking: false,
};

function readTabbarMode(): TabbarMode {
  if (typeof window === "undefined") {
    return DEFAULT_TABBAR_MODE;
  }

  try {
    const saved = window.localStorage.getItem(TABBAR_MODE_KEY);
    return saved ? { ...DEFAULT_TABBAR_MODE, ...JSON.parse(saved) } : DEFAULT_TABBAR_MODE;
  } catch {
    return DEFAULT_TABBAR_MODE;
  }
}

function writeTabbarMode(mode: TabbarMode) {
  window.localStorage.setItem(TABBAR_MODE_KEY, JSON.stringify(mode));
  window.dispatchEvent(new Event("tabbar-mode-change"));
}

export function BottomNav({ active }: BottomNavProps) {
  const [mode, setMode] = useState<TabbarMode>(DEFAULT_TABBAR_MODE);

  useEffect(() => {
    setMode(readTabbarMode());

    const syncMode = () => setMode(readTabbarMode());
    window.addEventListener("storage", syncMode);
    window.addEventListener("tabbar-mode-change", syncMode);

    return () => {
      window.removeEventListener("storage", syncMode);
      window.removeEventListener("tabbar-mode-change", syncMode);
    };
  }, []);

  const variant = mode.continueBooking ? "booking" : mode.monitoring ? "monitoring" : "default";

  function cancelBooking() {
    writeTabbarMode({ ...mode, continueBooking: false });
  }

  return (
    <div className={`tabbar-shell tabbar-shell-${variant}`}>
      {variant === "monitoring" && (
        <Link className="tabbar-monitoring-banner" href="/monitoring" aria-label="Відстежуються вільні місця">
          <Bell size={16} strokeWidth={2.2} fill="currentColor" />
          <span>Відстежуються вільні місця</span>
          <ChevronRight size={16} strokeWidth={2.4} />
        </Link>
      )}

      {variant === "booking" && (
        <div className="tabbar-booking-card" role="status" aria-label="Активне бронювання">
          <div className="tabbar-booking-top">
            <div className="tabbar-booking-route">
              <span className="tabbar-booking-title">116К Київ-Пасажирський — Полтава</span>
              <span className="tabbar-booking-meta">24 жов, 15:17, 2 квитки</span>
            </div>
          </div>
          <div className="tabbar-booking-actions">
            <Link className="tabbar-booking-primary" href="/search/checkout">
              Продовжити 08:49
            </Link>
            <button className="tabbar-booking-secondary" type="button" onClick={cancelBooking}>
              Скасувати
            </button>
          </div>
        </div>
      )}

      <nav className="tabbar" aria-label="Головна навігація">
        <Link className={active === "search" ? "selected" : ""} href="/">
          <img src="/icons/tabbar-search.svg" alt="" />
          Пошук
        </Link>
        <Link className={active === "tickets" ? "selected" : ""} href="/tickets">
          <img src="/icons/tabbar-tickets.svg" alt="" />
          Квитки
        </Link>
        <Link className={active === "schedule" ? "selected" : ""} href="/schedule">
          <img src="/icons/tabbar-schedule.svg" alt="" />
          Табло
        </Link>
        <Link className={active === "profile" ? "selected" : ""} href="/profile">
          <img src="/icons/tabbar-profile.svg" alt="" />
          Профіль
        </Link>
      </nav>
    </div>
  );
}
