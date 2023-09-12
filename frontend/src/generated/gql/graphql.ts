/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Company = {
  __typename?: 'Company';
  headquartersLocation?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  industry?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
};

export type CreateCompanyInput = {
  headquartersLocation?: InputMaybe<Scalars['String']['input']>;
  industry?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type CreateEmployeeInput = {
  companyId: Scalars['Int']['input'];
  email?: InputMaybe<Scalars['String']['input']>;
  firstName: Scalars['String']['input'];
  hireDate: Scalars['String']['input'];
  jobTitle?: InputMaybe<Scalars['String']['input']>;
  lastName: Scalars['String']['input'];
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  salary?: InputMaybe<Scalars['Int']['input']>;
};

export type Employee = {
  __typename?: 'Employee';
  company: Company;
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  hireDate: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  jobTitle: Scalars['String']['output'];
  lastName: Scalars['String']['output'];
  phoneNumber?: Maybe<Scalars['String']['output']>;
  salary: Scalars['Int']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createCompany: Company;
  createEmployee: Employee;
  updateEmployee: Employee;
};


export type MutationCreateCompanyArgs = {
  input: CreateCompanyInput;
};


export type MutationCreateEmployeeArgs = {
  input: CreateEmployeeInput;
};


export type MutationUpdateEmployeeArgs = {
  input: UpdateEmployeeInput;
};

export type Query = {
  __typename?: 'Query';
  employees: Array<Employee>;
};

export type UpdateEmployeeInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  hireDate?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  jobTitle?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  salary?: InputMaybe<Scalars['Int']['input']>;
};

export type Udate_EmployeeMutationVariables = Exact<{
  input: UpdateEmployeeInput;
}>;


export type Udate_EmployeeMutation = { __typename?: 'Mutation', updateEmployee: { __typename?: 'Employee', id: number, firstName: string, lastName: string, salary: number, jobTitle: string, hireDate: string, company: { __typename?: 'Company', name: string, id: number, headquartersLocation?: string | null } } };


export const Udate_EmployeeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UDATE_EMPLOYEE"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateEmployeeInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateEmployee"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"salary"}},{"kind":"Field","name":{"kind":"Name","value":"jobTitle"}},{"kind":"Field","name":{"kind":"Name","value":"hireDate"}},{"kind":"Field","name":{"kind":"Name","value":"company"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"headquartersLocation"}}]}}]}}]}}]} as unknown as DocumentNode<Udate_EmployeeMutation, Udate_EmployeeMutationVariables>;