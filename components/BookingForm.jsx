"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Field, Input, Select, Textarea } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { bookingSchema } from "@/lib/schema";
import { buildWhatsappUrl } from "@/lib/whatsapp";
import { business } from "@/data/business";
import { vehicleOptions } from "@/data/vehicles";

export default function BookingForm({
  title = "Get a Quote",
  ctaLabel = "GET A QUOTE",
  compact = false,
}) {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(bookingSchema) });

  const onSubmit = (values) => {
    const url = buildWhatsappUrl(values, "Cab Booking Request");
    window.open(url, "_blank", "noopener,noreferrer");
    setSent(true);
    reset();
    window.setTimeout(() => setSent(false), 5000);
  };

  return (
    <div
      className={
        compact
          ? "rounded-card border border-gold/25 bg-white p-6 shadow-[0_20px_50px_rgba(74,18,27,0.12)] sm:p-8"
          : "rounded-card border border-gold/25 bg-white p-6 shadow-[0_20px_50px_rgba(74,18,27,0.1)] sm:p-10"
      }
    >
      {title ? (
        <h3 className="mb-6 font-display text-2xl font-semibold text-maroon-deep">
          {title}
        </h3>
      ) : null}

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Name" htmlFor="name" error={errors.name?.message}>
          <Input id="name" placeholder="Your full name" {...register("name")} />
        </Field>
        <Field label="Phone Number" htmlFor="phone" error={errors.phone?.message}>
          <Input id="phone" type="tel" placeholder="10-digit mobile number" {...register("phone")} />
        </Field>
        <Field label="Pickup Location" htmlFor="pickup" error={errors.pickup?.message}>
          <Input id="pickup" placeholder="Where should we pick you up?" {...register("pickup")} />
        </Field>
        <Field label="Destination" htmlFor="destination" error={errors.destination?.message}>
          <Input id="destination" placeholder="Where are you headed?" {...register("destination")} />
        </Field>
        <Field label="Travel Date" htmlFor="date" error={errors.date?.message}>
          <Input id="date" type="date" {...register("date")} />
        </Field>
        <Field label="Pickup Time" htmlFor="time" error={errors.time?.message}>
          <Input id="time" type="time" {...register("time")} />
        </Field>
        <Field label="Vehicle" htmlFor="vehicle" error={errors.vehicle?.message}>
          <Select id="vehicle" defaultValue="" {...register("vehicle")}>
            <option value="" disabled>
              Select a vehicle
            </option>
            {vehicleOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Trip Type" htmlFor="tripType" error={errors.tripType?.message}>
          <Select id="tripType" defaultValue="" {...register("tripType")}>
            <option value="" disabled>
              Select trip type
            </option>
            {business.tripTypes.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Message" htmlFor="message" className="sm:col-span-2">
          <Textarea id="message" placeholder="Any additional details (optional)" {...register("message")} />
        </Field>

        <div className="sm:col-span-2">
          <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <Loader2 className="size-4 animate-spin" aria-hidden />
            ) : sent ? (
              <CheckCircle2 className="size-4" aria-hidden />
            ) : null}
            {sent ? "Opening WhatsApp" : ctaLabel}
          </Button>
          <p className="mt-3 text-center text-xs text-text-dark/50">
            Your details are sent directly to us on WhatsApp.
          </p>
        </div>
      </form>
    </div>
  );
}
