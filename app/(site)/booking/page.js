import PageHeader from "@/components/PageHeader";
import BookingForm from "@/components/BookingForm";
import { Phone } from "lucide-react";
import { getBusinessData } from "@/lib/data";

export const metadata = {
  title: "Book a Cab",
  description:
    "Book your Kwik2Travels cab online. Fill in your trip details and send your booking request directly on WhatsApp.",
};

export default async function BookingPage() {
  const business = await getBusinessData();
  return (
    <>
      <PageHeader
        title="Book Your Cab"
        description="Fill in your trip details and we will confirm your booking on WhatsApp."
      />

      <section className="bg-off-white px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-3xl">
          <BookingForm title={null} ctaLabel="GET A QUOTE" />

          <p className="mt-6 flex items-center justify-center gap-2 text-sm text-text-dark/60">
            <Phone className="size-4" aria-hidden />
            Prefer to talk? Call us at{" "}
            <a href={business.phoneTel} className="font-semibold text-maroon">
              {business.phoneDisplay}
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
