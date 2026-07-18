import type { ReactNode } from "react";
import Link from "next/link";
import AdminNavigation from "./AdminNavigation";

type AdminLayoutProps = {
  children: ReactNode;
};

export default function AdminLayout({
  children,
}: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-4 px-5 py-4 sm:px-6">
          <Link href="/admin" className="leading-tight">
            <p className="text-xl font-bold text-red-700">
              STAD Administration
            </p>

            <p className="text-xs text-gray-500">
              City University Malaysia
            </p>
          </Link>

          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold text-gray-900">
                STAD Officer
              </p>

              <p className="text-xs text-gray-500">
                Sample Administrator
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-sm font-bold text-red-700">
              SO
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

      <div className="mx-auto max-w-[1500px] px-5 py-8 sm:px-6">
        <div className="grid gap-7 lg:grid-cols-[250px_minmax(0,1fr)]">
          <aside className="h-fit rounded-2xl border border-gray-200 bg-white p-4 shadow-sm lg:sticky lg:top-6">
            <div className="mb-5 hidden border-b border-gray-200 pb-5 lg:block">
              <p className="text-sm font-semibold uppercase tracking-wider text-red-700">
                Administration
              </p>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Manage events, attendance and facilities.
              </p>
            </div>

            <AdminNavigation />

            <div className="mt-5 hidden border-t border-gray-200 pt-5 lg:block">
              <Link
                href="/"
                className="block rounded-xl px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-100"
              >
                View Public Website
              </Link>
            </div>
          </aside>

          <main className="min-w-0">{children}</main>
        </div>
      </div>
    </div>
  );
}