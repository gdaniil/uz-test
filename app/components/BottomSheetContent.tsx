"use client";

import Link from "next/link";
import { useState } from "react";

const HistoryIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
    <path d="M8 5.33333V8L9.33333 9.33333" stroke="#6C6E75" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M2.03345 7.33333C2.18284 5.8667 2.86696 4.50641 3.95527 3.51198C5.04358 2.51755 6.45991 1.95859 7.93403 1.94175C9.40815 1.92491 10.8369 2.45138 11.9476 3.42069C13.0584 4.39 13.7734 5.73432 13.9562 7.19715C14.1391 8.65999 13.777 10.1389 12.939 11.3518C12.1011 12.5647 10.8459 13.4267 9.41297 13.7732C7.98006 14.1198 6.46972 13.9267 5.17011 13.2307C3.8705 12.5348 2.87259 11.3847 2.36678 10M2.03345 13.3333V10H5.36678" stroke="#6C6E75" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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

function QrIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path d="M7.49998 3.33331H4.16665C3.70641 3.33331 3.33331 3.70641 3.33331 4.16665V7.49998C3.33331 7.96022 3.70641 8.33331 4.16665 8.33331H7.49998C7.96022 8.33331 8.33331 7.96022 8.33331 7.49998V4.16665C8.33331 3.70641 7.96022 3.33331 7.49998 3.33331Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5.83331 14.1667V14.175" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15.8334 3.33331H12.5C12.0398 3.33331 11.6667 3.70641 11.6667 4.16665V7.49998C11.6667 7.96022 12.0398 8.33331 12.5 8.33331H15.8334C16.2936 8.33331 16.6667 7.96022 16.6667 7.49998V4.16665C16.6667 3.70641 16.2936 3.33331 15.8334 3.33331Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5.83331 5.83331V5.84165" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7.49998 11.6667H4.16665C3.70641 11.6667 3.33331 12.0398 3.33331 12.5V15.8334C3.33331 16.2936 3.70641 16.6667 4.16665 16.6667H7.49998C7.96022 16.6667 8.33331 16.2936 8.33331 15.8334V12.5C8.33331 12.0398 7.96022 11.6667 7.49998 11.6667Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14.1667 5.83331V5.84165" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11.6667 11.6667H14.1667" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16.6667 11.6667V11.675" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11.6667 11.6667V14.1667" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11.6667 16.6667H14.1667" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14.1667 14.1667H16.6667" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16.6667 14.1667V16.6667" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

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

const RECENT_SEARCH_ROWS = [
  [
    { route: "Київ → Жмеринка", date: "23 Жов, Пт" },
    { route: "Жмеринка → Київ", date: "23 Жов, Пт" },
  ],
  [
    { route: "Дніпро → Запоріжжя", date: "24 Жов, Сб" },
    { route: "Хмельницький → Івано-Франківськ", date: "24 Жов, Сб" },
  ],
  [
    { route: "Кам'янець-Подільський → Солотвино", date: "21 Жов, Ср" },
    { route: "Дніпро → Запоріжжя", date: "24 Жов, Сб" },
  ],
];

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
      <div className="sheet-section next-trip-section">
        <h2 className="sheet-section-title">Наступна подорож</h2>
        <div className="next-trip-card">
          <div className="next-trip-date">
            <span className="next-trip-day">22</span>
            <span className="next-trip-month">Жов</span>
          </div>
          <div className="next-trip-info">
            <p className="next-trip-route">Київ → Жмеринка</p>
            <p className="next-trip-meta">Пт 15:17, 116К ∙ 2 квитки</p>
          </div>
          <Link
            className="next-trip-qr"
            href="/tickets/kyiv-zhmerynka-2024-10-22"
            aria-label="Відкрити QR-квитки для подорожі Київ - Жмеринка"
          >
            <QrIcon />
          </Link>
        </div>
      </div>

      {/* Ви шукали */}
      <div className="sheet-section recent-search-section">
        <h2 className="sheet-section-title">Ви шукали</h2>
        <div className="recent-search-list">
          {RECENT_SEARCH_ROWS.map((row, rowIndex) => (
            <div className="recent-search-row" key={rowIndex}>
              {row.map((item) => (
                <button className="recent-search-chip" type="button" key={`${item.route}-${item.date}`}>
                  <HistoryIcon />
                  <span className="recent-route">{item.route}</span>
                  <span className="recent-date">{item.date}</span>
                </button>
              ))}
            </div>
          ))}
        </div>
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
