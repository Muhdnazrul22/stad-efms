import Link from "next/link";

import {
  CommitteePageHeader,
  CommitteeStatusBadge,
} from "./components";

import {
  assignedEvents,
  committeeMember,
} from "./data";

export default function CommitteeDashboardPage() {
  return (
    <div className="space-y-7">
      <CommitteePageHeader
        eyebrow="Committee Dashboard"
        title={`Welcome, ${committeeMember.fullName}`}
        description="Review your event assignments, access periods and authorised committee functions."
      />

      <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-800">
        This portal currently uses sample information. Real committee
        permissions and access periods will be enforced after Supabase is
        connected.
      </div>

      <section className="space-y-6">
        {assignedEvents.map((event) => (
          <article
            key={event.id}
            className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
          >
            <div className="flex flex-col justify-between gap-6 xl:flex-row">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-3">
                  <CommitteeStatusBadge status={event.status} />

                  <span className="text-sm font-semibold text-red-700">
                    {event.category}
                  </span>
                </div>

                <h2 className="mt-4 text-2xl font-bold text-gray-900">
                  {event.title}
                </h2>

                <p className="mt-3 text-gray-600">
                  {event.date} · {event.time}
                </p>

                <p className="mt-1 text-gray-500">
                  {event.venue}
                </p>

                <div className="mt-6 grid gap-5 text-sm sm:grid-cols-2">
                  <div>
                    <p className="font-semibold text-gray-900">
                      Committee Role
                    </p>

                    <p className="mt-1 text-gray-600">
                      {event.role}
                    </p>
                  </div>

                  <div>
                    <p className="font-semibold text-gray-900">
                      Assigned Counter
                    </p>

                    <p className="mt-1 text-gray-600">
                      {event.counter}
                    </p>
                  </div>

                  <div className="sm:col-span-2">
                    <p className="font-semibold text-gray-900">
                      Access Period
                    </p>

                    <p className="mt-1 text-gray-600">
                      {event.accessPeriod}
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                  <p className="text-sm font-semibold text-gray-900">
                    Authorised Permissions
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {event.permissions.map((permission) => (
                      <span
                        key={permission}
                        className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700"
                      >
                        {permission}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex shrink-0 items-start">
                <Link
                  href={`/committee/events/${event.id}`}
                  className="rounded-xl bg-red-700 px-5 py-3 font-semibold text-white hover:bg-red-800"
                >
                  Open Event Tools
                </Link>
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}