// export type ClerkEmailAddress = {
//   email_address: string;
//   id: string;
// };

// export type ClerkUser = {
//   id: string;
//   email_addresses: ClerkEmailAddress[];
//   first_name: string | null;
//   last_name: string | null;
// };

// 공통 최소 타입
export type ClerkUserBase = {
  id: string;
};

// user.created / user.updated
export type ClerkUserCreated = ClerkUserBase & {
  email_addresses: {
    id: string;
    email_address: string;
  }[];
  first_name: string | null;
  last_name: string | null;
};

// user.deleted
export type ClerkUserDeleted = ClerkUserBase & {
  deleted: boolean;
};
