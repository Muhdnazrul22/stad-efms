"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const adminNavigation = [
  {
    href: "/admin",
    label: "Dashboard",
    exact: true,
  },
  {
    href: "/admin/events",
    label: "Events",
  },
  {
    href: "/admin/registrations",
    label: "Registrations",
  },
  {
    href: "/admin/attendance",
    label: "Attendance",
  },
  {
    href: "/admin/facilities",
    label: "Facilities",
  },
  {
    href: "/admin/bookings",
    label: "Bookings",
  },
];

export default function AdminNavigation() {
  const pathname = usePathname();

  return (
    <nav aria-label="STAD administration navigation">
      <div className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
        {adminNavigation.map((item) => {
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