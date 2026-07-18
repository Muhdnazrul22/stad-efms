export type CommitteeEventStatus =
  | "Active"
  | "Upcoming"
  | "Expired";

export type ParticipantStatus =
  | "Confirmed"
  | "Pending"
  | "Checked In"
  | "Checked Out";

export type RegistrationType = "Online" | "Walk-in";

export type ScanAction = "Check-in" | "Check-out";

export type ScanResult =
  | "Successful"
  | "Duplicate"
  | "Rejected";

export type CommitteeEvent = {
  id: string;
  title: string;
  category: string;
  date: string;
  time: string;
  venue: string;
  role: string;
  counter: string;
  accessPeriod: string;
  status: CommitteeEventStatus;
  permissions: string[];
  registered: number;
  checkedIn: number;
  checkedOut: number;
  currentlyInside: number;
};

export type CommitteeParticipant = {
  id: string;
  eventId: string;
  fullName: string;
  universityId: string;
  email: string;
  phone: string;
  faculty: string;
  programme: string;
  registrationType: RegistrationType;
  status: ParticipantStatus;
  qrToken: string;
  checkIn: string;
  checkOut: string;
};

export type ScanRecord = {
  id: string;
  eventId: string;
  participantName: string;
  universityId: string;
  action: ScanAction;
  time: string;
  scanner: string;
  result: ScanResult;
};

export const committeeMember = {
  fullName: "Aisha Rahman",
  universityId: "202505010102",
  initials: "AR",
  role: "Registration Committee",
};

export const assignedEvents: CommitteeEvent[] = [
  {
    id: "1",
    title: "New Student Orientation 2026",
    category: "Orientation",
    date: "20 July 2026",
    time: "9:00 AM – 5:00 PM",
    venue: "Multipurpose Hall, Cyberjaya Campus",
    role: "Registration Committee",
    counter: "Counter 1",
    accessPeriod: "20 July 2026, 8:00 AM – 6:00 PM",
    status: "Active",
    permissions: [
      "View participants",
      "Register walk-ins",
      "Scan check-in",
      "Scan check-out",
      "View live attendance",
    ],
    registered: 155,
    checkedIn: 98,
    checkedOut: 42,
    currentlyInside: 56,
  },
  {
    id: "2",
    title: "Student Leadership Workshop",
    category: "Student Development",
    date: "25 July 2026",
    time: "10:00 AM – 4:00 PM",
    venue: "Seminar Room 1",
    role: "Attendance Committee",
    counter: "Main Entrance",
    accessPeriod: "25 July 2026, 9:00 AM – 5:00 PM",
    status: "Upcoming",
    permissions: [
      "View participants",
      "Scan check-in",
      "Scan check-out",
    ],
    registered: 60,
    checkedIn: 0,
    checkedOut: 0,
    currentlyInside: 0,
  },
];

export const committeeParticipants: CommitteeParticipant[] = [
  {
    id: "participant-001",
    eventId: "1",
    fullName: "Test Student",
    universityId: "202601010001",
    email: "teststudent@example.com",
    phone: "012-345 6789",
    faculty: "Faculty of Business",
    programme: "Bachelor of Business Administration",
    registrationType: "Online",
    status: "Checked Out",
    qrToken: "STAAD-EVENT-001-TEST-STUDENT",
    checkIn: "20 July 2026, 8:55 AM",
    checkOut: "20 July 2026, 4:58 PM",
  },
  {
    id: "participant-002",
    eventId: "1",
    fullName: "Daniel Lee",
    universityId: "202401010087",
    email: "daniel@example.com",
    phone: "013-555 0101",
    faculty: "Faculty of Information Technology",
    programme: "Bachelor of Computer Science",
    registrationType: "Walk-in",
    status: "Checked In",
    qrToken: "STAAD-EVENT-001-DANIEL-LEE",
    checkIn: "20 July 2026, 9:05 AM",
    checkOut: "Not recorded",
  },
  {
    id: "participant-003",
    eventId: "1",
    fullName: "Nur Sofia",
    universityId: "202410010055",
    email: "sofia@example.com",
    phone: "014-321 7788",
    faculty: "Faculty of Education",
    programme: "Bachelor of Education",
    registrationType: "Online",
    status: "Confirmed",
    qrToken: "STAAD-EVENT-001-NUR-SOFIA",
    checkIn: "Not recorded",
    checkOut: "Not recorded",
  },
  {
    id: "participant-004",
    eventId: "1",
    fullName: "Ahmed Hassan",
    universityId: "202505010220",
    email: "ahmed@example.com",
    phone: "011-222 7788",
    faculty: "Faculty of Business",
    programme: "Bachelor of Accounting",
    registrationType: "Online",
    status: "Pending",
    qrToken: "STZAD-EVENT-001-AHMED-HASSAN",
    checkIn: "Not recorded",
    checkOut: "Not recorded",
  },
  {
    id: "participant-005",
    eventId: "2",
    fullName: "Test Student",
    universityId: "202601010001",
    email: "teststudent@example.com",
    phone: "012-345 6789",
    faculty: "Faculty of Business",
    programme: "Bachelor of Business Administration",
    registrationType: "Online",
    status: "Confirmed",
    qrToken: "STAAD-EVENT-002-TEST-STUDENT",
    checkIn: "Not recorded",
    checkOut: "Not recorded",
  },
  {
    id: "participant-006",
    eventId: "2",
    fullName: "Kevin Tan",
    universityId: "202410010176",
    email: "kevin@example.com",
    phone: "016-223 9000",
    faculty: "Faculty of Creative Industries",
    programme: "Bachelor of Graphic Design",
    registrationType: "Online",
    status: "Confirmed",
    qrToken: "STAAD-EVENT-002-KEVIN-TAN",
    checkIn: "Not recorded",
    checkOut: "Not recorded",
  },
];

export const scanHistory: ScanRecord[] = [
  {
    id: "scan-001",
    eventId: "1",
    participantName: "Test Student",
    universityId: "202601010001",
    action: "Check-in",
    time: "20 July 2026, 8:55 AM",
    scanner: "Aisha Rahman · Counter 1",
    result: "Successful",
  },
  {
    id: "scan-002",
    eventId: "1",
    participantName: "Daniel Lee",
    universityId: "202401010087",
    action: "Check-in",
    time: "20 July 2026, 9:05 AM",
    scanner: "Aisha Rahman · Counter 1",
    result: "Successful",
  },
  {
    id: "scan-003",
    eventId: "1",
    participantName: "Test Student",
    universityId: "202601010001",
    action: "Check-in",
    time: "20 July 2026, 9:10 AM",
    scanner: "Aisha Rahman · Counter 1",
    result: "Duplicate",
  },
  {
    id: "scan-004",
    eventId: "1",
    participantName: "Unknown Token",
    universityId: "Not available",
    action: "Check-in",
    time: "20 July 2026, 9:15 AM",
    scanner: "Aisha Rahman · Counter 1",
    result: "Rejected",
  },
  {
    id: "scan-005",
    eventId: "1",
    participantName: "Test Student",
    universityId: "202601010001",
    action: "Check-out",
    time: "20 July 2026, 4:58 PM",
    scanner: "Aisha Rahman · Counter 1",
    result: "Successful",
  },
];

export function getAssignedEvent(eventId: string) {
  return assignedEvents.find((event) => event.id === eventId);
}

export function getEventParticipants(eventId: string) {
  return committeeParticipants.filter(
    (participant) => participant.eventId === eventId,
  );
}

export function getEventScanHistory(eventId: string) {
  return scanHistory.filter(
    (record) => record.eventId === eventId,
  );
}