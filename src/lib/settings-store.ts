import fs from "fs";
import path from "path";
import { db } from "./firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export interface WhatsAppNumber {
  id: string;
  name: string;
  phone: string;
  isActive: boolean;
  createdAt: string;
}

export interface SiteSettings {
  activeWhatsApp: string;
  publicDisplayPhone?: string;
  notificationEmail?: string;
  defaultGreetingMessage?: string;
  socialLinks?: {
    instagram?: string;
    linkedin?: string;
    facebook?: string;
    youtube?: string;
    x?: string;
  };
  companyProfile?: {
    legalName?: string;
    address?: string;
    cityCountry?: string;
    hours?: string;
  };
  whatsAppNumbers: WhatsAppNumber[];
}

const DATA_DIR = path.join(process.cwd(), "data");
const SETTINGS_FILE = path.join(DATA_DIR, "settings.json");
const DEFAULT_PHONE = "+973 33048555";

export const DEFAULT_SETTINGS: SiteSettings = {
  activeWhatsApp: DEFAULT_PHONE,
  publicDisplayPhone: "+973 3304 8555",
  notificationEmail: "office@skylinkec.com",
  defaultGreetingMessage: "Hello Skylink Acoustics, I would like to inquire about acoustic engineering consultation and architectural soundproofing services.",
  socialLinks: {
    instagram: "https://instagram.com/skylinkacoustics",
    linkedin: "https://linkedin.com/company/skylink-acoustics",
    facebook: "",
    youtube: "",
    x: "",
  },
  companyProfile: {
    legalName: "Skylink Acoustics & Engineering Services W.L.L.",
    address: "Kanoo Tower · Diplomatic Area / Seef",
    cityCountry: "Kingdom of Bahrain",
    hours: "8:00 AM – 6:00 PM (Sun – Thu)",
  },
  whatsAppNumbers: [
    {
      id: "wa-primary",
      name: "Main Headquarters / Office",
      phone: DEFAULT_PHONE,
      isActive: true,
      createdAt: new Date().toISOString(),
    },
  ],
};

let inMemorySettingsCache: SiteSettings | null = null;

function ensureSettingsFile(): SiteSettings {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    if (!fs.existsSync(SETTINGS_FILE)) {
      fs.writeFileSync(SETTINGS_FILE, JSON.stringify(DEFAULT_SETTINGS, null, 2), "utf-8");
      return DEFAULT_SETTINGS;
    }

    const raw = fs.readFileSync(SETTINGS_FILE, "utf-8");
    const parsed = JSON.parse(raw) as SiteSettings;
    if (!parsed.whatsAppNumbers || parsed.whatsAppNumbers.length === 0) {
      fs.writeFileSync(SETTINGS_FILE, JSON.stringify(DEFAULT_SETTINGS, null, 2), "utf-8");
      return DEFAULT_SETTINGS;
    }
    return parsed;
  } catch (error) {
    console.error("Failed to read settings file, using defaults:", error);
    return DEFAULT_SETTINGS;
  }
}

export async function getSettings(): Promise<SiteSettings> {
  if (inMemorySettingsCache) {
    return inMemorySettingsCache;
  }

  // Attempt to read from Firestore if available
  if (db) {
    try {
      const docRef = doc(db, "settings", "contact");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data() as SiteSettings;
        inMemorySettingsCache = data;
        try {
          fs.writeFileSync(SETTINGS_FILE, JSON.stringify(data, null, 2), "utf-8");
        } catch {
          // ignore local fs error on read-only environments
        }
        return data;
      }
    } catch (e) {
      console.warn("Firestore settings read failed, falling back to local file:", e);
    }
  }

  const fileSettings = ensureSettingsFile();
  inMemorySettingsCache = fileSettings;
  return fileSettings;
}

export async function saveSettings(settings: SiteSettings): Promise<SiteSettings> {
  inMemorySettingsCache = settings;

  // 1. Write to local JSON file
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(SETTINGS_FILE, JSON.stringify(settings, null, 2), "utf-8");
  } catch (e) {
    console.error("Error saving settings to file:", e);
  }

  // 2. Sync to Firestore if available
  if (db) {
    try {
      const docRef = doc(db, "settings", "contact");
      await setDoc(docRef, settings, { merge: true });
    } catch (e) {
      console.warn("Error saving settings to Firestore:", e);
    }
  }

  return settings;
}

export async function addWhatsAppNumber(
  name: string,
  phone: string,
  setActiveImmediately: boolean = false
): Promise<SiteSettings> {
  const settings = await getSettings();
  const trimmedPhone = phone.trim();
  const trimmedName = name.trim() || "WhatsApp Line";

  const newId = `wa-${Date.now()}`;
  let updatedNumbers = settings.whatsAppNumbers.map((num) =>
    setActiveImmediately ? { ...num, isActive: false } : num
  );

  const newEntry: WhatsAppNumber = {
    id: newId,
    name: trimmedName,
    phone: trimmedPhone,
    isActive: setActiveImmediately || updatedNumbers.length === 0,
    createdAt: new Date().toISOString(),
  };

  updatedNumbers.push(newEntry);

  const activeWhatsApp = setActiveImmediately
    ? trimmedPhone
    : settings.activeWhatsApp || trimmedPhone;

  const newSettings: SiteSettings = {
    activeWhatsApp,
    whatsAppNumbers: updatedNumbers,
  };

  return await saveSettings(newSettings);
}

