import Link from "next/link";
import { eventRegistrations } from "../data";

function getStatusClasses(status: string) {
  switch (status) {
    case "Confirmed":
      return "bg-green-100 text-green-800";
    case "Pending":
      return "bg-amber-100 text-amber-800";
    case "Attended":
      return "bg-blue-100 text-blue-800";
    case "Cancelled":
      return "bg-gray-200 text-gray-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
}

export default function RegistrationsPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
        <p className="font-semibold text-red-700">My Registrations</p>

        <h1 className="mt-2 text-3xl font-bold text-gray-900">
          Event Registrations
        </h1>

        <p className="mt-3 text-gray-600">
          Review your registered events, attendance status and QR codes.
        </p>
      </section>

      <section className="space-y-5">
        {eventRegistrations.map((registration) => (
          <article
            key={registration.id}
            className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
          >
            <div className="flex flex-col justify-between gap-5 lg:flex-row">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-3">
                  <p className="text-sm font-semibold text-red-700">
                    {registration.category}
                  </p>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClasses(
                      registration.status,
                    )}`}
                  >
                    {registration.status}
                  </span>
                </div>

                <h2 className="mt-3 text-xl font-bold text-gray-900">
                  {registration.title}
                </h2>

                <div className="mt-4 grid gap-3 text-sm text-gray-600 sm:grid-cols-2">
                  <p>
                    <span className="font-semibold text-gray-900">
                      Date:
                    </span>{" "}
                    {registration.date}
                  </p>

                  <p>
                    <span className="font-semibold text-gray-900">
                      Time:
                    </span>{" "}
                    {registration.time}
                  </p>

                  <p>
                    <span className="font-semibold text-gray-900">
                      Venue:
                    </span>{" "}
                    {registration.venue}
                  </p>

                  <p>
                    <span className="font-semibold text-gray-900">
                      Registered:
                    </span>{" "}
                    {registration.registrationDate}
                  </p>
                </div>
              </div>

              <div className="flex shrink-0 flex-wrap items-start gap-3">
                <Link
                  href={`/events/${registration.eventId}`}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                >
                  Event Details
                </Link>

                <Link
                  href="/account/qr-codes"
                  className="rounded-lg bg-red-700 px-4 py-2 text-sm font-semibold text-white hover:bg-red-800"
                >
                  View QR
                </Link>
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}