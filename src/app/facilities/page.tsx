"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { facilities } from "./data";

const facilityTypes = ["All", ...Array.from(new Set(facilities.map((item) => item.type)))];
const campuses = ["All", ...Array.from(new Set(facilities.map((item) => item.campus)))];
const capacities = ["All", "Under 50", "50-100", "Over 100"];
const availabilities = ["All", "Available", "Limited", "Booked"];

export default function FacilitiesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedCampus, setSelectedCampus] = useState("All");
  const [selectedCapacity, setSelectedCapacity] = useState("All");
  const [selectedAvailability, setSelectedAvailability] = useState("All");

  const filteredFacilities = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    return facilities.filter((facility) => {
      const matchesSearch =
        term.length === 0 ||
        facility.name.toLowerCase().includes(term) ||
        facility.type.toLowerCase().includes(term) ||
        facility.location.toLowerCase().includes(term) ||
        facility.equipment.some((item) => item.toLowerCase().includes(term));

      const matchesType = selectedType === "All" || facility.type === selectedType;
      const matchesCampus = selectedCampus === "All" || facility.campus === selectedCampus;
      const matchesCapacity =
        selectedCapacity === "All" ||
        (selectedCapacity === "Under 50" && facility.capacity < 50) ||
        (selectedCapacity === "50-100" && facility.capacity >= 50 && facility.capacity <= 100) ||
        (selectedCapacity === "Over 100" && facility.capacity > 100);
      const matchesAvailability =
        selectedAvailability === "All" || facility.availability === selectedAvailability;

      return matchesSearch && matchesType && matchesCampus && matchesCapacity && matchesAvailability;
    });
  }, [searchTerm, selectedType, selectedCampus, selectedCapacity, selectedAvailability]);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedType("All");
    setSelectedCampus("All");
    setSelectedCapacity("All");
    setSelectedAvailability("All");
  };

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <div>
              <p className="text-lg font-bold text-red-700 sm:text-xl">STAD EFMS</p>
              <p className="text-xs text-gray-500">City University Malaysia</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            <Link href="/" className="text-gray-700 transition hover:text-red-700">
              Home
            </Link>
            <Link href="/events" className="text-gray-700 transition hover:text-red-700">
              Events
            </Link>
            <Link href="/facilities" className="font-semibold text-red-700">
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
            Campus facilities
          </p>
          <h1 className="max-w-3xl text-3xl font-bold sm:text-4xl lg:text-5xl">
            Explore campus spaces for events, learning and student activities
          </h1>
          <p className="mt-5 max-w-2xl text-base text-red-100 sm:text-lg">
            Search across fictional sample facilities, compare availability and plan your next campus booking.
          </p>
        </div>
      </section>

      <section className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
          <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr_auto]">
            <label className="text-sm font-medium text-gray-700">
              <span className="mb-2 block">Search</span>
              <input
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search facilities"
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
              />
            </label>

            <label className="text-sm font-medium text-gray-700">
              <span className="mb-2 block">Facility type</span>
              <select
                value={selectedType}
                onChange={(event) => setSelectedType(event.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
              >
                {facilityTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
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
              <span className="mb-2 block">Capacity</span>
              <select
                value={selectedCapacity}
                onChange={(event) => setSelectedCapacity(event.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
              >
                {capacities.map((capacity) => (
                  <option key={capacity} value={capacity}>
                    {capacity}
                  </option>
                ))}
              </select>
            </label>

            <label className="text-sm font-medium text-gray-700">
              <span className="mb-2 block">Availability</span>
              <select
                value={selectedAvailability}
                onChange={(event) => setSelectedAvailability(event.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
              >
                {availabilities.map((availability) => (
                  <option key={availability} value={availability}>
                    {availability}
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
            <h2 className="text-2xl font-semibold text-gray-900">Available facilities</h2>
            <p className="text-sm text-gray-600">
              Showing {filteredFacilities.length} of {facilities.length} facilities
            </p>
          </div>

          {filteredFacilities.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filteredFacilities.map((facility) => (
                <article
                  key={facility.id}
                  className="flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
                >
                  <div className="flex h-40 items-center justify-center bg-gradient-to-br from-red-700 via-red-600 to-gray-700 p-6 text-center text-white">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-red-100">
                        {facility.type}
                      </p>
                      <p className="mt-2 text-lg font-semibold">{facility.name}</p>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-700">
                        {facility.type}
                      </span>
                      <span className="text-sm font-medium text-gray-600">{facility.campus}</span>
                    </div>

                    <dl className="mt-4 space-y-2 text-sm text-gray-600">
                      <div className="flex items-start justify-between gap-3">
                        <dt className="font-medium text-gray-500">Location</dt>
                        <dd className="text-right">{facility.location}</dd>
                      </div>
                      <div className="flex items-start justify-between gap-3">
                        <dt className="font-medium text-gray-500">Capacity</dt>
                        <dd className="text-right">{facility.capacity} people</dd>
                      </div>
                      <div className="flex items-start justify-between gap-3">
                        <dt className="font-medium text-gray-500">Main equipment</dt>
                        <dd className="text-right">{facility.equipment.join(", ")}</dd>
                      </div>
                      <div className="flex items-start justify-between gap-3">
                        <dt className="font-medium text-gray-500">Opening hours</dt>
                        <dd className="text-right">{facility.hours}</dd>
                      </div>
                      <div className="flex items-start justify-between gap-3">
                        <dt className="font-medium text-gray-500">Availability</dt>
                        <dd className="text-right font-semibold text-gray-900">{facility.availability}</dd>
                      </div>
                    </dl>

                    <div className="mt-6 flex flex-col gap-2 sm:flex-row">
                      <Link
                        href={`/facilities/${facility.id}`}
                        className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 text-center text-sm font-semibold text-gray-700 transition hover:border-red-500 hover:text-red-700"
                      >
                        View Details
                      </Link>
                      <Link
                        href={`/facilities/${facility.id}/book`}
                        className="flex-1 rounded-lg bg-red-700 px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-red-800"
                      >
                        Book Now
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900">No facilities match your filters</h3>
              <p className="mt-2 text-gray-600">
                Try adjusting your search or filter selection to see more spaces.
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
