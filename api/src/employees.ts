import { drizzle, BunSQLiteDatabase } from 'drizzle-orm/bun-sqlite';
import { Database } from 'bun:sqlite';
import { employees } from './db/schema';
import { eq } from 'drizzle-orm';

const sqlite = new Database('sqlite.db');
const db: BunSQLiteDatabase = drizzle(sqlite);

type NewEmployee = typeof employees.$inferInsert
type UpdateEmployee = Omit<NewEmployee, "id"> & { id: typeof employees.$inferSelect.id };

export const getEmployees = async () => await db.select().from(employees)

export const createEmployee = async (employee: NewEmployee) => await db.insert(employees).values(employee).returning()
export const updateEmployee = async (employee: UpdateEmployee) => {
    return await db.update(employees)
        .set({ firstName: employee.firstName, lastName: employee.lastName, jobTitle: employee.jobTitle, salary: employee.salary, phoneNumber: employee.phoneNumber })
        .where(eq(employees.id, employee.id)).returning()
}