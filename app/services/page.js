import PageHeader from "@/components/PageHeader";
import Services from "@/components/Services";
import CTA from "@/components/CTA";

export const metadata = {
  title: "Cab Services",
  description:
    "Airport transfers, one way cabs, round trips, outstation travel, local cab and tour packages from Kwik2Travels.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        title="Our Services"
        description="Reliable cab and travel services for every occasion."
      />
      <Services showIntro={false} />
      <CTA />
    </>
  );
}
