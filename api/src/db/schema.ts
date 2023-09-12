import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const companies = sqliteTable('Company', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  headquartersLocation: text('headquarters_location'),
  industry: text('industry'),
});

export const employees = sqliteTable('Employee', {
  id: integer('id').primaryKey(),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  email: text('email').notNull().unique(),
  phoneNumber: text('phone_number'),
  hireDate: text('hire_date').notNull(),
  jobTitle: text('job_title'),
  salary: integer('salary'),
  companyId: integer('company_id').references(() => companies.id).notNull(),
});
