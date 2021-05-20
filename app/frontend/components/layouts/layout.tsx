import { useRouter } from "next/router";
import { useIsAdmin } from "../../hooks/useIsAdmin";
import Sidebar from "../sidebar/Sidebar";
import Head from "next/head";

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
      <Head>
        <title>System to call stuff</title>
      </Head>
      <Sidebar />
      {children}
    </>
  );
}
