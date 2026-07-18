"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import {
  CommitteePageHeader,
  CommitteeStatusBadge,
} from "../../../components";
import {
  getAssignedEvent,
  getEventParticipants,
  type ScanAction,
} from "../../../data";

type ScanFeedback = {
  title: string;
  message: string;
  result: "Successful" | "Duplicate" | "Rejected";
};

export default function CommitteeScannerPage() {
  const params = useParams();
  const eventId = String(params.id ?? "");

  const event = getAssignedEvent(eventId);
  const participants = getEventParticipants(eventId);

  const [mode, setMode] = useState<ScanAction>("Check-in");
  const [token, setToken] = useState("");
  const [feedback, setFeedback] =
    useState<ScanFeedback | null>(null);

  const [processedActions, setProcessedActions] = useState<
    string[]
  >([]);

  function processToken() {
    const cleanToken = token.trim();

    if (!cleanToken) {
      setFeedback({
        title: "Token required",
        message:
          "Enter a QR token before processing attendance.",
        result: "Rejected",
      });
      return;
    }

    const participant = participants.find(
      (item) => item.qrToken === cleanToken,
    );

    if (!participant) {
      setFeedback({
        title: "Registration not found",
        message:
          "This QR token is not registered for the selected event.",
        result: "Rejected",
      });
      return;
    }

    const actionKey = `${participant.id}-${mode}`;

    if (processedActions.includes(actionKey)) {
      setFeedback({
        title: "Duplicate scan",
        message: `${mode} has already been processed for ${participant.fullName} during this demo session.`,
        result: "Duplicate",
      });
      return;
    }

    if (
      mode === "Check-in" &&
      participant.checkIn !== "Not recorded"
    ) {
      setFeedback({
        title: "Already checked in",
        message: `${participant.fullName} already has a check-in record.`,
        result: "Duplicate",
      });
      return;
    }

    if (
      mode === "Check-out" &&
      participant.checkIn === "Not recorded"
    ) {
      setFeedback({
        title: "Check-in required",
        message: `${participant.fullName} cannot check out before checking in.`,
        result: "Rejected",
      });
      return;
    }

    if (
      mode === "Check-out" &&
      participant.checkOut !== "Not recorded"
    ) {
      setFeedback({
        title: "Already checked out",
        message: `${participant.fullName} already has a check-out record.`,
        result: "Duplicate",
      });
      return;
    }

    setProcessedActions((current) => [
      ...current,
      actionKey,
    ]);

    setFeedback({
      title: `${mode} successful`,
      message: `${participant.fullName} (${participant.universityId}) was processed successfully.`,
      result: "Successful",
    });

    setToken("");
  }

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
        eyebrow="Attendance Scanner"
        title="Manual QR Token Entry"
        description={`Process participant attendance for ${event.title}.`}
      />

      <div className="rounded-xl border border-blue-200 bg-blue-50 p-5 text-sm leading-6 text-blue-800">
        Camera scanning will be added later. Use one of the sample QR
        tokens below to test manual attendance processing.
      </div>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <fieldset>
            <legend className="text-sm font-semibold text-gray-900">
              Attendance mode
            </legend>

            <div className="mt-3 flex flex-wrap gap-3">
              {(["Check-in", "Check-out"] as ScanAction[]).map(
                (action) => (
                  <button
                    key={action}
                    type="button"
                    onClick={() => {
                      setMode(action);
                      setFeedback(null);
                    }}
                    className={`rounded-xl px-5 py-3 font-semibold ${
                      mode === action
                        ? "bg-red-700 text-white"
                        : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {action}
                  </button>
                ),
              )}
            </div>
          </fieldset>

          <div className="mt-7">
            <label
              htmlFor="qrToken"
              className="mb-2 block text-sm font-semibold text-gray-800"
            >
              QR token
            </label>

            <textarea
              id="qrToken"
              rows={4}
              value={token}
              onChange={(tokenEvent) => {
                setToken(tokenEvent.target.value);
                setFeedback(null);
              }}
              placeholder="Paste or type the participant QR token"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 font-mono text-sm outline-none focus:border-red-600 focus:ring-2 focus:ring-red-100"
            />
          </div>

          <button
            type="button"
            onClick={processToken}
            className="mt-5 w-full rounded-xl bg-red-700 px-6 py-3 font-semibold text-white hover:bg-red-800"
          >
            Process {mode}
          </button>

          {feedback && (
            <div
              role="status"
              className={`mt-6 rounded-xl border p-5 ${
                feedback.result === "Successful"
                  ? "border-green-200 bg-green-50 text-green-800"
                  : feedback.result === "Duplicate"
                    ? "border-amber-200 bg-amber-50 text-amber-800"
                    : "border-red-200 bg-red-50 text-red-800"
              }`}
            >
              <div className="flex flex-wrap items-center gap-3">
                <p className="font-semibold">{feedback.title}</p>

                <CommitteeStatusBadge
                  status={feedback.result}
                />
              </div>

              <p className="mt-2 text-sm leading-6">
                {feedback.message}
              </p>
            </div>
          )}
        </div>

        <aside className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900">
            Sample Test Tokens
          </h2>

          <p className="mt-2 text-sm leading-6 text-gray-600">
            Copy a token and paste it into the scanner field.
          </p>

          <div className="mt-5 space-y-4">
            {participants.slice(0, 4).map((participant) => (
              <article
                key={participant.id}
                className="rounded-xl bg-gray-50 p-4"
              >
                <p className="font-semibold text-gray-900">
                  {participant.fullName}
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  {participant.status}
                </p>

                <p className="mt-3 break-all font-mono text-xs text-gray-600">
                  {participant.qrToken}
                </p>
              </article>
            ))}
          </div>
        </aside>
      </section>
    </div>
  );
}