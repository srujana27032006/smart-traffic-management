import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Get current settings
  app.get(api.settings.get.path, async (req, res) => {
    try {
      const settings = await storage.getSettings();
      if (!settings) {
        // Return default settings if none exist
        return res.json({
          id: 1,
          mode: "auto",
          simulationLevel: "medium",
          manualActiveLane: 0,
        });
      }
      res.json(settings);
    } catch (error) {
      console.error("Error getting settings:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Update settings
  app.put(api.settings.update.path, async (req, res) => {
    try {
      const input = api.settings.update.input.parse(req.body);
      const updated = await storage.updateSettings(input);
      res.json(updated);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      console.error("Error updating settings:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  return httpServer;
}

// Seed database with initial settings
export async function seedDatabase() {
  const existing = await storage.getSettings();
  if (!existing) {
    await storage.updateSettings({
      mode: "auto",
      simulationLevel: "medium",
      manualActiveLane: 0,
    });
    console.log("Database seeded with default settings");
  }
}
