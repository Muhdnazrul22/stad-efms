import Link from "next/link";

type EventDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

const sampleEvents = [
  {
    id: "1",
    title: "New Student Orientation 2026",
    category: "Orientation",
    organiser: "Student Affairs Department",
    date: "20 July 2026",
    startTime: "9:00 AM",
    endTime: "5:00 PM",
    venue: "Multipurpose Hall, Cyberjaya Campus",
    deadline: "18 July 2026",
    capacity: 200,
    availableSeats: 45,
    status: "Registration Open",
    description:
      "A full-day orientation programme for new students to learn about university services, student life and campus facilities.",
    schedule: [
      "9:00 AM — Registration",
      "10:00 AM — University briefing",
      "12:30 PM — Lunch break",
      "2:00 PM — Campus tour",
      "4:30 PM — Closing session",
    ],
    itemsToBring: [
      "Student identification card",
      "Notebook and pen",
      "Water bottle",
    ],
    contact: "STAD Office — cityu_studentaffairs@city.edu.my",
  },
  {
    id: "2",
    title: "Student Leadership Workshop",
    category: "Student Development",
    organiser: "Student Affairs Department",
    date: "25 July 2026",
    startTime: "10:00 AM",
    endTime: "4:00 PM",
    venue: "Seminar Room 1",
    deadline: "22 July 2026",
    capacity: 80,
    availableSeats: 20,
    status: "Registration Open",
    description:
      "A practical workshop designed to strengthen communication, teamwork and student leadership skills.",
    schedule: [
      "10:00 AM — Opening",
      "10:30 AM — Leadership session",
      "12:30 PM — Lunch",
      "2:00 PM — Group activities",
      "3:45 PM — Closing",
    ],
    itemsToBring: ["Notebook", "Pen", "Student identification card"],
    contact: "STAD Office — stad@city.edu.my",
  },
];

export default async function EventDetailsPage({
  params,
}: EventDetailsPageProps) {
  const { id } = await params;
  const event = sampleEvents.find((item) => item.id === id);

  if (!event) {
    return (
      <main className="min-h-screen bg-gray-50 px-6 py-20">
        <div className="mx-auto max-w-3xl rounded-2xl bg-white p-10 text-center shadow-sm">
          <h1 className="text-3xl font-bold text-gray-900">Event Not Found</h1>

          <p className="mt-4 text-gray-600">
            The event you are looking for does not exist.
          </p>

          <Link
            href="/events"
            className="mt-8 inline-block rounded-lg bg-red-700 px-6 py-3 font-semibold text-white hover:bg-red-800"
          >
            Back to Events
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="bg-red-700 px-6 py-16 text-white">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-red-100">
            {event.category}
          </p>

          <h1 className="mt-3 text-4xl font-bold md:text-5xl">
            {event.title}
          </h1>

          <p className="mt-4 text-red-100">{event.organiser}</p>
        </div>
      </section>

      <section className="px-6 py-12">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <article className="rounded-2xl bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900">
                Event Description
              </h2>

              <p className="mt-4 leading-7 text-gray-600">
                {event.description}
              </p>
            </article>

            <article className="rounded-2xl bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900">
                Programme Schedule
              </h2>

              <div className="mt-5 space-y-3">
                {event.schedule.map((item) => (
                  <p
                    key={item}
                    className="rounded-lg border border-gray-200 px-4 py-3 text-gray-700"
                  >
                    {item}
                  </p>
                ))}
              </div>
            </article>

            <article className="rounded-2xl bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900">
                Things to Bring
              </h2>

              <ul className="mt-5 list-disc space-y-2 pl-5 text-gray-600">
                {event.itemsToBring.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>

          <aside className="h-fit rounded-2xl bg-white p-8 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900">Event Details</h2>

            <div className="mt-6 space-y-5 text-sm">
              <div>
                <p className="font-semibold text-gray-900">Date</p>
                <p className="mt-1 text-gray-600">{event.date}</p>
              </div>

              <div>
                <p className="font-semibold text-gray-900">Time</p>
                <p className="mt-1 text-gray-600">
                  {event.startTime} – {event.endTime}
                </p>
              </div>

              <div>
                <p className="font-semibold text-gray-900">Venue</p>
                <p className="mt-1 text-gray-600">{event.venue}</p>
              </div>

              <div>
                <p className="font-semibold text-gray-900">
                  Registration Deadline
                </p>
                <p className="mt-1 text-gray-600">{event.deadline}</p>
              </div>

              <div>
                <p className="font-semibold text-gray-900">Capacity</p>
                <p className="mt-1 text-gray-600">
                  {event.capacity} participants
                </p>
              </div>

              <div>
                <p className="font-semibold text-gray-900">Available Seats</p>
                <p className="mt-1 text-gray-600">
                  {event.availableSeats} remaining
                </p>
              </div>

              <div>
                <p className="font-semibold text-gray-900">Status</p>
                <span className="mt-2 inline-block rounded-full bg-green-100 px-3 py-1 font-medium text-green-700">
                  {event.status}
                </span>
              </div>

              <div>
                <p className="font-semibold text-gray-900">Contact</p>
                <p className="mt-1 text-gray-600">{event.contact}</p>
              </div>
            </div>

            <div className="mt-8 space-y-3">
              <Link
                href={`/events/${event.id}/register`}
                className="block rounded-lg bg-red-700 px-5 py-3 text-center font-semibold text-white hover:bg-red-800"
              >
                Register Now
              </Link>

              <Link
                href="/events"
                className="block rounded-lg border border-gray-300 px-5 py-3 text-center font-semibold text-gray-700 hover:bg-gray-50"
              >
                Back to Events
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}