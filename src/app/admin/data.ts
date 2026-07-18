export type EventStatus = "Draft" | "Published" | "Closed";
export type RegistrationStatus =
  | "Confirmed"
  | "Pending"
  | "Cancelled";
export type AttendanceStatus =
  | "Checked In"
  | "Checked Out"
  | "Absent";
export type FacilityStatus =
  | "Available"
  | "Unavailable"
  | "Maintenance";
export type BookingStatus =
  | "Pending"
  | "Approved"
  | "Rejected";

export type AdminEvent = {
  id: string;
  title: string;
  category: string;
  date: string;
  time: string;
  venue: string;
  capacity: number;
  registrations: number;
  status: EventStatus;
};

export type AdminRegistration = {
  id: string;
  participantName: string;
  universityId: string;
  email: string;
  eventTitle: string;
  registrationType: "Online" | "Walk-in";
  registeredAt: string;
  status: RegistrationStatus;
};

export type AttendanceRecord = {
  id: string;
  participantName: string;
  universityId: string;
  eventTitle: string;
  checkIn: string;
  checkOut: string;
  scanner: string;
  status: AttendanceStatus;
};

export type AdminFacility = {
  id: string;
  name: string;
  type: string;
  location: string;
  capacity: number;
  nextBooking: string;
  status: FacilityStatus;
};

export type BookingRequest = {
  id: string;
  reference: string;
  applicantName: string;
  universityId: string;
  facilityName: string;
  activityName: string;
  date: string;
  time: string;
  participants: number;
  submittedAt: string;
  status: BookingStatus;
};

export const adminEvents: AdminEvent[] = [
  {
    id: "1",
    title: "New Student Orientation 2026",
    category: "Orientation",
    date: "20 July 2026",
    time: "9:00 AM – 5:00 PM",
    venue: "Multipurpose Hall",
    capacity: 200,
    registrations: 155,
    status: "Published",
  },
  {
    id: "2",
    title: "Student Leadership Workshop",
    category: "Student Development",
    date: "25 July 2026",
    time: "10:00 AM – 4:00 PM",
    venue: "Seminar Room 1",
    capacity: 80,
    registrations: 60,
    status: "Published",
  },
  {
    id: "3",
    title: "Campus Community Day",
    category: "Community Service",
    date: "10 August 2026",
    time: "8:30 AM – 3:00 PM",
    venue: "Cyberjaya Campus",
    capacity: 300,
    registrations: 0,
    status: "Draft",
  },
  {
    id: "4",
    title: "Graduate Career Preparation",
    category: "Career",
    date: "15 June 2026",
    time: "9:00 AM – 1:00 PM",
    venue: "Lecture Hall 2",
    capacity: 120,
    registrations: 118,
    status: "Closed",
  },
];

export const adminRegistrations: AdminRegistration[] = [
  {
    id: "registration-001",
    participantName: "Test Student",
    universityId: "202601010001",
    email: "teststudent@example.com",
    eventTitle: "New Student Orientation 2026",
    registrationType: "Online",
    registeredAt: "18 July 2026, 9:30 AM",
    status: "Confirmed",
  },
  {
    id: "registration-002",
    participantName: "Aisha Rahman",
    universityId: "202505010102",
    email: "aisha@example.com",
    eventTitle: "Student Leadership Workshop",
    registrationType: "Online",
    registeredAt: "18 July 2026, 10:15 AM",
    status: "Pending",
  },
  {
    id: "registration-003",
    participantName: "Daniel Lee",
    universityId: "202401010087",
    email: "daniel@example.com",
    eventTitle: "New Student Orientation 2026",
    registrationType: "Walk-in",
    registeredAt: "20 July 2026, 9:05 AM",
    status: "Confirmed",
  },
  {
    id: "registration-004",
    participantName: "Nur Sofia",
    universityId: "202410010055",
    email: "sofia@example.com",
    eventTitle: "Graduate Career Preparation",
    registrationType: "Online",
    registeredAt: "12 June 2026, 2:20 PM",
    status: "Cancelled",
  },
];

