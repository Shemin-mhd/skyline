"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Shield,
  LayoutDashboard,
  Inbox,
  MessageSquare,
  Layers,
  FileText,
  Building,
  HelpCircle,
  Settings,
  BookOpen,
  Globe,
  LogOut,
  AlertCircle,
  X,
} from "lucide-react";
import { AdminProvider, useAdmin } from "./context/AdminContext";

function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const {
    isAuthenticated,
    emailInput,
    setEmailInput,
    passwordInput,
    setPasswordInput,
    authError,
    handleLogin,
    handleLogout,
    currentDateStr,
    newLeadBanner,
    setNewLeadBanner,
  } = useAdmin();

  // Login Screen if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#070D18] text-white flex items-center justify-center p-4 font-sans selection:bg-white selection:text-black">
        <div className="w-full max-w-md bg-[#0F172A] border border-slate-800 rounded-2xl p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-3">
            <div className="w-12 h-12 bg-white/10 border border-white/20 text-white rounded-xl flex items-center justify-center mx-auto shadow-md">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white">
                Skylink Acoustics Portal
              </h1>
              <p className="text-xs text-slate-400 mt-0.5">
                Admin Control Center
              </p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 bg-slate-900/80 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-white text-xs font-sans transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 bg-slate-900/80 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-white text-xs font-sans transition-colors"
              />
            </div>

            {authError && (
              <div className="p-2.5 bg-slate-800 border border-slate-700 text-white text-xs rounded-lg flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-slate-300" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2.5 bg-white hover:bg-slate-200 text-slate-950 text-xs font-bold uppercase tracking-wider rounded-lg transition-all shadow-md cursor-pointer"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Determine current page title for breadcrumb
  const getPageTitle = () => {
    if (pathname === "/admin") return "Dashboard Overview";
    if (pathname.startsWith("/admin/inquiries")) return "Inquiry Central Bank";
    if (pathname.startsWith("/admin/whatsapp")) return "WhatsApp Clicks Feed";
    if (pathname.startsWith("/admin/services")) return "Services Catalog";
    if (pathname.startsWith("/admin/blog")) return "Blog & Articles CMS";
    if (pathname.startsWith("/admin/cms")) return "Case Studies & Projects CMS";
    if (pathname.startsWith("/admin/contacts")) return "Branches & Contacts";
    if (pathname.startsWith("/admin/faq")) return "FAQ Management";
    if (pathname.startsWith("/admin/settings")) return "General Settings";
    return "Admin Portal";
  };

  const navItems = [
    {
      label: "Dashboard Overview",
      href: "/admin",
      icon: LayoutDashboard,
      badge: null,
      isActive: pathname === "/admin",
    },
    {
      label: "Inquiry Central Bank",
      href: "/admin/inquiries",
      icon: Inbox,
      badge: "Live",
      isActive: pathname.startsWith("/admin/inquiries"),
    },
    {
      label: "WhatsApp Clicks Feed",
      href: "/admin/whatsapp",
      icon: MessageSquare,
      badge: "Tracked",
      isActive: pathname.startsWith("/admin/whatsapp"),
    },
    {
      label: "Acoustic Services Catalog",
      href: "/admin/services",
      icon: Layers,
      badge: null,
      isActive: pathname.startsWith("/admin/services"),
    },
    {
      label: "Blog & Articles CMS",
      href: "/admin/blog",
      icon: BookOpen,
      badge: null,
      isActive: pathname.startsWith("/admin/blog"),
    },
    {
      label: "Case Studies & Projects CMS",
      href: "/admin/cms",
      icon: FileText,
      badge: null,
      isActive: pathname.startsWith("/admin/cms"),
    },
    {
      label: "Bahrain HQ & Contacts",
      href: "/admin/contacts",
      icon: Building,
      badge: null,
      isActive: pathname.startsWith("/admin/contacts"),
    },
    {
      label: "Client FAQ Knowledgebase",
      href: "/admin/faq",
      icon: HelpCircle,
      badge: null,
      isActive: pathname.startsWith("/admin/faq"),
    },
    {
      label: "General Settings",
      href: "/admin/settings",
      icon: Settings,
      badge: "Live",
      isActive: pathname.startsWith("/admin/settings"),
    },
  ];

  return (
    <div className="flex h-screen bg-[#F8FAFC] text-slate-900 font-sans antialiased overflow-hidden selection:bg-slate-900 selection:text-white">
      {/* ── LEFT SIDEBAR ── */}
      <aside className="w-64 bg-[#070D18] text-white flex flex-col justify-between shrink-0 border-r border-slate-800/80 z-30 shadow-xl">
        
        {/* Brand & Portal Identity */}
        <div>
          <div className="h-16 flex items-center gap-3 px-5 border-b border-slate-800/80 bg-slate-950/40">
            <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-white shrink-0">
              <Shield className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <span className="font-bold text-xs tracking-tight text-white block truncate">
                Skylink Acoustics
              </span>
              <span className="text-[10px] text-slate-400 block tracking-wide truncate">
                Admin Control Center
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1 text-xs font-medium">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all ${
                    item.isActive
                      ? "bg-white text-slate-950 font-bold border border-white shadow-xs"
                      : "text-slate-300 hover:bg-slate-800/50 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-3.5 h-3.5 ${item.isActive ? "text-slate-950" : "text-slate-400"}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`px-1.5 py-0.2 text-[9px] font-bold rounded border ${
                        item.isActive
                          ? "bg-slate-900 text-white border-slate-900"
                          : "bg-slate-800 text-slate-300 border-slate-700"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Profile & Logout */}
        <div className="p-3 border-t border-slate-800/60 space-y-2">
          <div className="p-2.5 bg-slate-900/90 rounded-lg border border-slate-800/90 flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white shrink-0">
              <span className="text-[11px] font-bold">SK</span>
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[11px] font-bold text-white truncate">
                Skylink Administrator
              </div>
              <div className="text-[9px] text-slate-400 truncate">
                {emailInput}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between px-1 text-[11px] text-slate-400">
            <Link href="/" className="hover:text-white transition-colors flex items-center gap-1.5">
              <Globe className="w-3 h-3 text-slate-500" />
              <span>Live Website</span>
            </Link>
            <button
              onClick={handleLogout}
              className="text-slate-400 hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
            >
              <LogOut className="w-3 h-3" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* ── RIGHT MAIN VIEWPORT ── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto h-full">
        {/* Top Breadcrumb Bar */}
        <header className="h-14 bg-white border-b border-slate-200/80 px-6 flex items-center justify-between gap-4 sticky top-0 z-20 shadow-2xs">
          <div className="flex items-center gap-1.5 text-xs font-sans text-slate-500">
            <span className="font-semibold text-slate-800">Admin</span>
            <span>&gt;</span>
            <span className="text-slate-600 font-medium">{getPageTitle()}</span>
          </div>

          <div className="text-xs font-sans text-slate-400">
            <span>{currentDateStr}</span>
          </div>
        </header>

        {/* Live Incoming Alert Banner */}
        {newLeadBanner && (
          <div className="bg-slate-900 text-white px-6 py-2 shadow flex items-center justify-between animate-pulse text-xs">
            <div className="flex items-center gap-2 font-medium">
              <span className="w-2 h-2 bg-white rounded-full animate-ping" />
              <span>
                New Live Submission: <strong>{newLeadBanner.name}</strong> &middot; {newLeadBanner.service} ({newLeadBanner.phone})
              </span>
            </div>
            <button onClick={() => setNewLeadBanner(null)} className="p-0.5 hover:bg-white/20 rounded cursor-pointer">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Content Viewport */}
        <div className="p-6 lg:p-7 space-y-5 max-w-[1550px] w-full mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminProvider>
      <AdminShell>{children}</AdminShell>
    </AdminProvider>
  );
}
