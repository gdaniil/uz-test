"use client";

import { useState } from "react";

const TrainIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="6" width="18" height="12" rx="3" stroke="#2c2e32" strokeWidth="1.5" />
    <path d="M3 11h18" stroke="#2c2e32" strokeWidth="1.5" />
    <circle cx="8" cy="15.5" r="1.5" fill="#2c2e32" />
    <circle cx="16" cy="15.5" r="1.5" fill="#2c2e32" />
    <path d="M7 18l-1.5 2.5M17 18l1.5 2.5" stroke="#2c2e32" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M9 6V4M15 6V4" stroke="#2c2e32" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M9 8.5h6" stroke="#2c2e32" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const HistoryIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M12 8v4l2.5 2.5" stroke="#6c6e75" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M4.5 13A8 8 0 1 0 5.8 7.5M4.5 13l-2.5-3M4.5 13L7 10" stroke="#6c6e75" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChevronRight = ({ size = 24, color = "#6c6e75" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M9 18l6-6-6-6" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ArrowRightLong = () => (
  <svg width="28" height="14" viewBox="0 0 28 14" fill="none">
    <path d="M1 7h25M19 1l7 6-7 6" stroke="#2c2e32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const MI = ({ name }: { name: string }) => (
  <span className="mat-icon">{name}</span>
);

type Banner = {
  id: number;
  bg: string;
  bgImage: string;
  title: string;
  desc: string;
  pill: string;
  align: "left" | "center";
};

const BANNERS: Banner[] = [
  {
    id: 1,
    bg: "linear-gradient(173deg, rgba(20,35,20,0.25) 0%, rgba(31,47,46,0.88) 60%)",
    bgImage: "https://images.unsplash.com/photo-1708458664323-a8865bc0f9ca?auto=format&fit=crop&w=800&q=80",
    title: "Спецзамовлення квитків для військових",
    desc: "Ви військовий і маєте терміново їхати у справах, проте всі квитки вже викуплені?",
    pill: "Квитки для військових",
    align: "left",
  },
  {
    id: 2,
    bg: "linear-gradient(180deg, rgba(37,3,58,0.45) 0%, rgba(59,16,87,0.9) 100%)",
    bgImage: "https://images.unsplash.com/photo-1561821632-0ac8d40ad4d1?auto=format&fit=crop&w=800&q=80",
    title: "Залізна родина",
    desc: "524 поранених та 582 загиблих — це ціна порятунку мільйонів українців для Укрзалізниці.",
    pill: "Підтримати родини працівників УЗ",
    align: "left",
  },
  {
    id: 3,
    bg: "linear-gradient(173deg, rgba(14,63,122,0.5) 0%, rgba(26,96,152,0.85) 60%)",
    bgImage: "https://images.unsplash.com/photo-1603411724506-7dcf41be8673?auto=format&fit=crop&w=800&q=80",
    title: "Залізні друзі",
    desc: "Перетворюйте кожен кілометр залізничної подорожі на «обіймашки» та обмінюйте їх на подарунки від партнерів!",
    pill: "До програми лояльності",
    align: "left",
  },
];

const SERVICES = [
  { gradient: "linear-gradient(140deg, #1a5a42 9%, #0e3025 94%)", icon: <MI name="local_activity" />, label: "Квитки для військовослужбовців" },
  { gradient: "linear-gradient(140deg, #52185c 9%, #7a28a0 94%)", icon: <MI name="weekend" />, label: "UZ Lounge" },
  { gradient: "linear-gradient(140deg, #1a7080 9%, #0d5060 94%)", icon: <MI name="directions_car" />, label: "Замовлення вагона-автомобілевоза" },
  { gradient: "linear-gradient(140deg, #1a2878 9%, #0d1860 94%)", icon: <MI name="assignment_return" />, label: "Претензійне повернення квитків" },
  { gradient: "linear-gradient(140deg, #b02020 9%, #880808 94%)", icon: <MI name="manage_search" />, label: "Онлайн-пошук забутих речей" },
  { gradient: "linear-gradient(140deg, #1a8040 9%, #0d6028 94%)", icon: <MI name="support_agent" />, label: "Замовлення вокзального помічника" },
  { gradient: "linear-gradient(140deg, #c87010 9%, #a05808 94%)", icon: <MI name="groups" />, label: "Замовлення групових квитків" },
  { gradient: "linear-gradient(140deg, #1a3088 9%, #0d2070 94%)", icon: <MI name="accessible" />, label: "Замовлення спеціального вагона" },
  { gradient: "linear-gradient(140deg, #757585 9%, #555565 94%)", icon: <MI name="king_bed" />, label: "Замовлення вагона-салону" },
];

