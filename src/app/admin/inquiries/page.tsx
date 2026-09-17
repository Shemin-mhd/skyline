"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  Plus,
  Download,
  FileText,
  Trash2,
  X,
  MessageSquare,
  CheckCircle2,
} from "lucide-react";
import { Lead, LeadStatus, LeadType } from "@/lib/leads-store";
import { useAdmin } from "../context/AdminContext";

export default function InquiriesPage() {
  const { leads, setLeads, fetchLeads } = useAdmin();

  // Filters & Search
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [serviceFilter, setServiceFilter] = useState<string>("all");

  // Notes Modal
  const [selectedLeadForNotes, setSelectedLeadForNotes] = useState<Lead | null>(null);
  const [newNoteText, setNewNoteText] = useState<string>("");

  // Add Lead Modal
  const [isAddLeadModalOpen, setIsAddLeadModalOpen] = useState<boolean>(false);
  const [newLeadForm, setNewLeadForm] = useState({
    name: "",
    phone: "",
    email: "",
    company: "",
    service: "Luxury Home Theater Solutions",
    type: "manual" as LeadType,
    message: "",
  });

  // Filtered Leads
  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      if (statusFilter !== "all" && lead.status !== statusFilter) return false;
      if (serviceFilter !== "all" && lead.service !== serviceFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = lead.name.toLowerCase().includes(q);
        const matchPhone = lead.phone.toLowerCase().includes(q);
        const matchEmail = (lead.email || "").toLowerCase().includes(q);
        const matchComp = (lead.company || "").toLowerCase().includes(q);
        const matchMsg = (lead.message || "").toLowerCase().includes(q);
        const matchService = lead.service.toLowerCase().includes(q);
        if (!matchName && !matchPhone && !matchEmail && !matchComp && !matchMsg && !matchService) {
          return false;
        }
      }
      return true;
    });
  }, [leads, statusFilter, serviceFilter, searchQuery]);

  // Format date helper
  const formatShortDate = (iso: string) => {
    try {
      const d = new Date(iso);
      return d.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
    } catch {
      return iso;
    }
  };

  // WhatsApp reply link
  const getWhatsAppReplyLink = (lead: Lead) => {
    const cleanPhone = lead.phone.replace(/[^0-9]/g, "");
    const greeting = encodeURIComponent(
      `Hello ${lead.name}, this is Skylink Acoustics. Thank you for your inquiry regarding "${lead.service}". How can we assist with your acoustic project?`
    );
    return cleanPhone ? `https://wa.me/${cleanPhone}?text=${greeting}` : `https://wa.me/97333048555`;
  };

  // Change lead status
  const handleStatusChange = async (leadId: string, newStatus: LeadStatus) => {
    try {
      const res = await fetch(`/api/leads/${leadId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setLeads((prev) =>
          prev.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l))
        );
        fetchLeads();
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  // Add staff note
  const handleAddNote = async (leadId: string) => {
    if (!newNoteText.trim()) return;
    try {
      const res = await fetch(`/api/leads/${leadId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ note: newNoteText.trim() }),
      });
      const data = await res.json();
      if (data.success) {
        setLeads((prev) => prev.map((l) => (l.id === leadId ? data.lead : l)));
        setSelectedLeadForNotes(data.lead);
        setNewNoteText("");
      }
    } catch (err) {
      console.error("Failed to add note:", err);
    }
  };

  // Delete lead
  const handleDeleteLead = async (leadId: string) => {
    if (!window.confirm("Delete this lead record permanently?")) return;
    try {
      const res = await fetch(`/api/leads/${leadId}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setLeads((prev) => prev.filter((l) => l.id !== leadId));
        fetchLeads();
      }
    } catch (err) {
      console.error("Failed to delete lead:", err);
    }
  };

  // Manual lead creation
  const handleCreateManualLead = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newLeadForm,
          source: "Manual Staff Entry",
        }),
      });
      const data = await res.json();
      if (data.success) {
        setIsAddLeadModalOpen(false);
        setNewLeadForm({
          name: "",
          phone: "",
          email: "",
          company: "",
          service: "Luxury Home Theater Solutions",
          type: "manual",
          message: "",
        });
        fetchLeads();
      }
    } catch (err) {
      console.error("Failed to create manual lead:", err);
    }
  };

  // Export CSV
  const handleExportCSV = () => {
    if (leads.length === 0) return;
    const headers = ["ID", "Type", "Status", "Client Name", "Phone", "Email", "Company", "Service", "Message", "Source", "Date Created"];
    const rows = filteredLeads.map((l) => [
      l.id,
      l.type,
      l.status,
      `"${l.name.replace(/"/g, '""')}"`,
      `"${l.phone}"`,
      `"${l.email || ""}"`,
      `"${l.company || ""}"`,
      `"${l.service}"`,
      `"${(l.message || "").replace(/"/g, '""')}"`,
      `"${l.source}"`,
      `"${new Date(l.createdAt).toLocaleString()}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `skylink_inquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-4 font-sans text-xs">
      {/* Controls Bar */}
      <div className="bg-white p-4 border border-slate-200 rounded-lg shadow-2xs flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2.5 flex-1">
          <div className="relative flex-1 sm:max-w-xs">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search inquiries, clients, phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded text-xs focus:outline-none focus:border-slate-800"
            />
          </div>

          <select
            value={serviceFilter}
            onChange={(e) => setServiceFilter(e.target.value)}
            className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded text-xs text-slate-800"
          >
            <option value="all">All Disciplines</option>
            <option value="Luxury Home Theater Solutions">Home Theater</option>
            <option value="Hotel & Apartment Acoustic Insulation">Hotel & Apartment</option>
            <option value="Acoustic Treatment for New Buildings">New Buildings</option>
            <option value="Residential & Commercial Fit-Out Solutions">Fit-Out Solutions</option>
            <option value="Gym Floor Acoustic Insulation">Gym Floor</option>
            <option value="Starry Sky Luxury Lighting">Starry Sky</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded text-xs text-slate-800"
          >
            <option value="all">All Statuses</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="in_discussion">In Discussion</option>
            <option value="won">Won Project</option>
            <option value="closed">Closed</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAddLeadModalOpen(true)}
            className="inline-flex items-center gap-1 px-3 py-1.5 bg-slate-900 hover:bg-black text-white text-xs font-semibold rounded cursor-pointer transition-colors shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Lead</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1 px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 text-xs font-semibold rounded cursor-pointer transition-colors shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Inquiries Table */}
      <div className="bg-white border border-slate-200 rounded-lg shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400 bg-slate-50/50">
                <th className="py-3 px-5">Client &amp; Contact</th>
                <th className="py-3 px-5">Service</th>
                <th className="py-3 px-5">Source</th>
                <th className="py-3 px-5">Message / Notes</th>
                <th className="py-3 px-5">Status</th>
                <th className="py-3 px-5">Date</th>
                <th className="py-3 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400">
                    No client inquiries found matching current filters.
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-5">
                      <div className="font-bold text-slate-900">{lead.name}</div>
                      <div className="text-slate-400 text-[11px]">{lead.phone || "No phone"}</div>
                    </td>
                    <td className="py-3.5 px-5 font-medium text-slate-800">{lead.service}</td>
                    <td className="py-3.5 px-5 text-slate-500 text-[11px]">{lead.source}</td>
                    <td className="py-3.5 px-5 max-w-xs text-slate-600">
                      <p className="line-clamp-2">{lead.message || "No message"}</p>
                      {lead.notes && lead.notes.length > 0 && (
                        <div className="text-[10px] text-slate-700 font-semibold mt-0.5">
                          {lead.notes.length} internal note(s)
                        </div>
                      )}
                    </td>
                    <td className="py-3.5 px-5">
                      <select
                        value={lead.status}
                        onChange={(e) => handleStatusChange(lead.id, e.target.value as LeadStatus)}
                        className="px-2 py-1 border border-slate-200 rounded text-[11px] font-semibold bg-white cursor-pointer focus:border-slate-900"
                      >
                        <option value="new">● New</option>
                        <option value="contacted">● Contacted</option>
                        <option value="in_discussion">● In Discussion</option>
                        <option value="won">● Won Project</option>
                        <option value="closed">● Closed</option>
                      </select>
                    </td>
                    <td className="py-3.5 px-5 text-slate-400 whitespace-nowrap">
                      {formatShortDate(lead.createdAt)}
                    </td>
                    <td className="py-3.5 px-5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <a
                          href={getWhatsAppReplyLink(lead)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2.5 py-0.5 border border-slate-300 text-slate-900 rounded text-[11px] font-bold hover:bg-slate-900 hover:text-white transition-colors"
                        >
                          WhatsApp
                        </a>
                        <button
                          onClick={() => setSelectedLeadForNotes(lead)}
                          className="p-1 text-slate-400 hover:text-slate-800 cursor-pointer"
                          title="Add Notes"
                        >
                          <FileText className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteLead(lead.id)}
                          className="p-1 text-slate-400 hover:text-slate-900 cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Notes */}
      {selectedLeadForNotes && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 text-xs font-sans">
          <div className="w-full max-w-md bg-white rounded-xl p-5 shadow-xl space-y-3 border border-slate-200">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="font-bold text-slate-900">Follow-Up Notes: {selectedLeadForNotes.name}</span>
              <button onClick={() => setSelectedLeadForNotes(null)} className="text-slate-400 hover:text-black">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-1.5 max-h-40 overflow-y-auto">
              {selectedLeadForNotes.notes && selectedLeadForNotes.notes.length > 0 ? (
                selectedLeadForNotes.notes.map((n, i) => (
                  <div key={i} className="p-2 bg-slate-50 rounded border border-slate-200 text-slate-700">{n}</div>
                ))
              ) : (
                <div className="text-slate-400 italic">No notes logged yet.</div>
              )}
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-100">
              <textarea
                rows={2}
                placeholder="Type note (e.g. quote sent, follow-up scheduled)..."
                value={newNoteText}
                onChange={(e) => setNewNoteText(e.target.value)}
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded focus:outline-none focus:border-slate-800"
              />
              <div className="flex justify-end gap-1.5">
                <button
                  type="button"
                  onClick={() => setSelectedLeadForNotes(null)}
                  className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded font-medium cursor-pointer"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => handleAddNote(selectedLeadForNotes.id)}
                  className="px-3 py-1 bg-slate-900 hover:bg-black text-white rounded font-bold cursor-pointer"
                >
                  Save Note
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Add Lead Manually */}
      {isAddLeadModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 text-xs font-sans">
          <div className="w-full max-w-md bg-white rounded-xl p-5 shadow-xl space-y-3 border border-slate-200">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="font-bold text-slate-900">Add Customer Inquiry</span>
              <button onClick={() => setIsAddLeadModalOpen(false)} className="text-slate-400 hover:text-black">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateManualLead} className="space-y-2.5">
              <div>
                <label className="font-semibold text-slate-600 block mb-1">Client Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sheikh Khalid Al-Khalifa"
                  value={newLeadForm.name}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, name: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded text-xs focus:outline-none focus:border-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold text-slate-600 block mb-1">Phone *</label>
                  <input
                    type="text"
                    required
                    placeholder="+973 33048555"
                    value={newLeadForm.phone}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, phone: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded text-xs focus:outline-none focus:border-slate-800 font-mono"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-600 block mb-1">Email</label>
                  <input
                    type="email"
                    placeholder="client@domain.bh"
                    value={newLeadForm.email}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, email: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded text-xs focus:outline-none focus:border-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-600 block mb-1">Company / Project</label>
                <input
                  type="text"
                  placeholder="e.g. Private Villa / Diplomatic Hotel"
                  value={newLeadForm.company}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, company: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded text-xs focus:outline-none focus:border-slate-800"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-600 block mb-1">Acoustic Discipline</label>
                <select
                  value={newLeadForm.service}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, service: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded text-xs focus:outline-none focus:border-slate-800"
                >
                  <option value="Luxury Home Theater Solutions">Luxury Home Theater Solutions</option>
                  <option value="Hotel & Apartment Acoustic Insulation">Hotel & Apartment Acoustic Insulation</option>
                  <option value="Acoustic Treatment for New Buildings">Acoustic Treatment for New Buildings</option>
                  <option value="Residential & Commercial Fit-Out Solutions">Residential & Commercial Fit-Out Solutions</option>
                  <option value="Gym Floor Acoustic Insulation">Gym Floor Acoustic Insulation</option>
                  <option value="Starry Sky Luxury Lighting">Starry Sky Luxury Lighting</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-600 block mb-1">Initial Project Notes</label>
                <textarea
                  rows={2}
                  placeholder="Requested site inspection, STC acoustic report, etc."
                  value={newLeadForm.message}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, message: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded text-xs focus:outline-none focus:border-slate-800"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddLeadModalOpen(false)}
                  className="px-4 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-slate-900 hover:bg-black text-white rounded font-bold cursor-pointer"
                >
                  Save Inquiry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
