import Link from "next/link";
import { Map, Building2, Car, MessageSquare } from "lucide-react";
import { db } from "@/lib/db";

export const dynamic = 'force-dynamic';

function timeAgo(date) {
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  const units = [
    ["year", 31536000],
    ["month", 2592000],
    ["day", 86400],
    ["hour", 3600],
    ["minute", 60],
  ];
  for (const [name, secs] of units) {
    const value = Math.floor(seconds / secs);
    if (value >= 1) return `${value} ${name}${value > 1 ? "s" : ""} ago`;
  }
  return "just now";
}

export default async function AdminDashboard() {
  const [
    holidayCount,
    hotelCount,
    vehicleCount,
    leadCount,
    newLeadCount,
    recentLeads,
  ] = await Promise.all([
    db.holidayPackage.count(),
    db.hotel.count(),
    db.vehicle.count(),
    db.lead.count(),
    db.lead.count({ where: { status: "new" } }),
    db.lead.findMany({ orderBy: { createdAt: "desc" }, take: 3 }),
  ]);

  const stats = [
    { name: "Total Holiday Packages", value: holidayCount, icon: Map, trend: null },
    { name: "Active Hotels", value: hotelCount, icon: Building2, trend: null },
    { name: "Fleet Vehicles", value: vehicleCount, icon: Car, trend: null },
    { name: "Total Inquiries", value: leadCount, icon: MessageSquare, trend: `${newLeadCount} new` },
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
              {stat.trend && (
                <div className="absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-3 sm:px-6 flex items-center justify-between">
                  <div className="text-xs text-gray-500">{stat.trend}</div>
                </div>
              )}
            </dd>
          </div>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900 font-display">Recent Inquiries</h2>
            <Link href="/admin/inquiries" className="text-xs font-medium text-maroon hover:text-maroon-deep">
              View all
            </Link>
          </div>
          <div className="space-y-4">
            {recentLeads.map((lead) => (
              <div key={lead.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
                <div>
                  <p className="text-sm font-medium text-gray-900">New Inquiry from {lead.name}</p>
                  <p className="text-xs text-gray-500">{lead.source}</p>
                </div>
                <span className="text-xs text-gray-400 whitespace-nowrap">{timeAgo(lead.createdAt)}</span>
              </div>
            ))}
            {recentLeads.length === 0 && (
              <p className="text-sm text-gray-400 text-center py-6">No inquiries yet.</p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4 font-display">System Connections</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
              <div className="flex items-center">
                <div className="h-2 w-2 rounded-full bg-emerald-500 mr-3"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Database</p>
                  <p className="text-xs text-gray-500">Connected</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
              <div className="flex items-center">
                <div className={`h-2 w-2 rounded-full mr-3 ${process.env.CLOUDINARY_URL ? "bg-emerald-500" : "bg-amber-500"}`}></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Cloudinary API</p>
                  <p className="text-xs text-gray-500">{process.env.CLOUDINARY_URL ? "Connected" : "Awaiting API keys"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
