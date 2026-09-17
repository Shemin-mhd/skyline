import fs from "fs";
import path from "path";
import { db } from "./firebase";
import {
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  limit
} from "firebase/firestore";

export type LeadStatus = "new" | "contacted" | "in_discussion" | "won" | "closed" | "archived";
export type LeadType = "quote" | "contact" | "whatsapp" | "phone" | "manual";

export interface Lead {
  id: string;
  type: LeadType;
  name: string;
  phone: string;
  email?: string;
  company?: string;
  service: string;
  message?: string;
  source: string; // e.g., "Quote Modal", "Contact Form", "WhatsApp - Home Theater Page"
  triggerLocation?: string;
  pagePath?: string;
  device?: "Desktop" | "Mobile" | "Tablet";
  status: LeadStatus;
  notes?: string[];
  createdAt: string; // ISO format
  updatedAt?: string;
}

const DATA_DIR = path.join(process.cwd(), "data");
const LEADS_FILE = path.join(DATA_DIR, "leads.json");
const FIRESTORE_COLLECTION = "leads";

// In-memory cache for fast response times
let inMemoryLeadsCache: Lead[] | null = null;

// Subscribers for real-time SSE push
type SSECallback = (lead: Lead) => void;
const subscribers = new Set<SSECallback>();

export function subscribeLeads(callback: SSECallback) {
  subscribers.add(callback);
  return () => {
    subscribers.delete(callback);
  };
}

export function broadcastLead(lead: Lead) {
  subscribers.forEach((cb) => {
    try {
      cb(lead);
    } catch (e) {
      console.error("Error broadcasting to SSE subscriber:", e);
    }
  });
}

function ensureDataFile() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    if (!fs.existsSync(LEADS_FILE)) {
      const initialLeads: Lead[] = [
        {
          id: "lead-1001",
          type: "whatsapp",
          name: "Ahmed Al-Mansoor",
          phone: "+97339481234",
          email: "ahmed.mansoor@gmail.com",
          service: "Luxury Home Theater Solutions",
          message: "Inquiring about acoustic treatment and starry sky ceiling for private villa cinema in Riffa Views.",
          source: "WhatsApp — Home Theater Section",
          status: "new",
          notes: ["Client clicked WhatsApp from Home Theater page."],
          createdAt: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
        },
        {
          id: "lead-1002",
          type: "quote",
          name: "Sara Al-Khalifa",
          phone: "+97336119900",
          email: "sara.k@interiors-bh.com",
          company: "SK Design Studio",
          service: "Hotel & Apartment Acoustic Insulation",
          message: "Need certified wall partition soundproofing for 24 guest suites in Seef district.",
          source: "Quote Request Modal",
          status: "in_discussion",
          notes: ["Sent STC specification sheets and scheduled site inspection."],
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
        },
        {
          id: "lead-1003",
          type: "contact",
          name: "Rashid Bucheeri",
          phone: "+97338882104",
          email: "r.bucheeri@developments.bh",
          company: "Apex Contracting",
          service: "Residential & Commercial Fit-Out Solutions",
          message: "Looking for turnkey acoustic wall panels and coffered ceiling baffles for an executive office suite in Kanoo Tower.",
          source: "Contact Page Form",
          status: "contacted",
          notes: ["Called client, requested architectural CAD layout."],
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
        },
        {
          id: "lead-1004",
          type: "whatsapp",
          name: "Tariq Mahmood",
          phone: "+97333221144",
          service: "Gym Floor Acoustic Insulation",
          message: "Impact and weight-drop noise transmission into lower offices. Need decoupled gym flooring quote.",
          source: "WhatsApp — Gym Floor Section",
          status: "new",
          notes: ["Client requested site acoustic audit."],
          createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
        },
        {
          id: "lead-1005",
          type: "quote",
          name: "Dr. Fatima Al-Zayani",
          phone: "+97337774433",
          email: "f.zayani@medical.bh",
          service: "Starry Sky Luxury Lighting",
          message: "Interested in bespoke fiber-optic ceiling for master bedroom suite.",
          source: "Quote Request Modal",
          status: "won",
          notes: ["Agreement signed, installation scheduled for next week."],
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
        }
      ];

      fs.writeFileSync(LEADS_FILE, JSON.stringify(initialLeads, null, 2), "utf-8");
    }
  } catch (err) {
    // In serverless environments where fs is restricted, fallback gracefully
    console.warn("Local data file notice:", err);
  }
}