export async function setActiveWhatsAppNumber(id: string): Promise<SiteSettings> {
  const settings = await getSettings();
  const target = settings.whatsAppNumbers.find((n) => n.id === id);

  if (!target) {
    throw new Error(`WhatsApp number with id ${id} not found.`);
  }

  const updatedNumbers = settings.whatsAppNumbers.map((num) => ({
    ...num,
    isActive: num.id === id,
  }));

  const newSettings: SiteSettings = {
    activeWhatsApp: target.phone,
    whatsAppNumbers: updatedNumbers,
  };

  return await saveSettings(newSettings);
}

export async function updateWhatsAppNumber(
  id: string,
  name: string,
  phone: string
): Promise<SiteSettings> {
  const settings = await getSettings();
  const trimmedPhone = phone.trim();
  const trimmedName = name.trim();

  let newActiveWhatsApp = settings.activeWhatsApp;

  const updatedNumbers = settings.whatsAppNumbers.map((num) => {
    if (num.id === id) {
      if (num.isActive) {
        newActiveWhatsApp = trimmedPhone;
      }
      return {
        ...num,
        name: trimmedName || num.name,
        phone: trimmedPhone || num.phone,
      };
    }
    return num;
  });

  const newSettings: SiteSettings = {
    activeWhatsApp: newActiveWhatsApp,
    whatsAppNumbers: updatedNumbers,
  };

  return await saveSettings(newSettings);
}

export async function deleteWhatsAppNumber(id: string): Promise<SiteSettings> {
  const settings = await getSettings();
  if (settings.whatsAppNumbers.length <= 1) {
    throw new Error("Cannot delete the only configured WhatsApp number.");
  }

  const remainingNumbers = settings.whatsAppNumbers.filter((n) => n.id !== id);
  const wasActive = !remainingNumbers.some((n) => n.isActive);

  if (wasActive && remainingNumbers.length > 0) {
    remainingNumbers[0].isActive = true;
  }

  const activeNum = remainingNumbers.find((n) => n.isActive) || remainingNumbers[0];

  const newSettings: SiteSettings = {
    activeWhatsApp: activeNum.phone,
    whatsAppNumbers: remainingNumbers,
  };

  return await saveSettings(newSettings);
}

export async function updateGeneralSettings(data: {
  activeWhatsApp?: string;
  publicDisplayPhone?: string;
  notificationEmail?: string;
  defaultGreetingMessage?: string;
  socialLinks?: SiteSettings["socialLinks"];
  companyProfile?: SiteSettings["companyProfile"];
}): Promise<SiteSettings> {
  const current = await getSettings();

  const activeWhatsApp = data.activeWhatsApp?.trim() || current.activeWhatsApp;

  // Keep whatsAppNumbers pool updated with any phone update
  let updatedNumbers = current.whatsAppNumbers;
  if (data.activeWhatsApp && data.activeWhatsApp.trim() !== current.activeWhatsApp) {
    const activeIndex = updatedNumbers.findIndex((n) => n.isActive);
    if (activeIndex !== -1) {
      updatedNumbers = updatedNumbers.map((n, idx) =>
        idx === activeIndex ? { ...n, phone: data.activeWhatsApp!.trim() } : n
      );
    } else {
      updatedNumbers = [
        ...updatedNumbers.map((n) => ({ ...n, isActive: false })),
        {
          id: `wa-${Date.now()}`,
          name: "Main Active Desk",
          phone: data.activeWhatsApp.trim(),
          isActive: true,
          createdAt: new Date().toISOString(),
        },
      ];
    }
  }

  const newSettings: SiteSettings = {
    ...current,
    activeWhatsApp,
    publicDisplayPhone: data.publicDisplayPhone !== undefined ? data.publicDisplayPhone : current.publicDisplayPhone,
    notificationEmail: data.notificationEmail !== undefined ? data.notificationEmail : current.notificationEmail,
    defaultGreetingMessage: data.defaultGreetingMessage !== undefined ? data.defaultGreetingMessage : current.defaultGreetingMessage,
    socialLinks: data.socialLinks !== undefined ? { ...current.socialLinks, ...data.socialLinks } : current.socialLinks,
    companyProfile: data.companyProfile !== undefined ? { ...current.companyProfile, ...data.companyProfile } : current.companyProfile,
    whatsAppNumbers: updatedNumbers,
  };

  return await saveSettings(newSettings);
}
