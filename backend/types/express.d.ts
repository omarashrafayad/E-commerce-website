import { IUser } from "../model/userModel";

declare global {
  namespace Express {
    interface Request {
      filterObj?: Record<string, any>;
      user?: IUser;
    }
  }
}

export {};

