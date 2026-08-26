"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2, Plus, Trash2 } from "lucide-react"
import ImageUploadField from "@/components/admin/ImageUploadField"
import ListBuilder from "@/components/admin/ListBuilder"

export default function HolidayForm({ action, initialData = null, collections, redirectTo }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [imageUrl, setImageUrl] = useState(initialData?.image || "")

  const [pricing, setPricing] = useState(
    initialData?.pricing && Object.keys(initialData.pricing).length
      ? Object.entries(initialData.pricing).map(([key, value]) => ({ key, value }))
      : [{ key: "", value: "" }]
  )
  const [itinerary, setItinerary] = useState(
    initialData?.itinerary?.length
      ? initialData.itinerary.map((d) => ({ title: d.title, description: d.description }))
      : [{ title: "", description: "" }]
  )
  const [inclusions, setInclusions] = useState(initialData?.inclusions?.length ? initialData.inclusions : [""])
  const [exclusions, setExclusions] = useState(initialData?.exclusions?.length ? initialData.exclusions : [""])
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

      {/* Basic Info */}
      <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
        <h2 className="text-lg font-bold text-gray-900 mb-6">Basic Details</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium leading-6 text-gray-900">Package Title <span className="text-red-500">*</span></label>
            <input type="text" name="title" required defaultValue={initialData?.title || ""} className="mt-2 block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-maroon-deep sm:text-sm sm:leading-6 px-3" placeholder="e.g. Magical Goa Getaway" />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium leading-6 text-gray-900">Overview</label>
            <textarea name="overview" rows={3} defaultValue={initialData?.overview || ""} className="mt-2 block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-maroon-deep sm:text-sm sm:leading-6 px-3" placeholder="A brief overview of the holiday package..."></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">Category <span className="text-red-500">*</span></label>
            <select name="category" required defaultValue={initialData?.category || ""} className="mt-2 block w-full rounded-md border-0 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-maroon-deep sm:text-sm sm:leading-6 px-3 bg-white">
              <option value="">Select a category</option>
              {collections.map((c) => (
                <option key={c.slug} value={c.slug}>{c.title}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">Starting Price (₹) <span className="text-red-500">*</span></label>
            <input type="number" name="startingPrice" required min="0" step="1" defaultValue={initialData?.startingPrice || ""} className="mt-2 block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-maroon-deep sm:text-sm sm:leading-6 px-3" placeholder="e.g. 15000" />
          </div>

          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">Duration</label>
            <input type="text" name="duration" defaultValue={initialData?.duration || ""} className="mt-2 block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-maroon-deep sm:text-sm sm:leading-6 px-3" placeholder="e.g. 4 Nights / 5 Days" />
          </div>

          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">Origin City</label>
            <input type="text" name="originCity" defaultValue={initialData?.originCity || ""} className="mt-2 block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-maroon-deep sm:text-sm sm:leading-6 px-3" placeholder="e.g. Mumbai" />
          </div>

          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">Validity</label>
            <input type="text" name="validity" defaultValue={initialData?.validity || ""} className="mt-2 block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-maroon-deep sm:text-sm sm:leading-6 px-3" placeholder="e.g. 01 Jan 2026 To 31 Dec 2026" />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium leading-6 text-gray-900">Places Covered</label>
            <input type="text" name="placesCovered" defaultValue={initialData?.placesCovered || ""} className="mt-2 block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-maroon-deep sm:text-sm sm:leading-6 px-3" placeholder="e.g. Goa, Old Goa" />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium leading-6 text-gray-900">Hotels Used</label>
            <input type="text" name="hotels" defaultValue={initialData?.hotels || ""} className="mt-2 block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-maroon-deep sm:text-sm sm:leading-6 px-3" placeholder="e.g. Resort De Crossroads / similar hotels" />
          </div>
        </div>
      </section>

      {/* Media */}
      <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
        <h2 className="text-lg font-bold text-gray-900 mb-2">Package Cover Image <span className="text-red-500">*</span></h2>
        <ImageUploadField label="" value={imageUrl} onChange={setImageUrl} />
      </section>

      {/* Pricing */}
      <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-gray-900">Pricing Table</h2>
          <button
            type="button"
            onClick={() => setPricing([...pricing, { key: "", value: "" }])}
            className="inline-flex items-center text-sm font-medium text-maroon-deep hover:text-maroon"
          >
            <Plus className="mr-1 size-4" /> Add Row
          </button>
        </div>
        <div className="space-y-3">
          {pricing.map((row, idx) => (
            <div key={idx} className="grid grid-cols-[1fr_1fr_auto] gap-3 items-center">
              <input
                type="text"
                name="pricingKey"
                value={row.key}
                onChange={(e) => {
                  const next = [...pricing]
                  next[idx] = { ...next[idx], key: e.target.value }
                  setPricing(next)
                }}
                placeholder="e.g. Per Person (min 2 pax)"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-maroon-deep sm:text-sm px-3"
              />
              <input
                type="text"
                name="pricingValue"
                value={row.value}
                onChange={(e) => {
                  const next = [...pricing]
                  next[idx] = { ...next[idx], value: e.target.value }
                  setPricing(next)
                }}
                placeholder="e.g. ₹15,000"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-maroon-deep sm:text-sm px-3"
              />
              <button
                type="button"
                onClick={() => setPricing(pricing.filter((_, i) => i !== idx))}
                className="text-gray-400 hover:text-red-500 p-2"
              >
                <Trash2 className="size-4" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Itinerary */}
      <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-gray-900">Itinerary Builder</h2>
          <button
            type="button"
            onClick={() => setItinerary([...itinerary, { title: "", description: "" }])}
            className="inline-flex items-center text-sm font-medium text-maroon-deep hover:text-maroon"
          >
            <Plus className="mr-1 size-4" /> Add Day
          </button>
        </div>

        <div className="space-y-6">
          {itinerary.map((day, idx) => (
            <div key={idx} className="relative rounded-lg border border-gray-200 p-5 bg-gray-50/50">
              <button
                type="button"
                onClick={() => setItinerary(itinerary.filter((_, i) => i !== idx))}
                className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
              >
                <Trash2 className="size-4" />
              </button>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Day {idx + 1}</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700">Day Title</label>
                  <input
                    type="text"
                    name="itineraryTitle"
                    value={day.title}
                    onChange={(e) => {
                      const next = [...itinerary]
                      next[idx] = { ...next[idx], title: e.target.value }
                      setItinerary(next)
                    }}
                    className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-maroon-deep sm:text-sm px-3"
                    placeholder="e.g. Arrival in Goa & Leisure"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700">Details</label>
                  <textarea
                    name="itineraryDescription"
                    value={day.description}
                    onChange={(e) => {
                      const next = [...itinerary]
                      next[idx] = { ...next[idx], description: e.target.value }
                      setItinerary(next)
                    }}
                    rows={3}
                    className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-maroon-deep sm:text-sm px-3"
                    placeholder="Describe the day's activities..."
                  ></textarea>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Inclusions / Exclusions / Terms */}
      <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
        <ListBuilder label="Inclusions" name="inclusions" items={inclusions} onChange={setInclusions} placeholder="e.g. 3 nights accommodation" />
      </section>
      <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
        <ListBuilder label="Exclusions" name="exclusions" items={exclusions} onChange={setExclusions} placeholder="e.g. Airfare" />
      </section>
      <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
        <ListBuilder label="Terms & Conditions" name="terms" items={terms} onChange={setTerms} placeholder="e.g. Valid photo ID required at check-in" />
      </section>

      <div className="flex justify-end pb-4">
        <button
          type="submit"
          disabled={loading || !imageUrl}
          className="inline-flex items-center rounded-lg bg-maroon-deep px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-maroon transition-colors disabled:opacity-50"
        >
          {loading && <Loader2 size={18} className="animate-spin mr-2" />}
          {loading ? "Saving..." : "Save Package"}
        </button>
      </div>
    </form>
  )
}
