
import Link from "next/link";
import { Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HolidayCard({ pkg }) {
  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-md transition-all hover:shadow-xl">
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <img
          src={pkg.image}
          alt={pkg.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-3 right-3 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
          {pkg.duration}
        </div>
      </div>
      
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-center gap-1.5 text-xs font-medium text-gray-500">
          <MapPin className="size-3.5" />
          <span>{pkg.placesCovered}</span>
        </div>
        
        <h3 className="mb-4 text-lg font-bold leading-tight text-gray-900 line-clamp-2">
          {pkg.title}
        </h3>
        
        <div className="mt-auto flex items-end justify-between border-t border-gray-100 pt-4">
          <div>
            <p className="text-xs text-gray-500">Starting from</p>
            <p className="text-xl font-bold text-maroon-deep">
              ₹{pkg.startingPrice.toLocaleString("en-IN")}
              <span className="text-xs font-normal text-gray-500"> /person</span>
            </p>
          </div>
          <Button as={Link} href={`/holidays/${pkg.slug}`} variant="gold" size="sm" className="font-semibold shadow-sm">
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
}
