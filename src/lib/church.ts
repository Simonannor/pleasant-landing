export const church = {
  name: "Pleasant Springs Chapel",
  mission: "Pleasing God, Serving Our Generation.",
  sundayService: "8:30 AM",
  location: "Achimota Mile 7, Accra, Ghana",
  venue: "On the premises of Kaspong Ltd.",
  ministry: "The Father’s Heart School of Ministry",
  theme: "Season of Multiple Fruitfulness",
  themeYear: "2026",
  directions:
    "https://www.google.com/maps/search/?api=1&query=Pleasant+Springs+Chapel+Achimota+Mile+7+Accra+Ghana",
};

// Recurring-event templates for Google Calendar. Ghana stays on GMT year
// round, so local times double as UTC — each anchor date is simply the next
// occurrence of that weekday, repeating weekly from there.
const gcal = (text: string, start: string, end: string, byDay: string) =>
  "https://calendar.google.com/calendar/render?action=TEMPLATE" +
  `&text=${text}` +
  `&dates=${start}/${end}` +
  `&recur=RRULE%3AFREQ%3DWEEKLY%3BBYDAY%3D${byDay}` +
  "&details=Pleasing+God,+Serving+Our+Generation." +
  "&location=Achimota+Mile+7,+Accra,+Ghana";

export type ServiceCard = {
  name: string;
  day: string;
  time: string;
  location: string;
  description: string;
  calendar?: string;
  /** Directions link; null hides it (e.g. for online gatherings). */
  directions?: string | null;
};

// Weekly schedule as provided by the church. Wednesday's study gathers
// online; the other mid-week meetings are at the chapel premises.
export const services: ServiceCard[] = [
  {
    name: "Sunday Worship Service",
    day: "Every Sunday",
    time: church.sundayService,
    location: church.location,
    description: "Our main family gathering — worship, the Word, and fellowship.",
    calendar: gcal(
      "Pleasant+Springs+Chapel+%E2%80%94+Sunday+Worship",
      "20261122T083000Z",
      "20261122T103000Z",
      "SU",
    ),
    directions: church.directions,
  },
  {
    name: "Discipleship Class",
    day: "Every Tuesday",
    time: "6:00 PM – 8:00 PM",
    location: church.location,
    description: "Growing believers in the foundations of the faith, step by step.",
    calendar: gcal(
      "Pleasant+Springs+Chapel+%E2%80%94+Discipleship+Class",
      "20261117T180000Z",
      "20261117T200000Z",
      "TU",
    ),
    directions: church.directions,
  },
  {
    name: "Online Bible Studies",
    day: "Every Wednesday",
    time: "7:00 PM – 8:00 PM",
    location: "Online",
    description: "Studying the Scriptures together, wherever you are.",
    calendar: gcal(
      "Pleasant+Springs+Chapel+%E2%80%94+Online+Bible+Study",
      "20261118T190000Z",
      "20261118T200000Z",
      "WE",
    ),
    directions: null,
  },
  {
    name: "Miracle Hour",
    day: "Every Friday",
    time: "7:00 PM – 8:00 PM",
    location: church.location,
    description: "An hour of prayer, expecting God’s transforming power.",
    calendar: gcal(
      "Pleasant+Springs+Chapel+%E2%80%94+Miracle+Hour",
      "20261120T190000Z",
      "20261120T200000Z",
      "FR",
    ),
    directions: church.directions,
  },
];

export type Leader = {
  name: string;
  role: string;
  bio: string;
  photo?: string | null;
};

// Portraits are placeholders — they will be added when the photos arrive.
export const leaders: Leader[] = [
  {
    name: "Rev. Dr. Michael Armah",
    role: "HEAD PASTOR",
    bio: "Meet Rev. Dr. Michael Armah — the set man over Pleasant Springs Chapel, anointed by God to lead this house with the Word, prayer, and a father’s heart. His calling is simple and unshakable: to please God and serve our generation, raising a people of faith, family, and purpose.",
    photo: null,
  },
  {
    name: "Pastor Emmanuel Sarpong",
    role: "ASSOCIATE PASTOR",
    bio: "Meet Pastor Emmanuel Sarpong — a faithful disciple-builder, anointed to walk with believers from their first step of faith into a life of mature, joyful service. His heart beats for the practical care of God’s people.",
    photo: null,
  },
  {
    name: "Pastor Michael Ayer",
    role: "ASSOCIATE PASTOR",
    bio: "Meet Pastor Michael Ayer — a worshipper and teacher of the Word, anointed to draw the congregation into God’s presence and to build homes that honour Christ, one family at a time.",
    photo: null,
  },
  {
    name: "Pastor Anthony Dotse",
    role: "ASSOCIATE PASTOR",
    bio: "Meet Pastor Anthony Dotse — a diligent and joyful servant of the house, anointed to strengthen the ministries of the chapel and to point every generation, young and old, to Jesus.",
    photo: null,
  },
];

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Our Story", href: "/our-story" },
  { label: "Services", href: "/services" },
  { label: "Leadership", href: "/leadership" },
  { label: "Gallery", href: "/gallery" },
  { label: "School of Ministry", href: "/ministry" },
];
