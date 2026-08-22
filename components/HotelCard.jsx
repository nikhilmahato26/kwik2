import Link from "next/link";
import { MapPin, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HotelCard({ hotel }) {
  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-md transition-all hover:shadow-xl">
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <img
          src={hotel.image}
          alt={hotel.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-3 right-3 flex items-center rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
          <Star className="mr-1 size-3 text-gold fill-gold" />
          {hotel.starRating} Star
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="mb-2 font-display text-xl font-bold text-gray-900 group-hover:text-gold transition-colors">
          {hotel.title}
        </h3>
        
        <div className="mb-4 flex items-center text-sm text-gray-600">
          <MapPin className="mr-1 size-4 flex-shrink-0 text-maroon" />
          <span className="truncate">{hotel.location}</span>
        </div>

        <div className="mt-auto pt-4 flex items-center justify-between border-t border-gray-100">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider">Starting from</p>
            <p className="text-lg font-bold text-maroon-deep">
              ₹{hotel.startingPrice.toLocaleString("en-IN")}
              <span className="text-xs font-normal text-gray-500"> / night</span>
            </p>
          </div>
          <Button asChild variant="gold" size="sm" className="font-semibold shadow-sm">
            <Link href={`/hotels/${hotel.slug}`}>
              View Details
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
