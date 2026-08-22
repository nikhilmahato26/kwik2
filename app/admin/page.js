import { Map, Building2, Car, Users, TrendingUp } from "lucide-react";

export default function AdminDashboard() {
  const stats = [
    { name: "Total Holiday Packages", value: "24", icon: Map, trend: "+4 this month" },
    { name: "Active Hotels", value: "12", icon: Building2, trend: "+2 this month" },
    { name: "Fleet Vehicles", value: "8", icon: Car, trend: "No change" },
    { name: "Total Inquiries", value: "156", icon: Users, trend: "+23% from last month" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 font-display">Dashboard Overview</h1>
        <p className="text-gray-500 mt-1 text-sm">Welcome back to the Kwik2Travels Admin Panel.</p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.name} className="relative overflow-hidden rounded-xl bg-white px-4 pb-12 pt-5 shadow-sm border border-gray-100 sm:px-6 sm:pt-6">
            <dt>
              <div className="absolute rounded-lg bg-maroon-deep/10 p-3">
                <stat.icon className="h-6 w-6 text-maroon-deep" aria-hidden="true" />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500">{stat.name}</p>
            </dt>
            <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
              <p className="text-2xl font-bold text-gray-900 font-display">{stat.value}</p>
              <div className="absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-3 sm:px-6 flex items-center justify-between">
                <div className="text-xs text-gray-500 flex items-center">
                  <TrendingUp className="mr-1.5 h-3.5 w-3.5 text-emerald-500" />
                  {stat.trend}
                </div>
              </div>
            </dd>
          </div>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Recent Inquiries Placeholder */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4 font-display">Recent WhatsApp Inquiries</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
                <div>
                  <p className="text-sm font-medium text-gray-900">New Inquiry from Rahul Sharma</p>
                  <p className="text-xs text-gray-500">Interested in: Taj Exotica Resort & Spa</p>
                </div>
                <span className="text-xs text-gray-400">2 hours ago</span>
              </div>
            ))}
          </div>
        </div>

        {/* System Status Placeholder */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4 font-display">System Connections</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
              <div className="flex items-center">
                <div className="h-2 w-2 rounded-full bg-amber-500 mr-3"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Neon Database</p>
                  <p className="text-xs text-gray-500">Awaiting connection string</p>
                </div>
              </div>
              <button className="text-xs font-medium text-maroon hover:text-maroon-deep">Configure</button>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
              <div className="flex items-center">
                <div className="h-2 w-2 rounded-full bg-amber-500 mr-3"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Cloudinary API</p>
                  <p className="text-xs text-gray-500">Awaiting API keys</p>
                </div>
              </div>
              <button className="text-xs font-medium text-maroon hover:text-maroon-deep">Configure</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
