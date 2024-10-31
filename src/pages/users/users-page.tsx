import { UsersTable } from "./users-table";

export default function UsersPage() {
  // const { users, loading, error } = useUsers();
  return (
    <div className="container p-4">
      <h1 className="text-2xl font-bold mb-4">Users List</h1>
      <UsersTable />
    </div>
  );
}
