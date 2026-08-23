"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Field, Input, Select, Textarea } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { contactSchema } from "@/lib/schema";
import { buildWhatsappUrl } from "@/lib/whatsapp";
import { toTitleCase } from "@/lib/utils";
import { createLead } from "@/app/actions";

export default function ContactForm({ business }) {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(contactSchema) });

  const onSubmit = async (values) => {
    const formattedValues = {
      ...values,
      name: toTitleCase(values.name),
      pickup: values.pickup ? toTitleCase(values.pickup) : values.pickup,
      destination: values.destination ? toTitleCase(values.destination) : values.destination,
    };

    try {
      await createLead("General Enquiry", formattedValues);
    } catch (err) {
      console.error("Failed to save enquiry:", err);
    }

    const url = buildWhatsappUrl(formattedValues, "General Enquiry");
    window.open(url, "_blank", "noopener,noreferrer");
    setSent(true);
    reset();
    window.setTimeout(() => setSent(false), 5000);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      <Field label="Name" htmlFor="c-name" error={errors.name?.message}>
        <Input id="c-name" placeholder="Your full name" {...register("name")} />
      </Field>
      <Field label="Phone" htmlFor="c-phone" error={errors.phone?.message}>
        <Input id="c-phone" type="tel" placeholder="10-digit mobile number" {...register("phone")} />
      </Field>
      <Field label="Email" htmlFor="c-email" error={errors.email?.message}>
        <Input id="c-email" type="email" placeholder="you@example.com" {...register("email")} />
      </Field>
      <Field label="Pickup Location" htmlFor="c-pickup" error={errors.pickup?.message}>
        <Input id="c-pickup" placeholder="Where should we pick you up?" {...register("pickup")} />
      </Field>
      <Field label="Destination" htmlFor="c-destination" error={errors.destination?.message}>
        <Input id="c-destination" placeholder="Where are you headed?" {...register("destination")} />
      </Field>
      <Field label="Travel Date" htmlFor="c-date" error={errors.date?.message}>
        <Input id="c-date" type="date" {...register("date")} />
      </Field>
      <Field label="Service Required" htmlFor="c-service" className="sm:col-span-2" error={errors.service?.message}>
        <Select id="c-service" defaultValue="" {...register("service")}>
          <option value="" disabled>
            Select a service
          </option>
          {business.services.map((service) => (
            <option key={service.slug} value={service.name}>
              {service.name}
            </option>
          ))}
        </Select>
      </Field>
      <Field label="Message" htmlFor="c-message" className="sm:col-span-2">
        <Textarea id="c-message" placeholder="Tell us about your trip (optional)" {...register("message")} />
      </Field>

      <div className="sm:col-span-2">
        <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <Loader2 className="size-4 animate-spin" aria-hidden />
          ) : sent ? (
            <CheckCircle2 className="size-4" aria-hidden />
          ) : null}
          {sent ? "Opening WhatsApp" : "SUBMIT ENQUIRY"}
        </Button>
      </div>
    </form>
  );
}
