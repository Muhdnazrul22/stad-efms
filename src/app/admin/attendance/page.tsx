import {
  AdminPageHeader,
  StatCard,
  StatusBadge,
} from "../components";
import { attendanceRecords } from "../data";

export default function AdminAttendancePage() {
  const checkedIn = attendanceRecords.filter(
    (record) =>
      record.status === "Checked In" ||
      record.status === "Checked Out",
  ).length;

  const currentlyInside = attendanceRecords.filter(
    (record) => record.status === "Checked In",
  ).length;

  const checkedOut = attendanceRecords.filter(
    (record) => record.status === "Checked Out",
  ).length;

  const absent = attendanceRecords.filter(
    (record) => record.status === "Absent",
  ).length;

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="Attendance Management"
        title="Attendance Dashboard"
        description="Monitor participant check-in and check-out records."
      />

      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Checked In"
          value={checkedIn}
          description="Participants with recorded attendance."
        />

        <StatCard
          label="Currently Inside"
          value={currentlyInside}
          description="Checked in but not checked out."
        />

        <StatCard
          label="Checked Out"
          value={checkedOut}
          description="Participants who completed check-out."
        />

        <StatCard
          label="Absent"
          value={absent}
          description="No attendance record available."
        />
      </section>

      <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="grid gap-4 border-b border-gray-200 p-5 md:grid-cols-2">
          <select className="rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-red-600">
            <option>New Student Orientation 2026</option>
            <option>Student Leadership Workshop</option>
          </select>

          <input
            type="search"
            placeholder="Search participant or ID..."
            className="rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-red-600 focus:ring-2 focus:ring-red-100"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-[1100px] w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="px-6 py-4 font-semibold">
                  Participant
                </th>
                <th className="px-6 py-4 font-semibold">Event</th>
                <th className="px-6 py-4 font-semibold">
                  Check-in
                </th>
                <th className="px-6 py-4 font-semibold">
                  Check-out
                </th>
                <th className="px-6 py-4 font-semibold">Scanner</th>
                <th className="px-6 py-4 font-semibold">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {attendanceRecords.map((record) => (
                <tr key={record.id}>
                  <td className="px-6 py-5">
                    <p className="font-semibold text-gray-900">
                      {record.participantName}
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      {record.universityId}
                    </p>
                  </td>

                  <td className="px-6 py-5 text-gray-600">
                    {record.eventTitle}
                  </td>

                  <td className="px-6 py-5 text-gray-600">
                    {record.checkIn}
                  </td>

                  <td className="px-6 py-5 text-gray-600">
                    {record.checkOut}
                  </td>

                  <td className="px-6 py-5 text-gray-600">
                    {record.scanner}
                  </td>

                  <td className="px-6 py-5">
                    <StatusBadge status={record.status} />
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