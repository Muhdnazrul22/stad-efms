"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ChangeEvent, FormEvent, useMemo, useState } from "react";

type FormValues = {
  fullName: string;
  studentId: string;
  email: string;
  phone: string;
  faculty: string;
  programme: string;
  userType: string;
  residence: string;
  nationality: string;
  transportation: string;
  dietary: string;
  accessibility: string;
  emergencyName: string;
  emergencyPhone: string;
  consent: boolean;
};

type ValidationErrors = Partial<Record<keyof FormValues, string>>;

type EventSummary = {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  availableSeats: number;
  deadline: string;
  organiser: string;
};

const sampleEvents: EventSummary[] = [
  {
    id: "1",
    title: "New Student Orientation 2026",
    date: "20 July 2026",
    time: "9:00 AM – 5:00 PM",
    venue: "Multipurpose Hall, Cyberjaya Campus",
    availableSeats: 45,
    deadline: "18 July 2026",
    organiser: "Student Affairs Department",
  },
  {
    id: "2",
    title: "Student Leadership Workshop",
    date: "25 July 2026",
    time: "10:00 AM – 4:00 PM",
    venue: "Seminar Room 1",
    availableSeats: 20,
    deadline: "22 July 2026",
    organiser: "Student Affairs Department",
  },
];

const initialValues: FormValues = {
  fullName: "",
  studentId: "",
  email: "",
  phone: "",
  faculty: "",
  programme: "",
  userType: "",
  residence: "",
  nationality: "",
  transportation: "",
  dietary: "",
  accessibility: "",
  emergencyName: "",
  emergencyPhone: "",
  consent: false,
};

function validateField(name: keyof FormValues, value: string | boolean): string {
  if (typeof value === "boolean") {
    return value ? "" : "Please confirm your consent to continue.";
  }

  const trimmed = value.trim();

  if (!trimmed) {
    return "This field is required.";
  }

  if (name === "email") {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(trimmed) ? "" : "Please enter a valid email address.";
  }

  if (name === "phone" || name === "emergencyPhone") {
    const phonePattern = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{6,15}$/;
    return phonePattern.test(trimmed) ? "" : "Please enter a valid phone number.";
  }

  return "";
}

