import AdminOnly from "../components/adminOnly";
import CreateUserForm from "../components/admin/createUserForm";
import Layout from "../components/layouts/layout";
import LoginRequired from "../components/loginRequired";

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
