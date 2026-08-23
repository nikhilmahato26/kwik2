"use server"

import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { toTitleCase } from "@/lib/utils"

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "")
}

function parseListField(formData, name) {
  return formData
    .getAll(name)
    .map((v) => v.toString().trim())
    .filter(Boolean)
}

export async function getSettings() {
  const settings = await db.siteSetting.findMany()
  const settingsMap = {}
  settings.forEach(s => {
    settingsMap[s.key] = s.value
  })
  return settingsMap
}

export async function updateSettings(formData) {
  const keys = ['name', 'tagline', 'slogan', 'phoneDisplay', 'phoneTel', 'whatsapp']

  for (const key of keys) {
    let value = formData.get(key)
    if (value !== null) {
      let strValue = value.toString()
      if (['name', 'tagline', 'slogan'].includes(key)) {
        strValue = toTitleCase(strValue)
      }

      await db.siteSetting.upsert({
        where: { key },
        update: { value: strValue },
        create: { key, value: strValue },
      })
    }
  }

  revalidatePath("/", "layout")
  revalidatePath("/admin")
  return { success: true }
}

// ---------------- Fleet ----------------

export async function addVehicle(formData) {
  const name = formData.get("name")
  const description = formData.get("description")
  const image = formData.get("image")

  if (!name || !description || !image) {
    return { error: "Name, description, and image are required." }
  }

  const slug = slugify(name)

  try {
    await db.vehicle.create({
      data: {
        slug,
        name: toTitleCase(name),
        description,
        image,
      }
    })

    revalidatePath("/")
    revalidatePath("/fleet")
    revalidatePath("/admin/fleet")

    return { success: true }
  } catch (error) {
    console.error("Add vehicle error:", error)
    if (error.code === 'P2002') {
      return { error: "A vehicle with a similar name already exists." }
    }
    return { error: "Failed to add vehicle. Please try again." }
  }
}

export async function updateVehicle(id, formData) {
  const name = formData.get("name")
  const description = formData.get("description")
  const image = formData.get("image")

  if (!name || !description || !image) {
    return { error: "Name, description, and image are required." }
  }

  try {
    await db.vehicle.update({
      where: { id },
      data: {
        name: toTitleCase(name),
        description,
        image,
      }
    })

    revalidatePath("/")
    revalidatePath("/fleet")
    revalidatePath("/admin/fleet")

    return { success: true }
  } catch (error) {
    console.error("Update vehicle error:", error)
    return { error: "Failed to update vehicle. Please try again." }
  }
}

export async function deleteVehicle(id) {
  try {
    await db.vehicle.delete({ where: { id } })
    revalidatePath("/")
    revalidatePath("/fleet")
    revalidatePath("/admin/fleet")
    return { success: true }
  } catch (error) {
    console.error("Delete vehicle error:", error)
    return { error: "Failed to delete vehicle." }
  }
}

// ---------------- Holiday Packages ----------------

function buildHolidayData(formData) {
  const pricingKeys = formData.getAll("pricingKey")
  const pricingValues = formData.getAll("pricingValue")
  const pricing = {}
  pricingKeys.forEach((k, i) => {
    const key = k.toString().trim()
    const val = pricingValues[i]?.toString().trim()
    if (key && val) pricing[key] = val
  })

  const dayTitles = formData.getAll("itineraryTitle")
  const dayDescriptions = formData.getAll("itineraryDescription")
  const itinerary = dayTitles
    .map((title, i) => ({
      day: `Day ${i + 1}`,
      title: title.toString().trim(),
      description: dayDescriptions[i]?.toString().trim() || "",
    }))
    .filter((d) => d.title)

  return {
    title: toTitleCase(formData.get("title")?.toString().trim() || ""),
    originCity: toTitleCase(formData.get("originCity")?.toString().trim() || ""),
    placesCovered: formData.get("placesCovered")?.toString().trim() || "",
    validity: formData.get("validity")?.toString().trim() || "",
    duration: formData.get("duration")?.toString().trim() || "",
    category: formData.get("category")?.toString().trim() || "",
    hotels: formData.get("hotels")?.toString().trim() || "",
    startingPrice: parseFloat(formData.get("startingPrice")) || 0,
    image: formData.get("image")?.toString().trim() || "",
    pricing,
    itinerary,
    inclusions: parseListField(formData, "inclusions"),
    exclusions: parseListField(formData, "exclusions"),
    terms: parseListField(formData, "terms"),
  }
}

