"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  Map,
  Building2,
  Car,
  Settings,
  MessageSquare,
  LogOut,
  Menu,
  X
} from "lucide-react";
import { useState } from "react";
import clsx from "clsx";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Inquiries", href: "/admin/inquiries", icon: MessageSquare },
  { name: "Holidays", href: "/admin/holidays", icon: Map },
  { name: "Hotels", href: "/admin/hotels", icon: Building2 },
  { name: "Fleet", href: "/admin/fleet", icon: Car },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex h-full w-full bg-gray-50 overflow-hidden font-sans">
      {/* Mobile Sidebar Overlay */}
      <div 
        className={clsx(
          "fixed inset-0 z-40 bg-black/50 transition-opacity lg:hidden",
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <aside
        className={clsx(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 lg:relative lg:translate-x-0 flex flex-col",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center justify-between px-6 border-b border-gray-200">
          <Link href="/admin" className="font-display text-xl font-bold text-maroon-deep">
            Kwik2Travels<span className="text-gold text-sm ml-2">ADMIN</span>
          </Link>
          <button className="lg:hidden text-gray-500" onClick={() => setSidebarOpen(false)}>
            <X className="size-6" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={clsx(
                  "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors group",
                  isActive 
                    ? "bg-maroon-deep/10 text-maroon-deep" 
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                )}
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon className={clsx("mr-3 flex-shrink-0 size-5 transition-colors", isActive ? "text-maroon-deep" : "text-gray-400 group-hover:text-gray-600")} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button
            type="button"
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="flex w-full items-center px-4 py-3 text-sm font-medium text-gray-600 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors group"
          >
            <LogOut className="mr-3 size-5 text-gray-400 group-hover:text-red-600 transition-colors" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="flex h-16 flex-shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6 justify-end items-center">
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              {/* Profile dropdown placeholder */}
              <div className="flex items-center gap-x-4 lg:border-l lg:border-gray-200 lg:pl-6">
                <div className="flex items-center gap-x-3">
                  <div className="h-8 w-8 rounded-full bg-maroon text-white flex items-center justify-center text-sm font-bold">
                    AD
                  </div>
                  <span className="hidden lg:flex lg:items-center">
                    <span className="text-sm font-semibold leading-6 text-gray-900" aria-hidden="true">
                      Admin User
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto bg-gray-50 p-4 sm:p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
