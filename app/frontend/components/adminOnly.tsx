import { useRouter } from "next/router";
import { useContext } from "react";
import { UserContext } from "../contexts/userContext";

export default function AdminOnly({ children }) {
  const [user] = useContext(UserContext);
  const router = useRouter();

  if (user?.role.name !== "admin") {
    router.push("/");
    return <> </>;
  }

  return <>{children}</>;
}
