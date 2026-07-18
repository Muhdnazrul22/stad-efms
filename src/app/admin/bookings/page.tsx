"use client";

import { useState } from "react";
import {
  AdminPageHeader,
  StatusBadge,
} from "../components";
import {
  bookingRequests,
  type BookingRequest,
  type BookingStatus,
} from "../data";

export default function AdminBookingsPage() {
  const [bookings, setBookings] =
    useState<BookingRequest[]>(bookingRequests);

  function updateStatus(
    bookingId: string,
    status: BookingStatus,
  ) {
    setBookings((current) =>
      current.map((booking) =>
        booking.id === bookingId
          ? {
              ...booking,
              status,
            }
          : booking,
      ),
    );
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="Booking Management"
        title="Facility Booking Requests"
        description="Review and update sample facility booking approval statuses."
      />

      <div className="rounded-xl border border-blue-200 bg-blue-50 p-5 text-sm leading-6 text-blue-800">
        Approve and Reject buttons currently update the browser view only.
        Changes will reset after refreshing until Supabase is connected.
      </div>

      <section className="space-y-5">
        {bookings.map((booking) => (
          <article
            key={booking.id}
            className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
          >
            <div className="flex flex-col justify-between gap-5 xl:flex-row">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-3">
                  <p className="text-sm font-semibold text-red-700">
                    {booking.reference}
                  </p>

                  <StatusBadge status={booking.status} />
                </div>

                <h2 className="mt-3 text-xl font-bold text-gray-900">
                  {booking.facilityName}
                </h2>

                <p className="mt-1 text-gray-600">
                  {booking.activityName}
                </p>

                <div className="mt-5 grid gap-4 text-sm text-gray-600 sm:grid-cols-2 lg:grid-cols-3">
                  <div>
                    <p className="font-semibold text-gray-900">
                      Applicant
                    </p>

                    <p className="mt-1">{booking.applicantName}</p>

                    <p className="mt-1 text-xs">
                      {booking.universityId}
                    </p>
                  </div>

                  <div>
                    <p className="font-semibold text-gray-900">
                      Date and Time
                    </p>

                    <p className="mt-1">{booking.date}</p>
                    <p className="mt-1">{booking.time}</p>
                  </div>

                  <div>
                    <p className="font-semibold text-gray-900">
                      Participants
                    </p>

                    <p className="mt-1">{booking.participants}</p>
                  </div>
                </div>

                <p className="mt-5 text-xs text-gray-500">
                  Submitted {booking.submittedAt}
                </p>
              </div>

              <div className="flex shrink-0 flex-wrap items-start gap-3">
                <button
                  type="button"
                  onClick={() =>
                    updateStatus(booking.id, "Approved")
                  }
                  className="rounded-lg bg-green-700 px-4 py-2 text-sm font-semibold text-white hover:bg-green-800"
                >
                  Approve
                </button>

                <button
                  type="button"
                  onClick={() =>
                    updateStatus(booking.id, "Rejected")
                  }
                  className="rounded-lg bg-red-700 px-4 py-2 text-sm font-semibold text-white hover:bg-red-800"
                >
                  Reject
                </button>

                <button
                  type="button"
                  onClick={() =>
                    updateStatus(booking.id, "Pending")
                  }
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                >
                  Reset
                </button>
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}