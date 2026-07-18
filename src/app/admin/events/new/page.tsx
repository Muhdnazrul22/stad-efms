"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { AdminPageHeader } from "../../components";

type EventForm = {
  title: string;
  category: string;
  organiser: string;
  date: string;
  startTime: string;
  endTime: string;
  venue: string;
  capacity: string;
  registrationDeadline: string;
  description: string;
};

type EventErrors = Partial<Record<keyof EventForm, string>>;

const initialForm: EventForm = {
  title: "",
  category: "",
  organiser: "Student Affairs Department",
  date: "",
  startTime: "",
  endTime: "",
  venue: "",
  capacity: "",
  registrationDeadline: "",
  description: "",
};

export default function CreateEventPage() {
  const [form, setForm] = useState<EventForm>(initialForm);
  const [errors, setErrors] = useState<EventErrors>({});
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  function updateField(
    field: keyof EventForm,
    value: string,
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    setErrors((current) => ({
      ...current,
      [field]: undefined,
    }));

    setSaved(false);
  }

  function validateForm() {
    const newErrors: EventErrors = {};

    if (!form.title.trim()) {
      newErrors.title = "Event title is required.";
    }

    if (!form.category) {
      newErrors.category = "Category is required.";
    }

    if (!form.organiser.trim()) {
      newErrors.organiser = "Organiser is required.";
    }

    if (!form.date) {
      newErrors.date = "Event date is required.";
    }

    if (!form.startTime) {
      newErrors.startTime = "Start time is required.";
    }

    if (!form.endTime) {
      newErrors.endTime = "End time is required.";
    } else if (
      form.startTime &&
      form.endTime <= form.startTime
    ) {
      newErrors.endTime =
        "End time must be later than the start time.";
    }

    if (!form.venue.trim()) {
      newErrors.venue = "Venue is required.";
    }

    if (!form.capacity) {
      newErrors.capacity = "Capacity is required.";
    } else if (Number(form.capacity) < 1) {
      newErrors.capacity =
        "Capacity must be at least one participant.";
    }

    if (!form.registrationDeadline) {
      newErrors.registrationDeadline =
        "Registration deadline is required.";
    }

    if (!form.description.trim()) {
      newErrors.description = "Description is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();
    setSaved(false);

    if (!validateForm()) {
      return;
    }

    setIsSaving(true);

    await new Promise((resolve) => setTimeout(resolve, 900));

    setIsSaving(false);
    setSaved(true);
  }

  const inputClass =
    "w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-red-600 focus:ring-2 focus:ring-red-100";

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="Event Management"
        title="Create New Event"
        description="Prepare a new university event using sample frontend data."
        action={
          <Link
            href="/admin/events"
            className="inline-block rounded-xl border border-gray-300 px-5 py-3 font-semibold text-gray-700 hover:bg-gray-50"
          >
            Back to Events
          </Link>
        }
      />

      <form
        onSubmit={handleSubmit}
        noValidate
        className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
      >
        {saved && (
          <div className="mb-7 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-800">
            Sample event saved successfully. No database record has
            been created yet.
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2">
          <div className="md:col-span-2">
            <label
              htmlFor="title"
              className="mb-2 block text-sm font-semibold text-gray-800"
            >
              Event title *
            </label>

            <input
              id="title"
              value={form.title}
              onChange={(event) =>
                updateField("title", event.target.value)
              }
              className={inputClass}
              placeholder="Enter event title"
            />

            {errors.title && (
              <p className="mt-2 text-sm text-red-600">
                {errors.title}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="category"
              className="mb-2 block text-sm font-semibold text-gray-800"
            >
              Category *
            </label>

            <select
              id="category"
              value={form.category}
              onChange={(event) =>
                updateField("category", event.target.value)
              }
              className={inputClass}
            >
              <option value="">Select category</option>
              <option value="Orientation">Orientation</option>
              <option value="Student Development">
                Student Development
              </option>
              <option value="Sports">Sports</option>
              <option value="Clubs and Societies">
                Clubs and Societies
              </option>
              <option value="Arts and Culture">
                Arts and Culture
              </option>
              <option value="Career">Career</option>
              <option value="Community Service">
                Community Service
              </option>
            </select>

            {errors.category && (
              <p className="mt-2 text-sm text-red-600">
                {errors.category}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="organiser"
              className="mb-2 block text-sm font-semibold text-gray-800"
            >
              Organiser *
            </label>

            <input
              id="organiser"
              value={form.organiser}
              onChange={(event) =>
                updateField("organiser", event.target.value)
              }
              className={inputClass}
            />

            {errors.organiser && (
              <p className="mt-2 text-sm text-red-600">
                {errors.organiser}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="date"
              className="mb-2 block text-sm font-semibold text-gray-800"
            >
              Event date *
            </label>

            <input
              id="date"
              type="date"
              value={form.date}
              onChange={(event) =>
                updateField("date", event.target.value)
              }
              className={inputClass}
            />

            {errors.date && (
              <p className="mt-2 text-sm text-red-600">
                {errors.date}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="registrationDeadline"
              className="mb-2 block text-sm font-semibold text-gray-800"
            >
              Registration deadline *
            </label>

            <input
              id="registrationDeadline"
              type="date"
              value={form.registrationDeadline}
              onChange={(event) =>
                updateField(
                  "registrationDeadline",
                  event.target.value,
                )
              }
              className={inputClass}
            />

            {errors.registrationDeadline && (
              <p className="mt-2 text-sm text-red-600">
                {errors.registrationDeadline}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="startTime"
              className="mb-2 block text-sm font-semibold text-gray-800"
            >
              Start time *
            </label>

            <input
              id="startTime"
              type="time"
              value={form.startTime}
              onChange={(event) =>
                updateField("startTime", event.target.value)
              }
              className={inputClass}
            />

            {errors.startTime && (
              <p className="mt-2 text-sm text-red-600">
                {errors.startTime}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="endTime"
              className="mb-2 block text-sm font-semibold text-gray-800"
            >
              End time *
            </label>

            <input
              id="endTime"
              type="time"
              value={form.endTime}
              onChange={(event) =>
                updateField("endTime", event.target.value)
              }
              className={inputClass}
            />

            {errors.endTime && (
              <p className="mt-2 text-sm text-red-600">
                {errors.endTime}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="venue"
              className="mb-2 block text-sm font-semibold text-gray-800"
            >
              Venue *
            </label>

            <input
              id="venue"
              value={form.venue}
              onChange={(event) =>
                updateField("venue", event.target.value)
              }
              className={inputClass}
              placeholder="Enter venue"
            />

            {errors.venue && (
              <p className="mt-2 text-sm text-red-600">
                {errors.venue}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="capacity"
              className="mb-2 block text-sm font-semibold text-gray-800"
            >
              Capacity *
            </label>

            <input
              id="capacity"
              type="number"
              min="1"
              value={form.capacity}
              onChange={(event) =>
                updateField("capacity", event.target.value)
              }
              className={inputClass}
              placeholder="Example: 200"
            />

            {errors.capacity && (
              <p className="mt-2 text-sm text-red-600">
                {errors.capacity}
              </p>
            )}
          </div>

          <div className="md:col-span-2">
            <label
              htmlFor="description"
              className="mb-2 block text-sm font-semibold text-gray-800"
            >
              Event description *
            </label>

            <textarea
              id="description"
              rows={6}
              value={form.description}
              onChange={(event) =>
                updateField("description", event.target.value)
              }
              className={inputClass}
              placeholder="Describe the event..."
            />

            {errors.description && (
              <p className="mt-2 text-sm text-red-600">
                {errors.description}
              </p>
            )}
          </div>
        </div>

        <div className="mt-8 flex flex-wrap justify-end gap-3">
          <button
            type="button"
            className="rounded-xl border border-gray-300 px-6 py-3 font-semibold text-gray-700 hover:bg-gray-50"
          >
            Save Draft Demo
          </button>

          <button
            type="submit"
            disabled={isSaving}
            className="rounded-xl bg-red-700 px-6 py-3 font-semibold text-white hover:bg-red-800 disabled:cursor-not-allowed disabled:bg-red-400"
          >
            {isSaving ? "Saving event..." : "Create Event"}
          </button>
        </div>
      </form>
    </div>
  );
}