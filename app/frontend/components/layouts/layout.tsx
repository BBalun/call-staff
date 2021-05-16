import { useRouter } from "next/router";
import { useEffect } from "react";
import { useIsAdmin } from "../../hooks/useIsAdmin";
import Sidebar from "../sidebar/sidebar";

export default function Layout({ children }) {
  const isAdmin = useIsAdmin();
  const router = useRouter();

  if (isAdmin) {
    if (router.pathname !== "/admin" && router.pathname !== "/changePassword") {
      router.push("/admin");
      return <div>Loading ...</div>;
    }
  }

  return (
    <>
      <Sidebar />
      {children}
    </>
  );
}
