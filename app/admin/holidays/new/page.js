"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, UploadCloud, Plus, Trash2, Save } from "lucide-react";
import { holidayCollections } from "@/data/holidays";

export default function AddHolidayPackage() {
  const [itinerary, setItinerary] = useState([{ title: "", details: "" }]);
  const [inclusions, setInclusions] = useState([""]);
  const [exclusions, setExclusions] = useState([""]);

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link href="/admin/holidays" className="text-gray-400 hover:text-gray-600 transition-colors">
            <ArrowLeft className="size-6" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 font-display">Add New Package</h1>
        </div>
        <button className="inline-flex items-center rounded-lg bg-maroon-deep px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-maroon transition-colors">
          <Save className="-ml-1 mr-2 size-4" />
          Save Package
        </button>
      </div>

      <div className="space-y-8">
        {/* Basic Info */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Basic Details</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium leading-6 text-gray-900">Package Title</label>
              <input type="text" className="mt-2 block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-maroon-deep sm:text-sm sm:leading-6 px-3" placeholder="e.g. Magical Goa Getaway" />
            </div>
            
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">Category</label>
              <select className="mt-2 block w-full rounded-md border-0 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-maroon-deep sm:text-sm sm:leading-6 px-3 bg-white">
                <option value="">Select a category</option>
                {holidayCollections.map(c => (
                  <option key={c.slug} value={c.slug}>{c.title}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">Starting Price (₹)</label>
              <input type="number" className="mt-2 block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-maroon-deep sm:text-sm sm:leading-6 px-3" placeholder="e.g. 15000" />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium leading-6 text-gray-900">Duration String</label>
              <input type="text" className="mt-2 block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-maroon-deep sm:text-sm sm:leading-6 px-3" placeholder="e.g. 4 Days / 3 Nights" />
            </div>
          </div>
        </section>

        {/* Media Upload (Cloudinary Placeholder) */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
          <h2 className="text-lg font-bold text-gray-900 mb-2">Package Cover Image</h2>
          <p className="text-sm text-gray-500 mb-6">This image will be uploaded to Cloudinary once configured.</p>
          <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 hover:bg-gray-50 transition-colors cursor-pointer">
            <div className="text-center">
              <UploadCloud className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
              <div className="mt-4 flex text-sm leading-6 text-gray-600 justify-center">
                <span className="relative cursor-pointer rounded-md bg-transparent font-semibold text-maroon-deep focus-within:outline-none hover:text-maroon">
                  <span>Upload a file</span>
                </span>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
        </section>

        {/* Itinerary Builder */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900">Itinerary Builder</h2>
            <button 
              onClick={() => setItinerary([...itinerary, { title: "", details: "" }])}
              className="inline-flex items-center text-sm font-medium text-maroon-deep hover:text-maroon"
            >
              <Plus className="mr-1 size-4" /> Add Day
            </button>
          </div>
          
          <div className="space-y-6">
            {itinerary.map((day, idx) => (
              <div key={idx} className="relative rounded-lg border border-gray-200 p-5 bg-gray-50/50">
                <button 
                  onClick={() => setItinerary(itinerary.filter((_, i) => i !== idx))}
                  className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="size-4" />
                </button>
                <h3 className="text-sm font-semibold text-gray-900 mb-4">Day {idx + 1}</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700">Day Title</label>
                    <input type="text" className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-maroon-deep sm:text-sm px-3" placeholder="e.g. Arrival in Goa & Leisure" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700">Details</label>
                    <textarea rows={3} className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-maroon-deep sm:text-sm px-3" placeholder="Describe the day's activities..."></textarea>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
