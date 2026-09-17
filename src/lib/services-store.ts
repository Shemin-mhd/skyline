import fs from "fs";
import path from "path";

export interface ServiceItem {
  id: string;
  num: string;
  title: string;
  category: string;
  description: string;
  specs?: string;
  link: string;
  status: "Active" | "Draft" | "Archived";
  inquiriesCount?: number;
}

const SERVICES_FILE = path.join(process.cwd(), "data", "services.json");

export function getServices(): ServiceItem[] {
  try {
    if (!fs.existsSync(SERVICES_FILE)) {
      return [];
    }
    const raw = fs.readFileSync(SERVICES_FILE, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    console.error("Failed to read services.json:", err);
    return [];
  }
}

export function saveServices(services: ServiceItem[]) {
  try {
    const dir = path.dirname(SERVICES_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(SERVICES_FILE, JSON.stringify(services, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to save services.json:", err);
  }
}

export function addService(service: Omit<ServiceItem, "id">): ServiceItem {
  const current = getServices();
  const newService: ServiceItem = {
    ...service,
    id: `srv-${Date.now()}`,
    num: service.num || String(current.length + 1).padStart(2, "0"),
    inquiriesCount: 0,
  };
  const updated = [...current, newService];
  saveServices(updated);
  return newService;
}

export function updateService(id: string, updates: Partial<ServiceItem>): ServiceItem | null {
  const current = getServices();
  const idx = current.findIndex((s) => s.id === id);
  if (idx === -1) return null;
  current[idx] = { ...current[idx], ...updates };
  saveServices(current);
  return current[idx];
}

export function deleteService(id: string): boolean {
  const current = getServices();
  const filtered = current.filter((s) => s.id !== id);
  if (filtered.length === current.length) return false;
  saveServices(filtered);
  return true;
}
