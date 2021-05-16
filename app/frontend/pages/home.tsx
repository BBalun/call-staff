import RequestList from "../components/request/requestList";
import Layout from "../components/layouts/layout";
import LoginRequired from "../components/loginRequired";

export default function Home() {
  return (
    <LoginRequired>
      <Layout>
        <RequestList />
      </Layout>
    </LoginRequired>
  );
}
