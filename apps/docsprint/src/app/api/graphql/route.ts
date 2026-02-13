import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { NextRequest } from 'next/server';
import { prisma } from '../../lib/prisma';

const typeDefs = `#graphql
  scalar DateTime
  scalar JSON

  enum UserRole {
    HR
    ADMIN
    MANAGER
  }

  enum EmployeeStatus {
    ACTIVE
    INACTIVE
  }

  enum ContractType {
    FULL_TIME
    PART_TIME
    TEMPORARY
    PROBATION
    INTERN
  }

  enum DocType {
    EMPLOYMENT_CONTRACT
    NDA
    HIRING_ORDER
    JOB_DESCRIPTION
  }

  enum AuditAction {
    EMPLOYEE_CREATED
    EMPLOYEE_UPDATED
    EMPLOYEE_DEACTIVATED
    DOC_GENERATED
    DOC_DOWNLOADED
  }

  type Department {
    id: ID!
    name: String!
    users: [User!]!
    employees: [Employee!]!
    createdAt: DateTime!
  }

  type User {
    id: ID!
    email: String!
    passwordHash: String!
    role: UserRole!
    departmentId: String
    department: Department
    isActive: Boolean!
    createdAt: DateTime!

    createdEmployees: [Employee!]!
    generatedDocuments: [GeneratedDocument!]!
    auditLogs: [AuditLog!]!
  }

  type Employee {
    id: ID!
    departmentId: String!
    department: Department!

    firstName: String!
    lastName: String!
    email: String!
    regNo: String!
    position: String!
    startDate: DateTime!
    contractType: ContractType!
    contractEndDate: DateTime
    salary: Float
    status: EmployeeStatus!

    createdById: String!
    createdBy: User!

    documents: [GeneratedDocument!]!
    bankAccounts: [EmployeeBankAccount!]!

    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type EmployeeBankAccount {
    id: ID!
    employeeId: String!
    employee: Employee!

    bankName: String!
    accountNo: String!
    accountHolder: String!

    isPrimary: Boolean!

    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type GeneratedDocument {
    id: ID!
    employeeId: String!
    employee: Employee!

    docType: DocType!
    filePath: String!

    generatedById: String!
    generatedBy: User!

    generatedAt: DateTime!
  }

  type AuditLog {
    id: ID!
    userId: String!
    user: User!

    action: AuditAction!
    entityType: String!
    entityId: String!
    metadata: JSON

    createdAt: DateTime!
  }

  # ---------- Pagination Types ----------
  type EmployeesPage {
    items: [Employee!]!
    total: Int!
    page: Int!
    pageSize: Int!
  }

  # ---------- Queries ----------
  type Query {
    hello: String!

    department(id: ID!): Department
    departments: [Department!]!

    user(id: ID!): User
    users(includeInactive: Boolean = false): [User!]!

    employee(id: ID!): Employee

    # Paginated employees (this replaces your old list query)
    employees(
      departmentId: String
      status: EmployeeStatus
      page: Int = 1
      pageSize: Int = 10
      search: String
    ): EmployeesPage!

    bankAccount(id: ID!): EmployeeBankAccount
    bankAccounts(employeeId: String): [EmployeeBankAccount!]!

    generatedDocument(id: ID!): GeneratedDocument
    generatedDocuments(
      employeeId: String
      docType: DocType
      generatedById: String
    ): [GeneratedDocument!]!

    auditLog(id: ID!): AuditLog
    auditLogs(
      userId: String
      action: AuditAction
      entityType: String
      entityId: String
      take: Int = 50
      skip: Int = 0
    ): [AuditLog!]!
  }

  # ---------- Inputs ----------
  input CreateDepartmentInput {
    name: String!
  }
  input UpdateDepartmentInput {
    name: String
  }

  input CreateUserInput {
    email: String!
    passwordHash: String!
    role: UserRole!
    departmentId: String
    isActive: Boolean
  }
  input UpdateUserInput {
    email: String
    passwordHash: String
    role: UserRole
    departmentId: String
    isActive: Boolean
  }

  input CreateEmployeeInput {
    departmentId: String!
    firstName: String!
    lastName: String!
    email: String!
    regNo: String!
    position: String!
    startDate: DateTime!
    contractType: ContractType!
    contractEndDate: DateTime
    salary: Float
    createdById: String!
  }
  input UpdateEmployeeInput {
    departmentId: String
    firstName: String
    lastName: String
    email: String
    regNo: String
    position: String
    startDate: DateTime
    contractType: ContractType
    contractEndDate: DateTime
    salary: Float
    status: EmployeeStatus
  }

  input CreateEmployeeBankAccountInput {
    employeeId: String!
    bankName: String!
    accountNo: String!
    accountHolder: String!
    isPrimary: Boolean
  }

  input UpdateEmployeeBankAccountInput {
    bankName: String
    accountNo: String
    accountHolder: String
    isPrimary: Boolean
  }

  input CreateGeneratedDocumentInput {
    employeeId: String!
    docType: DocType!
    filePath: String!
    generatedById: String!
  }

  input CreateAuditLogInput {
    userId: String!
    action: AuditAction!
    entityType: String!
    entityId: String!
    metadata: JSON
  }

  # ---------- Mutations ----------
  type Mutation {
    # Department
    createDepartment(input: CreateDepartmentInput!): Department!
    updateDepartment(id: ID!, input: UpdateDepartmentInput!): Department!
    deleteDepartment(id: ID!): Boolean!

    # User
    createUser(input: CreateUserInput!): User!
    updateUser(id: ID!, input: UpdateUserInput!): User!
    deactivateUser(id: ID!): User!
    activateUser(id: ID!): User!

    # Employee
    createEmployee(input: CreateEmployeeInput!): Employee!
    updateEmployee(id: ID!, input: UpdateEmployeeInput!, auditUserId: String!): Employee!
    deactivateEmployee(id: ID!, auditUserId: String!): Employee!

    # Bank accounts
    createEmployeeBankAccount(input: CreateEmployeeBankAccountInput!): EmployeeBankAccount!
    updateEmployeeBankAccount(id: ID!, input: UpdateEmployeeBankAccountInput!): EmployeeBankAccount!
    deleteEmployeeBankAccount(id: ID!): Boolean!
    setPrimaryBankAccount(employeeId: String!, bankAccountId: String!): EmployeeBankAccount!

    # Documents
    createGeneratedDocument(input: CreateGeneratedDocumentInput!): GeneratedDocument!
    logDocumentDownload(documentId: ID!, userId: String!, metadata: JSON): AuditLog!

    # Audit log (manual)
    createAuditLog(input: CreateAuditLogInput!): AuditLog!
  }
`;

