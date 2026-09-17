import { NextRequest, NextResponse } from "next/server";
import { saveLead } from "@/lib/leads-store";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const newLead = saveLead({
      type: "whatsapp",
      name: body.name || "WhatsApp Inquirer",
      phone: body.phone || "+973 (WhatsApp Click)",
      service: body.service || "General WhatsApp Inquiry",
      message: body.message || `User clicked WhatsApp CTA from: ${body.source || "Website"}`,
      source: body.source || "WhatsApp Button",
      status: "new",
      notes: [`Instant click logged at ${new Date().toLocaleTimeString()} from ${body.source || "Unknown Page"}`],
    });

    return NextResponse.json({ success: true, lead: newLead });
  } catch (error) {
    console.error("Error tracking WhatsApp lead:", error);
    return NextResponse.json({ success: false, error: "Failed to log WhatsApp click" }, { status: 500 });
  }
}
