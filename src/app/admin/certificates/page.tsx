"use client";

import { useState } from "react";
import {
  AdminPageHeader,
  StatCard,
  StatusBadge,
} from "../components";

type CertificateRecord = {
  id: string;
  participantName: string;
  universityId: string;
  eventTitle: string;
  attendance: string;
  evaluation: string;
  certificateNumber: string;
  status: "Eligible" | "Not Eligible" | "Issued";
};

const initialCertificates: CertificateRecord[] = [
  {
    id: "certificate-001",
    participantName: "Test Student",
    universityId: "202601010001",
    eventTitle: "Campus Community Day",
    attendance: "Completed",
    evaluation: "Completed",
    certificateNumber: "CITYU-STAD-2026-0001",
    status: "Issued",
  },
  {
    id: "certificate-002",
    participantName: "Aisha Rahman",
    universityId: "202505010102",
    eventTitle: "Student Leadership Workshop",
    attendance: "Completed",
    evaluation: "Completed",
    certificateNumber: "Not issued",
    status: "Eligible",
  },
  {
    id: "certificate-003",
    participantName: "Daniel Lee",
    universityId: "202401010087",
    eventTitle: "New Student Orientation 2026",
    attendance: "Check-out missing",
    evaluation: "Not required",
    certificateNumber: "Not available",
    status: "Not Eligible",
  },
];

export default function AdminCertificatesPage() {
  const [records, setRecords] =
    useState<CertificateRecord[]>(initialCertificates);

  function issueCertificate(recordId: string) {
    setRecords((current) =>
      current.map((record) =>
        record.id === recordId
          ? {
              ...record,
              status: "Issued",
              certificateNumber: `CITYU-STAD-DEMO-${Date.now()
                .toString()
                .slice(-6)}`,
            }
          : record,
      ),
    );
  }

  const issuedCount = records.filter(
    (record) => record.status === "Issued",
  ).length;

  const eligibleCount = records.filter(
    (record) => record.status === "Eligible",
  ).length;

  const notEligibleCount = records.filter(
    (record) => record.status === "Not Eligible",
  ).length;

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="Certificate Management"
        title="Participant Certificates"
        description="Review certificate eligibility and issue sample certificates."
        action={
          <button
            type="button"
            className="rounded-xl bg-red-700 px-5 py-3 font-semibold text-white hover:bg-red-800"
          >
            Certificate Rules Demo
          </button>
        }
      />

      <section className="grid gap-5 sm:grid-cols-3">
        <StatCard
          label="Issued"
          value={issuedCount}
          description="Certificates already issued."
        />

        <StatCard
          label="Eligible"
          value={eligibleCount}
          description="Participants ready for certificate issuance."
        />

        <StatCard
          label="Not Eligible"
          value={notEligibleCount}
          description="Participants with incomplete requirements."
        />
      </section>

      <div className="rounded-xl border border-blue-200 bg-blue-50 p-5 text-sm leading-6 text-blue-800">
        PDF generation is not connected yet. Issue Certificate changes
        only the current browser view.
      </div>

      <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1050px] text-left text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="px-6 py-4 font-semibold">Participant</th>
                <th className="px-6 py-4 font-semibold">Event</th>
                <th className="px-6 py-4 font-semibold">Attendance</th>
                <th className="px-6 py-4 font-semibold">Evaluation</th>
                <th className="px-6 py-4 font-semibold">Certificate</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {records.map((record) => (
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
                    {record.attendance}
                  </td>

                  <td className="px-6 py-5 text-gray-600">
                    {record.evaluation}
                  </td>

                  <td className="px-6 py-5 font-mono text-xs text-gray-600">
                    {record.certificateNumber}
                  </td>

                  <td className="px-6 py-5">
                    <StatusBadge status={record.status} />
                  </td>

                  <td className="px-6 py-5">
                    <button
                      type="button"
                      disabled={record.status !== "Eligible"}
                      onClick={() => issueCertificate(record.id)}
                      className="rounded-lg bg-red-700 px-4 py-2 text-xs font-semibold text-white hover:bg-red-800 disabled:cursor-not-allowed disabled:bg-gray-300"
                    >
                      {record.status === "Issued"
                        ? "Issued"
                        : "Issue Certificate"}
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