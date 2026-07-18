import Link from "next/link";
import {
  accountUser,
  certificates,
  eventRegistrations,
  facilityBookings,
  recentActivities,
} from "./data";

export default function AccountDashboardPage() {
  const upcomingRegistrations = eventRegistrations.filter(
    (registration) =>
      registration.status === "Confirmed" ||
      registration.status === "Pending",
  ).length;

  const pendingBookings = facilityBookings.filter(
    (booking) => booking.status === "Pending",
  ).length;

  const availableCertificates = certificates.filter(
    (certificate) => certificate.status === "Available",
  ).length;

  const dashboardCards = [
    {
      label: "Upcoming Registrations",
      value: upcomingRegistrations,
      href: "/account/registrations",
      linkLabel: "View registrations",
    },
    {
      label: "Pending Bookings",
      value: pendingBookings,
      href: "/account/bookings",
      linkLabel: "View bookings",
    },
    {
      label: "Available Certificates",
      value: availableCertificates,
      href: "/account/certificates",
      linkLabel: "View certificates",
    },
  ];

  return (
    <div className="space-y-7">
      <section className="rounded-2xl bg-red-700 p-7 text-white shadow-sm sm:p-9">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-100">
          Account Dashboard
        </p>

        <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
          Welcome back, {accountUser.fullName}
        </h1>

        <p className="mt-4 max-w-2xl leading-7 text-red-100">
          Review your event registrations, facility bookings, QR codes
          and certificates from one place.
        </p>
      </section>

      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {dashboardCards.map((card) => (
          <article
            key={card.label}
            className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
          >
            <p className="text-sm font-semibold text-gray-500">
              {card.label}
            </p>

            <p className="mt-3 text-4xl font-bold text-gray-900">
              {card.value}
            </p>

            <Link
              href={card.href}
              className="mt-5 inline-block text-sm font-semibold text-red-700 hover:underline"
            >
              {card.linkLabel}
            </Link>
          </article>
        ))}
      </section>

      <section className="grid gap-7 xl:grid-cols-[minmax(0,1.4fr)_minmax(280px,0.6fr)]">
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Upcoming Events
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Your latest event registrations.
              </p>
            </div>

            <Link
              href="/account/registrations"
              className="text-sm font-semibold text-red-700 hover:underline"
            >
              View all
            </Link>
          </div>

          <div className="divide-y divide-gray-200">
            {eventRegistrations.slice(0, 2).map((registration) => (
              <article
                key={registration.id}
                className="p-6"
              >
                <div className="flex flex-col justify-between gap-4 sm:flex-row">
                  <div>
                    <p className="text-sm font-semibold text-red-700">
                      {registration.category}
                    </p>

                    <h3 className="mt-1 text-lg font-bold text-gray-900">
                      {registration.title}
                    </h3>

                    <p className="mt-2 text-sm text-gray-600">
                      {registration.date} · {registration.time}
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      {registration.venue}
                    </p>
                  </div>

                  <div className="flex items-start">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        registration.status === "Confirmed"
                          ? "bg-green-100 text-green-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {registration.status}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-200 px-6 py-5">
            <h2 className="text-xl font-bold text-gray-900">
              Recent Activity
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Your latest account updates.
            </p>
          </div>

          <div className="divide-y divide-gray-200">
            {recentActivities.map((activity) => (
              <article key={activity.id} className="p-5">
                <p className="font-semibold text-gray-900">
                  {activity.title}
                </p>

                <p className="mt-1 text-sm text-gray-600">
                  {activity.description}
                </p>

                <p className="mt-2 text-xs text-gray-500">
                  {activity.date}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}