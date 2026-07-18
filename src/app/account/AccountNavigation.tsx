"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigationItems = [
  {
    href: "/account",
    label: "Dashboard",
    exact: true,
  },
  {
    href: "/account/profile",
    label: "My Profile",
  },
  {
    href: "/account/registrations",
    label: "My Registrations",
  },
  {
    href: "/account/bookings",
    label: "My Bookings",
  },
  {
    href: "/account/certificates",
    label: "My Certificates",
  },
  {
    href: "/account/qr-codes",
    label: "My QR Codes",
  },
];

export default function AccountNavigation() {
  const pathname = usePathname();

  return (
    <nav aria-label="Account navigation">
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