import { NextRequest, NextResponse } from "next/server";
import { updateBranch, deleteBranch } from "@/lib/branches-store";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const updated = updateBranch(id, body);
    if (!updated) {
      return NextResponse.json({ success: false, error: "Branch not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, branch: updated });
  } catch (error) {
    console.error("Failed to update branch:", error);
    return NextResponse.json({ success: false, error: "Failed to update branch" }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const success = deleteBranch(id);
    if (!success) {
      return NextResponse.json({ success: false, error: "Branch not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete branch:", error);
    return NextResponse.json({ success: false, error: "Failed to delete branch" }, { status: 500 });
  }
}
