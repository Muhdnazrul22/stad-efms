"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import {
  CommitteePageHeader,
  CommitteeStatusBadge,
} from "../../../components";
import {
  getAssignedEvent,
  getEventParticipants,
} from "../../../data";

export default function CommitteeParticipantsPage() {
  const params = useParams();
  const eventId = String(params.id ?? "");

  const event = getAssignedEvent(eventId);
  const participants = getEventParticipants(eventId);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  const filteredParticipants = useMemo(() => {
    const query = search.trim().toLowerCase();

    return participants.filter((participant) => {
      const matchesSearch =
        !query ||
        participant.fullName.toLowerCase().includes(query) ||
        participant.universityId.toLowerCase().includes(query) ||
        participant.email.toLowerCase().includes(query);

      const matchesStatus =
        status === "All" || participant.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [participants, search, status]);

  if (!event) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center shadow-sm">
        <h1 className="text-3xl font-bold text-gray-900">
          Event Not Found
        </h1>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <CommitteePageHeader
        eyebrow="Participant Management"
        title="Participant List"
        description={`Search registered participants for ${event.title}.`}
      />

      <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="grid gap-4 border-b border-gray-200 p-5 md:grid-cols-2">
          <div>
            <label
              htmlFor="participantSearch"
              className="mb-2 block text-sm font-semibold text-gray-800"
            >
              Search participant
            </label>

            <input
              id="participantSearch"
              type="search"
              value={search}
              onChange={(searchEvent) =>
                setSearch(searchEvent.target.value)
              }
              placeholder="Name, student ID or email"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-red-600 focus:ring-2 focus:ring-red-100"
            />
          </div>

          <div>
            <label
              htmlFor="participantStatus"
              className="mb-2 block text-sm font-semibold text-gray-800"
            >
              Attendance status
            </label>

            <select
              id="participantStatus"
              value={status}
              onChange={(statusEvent) =>
                setStatus(statusEvent.target.value)
              }
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-red-600"
            >
              <option value="All">All statuses</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Pending">Pending</option>
              <option value="Checked In">Checked In</option>
              <option value="Checked Out">Checked Out</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1100px] text-left text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="px-6 py-4 font-semibold">
                  Participant
                </th>
                <th className="px-6 py-4 font-semibold">
                  Faculty and Programme
                </th>
                <th className="px-6 py-4 font-semibold">
                  Registration
                </th>
                <th className="px-6 py-4 font-semibold">
                  Check-in
                </th>
                <th className="px-6 py-4 font-semibold">
                  Check-out
                </th>
                <th className="px-6 py-4 font-semibold">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {filteredParticipants.map((participant) => (
                <tr key={participant.id}>
                  <td className="px-6 py-5">
                    <p className="font-semibold text-gray-900">
                      {participant.fullName}
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      {participant.universityId}
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      {participant.email}
                    </p>
                  </td>

                  <td className="px-6 py-5 text-gray-600">
                    <p>{participant.faculty}</p>
                    <p className="mt-1 text-xs">
                      {participant.programme}
                    </p>
                  </td>

                  <td className="px-6 py-5">
                    <CommitteeStatusBadge
                      status={participant.registrationType}
                    />
                  </td>

                  <td className="px-6 py-5 text-gray-600">
                    {participant.checkIn}
                  </td>

                  <td className="px-6 py-5 text-gray-600">
                    {participant.checkOut}
                  </td>

                  <td className="px-6 py-5">
                    <CommitteeStatusBadge
                      status={participant.status}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredParticipants.length === 0 && (
          <div className="p-10 text-center text-gray-500">
            No participants match your search.
          </div>
        )}
      </section>
    </div>
  );
}