"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";

import {
  CommitteePageHeader,
  CommitteeStatusBadge,
} from "../../../components";

import {
  getAssignedEvent,
  getEventScanHistory,
} from "../../../data";

export default function CommitteeHistoryPage() {
  const params = useParams();
  const eventId = String(params.id ?? "");

  const event = getAssignedEvent(eventId);
  const records = getEventScanHistory(eventId);

  const [actionFilter, setActionFilter] = useState("All");
  const [resultFilter, setResultFilter] = useState("All");

  const filteredRecords = useMemo(() => {
    return records.filter((record) => {
      const matchesAction =
        actionFilter === "All" ||
        record.action === actionFilter;

      const matchesResult =
        resultFilter === "All" ||
        record.result === resultFilter;

      return matchesAction && matchesResult;
    });
  }, [records, actionFilter, resultFilter]);

  if (!event) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center shadow-sm">
        <h1 className="text-3xl font-bold text-gray-900">
          Event Not Found
        </h1>

        <p className="mt-4 text-gray-600">
          You do not have access to this event.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <CommitteePageHeader
        eyebrow="Attendance Records"
        title="Committee Scan History"
        description={`Review sample attendance actions for ${event.title}.`}
      />

      <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="grid gap-4 border-b border-gray-200 p-5 md:grid-cols-2">
          <div>
            <label
              htmlFor="historyAction"
              className="mb-2 block text-sm font-semibold text-gray-800"
            >
              Attendance action
            </label>

            <select
              id="historyAction"
              value={actionFilter}
              onChange={(filterEvent) =>
                setActionFilter(filterEvent.target.value)
              }
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-red-600"
            >
              <option value="All">All actions</option>
              <option value="Check-in">Check-in</option>
              <option value="Check-out">Check-out</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="historyResult"
              className="mb-2 block text-sm font-semibold text-gray-800"
            >
              Scan result
            </label>

            <select
              id="historyResult"
              value={resultFilter}
              onChange={(filterEvent) =>
                setResultFilter(filterEvent.target.value)
              }
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-red-600"
            >
              <option value="All">All results</option>
              <option value="Successful">Successful</option>
              <option value="Duplicate">Duplicate</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[950px] text-left text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="px-6 py-4 font-semibold">
                  Participant
                </th>

                <th className="px-6 py-4 font-semibold">
                  Action
                </th>

                <th className="px-6 py-4 font-semibold">
                  Time
                </th>

                <th className="px-6 py-4 font-semibold">
                  Scanner
                </th>

                <th className="px-6 py-4 font-semibold">
                  Result
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {filteredRecords.map((record) => (
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
                    {record.action}
                  </td>

                  <td className="px-6 py-5 text-gray-600">
                    {record.time}
                  </td>

                  <td className="px-6 py-5 text-gray-600">
                    {record.scanner}
                  </td>

                  <td className="px-6 py-5">
                    <CommitteeStatusBadge
                      status={record.result}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredRecords.length === 0 && (
          <div className="p-10 text-center text-gray-500">
            No scan records match the selected filters.
          </div>
        )}
      </section>
    </div>
  );
}