export default function EventRegistrationPage() {
  const params = useParams();
  const routeId = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const event = useMemo(() => {
    return sampleEvents.find((item) => item.id === routeId) ?? sampleEvents[0];
  }, [routeId]);

  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [autofillMessage, setAutofillMessage] = useState("");

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, type, value, checked } = event.target as HTMLInputElement;
    const nextValue = type === "checkbox" ? checked : value;

    setValues((previous) => ({
      ...previous,
      [name]: nextValue,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: undefined,
    }));
  };

  const validateForm = () => {
    const nextErrors: ValidationErrors = {};
    const fieldEntries = Object.entries(values) as [keyof FormValues, string | boolean][];

    fieldEntries.forEach(([name, value]) => {
      if (name === "consent") {
        const errorMessage = validateField(name, value);
        if (errorMessage) {
          nextErrors[name] = errorMessage;
        }
        return;
      }

      const errorMessage = validateField(name, value as string);
      if (errorMessage) {
        nextErrors[name] = errorMessage;
      }
    });

    return nextErrors;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateForm();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setSubmitted(false);
      return;
    }

    setSubmitting(true);
    setSubmitted(false);

    await new Promise((resolve) => window.setTimeout(resolve, 1200));

    setSubmitting(false);
    setSubmitted(true);
  };

  const handleAutofill = () => {
    setAutofillMessage(
      "This button is a UI-only demo. Public registration does not require a login."
    );
  };

  const renderField = (
    label: string,
    name: keyof FormValues,
    type: "text" | "email" | "tel" | "select" | "checkbox" = "text",
    placeholder?: string,
    options?: string[]
  ) => {
    const inputClassName =
      "w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-700 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100";
    const error = errors[name];

    if (type === "checkbox") {
      return (
        <div className="mt-6 rounded-xl border border-gray-200 bg-gray-50 p-4">
          <label className="flex items-start gap-3 text-sm font-medium text-gray-700">
            <input
              type="checkbox"
              name="consent"
              checked={Boolean(values.consent)}
              onChange={handleChange}
              className="mt-1 h-4 w-4 rounded border-gray-300 text-red-700 focus:ring-red-500"
            />
            <span>
              {label} <span className="text-red-600">*</span>
            </span>
          </label>
          {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}
        </div>
      );
    }

    return (
      <label className="text-sm font-medium text-gray-700">
        <span className="mb-2 flex items-center gap-1">
          {label}
          <span className="text-red-600">*</span>
        </span>
        {type === "select" ? (
          <select
            name={name}
            value={String(values[name] ?? "")}
            onChange={handleChange}
            className={inputClassName}
          >
            <option value="">Select an option</option>
            {options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={type}
            name={name}
            value={String(values[name] ?? "")}
            onChange={handleChange}
            placeholder={placeholder}
            className={inputClassName}
          />
        )}
        {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}
      </label>
    );
  };

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <section className="bg-red-700 px-4 py-14 text-white sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-red-100">
              Public registration
            </p>
            <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
              Register for {event.title}
            </h1>
            <p className="mt-3 max-w-2xl text-base text-red-100">
              Complete the form below to reserve your place for this fictional campus event.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href={`/events/${event.id}`}
              className="rounded-lg border border-white/40 bg-white/10 px-4 py-2.5 font-semibold text-white transition hover:bg-white/20"
            >
              Back to Event
            </Link>
            <button
              type="button"
              onClick={handleAutofill}
              className="rounded-lg bg-white px-4 py-2.5 font-semibold text-red-700 transition hover:bg-gray-100"
            >
              Log In to Autofill
            </button>
          </div>
        </div>
      </section>

      <section className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <aside className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-xl font-semibold text-gray-900">Event summary</h2>
            <div className="mt-5 space-y-3 text-sm text-gray-600">
              <div>
                <p className="font-semibold text-gray-900">Event title</p>
                <p className="mt-1">{event.title}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Date</p>
                <p className="mt-1">{event.date}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Time</p>
                <p className="mt-1">{event.time}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Venue</p>
                <p className="mt-1">{event.venue}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Available seats</p>
                <p className="mt-1">{event.availableSeats} remaining</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Registration deadline</p>
                <p className="mt-1">{event.deadline}</p>
              </div>
            </div>

            <div className="mt-6 rounded-xl bg-gray-50 p-4 text-sm text-gray-600">
              <p className="font-semibold text-gray-900">Hosted by</p>
              <p className="mt-1">{event.organiser}</p>
            </div>
          </aside>

          <form
            onSubmit={handleSubmit}
            noValidate
            className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
          >
            {submitted ? (
              <div className="mb-6 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700">
                Registration received. Your fictional booking request has been recorded successfully.
              </div>
            ) : null}

            {autofillMessage ? (
              <div className="mb-6 rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-600">
                {autofillMessage}
              </div>
            ) : null}

            <div className="grid gap-5 md:grid-cols-2">
              {renderField("Full name", "fullName", "text", "Enter full name")}
              {renderField("Student or staff ID", "studentId", "text", "e.g. STU12345")}
              {renderField("Email", "email", "email", "name@city.edu.my")}
              {renderField("Phone number", "phone", "tel", "e.g. +60123456789")}
              {renderField("Faculty or department", "faculty", "text", "Faculty of Engineering")}
              {renderField("Programme", "programme", "text", "Computer Science")}
              {renderField("User type", "userType", "select", undefined, [
                "Student",
                "Staff",
                "Visitor",
              ])}
              {renderField("Local or international", "residence", "select", undefined, [
                "Local",
                "International",
              ])}
              {renderField("Nationality", "nationality", "text", "Malaysia")}
              {renderField("Transportation requirement", "transportation", "text", "No transport needed")}
              {renderField("Dietary requirement", "dietary", "text", "Vegetarian")}
              {renderField("Accessibility requirement", "accessibility", "text", "None")}
              {renderField("Emergency contact name", "emergencyName", "text", "Enter contact name")}
              {renderField("Emergency contact phone number", "emergencyPhone", "tel", "e.g. +60123456790")}
            </div>

            {renderField(
              "I agree to the fictional registration terms and consent to receive event updates.",
              "consent",
              "checkbox"
            )}

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-gray-600">Fields marked with * are required.</p>
              <button
                type="submit"
                disabled={submitting}
                className="rounded-lg bg-red-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-800 disabled:cursor-not-allowed disabled:bg-red-400"
              >
                {submitting ? "Submitting..." : "Submit Registration"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
