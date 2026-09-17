/**
 * Tracks WhatsApp click leads and sends beacon to /api/leads/track-whatsapp
 */
export function trackWhatsAppLead(source: string, service?: string, defaultMessage?: string) {
  try {
    const payload = JSON.stringify({
      source,
      service: service || "General Acoustic Inquiry",
      message: defaultMessage || `Inquiry initiated from ${source}`,
      timestamp: new Date().toISOString(),
    });

    if (typeof navigator !== "undefined" && navigator.sendBeacon) {
      const blob = new Blob([payload], { type: "application/json" });
      navigator.sendBeacon("/api/leads/track-whatsapp", blob);
    } else {
      fetch("/api/leads/track-whatsapp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payload,
        keepalive: true,
      }).catch((err) => console.error("Tracking error:", err));
    }
  } catch (error) {
    console.error("Failed to track WhatsApp lead:", error);
  }
}
