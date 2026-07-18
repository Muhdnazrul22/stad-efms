"use client";

import { useState } from "react";
import {
  AdminPageHeader,
  StatCard,
} from "../components";

const reportTypes = [
  {
    id: "registrations",
    title: "Event Registrations",
    description:
      "Participant information, registration source and status.",
  },
  {
    id: "attendance",
    title: "Attendance Report",
    description:
      "Check-in, check-out, attendance status and scanner information.",
  },
  {
    id: "bookings",
    title: "Facility Booking Report",
    description:
      "Booking applicant, date, facility and approval status.",
  },
  {
    id: "certificates",
    title: "Certificate Report",
    description:
      "Eligibility, certificate number and issue status.",
  },
];

export default function AdminReportsPage() {
  const [selectedReport, setSelectedReport] =
    useState("registrations");
  const [eventFilter, setEventFilter] = useState("All events");
  const [message, setMessage] = useState("");

  function generateReport() {
    const report = reportTypes.find(
      (item) => item.id === selectedReport,
    );

    setMessage(
      `${report?.title ?? "Report"} prepared for ${eventFilter}. This is a demo preview only.`,
    );
  }

  function exportReport() {
    const report = reportTypes.find(
      (item) => item.id === selectedReport,
    );

    setMessage(
      `${report?.title ?? "Report"} export requested. Excel export will be connected later.`,
    );
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="Reports and Analytics"
        title="Management Reports"
        description="Prepare event, attendance, facility and certificate reports."
      />

      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total Events"
          value="4"
          description="Events included in the sample reporting period."
        />

        <StatCard
          label="Registrations"
          value="438"
          description="Sample participant registrations."
        />

        <StatCard
          label="Attendance Rate"
          value="82%"
          description="Sample attendance completion rate."
        />

        <StatCard
          label="Facility Requests"
          value="27"
          description="Sample booking requests received."
        />
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-xl font-bold text-gray-900">
          Prepare a Report
        </h2>

        <p className="mt-2 text-gray-600">
          Choose a report type and sample filter.
        </p>

        <div className="mt-7 grid gap-6 md:grid-cols-2">
          <div>
            <label
              htmlFor="reportType"
              className="mb-2 block text-sm font-semibold text-gray-800"
            >
              Report type
            </label>

            <select
              id="reportType"
              value={selectedReport}
              onChange={(event) => {
                setSelectedReport(event.target.value);
                setMessage("");
              }}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-red-600 focus:ring-2 focus:ring-red-100"
            >
              {reportTypes.map((report) => (
                <option key={report.id} value={report.id}>
                  {report.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="eventFilter"
              className="mb-2 block text-sm font-semibold text-gray-800"
            >
              Event filter
            </label>

            <select
              id="eventFilter"
              value={eventFilter}
              onChange={(event) => {
                setEventFilter(event.target.value);
                setMessage("");
              }}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-red-600 focus:ring-2 focus:ring-red-100"
            >
              <option>All events</option>
              <option>New Student Orientation 2026</option>
              <option>Student Leadership Workshop</option>
              <option>Campus Community Day</option>
            </select>
          </div>
        </div>

        <div className="mt-7 rounded-xl bg-gray-50 p-5">
          <p className="font-semibold text-gray-900">
            {
              reportTypes.find(
                (report) => report.id === selectedReport,
              )?.title
            }
          </p>

          <p className="mt-2 text-sm leading-6 text-gray-600">
            {
              reportTypes.find(
                (report) => report.id === selectedReport,
              )?.description
            }
          </p>
        </div>

        {message && (
          <div
            role="status"
            className="mt-6 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-800"
          >
            {message}
          </div>
        )}

        <div className="mt-7 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={generateReport}
            className="rounded-xl bg-red-700 px-5 py-3 font-semibold text-white hover:bg-red-800"
          >
            Generate Preview
          </button>

          <button
            type="button"
            onClick={exportReport}
            className="rounded-xl border border-gray-300 px-5 py-3 font-semibold text-gray-700 hover:bg-gray-50"
          >
            Export Excel Demo
          </button>
        </div>
      </section>
    </div>
  );
}