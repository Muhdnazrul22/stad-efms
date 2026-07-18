"use client";

import { FormEvent, useState } from "react";
import { accountUser } from "../data";

type ProfileForm = {
  fullName: string;
  universityId: string;
  email: string;
  phone: string;
  category: string;
  faculty: string;
  programme: string;
  studentStatus: string;
  nationality: string;
};

export default function ProfilePage() {
  const [form, setForm] = useState<ProfileForm>({
    fullName: accountUser.fullName,
    universityId: accountUser.universityId,
    email: accountUser.email,
    phone: accountUser.phone,
    category: accountUser.category,
    faculty: accountUser.faculty,
    programme: accountUser.programme,
    studentStatus: accountUser.studentStatus,
    nationality: accountUser.nationality,
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  function updateField(field: keyof ProfileForm, value: string) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    setSaved(false);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);
    setSaved(false);

    await new Promise((resolve) => setTimeout(resolve, 800));

    setIsSaving(false);
    setSaved(true);
  }

  const inputClass =
    "w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-red-600 focus:ring-2 focus:ring-red-100";

  const readOnlyClass =
    "w-full cursor-not-allowed rounded-xl border border-gray-200 bg-gray-100 px-4 py-3 text-gray-500";

  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-200 p-6 sm:p-8">
        <p className="font-semibold text-red-700">My Profile</p>

        <h1 className="mt-2 text-3xl font-bold text-gray-900">
          Personal Information
        </h1>

        <p className="mt-3 text-gray-600">
          Review and update your contact and academic information.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 sm:p-8">
        {saved && (
          <div
            role="status"
            className="mb-7 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800"
          >
            Your sample profile changes have been saved.
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2">
          <div className="md:col-span-2">
            <label
              htmlFor="fullName"
              className="mb-2 block text-sm font-semibold text-gray-800"
            >
              Full name
            </label>

            <input
              id="fullName"
              value={form.fullName}
              onChange={(event) =>
                updateField("fullName", event.target.value)
              }
              className={inputClass}
            />
          </div>

          <div>
            <label
              htmlFor="universityId"
              className="mb-2 block text-sm font-semibold text-gray-800"
            >
              Student or staff ID
            </label>

            <input
              id="universityId"
              value={form.universityId}
              readOnly
              className={readOnlyClass}
            />

            <p className="mt-2 text-xs text-gray-500">
              Your university ID cannot be changed here.
            </p>
          </div>

          <div>
            <label
              htmlFor="category"
              className="mb-2 block text-sm font-semibold text-gray-800"
            >
              Account category
            </label>

            <input
              id="category"
              value={form.category}
              readOnly
              className={readOnlyClass}
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-semibold text-gray-800"
            >
              Email address
            </label>

            <input
              id="email"
              type="email"
              value={form.email}
              onChange={(event) =>
                updateField("email", event.target.value)
              }
              className={inputClass}
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="mb-2 block text-sm font-semibold text-gray-800"
            >
              Phone number
            </label>

            <input
              id="phone"
              type="tel"
              value={form.phone}
              onChange={(event) =>
                updateField("phone", event.target.value)
              }
              className={inputClass}
            />
          </div>

          <div>
            <label
              htmlFor="faculty"
              className="mb-2 block text-sm font-semibold text-gray-800"
            >
              Faculty or department
            </label>

            <input
              id="faculty"
              value={form.faculty}
              onChange={(event) =>
                updateField("faculty", event.target.value)
              }
              className={inputClass}
            />
          </div>

          <div>
            <label
              htmlFor="programme"
              className="mb-2 block text-sm font-semibold text-gray-800"
            >
              Programme
            </label>

            <input
              id="programme"
              value={form.programme}
              onChange={(event) =>
                updateField("programme", event.target.value)
              }
              className={inputClass}
            />
          </div>

          <div>
            <label
              htmlFor="studentStatus"
              className="mb-2 block text-sm font-semibold text-gray-800"
            >
              Local or international
            </label>

            <select
              id="studentStatus"
              value={form.studentStatus}
              onChange={(event) =>
                updateField("studentStatus", event.target.value)
              }
              className={inputClass}
            >
              <option value="Local">Local</option>
              <option value="International">International</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="nationality"
              className="mb-2 block text-sm font-semibold text-gray-800"
            >
              Nationality
            </label>

            <input
              id="nationality"
              value={form.nationality}
              onChange={(event) =>
                updateField("nationality", event.target.value)
              }
              className={inputClass}
            />
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="rounded-xl bg-red-700 px-6 py-3 font-semibold text-white hover:bg-red-800 disabled:cursor-not-allowed disabled:bg-red-400"
          >
            {isSaving ? "Saving changes..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}