import { NextRequest, NextResponse } from "next/server";
import { getServices, addService, updateService, deleteService } from "@/lib/services-store";

export async function GET() {
  try {
    const services = getServices();
    return NextResponse.json({ success: true, services });
  } catch (err) {
    console.error("GET /api/services error:", err);
    return NextResponse.json({ success: false, error: "Failed to load services" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.title) {
      return NextResponse.json({ success: false, error: "Service title is required" }, { status: 400 });
    }
    const created = addService({
      num: body.num || "",
      title: body.title,
      category: body.category || "General Acoustic",
      description: body.description || "",
      specs: body.specs || "",
      link: body.link || "/#services",
      status: body.status || "Active",
    });
    return NextResponse.json({ success: true, service: created });
  } catch (err) {
    console.error("POST /api/services error:", err);
    return NextResponse.json({ success: false, error: "Failed to create service" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.id) {
      return NextResponse.json({ success: false, error: "Service ID is required" }, { status: 400 });
    }
    const updated = updateService(body.id, body);
    if (!updated) {
      return NextResponse.json({ success: false, error: "Service not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, service: updated });
  } catch (err) {
    console.error("PUT /api/services error:", err);
    return NextResponse.json({ success: false, error: "Failed to update service" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ success: false, error: "Service ID is required" }, { status: 400 });
    }
    const success = deleteService(id);
    if (!success) {
      return NextResponse.json({ success: false, error: "Service not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE /api/services error:", err);
    return NextResponse.json({ success: false, error: "Failed to delete service" }, { status: 500 });
  }
}
