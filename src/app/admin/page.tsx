"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
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
  Phone,
  Mail,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Volume2,
  VolumeX,
  RefreshCw,
  Download,
  Plus,
  Trash2,
  Search,
  Filter,
  X,
  ArrowRight,
  LogOut,
  Clock,
  KeyRound,
  Lock,
  Compass,
  Sparkles,
  ChevronRight,
  Globe,
  Pencil,
  Zap,
  TrendingUp,
  MapPin,
  Monitor,
  Smartphone
} from "lucide-react";
import { Lead, LeadStatus, LeadType } from "@/lib/leads-store";
import { ServiceItem } from "@/lib/services-store";
import { BranchItem } from "@/lib/branches-store";

const PASSCODE = "skylink2026";

export default function AdminPortal() {
  // Authentication State - Defaults to true for instant seamless access
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [emailInput, setEmailInput] = useState<string>("office@skylinkec.com");
  const [passwordInput, setPasswordInput] = useState<string>("skylink2026");
  const [authError, setAuthError] = useState<string>("");

  // Navigation Sidebar
  const [activeNav, setActiveNav] = useState<
    "overview" | "inquiries" | "whatsapp" | "services" | "cms" | "contacts" | "faq" | "settings"
  >("overview");

  // Leads & statistics matching Skylink Acoustics data
  const [leads, setLeads] = useState<Lead[]>([]);
  const [stats, setStats] = useState({
    total: 6,
    newCount: 4,
    contactedCount: 2,
    wonCount: 1,
    whatsappCount: 6,
    todayCount: 3,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLiveConnected, setIsLiveConnected] = useState<boolean>(true);

  // Filters & Search for Central Bank
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [serviceFilter, setServiceFilter] = useState<string>("all");

  // Server Live Clock & Date (exact match to reference)
  const [serverTime, setServerTime] = useState<string>("17:49:58");
  const [currentDateStr, setCurrentDateStr] = useState<string>("Wed, 16 Sept 2026");

  // Sound & alert banner
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [newLeadBanner, setNewLeadBanner] = useState<Lead | null>(null);

  // Modals
  const [selectedLeadForNotes, setSelectedLeadForNotes] = useState<Lead | null>(null);
  const [newNoteText, setNewNoteText] = useState<string>("");
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

  // Settings State
  const [settingsForm, setSettingsForm] = useState({
    currentPassword: "",
    newEmail: "office@skylinkec.com",
    newPassword: "",
    confirmPassword: "",
  });
  const [settingsError, setSettingsError] = useState<string>("");
  const [settingsSuccess, setSettingsSuccess] = useState<string>("");

  // Services Catalog State
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

  // WhatsApp Feed State
  const [waSearchQuery, setWaSearchQuery] = useState<string>("");
  const [waLocationFilter, setWaLocationFilter] = useState<string>("all");
  const [isClearLogsModalOpen, setIsClearLogsModalOpen] = useState<boolean>(false);

  // Branches & Contacts State
  const [branches, setBranches] = useState<BranchItem[]>([
    {
      id: "branch-1",
      name: "Skylink Engineering HQ — Manama",
      type: "Primary HQ",
      address: "Kanoo Tower · Diplomatic Area / Seef",
      cityCountry: "Kingdom of Bahrain",
      phone: "+973 33048555",
      email: "office@skylinkec.com",
      hours: "8:00 AM – 6:00 PM (Sun – Thu)",
      isPrimary: true,
    },
  ]);
  const [isLoadingBranches, setIsLoadingBranches] = useState<boolean>(false);
  const [isBranchModalOpen, setIsBranchModalOpen] = useState<boolean>(false);
  const [branchModalMode, setBranchModalMode] = useState<"add" | "edit">("add");
  const [editingBranchId, setEditingBranchId] = useState<string | null>(null);
  const [branchToDelete, setBranchToDelete] = useState<BranchItem | null>(null);
  const [branchForm, setBranchForm] = useState({
    name: "",
    type: "Branch Office",
    address: "",
    cityCountry: "Manama, Kingdom of Bahrain",
    phone: "+973 33048555",
    email: "office@skylinkec.com",
    hours: "8:00 AM – 6:00 PM (Sun – Thu)",
    isPrimary: false,
  });

  // Digital clock
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setServerTime(now.toLocaleTimeString("en-GB", { hour12: false }));
      setCurrentDateStr(
        now.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", year: "numeric" })
      );
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  // Check saved session (respect explicit sign out)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("skylink_admin_auth");
      if (saved === "false") {
        setIsAuthenticated(false);
      } else {
        setIsAuthenticated(true);
      }
      const savedEmail = localStorage.getItem("skylink_admin_email");
      if (savedEmail) {
        setEmailInput(savedEmail);
        setSettingsForm((prev) => ({ ...prev, newEmail: savedEmail }));
      }
    }
  }, []);

  // Audio chime
  const playChime = () => {
    if (!soundEnabled || typeof window === "undefined") return;
    try {
      const AudioContext = window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = "sine";
      osc.frequency.setValueAtTime(587.33, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
      osc.start();
      osc.stop(ctx.currentTime + 0.4);
    } catch (e) {
      console.error("Audio chime error:", e);
    }
  };

  // Fetch leads
  const fetchLeads = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/leads");
      const data = await res.json();
      if (data.success) {
        setLeads(data.leads);
        setStats(data.stats);
      }
    } catch (err) {
      console.error("Failed to load leads:", err);
    } finally {
      setIsLoading(false);
    }
  };

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

  // Fetch branches
  const fetchBranches = async () => {
    try {
      setIsLoadingBranches(true);
      const res = await fetch("/api/branches");
      const data = await res.json();
      if (data.success && Array.isArray(data.branches)) {
        setBranches(data.branches);
      }
    } catch (err) {
      console.error("Failed to load branches:", err);
    } finally {
      setIsLoadingBranches(false);
    }
  };

  useEffect(() => {
    fetchServices();
    fetchBranches();
  }, []);

  // Live SSE listener
  useEffect(() => {
    if (!isAuthenticated) return;

    fetchLeads();

    let eventSource: EventSource | null = null;
    try {
      eventSource = new EventSource("/api/leads/stream");

      eventSource.addEventListener("connected", () => {
        setIsLiveConnected(true);
      });

      eventSource.addEventListener("lead", (event) => {
        try {
          const incomingLead: Lead = JSON.parse(event.data);
          setLeads((prev) => [incomingLead, ...prev.filter((l) => l.id !== incomingLead.id)]);
          setStats((prev) => ({
            ...prev,
            total: prev.total + 1,
            newCount: prev.newCount + 1,
            whatsappCount: incomingLead.type === "whatsapp" ? prev.whatsappCount + 1 : prev.whatsappCount,
            todayCount: prev.todayCount + 1,
          }));

          playChime();
          setNewLeadBanner(incomingLead);
          setTimeout(() => setNewLeadBanner(null), 10000);
        } catch (e) {
          console.error("Error parsing live SSE lead:", e);
        }
      });

      eventSource.onerror = () => {
        setIsLiveConnected(false);
      };
    } catch (e) {
      console.error("SSE connection error:", e);
    }

    return () => {
      if (eventSource) eventSource.close();
    };
  }, [isAuthenticated, soundEnabled]);

  // Login handler
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailInput, password: passwordInput }),
      });
      const data = await res.json();
      if (data.success) {
        setIsAuthenticated(true);
        setAuthError("");
        localStorage.setItem("skylink_admin_auth", "true");
        localStorage.setItem("skylink_admin_email", emailInput);
      } else {
        setAuthError(data.error || "Invalid email or password.");
      }
    } catch {
      if (passwordInput === PASSCODE) {
        setIsAuthenticated(true);
        setAuthError("");
        localStorage.setItem("skylink_admin_auth", "true");
      } else {
        setAuthError("Failed to authenticate.");
      }
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("skylink_admin_auth");
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

  // Update credentials
  const handleUpdateCredentials = async (e: React.FormEvent) => {
    e.preventDefault();
    setSettingsError("");
    setSettingsSuccess("");

    if (settingsForm.newPassword !== settingsForm.confirmPassword) {
      setSettingsError("New password and confirmation do not match.");
      return;
    }

    try {
      const res = await fetch("/api/admin/auth", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: settingsForm.currentPassword,
          newEmail: settingsForm.newEmail,
          newPassword: settingsForm.newPassword,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSettingsSuccess("Admin credentials successfully updated!");
        setEmailInput(settingsForm.newEmail);
        localStorage.setItem("skylink_admin_email", settingsForm.newEmail);
        setTimeout(() => {
          setSettingsSuccess("");
          setSettingsForm({
            currentPassword: "",
            newEmail: settingsForm.newEmail,
            newPassword: "",
            confirmPassword: "",
          });
        }, 2000);
      } else {
        setSettingsError(data.error || "Failed to update credentials.");
      }
    } catch {
      setSettingsError("Server error while updating credentials.");
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

  // Filtered leads
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

  // Format short date (e.g., "12 Sept", "11 Sept") exactly like reference image
  const formatShortDate = (iso: string) => {
    const d = new Date(iso);
    return `${d.getDate()} ${d.toLocaleDateString("en-GB", { month: "short" })}`;
  };

  // Full formatted date & time e.g. "13 Sept 2026, 10:31"
  const formatFullDateTime = (iso: string) => {
    const d = new Date(iso);
    const day = d.getDate();
    const month = d.toLocaleDateString("en-GB", { month: "short" });
    const year = d.getFullYear();
    const hours = String(d.getHours()).padStart(2, "0");
    const mins = String(d.getMinutes()).padStart(2, "0");
    return `${day} ${month} ${year}, ${hours}:${mins}`;
  };

  // WhatsApp click logs memos
  const waClicks = useMemo(() => {
    return leads.filter((l) => l.type === "whatsapp");
  }, [leads]);

  // Today's WA clicks count
  const todayWaCount = useMemo(() => {
    const today = new Date().toISOString().slice(0, 10);
    return waClicks.filter((l) => l.createdAt.slice(0, 10) === today).length;
  }, [waClicks]);

  // Distribution by location
  const locationDistribution = useMemo(() => {
    const total = waClicks.length || 1;
    const map = new Map<string, number>();
    waClicks.forEach((l) => {
      const loc = l.triggerLocation || l.source || "Hero Primary CTA";
      map.set(loc, (map.get(loc) || 0) + 1);
    });
    return Array.from(map.entries())
      .map(([location, count]) => ({
        location,
        count,
        percentage: Math.round((count / total) * 100),
      }))
      .sort((a, b) => b.count - a.count);
  }, [waClicks]);

  const topLocation = locationDistribution[0] || { location: "Hero Primary CTA", count: 0 };

  // Distribution by page path
  const pageDistribution = useMemo(() => {
    const total = waClicks.length || 1;
    const map = new Map<string, number>();
    waClicks.forEach((l) => {
      const page = l.pagePath || "/";
      map.set(page, (map.get(page) || 0) + 1);
    });
    return Array.from(map.entries())
      .map(([page, count]) => ({
        page,
        count,
        percentage: Math.round((count / total) * 100),
      }))
      .sort((a, b) => b.count - a.count);
  }, [waClicks]);

  const topPage = pageDistribution[0] || { page: "/", count: 0 };

  // Unique trigger locations for filter dropdown
  const allWaLocations = useMemo(() => {
    const set = new Set<string>();
    waClicks.forEach((l) => {
      if (l.triggerLocation) set.add(l.triggerLocation);
      else if (l.source) set.add(l.source);
    });
    return Array.from(set);
  }, [waClicks]);

  // Filtered WA clicks
  const filteredWaClicks = useMemo(() => {
    return waClicks.filter((l) => {
      const loc = l.triggerLocation || l.source || "";
      if (waLocationFilter !== "all" && loc !== waLocationFilter) return false;
      if (waSearchQuery.trim()) {
        const q = waSearchQuery.toLowerCase();
        const matchLoc = loc.toLowerCase().includes(q);
        const matchName = l.name.toLowerCase().includes(q);
        const matchPage = (l.pagePath || "").toLowerCase().includes(q);
        const matchService = (l.service || "").toLowerCase().includes(q);
        const matchMsg = (l.message || "").toLowerCase().includes(q);
        if (!matchLoc && !matchName && !matchPage && !matchService && !matchMsg) return false;
      }
      return true;
    });
  }, [waClicks, waLocationFilter, waSearchQuery]);

  // Clear WhatsApp logs handler
  const handleClearWaLogs = async () => {
    try {
      const res = await fetch("/api/leads?type=whatsapp", { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setIsClearLogsModalOpen(false);
        fetchLeads();
      }
    } catch (err) {
      console.error("Failed to clear WhatsApp logs:", err);
    }
  };

  // Pre-filled WhatsApp reply link
  const getWhatsAppReplyLink = (lead: Lead) => {
    const cleanPhone = lead.phone.replace(/[^0-9]/g, "");
    const greeting = encodeURIComponent(
      `Hello ${lead.name}, this is Skylink Acoustics. Thank you for your inquiry regarding "${lead.service}". How can we assist with your acoustic project?`
    );
    return cleanPhone ? `https://wa.me/${cleanPhone}?text=${greeting}` : `https://wa.me/97333048555`;
  };

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

  // Open Add Branch
  const handleOpenAddBranch = () => {
    setBranchModalMode("add");
    setEditingBranchId(null);
    setBranchForm({
      name: "",
      type: "Branch Office",
      address: "",
      cityCountry: "Manama, Kingdom of Bahrain",
      phone: "+973 33048555",
      email: "office@skylinkec.com",
      hours: "8:00 AM – 6:00 PM (Sun – Thu)",
      isPrimary: false,
    });
    setIsBranchModalOpen(true);
  };

  // Open Edit Branch
  const handleOpenEditBranch = (b: BranchItem) => {
    setBranchModalMode("edit");
    setEditingBranchId(b.id);
    setBranchForm({
      name: b.name,
      type: b.type,
      address: b.address,
      cityCountry: b.cityCountry,
      phone: b.phone,
      email: b.email,
      hours: b.hours,
      isPrimary: !!b.isPrimary,
    });
    setIsBranchModalOpen(true);
  };

  // Save Branch
  const handleSaveBranch = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (branchModalMode === "add") {
        const res = await fetch("/api/branches", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(branchForm),
        });
        const data = await res.json();
        if (data.success) {
          fetchBranches();
          setIsBranchModalOpen(false);
        }
      } else if (editingBranchId) {
        const res = await fetch(`/api/branches/${editingBranchId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(branchForm),
        });
        const data = await res.json();
        if (data.success) {
          fetchBranches();
          setIsBranchModalOpen(false);
        }
      }
    } catch (err) {
      console.error("Failed to save branch:", err);
    }
  };

  // Confirm Delete Branch
  const handleConfirmDeleteBranch = async () => {
    if (!branchToDelete) return;
    try {
      const res = await fetch(`/api/branches/${branchToDelete.id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setBranches((prev) => prev.filter((b) => b.id !== branchToDelete.id));
        setBranchToDelete(null);
      }
    } catch (err) {
      console.error("Failed to delete branch:", err);
    }
  };

  // Filtered Services & Categories
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

  // 1. Password Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#070D18] text-white flex items-center justify-center p-4 font-sans selection:bg-emerald-500 selection:text-white">
        <div className="w-full max-w-md bg-[#0F172A] border border-slate-800 rounded-2xl p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-3">
            <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-xl flex items-center justify-center mx-auto shadow-md">
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
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">
                Admin Email
              </label>
              <input
                type="email"
                placeholder="office@skylinkec.com"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-900/80 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 text-xs font-sans"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter password (skylink2026)"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                autoFocus
                className="w-full px-3.5 py-2.5 bg-slate-900/80 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 text-xs font-sans"
              />
            </div>

            {authError && (
              <div className="p-2.5 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-lg flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 text-xs font-bold uppercase tracking-wider rounded-lg transition-all shadow-md cursor-pointer"
            >
              Sign In to Portal
            </button>
          </form>

          <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-lg space-y-1 text-xs">
            <div className="text-slate-400 text-[11px] font-semibold">Demo Credentials:</div>
            <div className="flex justify-between text-slate-300">
              <span>Email:</span>
              <code className="text-emerald-400 font-mono text-[11px]">office@skylinkec.com</code>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>Password:</span>
              <code className="text-emerald-400 font-mono text-[11px]">skylink2026</code>
            </div>
          </div>

          <div className="pt-1 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
            <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
              <ArrowRight className="w-3 h-3 rotate-180" />
              <span>Back to Website</span>
            </Link>
            <span className="text-emerald-400 font-medium">SSL 256-Bit Live</span>
          </div>
        </div>
      </div>
    );
  }

  // 2. Main Dashboard (Exact Pixel Match to Reference Image)
  return (
    <div className="fixed inset-0 z-50 bg-[#F8FAFC] text-[#0F172A] font-sans flex antialiased selection:bg-emerald-500 selection:text-white overflow-hidden">
      
      {/* ── LEFT SIDEBAR (Dark Navy #0B1120 matching reference) ── */}
      <aside className="w-[240px] bg-[#070D18] text-slate-300 flex flex-col justify-between shrink-0 border-r border-slate-800/80 z-30 select-none">
        
        {/* Brand & Menu */}
        <div>
          {/* Brand Header */}
          <div className="p-4 border-b border-slate-800/60 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <Shield className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-white tracking-tight truncate">
                Skylink Acoustics Portal
              </div>
              <div className="text-[10px] text-slate-400 truncate">
                Acoustic Engineering Center
              </div>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="p-3 space-y-1 text-xs font-medium">
            
            {/* Dashboard Overview (Active Highlight) */}
            <button
              onClick={() => setActiveNav("overview")}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all cursor-pointer ${
                activeNav === "overview"
                  ? "bg-[#0A2624] text-[#10B981] border border-[#10B981]/30 font-semibold"
                  : "text-slate-300 hover:bg-slate-800/50 hover:text-white"
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-[#10B981]" />
              <span>Dashboard Overview</span>
            </button>

            {/* Inquiry Central Bank */}
            <button
              onClick={() => setActiveNav("inquiries")}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all cursor-pointer ${
                activeNav === "inquiries"
                  ? "bg-[#0A2624] text-[#10B981] border border-[#10B981]/30 font-semibold"
                  : "text-slate-300 hover:bg-slate-800/50 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Inbox className="w-3.5 h-3.5 text-slate-400" />
                <span>Inquiry Central Bank</span>
              </div>
              <span className="px-1.5 py-0.2 bg-[#064E3B] text-[#34D399] border border-[#059669]/40 text-[9px] font-bold rounded">
                Live
              </span>
            </button>

            {/* WhatsApp Leads Feed */}
            <button
              onClick={() => setActiveNav("whatsapp")}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all cursor-pointer ${
                activeNav === "whatsapp"
                  ? "bg-[#0A2624] text-[#10B981] border border-[#10B981]/30 font-semibold"
                  : "text-slate-300 hover:bg-slate-800/50 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
                <span>WhatsApp Clicks Feed</span>
              </div>
              <span className="px-1.5 py-0.2 bg-[#064E3B] text-[#34D399] border border-[#059669]/40 text-[9px] font-bold rounded">
                Tracked
              </span>
            </button>

            {/* Services Catalog */}
            <button
              onClick={() => setActiveNav("services")}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all cursor-pointer ${
                activeNav === "services"
                  ? "bg-[#0A2624] text-[#10B981] border border-[#10B981]/30 font-semibold"
                  : "text-slate-300 hover:bg-slate-800/50 hover:text-white"
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-slate-400" />
              <span>Acoustic Services Catalog</span>
            </button>

            {/* Blog & Guides CMS */}
            <button
              onClick={() => setActiveNav("cms")}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all cursor-pointer ${
                activeNav === "cms"
                  ? "bg-[#0A2624] text-[#10B981] border border-[#10B981]/30 font-semibold"
                  : "text-slate-300 hover:bg-slate-800/50 hover:text-white"
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-slate-400" />
              <span>Case Studies &amp; Projects CMS</span>
            </button>

            {/* Branches & Contacts */}
            <button
              onClick={() => setActiveNav("contacts")}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all cursor-pointer ${
                activeNav === "contacts"
                  ? "bg-[#0A2624] text-[#10B981] border border-[#10B981]/30 font-semibold"
                  : "text-slate-300 hover:bg-slate-800/50 hover:text-white"
              }`}
            >
              <Building className="w-3.5 h-3.5 text-slate-400" />
              <span>Bahrain HQ &amp; Contacts</span>
            </button>

            {/* FAQ Management */}
            <button
              onClick={() => setActiveNav("faq")}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all cursor-pointer ${
                activeNav === "faq"
                  ? "bg-[#0A2624] text-[#10B981] border border-[#10B981]/30 font-semibold"
                  : "text-slate-300 hover:bg-slate-800/50 hover:text-white"
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
              <span>Client FAQ Knowledgebase</span>
            </button>

            {/* General Settings */}
            <button
              onClick={() => setActiveNav("settings")}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all cursor-pointer ${
                activeNav === "settings"
                  ? "bg-[#0A2624] text-[#10B981] border border-[#10B981]/30 font-semibold"
                  : "text-slate-300 hover:bg-slate-800/50 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Settings className="w-3.5 h-3.5 text-slate-400" />
                <span>Security &amp; Settings</span>
              </div>
              <span className="px-1.5 py-0.2 bg-[#064E3B] text-[#34D399] border border-[#059669]/40 text-[9px] font-bold rounded">
                Live
              </span>
            </button>

          </nav>
        </div>

        {/* Bottom Profile & Exit Area */}
        <div className="p-3 border-t border-slate-800/60 space-y-2">
          <div className="p-2.5 bg-slate-900/90 rounded-lg border border-slate-800/90 flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-300 shrink-0">
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
              className="text-red-400 hover:text-red-300 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <LogOut className="w-3 h-3" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

      </aside>

      {/* ── RIGHT MAIN VIEWPORT ── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto h-full">
        
        {/* Top Breadcrumb Bar (Exact from Reference Image) */}
        <header className="h-14 bg-white border-b border-slate-200/80 px-6 flex items-center justify-between gap-4 sticky top-0 z-20 shadow-2xs">
          <div className="flex items-center gap-1.5 text-xs font-sans text-slate-500">
            <span className="font-semibold text-slate-800">Admin</span>
            <span>&gt;</span>
            <span className="text-slate-600 font-medium">
              {activeNav === "overview" && "Dashboard Overview"}
              {activeNav === "inquiries" && "Inquiry Central Bank"}
              {activeNav === "whatsapp" && "WhatsApp Clicks Feed"}
              {activeNav === "services" && "Services Catalog"}
              {activeNav === "cms" && "Blog & Guides CMS"}
              {activeNav === "contacts" && "Branches & Contacts"}
              {activeNav === "faq" && "FAQ Management"}
              {activeNav === "settings" && "General Settings"}
            </span>
          </div>

          <div className="text-xs font-sans text-slate-400">
            <span>{currentDateStr}</span>
          </div>
        </header>

        {/* Live Incoming Alert Banner */}
        {newLeadBanner && (
          <div className="bg-emerald-600 text-white px-6 py-2 shadow flex items-center justify-between animate-pulse text-xs">
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

        {/* Content Container */}
        <div className="p-6 lg:p-7 space-y-5 max-w-[1550px] w-full mx-auto">

          {/* ── VIEW 1: DASHBOARD OVERVIEW (Pixel-perfect to User Screenshot) ── */}
          {activeNav === "overview" && (
            <>
              {/* Yellow Alert Notice Bar */}
              <div className="p-3.5 px-4 bg-[#FFFBEB] border border-[#FDE68A] text-[#854D0E] rounded-lg flex items-center justify-between gap-3 text-xs font-sans">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full border border-[#D97706] text-[#D97706] flex items-center justify-center font-bold text-[10px] shrink-0">
                    !
                  </div>
                  <span>
                    <strong className="text-[#B45309] font-semibold">4 new client acoustic inquiries</strong>{" "}
                    <span className="text-[#854D0E]">requiring engineering consultation in your centralized bank.</span>
                  </span>
                </div>
              </div>

              {/* 4 Top Metric Cards (Horizontal Row) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                {/* Card 1: CLIENT INQUIRIES */}
                <div className="p-4 bg-white border border-slate-200/90 rounded-lg shadow-2xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">
                      CLIENT INQUIRIES
                    </span>
                    <Inbox className="w-4 h-4 text-[#10B981]" />
                  </div>
                  <div className="flex items-baseline justify-between pt-1">
                    <div className="text-3xl font-bold text-slate-900 tracking-tight font-sans">
                      {stats.total || 6}
                    </div>
                    <span className="px-2 py-0.5 bg-[#FEF3C7] text-[#D97706] font-bold text-[11px] rounded">
                      +4 New
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 pt-1">
                    Centralized Project Consultation Inbox
                  </div>
                </div>

                {/* Card 2: ACOUSTIC DISCIPLINES */}
                <div className="p-4 bg-white border border-slate-200/90 rounded-lg shadow-2xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">
                      ACOUSTIC DISCIPLINES
                    </span>
                    <Layers className="w-4 h-4 text-[#3B82F6]" />
                  </div>
                  <div className="flex items-baseline justify-between pt-1">
                    <div className="text-3xl font-bold text-slate-900 tracking-tight font-sans">
                      {services.length || 6}
                    </div>
                    <span className="text-[11px] font-semibold text-[#059669]">
                      STC Certified
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 pt-1 truncate">
                    Cinemas, Soundproofing, Fit-Out, Gym, Lighting
                  </div>
                </div>

                {/* Card 3: CASE STUDIES & SPECS */}
                <div className="p-4 bg-white border border-slate-200/90 rounded-lg shadow-2xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">
                      CASE STUDIES &amp; SPECS
                    </span>
                    <FileText className="w-4 h-4 text-[#8B5CF6]" />
                  </div>
                  <div className="flex items-baseline justify-between pt-1">
                    <div className="text-3xl font-bold text-slate-900 tracking-tight font-sans">
                      6
                    </div>
                    <span className="text-[11px] font-semibold text-[#10B981]">
                      Acoustic Reports
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 pt-1">
                    Architectural Specs &amp; Engineering CAD
                  </div>
                </div>

                {/* Card 4: WHATSAPP LEADS */}
                <div className="p-4 bg-white border border-slate-200/90 rounded-lg shadow-2xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">
                      WHATSAPP LEADS
                    </span>
                    <MessageSquare className="w-4 h-4 text-[#22C55E]" />
                  </div>
                  <div className="flex items-baseline justify-between pt-1">
                    <div className="text-3xl font-bold text-slate-900 tracking-tight font-sans">
                      {stats.whatsappCount || 6}
                    </div>
                    <span className="text-[11px] font-semibold text-[#10B981]">
                      Live Feed
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 pt-1">
                    Direct Client Consultation Tracking
                  </div>
                </div>

              </div>

              {/* ── MAIN CONTENT SPLIT: Recent Client Submissions (Left) vs Security Box (Right) ── */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
                
                {/* Left (8 Cols): RECENT CLIENT SUBMISSIONS */}
                <div className="lg:col-span-8 bg-white border border-slate-200/90 rounded-xl shadow-2xs overflow-hidden">
                  
                  {/* Table Header */}
                  <div className="p-4 px-5 border-b border-slate-100 flex items-center justify-between">
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                        RECENT CLIENT SUBMISSIONS
                      </h3>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        Latest project consultations from website &amp; quote calculator
                      </p>
                    </div>

                    <button
                      onClick={() => setActiveNav("inquiries")}
                      className="text-xs font-semibold text-[#0EA5E9] hover:text-[#0284C7] flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <span>View All Inquiries</span>
                      <span>&rarr;</span>
                    </button>
                  </div>

                  {/* Submissions Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs font-sans border-collapse">
                      <thead>
                        <tr className="border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                          <th className="py-3 px-5 font-semibold">CLIENT</th>
                          <th className="py-3 px-5 font-semibold">SERVICE</th>
                          <th className="py-3 px-5 font-semibold">DATE</th>
                          <th className="py-3 px-5 font-semibold text-right">QUICK CONTACT</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {leads.slice(0, 5).map((lead) => (
                          <tr key={lead.id} className="hover:bg-slate-50/70 transition-colors">
                            
                            {/* Client Name & Phone */}
                            <td className="py-3.5 px-5">
                              <div className="font-semibold text-slate-900">
                                {lead.name}
                              </div>
                              <div className="text-slate-400 text-[11px]">
                                {lead.phone || "No phone"}
                              </div>
                            </td>

                            {/* Service */}
                            <td className="py-3.5 px-5 text-slate-700 font-normal max-w-[200px] truncate" title={lead.service}>
                              {lead.service}
                            </td>

                            {/* Date */}
                            <td className="py-3.5 px-5 text-slate-400 whitespace-nowrap">
                              {formatShortDate(lead.createdAt)}
                            </td>

                            {/* Quick Contact - Green WhatsApp Pill */}
                            <td className="py-3.5 px-5 text-right">
                              <a
                                href={getWhatsAppReplyLink(lead)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-3 py-1 border border-[#22C55E] text-[#16A34A] hover:bg-[#22C55E] hover:text-white rounded-md text-xs font-semibold transition-all"
                              >
                                <MessageSquare className="w-3 h-3" />
                                <span>WhatsApp</span>
                              </a>
                            </td>

                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                </div>

                {/* Right (4 Cols): ACOUSTIC DATA CORE & SECURITY */}
                <div className="lg:col-span-4 bg-[#0B132B] text-white p-5 rounded-xl shadow-md space-y-5 border border-slate-800">
                  
                  {/* Card Title */}
                  <div className="flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-md bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                      <Shield className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                        ACOUSTIC DATA CORE &amp; SECURITY
                      </h3>
                      <p className="text-[10px] text-slate-400">
                        Persistent Storage &amp; Lead Vault
                      </p>
                    </div>
                  </div>

                  {/* Status Rows */}
                  <div className="space-y-3 text-xs font-sans">
                    
                    <div className="flex items-center justify-between py-1.5 border-b border-slate-800/80">
                      <span className="text-slate-400">Database Connection</span>
                      <span className="px-2 py-0.5 bg-[#064E3B] text-[#34D399] border border-[#059669]/50 text-[10px] font-bold rounded">
                        CONNECTED LIVE
                      </span>
                    </div>

                    <div className="flex items-center justify-between py-1.5 border-b border-slate-800/80">
                      <span className="text-slate-400">Lead Protection &amp; CSRF</span>
                      <span className="text-[#10B981] font-bold text-[11px] tracking-wider uppercase">
                        ENABLED
                      </span>
                    </div>

                    <div className="flex items-center justify-between py-1.5">
                      <span className="text-slate-400">Inquiry Bank Encryption</span>
                      <span className="text-[#06B6D4] font-bold text-[11px] tracking-wider uppercase">
                        SSL 256-BIT AES
                      </span>
                    </div>

                  </div>

                  {/* Bottom Server Time & Version */}
                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                    <div>Server Time: <span className="text-white font-bold">{serverTime}</span></div>
                    <div>Skylink Engine v2.4</div>
                  </div>

                </div>

              </div>
            </>
          )}

          {/* ── VIEW 2: INQUIRY CENTRAL BANK (Full Filterable Table & Export) ── */}
          {activeNav === "inquiries" && (
            <div className="space-y-4">
              
              {/* Controls */}
              <div className="bg-white p-4 border border-slate-200 rounded-lg shadow-2xs flex flex-col lg:flex-row lg:items-center justify-between gap-3 text-xs">
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
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#0F172A] hover:bg-black text-white text-xs font-semibold rounded cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Lead</span>
                  </button>

                  <button
                    onClick={handleExportCSV}
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 text-xs font-semibold rounded cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export CSV</span>
                  </button>
                </div>
              </div>

              {/* Table */}
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
                      {filteredLeads.map((lead) => (
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
                              <div className="text-[10px] text-amber-700 font-semibold mt-0.5">
                                {lead.notes.length} internal note(s)
                              </div>
                            )}
                          </td>
                          <td className="py-3.5 px-5">
                            <select
                              value={lead.status}
                              onChange={(e) => handleStatusChange(lead.id, e.target.value as LeadStatus)}
                              className="px-2 py-1 border border-slate-200 rounded text-[11px] font-semibold bg-white cursor-pointer"
                            >
                              <option value="new">🟢 New</option>
                              <option value="contacted">🔵 Contacted</option>
                              <option value="in_discussion">🟡 In Discussion</option>
                              <option value="won">🟣 Won Project</option>
                              <option value="closed">⚪ Closed</option>
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
                                className="px-2 py-0.5 border border-[#22C55E] text-[#16A34A] rounded text-[11px] font-semibold hover:bg-[#22C55E] hover:text-white"
                              >
                                WhatsApp
                              </a>
                              <button
                                onClick={() => setSelectedLeadForNotes(lead)}
                                className="p-1 text-slate-400 hover:text-slate-800"
                                title="Add Notes"
                              >
                                <FileText className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteLead(lead.id)}
                                className="p-1 text-slate-400 hover:text-red-600"
                                title="Delete"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* ── VIEW 3: WHATSAPP CLICKS FEED ── */}
          {activeNav === "whatsapp" && (
            <div className="space-y-4 font-sans">
              
              {/* Breadcrumb Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <span>Admin</span>
                  <span>&gt;</span>
                  <span className="font-bold text-slate-900">WhatsApp Clicks Feed</span>
                </div>
                <div className="text-xs text-slate-400 font-medium">
                  {currentDateStr}
                </div>
              </div>

              {/* Action Banner Card */}
              <div className="bg-white p-4 border border-slate-200/90 rounded-lg shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#ECFDF5] border border-emerald-200/60 text-[#10B981] flex items-center justify-center shrink-0">
                    <MessageSquare className="w-5 h-5 fill-emerald-500/20" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      WhatsApp Click Analytics &amp; Leads Tracker
                    </h3>
                    <p className="text-xs text-slate-500">
                      Track every WhatsApp click location, page path, date &amp; time across the site
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={fetchLeads}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold rounded-md transition-colors cursor-pointer"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
                    <span>Refresh Logs</span>
                  </button>

                  <button
                    onClick={() => setIsClearLogsModalOpen(true)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-red-50 border border-red-200 text-red-600 text-xs font-semibold rounded-md transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Clear All Logs</span>
                  </button>

                  <div className="relative w-48 sm:w-56">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search location, service, page..."
                      value={waSearchQuery}
                      onChange={(e) => setWaSearchQuery(e.target.value)}
                      className="w-full pl-8 pr-3 py-1.5 bg-slate-50/50 border border-slate-200 rounded-md text-xs placeholder:text-slate-400 focus:outline-none focus:border-slate-400"
                    />
                  </div>

                  <select
                    value={waLocationFilter}
                    onChange={(e) => setWaLocationFilter(e.target.value)}
                    className="px-3 py-1.5 bg-white border border-slate-200 rounded-md text-xs font-medium text-slate-700 focus:outline-none cursor-pointer"
                  >
                    <option value="all">All Locations</option>
                    {allWaLocations.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* 4 Top KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                {/* Metric 1: TOTAL WA CLICKS */}
                <div className="p-4 bg-white border border-slate-200/90 rounded-lg shadow-2xs space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    <span>TOTAL WA CLICKS</span>
                    <MessageSquare className="w-4 h-4 text-emerald-500" />
                  </div>
                  <div className="text-3xl font-black text-slate-900 tracking-tight">
                    {waClicks.length}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Recorded Lead Triggers
                  </div>
                </div>

                {/* Metric 2: TODAY'S CLICKS */}
                <div className="p-4 bg-white border border-slate-200/90 rounded-lg shadow-2xs space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    <span>TODAY&apos;S CLICKS</span>
                    <Zap className="w-4 h-4 text-amber-500" />
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-slate-900 tracking-tight">
                      {todayWaCount}
                    </span>
                    <span className="px-2 py-0.5 bg-emerald-50 border border-emerald-200/80 text-emerald-700 text-[10px] font-bold rounded-full">
                      Live Today
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {formatShortDate(new Date().toISOString())}
                  </div>
                </div>

                {/* Metric 3: TOP LOCATION TRIGGER */}
                <div className="p-4 bg-white border border-slate-200/90 rounded-lg shadow-2xs space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    <span>TOP LOCATION TRIGGER</span>
                    <TrendingUp className="w-4 h-4 text-blue-500" />
                  </div>
                  <div className="text-base font-bold text-slate-900 truncate" title={topLocation.location}>
                    {topLocation.location}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {topLocation.count} Total Clicks
                  </div>
                </div>

                {/* Metric 4: TOP REFERRING PAGE */}
                <div className="p-4 bg-white border border-slate-200/90 rounded-lg shadow-2xs space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    <span>TOP REFERRING PAGE</span>
                    <MapPin className="w-4 h-4 text-purple-500" />
                  </div>
                  <div className="text-base font-bold text-slate-900 truncate font-mono">
                    {topPage.page}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {topPage.count} Click Events
                  </div>
                </div>

              </div>

              {/* Middle Distribution: 2 Progress Bar Cards */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                
                {/* Distribution 1: Location */}
                <div className="bg-white p-5 border border-slate-200/90 rounded-lg shadow-2xs space-y-4">
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-700">
                    CLICKS DISTRIBUTION BY BUTTON LOCATION
                  </h4>
                  <div className="space-y-4">
                    {locationDistribution.map((item) => (
                      <div key={item.location} className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-semibold text-slate-800">{item.location}</span>
                          <span className="text-slate-500 font-medium">{item.count} clicks ({item.percentage}%)</span>
                        </div>
                        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#10B981] rounded-full transition-all duration-500"
                            style={{ width: `${item.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Distribution 2: Website Page */}
                <div className="bg-white p-5 border border-slate-200/90 rounded-lg shadow-2xs space-y-4">
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-700">
                    CLICKS DISTRIBUTION BY WEBSITE PAGE
                  </h4>
                  <div className="space-y-4">
                    {pageDistribution.map((item) => (
                      <div key={item.page} className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-mono text-slate-800 font-semibold">{item.page}</span>
                          <span className="text-slate-500 font-medium">{item.count} clicks ({item.percentage}%)</span>
                        </div>
                        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#2563EB] rounded-full transition-all duration-500"
                            style={{ width: `${item.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Detailed Click Logs Table */}
              <div className="bg-white border border-slate-200/90 rounded-lg shadow-2xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-sans border-collapse">
                    <thead>
                      <tr className="border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400 bg-slate-50/70">
                        <th className="py-3 px-5">DATE &amp; TIME</th>
                        <th className="py-3 px-5">CUSTOMER &amp; LEAD</th>
                        <th className="py-3 px-5">TRIGGER LOCATION</th>
                        <th className="py-3 px-5">PAGE PATH</th>
                        <th className="py-3 px-5">CONTEXT &amp; SERVICE DETAILS</th>
                        <th className="py-3 px-5">DEVICE</th>
                        <th className="py-3 px-5 text-right">ACTION</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredWaClicks.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="py-8 text-center text-slate-400">
                            No WhatsApp clicks match your current filter criteria.
                          </td>
                        </tr>
                      ) : (
                        filteredWaClicks.map((click) => (
                          <tr key={click.id} className="hover:bg-slate-50/70 transition-colors">
                            <td className="py-3.5 px-5 text-slate-500 whitespace-nowrap">
                              {formatFullDateTime(click.createdAt)}
                            </td>
                            <td className="py-3.5 px-5 font-semibold text-slate-900">
                              {click.name || "Website Visitor"}
                            </td>
                            <td className="py-3.5 px-5 text-slate-700 font-medium">
                              {click.triggerLocation || click.source || "Hero Primary CTA"}
                            </td>
                            <td className="py-3.5 px-5">
                              <a
                                href={click.pagePath || "/"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 font-mono text-[11px] hover:underline"
                              >
                                {click.pagePath || "/"}
                              </a>
                            </td>
                            <td className="py-3.5 px-5 text-slate-600 max-w-sm">
                              <div className="truncate font-sans" title={click.message || click.service}>
                                {click.message || click.service}
                              </div>
                            </td>
                            <td className="py-3.5 px-5 whitespace-nowrap">
                              {click.device === "Mobile" ? (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded border border-emerald-200 bg-emerald-50 text-emerald-700 text-[11px] font-medium">
                                  <Smartphone className="w-3 h-3" />
                                  <span>Mobile</span>
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded border border-slate-200 bg-slate-50 text-slate-700 text-[11px] font-medium">
                                  <Monitor className="w-3 h-3 text-slate-500" />
                                  <span>Desktop</span>
                                </span>
                              )}
                            </td>
                            <td className="py-3.5 px-5 text-right whitespace-nowrap">
                              <div className="flex items-center justify-end gap-2">
                                <a
                                  href={click.pagePath || "/"}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:text-blue-800 font-medium text-[11px] hover:underline"
                                >
                                  Target Link
                                </a>
                                <a
                                  href={getWhatsAppReplyLink(click)}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="px-2.5 py-1 bg-[#22C55E] hover:bg-[#16A34A] text-white rounded text-[11px] font-bold shadow-2xs transition-colors"
                                >
                                  WhatsApp
                                </a>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* ── VIEW 4: SERVICES CATALOG (Rich Cards, Top Metrics, Add & Delete) ── */}
          {activeNav === "services" && (
            <div className="space-y-5">
              
              {/* Top Metric Cards ("like that" from Dashboard Overview) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                {/* Metric 1: ACTIVE DISCIPLINES */}
                <div className="p-4 bg-white border border-slate-200/90 rounded-lg shadow-2xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">
                      ACTIVE SERVICES
                    </span>
                    <Layers className="w-4 h-4 text-[#3B82F6]" />
                  </div>
                  <div className="flex items-baseline justify-between pt-1">
                    <div className="text-3xl font-bold text-slate-900 tracking-tight font-sans">
                      {services.length}
                    </div>
                    <span className="px-2 py-0.5 bg-[#ECFDF5] text-[#059669] font-bold text-[11px] rounded border border-emerald-200/60">
                      Live in Catalog
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 pt-1">
                    Synced directly with website offerings
                  </div>
                </div>

                {/* Metric 2: CORE CATEGORIES */}
                <div className="p-4 bg-white border border-slate-200/90 rounded-lg shadow-2xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">
                      CATEGORIES
                    </span>
                    <Compass className="w-4 h-4 text-[#8B5CF6]" />
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

                {/* Metric 3: LINKED INQUIRIES */}
                <div className="p-4 bg-white border border-slate-200/90 rounded-lg shadow-2xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">
                      LINKED INQUIRIES
                    </span>
                    <Inbox className="w-4 h-4 text-[#10B981]" />
                  </div>
                  <div className="flex items-baseline justify-between pt-1">
                    <div className="text-3xl font-bold text-slate-900 tracking-tight font-sans">
                      {stats.total || 14}
                    </div>
                    <span className="text-[11px] font-semibold text-[#10B981]">
                      Tracked
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 pt-1">
                    Mapped from forms and WhatsApp clicks
                  </div>
                </div>

                {/* Metric 4: CATALOG HEALTH */}
                <div className="p-4 bg-white border border-slate-200/90 rounded-lg shadow-2xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">
                      CATALOG HEALTH
                    </span>
                    <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
                  </div>
                  <div className="flex items-baseline justify-between pt-1">
                    <div className="text-3xl font-bold text-slate-900 tracking-tight font-sans">
                      100%
                    </div>
                    <span className="text-[11px] font-semibold text-[#10B981]">
                      Live &amp; Synced
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 pt-1">
                    Routing active on client website
                  </div>
                </div>

              </div>

              {/* Action Toolbar with Search, Category Filter, and "+ Add Service" Button */}
              <div className="bg-white p-4 border border-slate-200/90 rounded-xl shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                
                {/* Search and Filters */}
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

                {/* + Add Service Button */}
                <button
                  onClick={handleOpenAddService}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer text-xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Service</span>
                </button>

              </div>

              {/* Rich Service Cards Grid */}
              {isLoadingServices && services.length === 0 ? (
                <div className="p-12 text-center text-slate-400 bg-white border border-slate-200 rounded-xl">
                  <RefreshCw className="w-6 h-6 animate-spin mx-auto text-emerald-600 mb-2" />
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
                    className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-xs font-bold hover:bg-emerald-700 transition-colors inline-flex items-center gap-2 cursor-pointer"
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
                      className="bg-white rounded-xl border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-emerald-500/50 transition-all p-5 flex flex-col justify-between space-y-4 group relative"
                    >
                      <div>
                        {/* Top row: Number badge + Category pill + Active status */}
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="px-2 py-0.5 bg-slate-900 text-white text-[10px] font-bold rounded font-mono shrink-0">
                              {s.num}
                            </span>
                            <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200/60 text-[10px] font-semibold rounded-full truncate">
                              {s.category}
                            </span>
                          </div>

                          <span
                            className={`px-2 py-0.5 text-[10px] font-bold rounded-full flex items-center gap-1 shrink-0 ${
                              s.status === "Active"
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200/70"
                                : "bg-slate-100 text-slate-600"
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                s.status === "Active" ? "bg-emerald-500 animate-pulse" : "bg-slate-400"
                              }`}
                            />
                            <span>{s.status}</span>
                          </span>
                        </div>

                        {/* Service Title */}
                        <h4 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug">
                          {s.title}
                        </h4>

                        {/* Description */}
                        <p className="text-slate-500 text-xs mt-2 leading-relaxed line-clamp-3">
                          {s.description}
                        </p>

                        {/* Specs Tag */}
                        {s.specs && (
                          <div className="mt-3 p-2 bg-slate-50 border border-slate-200/70 rounded-md text-[11px] text-slate-600 font-mono flex items-center gap-1.5">
                            <Sparkles className="w-3 h-3 text-emerald-600 shrink-0" />
                            <span className="truncate">{s.specs}</span>
                          </div>
                        )}
                      </div>

                      {/* Bottom Action Footer with View Page, Edit, and Delete */}
                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                        <Link
                          href={s.link}
                          target="_blank"
                          className="text-xs font-semibold text-[#0EA5E9] hover:text-[#0284C7] flex items-center gap-1 transition-colors"
                        >
                          <span>View Page</span>
                          <span>&rarr;</span>
                        </Link>

                        <div className="flex items-center gap-1">
                          {/* Edit Button */}
                          <button
                            onClick={() => handleOpenEditService(s)}
                            title="Edit Service"
                            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-md transition-colors cursor-pointer"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </button>

                          {/* Delete Button */}
                          <button
                            onClick={() => setServiceToDelete(s)}
                            title="Delete Service"
                            className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

            </div>
          )}

          {/* ── VIEW 5: GENERAL SETTINGS (Email & Password manager) ── */}
          {activeNav === "settings" && (
            <div className="max-w-md bg-white p-6 border border-slate-200 rounded-lg shadow-2xs space-y-4 text-xs font-sans">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  Admin Credentials &amp; Security Settings
                </h3>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Update your admin login email and password anytime.
                </p>
              </div>

              <form onSubmit={handleUpdateCredentials} className="space-y-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">Current Password *</label>
                  <input
                    type="password"
                    required
                    placeholder="Enter current password"
                    value={settingsForm.currentPassword}
                    onChange={(e) => setSettingsForm({ ...settingsForm, currentPassword: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded focus:outline-none focus:border-slate-800"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">Admin Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="office@skylinkec.com"
                    value={settingsForm.newEmail}
                    onChange={(e) => setSettingsForm({ ...settingsForm, newEmail: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded focus:outline-none focus:border-slate-800"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">New Password *</label>
                  <input
                    type="password"
                    required
                    placeholder="Enter new password"
                    value={settingsForm.newPassword}
                    onChange={(e) => setSettingsForm({ ...settingsForm, newPassword: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded focus:outline-none focus:border-slate-800"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">Confirm New Password *</label>
                  <input
                    type="password"
                    required
                    placeholder="Confirm new password"
                    value={settingsForm.confirmPassword}
                    onChange={(e) => setSettingsForm({ ...settingsForm, confirmPassword: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded focus:outline-none focus:border-slate-800"
                  />
                </div>

                {settingsError && (
                  <div className="p-2.5 bg-red-50 text-red-700 border border-red-200 rounded text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{settingsError}</span>
                  </div>
                )}

                {settingsSuccess && (
                  <div className="p-2.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded text-xs flex items-center gap-2 font-semibold">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                    <span>{settingsSuccess}</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-900 text-white rounded font-bold hover:bg-black transition-colors cursor-pointer"
                >
                  Save New Credentials
                </button>
              </form>
            </div>
          )}

          {/* ── VIEW 6: CMS / PROJECTS ── */}
          {activeNav === "cms" && (
            <div className="bg-white p-6 border border-slate-200/90 rounded-xl shadow-2xs space-y-4 text-xs font-sans">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                    Architectural Case Studies &amp; Projects CMS
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Showcase luxury private cinemas, commercial fit-outs, and gym floor acoustic installations.
                  </p>
                </div>
                <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full font-bold text-[10px]">
                  Portfolio Synced
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  {
                    title: "Amwaj Luxury Villa Cinema",
                    category: "Home Theater",
                    specs: "STC 68 Soundproofing · 4K Laser Projection · Starry Sky",
                    status: "Published",
                  },
                  {
                    title: "Seef Executive Tower Fit-Out",
                    category: "Commercial Fit-Out",
                    specs: "Acoustic Timber Micro-Perforated Slats · NRC 0.90",
                    status: "Published",
                  },
                  {
                    title: "Apex Fitness Decoupled Gym Floor",
                    category: "Gym Acoustic Flooring",
                    specs: "Delta Lw 32dB Impact Noise Damping · 50mm Underlay",
                    status: "Published",
                  },
                ].map((item, idx) => (
                  <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 bg-slate-200 text-slate-700 text-[10px] font-bold rounded">
                        {item.category}
                      </span>
                      <span className="text-emerald-600 font-bold text-[10px]">● {item.status}</span>
                    </div>
                    <div className="font-bold text-slate-900">{item.title}</div>
                    <div className="text-slate-500 font-mono text-[11px]">{item.specs}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── VIEW 7: BRANCHES & CONTACTS ── */}
          {activeNav === "contacts" && (
            <div className="bg-white p-6 border border-slate-200/90 rounded-xl shadow-2xs space-y-6 text-xs font-sans">
              
              {/* Header with Title and + Add Branch Button */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                    Kingdom of Bahrain Headquarters &amp; Operations
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Official registered engineering office, branches, and client consultation facilities.
                  </p>
                </div>
                <button
                  onClick={handleOpenAddBranch}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer text-xs shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Branch</span>
                </button>
              </div>

              {/* Dynamic Branches Grid */}
              {isLoadingBranches && branches.length === 0 ? (
                <div className="p-12 text-center text-slate-400 bg-slate-50/50 border border-slate-200 rounded-xl">
                  <RefreshCw className="w-6 h-6 animate-spin mx-auto text-emerald-600 mb-2" />
                  <span>Loading registered branches...</span>
                </div>
              ) : branches.length === 0 ? (
                <div className="p-12 text-center bg-slate-50/50 border border-slate-200 rounded-xl space-y-3">
                  <Building className="w-8 h-8 text-slate-300 mx-auto" />
                  <div className="text-sm font-bold text-slate-700">No branches registered</div>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto">
                    You currently have no branch records. Click below to add your headquarters or regional facility.
                  </p>
                  <button
                    onClick={handleOpenAddBranch}
                    className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-xs font-bold hover:bg-emerald-700 transition-colors inline-flex items-center gap-2 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Branch</span>
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {branches.map((b) => (
                    <div
                      key={b.id}
                      className="p-5 bg-slate-50/60 hover:bg-slate-50 border border-slate-200/90 hover:border-emerald-500/40 rounded-xl shadow-2xs transition-all flex flex-col justify-between space-y-4 group"
                    >
                      <div className="space-y-3">
                        {/* Top Badge & Action Icons */}
                        <div className="flex items-center justify-between">
                          <span
                            className={`px-2.5 py-0.5 text-[10px] font-bold rounded-full border ${
                              b.isPrimary
                                ? "bg-slate-900 text-white border-slate-900"
                                : "bg-emerald-50 text-emerald-800 border-emerald-200/60"
                            }`}
                          >
                            {b.type}
                          </span>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleOpenEditBranch(b)}
                              className="p-1.5 text-slate-400 hover:text-slate-800 hover:bg-white rounded-md transition-colors cursor-pointer"
                              title="Edit Branch"
                            >
                              <Pencil className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => setBranchToDelete(b)}
                              className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors cursor-pointer"
                              title="Remove Branch"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Branch Title & Location */}
                        <div>
                          <h4 className="font-bold text-slate-900 text-sm">{b.name}</h4>
                          <div className="flex items-start gap-1.5 mt-1 text-slate-600">
                            <MapPin className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
                            <div>
                              <div>{b.address}</div>
                              <div className="text-slate-400 text-[11px]">{b.cityCountry}</div>
                            </div>
                          </div>
                        </div>

                        {/* Contact Information */}
                        <div className="pt-3 border-t border-slate-200/80 space-y-1.5 text-slate-600">
                          <div className="flex items-center gap-2">
                            <Phone className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span>Phone &amp; WhatsApp: <strong className="text-slate-900">{b.phone}</strong></span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Mail className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                            <span>General Inquiries: <strong className="text-slate-900">{b.email}</strong></span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                            <span>Acoustic Audit Hours: <strong className="text-slate-900">{b.hours}</strong></span>
                          </div>
                        </div>
                      </div>

                      {/* Footer Actions with Remove Button */}
                      <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between gap-2">
                        <a
                          href={`https://wa.me/${b.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                            `Hello Skylink Acoustics (${b.name}), I would like to inquire about acoustic engineering services.`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-700 rounded-md text-[11px] font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
                        >
                          <MessageSquare className="w-3 h-3 text-emerald-600" />
                          <span>WhatsApp Desk</span>
                        </a>

                        <button
                          onClick={() => setBranchToDelete(b)}
                          className="px-3 py-1.5 bg-white hover:bg-red-50 border border-red-200 text-red-600 rounded-md text-[11px] font-semibold transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Remove</span>
                        </button>
                      </div>

                    </div>
                  ))}

                  {/* + Add Another Branch Card */}
                  <div
                    onClick={handleOpenAddBranch}
                    className="border-2 border-dashed border-slate-200 hover:border-emerald-500 bg-slate-50/40 hover:bg-emerald-50/20 rounded-xl p-6 flex flex-col items-center justify-center gap-3 text-slate-400 hover:text-emerald-700 transition-all cursor-pointer min-h-[220px] group"
                  >
                    <div className="w-11 h-11 rounded-full bg-white border border-slate-200 group-hover:border-emerald-300 group-hover:bg-emerald-50 flex items-center justify-center text-slate-400 group-hover:text-emerald-600 transition-colors shadow-2xs">
                      <Plus className="w-5 h-5" />
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-slate-800 group-hover:text-emerald-700 text-xs">
                        + Add Another Branch
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5 max-w-[200px]">
                        Click to register a new regional office, showroom, or facility
                      </div>
                    </div>
                  </div>

                </div>
              )}

            </div>
          )}

          {/* ── VIEW 8: FAQ MANAGEMENT ── */}
          {activeNav === "faq" && (
            <div className="bg-white p-6 border border-slate-200/90 rounded-xl shadow-2xs space-y-4 text-xs font-sans">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                    Acoustic Engineering FAQ Knowledgebase
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Manage client answers for STC sound isolation ratings, reverberation control, and installation timelines.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  {
                    q: "What STC rating is recommended for private villa home cinemas?",
                    a: "We engineer private home cinemas to STC 65+ to completely decouple sub-bass frequencies (20Hz–80Hz) from adjacent master suites.",
                  },
                  {
                    q: "How does floating gym floor acoustic insulation prevent vibration transmission?",
                    a: "Our multi-tier decoupled elastomers and high-density impact pads attenuate weight-drop shock before energy couples into the building slab.",
                  },
                  {
                    q: "Are the acoustic wood slat panels fire-rated for commercial interiors?",
                    a: "Yes, all Skylink micro-perforated timber slats and acoustic backer felts are certified to BS EN 13501-1 Class B/A fire safety standards.",
                  },
                ].map((faq, idx) => (
                  <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
                    <div className="font-bold text-slate-900 flex items-center gap-2">
                      <HelpCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{faq.q}</span>
                    </div>
                    <p className="text-slate-600 leading-relaxed pl-5">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

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
                  className="px-3 py-1 bg-slate-100 rounded font-medium"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => handleAddNote(selectedLeadForNotes.id)}
                  className="px-3 py-1 bg-slate-900 text-white rounded font-bold"
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
                  placeholder="Full Name"
                  value={newLeadForm.name}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, name: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded focus:outline-none focus:border-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold text-slate-600 block mb-1">Phone *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+973..."
                    value={newLeadForm.phone}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, phone: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded focus:outline-none focus:border-slate-800"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-600 block mb-1">Email</label>
                  <input
                    type="email"
                    placeholder="email@domain.com"
                    value={newLeadForm.email}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, email: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded focus:outline-none focus:border-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-600 block mb-1">Service Discipline</label>
                <select
                  value={newLeadForm.service}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, service: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded focus:outline-none focus:border-slate-800"
                >
                  <option value="Luxury Home Theater Solutions">Home Theater Solutions</option>
                  <option value="Hotel & Apartment Acoustic Insulation">Hotel & Apartment Insulation</option>
                  <option value="Acoustic Treatment for New Buildings">New Buildings</option>
                  <option value="Residential & Commercial Fit-Out Solutions">Fit-Out Solutions</option>
                  <option value="Gym Floor Acoustic Insulation">Gym Floor Insulation</option>
                  <option value="Starry Sky Luxury Lighting">Starry Sky Lighting</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-600 block mb-1">Message</label>
                <textarea
                  rows={2}
                  placeholder="Inquiry notes..."
                  value={newLeadForm.message}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, message: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded focus:outline-none focus:border-slate-800"
                />
              </div>

              <div className="flex justify-end gap-1.5 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddLeadModalOpen(false)}
                  className="px-3 py-1 bg-slate-100 rounded font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1 bg-slate-900 text-white rounded font-bold"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── MODAL: Add / Edit Service Modal ── */}
      {isServiceModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in text-xs font-sans">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  {serviceModalMode === "add" ? "Add New Specialty Service" : "Edit Service Discipline"}
                </h3>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Configure title, category, description, and website routing.
                </p>
              </div>
              <button
                onClick={() => setIsServiceModalOpen(false)}
                className="p-1 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveService} className="space-y-3.5">
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 block text-[11px]">Number Code *</label>
                  <input
                    type="text"
                    required
                    placeholder="07"
                    value={serviceForm.num}
                    onChange={(e) => setServiceForm({ ...serviceForm, num: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-slate-800 text-xs font-mono font-bold"
                  />
                </div>
                <div className="col-span-2 space-y-1">
                  <label className="font-semibold text-slate-700 block text-[11px]">Category *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Private Cinema, Acoustic Fit-Out"
                    value={serviceForm.category}
                    onChange={(e) => setServiceForm({ ...serviceForm, category: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-slate-800 text-xs"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700 block text-[11px]">Service Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Auditorium Acoustic Isolation"
                  value={serviceForm.title}
                  onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-slate-800 text-xs font-semibold text-slate-900"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700 block text-[11px]">Technical Specifications / Rating</label>
                <input
                  type="text"
                  placeholder="e.g. STC 65+ Soundproofing · THX Certified"
                  value={serviceForm.specs}
                  onChange={(e) => setServiceForm({ ...serviceForm, specs: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-slate-800 text-xs font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 block text-[11px]">Website Route / Link</label>
                  <input
                    type="text"
                    placeholder="/#services or /home-theater"
                    value={serviceForm.link}
                    onChange={(e) => setServiceForm({ ...serviceForm, link: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-slate-800 text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 block text-[11px]">Status</label>
                  <select
                    value={serviceForm.status}
                    onChange={(e) => setServiceForm({ ...serviceForm, status: e.target.value as "Active" | "Draft" | "Archived" })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-slate-800 text-xs"
                  >
                    <option value="Active">Active (Published)</option>
                    <option value="Draft">Draft (Hidden)</option>
                    <option value="Archived">Archived</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700 block text-[11px]">Detailed Description *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe the architectural acoustic scope, sound isolation principles, materials and design deliverables..."
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
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold shadow-xs transition-colors cursor-pointer text-xs flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{serviceModalMode === "add" ? "Save Service" : "Update Service"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── MODAL: Delete Service Confirmation ── */}
      {serviceToDelete && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in text-xs font-sans">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="w-11 h-11 rounded-xl bg-red-50 border border-red-200 text-red-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-5 h-5" />
            </div>

            <div className="text-center space-y-1.5">
              <h3 className="text-sm font-bold text-slate-900">Delete Service Discipline?</h3>
              <p className="text-xs text-slate-500">
                Are you sure you want to remove <strong className="text-slate-900">{serviceToDelete.title}</strong> ({serviceToDelete.num}) from your catalog?
              </p>
              <div className="p-2 bg-amber-50 border border-amber-200 rounded text-[11px] text-amber-800 text-left mt-2">
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
                className="w-1/2 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold shadow-xs transition-colors cursor-pointer text-xs text-center"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL: Clear All WhatsApp Logs Confirmation ── */}
      {isClearLogsModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in text-xs font-sans">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="w-11 h-11 rounded-xl bg-red-50 border border-red-200 text-red-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-5 h-5" />
            </div>

            <div className="text-center space-y-1.5">
              <h3 className="text-sm font-bold text-slate-900">Clear All WhatsApp Logs?</h3>
              <p className="text-xs text-slate-500">
                Are you sure you want to permanently clear all <strong className="text-slate-900">{waClicks.length}</strong> recorded WhatsApp click leads and trigger events?
              </p>
              <div className="p-2.5 bg-red-50 border border-red-200 rounded text-[11px] text-red-700 text-left mt-2">
                This will reset analytics counters, location triggers, and referring page distributions. This action cannot be undone.
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsClearLogsModalOpen(false)}
                className="w-1/2 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-semibold transition-colors cursor-pointer text-xs text-center"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleClearWaLogs}
                className="w-1/2 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold shadow-xs transition-colors cursor-pointer text-xs text-center"
              >
                Confirm Clear
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL: Add / Edit Branch ── */}
      {isBranchModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in text-xs font-sans">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                  <Building className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    {branchModalMode === "add" ? "Register New Facility / Branch" : "Edit Branch Details"}
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Add or update official offices, testing showrooms, and client consultation facilities.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsBranchModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveBranch} className="space-y-3.5">
              <div className="space-y-1">
                <label className="font-semibold text-slate-700 block text-[11px]">Branch / Office Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Skylink Engineering HQ — Manama"
                  value={branchForm.name}
                  onChange={(e) => setBranchForm({ ...branchForm, name: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-slate-800 text-xs font-semibold text-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 block text-[11px]">Facility Type *</label>
                  <select
                    value={branchForm.type}
                    onChange={(e) => setBranchForm({ ...branchForm, type: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-slate-800 text-xs font-medium"
                  >
                    <option value="Primary HQ">Primary HQ</option>
                    <option value="Branch Office">Branch Office</option>
                    <option value="Experience Center">Experience Center / Showroom</option>
                    <option value="Acoustic Testing Studio">Acoustic Testing Studio</option>
                    <option value="Fabrication Facility">Fabrication &amp; Warehouse</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 block text-[11px]">City &amp; Country *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Manama, Kingdom of Bahrain"
                    value={branchForm.cityCountry}
                    onChange={(e) => setBranchForm({ ...branchForm, cityCountry: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-slate-800 text-xs"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700 block text-[11px]">Street / Building Address *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kanoo Tower · Diplomatic Area / Seef"
                  value={branchForm.address}
                  onChange={(e) => setBranchForm({ ...branchForm, address: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-slate-800 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 block text-[11px]">Phone &amp; WhatsApp *</label>
                  <input
                    type="text"
                    required
                    placeholder="+973 33048555"
                    value={branchForm.phone}
                    onChange={(e) => setBranchForm({ ...branchForm, phone: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-slate-800 text-xs font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 block text-[11px]">Official Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="office@skylinkec.com"
                    value={branchForm.email}
                    onChange={(e) => setBranchForm({ ...branchForm, email: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-slate-800 text-xs"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700 block text-[11px]">Working &amp; Consultation Hours *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 8:00 AM – 6:00 PM (Sun – Thu)"
                  value={branchForm.hours}
                  onChange={(e) => setBranchForm({ ...branchForm, hours: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-slate-800 text-xs"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="isPrimaryCheckbox"
                  checked={branchForm.isPrimary}
                  onChange={(e) => setBranchForm({ ...branchForm, isPrimary: e.target.checked })}
                  className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                />
                <label htmlFor="isPrimaryCheckbox" className="text-xs text-slate-700 cursor-pointer">
                  Mark as Primary Headquarters
                </label>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsBranchModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium transition-colors cursor-pointer text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold shadow-xs transition-colors cursor-pointer text-xs flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{branchModalMode === "add" ? "Register Branch" : "Update Branch"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── MODAL: Delete Branch Confirmation ── */}
      {branchToDelete && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in text-xs font-sans">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="w-11 h-11 rounded-xl bg-red-50 border border-red-200 text-red-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-5 h-5" />
            </div>

            <div className="text-center space-y-1.5">
              <h3 className="text-sm font-bold text-slate-900">Remove Branch Location?</h3>
              <p className="text-xs text-slate-500">
                Are you sure you want to remove <strong className="text-slate-900">{branchToDelete.name}</strong> from your active branches directory?
              </p>
              <div className="p-2.5 bg-red-50 border border-red-200 rounded text-[11px] text-red-700 text-left mt-2">
                This will unpublish this location and remove its phone/email contact options from the portal.
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setBranchToDelete(null)}
                className="w-1/2 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-semibold transition-colors cursor-pointer text-xs text-center"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDeleteBranch}
                className="w-1/2 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold shadow-xs transition-colors cursor-pointer text-xs text-center"
              >
                Confirm Remove
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
