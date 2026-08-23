import PageHeader from "@/components/PageHeader";
import Fleet from "@/components/Fleet";
import CTA from "@/components/CTA";

export const metadata = {
  title: "Our Fleet",
  description:
    "Explore the Kwik2Travels fleet: Toyota Innova Crysta, Maruti Suzuki Ertiga and Swift Dzire, available for local, outstation and airport travel.",
};

export default function FleetPage() {
  return (
    <>
      <PageHeader
        title="Our Fleet"
        description="Comfortable, well-maintained vehicles for every kind of journey."
      />
      <Fleet showIntro={false} />
      <CTA />
    </>
  );
}
