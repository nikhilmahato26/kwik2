"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { addVehicle } from "@/app/admin/actions"
import VehicleForm from "@/components/admin/VehicleForm"

export default function AddVehiclePage() {
  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-12">
      <div className="flex items-center space-x-4">
        <Link href="/admin/fleet" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft size={24} className="text-gray-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Add New Vehicle</h1>
          <p className="text-sm text-gray-500">Create a new vehicle listing for the fleet.</p>
        </div>
      </div>

      <VehicleForm action={addVehicle} redirectTo="/admin/fleet" />
    </div>
  )
}
