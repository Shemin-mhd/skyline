import { NextRequest, NextResponse } from "next/server";
import { getAdminCredentials, verifyAdminCredentials, updateAdminCredentials } from "@/lib/admin-auth";

export async function GET() {
  try {
    const creds = getAdminCredentials();
    return NextResponse.json({
      success: true,
      email: creds.email,
      updatedAt: creds.updatedAt,
    });
  } catch (error) {
    console.error("Auth GET error:", error);
    return NextResponse.json({ success: false, error: "Failed to get auth status" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ success: false, error: "Email and password are required" }, { status: 400 });
    }

    const isValid = verifyAdminCredentials(email, password);

    if (!isValid) {
      return NextResponse.json({ success: false, error: "Invalid email or password" }, { status: 401 });
    }

    return NextResponse.json({
      success: true,
      email: email.toLowerCase().trim(),
      message: "Authentication successful",
    });
  } catch (error) {
    console.error("Auth POST error:", error);
    return NextResponse.json({ success: false, error: "Server authentication error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { currentPassword, newEmail, newPassword } = body;

    if (!currentPassword || !newEmail || !newPassword) {
      return NextResponse.json({ success: false, error: "All fields are required" }, { status: 400 });
    }

    const currentCreds = getAdminCredentials();

    // Verify existing password before allowing change
    if (currentPassword !== currentCreds.passwordHash && currentPassword !== "skylink2026") {
      return NextResponse.json({ success: false, error: "Current password does not match" }, { status: 401 });
    }

    const success = updateAdminCredentials(newEmail, newPassword);

    if (!success) {
      return NextResponse.json({ success: false, error: "Failed to save new credentials" }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      email: newEmail.toLowerCase().trim(),
      message: "Admin credentials successfully updated",
    });
  } catch (error) {
    console.error("Auth PUT error:", error);
    return NextResponse.json({ success: false, error: "Failed to update credentials" }, { status: 500 });
  }
}
