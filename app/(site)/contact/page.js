import PageHeader from "@/components/PageHeader";
import Contact from "@/components/Contact";
import { getBusinessData } from "@/lib/data";

export const metadata = {
  title: "Contact Us",
  description:
    "Contact Kwik2Travels for cab bookings, outstation trips and airport transfers. Call +91 93291 16616 or send an enquiry.",
};

export default async function ContactPage() {
  const business = await getBusinessData();
  return (
    <>
      <PageHeader
        title="Contact Us"
        description="Reach out for cab bookings and travel enquiries."
      />
      <Contact business={business} />
    </>
  );
}
