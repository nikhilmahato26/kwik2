import { business } from "@/data/business";

const LINES = [
  ["name", "Name"],
  ["phone", "Phone"],
  ["pickup", "Pickup Location"],
  ["destination", "Destination"],
  ["date", "Travel Date"],
  ["time", "Pickup Time"],
  ["vehicle", "Vehicle"],
  ["tripType", "Trip Type"],
  ["email", "Email"],
  ["service", "Service Required"],
  ["message", "Message"],
];

export function buildWhatsappMessage(values, heading = "New Enquiry") {
  const parts = [`*${heading} - Kwik2Travels*`];
  for (const [key, label] of LINES) {
    const value = values[key];
    if (value) parts.push(`${label}: ${value}`);
  }
  return parts.join("\n");
}

export function buildWhatsappUrl(values, heading) {
  const text = encodeURIComponent(buildWhatsappMessage(values, heading));
  return `${business.whatsapp}?text=${text}`;
}
