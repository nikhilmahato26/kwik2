import { db } from "./db"

export async function getBusinessData() {
  const siteSettings = await db.siteSetting.findMany()
  const settingsMap = {}
  siteSettings.forEach(s => {
    settingsMap[s.key] = s.value
  })

  const servicesData = await db.service.findMany({
    orderBy: { createdAt: 'asc' }
  })
  
  const featuresData = await db.feature.findMany({
    orderBy: { createdAt: 'asc' }
  })

  const tripTypesData = await db.tripType.findMany({
    orderBy: { createdAt: 'asc' }
  })

  return {
    name: settingsMap.name || "Kwik2Travels",
    tagline: settingsMap.tagline || "Cab & Travel Services",
    slogan: settingsMap.slogan || "We Are Too Quicker",
    logo: settingsMap.logo || "/logo.png",
    phoneDisplay: settingsMap.phoneDisplay || "+91 93291 16616",
    phoneTel: settingsMap.phoneTel || "tel:+919329116616",
    whatsapp: settingsMap.whatsapp || "https://wa.me/919329116616",
    phoneDisplay2: settingsMap.phoneDisplay2 || "+91 62323 22216",
    phoneTel2: settingsMap.phoneTel2 || "tel:+916232322216",
    services: servicesData,
    whyChooseUs: featuresData,
    tripTypes: tripTypesData.map(t => t.name),
    navLinks: [
      { label: "Home", href: "/" },
      { label: "About", href: "/#about" },
      { label: "Holidays", href: "/holidays" },
      { label: "Hotels", href: "/hotels" },
      { label: "Services", href: "/services" },
      { label: "Our Fleet", href: "/fleet" },
      { label: "Booking", href: "/booking" },
      { label: "Contact", href: "/contact" },
    ],
  }
}

export async function getVehicles() {
  return await db.vehicle.findMany({
    orderBy: { createdAt: 'asc' }
  })
}

export async function getHolidayCollections() {
  return await db.holidayCollection.findMany({
    orderBy: { createdAt: 'asc' }
  })
}

export async function getHolidayPackages() {
  return await db.holidayPackage.findMany({
    orderBy: { createdAt: 'asc' }
  })
}

export async function getHolidayPackageBySlug(slug) {
  return await db.holidayPackage.findUnique({
    where: { slug }
  })
}

export async function getHotels() {
  return await db.hotel.findMany({
    orderBy: { createdAt: 'asc' }
  })
}

export async function getHotelBySlug(slug) {
  return await db.hotel.findUnique({
    where: { slug }
  })
}
