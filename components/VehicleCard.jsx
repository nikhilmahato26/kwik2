import { Car, IndianRupee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { buildWhatsappUrl } from "@/lib/whatsapp";

export default function VehicleCard({ vehicle }) {
  const enquireUrl = buildWhatsappUrl(
    {
      vehicle: vehicle.name,
      message: `I would like to enquire about booking the ${vehicle.name}.`,
    },
    "Vehicle Enquiry"
  );

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-card border border-maroon/10 bg-white">
      <div className="flex aspect-[4/3] items-center justify-center bg-cream">
        <Car className="size-16 text-maroon/25" aria-hidden />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-xl font-semibold text-maroon-deep">
          {vehicle.name}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-text-dark/70">
          {vehicle.description}
        </p>

        <div className="mt-5 flex items-center gap-1.5 text-sm font-semibold text-gold">
          <IndianRupee className="size-4" aria-hidden />
          Contact for Price
        </div>

        <Button
          as="a"
          href={enquireUrl}
          target="_blank"
          rel="noopener noreferrer"
          variant="outline"
          className="mt-4 w-full"
        >
          ENQUIRE NOW
        </Button>
      </div>
    </div>
  );
}
