import { pgTable, text, uuid, numeric, integer, timestamp, date, index  } from "drizzle-orm/pg-core"

export const userProfiles = pgTable("user_profiles", {
    userId: text("user_id").primaryKey(),
    currentWeightKg: numeric("current_weight_kg", { precision: 5, scale: 2 }).notNull(),
    targetWeightKg: numeric("target_weight_kg", { precision: 5, scale: 2 }).notNull(),
    dailyKcalTarget: integer("daily_kcal_target").notNull(),
    dailyProteinTarget: integer("daily_protein_target_g").notNull(),
    onboardedAt: timestamp("onboarded_at", { withTimezone: true }).notNull().defaultNow(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow()
})

export type UserProfile = typeof userProfiles.$inferSelect
export type NewUserProfile = typeof userProfiles.$inferInsert

export const foods = pgTable("foods", {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: text("user_id").notNull(),
    name: text("name").notNull(),
    kcalPer100g: numeric("kcal_per_100g", { precision: 7, scale: 2 }).notNull(),
    proteinPer100g: numeric("protein_per_100g", { precision: 6, scale: 2 }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    archivedAt: timestamp("archived_at", { withTimezone: true })
},
(t) => [index("foods_user_idx").on(t.userId)])

export type Food = typeof foods.$inferSelect;
export type NewFood = typeof foods.$inferInsert

export const meals = pgTable("meals", {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: text("user_id").notNull(),
    name: text("name").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    archivedAt: timestamp("archived_at", { withTimezone: true })
},
(t) => [index("meals_user_idx").on(t.userId)])

export type Meal = typeof meals.$inferSelect;
export type NewMeal = typeof meals.$inferInsert