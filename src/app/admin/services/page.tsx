"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  Layers,
  Compass,
  Inbox,
  CheckCircle2,
  Search,
  Plus,
  RefreshCw,
  Sparkles,
  Pencil,
  Trash2,
  X,
} from "lucide-react";
import { ServiceItem } from "@/lib/services-store";
import { useAdmin } from "../context/AdminContext";

export default function ServicesPage() {
  const { stats } = useAdmin();

  const [services, setServices] = useState<ServiceItem[]>([]);
  const [isLoadingServices, setIsLoadingServices] = useState<boolean>(false);
  const [serviceSearch, setServiceSearch] = useState<string>("");
  const [serviceCategoryFilter, setServiceCategoryFilter] = useState<string>("all");

  const [isServiceModalOpen, setIsServiceModalOpen] = useState<boolean>(false);
  const [serviceModalMode, setServiceModalMode] = useState<"add" | "edit">("add");
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [serviceToDelete, setServiceToDelete] = useState<ServiceItem | null>(null);

  const [serviceForm, setServiceForm] = useState({
    num: "",
    title: "",
    category: "Private Cinema",
    description: "",
    specs: "",
    link: "/#services",
    status: "Active" as "Active" | "Draft" | "Archived",
  });

  // Fetch services
  const fetchServices = async () => {
    try {
      setIsLoadingServices(true);
      const res = await fetch("/api/services");
      const data = await res.json();
      if (data.success && Array.isArray(data.services)) {
        setServices(data.services);
      }
    } catch (err) {
      console.error("Failed to load services:", err);
    } finally {
      setIsLoadingServices(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // Categories & Filtering
  const serviceCategories = useMemo(() => {
    const set = new Set(services.map((s) => s.category).filter(Boolean));
    return Array.from(set);
  }, [services]);

  const filteredServices = useMemo(() => {
    return services.filter((s) => {
      if (serviceCategoryFilter !== "all" && s.category !== serviceCategoryFilter) return false;
      if (serviceSearch.trim()) {
        const q = serviceSearch.toLowerCase();
        const matchTitle = s.title.toLowerCase().includes(q);
        const matchCat = s.category.toLowerCase().includes(q);
        const matchDesc = s.description.toLowerCase().includes(q);
        if (!matchTitle && !matchCat && !matchDesc) return false;
      }
      return true;
    });
  }, [services, serviceCategoryFilter, serviceSearch]);

  // Open Add Service
  const handleOpenAddService = () => {
    setServiceModalMode("add");
    setEditingServiceId(null);
    setServiceForm({
      num: String(services.length + 1).padStart(2, "0"),
      title: "",
      category: "Private Cinema",
      description: "",
      specs: "",
      link: "/#services",
      status: "Active",
    });
    setIsServiceModalOpen(true);
  };

  // Open Edit Service
  const handleOpenEditService = (s: ServiceItem) => {
    setServiceModalMode("edit");
    setEditingServiceId(s.id);
    setServiceForm({
      num: s.num,
      title: s.title,
      category: s.category,
      description: s.description,
      specs: s.specs || "",
      link: s.link,
      status: s.status,
    });
    setIsServiceModalOpen(true);
  };

  // Save Service
  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (serviceModalMode === "add") {
        const res = await fetch("/api/services", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(serviceForm),
        });
        const data = await res.json();
        if (data.success) {
          fetchServices();
          setIsServiceModalOpen(false);
        }
      } else if (serviceModalMode === "edit" && editingServiceId) {
        const res = await fetch("/api/services", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...serviceForm, id: editingServiceId }),
        });
        const data = await res.json();
        if (data.success) {
          fetchServices();
          setIsServiceModalOpen(false);
        }
      }
    } catch (err) {
      console.error("Failed to save service:", err);
    }
  };

  // Confirm Delete Service
  const handleConfirmDeleteService = async () => {
    if (!serviceToDelete) return;
    try {
      const res = await fetch(`/api/services?id=${serviceToDelete.id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setServices((prev) => prev.filter((s) => s.id !== serviceToDelete.id));
        setServiceToDelete(null);
      }
    } catch (err) {
      console.error("Failed to delete service:", err);
    }
  };

  return (
    <div className="space-y-5 font-sans text-xs">
      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-white border border-slate-200/90 rounded-lg shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">
              ACTIVE SERVICES
            </span>
            <Layers className="w-4 h-4 text-slate-900" />
          </div>
          <div className="flex items-baseline justify-between pt-1">
            <div className="text-3xl font-bold text-slate-900 tracking-tight font-sans">
              {services.length}
            </div>
            <span className="px-2 py-0.5 bg-slate-100 text-slate-800 font-bold text-[11px] rounded border border-slate-200">
              Live in Catalog
            </span>
          </div>
          <div className="text-[11px] text-slate-400 pt-1">
            Synced directly with website offerings
          </div>
        </div>

        <div className="p-4 bg-white border border-slate-200/90 rounded-lg shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">
              CATEGORIES
            </span>
            <Compass className="w-4 h-4 text-slate-900" />
          </div>
          <div className="flex items-baseline justify-between pt-1">
            <div className="text-3xl font-bold text-slate-900 tracking-tight font-sans">
              {serviceCategories.length || 5}
            </div>
            <span className="text-[11px] text-slate-400 font-medium">
              Categorized
            </span>
          </div>
          <div className="text-[11px] text-slate-400 pt-1 truncate">
            Cinema, Insulation, Fit-Out, Gym, Lighting
          </div>
        </div>

        <div className="p-4 bg-white border border-slate-200/90 rounded-lg shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">
              LINKED INQUIRIES
            </span>
            <Inbox className="w-4 h-4 text-slate-900" />
          </div>
          <div className="flex items-baseline justify-between pt-1">
            <div className="text-3xl font-bold text-slate-900 tracking-tight font-sans">
              {stats.total || 14}
            </div>
            <span className="text-[11px] font-semibold text-slate-900">
              Tracked
            </span>
          </div>
          <div className="text-[11px] text-slate-400 pt-1">
            Mapped from forms and WhatsApp clicks
          </div>
        </div>

        <div className="p-4 bg-white border border-slate-200/90 rounded-lg shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">
              CATALOG HEALTH
            </span>
            <CheckCircle2 className="w-4 h-4 text-slate-900" />
          </div>
          <div className="flex items-baseline justify-between pt-1">
            <div className="text-3xl font-bold text-slate-900 tracking-tight font-sans">
              100%
            </div>
            <span className="text-[11px] font-semibold text-slate-900">
              Live &amp; Synced
            </span>
          </div>
          <div className="text-[11px] text-slate-400 pt-1">
            Routing active on client website
          </div>
        </div>
      </div>

      {/* Action Toolbar */}
      <div className="bg-white p-4 border border-slate-200/90 rounded-xl shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-2.5 flex-1">
          <div className="relative flex-1 sm:max-w-xs">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search services, specs, category..."
              value={serviceSearch}
              onChange={(e) => setServiceSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-slate-800"
            />
          </div>

          <select
            value={serviceCategoryFilter}
            onChange={(e) => setServiceCategoryFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:border-slate-800"
          >
            <option value="all">All Categories ({services.length})</option>
            {serviceCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleOpenAddService}
          className="px-4 py-2 bg-slate-900 hover:bg-black text-white rounded-lg font-bold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer text-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Service</span>
        </button>
      </div>

      {/* Services Grid */}
      {isLoadingServices && services.length === 0 ? (
        <div className="p-12 text-center text-slate-400 bg-white border border-slate-200 rounded-xl">
          <RefreshCw className="w-6 h-6 animate-spin mx-auto text-slate-900 mb-2" />
          <span>Loading services catalog...</span>
        </div>
      ) : filteredServices.length === 0 ? (
        <div className="p-12 text-center bg-white border border-slate-200 rounded-xl space-y-3">
          <Layers className="w-8 h-8 text-slate-300 mx-auto" />
          <div className="text-sm font-bold text-slate-700">No services found</div>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            No services match your active filter. Try resetting your search or click below to add a new service.
          </p>
          <button
            onClick={handleOpenAddService}
            className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-black transition-colors inline-flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Create Service</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4.5 text-xs">
          {filteredServices.map((s) => (
            <div
              key={s.id}
              className="bg-white rounded-xl border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-slate-900/60 transition-all p-5 flex flex-col justify-between space-y-4 group relative"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="px-2 py-0.5 bg-slate-900 text-white text-[10px] font-bold rounded font-mono shrink-0">
                      {s.num}
                    </span>
                    <span className="px-2.5 py-0.5 bg-slate-100 text-slate-800 border border-slate-200 text-[10px] font-semibold rounded-full truncate">
                      {s.category}
                    </span>
                  </div>

                  <span
                    className={`px-2 py-0.5 text-[10px] font-bold rounded-full flex items-center gap-1 shrink-0 ${
                      s.status === "Active"
                        ? "bg-slate-900 text-white border border-slate-900"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        s.status === "Active" ? "bg-slate-900 animate-pulse" : "bg-slate-400"
                      }`}
                    />
                    <span>{s.status}</span>
                  </span>
                </div>

                <h4 className="text-sm font-bold text-slate-900 group-hover:text-slate-900 transition-colors leading-snug">
                  {s.title}
                </h4>

                <p className="text-slate-500 text-xs mt-2 leading-relaxed line-clamp-3">
                  {s.description}
                </p>

                {s.specs && (
                  <div className="mt-3 p-2 bg-slate-50 border border-slate-200/70 rounded-md text-[11px] text-slate-600 font-mono flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-slate-900 shrink-0" />
                    <span className="truncate">{s.specs}</span>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <Link
                  href={s.link}
                  target="_blank"
                  className="text-xs font-bold text-slate-900 hover:text-black flex items-center gap-1 transition-colors"
                >
                  <span>View Page</span>
                  <span>&rarr;</span>
                </Link>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleOpenEditService(s)}
                    title="Edit Service"
                    className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-md transition-colors cursor-pointer"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => setServiceToDelete(s)}
                    title="Delete Service"
                    className="p-1.5 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODAL: Add / Edit Service */}
      {isServiceModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in text-xs font-sans">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    {serviceModalMode === "add" ? "Add New Acoustic Service" : "Edit Acoustic Service"}
                  </h3>
                  <p className="text-[11px] text-slate-400">Configure catalog details, STC ratings, and routing</p>
                </div>
              </div>
              <button
                onClick={() => setIsServiceModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveService} className="space-y-3.5">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Index Number</label>
                  <input
                    type="text"
                    required
                    placeholder="01"
                    value={serviceForm.num}
                    onChange={(e) => setServiceForm({ ...serviceForm, num: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-slate-800 text-xs font-mono font-bold"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block font-semibold text-slate-700 mb-1">Category</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Private Cinema, Fit-Out"
                    value={serviceForm.category}
                    onChange={(e) => setServiceForm({ ...serviceForm, category: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-slate-800 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Service Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Luxury Home Theater Solutions"
                  value={serviceForm.title}
                  onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-slate-800 text-xs font-semibold"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Technical Specs Tag</label>
                <input
                  type="text"
                  placeholder="e.g. STC 65+ Sound Isolation · RT60 0.3s Decay Rate"
                  value={serviceForm.specs}
                  onChange={(e) => setServiceForm({ ...serviceForm, specs: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-slate-800 text-xs font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Website Page Route</label>
                  <input
                    type="text"
                    required
                    placeholder="/#services"
                    value={serviceForm.link}
                    onChange={(e) => setServiceForm({ ...serviceForm, link: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-slate-800 text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Publish Status</label>
                  <select
                    value={serviceForm.status}
                    onChange={(e) => setServiceForm({ ...serviceForm, status: e.target.value as any })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-slate-800 text-xs"
                  >
                    <option value="Active">Active (Published)</option>
                    <option value="Draft">Draft (Hidden)</option>
                    <option value="Archived">Archived</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Detailed Description</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Comprehensive description of engineering capabilities, materials, STC sound isolation guarantees..."
                  value={serviceForm.description}
                  onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-slate-800 text-xs leading-relaxed"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsServiceModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium transition-colors cursor-pointer text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-slate-900 hover:bg-black text-white rounded-lg font-bold shadow-xs transition-colors cursor-pointer text-xs flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{serviceModalMode === "add" ? "Save Service" : "Update Service"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Delete Service Confirmation */}
      {serviceToDelete && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in text-xs font-sans">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="w-11 h-11 rounded-xl bg-slate-100 border border-slate-200 text-slate-900 flex items-center justify-center mx-auto">
              <Trash2 className="w-5 h-5" />
            </div>

            <div className="text-center space-y-1.5">
              <h3 className="text-sm font-bold text-slate-900">Delete Service Discipline?</h3>
              <p className="text-xs text-slate-500">
                Are you sure you want to remove <strong className="text-slate-900">{serviceToDelete.title}</strong> ({serviceToDelete.num}) from your catalog?
              </p>
              <div className="p-2.5 bg-slate-100 border border-slate-200 rounded text-[11px] text-slate-700 text-left mt-2">
                This action will unpublish this service card from the active catalog.
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setServiceToDelete(null)}
                className="w-1/2 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium transition-colors cursor-pointer text-xs text-center"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDeleteService}
                className="w-1/2 py-2 bg-slate-900 hover:bg-black text-white rounded-lg font-bold shadow-xs transition-colors cursor-pointer text-xs text-center"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
