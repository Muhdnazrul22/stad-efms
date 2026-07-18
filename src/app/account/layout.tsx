import type { ReactNode } from "react";
import Link from "next/link";
import AccountNavigation from "./AccountNavigation";
import { accountUser } from "./data";

type AccountLayoutProps = {
  children: ReactNode;
};

export default function AccountLayout({
  children,
}: AccountLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-6">
          <Link href="/" className="leading-tight">
            <p className="text-xl font-bold text-red-700">STAD EFMS</p>
            <p className="text-xs text-gray-500">
              City University Malaysia
            </p>
          </Link>

          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold text-gray-900">
                {accountUser.fullName}
              </p>
              <p className="text-xs text-gray-500">
                {accountUser.universityId}
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-sm font-bold text-red-700">
              {accountUser.initials}
            </div>

            <Link
              href="/login"
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-semibold text-gray-700 hover:border-red-300 hover:text-red-700"
            >
              Log Out
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-6">
        <div className="grid gap-7 lg:grid-cols-[250px_minmax(0,1fr)]">
          <aside className="h-fit rounded-2xl border border-gray-200 bg-white p-4 shadow-sm lg:sticky lg:top-6">
            <div className="mb-5 hidden border-b border-gray-200 pb-5 lg:block">
              <p className="text-sm font-semibold uppercase tracking-wider text-red-700">
                My Account
              </p>

              <p className="mt-2 text-sm text-gray-500">
                Manage your STAD activities.
              </p>
            </div>

            <AccountNavigation />

            <div className="mt-5 hidden border-t border-gray-200 pt-5 lg:block">
              <Link
                href="/"
                className="block rounded-xl px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-100"
              >
                Return to Public Website
              </Link>
            </div>
          </aside>

          <main className="min-w-0">{children}</main>
        </div>
      </div>
    </div>
  );
}