/**
 * Reads leads from local storage / cache synchronously
 */
export function getAllLeads(): Lead[] {
  if (inMemoryLeadsCache && inMemoryLeadsCache.length > 0) {
    return inMemoryLeadsCache;
  }
  try {
    ensureDataFile();
    if (fs.existsSync(LEADS_FILE)) {
      const data = fs.readFileSync(LEADS_FILE, "utf-8");
      const leads: Lead[] = JSON.parse(data);
      inMemoryLeadsCache = leads.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      return inMemoryLeadsCache;
    }
  } catch (error) {
    console.warn("Could not read local leads file:", error);
  }
  return inMemoryLeadsCache || [];
}

/**
 * Asynchronously fetches leads from Firebase Firestore.
 * Automatically synchronizes with local storage and in-memory cache.
 */
export async function getAllLeadsAsync(): Promise<Lead[]> {
  try {
    if (db) {
      const leadsCol = collection(db, FIRESTORE_COLLECTION);
      const q = query(leadsCol, orderBy("createdAt", "desc"), limit(200));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const firestoreLeads: Lead[] = [];
        querySnapshot.forEach((docSnap) => {
          firestoreLeads.push({
            id: docSnap.id,
            ...(docSnap.data() as Omit<Lead, "id">),
          });
        });

        // Update in-memory cache
        inMemoryLeadsCache = firestoreLeads;

        // Persist to local JSON if filesystem is writable
        try {
          ensureDataFile();
          fs.writeFileSync(LEADS_FILE, JSON.stringify(firestoreLeads, null, 2), "utf-8");
        } catch {}

        return firestoreLeads;
      }
    }
  } catch (firestoreError: any) {
    console.warn("Firestore fetch error (falling back to cache):", firestoreError?.message || firestoreError);
  }

  // Fallback to local synchronous leads
  return getAllLeads();
}

/**
 * Saves a new lead:
 * 1. Immediately writes to local memory and cache
 * 2. Writes asynchronously to Firebase Cloud Firestore
 * 3. Broadcasts via SSE to active Admin Dashboard sessions
 */
export function saveLead(leadData: Omit<Lead, "id" | "createdAt" | "status"> & { id?: string; status?: LeadStatus }): Lead {
  ensureDataFile();
  const leads = getAllLeads();

  const newLead: Lead = {
    id: leadData.id || `lead-${Date.now()}`,
    type: leadData.type || "contact",
    name: leadData.name || "Anonymous Visitor",
    phone: leadData.phone || "",
    email: leadData.email,
    company: leadData.company,
    service: leadData.service || "General Inquiry",
    message: leadData.message,
    source: leadData.source || "Website Form",
    triggerLocation: leadData.triggerLocation,
    pagePath: leadData.pagePath,
    device: leadData.device,
    status: leadData.status || "new",
    notes: leadData.notes || [],
    createdAt: new Date().toISOString(),
  };

  // Prepend to in-memory list
  leads.unshift(newLead);
  inMemoryLeadsCache = leads;

  try {
    fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), "utf-8");
  } catch (fsErr) {
    console.warn("Warning writing local file:", fsErr);
  }

  // Broadcast to all active SSE subscribers (admin dashboard live update)
  broadcastLead(newLead);

  // Sync to Firebase Cloud Firestore asynchronously
  if (db) {
    setDoc(doc(db, FIRESTORE_COLLECTION, newLead.id), newLead)
      .then(() => {
        console.log(`[Firebase] Successfully synced lead ${newLead.id} to Firestore`);
      })
      .catch((err) => {
        console.warn("[Firebase] Could not save to Firestore:", err?.message || err);
      });
  }

  return newLead;
}

