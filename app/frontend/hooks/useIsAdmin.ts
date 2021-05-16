import { useUserContext } from "../contexts/userContext";

export function useIsAdmin() {
  const [user] = useUserContext();
  const isAdmin = user.role.name === "admin";
  return isAdmin;
}
