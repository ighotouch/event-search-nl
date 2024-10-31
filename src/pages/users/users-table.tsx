"use client";

import { useEffect, useState } from "react";
import { useUsers } from "@/services/use-users";
import UserSearch from "@/components/ui/UserSearch";
import GenericTable from "@/components/ui/table/GenericTable";
import { User } from "@/schemas/user";
import UserDetailModal from "@/components/ui/UserDetailModal";
import UserModal from "@/components/ui/UserModal";

export const UsersTable = () => {
  const { data: users, isLoading, error } = useUsers();
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [modalState, setModalState] = useState<{
    type: "add" | "detail" | null;
    user?: User | null;
  }>({ type: null, user: null });

  useEffect(() => {
    setFilteredUsers(users || []);
  }, [users]);

  const handleSearch = (query: string) => {
    if (!query) {
      setFilteredUsers(users || []);
    } else {
      setFilteredUsers(
        (users || []).filter(
          (user) =>
            user.name.toLowerCase().includes(query.toLowerCase()) ||
            user.email.toLowerCase().includes(query.toLowerCase())
        )
      );
    }
  };

  const clearSearch = () => {
    setFilteredUsers(users || []);
  };

  const handleRowClick = (user: User) => {
    openModal("detail", user);
  };

  const openModal = (type: "add" | "detail", user: User | null = null) => {
    setModalState({ type, user });
  };

  const closeModal = () => {
    setModalState({ type: null, user: null });
  };

  const handleAddUser = (newUser: User) => {
    const userWithId = { ...newUser, id: Date.now() };
    setFilteredUsers((prev) => [...prev, userWithId]);
    closeModal();
  };
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  const userColumns: Array<{ header: string; key: keyof User }> = [
    { header: "ID", key: "id" },
    { header: "Name", key: "avatarUrl" },
    { header: "Username", key: "username" },
    { header: "Email", key: "email" },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <UserSearch onSearch={handleSearch} onClear={clearSearch} />
        <button
          onClick={() => openModal("add")}
          className="ml-4 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-blue-500 transition-colors"
        >
          Add User
        </button>
      </div>
      <GenericTable<User>
        data={filteredUsers}
        columns={userColumns}
        caption="A list of users."
        onRowClick={handleRowClick}
      />
      {modalState.type === "detail" && modalState.user && (
        <UserDetailModal user={modalState.user} onClose={closeModal} />
      )}
      {modalState.type === "add" && (
        <UserModal
          isOpen={modalState.type === "add"}
          onClose={closeModal}
          onAddUser={handleAddUser}
        />
      )}
    </div>
  );
};
