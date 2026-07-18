import { eventRegistrations } from "../data";

function createPattern(seed: string) {
  const size = 13;

  return Array.from({ length: size * size }, (_, index) => {
    const characterCode =
      seed.charCodeAt(index % seed.length) + index * 17;

    const row = Math.floor(index / size);
    const column = index % size;

    const isTopLeftFinder = row < 4 && column < 4;
    const isTopRightFinder = row < 4 && column >= size - 4;
    const isBottomLeftFinder = row >= size - 4 && column < 4;

    if (
      isTopLeftFinder ||
      isTopRightFinder ||
      isBottomLeftFinder
    ) {
      const localRow =
        row >= size - 4 ? row - (size - 4) : row;

      const localColumn =
        column >= size - 4 ? column - (size - 4) : column;

      return (
        localRow === 0 ||
        localRow === 3 ||
        localColumn === 0 ||
        localColumn === 3 ||
        (localRow >= 1 &&
          localRow <= 2 &&
          localColumn >= 1 &&
          localColumn <= 2)
      );
    }

    return characterCode % 3 !== 0;
  });
}

function DemoQrCode({ value }: { value: string }) {
  const pattern = createPattern(value);

  return (
    <div
      className="grid h-44 w-44 grid-cols-[repeat(13,minmax(0,1fr))] border-8 border-white bg-white shadow-sm"
      aria-label="Demonstration QR code placeholder"
    >
      {pattern.map((filled, index) => (
        <div
          key={index}
          className={filled ? "bg-gray-950" : "bg-white"}
        />
      ))}
    </div>
  );
}

export default function QrCodesPage() {
  const activeRegistrations = eventRegistrations.filter(
    (registration) =>
      registration.status === "Confirmed" ||
      registration.status === "Pending",
  );

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
        <p className="font-semibold text-red-700">My QR Codes</p>

        <h1 className="mt-2 text-3xl font-bold text-gray-900">
          Event Attendance QR Codes
        </h1>

        <p className="mt-3 text-gray-600">
          Present the correct QR code to the authorised event committee
          during check-in and check-out.
        </p>
      </section>

      <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-800">
        These are visual demonstration placeholders only. Secure QR
        tokens and scanning will be connected later.
      </div>

      <section className="grid gap-6 xl:grid-cols-2">
        {activeRegistrations.map((registration) => (
          <article
            key={registration.id}
            className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
          >
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
              <div className="flex justify-center sm:justify-start">
                <DemoQrCode value={registration.qrToken} />
              </div>

              <div className="min-w-0">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    registration.status === "Confirmed"
                      ? "bg-green-100 text-green-800"
                      : "bg-amber-100 text-amber-800"
                  }`}
                >
                  {registration.status}
                </span>

                <h2 className="mt-4 text-xl font-bold text-gray-900">
                  {registration.title}
                </h2>

                <p className="mt-3 text-sm text-gray-600">
                  {registration.date}
                </p>

                <p className="mt-1 text-sm text-gray-600">
                  {registration.time}
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  {registration.venue}
                </p>

                <p className="mt-4 break-all rounded-lg bg-gray-100 p-3 font-mono text-xs text-gray-600">
                  {registration.qrToken}
                </p>
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}