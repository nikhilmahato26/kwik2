"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import ImageUploadField from "@/components/admin/ImageUploadField"

export default function VehicleForm({ action, initialData = null, redirectTo }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [imageUrl, setImageUrl] = useState(initialData?.image || "")

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
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
      {error && (
        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-md text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <ImageUploadField label="Vehicle Image" value={imageUrl} onChange={setImageUrl} />
        <input type="hidden" name="image" value={imageUrl} />

        <div className="grid grid-cols-1 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Vehicle Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="name"
              required
              defaultValue={initialData?.name || ""}
              placeholder="e.g. Toyota Innova Crysta"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-maroon focus:border-maroon transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Description <span className="text-red-500">*</span></label>
            <textarea
              name="description"
              required
              rows={4}
              defaultValue={initialData?.description || ""}
              placeholder="Briefly describe the vehicle, seating capacity, comfort level..."
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-maroon focus:border-maroon transition-all resize-none"
            ></textarea>
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            disabled={loading || !imageUrl}
            className="bg-maroon-deep text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-maroon transition-colors disabled:opacity-50 flex items-center space-x-2"
          >
            {loading && <Loader2 size={18} className="animate-spin" />}
            <span>{loading ? "Saving..." : "Save Vehicle"}</span>
          </button>
        </div>
      </form>
    </div>
  )
}
