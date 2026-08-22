import { Car } from "lucide-react";
import Link from "next/link";
import { Plus } from "lucide-react";

export default function AdminFleet() {
  return (
    <div className="flex h-full flex-col items-center justify-center text-center">
      <div className="rounded-full bg-gray-100 p-6 mb-4">
        <Car className="size-12 text-gray-400" />
      </div>
      <h1 className="text-2xl font-bold text-gray-900 font-display mb-2">Manage Fleet</h1>
      <p className="max-w-md text-gray-500 mb-6">
        This is a placeholder for the fleet management page. Here you will be able to add and edit vehicles like Innova, Ertiga, and Swift Dzire.
      </p>
      
      <button className="inline-flex items-center rounded-lg bg-maroon-deep px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-maroon transition-colors cursor-not-allowed opacity-50">
        <Plus className="-ml-1 mr-2 size-5" />
        Add New Vehicle (Coming Soon)
      </button>
    </div>
  );
}
