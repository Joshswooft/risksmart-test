import { Elysia } from "elysia";
import { createEmployee, getEmployees, updateEmployee } from "./employees";
import apollo, { gql } from "@elysiajs/apollo";
import { createCompany, getCompanyById } from "./company";
import cors from "@elysiajs/cors";

const path = "./schema.graphql";
const schema = await Bun.file(path).text();

const app = new Elysia()
  .use(
    apollo({
      typeDefs: gql(schema),
      resolvers: {
        Query: {
          employees: getEmployees,
        },
        Employee: {
          // Employee.company field resolver
          company: async (parent) => {
            console.log("parent: ", parent)
            const result = await getCompanyById(parent.companyId)
            console.log("employee company field resolver: ", result)
            return result[0]
          }
        },
        Mutation: {
          updateEmployee: async (parent, args, contextValue, info) => {
            try {
              console.log(`parent: ${parent}, args: ${args}, context: ${contextValue}, info: ${info}`)
              console.log(args)
              const result = await updateEmployee(args.input);
              console.log("result of update(): ", result);
              return result[0]
            }
            catch (err) {
              throw new Error(`Error updating employee: ${err}`)
            }
          },
          createEmployee: async (parent, args, contextValue, info) => {
            try {
              console.log(`parent: ${parent}, args: ${args}, context: ${contextValue}, info: ${info}`)
              console.log(args)
              const result = await createEmployee(args.input);
              console.log("result: ", result);
              return result[0]
            }
            catch (err) {
              throw new Error(`Error creating employee: ${err}`)
            }
          },

          createCompany: async (_, { input }) => {
            try {
              const results = await createCompany(input);
              console.log("create company result: ", results)

              if (results.length == 0) {
                throw new Error("failed to create company")
              }

              return results[0]
            }
            catch (err) {
              throw new Error(`Error creating company: ${err}`)
            }
          }
        }
      }
    })
  ).use(cors()).get("/", () => "Hello Elysia").listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
