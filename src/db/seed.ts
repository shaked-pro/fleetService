import "dotenv/config";

import { randomUUID } from "crypto";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import { vehicles, trips } from "./schema.js";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool);

async function seed() {
  console.log("🌱 Seeding database...");

  // Optional: clear existing data
  await db.delete(trips);
  await db.delete(vehicles);

  const vehicle1Id = randomUUID();
  const vehicle2Id = randomUUID();
  const vehicle3Id = randomUUID();

  await db.insert(vehicles).values([
    {
      id: vehicle1Id,
      name: "Delivery Van 1",
      type: "VAN",
    },
    {
      id: vehicle2Id,
      name: "Electric Sedan 1",
      type: "ELECTRIC",
    },
    {
      id: vehicle3Id,
      name: "Truck 1",
      type: "TRUCK",
    },
  ]);

  await db.insert(trips).values([
    {
      id: randomUUID(),
      vehicleId: vehicle1Id,
      startTime: new Date("2025-08-01T08:00:00Z"),
      endTime: new Date("2025-08-01T09:15:00Z"),
      distance: "42.5",
      energyUsed: "6.2",
    },
    {
      id: randomUUID(),
      vehicleId: vehicle1Id,
      startTime: new Date("2025-08-02T10:00:00Z"),
      endTime: new Date("2025-08-02T11:30:00Z"),
      distance: "57.8",
      energyUsed: "8.1",
    },
    {
      id: randomUUID(),
      vehicleId: vehicle2Id,
      startTime: new Date("2025-08-01T07:30:00Z"),
      endTime: new Date("2025-08-01T08:20:00Z"),
      distance: "31.2",
      energyUsed: "4.0",
    },
    {
      id: randomUUID(),
      vehicleId: vehicle2Id,
      startTime: new Date("2025-08-03T14:00:00Z"),
      endTime: new Date("2025-08-03T15:10:00Z"),
      distance: "48.7",
      energyUsed: "5.9",
    },
    {
      id: randomUUID(),
      vehicleId: vehicle3Id,
      startTime: new Date("2025-08-01T05:00:00Z"),
      endTime: new Date("2025-08-01T07:45:00Z"),
      distance: "120.4",
      energyUsed: "18.6",
    },
  ]);

  console.log("✅ Seed completed");

  await pool.end();
}

seed().catch(async (error) => {
  console.error("❌ Seed failed");
  console.error(error);

  await pool.end();

  process.exit(1);
});