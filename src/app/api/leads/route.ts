import { NextRequest, NextResponse } from "next/server";
import { getAllLeadsAsync, getLeadStats, saveLead } from "@/lib/leads-store";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const type = searchParams.get("type");
    const search = searchParams.get("search")?.toLowerCase();

    let leads = await getAllLeadsAsync();

    if (status && status !== "all") {
      leads = leads.filter((l) => l.status === status);
    }

    if (type && type !== "all") {
      leads = leads.filter((l) => l.type === type);
    }

    if (search) {
      leads = leads.filter(
        (l) =>
          l.name.toLowerCase().includes(search) ||
          l.phone.toLowerCase().includes(search) ||
          (l.email && l.email.toLowerCase().includes(search)) ||
          (l.company && l.company.toLowerCase().includes(search)) ||
          l.service.toLowerCase().includes(search) ||
          (l.message && l.message.toLowerCase().includes(search))
      );
    }

    const stats = getLeadStats();

    return NextResponse.json({
      success: true,
      leads,
      stats,
    });
  } catch (error) {
    console.error("Error fetching leads:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch leads" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.phone && !body.email && !body.name) {
      return NextResponse.json(
        { success: false, error: "At least name, phone, or email is required" },
        { status: 400 }
      );
    }

    const newLead = saveLead({
      type: body.type || "quote",
      name: body.name || "Website Lead",
      phone: body.phone || "",
      email: body.email,
      company: body.company,
      service: body.service || "General Acoustic Inquiry",
      message: body.message,
      source: body.source || "Website Form",
      status: "new",
      notes: body.notes || [],
    });

    return NextResponse.json({
      success: true,
      lead: newLead,
    }, { status: 201 });
  } catch (error) {
    console.error("Error creating lead:", error);
    return NextResponse.json({ success: false, error: "Failed to create lead" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type") as any;
    const { clearLeadsByType } = await import("@/lib/leads-store");
    clearLeadsByType(type || undefined);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error clearing leads:", error);
    return NextResponse.json({ success: false, error: "Failed to clear leads" }, { status: 500 });
  }
}

