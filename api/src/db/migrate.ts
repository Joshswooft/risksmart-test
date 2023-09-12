import { BunSQLiteDatabase, drizzle } from "drizzle-orm/bun-sqlite";
import { migrate } from "drizzle-orm/bun-sqlite/migrator";
import { Database } from 'bun:sqlite';

const sqlite = new Database('sqlite.db');
const db: BunSQLiteDatabase = drizzle(sqlite);

console.log("performing migrations...")

migrate(db, { migrationsFolder: "drizzle" });

console.log("finished!")