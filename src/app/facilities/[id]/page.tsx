import Link from "next/link";
import { facilities } from "../data";

type FacilityDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

const availabilityClasses: Record<string, string> = {
  Available: "bg-emerald-100 text-emerald-700",
  Limited: "bg-amber-100 text-amber-700",
  Booked: "bg-gray-200 text-gray-700",
};

export default async function FacilityDetailsPage({ params }: FacilityDetailsPageProps) {
  const { id } = await params;
  const facility = facilities.find((item) => item.id === Number(id));

  if (!facility) {
    return (
      <main className="min-h-screen bg-gray-50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-red-700">Facility not found</p>
          <h1 className="mt-4 text-3xl font-bold text-gray-900">We could not find that facility</h1>
          <p className="mt-4 text-gray-600">
            The requested facility is not available in our fictional sample catalogue. Please return to the facilities list and choose another space.
          </p>
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
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <section className="bg-gradient-to-br from-red-700 via-red-600 to-gray-700 px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-red-100">{facility.type}</p>
          <h1 className="mt-3 text-3xl font-bold sm:text-4xl">{facility.name}</h1>
          <p className="mt-4 max-w-2xl text-base text-red-100 sm:text-lg">{facility.description}</p>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="space-y-6">
            <article className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900">Facility overview</h2>
                  <p className="mt-3 text-gray-600">{facility.description}</p>
                </div>
                <span className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${availabilityClasses[facility.availability]}`}>
                  {facility.availability}
                </span>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                  <p className="text-sm font-semibold text-gray-500">Campus</p>
                  <p className="mt-2 text-base font-medium text-gray-900">{facility.campus}</p>
                </div>
                <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                  <p className="text-sm font-semibold text-gray-500">Location</p>
                  <p className="mt-2 text-base font-medium text-gray-900">{facility.location}</p>
                </div>
                <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                  <p className="text-sm font-semibold text-gray-500">Capacity</p>
                  <p className="mt-2 text-base font-medium text-gray-900">{facility.capacity} people</p>
                </div>
                <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                  <p className="text-sm font-semibold text-gray-500">Opening hours</p>
                  <p className="mt-2 text-base font-medium text-gray-900">{facility.hours}</p>
                </div>
              </div>
            </article>

            <article className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-semibold text-gray-900">Equipment and amenities</h2>
              <div className="mt-5 grid gap-5 md:grid-cols-2">
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">Equipment</h3>
                  <ul className="mt-3 space-y-2 text-gray-600">
                    {facility.equipment.map((item) => (
                      <li key={item} className="rounded-lg bg-gray-50 px-3 py-2">{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">Amenities</h3>
                  <ul className="mt-3 space-y-2 text-gray-600">
                    {facility.amenities.map((item) => (
                      <li key={item} className="rounded-lg bg-gray-50 px-3 py-2">{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>

            <article className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-semibold text-gray-900">Suitable activities</h2>
              <ul className="mt-4 grid gap-3 md:grid-cols-2">
                {facility.activities.map((activity) => (
                  <li key={activity} className="rounded-lg border border-gray-200 px-4 py-3 text-gray-700">
                    {activity}
                  </li>
                ))}
              </ul>
            </article>
          </div>

          <aside className="space-y-6">
            <article className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex h-40 items-center justify-center rounded-xl bg-gradient-to-br from-red-700 via-red-600 to-gray-700 text-center text-white">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-red-100">Facility banner</p>
                  <p className="mt-2 text-lg font-semibold">{facility.name}</p>
                </div>
              </div>

              <div className="mt-6 space-y-4 text-sm text-gray-600">
                <div>
                  <p className="font-semibold text-gray-900">Facility type</p>
                  <p className="mt-1">{facility.type}</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Availability</p>
                  <p className="mt-1">{facility.availability}</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Opening hours</p>
                  <p className="mt-1">{facility.hours}</p>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3">
                <Link href={`/facilities/${facility.id}/book`} className="rounded-lg bg-red-700 px-5 py-3 text-center font-semibold text-white transition hover:bg-red-800">
                  Book Now
                </Link>
                <Link href="/facilities" className="rounded-lg border border-gray-300 px-5 py-3 text-center font-semibold text-gray-700 transition hover:border-red-500 hover:text-red-700">
                  Back to Facilities
                </Link>
              </div>
            </article>

            <article className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900">Rules and guidelines</h2>
              <div className="mt-4 space-y-3">
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">Facility rules</h3>
                  <ul className="mt-2 space-y-2 text-gray-600">
                    {facility.rules.map((rule) => (
                      <li key={rule} className="rounded-lg bg-gray-50 px-3 py-2">{rule}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">Booking guidelines</h3>
                  <ul className="mt-2 space-y-2 text-gray-600">
                    {facility.bookingGuidelines.map((guideline) => (
                      <li key={guideline} className="rounded-lg bg-gray-50 px-3 py-2">{guideline}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>

            <article className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900">Contact information</h2>
              <div className="mt-4 space-y-3 text-sm text-gray-600">
                <div>
                  <p className="font-semibold text-gray-900">Department</p>
                  <p className="mt-1">{facility.contact.department}</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Email</p>
                  <p className="mt-1">{facility.contact.email}</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Phone</p>
                  <p className="mt-1">{facility.contact.phone}</p>
                </div>
              </div>
            </article>
          </aside>
        </div>
      </section>
    </main>
  );
}
