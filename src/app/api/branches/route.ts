import { NextRequest, NextResponse } from "next/server";
import { getBranches, addBranch } from "@/lib/branches-store";

export async function GET() {
  try {
    const branches = getBranches();
    return NextResponse.json({ success: true, branches });
  } catch (error) {
    console.error("Failed to get branches:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch branches" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.name) {
      return NextResponse.json({ success: false, error: "Branch name is required" }, { status: 400 });
    }

    const newBranch = addBranch({
      name: body.name,
      type: body.type || "Branch Office",
      address: body.address || "",
      cityCountry: body.cityCountry || "Manama, Kingdom of Bahrain",
      phone: body.phone || "+973 33048555",
      email: body.email || "office@skylinkec.com",
      hours: body.hours || "8:00 AM – 6:00 PM (Sun – Thu)",
      isPrimary: body.isPrimary || false,
    });

    return NextResponse.json({ success: true, branch: newBranch }, { status: 201 });
  } catch (error) {
    console.error("Failed to create branch:", error);
    return NextResponse.json({ success: false, error: "Failed to create branch" }, { status: 500 });
  }
}
