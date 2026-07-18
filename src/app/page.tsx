import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <header className="border-b border-gray-200">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <p className="text-xl font-bold text-red-700">STAD EFMS</p>
            <p className="text-xs text-gray-500">City University Malaysia</p>
          </div>

          <nav className="hidden items-center gap-6 md:flex">
            <Link href="/" className="text-gray-700 hover:text-red-700">
              Home
            </Link>

            <Link href="/events" className="text-gray-700 hover:text-red-700">
              Events
            </Link>

            <Link
              href="/facilities"
              className="text-gray-700 hover:text-red-700"
            >
              Facilities
            </Link>

            <Link href="/login" className="text-gray-700 hover:text-red-700">
              Login
            </Link>

            <Link
              href="/register"
              className="rounded-lg bg-red-700 px-4 py-2 font-medium text-white hover:bg-red-800"
            >
              Register
            </Link>
          </nav>
        </div>
      </header>

      <section className="bg-red-700 px-6 py-24 text-white">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 font-medium uppercase tracking-widest text-red-100">
            Student Affairs and Alumni Department
          </p>

          <h1 className="max-w-4xl text-4xl font-bold md:text-6xl">
            Connecting Students, Building Experiences
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-red-100">
            Register for university events and book campus facilities through
            one convenient platform.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/events"
              className="rounded-lg bg-white px-6 py-3 text-center font-semibold text-red-700"
            >
              Browse Events
            </Link>

            <Link
              href="/facilities"
              className="rounded-lg border border-white px-6 py-3 text-center font-semibold text-white"
            >
              Book a Facility
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold text-gray-900">
            What You Can Do
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <article className="rounded-xl border border-gray-200 p-6">
              <h3 className="text-xl font-semibold">Event Registration</h3>
              <p className="mt-3 text-gray-600">
                Browse upcoming activities and submit your registration online.
              </p>
            </article>

            <article className="rounded-xl border border-gray-200 p-6">
              <h3 className="text-xl font-semibold">Facility Booking</h3>
              <p className="mt-3 text-gray-600">
                Request campus facilities for student and university
                activities.
              </p>
            </article>

            <article className="rounded-xl border border-gray-200 p-6">
              <h3 className="text-xl font-semibold">Digital Certificates</h3>
              <p className="mt-3 text-gray-600">
                Receive and download certificates for eligible events.
              </p>
            </article>
          </div>
        </div>
      </section>

      <footer className="bg-gray-950 px-6 py-10 text-white">
        <div className="mx-auto max-w-7xl">
          <p className="font-semibold">City University Malaysia</p>
          <p className="mt-2 text-sm text-gray-400">
            Student Affairs and Alumni Department
          </p>
        </div>
      </footer>
    </main>
  );
}