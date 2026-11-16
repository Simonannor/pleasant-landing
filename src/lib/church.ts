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
// The bios below are drafted role descriptions; refine them freely.
export const leaders: Leader[] = [
  {
    name: "Rev. Dr. Michael Armah",
    role: "HEAD PASTOR",
    bio: "Shepherds Pleasant Springs Chapel with a heart for sound teaching and fervent prayer, leading the church to please God and serve its generation — seeing every member rooted in faith, flourishing in family, and living with purpose.",
    photo: null,
  },
  {
    name: "Pastor Emmanuel Sarpong",
    role: "ASSOCIATE PASTOR",
    bio: "Serves alongside the head pastor with a passion for discipleship and the practical care of God’s people, helping members grow from their first steps of faith into mature, serving disciples.",
    photo: null,
  },
  {
    name: "Pastor Michael Ayer",
    role: "ASSOCIATE PASTOR",
    bio: "Carries a deep love for worship and the Word, encouraging the congregation to pursue God’s presence daily and to build homes that honour Christ.",
    photo: null,
  },
  {
    name: "Pastor Anthony Dotse",
    role: "ASSOCIATE PASTOR",
    bio: "Serves the house with diligence and joy, supporting the ministries and members of the chapel and pointing every generation to Jesus.",
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
