import {
  AdminPageHeader,
  StatusBadge,
} from "../components";
import { adminRegistrations } from "../data";

export default function AdminRegistrationsPage() {
  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="Registration Management"
        title="Event Registrations"
        description="Review participant information and registration status for STAAD events."
      />

      <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="grid gap-4 border-b border-gray-200 p-5 md:grid-cols-3">
          <input
            type="search"
            placeholder="Search participant or ID..."
            className="rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-red-600 focus:ring-2 focus:ring-red-100"
          />

          <select className="rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-red-600">
            <option>All events</option>
            <option>New Student Orientation 2026</option>
            <option>Student Leadership Workshop</option>
          </select>

          <select className="rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-red-600">
            <option>All statuses</option>
            <option>Confirmed</option>
            <option>Pending</option>
            <option>Cancelled</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-[1050px] w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="px-6 py-4 font-semibold">
                  Participant
                </th>
                <th className="px-6 py-4 font-semibold">Event</th>
                <th className="px-6 py-4 font-semibold">Type</th>
                <th className="px-6 py-4 font-semibold">
                  Registered
                </th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {adminRegistrations.map((registration) => (
                <tr key={registration.id}>
                  <td className="px-6 py-5">
                    <p className="font-semibold text-gray-900">
                      {registration.participantName}
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      {registration.universityId}
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      {registration.email}
                    </p>
                  </td>

                  <td className="px-6 py-5 text-gray-600">
                    {registration.eventTitle}
                  </td>

                  <td className="px-6 py-5 text-gray-600">
                    {registration.registrationType}
                  </td>

                  <td className="px-6 py-5 text-gray-600">
                    {registration.registeredAt}
                  </td>

                  <td className="px-6 py-5">
                    <StatusBadge status={registration.status} />
                  </td>

                  <td className="px-6 py-5">
                    <button
                      type="button"
                      className="rounded-lg border border-gray-300 px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50"
                    >
                      View Demo
                    </button>
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