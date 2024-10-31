import { useQuery } from '@tanstack/react-query';
import { User } from "@/schemas/user";

const fetchUsers = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();

  // Map through the data and add a mock avatar URL
  return data.map((user: User, index: number) => ({
    ...user,
    avatarUrl: `https://i.pravatar.cc/150?img=${index + 1}`, // Adding mock avatar URL
  }));
};

const useUsers = () => {
  return useQuery<User[], Error>({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });
};

export { useUsers };
