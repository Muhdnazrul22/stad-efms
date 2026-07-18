export type RegistrationStatus =
  | "Confirmed"
  | "Pending"
  | "Attended"
  | "Cancelled";

export type BookingStatus =
  | "Pending"
  | "Approved"
  | "Rejected"
  | "Completed";

export type CertificateStatus = "Available" | "Processing";

export type EventRegistration = {
  id: string;
  eventId: string;
  title: string;
  category: string;
  date: string;
  time: string;
  venue: string;
  registrationDate: string;
  status: RegistrationStatus;
  qrToken: string;
};

export type FacilityBooking = {
  id: string;
  facilityId: string;
  reference: string;
  facilityName: string;
  activityName: string;
  date: string;
  time: string;
  participants: number;
  status: BookingStatus;
};

export type Certificate = {
  id: string;
  eventTitle: string;
  eventDate: string;
  certificateNumber: string;
  issueDate: string;
  status: CertificateStatus;
};

export const accountUser = {
  fullName: "Test Student",
  initials: "TS",
  universityId: "202601010001",
  email: "teststudent@example.com",
  phone: "012-345 6789",
  category: "Student",
  faculty: "Faculty of Business",
  programme: "Bachelor of Business Administration",
  studentStatus: "Local",
  nationality: "Malaysian",
};

export const eventRegistrations: EventRegistration[] = [
  {
    id: "reg-001",
    eventId: "1",
    title: "New Student Orientation 2026",
    category: "Orientation",
    date: "20 July 2026",
    time: "9:00 AM – 5:00 PM",
    venue: "Multipurpose Hall, Cyberjaya Campus",
    registrationDate: "15 July 2026",
    status: "Confirmed",
    qrToken: "STAD-EVENT-001-TEST-STUDENT",
  },
  {
    id: "reg-002",
    eventId: "2",
    title: "Student Leadership Workshop",
    category: "Student Development",
    date: "25 July 2026",
    time: "10:00 AM – 4:00 PM",
    venue: "Seminar Room 1",
    registrationDate: "16 July 2026",
    status: "Pending",
    qrToken: "STAD-EVENT-002-TEST-STUDENT",
  },
  {
    id: "reg-003",
    eventId: "3",
    title: "Campus Community Day",
    category: "Community Service",
    date: "10 June 2026",
    time: "8:30 AM – 3:00 PM",
    venue: "City University Malaysia",
    registrationDate: "2 June 2026",
    status: "Attended",
    qrToken: "STAD-EVENT-003-TEST-STUDENT",
  },
];

export const facilityBookings: FacilityBooking[] = [
  {
    id: "booking-001",
    facilityId: "1",
    reference: "EFMS-BK-202607-001",
    facilityName: "Multipurpose Hall",
    activityName: "Student Club Annual Meeting",
    date: "28 July 2026",
    time: "2:00 PM – 5:00 PM",
    participants: 120,
    status: "Pending",
  },
  {
    id: "booking-002",
    facilityId: "2",
    reference: "EFMS-BK-202607-002",
    facilityName: "Seminar Room",
    activityName: "Leadership Committee Briefing",
    date: "30 July 2026",
    time: "10:00 AM – 12:00 PM",
    participants: 35,
    status: "Approved",
  },
  {
    id: "booking-003",
    facilityId: "4",
    reference: "EFMS-BK-202606-003",
    facilityName: "Recording Studio",
    activityName: "Student Podcast Recording",
    date: "18 June 2026",
    time: "1:00 PM – 3:00 PM",
    participants: 8,
    status: "Completed",
  },
];

export const certificates: Certificate[] = [
  {
    id: "certificate-001",
    eventTitle: "Campus Community Day",
    eventDate: "10 June 2026",
    certificateNumber: "CITYU-STAD-2026-0001",
    issueDate: "15 June 2026",
    status: "Available",
  },
  {
    id: "certificate-002",
    eventTitle: "Student Leadership Workshop",
    eventDate: "25 July 2026",
    certificateNumber: "Pending",
    issueDate: "Pending attendance",
    status: "Processing",
  },
];

export const recentActivities = [
  {
    id: "activity-001",
    title: "Event registration confirmed",
    description: "New Student Orientation 2026",
    date: "15 July 2026",
  },
  {
    id: "activity-002",
    title: "Facility booking submitted",
    description: "Multipurpose Hall · EFMS-BK-202607-001",
    date: "14 July 2026",
  },
  {
    id: "activity-003",
    title: "Certificate issued",
    description: "Campus Community Day",
    date: "15 June 2026",
  },
];