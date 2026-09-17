"use client";

import { useState, useEffect } from "react";

export const DEFAULT_WHATSAPP_NUMBER = "+973 33048555";

export function cleanPhoneForWhatsApp(phone: string): string {
  if (!phone) return "97333048555";
  // Strip all non-digit characters
  const digits = phone.replace(/\D/g, "");
  return digits || "97333048555";
}

export function formatWhatsAppUrl(phone: string, message?: string): string {
  const clean = cleanPhoneForWhatsApp(phone);
  const base = `https://wa.me/${clean}`;
  if (message) {
    return `${base}?text=${encodeURIComponent(message)}`;
  }
  return base;
}

// Global cache for instant access across all mounted components without waterfall delays
let cachedActiveNumber: string = DEFAULT_WHATSAPP_NUMBER;
let isFetchingSettings = false;
const listeners = new Set<(num: string) => void>();

function notifyListeners(num: string) {
  cachedActiveNumber = num;
  listeners.forEach((fn) => fn(num));
}

export function useWhatsAppNumber() {
  const [activeNumber, setActiveNumber] = useState<string>(cachedActiveNumber);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleUpdate = (newNum: string) => {
      setActiveNumber(newNum);
    };

    listeners.add(handleUpdate);

    // Fetch active number from API if not yet fetched or on mount
    async function fetchActiveNumber() {
      if (isFetchingSettings) return;
      isFetchingSettings = true;
      try {
        const res = await fetch("/api/settings", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          if (data?.settings?.activeWhatsApp) {
            notifyListeners(data.settings.activeWhatsApp);
          }
        }
      } catch (err) {
        console.warn("Failed to fetch dynamic WhatsApp number, using default:", err);
      } finally {
        isFetchingSettings = false;
        setLoading(false);
      }
    }

    fetchActiveNumber();

    return () => {
      listeners.delete(handleUpdate);
    };
  }, []);

  const cleanNumber = cleanPhoneForWhatsApp(activeNumber);

  const getWhatsAppUrl = (message?: string) => {
    return formatWhatsAppUrl(activeNumber, message);
  };

  return {
    activeNumber,
    cleanNumber,
    getWhatsAppUrl,
    loading,
  };
}
