"use client"

import { useState } from "react"
import { Loader2, CheckCircle2 } from "lucide-react"
import { updateSettings } from "@/app/admin/actions"

const FIELDS = [
  { name: "name", label: "Business Name", placeholder: "e.g. Kwik2Travels" },
  { name: "tagline", label: "Tagline", placeholder: "e.g. Cab & Travel Services" },
  { name: "slogan", label: "Slogan", placeholder: "e.g. We Are Too Quicker" },
  { name: "phoneDisplay", label: "Phone Number (Display)", placeholder: "e.g. +91 93291 16616" },
  { name: "phoneTel", label: "Phone Number (Tel Link)", placeholder: "e.g. tel:+919329116616" },
  { name: "whatsapp", label: "WhatsApp Link", placeholder: "e.g. https://wa.me/919329116616" },
]

export default function SettingsForm({ initialData }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [saved, setSaved] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSaved(false)

    const formData = new FormData(e.currentTarget)

    try {
      const result = await updateSettings(formData)
      if (result?.error) {
        setError(result.error)
      } else {
        setSaved(true)
        window.setTimeout(() => setSaved(false), 3000)
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
        <div className="grid grid-cols-1 gap-6">
          {FIELDS.map((field) => (
            <div key={field.name} className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">{field.label}</label>
              <input
                type="text"
                name={field.name}
                defaultValue={initialData?.[field.name] || ""}
                placeholder={field.placeholder}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-maroon focus:border-maroon transition-all"
              />
            </div>
          ))}
        </div>

        <div className="pt-4 flex items-center justify-end gap-4">
          {saved && (
            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-600">
              <CheckCircle2 size={16} /> Saved
            </span>
          )}
          <button
            type="submit"
            disabled={loading}
            className="bg-maroon-deep text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-maroon transition-colors disabled:opacity-50 flex items-center space-x-2"
          >
            {loading && <Loader2 size={18} className="animate-spin" />}
            <span>{loading ? "Saving..." : "Save Settings"}</span>
          </button>
        </div>
      </form>
    </div>
  )
}
