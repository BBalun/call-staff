import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../contexts/userContext";
import { useRouter } from "next/router";
import { fetchUserInfo } from "../auth/auth";

export default function LoginRequired({ children }) {
  const [user, setUser] = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    if (!user) {
      const userInfo = await fetchUserInfo();
      if (!userInfo) {
        router.push("/login");
        return;
      }

      setUser(userInfo);
    }
    setIsLoading(false);
  }

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return <>{children}</>;
}
