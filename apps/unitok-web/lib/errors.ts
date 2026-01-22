// export class AppError extends Error {
//   constructor(
//     public code: string,
//     public status = 400,
//   ) {
//     super(code);
//   }
// }

export class AppError extends Error {
  constructor(
    public code: string,
    public status = 400
  ) {
    super(code);
  }
}

export const Errors = {
  UNAUTHORIZED: new AppError("UNAUTHORIZED", 401),
  FORBIDDEN: new AppError("FORBIDDEN", 403),
  NOT_FOUND: new AppError("NOT_FOUND", 404),
  INSUFFICIENT_TICKETS: new AppError("INSUFFICIENT_TICKETS", 402),
};

