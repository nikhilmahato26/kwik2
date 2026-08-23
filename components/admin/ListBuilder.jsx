"use client"

import { Plus, Trash2 } from "lucide-react"

export default function ListBuilder({ label, name, items, onChange, placeholder = "" }) {
  const update = (idx, value) => {
    const next = [...items]
    next[idx] = value
    onChange(next)
  }

  const remove = (idx) => {
    onChange(items.filter((_, i) => i !== idx))
  }

  const add = () => {
    onChange([...items, ""])
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-900">{label}</h3>
        <button
          type="button"
          onClick={add}
          className="inline-flex items-center text-sm font-medium text-maroon-deep hover:text-maroon"
        >
          <Plus className="mr-1 size-4" /> Add
        </button>
      </div>

      <div className="space-y-3">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-center gap-3">
            <input
              type="text"
              name={name}
              value={item}
              onChange={(e) => update(idx, e.target.value)}
              placeholder={placeholder}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-maroon-deep sm:text-sm px-3"
            />
            <button
              type="button"
              onClick={() => remove(idx)}
              className="text-gray-400 hover:text-red-500 p-2"
            >
              <Trash2 className="size-4" />
            </button>
          </div>
        ))}
        {items.length === 0 && (
          <p className="text-sm text-gray-400">Nothing added yet.</p>
        )}
      </div>
    </div>
  )
}
