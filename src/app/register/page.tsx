"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

type RegisterForm = {
  fullName: string;
  universityId: string;
  email: string;
  phone: string;
  userCategory: string;
  faculty: string;
  programme: string;
  studentStatus: string;
  nationality: string;
  password: string;
  confirmPassword: string;
  acceptedTerms: boolean;
};

type RegisterErrors = Partial<Record<keyof RegisterForm, string>>;

const initialForm: RegisterForm = {
  fullName: "",
  universityId: "",
  email: "",
  phone: "",
  userCategory: "",
  faculty: "",
  programme: "",
  studentStatus: "",
  nationality: "",
  password: "",
  confirmPassword: "",
  acceptedTerms: false,
};

export default function RegisterPage() {
  const [form, setForm] = useState<RegisterForm>(initialForm);
  const [errors, setErrors] = useState<RegisterErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);

  function updateField<K extends keyof RegisterForm>(
    field: K,
    value: RegisterForm[K],
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((current) => ({
        ...current,
        [field]: undefined,
      }));
    }
  }

  function validateForm() {
    const newErrors: RegisterErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^[0-9+\-\s()]{8,20}$/;

    if (!form.fullName.trim()) {
      newErrors.fullName = "Full name is required.";
    }

    if (!form.universityId.trim()) {
      newErrors.universityId = "Student or staff ID is required.";
    }

    if (!form.email.trim()) {
      newErrors.email = "University email is required.";
    } else if (!emailPattern.test(form.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!phonePattern.test(form.phone)) {
      newErrors.phone = "Please enter a valid phone number.";
    }

    if (!form.userCategory) {
      newErrors.userCategory = "Please select Student or Staff.";
    }

    if (!form.faculty.trim()) {
      newErrors.faculty = "Faculty or department is required.";
    }

    if (form.userCategory === "Student" && !form.programme.trim()) {
      newErrors.programme = "Programme is required for students.";
    }

    if (!form.studentStatus) {
      newErrors.studentStatus =
        "Please select local or international status.";
    }

    if (!form.nationality.trim()) {
      newErrors.nationality = "Nationality is required.";
    }

    if (!form.password) {
      newErrors.password = "Password is required.";
    } else if (form.password.length < 8) {
      newErrors.password = "Password must contain at least 8 characters.";
    }

    if (!form.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password.";
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    if (!form.acceptedTerms) {
      newErrors.acceptedTerms =
        "You must accept the terms and conditions.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSuccessful(false);

    if (!validateForm()) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setIsSuccessful(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const inputClass =
    "w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-red-600 focus:ring-2 focus:ring-red-100";

  const errorInputClass =
    "w-full rounded-xl border border-red-500 px-4 py-3 text-gray-900 outline-none transition focus:ring-2 focus:ring-red-100";

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="leading-tight">
            <p className="text-xl font-bold text-red-700">STAD EFMS</p>
            <p className="text-xs text-gray-500">City University Malaysia</p>
          </Link>

          <Link
            href="/"
            className="text-sm font-medium text-gray-600 hover:text-red-700"
          >
            Back to Home
          </Link>
        </div>
      </header>

      <section className="px-5 py-12">
        <div className="mx-auto max-w-4xl rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-10">
          <div className="mb-9 border-b border-gray-200 pb-7">
            <p className="font-semibold text-red-700">Create Account</p>

            <h1 className="mt-2 text-3xl font-bold text-gray-900">
              Join the STAAD portal
            </h1>

            <p className="mt-3 max-w-2xl text-gray-600">
              Create an optional account to manage your registrations,
              bookings, QR codes and certificates.
            </p>
          </div>

          {isSuccessful && (
            <div
              role="status"
              className="mb-8 rounded-xl border border-green-200 bg-green-50 p-5 text-green-800"
            >
              <p className="font-semibold">
                Sample registration completed successfully.
              </p>

              <p className="mt-1 text-sm">
                No real account has been created yet. Supabase authentication
                will be connected later.
              </p>

              <Link
                href="/login"
                className="mt-4 inline-block font-semibold text-green-900 underline"
              >
                Go to Login
              </Link>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="md:col-span-2">
                <label
                  htmlFor="fullName"
                  className="mb-2 block text-sm font-semibold text-gray-800"
                >
                  Full name <span className="text-red-700">*</span>
                </label>

                <input
                  id="fullName"
                  type="text"
                  autoComplete="name"
                  value={form.fullName}
                  onChange={(event) =>
                    updateField("fullName", event.target.value)
                  }
                  className={errors.fullName ? errorInputClass : inputClass}
                  placeholder="Enter your full name"
                />

                {errors.fullName && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.fullName}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="universityId"
                  className="mb-2 block text-sm font-semibold text-gray-800"
                >
                  Student or staff ID <span className="text-red-700">*</span>
                </label>

                <input
                  id="universityId"
                  type="text"
                  value={form.universityId}
                  onChange={(event) =>
                    updateField("universityId", event.target.value)
                  }
                  className={
                    errors.universityId ? errorInputClass : inputClass
                  }
                  placeholder="Example: 202601010001"
                />

                {errors.universityId && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.universityId}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="userCategory"
                  className="mb-2 block text-sm font-semibold text-gray-800"
                >
                  User category <span className="text-red-700">*</span>
                </label>

                <select
                  id="userCategory"
                  value={form.userCategory}
                  onChange={(event) =>
                    updateField("userCategory", event.target.value)
                  }
                  className={
                    errors.userCategory ? errorInputClass : inputClass
                  }
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
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-gray-800"
                >
                  University email <span className="text-red-700">*</span>
                </label>

                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={(event) =>
                    updateField("email", event.target.value)
                  }
                  className={errors.email ? errorInputClass : inputClass}
                  placeholder="student@example.com"
                />

                {errors.email && (
                  <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block text-sm font-semibold text-gray-800"
                >
                  Phone number <span className="text-red-700">*</span>
                </label>

                <input
                  id="phone"
                  type="tel"
                  autoComplete="tel"
                  value={form.phone}
                  onChange={(event) =>
                    updateField("phone", event.target.value)
                  }
                  className={errors.phone ? errorInputClass : inputClass}
                  placeholder="+60 12-345 6789"
                />

                {errors.phone && (
                  <p className="mt-2 text-sm text-red-600">{errors.phone}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="faculty"
                  className="mb-2 block text-sm font-semibold text-gray-800"
                >
                  Faculty or department{" "}
                  <span className="text-red-700">*</span>
                </label>

                <input
                  id="faculty"
                  type="text"
                  value={form.faculty}
                  onChange={(event) =>
                    updateField("faculty", event.target.value)
                  }
                  className={errors.faculty ? errorInputClass : inputClass}
                  placeholder="Enter faculty or department"
                />

                {errors.faculty && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.faculty}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="programme"
                  className="mb-2 block text-sm font-semibold text-gray-800"
                >
                  Programme
                  {form.userCategory === "Student" && (
                    <span className="text-red-700"> *</span>
                  )}
                </label>

                <input
                  id="programme"
                  type="text"
                  value={form.programme}
                  onChange={(event) =>
                    updateField("programme", event.target.value)
                  }
                  className={errors.programme ? errorInputClass : inputClass}
                  placeholder="Enter programme, if applicable"
                />

                {errors.programme && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.programme}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="studentStatus"
                  className="mb-2 block text-sm font-semibold text-gray-800"
                >
                  Local or international{" "}
                  <span className="text-red-700">*</span>
                </label>

                <select
                  id="studentStatus"
                  value={form.studentStatus}
                  onChange={(event) =>
                    updateField("studentStatus", event.target.value)
                  }
                  className={
                    errors.studentStatus ? errorInputClass : inputClass
                  }
                >
                  <option value="">Select status</option>
                  <option value="Local">Local</option>
                  <option value="International">International</option>
                </select>

                {errors.studentStatus && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.studentStatus}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="nationality"
                  className="mb-2 block text-sm font-semibold text-gray-800"
                >
                  Nationality <span className="text-red-700">*</span>
                </label>

                <input
                  id="nationality"
                  type="text"
                  value={form.nationality}
                  onChange={(event) =>
                    updateField("nationality", event.target.value)
                  }
                  className={
                    errors.nationality ? errorInputClass : inputClass
                  }
                  placeholder="Enter nationality"
                />

                {errors.nationality && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.nationality}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-semibold text-gray-800"
                >
                  Password <span className="text-red-700">*</span>
                </label>

                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    value={form.password}
                    onChange={(event) =>
                      updateField("password", event.target.value)
                    }
                    className={`pr-20 ${
                      errors.password ? errorInputClass : inputClass
                    }`}
                    placeholder="Minimum 8 characters"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((current) => !current)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md px-2 py-1 text-sm font-medium text-gray-600 hover:bg-gray-100"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>

                {errors.password && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.password}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-sm font-semibold text-gray-800"
                >
                  Confirm password <span className="text-red-700">*</span>
                </label>

                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    value={form.confirmPassword}
                    onChange={(event) =>
                      updateField("confirmPassword", event.target.value)
                    }
                    className={`pr-20 ${
                      errors.confirmPassword ? errorInputClass : inputClass
                    }`}
                    placeholder="Re-enter your password"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword((current) => !current)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md px-2 py-1 text-sm font-medium text-gray-600 hover:bg-gray-100"
                  >
                    {showConfirmPassword ? "Hide" : "Show"}
                  </button>
                </div>

                {errors.confirmPassword && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-7">
              <label className="flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  checked={form.acceptedTerms}
                  onChange={(event) =>
                    updateField("acceptedTerms", event.target.checked)
                  }
                  className="mt-1 h-4 w-4 rounded border-gray-300 accent-red-700"
                />

                <span className="text-sm leading-6 text-gray-700">
                  I confirm that the information provided is correct and I
                  accept the terms and conditions.
                </span>
              </label>

              {errors.acceptedTerms && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.acceptedTerms}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-8 w-full rounded-xl bg-red-700 px-6 py-3 font-semibold text-white transition hover:bg-red-800 disabled:cursor-not-allowed disabled:bg-red-400"
            >
              {isSubmitting ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <div className="mt-8 border-t border-gray-200 pt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-semibold text-red-700 hover:underline"
              >
                Log In
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}