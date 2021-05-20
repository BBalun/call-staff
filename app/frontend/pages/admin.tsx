import AdminOnly from "../components/AdminOnly";
import CreateUserForm from "../components/admin/CreateUserForm";
import Layout from "../components/layouts/Layout";
import LoginRequired from "../components/LoginRequired";

export default function Admin() {
  return (
    <LoginRequired>
      <AdminOnly>
        <Layout>
          <CreateUserForm />
        </Layout>
      </AdminOnly>
    </LoginRequired>
  );
}
