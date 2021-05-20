import RequestList from "../components/request/RequestList";
import Layout from "../components/layouts/Layout";
import LoginRequired from "../components/LoginRequired";

export default function Home() {
  return (
    <LoginRequired>
      <Layout>
        <RequestList />
      </Layout>
    </LoginRequired>
  );
}
