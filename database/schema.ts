import {uuid, varchar, integer, text, boolean, pgTable, pgEnum, date, timestamp} from "drizzle-orm/pg-core";

export const SUBSCRIPTION_ENUM = pgEnum('subscription', ['FREE', 'PREMIUM'])
export const users = pgTable("users", {
    id: uuid('id').notNull().primaryKey().defaultRandom().unique(),
    fullName: varchar('full_name', { length: 255 }).notNull(),
    email: text('email').notNull().unique(),
    password: text('password').notNull(),
    profile_image_url: text('profile_image_url').notNull(),
    subscription: SUBSCRIPTION_ENUM('subscription').default('FREE'),
    lastActivityDate: date('last_activity_date').notNull().defaultNow(),
    createdAt: timestamp('created_at', {
        withTimezone: true,
    }).defaultNow(),
});
