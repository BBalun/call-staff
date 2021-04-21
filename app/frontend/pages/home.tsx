// import Sidebar from "../components/sidebars/sidebar";
import LoginRequired from "../components/loginRequired";
import Sidebar from "../components/sidebar";
import RequestList from "../components/requestList";

export default function Home() {
  return (
    <LoginRequired>
      <Sidebar />
      <RequestList />
    </LoginRequired>
  );
}
