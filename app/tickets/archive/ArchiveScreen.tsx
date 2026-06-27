import Link from "next/link";

type ArchiveTrip = {
  id: string;
  day: string;
  weekday: string;
  isWeekend?: boolean;
  route: string;
  train: string;
  tickets: string;
  bonus: number;
  canRate?: boolean;
};

const ARCHIVE_GROUPS: { month: string; trips: ArchiveTrip[] }[] = [
  {
    month: "Жовтень 2025",
    trips: [
      {
        id: "kyiv-zhmerynka-2025-10-15",
        day: "15",
        weekday: "Вт",
        route: "Київ → Жмеринка",
        train: "116Л",
        tickets: "2 квитки",
        bonus: 1452,
        canRate: true,
      },
      {
        id: "zhmerynka-kyiv-2025-10-12",
        day: "12",
        weekday: "Сб",
        isWeekend: true,
        route: "Жмеринка → Київ",
        train: "116О",
        tickets: "2 квитки",
        bonus: 843,
      },
    ],
  },
  {
    month: "Квітень 2025",
    trips: [
      {
        id: "ivano-frankivsk-kyiv-2025-04-29",
        day: "29",
        weekday: "Пт",
        route: "Івано-Франківськ → Київ-Пасажирський",
        train: "080К",
        tickets: "1 квиток",
        bonus: 442,
      },
    ],
  },
];

function DownloadIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M8 3.333V10" stroke="#213786" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5.333 7.667L8 10.333L10.667 7.667" stroke="#213786" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 12.667H12" stroke="#213786" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M8 2.667L9.648 6.006L13.333 6.542L10.667 9.141L11.296 12.81L8 11.077L4.704 12.81L5.333 9.141L2.667 6.542L6.352 6.006L8 2.667Z" stroke="#213786" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BonusIcon() {
  return (
    <span className="archive-bonus-icon" aria-hidden>
      уз
    </span>
  );
}

function ArchiveCard({ trip }: { trip: ArchiveTrip }) {
  return (
    <article className="archive-trip-card">
      <div className="archive-trip-main">
        <div className="archive-date-box">
          <strong>{trip.day}</strong>
          <span className={trip.isWeekend ? "weekend" : ""}>{trip.weekday}</span>
        </div>

        <div className="archive-trip-info">
          <h3>{trip.route}</h3>
          <div className="archive-trip-meta">
            <span>
              {trip.train} ∙ {trip.tickets}
            </span>
            <span className="archive-bonus">
              <BonusIcon />
              {trip.bonus}
            </span>
          </div>
        </div>

        <button className="archive-download-btn" type="button" aria-label="Завантажити квиток">
          <DownloadIcon />
        </button>
      </div>

      {trip.canRate && (
        <button className="archive-rate-btn" type="button">
          <StarIcon />
          Оцінити поїздку
        </button>
      )}
    </article>
  );
}

export function ArchiveScreen() {
  return (
    <div className="archive-page">
      <header className="archive-header">
        <Link className="archive-back-btn" href="/tickets" aria-label="Назад до квитків">
          <img src="/icons/archive-back-liquid-glass.png" alt="" />
        </Link>
        <h1>Архів</h1>
        <span className="archive-header-spacer" aria-hidden />
      </header>

      <section className="archive-sheet">
        <div className="archive-segmented" role="tablist" aria-label="Тип квитків">
          <button className="active" type="button" role="tab" aria-selected="true">
            Дальні
          </button>
          <button type="button" role="tab" aria-selected="false">
            Приміські
          </button>
          <button type="button" role="tab" aria-selected="false">
            City Express
          </button>
        </div>

        <div className="archive-list">
          {ARCHIVE_GROUPS.map((group) => (
            <div className="archive-month" key={group.month}>
              <h2>{group.month}</h2>
              <div className="archive-month-cards">
                {group.trips.map((trip) => (
                  <ArchiveCard key={trip.id} trip={trip} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
