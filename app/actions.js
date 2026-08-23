"use server"

import { db } from "@/lib/db"

export async function createLead(source, payload) {
  const { name, phone, ...details } = payload

  if (!name || !phone) {
    return { error: "Name and phone are required." }
  }

  try {
    await db.lead.create({
      data: {
        name,
        phone,
        source,
        details,
      },
    })
    return { success: true }
  } catch (error) {
    console.error("Create lead error:", error)
    return { error: "Failed to save enquiry." }
  }
}
