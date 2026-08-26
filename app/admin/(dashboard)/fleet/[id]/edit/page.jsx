import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { db } from "@/lib/db"
import { updateVehicle } from "@/app/admin/actions"
import VehicleForm from "@/components/admin/VehicleForm"

export const dynamic = 'force-dynamic'

export default async function EditVehiclePage({ params }) {
  const { id } = await params
  const vehicle = await db.vehicle.findUnique({ where: { id } })

  if (!vehicle) notFound()

  const action = updateVehicle.bind(null, id)

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-12">
      <div className="flex items-center space-x-4">
        <Link href="/admin/fleet" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft size={24} className="text-gray-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Edit Vehicle</h1>
          <p className="text-sm text-gray-500">Update details for {vehicle.name}.</p>
        </div>
      </div>

      <VehicleForm key={vehicle.id} action={action} initialData={vehicle} redirectTo="/admin/fleet" />
    </div>
  )
}
