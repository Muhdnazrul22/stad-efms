"use client";

import { useState } from "react";
import { AdminPageHeader } from "../components";

type SettingsState = {
  allowGuestRegistration: boolean;
  allowGuestBooking: boolean;
  sendRegistrationEmails: boolean;
  sendBookingEmails: boolean;
  requireEmailVerification: boolean;
  maintenanceMode: boolean;
};

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SettingsState>({
    allowGuestRegistration: true,
    allowGuestBooking: true,
    sendRegistrationEmails: true,
    sendBookingEmails: true,
    requireEmailVerification: true,
    maintenanceMode: false,
  });

  const [saved, setSaved] = useState(false);

  function toggleSetting(setting: keyof SettingsState) {
    setSettings((current) => ({
      ...current,
      [setting]: !current[setting],
    }));

    setSaved(false);
  }

  async function saveSettings() {
    setSaved(false);

    await new Promise((resolve) => setTimeout(resolve, 700));

    setSaved(true);
  }

  const settingsItems = [
    {
      key: "allowGuestRegistration" as const,
      title: "Allow Guest Event Registration",
      description:
        "Permit participants to register without creating an account.",
    },
    {
      key: "allowGuestBooking" as const,
      title: "Allow Guest Facility Booking",
      description:
        "Permit booking requests without creating an account.",
    },
    {
      key: "sendRegistrationEmails" as const,
      title: "Registration Confirmation Emails",
      description:
        "Send confirmation after a successful event registration.",
    },
    {
      key: "sendBookingEmails" as const,
      title: "Booking Notification Emails",
      description:
        "Send booking received, approved and rejected notifications.",
    },
    {
      key: "requireEmailVerification" as const,
      title: "Require Email Verification",
      description:
        "Require registered accounts to verify their email address.",
    },
    {
      key: "maintenanceMode" as const,
      title: "Maintenance Mode",
      description:
        "Temporarily restrict access while system maintenance is performed.",
    },
  ];

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="System Settings"
        title="Administration Settings"
        description="Configure sample platform behaviour and notification preferences."
      />

      {saved && (
        <div
          role="status"
          className="rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-800"
        >
          Sample settings saved successfully. The changes will reset
          after refreshing.
        </div>
      )}

      <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="divide-y divide-gray-200">
          {settingsItems.map((item) => (
            <div
              key={item.key}
              className="flex flex-col justify-between gap-5 p-6 sm:flex-row sm:items-center"
            >
              <div>
                <h2 className="font-semibold text-gray-900">
                  {item.title}
                </h2>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600">
                  {item.description}
                </p>
              </div>

              <button
                type="button"
                onClick={() => toggleSetting(item.key)}
                aria-pressed={settings[item.key]}
                className={`min-w-24 rounded-full px-4 py-2 text-sm font-semibold transition ${
                  settings[item.key]
                    ? "bg-green-700 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {settings[item.key] ? "Enabled" : "Disabled"}
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900">
          System Information
        </h2>

        <div className="mt-5 grid gap-5 text-sm sm:grid-cols-2 xl:grid-cols-4">
          <div>
            <p className="font-semibold text-gray-900">
              Application
            </p>
            <p className="mt-1 text-gray-600">STAD EFMS</p>
          </div>

          <div>
            <p className="font-semibold text-gray-900">
              Environment
            </p>
            <p className="mt-1 text-gray-600">Development Demo</p>
          </div>

          <div>
            <p className="font-semibold text-gray-900">
              Database
            </p>
            <p className="mt-1 text-gray-600">Not connected</p>
          </div>

          <div>
            <p className="font-semibold text-gray-900">
              Version
            </p>
            <p className="mt-1 text-gray-600">0.1.0 Demo</p>
          </div>
        </div>
      </section>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={saveSettings}
          className="rounded-xl bg-red-700 px-6 py-3 font-semibold text-white hover:bg-red-800"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
}