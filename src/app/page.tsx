import Image from "next/image";
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

      <section className="relative min-h-[650px] overflow-hidden text-white sm:min-h-[700px]">
  {/* Background photo */}
  <Image
    src="/images/staad-home.jpg"
    alt="Students performing during a City University Malaysia event"
    fill
    priority
    className="object-cover object-[center_58%]"
    sizes="100vw"
  />

  {/* Dark overlay to make the text readable */}
  <div className="absolute inset-0 bg-black/40" />

  {/* Red branded overlay */}
  <div className="absolute inset-0 bg-gradient-to-r from-red-950/95 via-red-900/70 to-black/20" />

  {/* Hero content */}
  <div className="relative z-10 mx-auto flex min-h-[650px] max-w-7xl items-center px-6 py-20 sm:min-h-[700px] lg:px-8">
    <div className="max-w-4xl">
      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-red-100 sm:text-base">
        Student Affairs and Alumni Department
      </p>

      <h1 className="mt-6 text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
        Connecting Students, Building Experiences
      </h1>

      <p className="mt-7 max-w-2xl text-lg leading-8 text-gray-100 sm:text-xl">
        Register for university events and book campus facilities through one
        convenient platform.
      </p>

      <div className="mt-10 flex flex-wrap gap-4">
        <Link
          href="/events"
          className="rounded-xl bg-white px-7 py-4 text-lg font-semibold text-red-700 shadow-lg transition hover:bg-red-50"
        >
          Browse Events
        </Link>

        <Link
          href="/facilities"
          className="rounded-xl border border-white/80 bg-black/10 px-7 py-4 text-lg font-semibold text-white backdrop-blur-sm transition hover:bg-white/15"
        >
          Book a Facility
        </Link>
      </div>
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
          <p className="font-semibold">
            City University Malaysia
          </p>

          <p className="mt-2 text-sm text-gray-400">
            Student Affairs and Alumni Department
          </p>
        </div>
      </footer>
    </main>
  );
}