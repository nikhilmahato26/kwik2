"use client"

import { useState } from "react"
import { Upload, Loader2 } from "lucide-react"

export default function ImageUploadField({ label = "Image", value, onChange }) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState(null)

  const handleUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setUploading(true)
    setError(null)

    const formData = new FormData()
    formData.append("file", file)

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Upload failed")
      }

      const data = await response.json()
      onChange(data.url)
    } catch (err) {
      console.error(err)
      setError("Failed to upload image. Please try again.")
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-gray-700">{label}</label>
      {error && (
        <div className="p-3 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-md text-sm">
          {error}
        </div>
      )}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors relative overflow-hidden">
        {value ? (
          <div className="relative w-full h-48 rounded-md overflow-hidden">
            <img src={value} alt="Preview" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
              <label className="cursor-pointer bg-white text-gray-900 px-4 py-2 rounded-md font-medium text-sm">
                Change Image
                <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
              </label>
            </div>
          </div>
        ) : (
          <label className="cursor-pointer flex flex-col items-center space-y-2 w-full h-full py-8">
            {uploading ? (
              <Loader2 size={32} className="text-maroon-deep animate-spin" />
            ) : (
              <>
                <Upload size={32} className="text-gray-400" />
                <span className="text-sm text-gray-600 font-medium">Click to upload an image</span>
                <span className="text-xs text-gray-400">JPG, PNG, WEBP (Max 5MB)</span>
              </>
            )}
            <input type="file" accept="image/*" onChange={handleUpload} disabled={uploading} className="hidden" />
          </label>
        )}
      </div>
    </div>
  )
}
