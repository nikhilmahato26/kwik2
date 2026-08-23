import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { db } from "@/lib/db";
import { addHolidayPackage } from "@/app/admin/actions";
import HolidayForm from "@/components/admin/HolidayForm";

export const dynamic = 'force-dynamic';

export default async function AddHolidayPackage() {
  const collections = await db.holidayCollection.findMany({ orderBy: { title: "asc" } });

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/holidays" className="text-gray-400 hover:text-gray-600 transition-colors">
          <ArrowLeft className="size-6" />
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 font-display">Add New Package</h1>
      </div>

      <HolidayForm action={addHolidayPackage} collections={collections} redirectTo="/admin/holidays" />
    </div>
  );
}
