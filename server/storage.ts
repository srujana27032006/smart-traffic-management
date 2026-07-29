import { db } from "./db";
import { systemSettings, type SystemSettings, type UpdateSystemSettings } from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  getSettings(): Promise<SystemSettings | undefined>;
  updateSettings(updates: UpdateSystemSettings): Promise<SystemSettings>;
}

export class DatabaseStorage implements IStorage {
  async getSettings(): Promise<SystemSettings | undefined> {
    const results = await db.select().from(systemSettings).limit(1);
    return results[0];
  }

  async updateSettings(updates: UpdateSystemSettings): Promise<SystemSettings> {
    const existing = await this.getSettings();
    
    if (!existing) {
      // Create initial settings if none exist
      const [created] = await db.insert(systemSettings).values({
        mode: updates.mode || "auto",
        simulationLevel: updates.simulationLevel || "medium",
        manualActiveLane: updates.manualActiveLane || 0,
      }).returning();
      return created;
    }

    const [updated] = await db
      .update(systemSettings)
      .set(updates)
      .where(eq(systemSettings.id, existing.id))
      .returning();
    return updated;
  }
}

export const storage = new DatabaseStorage();
