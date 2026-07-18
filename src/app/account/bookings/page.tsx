import Link from "next/link";
import { facilityBookings } from "../data";

function getBookingStatusClasses(status: string) {
  switch (status) {
    case "Approved":
      return "bg-green-100 text-green-800";
    case "Pending":
      return "bg-amber-100 text-amber-800";
    case "Rejected":
      return "bg-red-100 text-red-800";
    case "Completed":
      return "bg-blue-100 text-blue-800";
    default:
      return "bg-gray-100 text-gray-700";
  }
}

export default function BookingsPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
        <p className="font-semibold text-red-700">My Bookings</p>

        <h1 className="mt-2 text-3xl font-bold text-gray-900">
          Facility Booking Requests
        </h1>

        <p className="mt-3 text-gray-600">
          Track your facility requests and approval status.
        </p>
      </section>

      <section className="space-y-5">
        {facilityBookings.map((booking) => (
          <article
            key={booking.id}
            className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
          >
            <div className="flex flex-col justify-between gap-5 lg:flex-row">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <p className="text-sm font-semibold text-red-700">
                    {booking.reference}
                  </p>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${getBookingStatusClasses(
                      booking.status,
                    )}`}
                  >
                    {booking.status}
                  </span>
                </div>

                <h2 className="mt-3 text-xl font-bold text-gray-900">
                  {booking.facilityName}
                </h2>

                <p className="mt-1 text-gray-600">
                  {booking.activityName}
                </p>

                <div className="mt-4 grid gap-3 text-sm text-gray-600 sm:grid-cols-3">
                  <p>
                    <span className="font-semibold text-gray-900">
                      Date:
                    </span>{" "}
                    {booking.date}
                  </p>

                  <p>
                    <span className="font-semibold text-gray-900">
                      Time:
                    </span>{" "}
                    {booking.time}
                  </p>

                  <p>
                    <span className="font-semibold text-gray-900">
                      Participants:
                    </span>{" "}
                    {booking.participants}
                  </p>
                </div>
              </div>

              <div className="shrink-0">
                <Link
                  href={`/facilities/${booking.facilityId}`}
                  className="inline-block rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                >
                  View Facility
                </Link>
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}