"use client";

import { useState } from "react";
import {
  AdminPageHeader,
  StatusBadge,
} from "../components";

type UserStatus = "Active" | "Suspended";

type SystemUser = {
  id: string;
  fullName: string;
  universityId: string;
  email: string;
  category: string;
  role: string;
  status: UserStatus;
};

const initialUsers: SystemUser[] = [
  {
    id: "user-001",
    fullName: "Test Student",
    universityId: "202601010001",
    email: "teststudent@example.com",
    category: "Student",
    role: "Student",
    status: "Active",
  },
  {
    id: "user-002",
    fullName: "Aisha Rahman",
    universityId: "202505010102",
    email: "aisha@example.com",
    category: "Student",
    role: "Committee",
    status: "Active",
  },
  {
    id: "user-003",
    fullName: "STAD Officer",
    universityId: "STAFF-001",
    email: "stad.officer@example.com",
    category: "Staff",
    role: "STAD Officer",
    status: "Active",
  },
  {
    id: "user-004",
    fullName: "Sample Suspended User",
    universityId: "202401010999",
    email: "suspended@example.com",
    category: "Student",
    role: "Student",
    status: "Suspended",
  },
];

export default function AdminUsersPage() {
  const [users, setUsers] =
    useState<SystemUser[]>(initialUsers);

  function toggleStatus(userId: string) {
    setUsers((current) =>
      current.map((user) =>
        user.id === userId
          ? {
              ...user,
              status:
                user.status === "Active"
                  ? "Suspended"
                  : "Active",
            }
          : user,
      ),
    );
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="User Management"
        title="System Users"
        description="Review sample student, staff and committee accounts."
        action={
          <button
            type="button"
            className="rounded-xl bg-red-700 px-5 py-3 font-semibold text-white hover:bg-red-800"
          >
            Add User Demo
          </button>
        }
      />

      <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-800">
        Privileged roles must only be assigned by an authorised
        administrator. Users cannot assign their own administrative role.
      </div>

      <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="grid gap-4 border-b border-gray-200 p-5 md:grid-cols-2">
          <input
            type="search"
            placeholder="Search user, ID or email..."
            className="rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-red-600 focus:ring-2 focus:ring-red-100"
          />

          <select className="rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-red-600">
            <option>All roles</option>
            <option>Student</option>
            <option>Committee</option>
            <option>STAD Officer</option>
            <option>Facilities Officer</option>
            <option>Administrator</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px] text-left text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="px-6 py-4 font-semibold">User</th>
                <th className="px-6 py-4 font-semibold">Category</th>
                <th className="px-6 py-4 font-semibold">Role</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-5">
                    <p className="font-semibold text-gray-900">
                      {user.fullName}
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      {user.universityId}
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      {user.email}
                    </p>
                  </td>

                  <td className="px-6 py-5 text-gray-600">
                    {user.category}
                  </td>

                  <td className="px-6 py-5 font-medium text-gray-700">
                    {user.role}
                  </td>

                  <td className="px-6 py-5">
                    <StatusBadge status={user.status} />
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        className="rounded-lg border border-gray-300 px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50"
                      >
                        Edit Demo
                      </button>

                      <button
                        type="button"
                        onClick={() => toggleStatus(user.id)}
                        className="rounded-lg bg-red-700 px-3 py-2 text-xs font-semibold text-white hover:bg-red-800"
                      >
                        {user.status === "Active"
                          ? "Suspend"
                          : "Activate"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}