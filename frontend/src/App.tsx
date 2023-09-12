import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/client'
import { EmployeeTable } from './lib/components/EmployeeTable'
import { Query } from './generated/gql/graphql'

  const GET_EMPLOYEES = gql`
      query GET_EMPLOYEES {
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
  `;
function App() {

  const { loading, error, data } = useQuery<Query>(GET_EMPLOYEES);
  const [count, setCount] = useState(0)

  console.log(loading, error, data);

  if (loading) {
    return "Loading..."
  }

  if (error || !data) {
    return "error with application, did someone forget to seed the database?"
  }

  if (data.employees.length === 0) {
    return "No employees found"
  }

  return (
    <>
      <div>
          <img src={viteLogo} className="logo" alt="Vite logo" />
          <img src={reactLogo} className="logo react" alt="React logo" />
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <EmployeeTable data={data?.employees} />
    </>
  )
}

export default App