export async function addHolidayPackage(formData) {
  const data = buildHolidayData(formData)

  if (!data.title || !data.image || !data.category) {
    return { error: "Title, category, and image are required." }
  }

  try {
    await db.holidayPackage.create({
      data: { ...data, slug: slugify(data.title) },
    })

    revalidatePath("/")
    revalidatePath("/holidays")
    revalidatePath("/admin/holidays")

    return { success: true }
  } catch (error) {
    console.error("Add holiday package error:", error)
    if (error.code === 'P2002') {
      return { error: "A package with a similar title already exists." }
    }
    return { error: "Failed to add package. Please try again." }
  }
}

export async function updateHolidayPackage(id, formData) {
  const data = buildHolidayData(formData)

  if (!data.title || !data.image || !data.category) {
    return { error: "Title, category, and image are required." }
  }

  try {
    await db.holidayPackage.update({
      where: { id },
      data,
    })

    revalidatePath("/")
    revalidatePath("/holidays")
    revalidatePath("/admin/holidays")

    return { success: true }
  } catch (error) {
    console.error("Update holiday package error:", error)
    return { error: "Failed to update package. Please try again." }
  }
}

export async function deleteHolidayPackage(id) {
  try {
    await db.holidayPackage.delete({ where: { id } })
    revalidatePath("/")
    revalidatePath("/holidays")
    revalidatePath("/admin/holidays")
    return { success: true }
  } catch (error) {
    console.error("Delete holiday package error:", error)
    return { error: "Failed to delete package." }
  }
}

// ---------------- Hotels ----------------

function buildHotelData(formData) {
  return {
    title: toTitleCase(formData.get("title")?.toString().trim() || ""),
    location: toTitleCase(formData.get("location")?.toString().trim() || ""),
    starRating: parseInt(formData.get("starRating"), 10) || 5,
    startingPrice: parseFloat(formData.get("startingPrice")) || 0,
    image: formData.get("image")?.toString().trim() || "",
    description: formData.get("description")?.toString().trim() || "",
    amenities: parseListField(formData, "amenities"),
    terms: parseListField(formData, "terms"),
  }
}

export async function addHotel(formData) {
  const data = buildHotelData(formData)

  if (!data.title || !data.image || !data.location) {
    return { error: "Hotel name, location, and image are required." }
  }

  try {
    await db.hotel.create({
      data: { ...data, slug: slugify(data.title) },
    })

    revalidatePath("/")
    revalidatePath("/hotels")
    revalidatePath("/admin/hotels")

    return { success: true }
  } catch (error) {
    console.error("Add hotel error:", error)
    if (error.code === 'P2002') {
      return { error: "A hotel with a similar name already exists." }
    }
    return { error: "Failed to add hotel. Please try again." }
  }
}

export async function updateHotel(id, formData) {
  const data = buildHotelData(formData)

  if (!data.title || !data.image || !data.location) {
    return { error: "Hotel name, location, and image are required." }
  }

  try {
    await db.hotel.update({
      where: { id },
      data,
    })

    revalidatePath("/")
    revalidatePath("/hotels")
    revalidatePath("/admin/hotels")

    return { success: true }
  } catch (error) {
    console.error("Update hotel error:", error)
    return { error: "Failed to update hotel. Please try again." }
  }
}

export async function deleteHotel(id) {
  try {
    await db.hotel.delete({ where: { id } })
    revalidatePath("/")
    revalidatePath("/hotels")
    revalidatePath("/admin/hotels")
    return { success: true }
  } catch (error) {
    console.error("Delete hotel error:", error)
    return { error: "Failed to delete hotel." }
  }
}

// ---------------- Leads ----------------

export async function updateLeadStatus(id, status) {
  try {
    await db.lead.update({ where: { id }, data: { status } })
    revalidatePath("/admin")
    revalidatePath("/admin/inquiries")
    return { success: true }
  } catch (error) {
    console.error("Update lead status error:", error)
    return { error: "Failed to update inquiry." }
  }
}

export async function deleteLead(id) {
  try {
    await db.lead.delete({ where: { id } })
    revalidatePath("/admin")
    revalidatePath("/admin/inquiries")
    return { success: true }
  } catch (error) {
    console.error("Delete lead error:", error)
    return { error: "Failed to delete inquiry." }
  }
}
