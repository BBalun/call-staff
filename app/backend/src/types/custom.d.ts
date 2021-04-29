export {};

import { user, role } from "@prisma/client";

declare global {
  namespace Express {
    export interface Request {
      user?: Omit<user & { role: role }, "password">;
    }
  }
}
