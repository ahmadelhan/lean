import { pgTable, text, uuid, numeric, integer, timestamp, date, index } from "drizzle-orm/pg-core"

export const userProfiles = pgTable("user_profiles", {
    userId: text("user_id").primaryKey(),
    currentWeightKg: numeric("current_weight_kg", { precision: 5, scale: 2 }).notNull(),
    targetWeightKg: numeric("target_weight_kg", { precision: 5, scale: 2 }).notNull(),
    dailyKcalTarget: integer("daily_kcal_target").notNull(),
    dailyProteinTarget: integer("daily_protein_target_g").notNull(),
    onboardedAt: timestamp("onboarded_at", {withTimezone: true}).notNull().defaultNow(),
    createdAt: timestamp("created_at", {withTimezone: true}).notNull().defaultNow()
})

export type UserProfile = typeof userProfiles.$inferSelect
export type NewUserProfile = typeof userProfiles.$inferInsert