"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { Trash2, Loader2 } from "lucide-react"

export default function DeleteButton({ action, id, confirmMessage = "Delete this item? This cannot be undone." }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState(null)

  const handleDelete = () => {
    if (!window.confirm(confirmMessage)) return
    setError(null)
    startTransition(async () => {
      const result = await action(id)
      if (result?.error) {
        setError(result.error)
      } else {
        router.refresh()
      }
    })
  }

  return (
    <span className="relative inline-flex">
      <button
        type="button"
        onClick={handleDelete}
        disabled={isPending}
        className="text-gray-400 hover:text-red-600 transition-colors disabled:opacity-50"
        title="Delete"
      >
        {isPending ? <Loader2 size={18} className="animate-spin" /> : <Trash2 size={18} />}
      </button>
      {error && (
        <span className="absolute top-full right-0 mt-1 whitespace-nowrap rounded bg-red-600 px-2 py-1 text-xs text-white z-10">
          {error}
        </span>
      )}
    </span>
  )
}
