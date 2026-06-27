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
  returned?: {
    date: string;
    passenger: string;
  };
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
  {
    month: "Жовтень 2022",
    trips: [
      {
        id: "ivano-frankivsk-kyiv-2022-10-29-returned",
        day: "29",
        weekday: "Пт",
        route: "Івано-Франківськ → Київ-Пасажирський",
        train: "080К",
        tickets: "1 квиток",
        bonus: 442,
        returned: {
          date: "29.10.2022",
          passenger: "Єлизавета Р. 8 вагон 2 місце",
        },
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
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M14.0001 8.0026C14.0001 11.6845 11.682 14.6693 8.00008 14.6693C2.98485 14.6693 0.666748 11.6845 0.666748 8.0026C0.666748 4.32071 2.98485 1.33594 8.00008 1.33594C11.682 1.33594 14.0001 4.32071 14.0001 8.0026Z" fill="url(#paint0_linear_75756_43100)"/>
      <rect x="2" y="1.33594" width="13.3333" height="13.3333" rx="6.66667" fill="url(#paint1_linear_75756_43100)"/>
      <g clipPath="url(#clip0_75756_43100)">
        <path d="M7.61158 7.27683C7.88265 7.27683 8.01466 7.38151 8.01466 7.52394C8.01466 7.66636 7.88164 7.77104 7.61158 7.77104H7.34353L7.00998 8.46958H7.65592C7.94613 8.46958 8.06958 8.57023 8.06958 8.71165C8.06958 8.85307 7.94613 8.95422 7.65592 8.95422H6.7762L6.37312 9.79065H7.56069C8.4913 9.79065 8.95433 9.38804 8.95433 8.86112C8.95857 8.70071 8.92042 8.54201 8.84374 8.40101C8.76705 8.26 8.65453 8.14166 8.5175 8.0579C8.76388 7.89485 8.9246 7.65529 8.9246 7.37145C8.9246 6.79974 8.42983 6.44745 7.64483 6.44745H6.45676L5.70099 8.02771L4.94723 6.44745H4L5.2173 9.02518L4.85654 9.79065H5.78866L6.99185 7.27683H7.61158Z" fill="white"/>
        <path d="M9.26469 7.87232H12.4273L12.0585 7.09326C11.9507 6.89608 11.7912 6.73184 11.5973 6.61804C11.4033 6.50424 11.1821 6.44515 10.9571 6.44707H9.04602C9.26785 6.68321 9.39127 6.99491 9.39116 7.31873C9.38972 7.51024 9.34657 7.69914 9.26469 7.87232Z" fill="white"/>
        <path d="M9.29042 8.36505C9.37482 8.53737 9.41827 8.72681 9.41739 8.91865C9.42099 9.08203 9.38964 9.24431 9.32543 9.39463C9.26122 9.54494 9.16563 9.67984 9.04504 9.7903H13.3333L12.6607 8.36505H9.29042Z" fill="white"/>
      </g>
      <defs>
        <linearGradient id="paint0_linear_75756_43100" x1="7.33342" y1="14.6693" x2="7.33342" y2="1.33594" gradientUnits="userSpaceOnUse">
          <stop stopColor="#152356"/>
          <stop offset="1" stopColor="#182862"/>
        </linearGradient>
        <linearGradient id="paint1_linear_75756_43100" x1="7" y1="2.33594" x2="9.66667" y2="13.6693" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3958C6"/>
          <stop offset="1" stopColor="#2E469E"/>
        </linearGradient>
        <clipPath id="clip0_75756_43100">
          <rect width="9.33333" height="9.33333" fill="white" transform="translate(4 3.33594)"/>
        </clipPath>
      </defs>
    </svg>
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

      {trip.returned && (
        <>
          <div className="archive-trip-divider" />
          <div className="archive-returned-footer">
            <div className="archive-returned-info">
              <p className="archive-returned-label">Повернули квиток {trip.returned.date}</p>
              <p className="archive-returned-passenger">{trip.returned.passenger}</p>
            </div>
            <button className="archive-details-btn" type="button">Деталі</button>
          </div>
        </>
      )}
    </article>
  );
}

export function ArchiveScreen() {
  return (
    <div className="archive-page">
      <header className="archive-header">
        <Link className="archive-back-btn" href="/tickets" aria-label="Назад до квитків">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 16C0 7.16344 7.16344 0 16 0C24.8366 0 32 7.16344 32 16C32 24.8366 24.8366 32 16 32C7.16344 32 0 24.8366 0 16Z" fill="white" fillOpacity="0.12"/>
            <g clipPath="url(#clip0_75729_47890)">
              <path d="M18 20L14 16L18 12" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </g>
            <defs>
              <clipPath id="clip0_75729_47890">
                <rect width="16" height="16" fill="white" transform="translate(8 8)"/>
              </clipPath>
            </defs>
          </svg>
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
