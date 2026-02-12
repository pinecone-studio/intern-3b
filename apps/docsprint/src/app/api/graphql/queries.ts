import { gql } from '@apollo/client';

export const GET_EMPLOYEES_PAGE = gql`
  query GetEmployeesPage(
    $page: Int!
    $pageSize: Int!
    $search: String
    $departmentId: String
    $status: EmployeeStatus
  ) {
    employees(
      page: $page
      pageSize: $pageSize
      search: $search
      departmentId: $departmentId
      status: $status
    ) {
      total
      page
      pageSize
      items {
        id
        firstName
        lastName
        email
        regNo
        position
        salary
        status
        startDate
        department {
          id
          name
        }
      }
    }
  }
`;

export const GET_AUDIT_LOGS = gql`
  query GetAuditLogs(
    $userId: String
    $action: AuditAction
    $entityType: String
    $entityId: String
    $take: Int = 20
    $skip: Int = 0
  ) {
    auditLogs(
      userId: $userId
      action: $action
      entityType: $entityType
      entityId: $entityId
      take: $take
      skip: $skip
    ) {
      id
      action
      entityType
      entityId
      metadata
      createdAt
      user {
        id
        email
      }
    }
  }
`;

export const CREATE_EMPLOYEE = gql`
  mutation CreateEmployee($input: CreateEmployeeInput!) {
    createEmployee(input: $input) {
      id
      firstName
      lastName
      email
      regNo
      position
      startDate
      contractType
      salary
      status
      department {
        id
        name
      }
    }
  }
`;

export const EMPLOYEES = gql`
  query Employees($page: Int!, $pageSize: Int!, $search: String) {
    employees(page: $page, pageSize: $pageSize, search: $search) {
      total
      page
      pageSize
      items {
        id
        firstName
        lastName
        email
        regNo
        position
        startDate
        status
        contractType
        departmentId
      }
    }
  }
`;

export const EMPLOYEE = gql`
  query Employee($id: ID!) {
    employee(id: $id) {
      id
      firstName
      lastName
      email
      regNo
      position
      startDate
      status
      contractType
      departmentId
      department {
        id
        name
      }
      bankAccounts {
        id
        bankName
        accountNo
        accountHolder
        isPrimary
      }
    }
  }
`;

export const CREATE_EMPLOYEE_BANK = gql`
  mutation CreateEmployeeBank($input: CreateEmployeeBankAccountInput!) {
    createEmployeeBankAccount(input: $input) {
      id
      bankName
      accountNo
      accountHolder
      isPrimary
    }
  }
`;

export const DEPARTMENTS = gql`
  query Departments {
    departments {
      id
      name
    }
  }
`;

export const CREATE_DEPARTMENT = gql`
  mutation CreateDepartment($input: CreateDepartmentInput!) {
    createDepartment(input: $input) {
      id
      name
    }
  }
`;

export const CREATE_EMPLOYEE_BANK_ACCOUNT = gql`
  mutation CreateEmployeeBankAccount($input: CreateEmployeeBankAccountInput!) {
    createEmployeeBankAccount(input: $input) {
      id
      bankName
      accountNo
      accountHolder
      isPrimary
      employeeId
    }
  }
`;
