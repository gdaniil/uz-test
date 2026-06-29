"use client";

import { BellRing, ChevronLeft, MoreVertical, Zap } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type MonitorStatus = "searching" | "available" | "auto";

type MonitorItem = {
  id: string;
  status: MonitorStatus;
  number: string;
  route: string;
  date: string;
  details: string;
  tags?: string[];
  actionLabel?: string;
};

const ITEMS: MonitorItem[] = [
  {
    id: "124392",
    status: "searching",
    number: "#124392",
    route: "Київ → Жмеринка",
    date: "26 Жовтня, Нд ∙ 2 місця",
    details: "Купе, Люкс у потягах 080К, 116Л, 1100",
    tags: ["Місця поруч", "Лише нижні"],
  },
  {
    id: "124391",
    status: "available",
    number: "#124391",
    route: "Жмеринка → Київ",
    date: "24 Жовтня, Пт ∙ 2 місця",
    details: "Купе, Люкс у потягах 080К, 116Л, 1100",
    actionLabel: "Переглянути та купити",
  },
  {
    id: "124203",
    status: "auto",
    number: "#124203",
    route: "Хмельницький → Івано-Франківськ",
    date: "1 Листопада, Вт ∙ 1 місце",
    details: "1 клас у потягу 080К",
    tags: ["Лише нижні", "Не біля вбиральні", "Біля вікна", "Кондиціонер"],
  },
];

function StatusPill({ item }: { item: MonitorItem }) {
  const isAuto = item.status === "auto";
  const isAvailable = item.status === "available";
  const label = isAuto ? "Автоматично викупимо" : isAvailable ? "Зʼявилися вільні місця" : "Шукаємо місця";

  return (
    <div className={`monitoring-card-status is-${item.status}`}>
      {isAuto ? <Zap size={16} fill="currentColor" /> : <BellRing size={16} fill="currentColor" />}
      <span>{label}</span>
      <span className="monitoring-card-number">{item.number}</span>
      <MoreVertical size={16} />
    </div>
  );
}

function MonitorCard({ item }: { item: MonitorItem }) {
  const hasFooterContent = Boolean(item.tags?.length || item.actionLabel);

  return (
    <article className="monitoring-card">
      <div className="monitoring-card-status-wrap">
        <StatusPill item={item} />
      </div>
      <div className={`monitoring-card-body ${hasFooterContent ? "has-footer-content" : ""}`}>
        <div className="monitoring-card-copy">
          <h2>{item.route}</h2>
          <p>{item.date}</p>
          <p>{item.details}</p>
        </div>
        {item.tags?.length ? (
          <div className="monitoring-tags" aria-label="Параметри відстеження">
            {item.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        ) : null}
        {item.actionLabel ? (
          <Link className="monitoring-action" href="/search/results">
            {item.actionLabel}
          </Link>
        ) : null}
      </div>
    </article>
  );
}

export function MonitoringScreen() {
  const router = useRouter();

  return (
    <div className="monitoring-screen">
      <header className="monitoring-header">
        <button className="monitoring-back" type="button" aria-label="Назад" onClick={() => router.back()}>
          <ChevronLeft size={20} strokeWidth={2.4} />
        </button>
        <h1>Відстежуються місця</h1>
        <span className="monitoring-header-spacer" aria-hidden="true" />
      </header>
      <section className="monitoring-content" aria-label="Список відстежуваних місць">
        <div className="monitoring-list">
          {ITEMS.map((item) => (
            <MonitorCard key={item.id} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
}
