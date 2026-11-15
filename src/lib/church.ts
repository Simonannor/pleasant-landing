export const church = {
  name: "Pleasant Springs Chapel",
  mission: "Pleasing God, Serving Our Generation.",
  sundayService: "8:30 AM",
  location: "Achimota Mile 7, Accra, Ghana",
  venue: "On the premises of Kaspong Ltd.",
  ministry: "The Father’s Heart School of Ministry",
  directions:
    "https://www.google.com/maps/search/?api=1&query=Pleasant+Springs+Chapel+Achimota+Mile+7+Accra+Ghana",
};

// Recurring-event template for Google Calendar (Sundays 8:30–10:30 GMT).
const sundayCalendar =
  "https://calendar.google.com/calendar/render?action=TEMPLATE" +
  "&text=Pleasant+Springs+Chapel+%E2%80%94+Sunday+Worship" +
  "&dates=20261122T083000Z/20261122T103000Z" +
  "&recur=RRULE%3AFREQ%3DWEEKLY%3BBYDAY%3DSU" +
  "&details=Pleasing+God,+Serving+Our+Generation." +
  "&location=Achimota+Mile+7,+Accra,+Ghana";

export type ServiceCard = {
  name: string;
  day: string;
  time: string;
  location: string;
  description: string;
  calendar?: string;
};

// Mid-week and prayer gatherings: day/time are placeholders until confirmed —
// update them here and both the page and the factual tests stay in sync.
export const services: ServiceCard[] = [
  {
    name: "Sunday Worship Service",
    day: "Every Sunday",
    time: church.sundayService,
    location: church.location,
    description: "Our main family gathering — worship, the Word, and fellowship.",
    calendar: sundayCalendar,
  },
  {
    name: "Mid-Week Service",
    day: "Mid-week",
    time: "To be confirmed",
    location: church.location,
    description: "A midweek pause to refuel in worship, the Word, and prayer.",
  },
  {
    name: "Prayer & Bible Study",
    day: "Weekly",
    time: "To be confirmed",
    location: church.location,
    description: "Going deeper together in prayer and the Scriptures.",
  },
];

export type Leader = {
  name: string;
  role: string;
  bio: string;
  photo?: string | null;
};

// Names, bios, and portraits are placeholders — they will be filled in as the
// leadership content is provided.
export const leaders: Leader[] = [
  { name: "", role: "HEAD PASTOR", bio: "", photo: null },
  { name: "", role: "ASSOCIATE PASTOR", bio: "", photo: null },
  { name: "", role: "SCHOOL OF MINISTRY DIRECTOR", bio: "", photo: null },
];

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Our Story", href: "/our-story" },
  { label: "Services", href: "/services" },
  { label: "Leadership", href: "/leadership" },
  { label: "Gallery", href: "/gallery" },
  { label: "School of Ministry", href: "/ministry" },
];
