import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { addHotel } from "@/app/admin/actions";
import HotelForm from "@/components/admin/HotelForm";

export default function AddHotel() {
  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/hotels" className="text-gray-400 hover:text-gray-600 transition-colors">
          <ArrowLeft className="size-6" />
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 font-display">Add New Hotel</h1>
      </div>

      <HotelForm action={addHotel} redirectTo="/admin/hotels" />
    </div>
  );
}
