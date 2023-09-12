import { useState } from "react";
import { Employee, Udate_EmployeeMutation, Udate_EmployeeMutationVariables, UpdateEmployeeInput } from "../../generated/gql/graphql";
import Modal from 'react-modal';
import { gql, useMutation } from "@apollo/client";

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

const UPDATE_EMPLOYEE = gql`
mutation UPDATE_EMPLOYEE($input: UpdateEmployeeInput!) {
  updateEmployee(input: $input) {
    id
    firstName
    lastName
    salary
    company {
      name
      id
      headquartersLocation
    }
  }
}

`

export function EmployeeTable({ data }: {data: Employee[]}) {
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | undefined>(undefined);
  const [editedEmployee, setEditedEmployee] = useState(selectedEmployee);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [updateEmployee] = useMutation<Udate_EmployeeMutation, Udate_EmployeeMutationVariables>(UPDATE_EMPLOYEE);

  function openModal(e) {
    const employeeId = e.currentTarget.getAttribute('data-id');
    console.log("employee Id: ", employeeId)
    let employee =  data.find(e => e.id === +employeeId)
    console.log("found: ", employee)
    setSelectedEmployee(employee)
    setEditedEmployee(employee)
    console.log("selected employee: ", selectedEmployee)
    setIsOpen(true);
  }

  const handleChange = (e) => {
    if (!editedEmployee) {
      return
    }
    const { name, value } = e.target;
    setEditedEmployee({
      ...editedEmployee,
      [name]: value,
    });
  };

  function closeModal() {
    setSelectedEmployee(undefined);
    setIsOpen(false);
  }

  const handleSave = async() => {
    console.log("edited employee: ", editedEmployee)
    if (!editedEmployee) {
      return
    }
    const input: UpdateEmployeeInput = {
      id: editedEmployee.id,
      firstName: editedEmployee.firstName,
      lastName: editedEmployee.lastName
    };
    await updateEmployee({variables: {input}, refetchQueries: ['GET_EMPLOYEES']})
    closeModal()
  };

  return (
    <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
      <thead className="bg-gray-800 text-white">
        <tr>
          <th className="py-2 px-6 text-left">ID</th>
          <th className="py-2 px-6 text-left">First Name</th>
          <th className="py-2 px-6 text-left">Last Name</th>
          <th className="py-2 px-6 text-left">Email</th>
          <th className="py-2 px-6 text-left">Phone Number</th>
          <th className="py-2 px-6 text-left">Hire Date</th>
          <th className="py-2 px-6 text-left">Job Title</th>
          <th className="py-2 px-6 text-left">Salary</th>
          <th className="py-2 px-6"></th>
        </tr>
      </thead>
      <tbody className="text-gray-700">
        {data.map((employee) => (
          <tr key={employee.id}>
            <td className="py-3 px-6">{employee.id}</td>
            <td className="py-3 px-6">{employee.firstName}</td>
            <td className="py-3 px-6">{employee.lastName}</td>
            <td className="py-3 px-6">{employee.email}</td>
            <td className="py-3 px-6">{employee.phoneNumber || '-'}</td>
            <td className="py-3 px-6">{employee.hireDate}</td>
            <td className="py-3 px-6">{employee.jobTitle}</td>
            <td className="py-3 px-6">${employee.salary}</td>
            <td className="py-3 px-6"><button className="btn text-white" onClick={openModal} data-id={employee.id}>Edit</button></td>
          </tr>
        ))}
      </tbody>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <button className="sm absolute top-0 right-0" onClick={closeModal}>X</button>
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Edit Employee</h2>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="firstName">
          First Name
        </label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={editedEmployee?.firstName}
          onChange={handleChange}
          className="border border-gray-300 rounded-md p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="lastName">
          Last Name
        </label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={editedEmployee?.lastName}
          onChange={handleChange}
          className="border border-gray-300 rounded-md p-2 w-full"
        />
      </div>
      {/* Add input fields for other employee properties */}
      <button
        onClick={handleSave}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full"
      >
        Save
      </button>
      </Modal>
    </table>
  );
}
