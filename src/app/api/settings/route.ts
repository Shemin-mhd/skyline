import { NextRequest, NextResponse } from "next/server";
import {
  getSettings,
  addWhatsAppNumber,
  setActiveWhatsAppNumber,
  updateWhatsAppNumber,
  deleteWhatsAppNumber,
} from "@/lib/settings-store";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const settings = await getSettings();
    return NextResponse.json({
      success: true,
      settings,
    });
  } catch (error: any) {
    console.error("GET /api/settings error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to fetch settings" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action } = body;

    let updatedSettings;

    switch (action) {
      case "add": {
        const { name, phone, setActiveImmediately } = body;
        if (!phone || typeof phone !== "string" || !phone.trim()) {
          return NextResponse.json(
            { success: false, message: "A valid phone number is required." },
            { status: 400 }
          );
        }
        updatedSettings = await addWhatsAppNumber(
          name || "WhatsApp Contact",
          phone.trim(),
          Boolean(setActiveImmediately)
        );
        break;
      }

      case "setActive": {
        const { id } = body;
        if (!id) {
          return NextResponse.json(
            { success: false, message: "ID is required to set active number." },
            { status: 400 }
          );
        }
        updatedSettings = await setActiveWhatsAppNumber(id);
        break;
      }

      case "update": {
        const { id, name, phone } = body;
        if (!id || !phone) {
          return NextResponse.json(
            { success: false, message: "ID and phone number are required." },
            { status: 400 }
          );
        }
        updatedSettings = await updateWhatsAppNumber(id, name, phone);
        break;
      }

      case "delete": {
        const { id } = body;
        if (!id) {
          return NextResponse.json(
            { success: false, message: "ID is required to delete number." },
            { status: 400 }
          );
        }
        updatedSettings = await deleteWhatsAppNumber(id);
        break;
      }

      case "saveGeneral": {
        const {
          activeWhatsApp,
          publicDisplayPhone,
          notificationEmail,
          defaultGreetingMessage,
          socialLinks,
          companyProfile,
        } = body;
        const { updateGeneralSettings } = await import("@/lib/settings-store");
        updatedSettings = await updateGeneralSettings({
          activeWhatsApp,
          publicDisplayPhone,
          notificationEmail,
          defaultGreetingMessage,
          socialLinks,
          companyProfile,
        });
        break;
      }

      default:
        return NextResponse.json(
          { success: false, message: `Unknown action: ${action}` },
          { status: 400 }
        );
    }

    return NextResponse.json({
      success: true,
      settings: updatedSettings,
    });
  } catch (error: any) {
    console.error("POST /api/settings error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to update settings" },
      { status: 500 }
    );
  }
}
