"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import ImageUploadField from "@/components/admin/ImageUploadField"
import ListBuilder from "@/components/admin/ListBuilder"

export default function HotelForm({ action, initialData = null, redirectTo }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [imageUrl, setImageUrl] = useState(initialData?.image || "")
  const [amenities, setAmenities] = useState(initialData?.amenities?.length ? initialData.amenities : [""])
  const [terms, setTerms] = useState(initialData?.terms?.length ? initialData.terms : [""])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    formData.set("image", imageUrl)

    try {
      const result = await action(formData)
      if (result?.error) {
        setError(result.error)
      } else {
        router.push(redirectTo)
        router.refresh()
      }
    } catch (err) {
      setError("An unexpected error occurred.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-md text-sm">
          {error}
        </div>
      )}

      <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
        <h2 className="text-lg font-bold text-gray-900 mb-6">Property Details</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium leading-6 text-gray-900">Hotel Name <span className="text-red-500">*</span></label>
            <input type="text" name="title" required defaultValue={initialData?.title || ""} className="mt-2 block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-maroon-deep sm:text-sm sm:leading-6 px-3" placeholder="e.g. Taj Exotica Resort & Spa" />
          </div>

          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">Location <span className="text-red-500">*</span></label>
            <input type="text" name="location" required defaultValue={initialData?.location || ""} className="mt-2 block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-maroon-deep sm:text-sm sm:leading-6 px-3" placeholder="e.g. Benaulim, Goa" />
          </div>

          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">Star Rating</label>
            <select name="starRating" defaultValue={initialData?.starRating || 5} className="mt-2 block w-full rounded-md border-0 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-maroon-deep sm:text-sm sm:leading-6 px-3 bg-white">
              <option value="5">5 Star</option>
              <option value="4">4 Star</option>
              <option value="3">3 Star</option>
              <option value="2">2 Star</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">Starting Price (₹) per night <span className="text-red-500">*</span></label>
            <input type="number" name="startingPrice" required min="0" step="1" defaultValue={initialData?.startingPrice || ""} className="mt-2 block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-maroon-deep sm:text-sm sm:leading-6 px-3" placeholder="e.g. 18500" />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium leading-6 text-gray-900">Description</label>
            <textarea name="description" rows={4} defaultValue={initialData?.description || ""} className="mt-2 block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-maroon-deep sm:text-sm sm:leading-6 px-3" placeholder="A short description of the property..."></textarea>
          </div>
        </div>
      </section>

      <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
        <h2 className="text-lg font-bold text-gray-900 mb-2">Hotel Image <span className="text-red-500">*</span></h2>
        <ImageUploadField label="" value={imageUrl} onChange={setImageUrl} />
      </section>

      <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
        <ListBuilder label="Amenities" name="amenities" items={amenities} onChange={setAmenities} placeholder="e.g. Free High-Speed Wi-Fi" />
      </section>

      <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
        <ListBuilder label="Good to Know (Terms)" name="terms" items={terms} onChange={setTerms} placeholder="e.g. Standard Check-in time is 14:00 hrs..." />
      </section>

      <div className="flex justify-end pb-4">
        <button
          type="submit"
          disabled={loading || !imageUrl}
          className="inline-flex items-center rounded-lg bg-maroon-deep px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-maroon transition-colors disabled:opacity-50"
        >
          {loading && <Loader2 size={18} className="animate-spin mr-2" />}
          {loading ? "Saving..." : "Save Hotel"}
        </button>
      </div>
    </form>
  )
}
