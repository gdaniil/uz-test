import Link from "next/link";

type BottomNavProps = {
  active: "search" | "tickets";
};

export function BottomNav({ active }: BottomNavProps) {
  return (
    <nav className="tabbar" aria-label="Головна навігація">
      <Link className={active === "search" ? "selected" : ""} href="/">
        <img src="/icons/tabbar-search.svg" alt="" />
        Пошук
      </Link>
      <Link className={active === "tickets" ? "selected" : ""} href="/tickets">
        <img src="/icons/tabbar-tickets.svg" alt="" />
        Квитки
      </Link>
      <button type="button">
        <img src="/icons/tabbar-schedule.svg" alt="" />
        Табло
      </button>
      <button type="button">
        <img src="/icons/tabbar-profile.svg" alt="" />
        Профіль
      </button>
    </nav>
  );
}
