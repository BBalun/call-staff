import AdminOnly from "../components/adminOnly";
import CreateUserForm from "../components/admin/createUserForm";
import Layout from "../components/layouts/layout";

export default function Admin() {
  return (
    <Layout>
      <AdminOnly>
        <CreateUserForm />
      </AdminOnly>
    </Layout>
  );
}
