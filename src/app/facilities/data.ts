export type FacilityAvailability = "Available" | "Limited" | "Booked";

export type Facility = {
  id: number;
  name: string;
  type: string;
  campus: string;
  location: string;
  capacity: number;
  equipment: string[];
  hours: string;
  availability: FacilityAvailability;
  description: string;
  amenities: string[];
  activities: string[];
  rules: string[];
  bookingGuidelines: string[];
  contact: {
    department: string;
    email: string;
    phone: string;
  };
};

export const facilities: Facility[] = [
  {
    id: 1,
    name: "Multipurpose Hall",
    type: "Event Space",
    campus: "Cyberjaya",
    location: "Block A, Level 2",
    capacity: 250,
    equipment: ["Stage Lighting", "Sound System", "Projector"],
    hours: "7:00 AM – 10:00 PM",
    availability: "Available",
    description:
      "A versatile event hall designed for large gatherings, student showcases, seminars and campus celebrations.",
    amenities: ["Tiered seating", "Accessible restrooms", "Green room", "Catering area"],
    activities: ["Orientation programmes", "Conference sessions", "Cultural performances"],
    rules: [
      "No food or drinks near the stage area",
      "All equipment must be returned to its original position",
      "Decorations must be approved before installation",
    ],
    bookingGuidelines: [
      "Bookings should be submitted at least 7 working days in advance",
      "A facilities coordinator will confirm availability and setup requirements",
      "Additional insurance or technical support may be requested for large events",
    ],
    contact: {
      department: "Facilities Management Office",
      email: "facilities@city.edu.my",
      phone: "+60 3 8000 1234",
    },
  },
  {
    id: 2,
    name: "Seminar Room",
    type: "Meeting Space",
    campus: "Cyberjaya",
    location: "Block B, Level 1",
    capacity: 60,
    equipment: ["HD Display", "Conference Phone", "Whiteboard"],
    hours: "8:00 AM – 8:00 PM",
    availability: "Limited",
    description:
      "A comfortable seminar room that supports lectures, internal meetings and focused group discussions.",
    amenities: ["Video conferencing support", "Wi-Fi access", "Adjustable seating", "Presentation podium"],
    activities: ["Academic seminars", "Committee meetings", "Training workshops"],
    rules: [
      "Keep noise levels low during sessions",
      "Do not move the display equipment without approval",
      "Please clean the room before leaving",
    ],
    bookingGuidelines: [
      "Bookings are accepted on a first-come, first-served basis",
      "Please include the expected attendance and agenda when requesting the room",
      "Catering requests should be arranged with the university catering team",
    ],
    contact: {
      department: "Academic Services",
      email: "academics@city.edu.my",
      phone: "+60 3 8000 1235",
    },
  },
  {
    id: 3,
    name: "Sports Hall",
    type: "Recreation",
    campus: "Main",
    location: "Sports Complex",
    capacity: 120,
    equipment: ["Basketball Hoop", "Badminton Nets", "Sound System"],
    hours: "6:00 AM – 11:00 PM",
    availability: "Available",
    description:
      "A lively indoor sports space for recreational games, intramural activities and student wellness events.",
    amenities: ["Changing rooms", "First aid station", "Spectator seating", "Water refill points"],
    activities: ["Basketball sessions", "Badminton tournaments", "Student sports clubs"],
    rules: [
      "Sports shoes must be worn at all times",
      "Personal equipment must be stored safely",
      "No food or glass containers inside the court area",
    ],
    bookingGuidelines: [
      "External bookings may require a sport facilities officer approval",
      "Advance notice is needed for equipment setup and court allocation",
      "Emergency contact information is required for all bookings",
    ],
    contact: {
      department: "Sports and Recreation Unit",
      email: "sports@city.edu.my",
      phone: "+60 3 8000 1236",
    },
  },
  {
    id: 4,
    name: "Recording Studio",
    type: "Creative Space",
    campus: "Main",
    location: "Media Centre, Level 3",
    capacity: 12,
    equipment: ["Audio Interface", "Microphones", "Editing Workstation"],
    hours: "9:00 AM – 9:00 PM",
    availability: "Limited",
    description:
      "A compact studio tailored for recording podcasts, voiceovers and multimedia projects.",
    amenities: ["Soundproofing", "Monitor speakers", "Recording booth", "Editing software"],
    activities: ["Podcast recording", "Voice-over work", "Media editing sessions"],
    rules: [
      "No food or drinks in the sound booth",
      "Bookings must be confirmed before entering the studio",
      "Please save all work to approved storage devices",
    ],
    bookingGuidelines: [
      "Users should bring their own script or project brief",
      "Technical support can be arranged for first-time users",
      "Studio time is billed in 60-minute blocks",
    ],
    contact: {
      department: "Media Centre",
      email: "media@city.edu.my",
      phone: "+60 3 8000 1237",
    },
  },
  {
    id: 5,
    name: "Meeting Room",
    type: "Meeting Space",
    campus: "Penang",
    location: "Administration Wing",
    capacity: 30,
    equipment: ["Video Conferencing", "Whiteboard", "Wi-Fi"],
    hours: "8:30 AM – 6:30 PM",
    availability: "Booked",
    description:
      "A professional meeting room suitable for faculty discussions, interviews and small executive sessions.",
    amenities: ["Conference chairs", "Projector screen", "Tea station", "Visitor seating"],
    activities: ["Interviews", "Faculty meetings", "Advisory sessions"],
    rules: [
      "Please arrive 10 minutes before the scheduled start",
      "Meeting materials should be removed after each session",
      "No outside catering is permitted without approval",
    ],
    bookingGuidelines: [
      "Bookings are coordinated through the campus administration office",
      "A confirmation email is required before access is granted",
      "Please provide the attendee list for security purposes",
    ],
    contact: {
      department: "Administrative Office",
      email: "adminpenang@city.edu.my",
      phone: "+60 4 8000 1234",
    },
  },
  {
    id: 6,
    name: "Student Activity Room",
    type: "Student Space",
    campus: "Cyberjaya",
    location: "Student Centre, Level 1",
    capacity: 45,
    equipment: ["Tables", "Projector", "Relaxation Lounge"],
    hours: "7:30 AM – 10:30 PM",
    availability: "Available",
    description:
      "A welcoming student space for club activities, informal gatherings and collaborative study sessions.",
    amenities: ["Comfort seating", "Study tables", "Refreshment corner", "Charging points"],
    activities: ["Club meetings", "Peer study groups", "Casual networking"],
    rules: [
      "Please keep the room tidy and respectful of other users",
      "No loud music without prior approval",
      "Any damages should be reported immediately",
    ],
    bookingGuidelines: [
      "Student organisations can request short-term bookings through the student affairs office",
      "The room is subject to campus event priorities",
      "Equipment usage should be confirmed at the time of booking",
    ],
    contact: {
      department: "Student Affairs Office",
      email: "studentaffairs@city.edu.my",
      phone: "+60 3 8000 1238",
    },
  },
];
