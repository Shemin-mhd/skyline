"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { Lead } from "@/lib/leads-store";

const PASSCODE = "skylink2026";

interface AdminContextType {
  isAuthenticated: boolean;
  emailInput: string;
  setEmailInput: (val: string) => void;
  passwordInput: string;
  setPasswordInput: (val: string) => void;
  authError: string;
  setAuthError: (val: string) => void;
  handleLogin: (e: React.FormEvent) => Promise<void>;
  handleLogout: () => void;
  serverTime: string;
  currentDateStr: string;
  soundEnabled: boolean;
  setSoundEnabled: (val: boolean) => void;
  newLeadBanner: Lead | null;
  setNewLeadBanner: (val: Lead | null) => void;
  leads: Lead[];
  setLeads: React.Dispatch<React.SetStateAction<Lead[]>>;
  stats: {
    total: number;
    newCount: number;
    contactedCount: number;
    wonCount: number;
    whatsappCount: number;
    todayCount: number;
  };
  setStats: React.Dispatch<React.SetStateAction<{
    total: number;
    newCount: number;
    contactedCount: number;
    wonCount: number;
    whatsappCount: number;
    todayCount: number;
  }>>;
  isLiveConnected: boolean;
  fetchLeads: () => Promise<void>;
  playChime: () => void;
}

const AdminContext = createContext<AdminContextType | null>(null);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [emailInput, setEmailInput] = useState<string>("");
  const [passwordInput, setPasswordInput] = useState<string>("");
  const [authError, setAuthError] = useState<string>("");

  const [leads, setLeads] = useState<Lead[]>([]);
  const [stats, setStats] = useState({
    total: 6,
    newCount: 4,
    contactedCount: 2,
    wonCount: 1,
    whatsappCount: 6,
    todayCount: 3,
  });
  const [isLiveConnected, setIsLiveConnected] = useState<boolean>(true);

  const [serverTime, setServerTime] = useState<string>("17:49:58");
  const [currentDateStr, setCurrentDateStr] = useState<string>("Wed, 16 Sept 2026");

  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [newLeadBanner, setNewLeadBanner] = useState<Lead | null>(null);

  // Live Digital Clock
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

  // Check saved session
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("skylink_admin_auth");
      if (saved === "false") {
        setIsAuthenticated(false);
        setEmailInput("");
        setPasswordInput("");
        localStorage.removeItem("skylink_admin_email");
      } else {
        setIsAuthenticated(true);
        const savedEmail = localStorage.getItem("skylink_admin_email");
        if (savedEmail && savedEmail !== "office@skylinkec.com") {
          setEmailInput(savedEmail);
        }
      }
    }
  }, []);

  // Audio Chime for live leads
  const playChime = useCallback(() => {
    if (!soundEnabled || typeof window === "undefined") return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
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
      osc.stop(ctx.currentTime + 0.45);
    } catch {
      // Audio autoplay policy fallback
    }
  }, [soundEnabled]);

  // Fetch leads
  const fetchLeads = useCallback(async () => {
    try {
      const res = await fetch("/api/leads", { cache: "no-store" });
      const data = await res.json();
      if (data.success && Array.isArray(data.leads)) {
        setLeads(data.leads);
        const total = data.leads.length;
        const newCount = data.leads.filter((l: Lead) => l.status === "new").length;
        const contactedCount = data.leads.filter((l: Lead) => l.status === "contacted").length;
        const wonCount = data.leads.filter((l: Lead) => l.status === "won").length;
        const whatsappCount = data.leads.filter((l: Lead) => l.type === "whatsapp").length;

        const today = new Date().toISOString().slice(0, 10);
        const todayCount = data.leads.filter(
          (l: Lead) => l.createdAt && l.createdAt.slice(0, 10) === today
        ).length;

        setStats({
          total,
          newCount,
          contactedCount,
          wonCount,
          whatsappCount,
          todayCount,
        });
      }
    } catch (err) {
      console.error("Failed to load leads in AdminContext:", err);
    }
  }, []);

  // Real-time SSE listener
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
  }, [isAuthenticated, playChime, fetchLeads]);

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

  // Logout handler
  const handleLogout = () => {
    setIsAuthenticated(false);
    setEmailInput("");
    setPasswordInput("");
    localStorage.setItem("skylink_admin_auth", "false");
    localStorage.removeItem("skylink_admin_email");
  };

  return (
    <AdminContext.Provider
      value={{
        isAuthenticated,
        emailInput,
        setEmailInput,
        passwordInput,
        setPasswordInput,
        authError,
        setAuthError,
        handleLogin,
        handleLogout,
        serverTime,
        currentDateStr,
        soundEnabled,
        setSoundEnabled,
        newLeadBanner,
        setNewLeadBanner,
        leads,
        setLeads,
        stats,
        setStats,
        isLiveConnected,
        fetchLeads,
        playChime,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
}
