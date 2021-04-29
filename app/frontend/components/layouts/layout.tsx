import LoginRequired from "../loginRequired";
import Sidebar from "../sidebar/sidebar";

export default function Layout({ children }) {
  return (
    <LoginRequired>
      <Sidebar />
      {children}
    </LoginRequired>
  );
}
