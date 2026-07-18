import type { ReactNode } from "react";

type AdminPageHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
  action?: ReactNode;
};

export function AdminPageHeader({
  eyebrow,
  title,
  description,
  action,
}: AdminPageHeaderProps) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
        <div>
          <p className="font-semibold text-red-700">{eyebrow}</p>

          <h1 className="mt-2 text-3xl font-bold text-gray-900">
            {title}
          </h1>

          <p className="mt-3 max-w-3xl leading-7 text-gray-600">
            {description}
          </p>
        </div>

        {action && <div className="shrink-0">{action}</div>}
      </div>
    </section>
  );
}

type StatCardProps = {
  label: string;
  value: number | string;
  description: string;
};

export function StatCard({
  label,
  value,
  description,
}: StatCardProps) {
  return (
    <article className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-semibold text-gray-500">{label}</p>

      <p className="mt-3 text-4xl font-bold text-gray-900">{value}</p>

      <p className="mt-3 text-sm leading-6 text-gray-500">
        {description}
      </p>
    </article>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const colourClasses: Record<string, string> = {
    Published: "bg-green-100 text-green-800",
    Confirmed: "bg-green-100 text-green-800",
    Approved: "bg-green-100 text-green-800",
    Available: "bg-green-100 text-green-800",
    "Checked Out": "bg-blue-100 text-blue-800",
    "Checked In": "bg-blue-100 text-blue-800",
    Pending: "bg-amber-100 text-amber-800",
    Draft: "bg-amber-100 text-amber-800",
    Closed: "bg-gray-200 text-gray-700",
    Cancelled: "bg-gray-200 text-gray-700",
    Absent: "bg-red-100 text-red-800",
    Rejected: "bg-red-100 text-red-800",
    Unavailable: "bg-red-100 text-red-800",
    Maintenance: "bg-orange-100 text-orange-800",
  };

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
        colourClasses[status] ?? "bg-gray-100 text-gray-700"
      }`}
    >
      {status}
    </span>
  );
}