"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { updateLeadStatus } from "@/app/admin/actions"

const STATUSES = ["new", "contacted", "converted", "closed"]

const COLORS = {
  new: "bg-amber-50 text-amber-700 ring-amber-600/20",
  contacted: "bg-blue-50 text-blue-700 ring-blue-600/20",
  converted: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  closed: "bg-gray-100 text-gray-600 ring-gray-500/20",
}

export default function LeadStatusSelect({ id, status }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const handleChange = (e) => {
    const value = e.target.value
    startTransition(async () => {
      await updateLeadStatus(id, value)
      router.refresh()
    })
  }

  return (
    <select
      value={status}
      onChange={handleChange}
      disabled={isPending}
      className={`text-xs font-medium rounded-md px-2 py-1 ring-1 ring-inset capitalize border-0 focus:ring-2 focus:ring-maroon-deep disabled:opacity-50 ${COLORS[status] || COLORS.new}`}
    >
      {STATUSES.map((s) => (
        <option key={s} value={s}>{s}</option>
      ))}
    </select>
  )
}
