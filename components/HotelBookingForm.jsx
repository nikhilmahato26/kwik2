"use client";

import { buildWhatsappUrl } from "@/lib/whatsapp";

export default function HotelBookingForm({ hotel }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    const payload = {
      serviceTab: "Hotel Booking Enquiry",
      name: data.name,
      phone: data.phone,
      hotelRequested: hotel.title,
      hotelId: hotel.id,
      checkIn: data.checkIn,
      checkOut: data.checkOut,
      guests: data.guests,
      rooms: data.rooms,
      message: data.message,
    };
    
    const url = buildWhatsappUrl(payload, "Hotel Booking Enquiry");
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="mb-1 block text-sm font-semibold text-gray-700">Name</label>
        <input 
          required 
          name="name"
          placeholder="Your full name" 
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-semibold text-gray-700">Phone</label>
        <input 
          required 
          type="tel"
          name="phone"
          placeholder="10-digit mobile number" 
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
        />
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1 block text-sm font-semibold text-gray-700">Check-in</label>
          <input 
            required 
            type="date"
            name="checkIn"
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-semibold text-gray-700">Check-out</label>
          <input 
            required 
            type="date"
            name="checkOut"
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1 block text-sm font-semibold text-gray-700">Guests</label>
          <select 
            name="guests"
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
          >
            <option value="1 Adult">1 Adult</option>
            <option value="2 Adults">2 Adults</option>
            <option value="2 Adults + 1 Child">2 Adults + 1 Child</option>
            <option value="Family (4+)">Family (4+)</option>
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-semibold text-gray-700">Rooms</label>
          <select 
            name="rooms"
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
          >
            <option value="1 Room">1 Room</option>
            <option value="2 Rooms">2 Rooms</option>
            <option value="3+ Rooms">3+ Rooms</option>
          </select>
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-semibold text-gray-700">Message (Optional)</label>
        <textarea 
          name="message"
          rows={3}
          placeholder="Any special requests?" 
          className="w-full resize-none rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
        />
      </div>
      <button 
        type="submit" 
        className="mt-2 w-full rounded-lg bg-gold px-4 py-3 font-bold text-white shadow-md transition-colors hover:bg-gold-light"
      >
        REQUEST QUOTE ON WHATSAPP
      </button>
      <p className="text-center text-xs text-gray-500 mt-2">
        We will reply shortly with the best guaranteed rates.
      </p>
    </form>
  );
}