function toISO(value: unknown): string | null {
  if (!value) return null;
  const d = value instanceof Date ? value : new Date(String(value));
  if (Number.isNaN(d.getTime())) return null;
  return d.toISOString();
}

const resolvers = {
  DateTime: {
    serialize(value: any) {
      const iso = toISO(value);
      return iso ?? value;
    },
    parseValue(value: any) {
      return new Date(value);
    },
    parseLiteral(ast: any) {
      return new Date((ast as any).value);
    },
  },
  JSON: {
    serialize(value: any) {
      return value;
    },
    parseValue(value: any) {
      return value;
    },
    parseLiteral(ast: any) {
      return (ast as any).value ?? null;
    },
  },

  Department: {
    users: (parent: any) =>
      prisma.user.findMany({ where: { departmentId: parent.id } }),
    employees: (parent: any) =>
      prisma.employee.findMany({ where: { departmentId: parent.id } }),
  },

  User: {
    department: (parent: any) =>
      parent.departmentId
        ? prisma.department.findUnique({ where: { id: parent.departmentId } })
        : null,
    createdEmployees: (parent: any) =>
      prisma.employee.findMany({
        where: { createdById: parent.id },
        orderBy: { createdAt: 'desc' },
      }),
    generatedDocuments: (parent: any) =>
      prisma.generatedDocument.findMany({
        where: { generatedById: parent.id },
        orderBy: { generatedAt: 'desc' },
      }),
    auditLogs: (parent: any) =>
      prisma.auditLog.findMany({
        where: { userId: parent.id },
        orderBy: { createdAt: 'desc' },
      }),
  },

  Employee: {
    department: (parent: any) =>
      prisma.department.findUnique({ where: { id: parent.departmentId } }),
    createdBy: (parent: any) =>
      prisma.user.findUnique({ where: { id: parent.createdById } }),
    documents: (parent: any) =>
      prisma.generatedDocument.findMany({
        where: { employeeId: parent.id },
        orderBy: { generatedAt: 'desc' },
      }),
    bankAccounts: (parent: any) =>
      prisma.employeeBankAccount.findMany({
        where: { employeeId: parent.id },
        orderBy: [{ isPrimary: 'desc' }, { createdAt: 'desc' }],
      }),
  },

  EmployeeBankAccount: {
    employee: (parent: any) =>
      prisma.employee.findUnique({ where: { id: parent.employeeId } }),
  },

  GeneratedDocument: {
    employee: (parent: any) =>
      prisma.employee.findUnique({ where: { id: parent.employeeId } }),
    generatedBy: (parent: any) =>
      prisma.user.findUnique({ where: { id: parent.generatedById } }),
  },

  AuditLog: {
    user: (parent: any) =>
      prisma.user.findUnique({ where: { id: parent.userId } }),
  },

  Query: {
    hello: async () => {
      const count = await prisma.department.count();
      return `API running. Departments: ${count}`;
    },

    department: async (_: unknown, args: { id: string }) =>
      prisma.department.findUnique({ where: { id: args.id } }),
    departments: async () =>
      prisma.department.findMany({ orderBy: { createdAt: 'desc' } }),

    user: async (_: unknown, args: { id: string }) =>
      prisma.user.findUnique({ where: { id: args.id } }),
    users: async (_: unknown, args: { includeInactive?: boolean }) =>
      prisma.user.findMany({
        where: args.includeInactive ? {} : { isActive: true },
        orderBy: { createdAt: 'desc' },
      }),

    employee: async (_: unknown, args: { id: string }) =>
      prisma.employee.findUnique({ where: { id: args.id } }),

    employees: async (
      _: unknown,
      args: {
        departmentId?: string;
        status?: 'ACTIVE' | 'INACTIVE';
        page?: number;
        pageSize?: number;
        search?: string;
      },
    ) => {
      const page = Math.max(1, args.page ?? 1);
      const pageSize = Math.min(100, Math.max(1, args.pageSize ?? 10));
      const skip = (page - 1) * pageSize;

      const where: any = {
        ...(args.departmentId ? { departmentId: args.departmentId } : {}),
        ...(args.status ? { status: args.status } : {}),
        ...(args.search?.trim()
          ? {
              OR: [
                { firstName: { contains: args.search, mode: 'insensitive' } },
                { lastName: { contains: args.search, mode: 'insensitive' } },
                { email: { contains: args.search, mode: 'insensitive' } },
                { regNo: { contains: args.search, mode: 'insensitive' } },
                { position: { contains: args.search, mode: 'insensitive' } },
              ],
            }
          : {}),
      };

      const [total, items] = await prisma.$transaction([
        prisma.employee.count({ where }),
        prisma.employee.findMany({
          where,
          skip,
          take: pageSize,
          orderBy: { createdAt: 'desc' },
        }),
      ]);

      return { items, total, page, pageSize };
    },

    bankAccount: async (_: unknown, args: { id: string }) =>
      prisma.employeeBankAccount.findUnique({ where: { id: args.id } }),
    bankAccounts: async (_: unknown, args: { employeeId?: string }) =>
      prisma.employeeBankAccount.findMany({
        where: args.employeeId ? { employeeId: args.employeeId } : {},
        orderBy: [{ isPrimary: 'desc' }, { createdAt: 'desc' }],
      }),

    generatedDocument: async (_: unknown, args: { id: string }) =>
      prisma.generatedDocument.findUnique({ where: { id: args.id } }),
    generatedDocuments: async (
      _: unknown,
      args: { employeeId?: string; docType?: any; generatedById?: string },
    ) =>
      prisma.generatedDocument.findMany({
        where: {
          ...(args.employeeId ? { employeeId: args.employeeId } : {}),
          ...(args.docType ? { docType: args.docType } : {}),
          ...(args.generatedById ? { generatedById: args.generatedById } : {}),
        },
        orderBy: { generatedAt: 'desc' },
      }),

    auditLog: async (_: unknown, args: { id: string }) =>
      prisma.auditLog.findUnique({ where: { id: args.id } }),
    auditLogs: async (
      _: unknown,
      args: {
        userId?: string;
        action?: any;
        entityType?: string;
        entityId?: string;
        take?: number;
        skip?: number;
      },
    ) =>
      prisma.auditLog.findMany({
        where: {
          ...(args.userId ? { userId: args.userId } : {}),
          ...(args.action ? { action: args.action } : {}),
          ...(args.entityType ? { entityType: args.entityType } : {}),
          ...(args.entityId ? { entityId: args.entityId } : {}),
        },
        orderBy: { createdAt: 'desc' },
        take: Math.min(args.take ?? 50, 200),
        skip: args.skip ?? 0,
      }),
  },

  Mutation: {
    createDepartment: async (_: unknown, args: { input: { name: string } }) =>
      prisma.department.create({ data: { name: args.input.name } }),

    updateDepartment: async (
      _: unknown,
      args: { id: string; input: { name?: string } },
    ) =>
      prisma.department.update({
        where: { id: args.id },
        data: {
          ...(args.input.name !== undefined ? { name: args.input.name } : {}),
        },
      }),

    deleteDepartment: async (_: unknown, args: { id: string }) => {
      await prisma.department.delete({ where: { id: args.id } });
      return true;
    },

    createUser: async (_: unknown, args: { input: any }) => {
      const i = args.input;
      return prisma.user.create({
        data: {
          email: i.email,
          passwordHash: i.passwordHash,
          role: i.role,
          departmentId: i.departmentId ?? null,
          isActive: i.isActive ?? true,
        },
      });
    },

    updateUser: async (_: unknown, args: { id: string; input: any }) => {
      const i = args.input;
      return prisma.user.update({
        where: { id: args.id },
        data: {
          ...(i.email !== undefined ? { email: i.email } : {}),
          ...(i.passwordHash !== undefined
            ? { passwordHash: i.passwordHash }
            : {}),
          ...(i.role !== undefined ? { role: i.role } : {}),
          ...(i.departmentId !== undefined
            ? { departmentId: i.departmentId }
            : {}),
          ...(i.isActive !== undefined ? { isActive: i.isActive } : {}),
        },
      });
    },

    deactivateUser: async (_: unknown, args: { id: string }) =>
      prisma.user.update({ where: { id: args.id }, data: { isActive: false } }),

    activateUser: async (_: unknown, args: { id: string }) =>
      prisma.user.update({ where: { id: args.id }, data: { isActive: true } }),

    createEmployee: async (_: unknown, args: { input: any }) => {
      const i = args.input;

      return prisma.$transaction(async (tx) => {
        const employee = await tx.employee.create({
          data: {
            departmentId: i.departmentId,
            firstName: i.firstName,
            lastName: i.lastName,
            email: i.email,
            regNo: i.regNo,
            position: i.position,
            startDate: new Date(i.startDate),
            contractType: i.contractType,
            contractEndDate: i.contractEndDate
              ? new Date(i.contractEndDate)
              : null,
            salary: i.salary ?? null,
            createdById: i.createdById,
          },
        });

        await tx.auditLog.create({
          data: {
            userId: i.createdById,
            action: 'EMPLOYEE_CREATED',
            entityType: 'Employee',
            entityId: employee.id,
            metadata: {
              departmentId: employee.departmentId,
              employeeId: employee.id,
              employeeFirstName: employee.firstName,
              employeeLastName: employee.lastName,
              employeeRegNo: employee.regNo,
              employeeEmail: employee.email,
              position: employee.position,
            },
          },
        });

        return employee;
      });
    },

    updateEmployee: async (
      _: unknown,
      args: { id: string; input: any; auditUserId: string },
    ) => {
      const i = args.input;

      return prisma.$transaction(async (tx) => {
        const updated = await tx.employee.update({
          where: { id: args.id },
          data: {
            ...(i.departmentId !== undefined
              ? { departmentId: i.departmentId }
              : {}),
            ...(i.firstName !== undefined ? { firstName: i.firstName } : {}),
            ...(i.lastName !== undefined ? { lastName: i.lastName } : {}),
            ...(i.email !== undefined ? { email: i.email } : {}),
            ...(i.regNo !== undefined ? { regNo: i.regNo } : {}),
            ...(i.position !== undefined ? { position: i.position } : {}),
            ...(i.startDate !== undefined
              ? { startDate: new Date(i.startDate) }
              : {}),
            ...(i.contractType !== undefined
              ? { contractType: i.contractType }
              : {}),
            ...(i.contractEndDate !== undefined
              ? {
                  contractEndDate: i.contractEndDate
                    ? new Date(i.contractEndDate)
                    : null,
                }
              : {}),
            ...(i.salary !== undefined ? { salary: i.salary } : {}),
            ...(i.status !== undefined ? { status: i.status } : {}),
          },
        });

        await tx.auditLog.create({
          data: {
            userId: args.auditUserId,
            action: 'EMPLOYEE_UPDATED',
            entityType: 'Employee',
            entityId: updated.id,
            metadata: {
              ...i,
              employeeId: updated.id,
              employeeFirstName: updated.firstName,
              employeeLastName: updated.lastName,
              employeeRegNo: updated.regNo,
              employeeEmail: updated.email,
            },
          },
        });

        return updated;
      });
    },

    deactivateEmployee: async (
      _: unknown,
      args: { id: string; auditUserId: string },
    ) =>
      prisma.$transaction(async (tx) => {
        const updated = await tx.employee.update({
          where: { id: args.id },
          data: { status: 'INACTIVE' },
        });

        await tx.auditLog.create({
          data: {
            userId: args.auditUserId,
            action: 'EMPLOYEE_DEACTIVATED',
            entityType: 'Employee',
            entityId: updated.id,
            metadata: {
              status: 'INACTIVE',
              employeeId: updated.id,
              employeeFirstName: updated.firstName,
              employeeLastName: updated.lastName,
              employeeRegNo: updated.regNo,
              employeeEmail: updated.email,
            },
          },
        });

        return updated;
      }),

    createEmployeeBankAccount: async (_: unknown, args: { input: any }) => {
      const i = args.input;
      const makePrimary = i.isPrimary ?? true;

      return prisma.$transaction(async (tx) => {
        if (makePrimary) {
          await tx.employeeBankAccount.updateMany({
            where: { employeeId: i.employeeId },
            data: { isPrimary: false },
          });
        }

        return tx.employeeBankAccount.create({
          data: {
            employeeId: i.employeeId,
            bankName: i.bankName,
            accountNo: i.accountNo,
            accountHolder: i.accountHolder,
            isPrimary: makePrimary,
          },
        });
      });
    },

    updateEmployeeBankAccount: async (
      _: unknown,
      args: { id: string; input: any },
    ) => {
      const i = args.input;

      return prisma.$transaction(async (tx) => {
        if (i.isPrimary === true) {
          const current = await tx.employeeBankAccount.findUnique({
            where: { id: args.id },
          });
          if (!current) throw new Error('EmployeeBankAccount not found');

          await tx.employeeBankAccount.updateMany({
            where: { employeeId: current.employeeId, NOT: { id: args.id } },
            data: { isPrimary: false },
          });
        }

        return tx.employeeBankAccount.update({
          where: { id: args.id },
          data: {
            ...(i.bankName !== undefined ? { bankName: i.bankName } : {}),
            ...(i.accountNo !== undefined ? { accountNo: i.accountNo } : {}),
            ...(i.accountHolder !== undefined
              ? { accountHolder: i.accountHolder }
              : {}),
            ...(i.isPrimary !== undefined ? { isPrimary: i.isPrimary } : {}),
          },
        });
      });
    },

    deleteEmployeeBankAccount: async (_: unknown, args: { id: string }) => {
      await prisma.employeeBankAccount.delete({ where: { id: args.id } });
      return true;
    },

    setPrimaryBankAccount: async (
      _: unknown,
      args: { employeeId: string; bankAccountId: string },
    ) =>
      prisma.$transaction(async (tx) => {
        await tx.employeeBankAccount.updateMany({
          where: { employeeId: args.employeeId },
          data: { isPrimary: false },
        });

        return tx.employeeBankAccount.update({
          where: { id: args.bankAccountId },
          data: { isPrimary: true },
        });
      }),

    createGeneratedDocument: async (_: unknown, args: { input: any }) => {
      const i = args.input;

      return prisma.$transaction(async (tx) => {
        const doc = await tx.generatedDocument.create({
          data: {
            employeeId: i.employeeId,
            docType: i.docType,
            filePath: i.filePath,
            generatedById: i.generatedById,
          },
        });

        await tx.auditLog.create({
          data: {
            userId: i.generatedById,
            action: 'DOC_GENERATED',
            entityType: 'GeneratedDocument',
            entityId: doc.id,
            metadata: {
              employeeId: doc.employeeId,
              docType: doc.docType,
              filePath: doc.filePath,
            },
          },
        });

        return doc;
      });
    },

    logDocumentDownload: async (
      _: unknown,
      args: { documentId: string; userId: string; metadata?: any },
    ) => {
      const doc = await prisma.generatedDocument.findUnique({
        where: { id: args.documentId },
      });
      if (!doc) throw new Error('GeneratedDocument not found');

      return prisma.auditLog.create({
        data: {
          userId: args.userId,
          action: 'DOC_DOWNLOADED',
          entityType: 'GeneratedDocument',
          entityId: args.documentId,
          metadata: args.metadata ?? {
            employeeId: doc.employeeId,
            docType: doc.docType,
          },
        },
      });
    },

    createAuditLog: async (_: unknown, args: { input: any }) => {
      const i = args.input;
      return prisma.auditLog.create({
        data: {
          userId: i.userId,
          action: i.action,
          entityType: i.entityType,
          entityId: i.entityId,
          metadata: i.metadata ?? null,
        },
      });
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const handler = startServerAndCreateNextHandler<NextRequest>(server);

export const runtime = 'nodejs';
export { handler as GET, handler as POST };
