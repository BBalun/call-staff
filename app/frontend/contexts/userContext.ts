import React from "react";
import { IUser } from "../interfaces/user";

export const UserContext = React.createContext<[user: IUser | null, setUser: (user: IUser) => void] | null>(null);

export function useUserContext() {
  return React.useContext(UserContext);
}