/**
 * Updates a lead in both local memory and Firebase Firestore
 */
export function updateLead(id: string, updates: Partial<Lead>): Lead | null {
  ensureDataFile();
  const leads = getAllLeads();
  const index = leads.findIndex((l) => l.id === id);

  if (index === -1) return null;

  leads[index] = {
    ...leads[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  inMemoryLeadsCache = leads;

  try {
    fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), "utf-8");
  } catch (fsErr) {
    console.warn("Warning writing local file:", fsErr);
  }

  // Sync update to Firebase Cloud Firestore
  if (db) {
    updateDoc(doc(db, FIRESTORE_COLLECTION, id), {
      ...updates,
      updatedAt: leads[index].updatedAt,
    }).catch((err) => {
      console.warn("[Firebase] Could not update lead in Firestore:", err?.message || err);
    });
  }

  return leads[index];
}

/**
 * Adds a note to a lead and syncs to Firebase Firestore
 */
export function addLeadNote(id: string, note: string): Lead | null {
  ensureDataFile();
  const leads = getAllLeads();
  const index = leads.findIndex((l) => l.id === id);

  if (index === -1) return null;

  const currentNotes = leads[index].notes || [];
  const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const updatedNotes = [...currentNotes, `[${timestamp}] ${note}`];

  leads[index].notes = updatedNotes;
  leads[index].updatedAt = new Date().toISOString();

  inMemoryLeadsCache = leads;

  try {
    fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), "utf-8");
  } catch (fsErr) {
    console.warn("Warning writing local file:", fsErr);
  }

  // Sync to Firebase Cloud Firestore
  if (db) {
    updateDoc(doc(db, FIRESTORE_COLLECTION, id), {
      notes: updatedNotes,
      updatedAt: leads[index].updatedAt,
    }).catch((err) => {
      console.warn("[Firebase] Could not sync note to Firestore:", err?.message || err);
    });
  }

  return leads[index];
}

/**
 * Deletes a lead from local cache and Firebase Firestore
 */
export function deleteLead(id: string): boolean {
  ensureDataFile();
  const leads = getAllLeads();
  const filtered = leads.filter((l) => l.id !== id);

  if (filtered.length === leads.length) return false;

  inMemoryLeadsCache = filtered;

  try {
    fs.writeFileSync(LEADS_FILE, JSON.stringify(filtered, null, 2), "utf-8");
  } catch (fsErr) {
    console.warn("Warning writing local file:", fsErr);
  }

  // Delete from Firebase Cloud Firestore
  if (db) {
    deleteDoc(doc(db, FIRESTORE_COLLECTION, id)).catch((err) => {
      console.warn("[Firebase] Could not delete lead from Firestore:", err?.message || err);
    });
  }

  return true;
}

export function getLeadStats() {
  const leads = getAllLeads();
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();

  const total = leads.length;
  const newCount = leads.filter((l) => l.status === "new").length;
  const contactedCount = leads.filter((l) => l.status === "contacted" || l.status === "in_discussion").length;
  const wonCount = leads.filter((l) => l.status === "won").length;
  const whatsappCount = leads.filter((l) => l.type === "whatsapp").length;
  const todayCount = leads.filter((l) => new Date(l.createdAt).getTime() >= todayStart).length;

  return {
    total,
    newCount,
    contactedCount,
    wonCount,
    whatsappCount,
    todayCount,
  };
}

export function clearLeadsByType(type?: LeadType): boolean {
  ensureDataFile();
  const leads = getAllLeads();
  const filtered = type ? leads.filter((l) => l.type !== type) : [];
  inMemoryLeadsCache = filtered;

  try {
    fs.writeFileSync(LEADS_FILE, JSON.stringify(filtered, null, 2), "utf-8");
  } catch (fsErr) {
    console.warn("Warning writing local file:", fsErr);
  }

  return true;
}