export const attendanceRecords: AttendanceRecord[] = [
  {
    id: "attendance-001",
    participantName: "Test Student",
    universityId: "202601010001",
    eventTitle: "New Student Orientation 2026",
    checkIn: "20 July 2026, 8:55 AM",
    checkOut: "20 July 2026, 4:58 PM",
    scanner: "Committee Counter 1",
    status: "Checked Out",
  },
  {
    id: "attendance-002",
    participantName: "Daniel Lee",
    universityId: "202401010087",
    eventTitle: "New Student Orientation 2026",
    checkIn: "20 July 2026, 9:05 AM",
    checkOut: "Not recorded",
    scanner: "Committee Counter 2",
    status: "Checked In",
  },
  {
    id: "attendance-003",
    participantName: "Aisha Rahman",
    universityId: "202505010102",
    eventTitle: "Student Leadership Workshop",
    checkIn: "Not recorded",
    checkOut: "Not recorded",
    scanner: "Not available",
    status: "Absent",
  },
];

export const adminFacilities: AdminFacility[] = [
  {
    id: "1",
    name: "Multipurpose Hall",
    type: "Hall",
    location: "Cyberjaya Campus, Ground Floor",
    capacity: 300,
    nextBooking: "28 July 2026, 2:00 PM",
    status: "Available",
  },
  {
    id: "2",
    name: "Seminar Room",
    type: "Seminar Room",
    location: "Cyberjaya Campus, Level 2",
    capacity: 50,
    nextBooking: "30 July 2026, 10:00 AM",
    status: "Available",
  },
  {
    id: "3",
    name: "Sports Hall",
    type: "Sports",
    location: "PJ Campus",
    capacity: 250,
    nextBooking: "Unavailable",
    status: "Maintenance",
  },
  {
    id: "4",
    name: "Recording Studio",
    type: "Studio",
    location: "Cyberjaya Campus, Level 3",
    capacity: 12,
    nextBooking: "2 August 2026, 1:00 PM",
    status: "Unavailable",
  },
];

export const bookingRequests: BookingRequest[] = [
  {
    id: "booking-001",
    reference: "EFMS-BK-202607-001",
    applicantName: "Test Student",
    universityId: "202601010001",
    facilityName: "Multipurpose Hall",
    activityName: "Student Club Annual Meeting",
    date: "28 July 2026",
    time: "2:00 PM – 5:00 PM",
    participants: 120,
    submittedAt: "18 July 2026, 8:45 AM",
    status: "Pending",
  },
  {
    id: "booking-002",
    reference: "EFMS-BK-202607-002",
    applicantName: "Aisha Rahman",
    universityId: "202505010102",
    facilityName: "Seminar Room",
    activityName: "Leadership Committee Briefing",
    date: "30 July 2026",
    time: "10:00 AM – 12:00 PM",
    participants: 35,
    submittedAt: "17 July 2026, 3:20 PM",
    status: "Approved",
  },
  {
    id: "booking-003",
    reference: "EFMS-BK-202607-003",
    applicantName: "Daniel Lee",
    universityId: "202401010087",
    facilityName: "Recording Studio",
    activityName: "Student Podcast Recording",
    date: "2 August 2026",
    time: "1:00 PM – 3:00 PM",
    participants: 8,
    submittedAt: "17 July 2026, 11:30 AM",
    status: "Pending",
  },
];

export const adminActivities = [
  {
    id: "activity-001",
    title: "New registration received",
    description: "Test Student registered for Orientation 2026.",
    time: "10 minutes ago",
  },
  {
    id: "activity-002",
    title: "Booking request submitted",
    description: "Multipurpose Hall · EFMS-BK-202607-001",
    time: "35 minutes ago",
  },
  {
    id: "activity-003",
    title: "Event published",
    description: "Student Leadership Workshop",
    time: "2 hours ago",
  },
  {
    id: "activity-004",
    title: "Facility marked for maintenance",
    description: "Sports Hall, PJ Campus",
    time: "Yesterday",
  },
];