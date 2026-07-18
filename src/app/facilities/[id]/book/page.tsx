import Link from "next/link";
import { facilities } from "../../data";

type FacilityBookingPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function FacilityBookingPage({ params }: FacilityBookingPageProps) {
  const { id } = await params;
  const facility = facilities.find((item) => item.id === Number(id));

  if (!facility) {
    return (
      <main className="min-h-screen bg-gray-50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-red-700">Booking unavailable</p>
          <h1 className="mt-4 text-3xl font-bold text-gray-900">Facility not found</h1>
          <p className="mt-4 text-gray-600">The requested facility could not be located in the sample catalogue.</p>
          <Link
            href="/facilities"
            className="mt-8 inline-block rounded-lg bg-red-700 px-6 py-3 font-semibold text-white transition hover:bg-red-800"
          >
            Back to Facilities
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl rounded-2xl border border-gray-200 bg-white p-8 shadow-sm sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-red-700">Book facility</p>
        <h1 className="mt-3 text-3xl font-bold text-gray-900">Book {facility.name}</h1>
        <p className="mt-4 text-gray-600">
          This fictional booking flow is currently a placeholder for the STAD EFMS experience. Please contact the relevant office to confirm availability and proceed with your reservation.
        </p>

        <div className="mt-8 rounded-2xl bg-gray-50 p-6">
          <p className="text-sm font-semibold text-gray-500">Booking details</p>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div>
              <p className="font-semibold text-gray-900">Campus</p>
              <p className="mt-1 text-gray-600">{facility.campus}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-900">Location</p>
              <p className="mt-1 text-gray-600">{facility.location}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-900">Capacity</p>
              <p className="mt-1 text-gray-600">{facility.capacity} people</p>
            </div>
            <div>
              <p className="font-semibold text-gray-900">Contact</p>
              <p className="mt-1 text-gray-600">{facility.contact.email}</p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href={`/facilities/${facility.id}`} className="rounded-lg border border-gray-300 px-5 py-3 text-center font-semibold text-gray-700 transition hover:border-red-500 hover:text-red-700">
            View Facility Details
          </Link>
          <Link href="/facilities" className="rounded-lg bg-red-700 px-5 py-3 text-center font-semibold text-white transition hover:bg-red-800">
            Back to Facilities
          </Link>
        </div>
      </div>
    </main>
  );
}
