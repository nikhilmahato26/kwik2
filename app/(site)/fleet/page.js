import PageHeader from "@/components/PageHeader";
import Fleet from "@/components/Fleet";
import CTA from "@/components/CTA";
import { getBusinessData, getVehicles } from "@/lib/data";

export const metadata = {
  title: "Our Fleet",
  description:
    "Explore the Kwik2Travels fleet: Toyota Innova Crysta, Maruti Suzuki Ertiga and Swift Dzire, available for local, outstation and airport travel.",
};

export default async function FleetPage() {
  const [business, vehicles] = await Promise.all([
    getBusinessData(),
    getVehicles(),
  ]);
  return (
    <>
      <PageHeader
        title="Our Fleet"
        description="Comfortable, well-maintained vehicles for every kind of journey."
      />
      <Fleet vehicles={vehicles} showIntro={false} />
      <CTA business={business} />
    </>
  );
}
