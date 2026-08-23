import { Phone, Mail, MapPin } from "lucide-react";
import ContactForm from "@/components/ContactForm";

export default function Contact({ business }) {
  return (
    <section className="bg-off-white px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 lg:grid-cols-5 lg:gap-14">
        <div className="lg:col-span-2">
          <h2 className="font-display text-2xl font-semibold text-maroon-deep sm:text-3xl">
            Get in Touch
          </h2>
          <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-text-dark/70">
            Reach out to Kwik2Travels for cab bookings and travel enquiries.
          </p>

          <div className="mt-8 flex flex-col gap-6">
            <div className="flex items-start gap-4">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-[10px] border border-gold/40 bg-cream">
                <Phone className="size-5 text-maroon" aria-hidden />
              </div>
              <div>
                <p className="text-sm font-semibold text-maroon-deep">Phone</p>
                <a href={business.phoneTel} className="text-[15px] text-text-dark/80">
                  {business.phoneDisplay}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-[10px] border border-gold/40 bg-cream">
                <MapPin className="size-5 text-maroon" aria-hidden />
              </div>
              <div>
                <p className="text-sm font-semibold text-maroon-deep">Service Area</p>
                <p className="text-[15px] text-text-dark/80">Contact for Details</p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-card border border-gold/25 bg-white p-6 sm:p-8 lg:col-span-3">
          <h2 className="mb-6 font-display text-2xl font-semibold text-maroon-deep">
            Send an Enquiry
          </h2>
          <ContactForm business={business} />
        </div>
      </div>
    </section>
  );
}