const SERVICES_COL_SIZE = 3;
const serviceColumns = Array.from(
  { length: Math.ceil(SERVICES.length / SERVICES_COL_SIZE) },
  (_, i) => SERVICES.slice(i * SERVICES_COL_SIZE, (i + 1) * SERVICES_COL_SIZE)
);

export function BottomSheetContent() {
  const [activeBanner, setActiveBanner] = useState(0);

  const handleBannersScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const idx = Math.round(el.scrollLeft / (343 + 8));
    if (idx !== activeBanner) setActiveBanner(Math.max(0, Math.min(BANNERS.length - 1, idx)));
  };

  return (
    <div className="sheet-scroll">
      {/* Наступна подорож */}
      <div className="sheet-section">
        <h2 className="sheet-section-title">Наступна подорож</h2>
        <div className="next-trip-card">
          <div className="sheet-icon-wrap">
            <TrainIcon />
          </div>
          <div className="next-trip-info">
            <p className="next-trip-route">
              Хмельницький<br />→ Івано-Франківськ
            </p>
            <p className="next-trip-meta">
              22 Жовтня, Пт 15:17<br />116К • Інтерсіті+
            </p>
          </div>
          <div className="trip-platform">
            <span className="platform-num">6</span>
            <span className="platform-lbl">Колія</span>
          </div>
        </div>
      </div>

      {/* Ви шукали */}
      <div className="sheet-section">
        <h2 className="sheet-section-title">Ви шукали</h2>
        {[
          { route: "Київ → Дніпро", date: "23 Жов, Пт" },
          { route: "Київ → Дніпро", date: "22 Жов, Чт" },
        ].map((item, i) => (
          <div key={i} className="recent-search-card">
            <div className="sheet-icon-wrap">
              <HistoryIcon />
            </div>
            <div className="recent-info">
              <p className="recent-route">{item.route}</p>
              <p className="recent-date">{item.date}</p>
            </div>
            <div className="sheet-icon-wrap">
              <ChevronRight />
            </div>
          </div>
        ))}
      </div>

      {/* Дозвольте сповіщення */}
      <div className="notif-permission-card">
        <div className="notif-perm-text">
          <p className="notif-perm-title">Дозвольте сповіщення</p>
          <p className="notif-perm-desc">
            Тільки важливі сповіщення про майбутні подорожі та актуальні новини.
          </p>
        </div>

        <div className="notif-perm-preview">
          <img className="notif-preview-img" src="/notif-preview.png" alt="" />
        </div>

        <button className="notif-perm-btn">Дозволити сповіщення</button>
      </div>

      {/* Banners */}
      <div className="banners-section">
        <div className="banners-track" onScroll={handleBannersScroll}>
          {BANNERS.map((b) => (
            <div
              key={b.id}
              className={`banner-item${b.align === "center" ? " banner-item--center" : ""}`}
              style={{
                backgroundImage: `${b.bg}, url(${b.bgImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className={`banner-body${b.align === "center" ? " banner-body--center" : ""}`}>
                <div className="banner-text">
                  <p className="banner-title">{b.title}</p>
                  <p className="banner-desc">{b.desc}</p>
                </div>
                <div className="banner-pill">
                  <span>{b.pill}</span>
                  <ChevronRight size={14} color="rgba(255,255,255,0.8)" />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="page-control">
          {BANNERS.map((_, i) => (
            <div key={i} className={`page-dot${activeBanner === i ? "" : " page-dot--off"}`} />
          ))}
        </div>
      </div>

      {/* Замовлення сервісів */}
      <div className="sheet-section">
        <h2 className="sheet-section-title">Замовлення сервісів</h2>
        <div className="services-scroll">
          <div className="services-cols">
            {serviceColumns.map((col, ci) => (
              <div key={ci} className="services-col">
                {col.map((s, i) => (
                  <div key={i} className="service-item">
                    <div className="service-icon" style={{ background: s.gradient }}>
                      {s.icon}
                    </div>
                    <span className="service-label">{s.label}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Подорожуйте без меж */}
      <div className="info-card-new">
        <div className="info-card-body">
          <p className="info-card-title">Подорожуйте без меж!</p>
          <p className="info-card-text">
            Беріть із собою домашніх улюбленців і смакуйте в дорозі авторський чай, обрамлений
            залізним підстаканником. Якщо забажаєте speak English, вмикайте англійську в застосунку
            та розкажіть англомовним попутникам. Не забувайте ділитися враженнями з нами!
          </p>
        </div>
        <div className="info-card-link">
          <span>поділитися враженнями</span>
          <ArrowRightLong />
        </div>
      </div>
    </div>
  );
}
