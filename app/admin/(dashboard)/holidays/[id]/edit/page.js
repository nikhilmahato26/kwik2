import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { db } from "@/lib/db"
import { updateHolidayPackage } from "@/app/admin/actions"
import HolidayForm from "@/components/admin/HolidayForm"

export const dynamic = 'force-dynamic'

export default async function EditHolidayPackage({ params }) {
  const { id } = await params
  const [pkg, collections] = await Promise.all([
    db.holidayPackage.findUnique({ where: { id } }),
    db.holidayCollection.findMany({ orderBy: { title: "asc" } }),
  ])

  if (!pkg) notFound()

  const action = updateHolidayPackage.bind(null, id)

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/holidays" className="text-gray-400 hover:text-gray-600 transition-colors">
          <ArrowLeft className="size-6" />
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 font-display">Edit Package</h1>
      </div>

      <HolidayForm action={action} initialData={pkg} collections={collections} redirectTo="/admin/holidays" />
    </div>
  )
}
