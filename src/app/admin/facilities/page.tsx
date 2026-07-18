import Link from "next/link";
import {
  AdminPageHeader,
  StatusBadge,
} from "../components";
import { adminFacilities } from "../data";

export default function AdminFacilitiesPage() {
  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="Facility Management"
        title="Campus Facilities"
        description="Review facility information, capacity and operational availability."
        action={
          <button
            type="button"
            className="rounded-xl bg-red-700 px-5 py-3 font-semibold text-white hover:bg-red-800"
          >
            Add Facility Demo
          </button>
        }
      />

      <section className="grid gap-5 xl:grid-cols-2">
        {adminFacilities.map((facility) => (
          <article
            key={facility.id}
            className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
          >
            <div className="flex flex-col justify-between gap-5 sm:flex-row">
              <div>
                <p className="text-sm font-semibold text-red-700">
                  {facility.type}
                </p>

                <h2 className="mt-2 text-xl font-bold text-gray-900">
                  {facility.name}
                </h2>

                <p className="mt-2 text-sm text-gray-600">
                  {facility.location}
                </p>
              </div>

              <StatusBadge status={facility.status} />
            </div>

            <div className="mt-6 grid gap-4 rounded-xl bg-gray-50 p-4 text-sm sm:grid-cols-2">
              <div>
                <p className="font-semibold text-gray-900">Capacity</p>
                <p className="mt-1 text-gray-600">
                  {facility.capacity} people
                </p>
              </div>

              <div>
                <p className="font-semibold text-gray-900">
                  Next Booking
                </p>
                <p className="mt-1 text-gray-600">
                  {facility.nextBooking}
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={`/facilities/${facility.id}`}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
              >
                View Public Page
              </Link>

              <button
                type="button"
                className="rounded-lg bg-red-700 px-4 py-2 text-sm font-semibold text-white hover:bg-red-800"
              >
                Edit Demo
              </button>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}