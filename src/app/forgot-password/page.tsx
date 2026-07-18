"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);

  function validateEmail() {
    if (!email.trim()) {
      setError("Email is required.");
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return false;
    }

    setError("");
    return true;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSuccessful(false);

    if (!validateEmail()) {
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
        <div className="w-full max-w-lg rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-10">
          <div className="mb-8">
            <p className="font-semibold text-red-700">Password Recovery</p>

            <h1 className="mt-2 text-3xl font-bold text-gray-900">
              Forgot your password?
            </h1>

            <p className="mt-3 leading-7 text-gray-600">
              Enter your account email address. We will show a sample reset-link
              confirmation.
            </p>
          </div>

          {isSuccessful ? (
            <div
              role="status"
              className="rounded-xl border border-green-200 bg-green-50 p-5 text-green-800"
            >
              <p className="font-semibold">Sample reset link sent</p>

              <p className="mt-2 text-sm leading-6">
                A fictional password reset link has been sent to{" "}
                <strong>{email}</strong>. No real email was sent.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => setIsSuccessful(false)}
                  className="rounded-lg border border-green-300 px-4 py-2 text-sm font-semibold text-green-900 hover:bg-green-100"
                >
                  Use another email
                </button>

                <Link
                  href="/login"
                  className="rounded-lg bg-red-700 px-4 py-2 text-center text-sm font-semibold text-white hover:bg-red-800"
                >
                  Back to Login
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
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
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);

                    if (error) {
                      setError("");
                    }
                  }}
                  placeholder="student@example.com"
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? "email-error" : undefined}
                  className={`w-full rounded-xl border px-4 py-3 text-gray-900 outline-none transition ${
                    error
                      ? "border-red-500 focus:ring-2 focus:ring-red-100"
                      : "border-gray-300 focus:border-red-600 focus:ring-2 focus:ring-red-100"
                  }`}
                />

                {error && (
                  <p
                    id="email-error"
                    className="mt-2 text-sm text-red-600"
                  >
                    {error}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-6 w-full rounded-xl bg-red-700 px-5 py-3 font-semibold text-white transition hover:bg-red-800 disabled:cursor-not-allowed disabled:bg-red-400"
              >
                {isSubmitting ? "Sending reset link..." : "Send Reset Link"}
              </button>
            </form>
          )}

          <div className="mt-8 border-t border-gray-200 pt-6 text-center">
            <Link
              href="/login"
              className="font-semibold text-red-700 hover:underline"
            >
              Back to Login
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}