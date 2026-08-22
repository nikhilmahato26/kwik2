"use client";

import { useState } from "react";
import {
  Palmtree,
  Plane,
  Hotel,
  Car,
  Coins,
  CarTaxiFront,
  CheckCircle2,
  Loader2,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { Field, Input, Select, Textarea } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { buildWhatsappUrl } from "@/lib/whatsapp";
import { vehicleOptions } from "@/data/vehicles";

const TABS = [
  {
    id: "holidays",
    label: "Holidays",
    icon: Palmtree,
    heading: "Holiday Package Enquiry",
    submitText: "GET HOLIDAY QUOTE",
    subtitle: "Customised Domestic & International Holiday Packages",
  },
  {
    id: "flights",
    label: "Flights",
    icon: Plane,
    heading: "Flight Booking Enquiry",
    submitText: "SEARCH FLIGHTS & GET FARES",
    subtitle: "Best Fares for Domestic & International Flights",
  },
  {
    id: "hotels",
    label: "Hotels",
    icon: Hotel,
    heading: "Hotel Booking Enquiry",
    submitText: "GET HOTEL QUOTE",
    subtitle: "Handpicked Luxury & Budget Hotels & Resorts",
  },
  {
    id: "cars",
    label: "Cars",
    icon: Car,
    heading: "Car Rental Booking",
    submitText: "BOOK CAR & GET QUOTE",
    subtitle: "Outstation, Intercity & Long Distance Car Rentals",
  },

];

const CURRENCIES = [
  "USD - US Dollar ($)",
  "EUR - Euro (€)",
  "AED - UAE Dirham (AED)",
  "THB - Thai Baht (฿)",
  "GBP - British Pound (£)",
  "SGD - Singapore Dollar (S$)",
  "AUD - Australian Dollar (A$)",
  "CAD - Canadian Dollar (C$)",
  "SAR - Saudi Riyal (SAR)",
  "JPY - Japanese Yen (¥)",
  "MYR - Malaysian Ringgit (RM)",
  "CHF - Swiss Franc (CHF)",
  "Other Currency",
];

export default function BookingForm({
  title = null,
  compact = false,
  className = "",
}) {
  const [activeTab, setActiveTab] = useState("holidays");
  const [flightTripType, setFlightTripType] = useState("One Way");
  const [carTripType, setCarTripType] = useState("Outstation Round Trip");
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  // Tab-specific form state
  const [formData, setFormData] = useState({
    // Common
    name: "",
    phone: "",
    message: "",
    // Holidays
    fromCity: "",
    destination: "",
    departureDate: "",
    duration: "4 Nights / 5 Days",
    packageType: "Family Vacation",
    travellers: "2 Adults",
    // Flights
    flightFrom: "",
    flightTo: "",
    flightDeparture: "",
    flightReturn: "",
    flightClass: "Economy",
    flightPassengers: "1 Passenger",
    // Hotels
    hotelCity: "",
    checkIn: "",
    checkOut: "",
    guests: "1 Room, 2 Guests",
    hotelCategory: "4 Star Premium",
    // Cars
    carPickup: "",
    carDrop: "",
    carDate: "",
    carTime: "",
    carVehicle: "Toyota Innova Crysta",
    // Forex
    forexService: "Buy Foreign Currency Notes",
    forexCurrency: "USD - US Dollar ($)",
    forexAmount: "",
    deliveryCity: "Doorstep Delivery",
    // Cabs
    cabService: "City Ride / Point to Point",
    cabPickup: "",
    cabDrop: "",
    cabDate: "",
    cabTime: "",
    cabVehicle: "Swift Dzire / Sedan",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const currentTabConfig = TABS.find((t) => t.id === activeTab) || TABS[0];

  const validate = () => {
    const newErrors = {};
    if (!formData.name?.trim() || formData.name.trim().length < 2) {
      newErrors.name = "Please enter your name";
    }
    const phoneRegex = /^[+]?[0-9\s-]{10,15}$/;
    if (!formData.phone?.trim() || !phoneRegex.test(formData.phone.trim())) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }

    if (activeTab === "holidays") {
      if (!formData.destination?.trim()) newErrors.destination = "Enter destination or package";
      if (!formData.departureDate) newErrors.departureDate = "Select departure date";
    } else if (activeTab === "flights") {
      if (!formData.flightFrom?.trim()) newErrors.flightFrom = "Enter departure city/airport";
      if (!formData.flightTo?.trim()) newErrors.flightTo = "Enter destination city/airport";
      if (!formData.flightDeparture) newErrors.flightDeparture = "Select departure date";
      if (flightTripType === "Round Trip" && !formData.flightReturn) {
        newErrors.flightReturn = "Select return date";
      }
    } else if (activeTab === "hotels") {
      if (!formData.hotelCity?.trim()) newErrors.hotelCity = "Enter city or hotel name";
      if (!formData.checkIn) newErrors.checkIn = "Select check-in date";
      if (!formData.checkOut) newErrors.checkOut = "Select check-out date";
    } else if (activeTab === "cars") {
      if (!formData.carPickup?.trim()) newErrors.carPickup = "Enter pickup location";
      if (!formData.carDrop?.trim()) newErrors.carDrop = "Enter destination / drop location";
      if (!formData.carDate) newErrors.carDate = "Select date";
    }


    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    let payload = {
      name: formData.name,
      phone: formData.phone,
      serviceTab: currentTabConfig.label,
    };

    if (activeTab === "holidays") {
      payload = {
        ...payload,
        fromCity: formData.fromCity || "Flexible",
        destination: formData.destination,
        departureDate: formData.departureDate,
        duration: formData.duration,
        packageType: formData.packageType,
        travellers: formData.travellers,
        message: formData.message,
      };
    } else if (activeTab === "flights") {
      payload = {
        ...payload,
        tripType: flightTripType,
        fromCity: formData.flightFrom,
        toCity: formData.flightTo,
        departureDate: formData.flightDeparture,
        returnDate: flightTripType === "Round Trip" ? formData.flightReturn : "N/A",
        flightClass: formData.flightClass,
        travellers: formData.flightPassengers,
        message: formData.message,
      };
    } else if (activeTab === "hotels") {
      payload = {
        ...payload,
        destination: formData.hotelCity,
        checkIn: formData.checkIn,
        checkOut: formData.checkOut,
        guests: formData.guests,
        hotelCategory: formData.hotelCategory,
        message: formData.message,
      };
    } else if (activeTab === "cars") {
      payload = {
        ...payload,
        tripType: carTripType,
        pickup: formData.carPickup,
        drop: formData.carDrop,
        date: formData.carDate,
        time: formData.carTime || "Flexible",
        vehicle: formData.carVehicle,
        message: formData.message,
      };
    }


    const whatsappUrl = buildWhatsappUrl(payload, currentTabConfig.heading);
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    setSent(true);
    setIsSubmitting(false);
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <div
      className={`relative w-full rounded-2xl border border-white/20 bg-white/95 backdrop-blur-md shadow-[0_20px_60px_rgba(0,0,0,0.35)] overflow-hidden transition-all ${className}`}
    >
      {/* Header Tabs */}
      <div className="border-b border-gray-200 bg-gray-50/80 px-2 pt-2">
        <div className="flex items-center gap-1 overflow-x-auto pb-2 scrollbar-none sm:gap-1.5">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setActiveTab(tab.id);
                  setErrors({});
                }}
                className={`group flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold tracking-wide transition-all sm:px-3.5 sm:py-2.5 sm:text-sm ${
                  isActive
                    ? "bg-maroon text-white shadow-sm ring-1 ring-maroon"
                    : "text-gray-600 hover:bg-white hover:text-maroon-deep"
                }`}
              >
                <Icon
                  className={`size-4 transition-transform group-hover:scale-110 ${
                    isActive ? "text-gold-light" : "text-gray-500 group-hover:text-maroon"
                  }`}
                  aria-hidden
                />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Form Content Area */}
      <div className="p-4 sm:p-6 lg:p-7">
        {title ? (
          <h3 className="mb-4 font-display text-xl font-bold text-maroon-deep sm:text-2xl">
            {title}
          </h3>
        ) : null}

        {/* Tab Subtitle Banner */}
        <div className="mb-5 flex items-center justify-between border-b border-gray-100 pb-3">
          <p className="text-xs font-medium text-text-dark/70 sm:text-sm">
            {currentTabConfig.subtitle}
          </p>
          <span className="hidden items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-gold-dark sm:inline-flex">
            <ShieldCheck className="size-3.5 text-gold" /> Best Rate Guaranteed
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* TAB 1: HOLIDAYS */}
          {activeTab === "holidays" && (
            <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 sm:gap-4">
              <Field
                label="Destination / Tour"
                htmlFor="destination"
                error={errors.destination}
              >
                <Input
                  id="destination"
                  name="destination"
                  value={formData.destination}
                  onChange={handleChange}
                  placeholder="e.g. Kashmir, Goa, Dubai, Bali..."
                />
              </Field>

              <Field label="Starting From" htmlFor="fromCity">
                <Input
                  id="fromCity"
                  name="fromCity"
                  value={formData.fromCity}
                  onChange={handleChange}
                  placeholder="e.g. Mumbai, Delhi, Pune (or Flexible)"
                />
              </Field>

              <Field
                label="Departure Date"
                htmlFor="departureDate"
                error={errors.departureDate}
              >
                <Input
                  id="departureDate"
                  name="departureDate"
                  type="date"
                  value={formData.departureDate}
                  onChange={handleChange}
                />
              </Field>

              <Field label="Duration" htmlFor="duration">
                <Select
                  id="duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                >
                  <option value="3 Nights / 4 Days">3 Nights / 4 Days</option>
                  <option value="4 Nights / 5 Days">4 Nights / 5 Days</option>
                  <option value="5 Nights / 6 Days">5 Nights / 6 Days</option>
                  <option value="6 Nights / 7 Days">6 Nights / 7 Days</option>
                  <option value="7+ Nights (Extended Tour)">7+ Nights (Extended Tour)</option>
                  <option value="Custom Itinerary">Custom Itinerary</option>
                </Select>
              </Field>

              <Field label="Holiday Type" htmlFor="packageType">
                <Select
                  id="packageType"
                  name="packageType"
                  value={formData.packageType}
                  onChange={handleChange}
                >
                  <option value="Family Vacation">Family Vacation</option>
                  <option value="Honeymoon & Romantic">Honeymoon & Romantic</option>
                  <option value="Beach & Leisure">Beach & Leisure</option>
                  <option value="Hill Station & Mountains">Hill Station & Mountains</option>
                  <option value="Adventure & Wildlife">Adventure & Wildlife</option>
                  <option value="International Holiday">International Holiday</option>
                  <option value="Pilgrimage & Heritage">Pilgrimage & Heritage</option>
                </Select>
              </Field>

              <Field label="Travelers" htmlFor="travellers">
                <Select
                  id="travellers"
                  name="travellers"
                  value={formData.travellers}
                  onChange={handleChange}
                >
                  <option value="1 Adult">1 Adult</option>
                  <option value="2 Adults">2 Adults</option>
                  <option value="2 Adults + 1 Child">2 Adults + 1 Child</option>
                  <option value="2 Adults + 2 Children">2 Adults + 2 Children</option>
                  <option value="Family Group (4-8 Members)">Family Group (4-8 Members)</option>
                  <option value="Large Group (8+ Members)">Large Group (8+ Members)</option>
                </Select>
              </Field>
            </div>
          )}

          {/* TAB 2: FLIGHTS */}
          {activeTab === "flights" && (
            <div className="space-y-4">
              {/* Trip type toggle */}
              <div className="flex items-center gap-3">
                {["One Way", "Round Trip"].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setFlightTripType(type)}
                    className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                      flightTripType === type
                        ? "bg-maroon-deep text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 sm:gap-4">
                <Field
                  label="Flying From"
                  htmlFor="flightFrom"
                  error={errors.flightFrom}
                >
                  <Input
                    id="flightFrom"
                    name="flightFrom"
                    value={formData.flightFrom}
                    onChange={handleChange}
                    placeholder="e.g. Mumbai (BOM) / Delhi (DEL)"
                  />
                </Field>

                <Field
                  label="Flying To"
                  htmlFor="flightTo"
                  error={errors.flightTo}
                >
                  <Input
                    id="flightTo"
                    name="flightTo"
                    value={formData.flightTo}
                    onChange={handleChange}
                    placeholder="e.g. Goa (GOI) / Dubai (DXB)"
                  />
                </Field>

                <Field
                  label="Departure Date"
                  htmlFor="flightDeparture"
                  error={errors.flightDeparture}
                >
                  <Input
                    id="flightDeparture"
                    name="flightDeparture"
                    type="date"
                    value={formData.flightDeparture}
                    onChange={handleChange}
                  />
                </Field>

                {flightTripType === "Round Trip" ? (
                  <Field
                    label="Return Date"
                    htmlFor="flightReturn"
                    error={errors.flightReturn}
                  >
                    <Input
                      id="flightReturn"
                      name="flightReturn"
                      type="date"
                      value={formData.flightReturn}
                      onChange={handleChange}
                    />
                  </Field>
                ) : (
                  <Field label="Cabin Class" htmlFor="flightClass">
                    <Select
                      id="flightClass"
                      name="flightClass"
                      value={formData.flightClass}
                      onChange={handleChange}
                    >
                      <option value="Economy">Economy</option>
                      <option value="Premium Economy">Premium Economy</option>
                      <option value="Business Class">Business Class</option>
                    </Select>
                  </Field>
                )}

                {flightTripType === "Round Trip" && (
                  <Field label="Cabin Class" htmlFor="flightClass">
                    <Select
                      id="flightClass"
                      name="flightClass"
                      value={formData.flightClass}
                      onChange={handleChange}
                    >
                      <option value="Economy">Economy</option>
                      <option value="Premium Economy">Premium Economy</option>
                      <option value="Business Class">Business Class</option>
                    </Select>
                  </Field>
                )}

                <Field label="Passengers" htmlFor="flightPassengers">
                  <Select
                    id="flightPassengers"
                    name="flightPassengers"
                    value={formData.flightPassengers}
                    onChange={handleChange}
                  >
                    <option value="1 Passenger">1 Passenger</option>
                    <option value="2 Passengers">2 Passengers</option>
                    <option value="3 Passengers">3 Passengers</option>
                    <option value="4 Passengers">4 Passengers</option>
                    <option value="5+ Passengers (Group)">5+ Passengers (Group)</option>
                  </Select>
                </Field>
              </div>
            </div>
          )}

          {/* TAB 3: HOTELS */}
          {activeTab === "hotels" && (
            <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 sm:gap-4">
              <Field
                label="City / Hotel / Area"
                htmlFor="hotelCity"
                error={errors.hotelCity}
                className="sm:col-span-2"
              >
                <Input
                  id="hotelCity"
                  name="hotelCity"
                  value={formData.hotelCity}
                  onChange={handleChange}
                  placeholder="e.g. Goa, Jaipur, Manali, Mumbai, Taj Hotel..."
                />
              </Field>

              <Field
                label="Check-in Date"
                htmlFor="checkIn"
                error={errors.checkIn}
              >
                <Input
                  id="checkIn"
                  name="checkIn"
                  type="date"
                  value={formData.checkIn}
                  onChange={handleChange}
                />
              </Field>

              <Field
                label="Check-out Date"
                htmlFor="checkOut"
                error={errors.checkOut}
              >
                <Input
                  id="checkOut"
                  name="checkOut"
                  type="date"
                  value={formData.checkOut}
                  onChange={handleChange}
                />
              </Field>

              <Field label="Guests & Rooms" htmlFor="guests">
                <Select
                  id="guests"
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                >
                  <option value="1 Room, 2 Guests">1 Room, 2 Guests</option>
                  <option value="1 Room, 1 Guest">1 Room, 1 Guest</option>
                  <option value="2 Rooms, 4 Guests">2 Rooms, 4 Guests</option>
                  <option value="3 Rooms, 6 Guests">3 Rooms, 6 Guests</option>
                  <option value="Family Suite (2 Adults, 2 Kids)">Family Suite (2 Adults, 2 Kids)</option>
                  <option value="Group Booking (4+ Rooms)">Group Booking (4+ Rooms)</option>
                </Select>
              </Field>

              <Field label="Hotel Preference" htmlFor="hotelCategory">
                <Select
                  id="hotelCategory"
                  name="hotelCategory"
                  value={formData.hotelCategory}
                  onChange={handleChange}
                >
                  <option value="4 Star Premium">4 Star Premium</option>
                  <option value="5 Star Luxury">5 Star Luxury</option>
                  <option value="3 Star Comfortable">3 Star Comfortable</option>
                  <option value="Resort / Villa / Heritage">Resort / Villa / Heritage</option>
                  <option value="Budget Friendly">Budget Friendly</option>
                </Select>
              </Field>
            </div>
          )}

          {/* TAB 4: CARS (formerly Bus) */}
          {activeTab === "cars" && (
            <div className="space-y-4">
              {/* Trip type selector */}
              <div className="flex flex-wrap items-center gap-2">
                {[
                  "Outstation Round Trip",
                  "Outstation One Way",
                  "Local Hourly Rental",
                  "Airport Transfer",
                ].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setCarTripType(type)}
                    className={`rounded-full px-3.5 py-1 text-xs font-semibold transition-all ${
                      carTripType === type
                        ? "bg-maroon text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 sm:gap-4">
                <Field
                  label="Pickup Location"
                  htmlFor="carPickup"
                  error={errors.carPickup}
                >
                  <Input
                    id="carPickup"
                    name="carPickup"
                    value={formData.carPickup}
                    onChange={handleChange}
                    placeholder="Pickup city or address"
                  />
                </Field>

                <Field
                  label="Drop Destination"
                  htmlFor="carDrop"
                  error={errors.carDrop}
                >
                  <Input
                    id="carDrop"
                    name="carDrop"
                    value={formData.carDrop}
                    onChange={handleChange}
                    placeholder="Destination city or drop location"
                  />
                </Field>

                <Field label="Pickup Date" htmlFor="carDate" error={errors.carDate}>
                  <Input
                    id="carDate"
                    name="carDate"
                    type="date"
                    value={formData.carDate}
                    onChange={handleChange}
                  />
                </Field>

                <Field label="Pickup Time" htmlFor="carTime">
                  <Input
                    id="carTime"
                    name="carTime"
                    type="time"
                    value={formData.carTime}
                    onChange={handleChange}
                  />
                </Field>

                <Field
                  label="Vehicle Model"
                  htmlFor="carVehicle"
                  className="sm:col-span-2"
                >
                  <Select
                    id="carVehicle"
                    name="carVehicle"
                    value={formData.carVehicle}
                    onChange={handleChange}
                  >
                    <option value="Toyota Innova Crysta (6+1 Seater)">Toyota Innova Crysta (6+1 Seater)</option>
                    <option value="Maruti Suzuki Ertiga (6+1 Seater)">Maruti Suzuki Ertiga (6+1 Seater)</option>
                    <option value="Maruti Suzuki Swift Dzire (4+1 Seater)">Maruti Suzuki Swift Dzire (4+1 Seater)</option>
                    <option value="Tempo Traveller (12/17 Seater)">Tempo Traveller (12/17 Seater)</option>
                    <option value="Luxury Sedan (Camry/Mercedes)">Luxury Sedan (Camry/Mercedes)</option>
                  </Select>
                </Field>
              </div>
            </div>
          )}


          {/* Contact Details (Always Visible) */}
          <div className="pt-2 border-t border-gray-100">
            <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 sm:gap-4">
              <Field label="Full Name" htmlFor="name" error={errors.name}>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                />
              </Field>

              <Field label="WhatsApp / Phone Number" htmlFor="phone" error={errors.phone}>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="10-digit mobile number"
                />
              </Field>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <Button
              type="submit"
              variant="gold"
              size="lg"
              className="w-full font-bold shadow-md hover:shadow-lg transition-all"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <Loader2 className="size-4 animate-spin" aria-hidden />
              ) : sent ? (
                <CheckCircle2 className="size-4" aria-hidden />
              ) : (
                <ArrowRight className="size-4" aria-hidden />
              )}
              {sent ? "Opening WhatsApp..." : currentTabConfig.submitText}
            </Button>
            <p className="mt-2 text-center text-[11px] text-gray-500">
              Instant quote & confirmation on WhatsApp • No booking fees
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
