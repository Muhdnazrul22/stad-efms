"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type EventItem = {
  id: number;
  title: string;
  category: string;
  date: string;
  time: string;
  venue: string;
  organiser: string;
  seats: number;
  status: "Open" | "Limited" | "Full";
  campus: string;
  month: string;
};

const events: EventItem[] = [
  {
    id: 1,
    title: "Freshers Welcome Night",
    category: "Student Life",
    date: "24 Aug 2026",
    time: "7:00 PM",
    venue: "Main Auditorium",
    organiser: "Student Affairs and Alumni Department Office",
    seats: 180,
    status: "Open",
    campus: "Main Campus",
    month: "August",
  },
  {
    id: 2,
    title: "Career Connect Summit",
    category: "Career Development",
    date: "05 Sep 2026",
    time: "10:00 AM",
    venue: "Innovation Hub",
    organiser: "Career Services",
    seats: 75,
    status: "Limited",
    campus: "Cyberjaya Campus",
    month: "September",
  },
  {
    id: 3,
    title: "Campus Wellness Week",
    category: "Wellness",
    date: "16 Sep 2026",
    time: "9:30 AM",
    venue: "Sports Complex",
    organiser: "Health & Wellness Club",
    seats: 120,
    status: "Open",
    campus: "Main Campus",
    month: "September",
  },
  {
    id: 4,
    title: "Green Innovation Challenge",
    category: "Innovation",
    date: "02 Oct 2026",
    time: "1:30 PM",
    venue: "Maker Lab",
    organiser: "Faculty of Engineering",
    seats: 40,
    status: "Limited",
    campus: "Penang Campus",
    month: "October",
  },
  {
    id: 5,
    title: "Cultural Festival Night",
    category: "Arts & Culture",
    date: "14 Oct 2026",
    time: "6:30 PM",
    venue: "Student Plaza",
    organiser: "Cultural Society",
    seats: 200,
    status: "Open",
    campus: "Main Campus",
    month: "October",
  },
  {
    id: 6,
    title: "Leadership Bootcamp",
    category: "Leadership",
    date: "21 Nov 2026",
    time: "8:00 AM",
    venue: "Conference Room A",
    organiser: "Student Leadership Unit",
    seats: 0,
    status: "Full",
    campus: "Cyberjaya Campus",
    month: "November",
  },
];

const categories = ["All", ...Array.from(new Set(events.map((event) => event.category)))];
const months = ["All", ...Array.from(new Set(events.map((event) => event.month)))];
const campuses = ["All", ...Array.from(new Set(events.map((event) => event.campus)))];
const statuses = ["All", "Open", "Limited", "Full"];

