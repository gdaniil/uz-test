"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type NotifType = "departure" | "promo" | "ticket" | "alert" | "bonus";

type NotifItem = {
  id: string;
  type: NotifType;
  category: string;
  title: string;
  text: string;
  date: string;
  actionLabel?: string;
  actionIcon?: string;
  isRead: boolean;
};

const NOTIF_GROUPS: { label: string; items: NotifItem[] }[] = [
  {
    label: "Липень 2026",
    items: [
      {
        id: "n1",
        type: "alert",
        category: "Сповіщення",
        title: "Зміна перону",
        text: "Поїзд 116К тепер відправляється з перону 3. Попередній перон: 5.",
        date: "12 липня 16:23",
        isRead: true,
      },
      {
        id: "n2",
        type: "promo",
        category: "Промоакції",
        title: "Ваш потяг 116K відправляється завтра",
        text: "О 17:00 за напрямком Київ — Жмеринка.",
        date: "11 Липня 21:53",
        actionLabel: "Показати квитки",
        actionIcon: "qr",
        isRead: true,
      },
      {
        id: "n3",
        type: "ticket",
        category: "Вільні місця",
        title: "Зʼявились квитки",
        text: "На 12.07, Славсько – Київ-Пасажирський",
        date: "26 липня 21:53",
        actionLabel: "Переглянути",
        isRead: false,
      },
    ],
  },
  {
    label: "Квітень 2026",
    items: [
      {
        id: "n4",
        type: "promo",
        category: "Промоакції",
        title: "1000 обіймашок для вас",
        text: "Вітаємо! Ви отримали нагороду Ловець.",
        date: "11 квітня 21:53",
        isRead: true,
      },
      {
        id: "n5",
        type: "alert",
        category: "Новини",
        title: "Ваш потяг 202Л скасували",
        text: "Через ремонт залізничної колії.",
        date: "13 квітня 13:43",
        isRead: true,
      },
    ],
  },
  {
    label: "Грудень 2025",
    items: [
      {
        id: "n6",
        type: "bonus",
        category: "Система",
        title: "Повертаємо обіймайшки",
        text: "І нараховуємо бонусні на знак вдячності!",
        date: "4 грудня 09:40",
        isRead: true,
      },
    ],
  },
];

type TypeConfig = {
  metaColor: string;
  showAlertIcon?: boolean;
};

const TYPE_CONFIG: Record<NotifType, TypeConfig> = {
  departure: {
    metaColor: "#6c6e75",
  },
  promo: {
    metaColor: "#6c6e75",
  },
  ticket: {
    metaColor: "#6c6e75",
  },
  alert: {
    metaColor: "#8d560c",
    showAlertIcon: true,
  },
  bonus: {
    metaColor: "#6c6e75",
  },
};

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

function NotifCard({ item, onRead }: { item: NotifItem; onRead: (id: string) => void }) {
  const cfg = TYPE_CONFIG[item.type];

  return (
    <button
      className={`notif-item${item.isRead ? "" : " notif-item--unread"}`}
      type="button"
      onClick={() => !item.isRead && onRead(item.id)}
    >
      <span className="notif-body">
        <span className="notif-meta" style={{ color: cfg.metaColor }}>
          {cfg.showAlertIcon && (
            <span className="mat-icon notif-alert-icon" aria-hidden>
              warning
            </span>
          )}
          {item.category} ∙ {item.date}
        </span>
        <span className="notif-copy">
          <span className="notif-title">{item.title}</span>
          <span className="notif-text">{item.text}</span>
        </span>
        {item.actionLabel && (
          <span className="notif-action">
            {item.actionIcon === "qr" && <QrIcon />}
            {item.actionLabel}
          </span>
        )}
      </span>
    </button>
  );
}

export function NotificationsScreen() {
  const router = useRouter();
  const [groups, setGroups] = useState(NOTIF_GROUPS);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const markRead = (id: string) => {
    setGroups((prev) =>
      prev.map((g) => ({
        ...g,
        items: g.items.map((item) => (item.id === id ? { ...item, isRead: true } : item)),
      }))
    );
  };

  const markAllRead = () => {
    setGroups((prev) =>
      prev.map((g) => ({ ...g, items: g.items.map((item) => ({ ...item, isRead: true })) }))
    );
    setIsMenuOpen(false);
  };

  const unreadCount = groups.flatMap((g) => g.items).filter((i) => !i.isRead).length;

  const goBack = () => {
    if (window.history.length > 1) {
      router.back();
      return;
    }

    router.push("/");
  };

  return (
    <div className="notif-page">
      <header className="notif-header">
        <button className="archive-back-btn" type="button" onClick={goBack} aria-label="Назад">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M0 16C0 7.163 7.163 0 16 0s16 7.163 16 16-7.163 16-16 16S0 24.837 0 16Z" fill="white" fillOpacity="0.12" />
            <path d="M18 20l-4-4 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <h1>
          Сповіщення
          {unreadCount > 0 && <span className="notif-header-badge">{unreadCount}</span>}
        </h1>
        <button
          className="notif-more-btn"
          type="button"
          onClick={() => setIsMenuOpen((value) => !value)}
          aria-expanded={isMenuOpen}
          aria-controls="notif-actions-menu"
          aria-label="Меню сповіщень"
        >
          <span className="mat-icon" aria-hidden>
            more_vert
          </span>
        </button>
        {isMenuOpen && (
          <div className="notif-menu" id="notif-actions-menu" role="menu">
            <button className="notif-menu-item" type="button" role="menuitem" onClick={markAllRead}>
              <span className="mat-icon" aria-hidden>
                done_all
              </span>
              Прочитати всі
            </button>
            <button className="notif-menu-item" type="button" role="menuitem" onClick={() => setIsMenuOpen(false)}>
              <span className="mat-icon" aria-hidden>
                settings
              </span>
              Налаштування
            </button>
          </div>
        )}
      </header>

      <section className="notif-sheet">
        <div className="notif-list">
          {groups.map((group) => (
            <div className="notif-group" key={group.label}>
              <p className="notif-group-label">{group.label}</p>
              <div className="notif-group-cards">
                {group.items.map((item) => (
                  <NotifCard key={item.id} item={item} onRead={markRead} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
