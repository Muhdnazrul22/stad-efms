"use client";

import { FormEvent, useState } from "react";
import { useParams } from "next/navigation";
import { CommitteePageHeader } from "../../../components";
import { getAssignedEvent } from "../../../data";

type WalkInForm = {
  fullName: string;
  universityId: string;
  email: string;
  phone: string;
  faculty: string;
  programme: string;
  userCategory: string;
  consent: boolean;
};

type WalkInErrors = Partial<
  Record<keyof WalkInForm, string>
>;

const initialForm: WalkInForm = {
  fullName: "",
  universityId: "",
  email: "",
  phone: "",
  faculty: "",
  programme: "",
  userCategory: "",
  consent: false,
};

export default function CommitteeWalkInPage() {
  const params = useParams();
  const eventId = String(params.id ?? "");
  const event = getAssignedEvent(eventId);

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<WalkInErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reference, setReference] = useState("");

  function updateField<K extends keyof WalkInForm>(
    field: K,
    value: WalkInForm[K],
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    setErrors((current) => ({
      ...current,
      [field]: undefined,
    }));

    setReference("");
  }

  function validateForm() {
    const newErrors: WalkInErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^[0-9+\-\s()]{8,20}$/;

    if (!form.fullName.trim()) {
      newErrors.fullName = "Full name is required.";
    }

    if (!form.universityId.trim()) {
      newErrors.universityId =
        "Student or staff ID is required.";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!emailPattern.test(form.email)) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!phonePattern.test(form.phone)) {
      newErrors.phone = "Enter a valid phone number.";
    }

    if (!form.faculty.trim()) {
      newErrors.faculty =
        "Faculty or department is required.";
    }

    if (!form.userCategory) {
      newErrors.userCategory =
        "Select Student or Staff.";
    }

    if (!form.consent) {
      newErrors.consent =
        "Participant consent must be confirmed.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(
    submitEvent: FormEvent<HTMLFormElement>,
  ) {
    submitEvent.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 800));

    setReference(
      `WALKIN-${eventId}-${Date.now()
        .toString()
        .slice(-6)}`,
    );

    setIsSubmitting(false);
  }

  const inputClass =
    "w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-red-600 focus:ring-2 focus:ring-red-100";

  if (!event) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center shadow-sm">
        <h1 className="text-3xl font-bold text-gray-900">
          Event Not Found
        </h1>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <CommitteePageHeader
        eyebrow="Walk-in Registration"
        title="Register a Walk-in Participant"
        description={`Create a sample walk-in registration for ${event.title}.`}
      />

      {reference && (
        <div
          role="status"
          className="rounded-xl border border-green-200 bg-green-50 p-5 text-green-800"
        >
          <p className="font-semibold">
            Walk-in registration completed
          </p>

          <p className="mt-2 text-sm">
            Sample reference:{" "}
            <strong>{reference}</strong>
          </p>

          <p className="mt-2 text-sm">
            No database record has been created yet.
          </p>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        noValidate
        className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
      >
        <div className="grid gap-6 md:grid-cols-2">
          <div className="md:col-span-2">
            <label
              htmlFor="walkInFullName"
              className="mb-2 block text-sm font-semibold text-gray-800"
            >
              Full name *
            </label>

            <input
              id="walkInFullName"
              value={form.fullName}
              onChange={(changeEvent) =>
                updateField(
                  "fullName",
                  changeEvent.target.value,
                )
              }
              className={inputClass}
            />

            {errors.fullName && (
              <p className="mt-2 text-sm text-red-600">
                {errors.fullName}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="walkInId"
              className="mb-2 block text-sm font-semibold text-gray-800"
            >
              Student or staff ID *
            </label>

            <input
              id="walkInId"
              value={form.universityId}
              onChange={(changeEvent) =>
                updateField(
                  "universityId",
                  changeEvent.target.value,
                )
              }
              className={inputClass}
            />

            {errors.universityId && (
              <p className="mt-2 text-sm text-red-600">
                {errors.universityId}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="walkInCategory"
              className="mb-2 block text-sm font-semibold text-gray-800"
            >
              User category *
            </label>

            <select
              id="walkInCategory"
              value={form.userCategory}
              onChange={(changeEvent) =>
                updateField(
                  "userCategory",
                  changeEvent.target.value,
                )
              }
              className={inputClass}
            >
              <option value="">Select category</option>
              <option value="Student">Student</option>
              <option value="Staff">Staff</option>
            </select>

            {errors.userCategory && (
              <p className="mt-2 text-sm text-red-600">
                {errors.userCategory}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="walkInEmail"
              className="mb-2 block text-sm font-semibold text-gray-800"
            >
              Email *
            </label>

            <input
              id="walkInEmail"
              type="email"
              value={form.email}
              onChange={(changeEvent) =>
                updateField("email", changeEvent.target.value)
              }
              className={inputClass}
            />

            {errors.email && (
              <p className="mt-2 text-sm text-red-600">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="walkInPhone"
              className="mb-2 block text-sm font-semibold text-gray-800"
            >
              Phone number *
            </label>

            <input
              id="walkInPhone"
              type="tel"
              value={form.phone}
              onChange={(changeEvent) =>
                updateField("phone", changeEvent.target.value)
              }
              className={inputClass}
            />

            {errors.phone && (
              <p className="mt-2 text-sm text-red-600">
                {errors.phone}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="walkInFaculty"
              className="mb-2 block text-sm font-semibold text-gray-800"
            >
              Faculty or department *
            </label>

            <input
              id="walkInFaculty"
              value={form.faculty}
              onChange={(changeEvent) =>
                updateField(
                  "faculty",
                  changeEvent.target.value,
                )
              }
              className={inputClass}
            />

            {errors.faculty && (
              <p className="mt-2 text-sm text-red-600">
                {errors.faculty}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="walkInProgramme"
              className="mb-2 block text-sm font-semibold text-gray-800"
            >
              Programme
            </label>

            <input
              id="walkInProgramme"
              value={form.programme}
              onChange={(changeEvent) =>
                updateField(
                  "programme",
                  changeEvent.target.value,
                )
              }
              className={inputClass}
            />
          </div>
        </div>

        <div className="mt-7">
          <label className="flex items-start gap-3">
            <input
              type="checkbox"
              checked={form.consent}
              onChange={(changeEvent) =>
                updateField(
                  "consent",
                  changeEvent.target.checked,
                )
              }
              className="mt-1 h-4 w-4 accent-red-700"
            />

            <span className="text-sm leading-6 text-gray-700">
              I confirm that the participant has provided consent
              for this walk-in registration.
            </span>
          </label>

          {errors.consent && (
            <p className="mt-2 text-sm text-red-600">
              {errors.consent}
            </p>
          )}
        </div>

        <div className="mt-8 flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-xl bg-red-700 px-6 py-3 font-semibold text-white hover:bg-red-800 disabled:cursor-not-allowed disabled:bg-red-400"
          >
            {isSubmitting
              ? "Registering participant..."
              : "Register Walk-in"}
          </button>
        </div>
      </form>
    </div>
  );
}