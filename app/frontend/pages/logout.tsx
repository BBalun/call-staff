import { useRouter } from "next/router";
import { useEffect } from "react";
import { logout } from "../auth/auth";
import { useUserContext } from "../contexts/userContext";

export default function Logout() {
  const router = useRouter();
  const [_, setUser] = useUserContext();

  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    await logout();
    setUser(null);
    router.push("/login");
  }

  return (
    <>
      <div>Logging out ...</div>
    </>
  );
}
