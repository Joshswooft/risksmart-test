# Elysia with Bun runtime

## Getting Started

Install bun: https://bun.sh/

### Install dependencies

```bash
bun install

```

### Run the database migrations

This will create the tables for you.

```bash
bun run migrate
```

## Development
To start the development server run:
```bash
bun run dev
```

Open http://localhost:3000/ with your browser to see the result.

If you make changes to the database schema, don't forget to generate migrations and migrate db.

## Seeding some data

The playground will be visible on http://localhost:3000/graphql.

Paste the below data to get setup: 

mutation {
  createCompany(input: {
    name: "Fight club",
    headquartersLocation: "we dont talk about it"
  }) {
    id
    name
  }
}

mutation {
  createEmployee(input: {
    firstName: "Robert",
    lastName: "Paulson",
    email: "robert.paulson@fightme.com",
    phoneNumber:"13556",
    hireDate:"Today",
    jobTitle: "Wrestler (ex amazon)",
    salary:50000,
    companyId: 1
  }) {
    id
    firstName
    lastName
    company {
      id
      name
    }
  }
}


## Querying data

query {
  employees {
    company {
      name
      id
      industry
      headquartersLocation
    }
    id
    firstName
    lastName
    salary
    email
    phoneNumber
    hireDate
    jobTitle
    
  }
}
