import { z } from "zod";

const name = z.string().trim().min(2, "Enter your full name");
const phone = z
  .string()
  .trim()
  .regex(/^[+]?[0-9\s-]{10,15}$/, "Enter a valid phone number");
const requiredText = (msg) => z.string().trim().min(1, msg);
const optionalText = z.string().trim().optional().or(z.literal(""));

export const bookingSchema = z.object({
  name,
  phone,
  pickup: requiredText("Enter pickup location"),
  destination: requiredText("Enter destination"),
  date: requiredText("Select a travel date"),
  time: requiredText("Select a pickup time"),
  vehicle: requiredText("Choose a vehicle"),
  tripType: requiredText("Choose a trip type"),
  message: optionalText,
});

export const contactSchema = z.object({
  name,
  phone,
  email: z.string().trim().email("Enter a valid email").optional().or(z.literal("")),
  pickup: requiredText("Enter pickup location"),
  destination: requiredText("Enter destination"),
  date: requiredText("Select a travel date"),
  service: requiredText("Choose a service"),
  message: optionalText,
});
