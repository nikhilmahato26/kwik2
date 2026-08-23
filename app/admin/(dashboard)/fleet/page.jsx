import { db } from "@/lib/db";
import Link from "next/link";
import { Plus, Edit } from "lucide-react";
import { deleteVehicle } from "@/app/admin/actions";
import DeleteButton from "@/components/admin/DeleteButton";

export const dynamic = 'force-dynamic';

export default async function FleetAdminPage() {
  const vehicles = await db.vehicle.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Fleet Management</h1>
          <p className="mt-1 text-gray-500">Manage your available vehicles for rent.</p>
        </div>
        <Link 
          href="/admin/fleet/new" 
          className="flex items-center space-x-2 bg-maroon-deep text-white px-4 py-2 rounded-lg hover:bg-maroon transition-colors"
        >
          <Plus size={20} />
          <span>Add Vehicle</span>
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-sm font-semibold text-gray-700">Image</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-700">Vehicle Name</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-700">Description</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-700 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {vehicles.map((vehicle) => (
              <tr key={vehicle.id} className="hover:bg-gray-50/50">
                <td className="px-6 py-4">
                  <div className="h-16 w-24 rounded overflow-hidden bg-gray-100">
                    <img 
                      src={vehicle.image} 
                      alt={vehicle.name} 
                      className="h-full w-full object-cover" 
                    />
                  </div>
                </td>
                <td className="px-6 py-4 font-medium text-gray-900">{vehicle.name}</td>
                <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{vehicle.description}</td>
                <td className="px-6 py-4 text-right space-x-3">
                  <Link
                    href={`/admin/fleet/${vehicle.id}/edit`}
                    className="inline-flex text-gray-400 hover:text-blue-600 transition-colors"
                  >
                    <Edit size={18} />
                  </Link>
                  <DeleteButton
                    action={deleteVehicle}
                    id={vehicle.id}
                    confirmMessage={`Delete "${vehicle.name}"? This cannot be undone.`}
                  />
                </td>
              </tr>
            ))}
            {vehicles.length === 0 && (
              <tr>
                <td colSpan="4" className="px-6 py-12 text-center text-gray-500">
                  No vehicles found. Click "Add Vehicle" to create one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
