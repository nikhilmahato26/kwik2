import { business } from "@/data/business";

const FIELD_LABELS = {
  serviceTab: "Service Category",
  name: "Customer Name",
  phone: "Phone Number",
  email: "Email",
  fromCity: "Starting From",
  toCity: "Destination",
  destination: "Destination",
  pickup: "Pickup Location",
  drop: "Drop Destination",
  departureDate: "Departure Date",
  returnDate: "Return Date",
  checkIn: "Check-in Date",
  checkOut: "Check-out Date",
  date: "Travel Date",
  time: "Pickup Time",
  duration: "Duration / Days",
  travellers: "Travelers",
  guests: "Guests & Rooms",
  rooms: "Rooms",
  tripType: "Trip Type",
  packageType: "Holiday Category",
  flightClass: "Cabin Class",
  hotelCategory: "Hotel Category",
  vehicle: "Vehicle Preference",

  service: "Service Required",
  message: "Special Requests / Notes",
};

export function buildWhatsappMessage(values, heading = "New Travel Enquiry") {
  const parts = [`✈️ *${heading} - ${business.name}*`, ""];

  for (const [key, label] of Object.entries(FIELD_LABELS)) {
    const val = values[key];
    if (val !== undefined && val !== null && String(val).trim() !== "") {
      parts.push(`• *${label}:* ${String(val).trim()}`);
    }
  }

  // Any remaining keys not in standard dictionary
  for (const [key, val] of Object.entries(values)) {
    if (!FIELD_LABELS[key] && val !== undefined && val !== null && String(val).trim() !== "") {
      const formattedKey = key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase());
      parts.push(`• *${formattedKey}:* ${String(val).trim()}`);
    }
  }

  parts.push("");
  parts.push(`_Inquiry submitted via ${business.name} Website_`);
  return parts.join("\n");
}

export function buildWhatsappUrl(values, heading) {
  const text = encodeURIComponent(buildWhatsappMessage(values, heading));
  return `${business.whatsapp}?text=${text}`;
}
