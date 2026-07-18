"use client";

import { useState } from "react";
import {
  AdminPageHeader,
  StatusBadge,
} from "../components";

type CommitteeAssignment = {
  id: string;
  memberName: string;
  universityId: string;
  eventTitle: string;
  role: string;
  counter: string;
  accessPeriod: string;
  permissions: string[];
  status: "Active" | "Expired";
};

const initialAssignments: CommitteeAssignment[] = [
  {
    id: "committee-001",
    memberName: "Aisha Rahman",
    universityId: "202505010102",
    eventTitle: "New Student Orientation 2026",
    role: "Registration Committee",
    counter: "Counter 1",
    accessPeriod: "20 July 2026, 8:00 AM – 6:00 PM",
    permissions: [
      "View participants",
      "Register walk-ins",
      "Scan check-in",
    ],
    status: "Active",
  },
  {
    id: "committee-002",
    memberName: "Daniel Lee",
    universityId: "202401010087",
    eventTitle: "New Student Orientation 2026",
    role: "Attendance Committee",
    counter: "Counter 2",
    accessPeriod: "20 July 2026, 8:00 AM – 6:00 PM",
    permissions: [
      "View participants",
      "Scan check-in",
      "Scan check-out",
    ],
    status: "Active",
  },
  {
    id: "committee-003",
    memberName: "Nur Sofia",
    universityId: "202410010055",
    eventTitle: "Graduate Career Preparation",
    role: "Registration Committee",
    counter: "Main Entrance",
    accessPeriod: "15 June 2026, 8:00 AM – 2:00 PM",
    permissions: ["View participants", "Scan check-in"],
    status: "Expired",
  },
];

export default function AdminCommitteePage() {
  const [assignments, setAssignments] =
    useState<CommitteeAssignment[]>(initialAssignments);

  function revokeAssignment(assignmentId: string) {
    setAssignments((current) =>
      current.map((assignment) =>
        assignment.id === assignmentId
          ? {
              ...assignment,
              status: "Expired",
            }
          : assignment,
      ),
    );
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="Committee Management"
        title="Event Committee Assignments"
        description="Assign committee members, counters, access periods and event permissions."
        action={
          <button
            type="button"
            className="rounded-xl bg-red-700 px-5 py-3 font-semibold text-white hover:bg-red-800"
          >
            Assign Committee Demo
          </button>
        }
      />

      <div className="rounded-xl border border-blue-200 bg-blue-50 p-5 text-sm leading-6 text-blue-800">
        Committee assignments are sample data. Revoking access only
        changes the current browser view.
      </div>

      <section className="space-y-5">
        {assignments.map((assignment) => (
          <article
            key={assignment.id}
            className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
          >
            <div className="flex flex-col justify-between gap-6 xl:flex-row">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-3">
                  <StatusBadge status={assignment.status} />

                  <span className="text-sm font-semibold text-red-700">
                    {assignment.role}
                  </span>
                </div>

                <h2 className="mt-4 text-xl font-bold text-gray-900">
                  {assignment.memberName}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  {assignment.universityId}
                </p>

                <div className="mt-5 grid gap-4 text-sm sm:grid-cols-2">
                  <div>
                    <p className="font-semibold text-gray-900">Event</p>
                    <p className="mt-1 text-gray-600">
                      {assignment.eventTitle}
                    </p>
                  </div>

                  <div>
                    <p className="font-semibold text-gray-900">
                      Assigned Counter
                    </p>
                    <p className="mt-1 text-gray-600">
                      {assignment.counter}
                    </p>
                  </div>

                  <div className="sm:col-span-2">
                    <p className="font-semibold text-gray-900">
                      Access Period
                    </p>
                    <p className="mt-1 text-gray-600">
                      {assignment.accessPeriod}
                    </p>
                  </div>
                </div>

                <div className="mt-5">
                  <p className="text-sm font-semibold text-gray-900">
                    Permissions
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {assignment.permissions.map((permission) => (
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

              <div className="flex shrink-0 flex-wrap items-start gap-3">
                <button
                  type="button"
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                >
                  Edit Demo
                </button>

                <button
                  type="button"
                  disabled={assignment.status === "Expired"}
                  onClick={() => revokeAssignment(assignment.id)}
                  className="rounded-lg bg-red-700 px-4 py-2 text-sm font-semibold text-white hover:bg-red-800 disabled:cursor-not-allowed disabled:bg-gray-300"
                >
                  {assignment.status === "Expired"
                    ? "Access Expired"
                    : "Revoke Access"}
                </button>
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}