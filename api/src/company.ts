import { drizzle, BunSQLiteDatabase } from 'drizzle-orm/bun-sqlite';
import { Database } from 'bun:sqlite';
import { companies } from './db/schema';
import { eq } from 'drizzle-orm';

const sqlite = new Database('sqlite.db');
const db: BunSQLiteDatabase = drizzle(sqlite);

type NewCompany = typeof companies.$inferInsert

export const createCompany = async (company: NewCompany) => await db.insert(companies).values(company).returning()

export const getCompanyById = async (id: number) => await db.select().from(companies).limit(1).where(eq(companies.id, id))