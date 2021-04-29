export interface IUser {
  id: string;
  email: string;
  username: string;
  password: string;
  establishmentId: string;
  roleId: string;
  session: string | null;
  role: {
    id: string;
    name: string;
  };
}