export default function EventsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedMonth, setSelectedMonth] = useState("All");
  const [selectedCampus, setSelectedCampus] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");

  const filteredEvents = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    return events.filter((event) => {
      const matchesSearch =
        term.length === 0 ||
        event.title.toLowerCase().includes(term) ||
        event.category.toLowerCase().includes(term) ||
        event.venue.toLowerCase().includes(term) ||
        event.organiser.toLowerCase().includes(term);

      const matchesCategory =
        selectedCategory === "All" || event.category === selectedCategory;
      const matchesMonth = selectedMonth === "All" || event.month === selectedMonth;
      const matchesCampus = selectedCampus === "All" || event.campus === selectedCampus;
      const matchesStatus = selectedStatus === "All" || event.status === selectedStatus;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesMonth &&
        matchesCampus &&
        matchesStatus
      );
    });
  }, [searchTerm, selectedCategory, selectedMonth, selectedCampus, selectedStatus]);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All");
    setSelectedMonth("All");
    setSelectedCampus("All");
    setSelectedStatus("All");
  };

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <div>
              <p className="text-lg font-bold text-red-700 sm:text-xl">STAAD EFMS</p>
              <p className="text-xs text-gray-500">City University Malaysia</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            <Link href="/" className="text-gray-700 transition hover:text-red-700">
              Home
            </Link>
            <Link href="/events" className="font-semibold text-red-700">
              Events
            </Link>
            <Link href="/facilities" className="text-gray-700 transition hover:text-red-700">
              Facilities
            </Link>
            <Link href="/login" className="text-gray-700 transition hover:text-red-700">
              Login
            </Link>
            <Link
              href="/register"
              className="rounded-lg bg-red-700 px-4 py-2 font-medium text-white transition hover:bg-red-800"
            >
              Register
            </Link>
          </nav>
        </div>
      </header>

      <section className="bg-red-700 px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-red-100">
            Upcoming campus experiences
          </p>
          <h1 className="max-w-3xl text-3xl font-bold sm:text-4xl lg:text-5xl">
            Discover student events across the university
          </h1>
          <p className="mt-5 max-w-2xl text-base text-red-100 sm:text-lg">
            Explore curated activities for students, clubs, and professional growth.
            Filter by category, schedule, campus, or registration status to find the
            right event for you.
          </p>
        </div>
      </section>

      <section className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
          <div className="grid gap-4 lg:grid-cols-[2fr_1fr_1fr_1fr_1fr_auto]">
            <label className="text-sm font-medium text-gray-700">
              <span className="mb-2 block">Search</span>
              <input
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search events"
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
              />
            </label>

            <label className="text-sm font-medium text-gray-700">
              <span className="mb-2 block">Category</span>
              <select
                value={selectedCategory}
                onChange={(event) => setSelectedCategory(event.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </label>

            <label className="text-sm font-medium text-gray-700">
              <span className="mb-2 block">Month</span>
              <select
                value={selectedMonth}
                onChange={(event) => setSelectedMonth(event.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
              >
                {months.map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
            </label>

            <label className="text-sm font-medium text-gray-700">
              <span className="mb-2 block">Campus</span>
              <select
                value={selectedCampus}
                onChange={(event) => setSelectedCampus(event.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
              >
                {campuses.map((campus) => (
                  <option key={campus} value={campus}>
                    {campus}
                  </option>
                ))}
              </select>
            </label>

            <label className="text-sm font-medium text-gray-700">
              <span className="mb-2 block">Status</span>
              <select
                value={selectedStatus}
                onChange={(event) => setSelectedStatus(event.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </label>

            <button
              type="button"
              onClick={clearFilters}
              className="self-end rounded-lg border border-gray-300 px-3 py-2.5 text-sm font-medium text-gray-700 transition hover:border-red-500 hover:text-red-700"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </section>

      <section className="px-4 pb-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-2xl font-semibold text-gray-900">Featured events</h2>
            <p className="text-sm text-gray-600">
              Showing {filteredEvents.length} of {events.length} events
            </p>
          </div>

          {filteredEvents.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filteredEvents.map((event) => (
                <article
                  key={event.id}
                  className="flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
                >
                  <div className="flex h-40 items-center justify-center bg-gradient-to-br from-red-700 via-red-600 to-gray-700 p-6 text-center text-white">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-red-100">
                        {event.category}
                      </p>
                      <p className="mt-2 text-lg font-semibold">{event.title}</p>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-700">
                        {event.category}
                      </span>
                      <span className="text-sm font-medium text-gray-600">{event.campus}</span>
                    </div>

                    <h3 className="mt-4 text-xl font-semibold text-gray-900">{event.title}</h3>

                    <dl className="mt-4 space-y-2 text-sm text-gray-600">
                      <div className="flex items-start justify-between gap-3">
                        <dt className="font-medium text-gray-500">Date</dt>
                        <dd className="text-right">{event.date}</dd>
                      </div>
                      <div className="flex items-start justify-between gap-3">
                        <dt className="font-medium text-gray-500">Time</dt>
                        <dd className="text-right">{event.time}</dd>
                      </div>
                      <div className="flex items-start justify-between gap-3">
                        <dt className="font-medium text-gray-500">Venue</dt>
                        <dd className="text-right">{event.venue}</dd>
                      </div>
                      <div className="flex items-start justify-between gap-3">
                        <dt className="font-medium text-gray-500">Organiser</dt>
                        <dd className="text-right">{event.organiser}</dd>
                      </div>
                      <div className="flex items-start justify-between gap-3">
                        <dt className="font-medium text-gray-500">Seats</dt>
                        <dd className="text-right">{event.seats > 0 ? `${event.seats} left` : "Full"}</dd>
                      </div>
                      <div className="flex items-start justify-between gap-3">
                        <dt className="font-medium text-gray-500">Status</dt>
                        <dd className="text-right font-semibold text-gray-900">{event.status}</dd>
                      </div>
                    </dl>

                    <div className="mt-6 flex flex-col gap-2 sm:flex-row">
                      <button
                        type="button"
                        className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-red-500 hover:text-red-700"
                      >
                        View Details
                      </button>
                      <button
                        type="button"
                        className="flex-1 rounded-lg bg-red-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-800"
                      >
                        Register Now
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900">No events match your filters</h3>
              <p className="mt-2 text-gray-600">
                Try adjusting the search or category filters to find more events.
              </p>
              <button
                type="button"
                onClick={clearFilters}
                className="mt-5 rounded-lg bg-red-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-800"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
