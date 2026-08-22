"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, UploadCloud, Plus, Trash2, Save } from "lucide-react";

export default function AddHotel() {
  const [amenities, setAmenities] = useState([""]);
  const [terms, setTerms] = useState([""]);

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link href="/admin/hotels" className="text-gray-400 hover:text-gray-600 transition-colors">
            <ArrowLeft className="size-6" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 font-display">Add New Hotel</h1>
        </div>
        <button className="inline-flex items-center rounded-lg bg-maroon-deep px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-maroon transition-colors">
          <Save className="-ml-1 mr-2 size-4" />
          Save Hotel
        </button>
      </div>

      <div className="space-y-8">
        {/* Basic Info */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Property Details</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium leading-6 text-gray-900">Hotel Name</label>
              <input type="text" className="mt-2 block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-maroon-deep sm:text-sm sm:leading-6 px-3" placeholder="e.g. Taj Exotica Resort & Spa" />
            </div>
            
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">Location</label>
              <input type="text" className="mt-2 block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-maroon-deep sm:text-sm sm:leading-6 px-3" placeholder="e.g. Benaulim, Goa" />
            </div>

            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">Star Rating</label>
              <select className="mt-2 block w-full rounded-md border-0 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-maroon-deep sm:text-sm sm:leading-6 px-3 bg-white">
                <option value="5">5 Star</option>
                <option value="4">4 Star</option>
                <option value="3">3 Star</option>
                <option value="2">2 Star</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">Starting Price (₹) per night</label>
              <input type="number" className="mt-2 block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-maroon-deep sm:text-sm sm:leading-6 px-3" placeholder="e.g. 18500" />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium leading-6 text-gray-900">Description</label>
              <textarea rows={4} className="mt-2 block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-maroon-deep sm:text-sm sm:leading-6 px-3" placeholder="A short description of the property..."></textarea>
            </div>
          </div>
        </section>

        {/* Media Upload */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
          <h2 className="text-lg font-bold text-gray-900 mb-2">Hotel Images</h2>
          <p className="text-sm text-gray-500 mb-6">Upload main cover image and gallery (Cloudinary demo).</p>
          <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 hover:bg-gray-50 transition-colors cursor-pointer">
            <div className="text-center">
              <UploadCloud className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
              <div className="mt-4 flex text-sm leading-6 text-gray-600 justify-center">
                <span className="relative cursor-pointer rounded-md bg-transparent font-semibold text-maroon-deep focus-within:outline-none hover:text-maroon">
                  <span>Upload files</span>
                </span>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
        </section>

        {/* Amenities Builder */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900">Amenities</h2>
            <button 
              onClick={() => setAmenities([...amenities, ""])}
              className="inline-flex items-center text-sm font-medium text-maroon-deep hover:text-maroon"
            >
              <Plus className="mr-1 size-4" /> Add Amenity
            </button>
          </div>
          
          <div className="space-y-3">
            {amenities.map((item, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <input 
                  type="text" 
                  value={item}
                  onChange={(e) => {
                    const newAm = [...amenities];
                    newAm[idx] = e.target.value;
                    setAmenities(newAm);
                  }}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-maroon-deep sm:text-sm px-3" 
                  placeholder="e.g. Free High-Speed Wi-Fi" 
                />
                <button 
                  onClick={() => setAmenities(amenities.filter((_, i) => i !== idx))}
                  className="text-gray-400 hover:text-red-500 p-2"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            ))}
          </div>
        </section>
        
        {/* Good to Know / Terms */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900">Good to Know (Terms)</h2>
            <button 
              onClick={() => setTerms([...terms, ""])}
              className="inline-flex items-center text-sm font-medium text-maroon-deep hover:text-maroon"
            >
              <Plus className="mr-1 size-4" /> Add Term
            </button>
          </div>
          
          <div className="space-y-3">
            {terms.map((item, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <input 
                  type="text" 
                  value={item}
                  onChange={(e) => {
                    const newT = [...terms];
                    newT[idx] = e.target.value;
                    setTerms(newT);
                  }}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-maroon-deep sm:text-sm px-3" 
                  placeholder="e.g. Standard Check-in time is 14:00 hrs..." 
                />
                <button 
                  onClick={() => setTerms(terms.filter((_, i) => i !== idx))}
                  className="text-gray-400 hover:text-red-500 p-2"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
