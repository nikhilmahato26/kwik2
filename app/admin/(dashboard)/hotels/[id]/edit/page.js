import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { db } from "@/lib/db"
import { updateHotel } from "@/app/admin/actions"
import HotelForm from "@/components/admin/HotelForm"

export const dynamic = 'force-dynamic'

export default async function EditHotel({ params }) {
  const { id } = await params
  const hotel = await db.hotel.findUnique({ where: { id } })

  if (!hotel) notFound()

  const action = updateHotel.bind(null, id)

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/hotels" className="text-gray-400 hover:text-gray-600 transition-colors">
          <ArrowLeft className="size-6" />
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 font-display">Edit Hotel</h1>
      </div>

      <HotelForm action={action} initialData={hotel} redirectTo="/admin/hotels" />
    </div>
  )
}
