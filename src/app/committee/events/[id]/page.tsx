import Link from "next/link";

import {
  CommitteePageHeader,
  CommitteeStatCard,
  CommitteeStatusBadge,
} from "../../components";

import { getAssignedEvent } from "../../data";

type CommitteeEventPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function CommitteeEventPage({
  params,
}: CommitteeEventPageProps) {
  const { id } = await params;
  const event = getAssignedEvent(id);

  if (!event) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center shadow-sm">
        <h1 className="text-3xl font-bold text-gray-900">
          Assigned Event Not Found
        </h1>

        <p className="mt-4 text-gray-600">
          You do not have access to this event, or the assigned event
          does not exist.
        </p>

        <Link
          href="/committee"
          className="mt-7 inline-block rounded-xl bg-red-700 px-5 py-3 font-semibold text-white hover:bg-red-800"
        >
          Return to Committee Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-7">
      <CommitteePageHeader
        eyebrow="Assigned Event"
        title={event.title}
        description={`${event.date} · ${event.time} · ${event.venue}`}
        action={<CommitteeStatusBadge status={event.status} />}
      />

      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <CommitteeStatCard
          label="Registered"
          value={event.registered}
          description="Total participants registered for this event."
        />

        <CommitteeStatCard
          label="Checked In"
          value={event.checkedIn}
          description="Participants with a recorded check-in."
        />

        <CommitteeStatCard
          label="Checked Out"
          value={event.checkedOut}
          description="Participants who completed check-out."
        />

        <CommitteeStatCard
          label="Currently Inside"
          value={event.currentlyInside}
          description="Participants checked in but not checked out."
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <article className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900">
            Assignment Information
          </h2>

          <div className="mt-5 space-y-5 text-sm">
            <div>
              <p className="font-semibold text-gray-900">
                Committee Role
              </p>

              <p className="mt-1 text-gray-600">{event.role}</p>
            </div>

            <div>
              <p className="font-semibold text-gray-900">
                Assigned Counter
              </p>

              <p className="mt-1 text-gray-600">{event.counter}</p>
            </div>

            <div>
              <p className="font-semibold text-gray-900">
                Access Period
              </p>

              <p className="mt-1 text-gray-600">
                {event.accessPeriod}
              </p>
            </div>

            <div>
              <p className="font-semibold text-gray-900">
                Event Category
              </p>

              <p className="mt-1 text-gray-600">
                {event.category}
              </p>
            </div>
          </div>
        </article>

        <article className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900">
            Available Committee Tools
          </h2>

          <p className="mt-2 text-sm leading-6 text-gray-600">
            Select one of the authorised functions for this event.
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <Link
              href={`/committee/events/${event.id}/participants`}
              className="rounded-xl border border-gray-300 px-4 py-3 text-center text-sm font-semibold text-gray-700 hover:border-red-300 hover:bg-red-50 hover:text-red-700"
            >
              Participant List
            </Link>

            <Link
              href={`/committee/events/${event.id}/walk-in`}
              className="rounded-xl border border-gray-300 px-4 py-3 text-center text-sm font-semibold text-gray-700 hover:border-red-300 hover:bg-red-50 hover:text-red-700"
            >
              Register Walk-in
            </Link>

            <Link
              href={`/committee/events/${event.id}/scan`}
              className="rounded-xl bg-red-700 px-4 py-3 text-center text-sm font-semibold text-white hover:bg-red-800"
            >
              Attendance Scanner
            </Link>

            <Link
              href={`/committee/events/${event.id}/history`}
              className="rounded-xl border border-gray-300 px-4 py-3 text-center text-sm font-semibold text-gray-700 hover:border-red-300 hover:bg-red-50 hover:text-red-700"
            >
              Scan History
            </Link>
          </div>
        </article>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900">
          Committee Permissions
        </h2>

        <p className="mt-2 text-sm text-gray-600">
          Your authorised functions for this assigned event.
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {event.permissions.map((permission) => (
            <span
              key={permission}
              className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800"
            >
              {permission}
            </span>
          ))}
        </div>
      </section>

      <div className="flex justify-start">
        <Link
          href="/committee"
          className="rounded-xl border border-gray-300 px-5 py-3 font-semibold text-gray-700 hover:bg-gray-50"
        >
          Back to Committee Dashboard
        </Link>
      </div>
    </div>
  );
}