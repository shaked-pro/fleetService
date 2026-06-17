import {
  pgTable,
  uuid,
  text,
  timestamp,
  numeric,
  index,
} from "drizzle-orm/pg-core";

export const vehicles = pgTable("vehicles", {
  id: uuid("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(),
});

export const trips = pgTable(
  "trips",
  {
    id: uuid("id").primaryKey(),

    vehicleId: uuid("vehicle_id")
      .notNull()
      .references(() => vehicles.id),

    startTime: timestamp("start_time").notNull(),
    endTime: timestamp("end_time").notNull(),

    distance: numeric("distance").notNull(),
    energyUsed: numeric("energy_used").notNull(),
  },
  (table) => ({
    vehicleIdx: index("idx_trips_vehicle_id").on(table.vehicleId),

    vehicleStartTimeIdx: index(
      "idx_trips_vehicle_start_time"
    ).on(table.vehicleId, table.startTime),
  })
);