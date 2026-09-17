import fs from "fs";
import path from "path";

export interface BranchItem {
  id: string;
  name: string;
  type: string;
  address: string;
  cityCountry: string;
  phone: string;
  email: string;
  hours: string;
  isPrimary?: boolean;
}

const BRANCHES_FILE = path.join(process.cwd(), "data", "branches.json");

export function getBranches(): BranchItem[] {
  try {
    if (!fs.existsSync(BRANCHES_FILE)) {
      return [];
    }
    const raw = fs.readFileSync(BRANCHES_FILE, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    console.error("Failed to read branches.json:", err);
    return [];
  }
}

export function saveBranches(branches: BranchItem[]) {
  try {
    const dir = path.dirname(BRANCHES_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(BRANCHES_FILE, JSON.stringify(branches, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to save branches.json:", err);
  }
}

export function addBranch(branch: Omit<BranchItem, "id">): BranchItem {
  const current = getBranches();
  const newBranch: BranchItem = {
    ...branch,
    id: `branch-${Date.now()}`,
  };
  const updated = [...current, newBranch];
  saveBranches(updated);
  return newBranch;
}

export function updateBranch(id: string, updates: Partial<BranchItem>): BranchItem | null {
  const current = getBranches();
  const idx = current.findIndex((b) => b.id === id);
  if (idx === -1) return null;
  current[idx] = { ...current[idx], ...updates };
  saveBranches(current);
  return current[idx];
}

export function deleteBranch(id: string): boolean {
  const current = getBranches();
  const filtered = current.filter((b) => b.id !== id);
  if (filtered.length === current.length) return false;
  saveBranches(filtered);
  return true;
}
