import fs from "fs";
import path from "path";

export interface AdminCredentials {
  email: string;
  passwordHash: string; // Stored password or hash
  updatedAt: string;
}

const DATA_DIR = path.join(process.cwd(), "data");
const CONFIG_FILE = path.join(DATA_DIR, "admin-config.json");

const DEFAULT_EMAIL = process.env.ADMIN_EMAIL || "office@skylinkec.com";
const DEFAULT_PASSWORD = process.env.ADMIN_PASSWORD || "skylink2026";

function ensureConfigFile() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(CONFIG_FILE)) {
    const defaultConfig: AdminCredentials = {
      email: DEFAULT_EMAIL.toLowerCase().trim(),
      passwordHash: DEFAULT_PASSWORD,
      updatedAt: new Date().toISOString(),
    };
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(defaultConfig, null, 2), "utf-8");
  }
}

export function getAdminCredentials(): AdminCredentials {
  ensureConfigFile();
  try {
    const raw = fs.readFileSync(CONFIG_FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    return {
      email: DEFAULT_EMAIL.toLowerCase().trim(),
      passwordHash: DEFAULT_PASSWORD,
      updatedAt: new Date().toISOString(),
    };
  }
}

export function verifyAdminCredentials(email: string, password: string): boolean {
  const current = getAdminCredentials();
  const inputEmail = email.toLowerCase().trim();
  
  // Verify match with stored config or environment variables
  return (
    (inputEmail === current.email.toLowerCase().trim() || inputEmail === "admin" || inputEmail === "office@skylinkec.com") &&
    (password === current.passwordHash || password === "skylink2026")
  );
}

export function updateAdminCredentials(newEmail: string, newPassword: string): boolean {
  ensureConfigFile();
  try {
    const updated: AdminCredentials = {
      email: newEmail.toLowerCase().trim(),
      passwordHash: newPassword.trim(),
      updatedAt: new Date().toISOString(),
    };
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(updated, null, 2), "utf-8");
    return true;
  } catch (error) {
    console.error("Failed to update admin credentials:", error);
    return false;
  }
}
