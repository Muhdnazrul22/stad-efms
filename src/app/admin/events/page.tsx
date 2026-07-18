import Link from "next/link";
import {
  AdminPageHeader,
  StatusBadge,
} from "../components";
import { adminEvents } from "../data";

export default function AdminEventsPage() {
  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="Event Management"
        title="Events"
        description="Create, publish and monitor STAD programmes and student activities."
        action={
          <Link
            href="/admin/events/new"
            className="inline-block rounded-xl bg-red-700 px-5 py-3 font-semibold text-white hover:bg-red-800"
          >
            Create New Event
          </Link>
        }
      />

      <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 p-5">
          <input
            type="search"
            placeholder="Search events..."
            className="w-full max-w-md rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-red-600 focus:ring-2 focus:ring-red-100"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-[900px] w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="px-6 py-4 font-semibold">Event</th>
                <th className="px-6 py-4 font-semibold">Date</th>
                <th className="px-6 py-4 font-semibold">Venue</th>
                <th className="px-6 py-4 font-semibold">Registration</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {adminEvents.map((event) => (
                <tr key={event.id}>
                  <td className="px-6 py-5">
                    <p className="font-semibold text-gray-900">
                      {event.title}
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      {event.category}
                    </p>
                  </td>

                  <td className="px-6 py-5 text-gray-600">
                    <p>{event.date}</p>
                    <p className="mt-1 text-xs">{event.time}</p>
                  </td>

                  <td className="px-6 py-5 text-gray-600">
                    {event.venue}
                  </td>

                  <td className="px-6 py-5 text-gray-600">
                    {event.registrations} / {event.capacity}
                  </td>

                  <td className="px-6 py-5">
                    <StatusBadge status={event.status} />
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex gap-2">
                      <Link
                        href={`/events/${event.id}`}
                        className="rounded-lg border border-gray-300 px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50"
                      >
                        View
                      </Link>

                      <button
                        type="button"
                        className="rounded-lg bg-red-700 px-3 py-2 text-xs font-semibold text-white hover:bg-red-800"
                      >
                        Edit Demo
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}