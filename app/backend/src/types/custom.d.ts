export {};

import { user } from "@prisma/client";

declare global {
  namespace Express {
    export interface Request {
      user?: Omit<user, "password">;
    }
  }
}
