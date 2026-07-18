import Link from "next/link";
import { StatCard, StatusBadge } from "./components";
import {
  adminActivities,
  adminEvents,
  adminRegistrations,
  attendanceRecords,
  bookingRequests,
} from "./data";

export default function AdminDashboardPage() {
  const upcomingEvents = adminEvents.filter(
    (event) => event.status === "Published",
  ).length;

  const totalRegistrations = adminRegistrations.length;

  const checkedInToday = attendanceRecords.filter(
    (record) =>
      record.status === "Checked In" ||
      record.status === "Checked Out",
  ).length;

  const pendingBookings = bookingRequests.filter(
    (booking) => booking.status === "Pending",
  ).length;

  return (
    <div className="space-y-7">
      <section className="rounded-2xl bg-red-700 p-7 text-white shadow-sm sm:p-9">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-100">
          STAD Administration
        </p>

        <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
          Administration Dashboard
        </h1>

        <p className="mt-4 max-w-3xl leading-7 text-red-100">
          Manage student events, registrations, attendance and facility
          bookings from one central platform.
        </p>

        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            href="/admin/events/new"
            className="rounded-xl bg-white px-5 py-3 font-semibold text-red-700 hover:bg-red-50"
          >
            Create New Event
          </Link>

          <Link
            href="/admin/bookings"
            className="rounded-xl border border-white px-5 py-3 font-semibold text-white hover:bg-red-800"
          >
            Review Bookings
          </Link>
        </div>
      </section>

      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Published Events"
          value={upcomingEvents}
          description="Events currently visible on the public website."
        />

        <StatCard
          label="Registrations"
          value={totalRegistrations}
          description="Sample event registrations recorded."
        />

        <StatCard
          label="Attendance Records"
          value={checkedInToday}
          description="Participants with a check-in record."
        />

        <StatCard
          label="Pending Bookings"
          value={pendingBookings}
          description="Facility requests waiting for review."
        />
      </section>

      <section className="grid gap-7 xl:grid-cols-[minmax(0,1.4fr)_minmax(300px,0.6fr)]">
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Upcoming Events
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Registration and capacity overview.
              </p>
            </div>

            <Link
              href="/admin/events"
              className="text-sm font-semibold text-red-700 hover:underline"
            >
              Manage events
            </Link>
          </div>

          <div className="divide-y divide-gray-200">
            {adminEvents.slice(0, 3).map((event) => (
              <article key={event.id} className="p-6">
                <div className="flex flex-col justify-between gap-4 sm:flex-row">
                  <div>
                    <p className="text-sm font-semibold text-red-700">
                      {event.category}
                    </p>

                    <h3 className="mt-1 text-lg font-bold text-gray-900">
                      {event.title}
                    </h3>

                    <p className="mt-2 text-sm text-gray-600">
                      {event.date} · {event.time}
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      {event.registrations} of {event.capacity} places
                      registered
                    </p>
                  </div>

                  <StatusBadge status={event.status} />
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
              Latest administration updates.
            </p>
          </div>

          <div className="divide-y divide-gray-200">
            {adminActivities.map((activity) => (
              <article key={activity.id} className="p-5">
                <p className="font-semibold text-gray-900">
                  {activity.title}
                </p>

                <p className="mt-1 text-sm leading-6 text-gray-600">
                  {activity.description}
                </p>

                <p className="mt-2 text-xs text-gray-500">
                  {activity.time}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}