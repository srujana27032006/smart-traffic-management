import { pgTable, text, serial, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const systemSettings = pgTable("system_settings", {
  id: serial("id").primaryKey(),
  mode: text("mode").notNull().default("auto"), // 'auto', 'manual'
  simulationLevel: text("simulation_level").notNull().default("medium"), // 'low', 'medium', 'high'
  manualActiveLane: integer("manual_active_lane").default(0), // 0-3 for the 4 lanes
});

export const insertSystemSettingsSchema = createInsertSchema(systemSettings).omit({ id: true });

export type SystemSettings = typeof systemSettings.$inferSelect;
export type InsertSystemSettings = z.infer<typeof insertSystemSettingsSchema>;
export type UpdateSystemSettings = Partial<InsertSystemSettings>;
