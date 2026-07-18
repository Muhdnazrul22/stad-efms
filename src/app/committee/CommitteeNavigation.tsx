"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const sampleEventId = "1";

const navigationItems = [
  {
    href: "/committee",
    label: "Dashboard",
    exact: true,
  },
  {
    href: `/committee/events/${sampleEventId}`,
    label: "Event Overview",
    exact: true,
  },
  {
    href: `/committee/events/${sampleEventId}/participants`,
    label: "Participants",
  },
  {
    href: `/committee/events/${sampleEventId}/walk-in`,
    label: "Walk-in Registration",
  },
  {
    href: `/committee/events/${sampleEventId}/scan`,
    label: "Attendance Scanner",
  },
  {
    href: `/committee/events/${sampleEventId}/history`,
    label: "Scan History",
  },
];

export default function CommitteeNavigation() {
  const pathname = usePathname();

  return (
    <nav aria-label="Committee portal navigation">
      <div className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
        {navigationItems.map((item) => {
          const isActive = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`whitespace-nowrap rounded-xl px-4 py-3 text-sm font-semibold transition ${
                isActive
                  ? "bg-red-700 text-white"
                  : "text-gray-700 hover:bg-red-50 hover:text-red-700"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}