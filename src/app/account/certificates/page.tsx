import { certificates } from "../data";

export default function CertificatesPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
        <p className="font-semibold text-red-700">My Certificates</p>

        <h1 className="mt-2 text-3xl font-bold text-gray-900">
          Digital Certificates
        </h1>

        <p className="mt-3 text-gray-600">
          View certificates earned through eligible STAD programmes.
        </p>
      </section>

      <section className="grid gap-5 xl:grid-cols-2">
        {certificates.map((certificate) => {
          const isAvailable = certificate.status === "Available";

          return (
            <article
              key={certificate.id}
              className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
            >
              <div className="border-b-4 border-red-700 bg-red-50 p-6">
                <p className="text-sm font-semibold uppercase tracking-wider text-red-700">
                  City University Malaysia
                </p>

                <h2 className="mt-3 text-xl font-bold text-gray-900">
                  {certificate.eventTitle}
                </h2>

                <p className="mt-2 text-sm text-gray-600">
                  {certificate.eventDate}
                </p>
              </div>

              <div className="p-6">
                <div className="space-y-4 text-sm">
                  <div>
                    <p className="font-semibold text-gray-900">
                      Certificate Number
                    </p>

                    <p className="mt-1 text-gray-600">
                      {certificate.certificateNumber}
                    </p>
                  </div>

                  <div>
                    <p className="font-semibold text-gray-900">
                      Issue Date
                    </p>

                    <p className="mt-1 text-gray-600">
                      {certificate.issueDate}
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      isAvailable
                        ? "bg-green-100 text-green-800"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {certificate.status}
                  </span>

                  <button
                    type="button"
                    disabled={!isAvailable}
                    title={
                      isAvailable
                        ? "PDF generation will be connected later."
                        : "Certificate is not available yet."
                    }
                    className="rounded-lg bg-red-700 px-4 py-2 text-sm font-semibold text-white hover:bg-red-800 disabled:cursor-not-allowed disabled:bg-gray-300"
                  >
                    {isAvailable ? "Download PDF (Demo)" : "Not Available"}
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </section>

      <div className="rounded-xl border border-blue-200 bg-blue-50 p-5 text-sm leading-6 text-blue-800">
        Certificate PDF generation and verification will be connected
        during the Certificates module.
      </div>
    </div>
  );
}