"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

type LoginErrors = {
  email?: string;
  password?: string;
};

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<LoginErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);

  function validateForm() {
    const newErrors: LoginErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!password) {
      newErrors.password = "Password is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSuccessful(false);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 900));

    setIsSubmitting(false);
    setIsSuccessful(true);
  }

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

      <section className="flex min-h-[calc(100vh-77px)] items-center justify-center px-5 py-12">
        <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm lg:grid-cols-2">
          <div className="hidden bg-red-700 p-12 text-white lg:flex lg:flex-col lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-red-100">
                Student Affairs Department
              </p>

              <h1 className="mt-6 text-4xl font-bold leading-tight">
                Welcome back to your STAD portal
              </h1>

              <p className="mt-5 leading-7 text-red-100">
                Access your event registrations, facility bookings, QR codes
                and digital certificates in one place.
              </p>
            </div>

            <p className="mt-16 text-sm text-red-100">
              City University Malaysia
            </p>
          </div>

          <div className="p-6 sm:p-10 lg:p-12">
            <div className="mb-8">
              <p className="font-semibold text-red-700">Account Login</p>

              <h2 className="mt-2 text-3xl font-bold text-gray-900">
                Welcome back
              </h2>

              <p className="mt-3 text-gray-600">
                Enter your account details to continue.
              </p>
            </div>

            {isSuccessful && (
              <div
                role="status"
                className="mb-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800"
              >
                Sample login successful. Real authentication will be connected
                later.
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-gray-800"
                >
                  Email address <span className="text-red-700">*</span>
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);

                    if (errors.email) {
                      setErrors((current) => ({
                        ...current,
                        email: undefined,
                      }));
                    }
                  }}
                  placeholder="student@example.com"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  className={`w-full rounded-xl border px-4 py-3 text-gray-900 outline-none transition ${
                    errors.email
                      ? "border-red-500 focus:ring-2 focus:ring-red-100"
                      : "border-gray-300 focus:border-red-600 focus:ring-2 focus:ring-red-100"
                  }`}
                />

                {errors.email && (
                  <p
                    id="email-error"
                    className="mt-2 text-sm text-red-600"
                  >
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-gray-800"
                  >
                    Password <span className="text-red-700">*</span>
                  </label>

                  <Link
                    href="/forgot-password"
                    className="text-sm font-medium text-red-700 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>

                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    value={password}
                    onChange={(event) => {
                      setPassword(event.target.value);

                      if (errors.password) {
                        setErrors((current) => ({
                          ...current,
                          password: undefined,
                        }));
                      }
                    }}
                    placeholder="Enter your password"
                    aria-invalid={Boolean(errors.password)}
                    aria-describedby={
                      errors.password ? "password-error" : undefined
                    }
                    className={`w-full rounded-xl border px-4 py-3 pr-20 text-gray-900 outline-none transition ${
                      errors.password
                        ? "border-red-500 focus:ring-2 focus:ring-red-100"
                        : "border-gray-300 focus:border-red-600 focus:ring-2 focus:ring-red-100"
                    }`}
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
                  <p
                    id="password-error"
                    className="mt-2 text-sm text-red-600"
                  >
                    {errors.password}
                  </p>
                )}
              </div>

              <label className="flex cursor-pointer items-center gap-3 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(event) => setRememberMe(event.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 accent-red-700"
                />
                Remember me on this device
              </label>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-xl bg-red-700 px-5 py-3 font-semibold text-white transition hover:bg-red-800 disabled:cursor-not-allowed disabled:bg-red-400"
              >
                {isSubmitting ? "Logging in..." : "Log In"}
              </button>
            </form>

            <div className="mt-8 border-t border-gray-200 pt-6 text-center">
              <p className="text-sm text-gray-600">
                Do not have an account?{" "}
                <Link
                  href="/register"
                  className="font-semibold text-red-700 hover:underline"
                >
                  Create Account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}