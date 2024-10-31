# GenericTable Component

The `GenericTable` component is a reusable table component designed to display data in a paginated and sortable format. It is generic and can work with any data type, making it highly adaptable for various use cases.

```
import GenericTable from "@/components/ui/table/GenericTable";
import { User } from "@/schemas/user";

// Sample user data
const users: User[] = [
  { id: 1, name: "John Doe", username: "johndoe", email: "john@example.com", avatarUrl: "path/to/avatar1.jpg" },
  { id: 2, name: "Jane Smith", username: "janesmith", email: "jane@example.com", avatarUrl: "path/to/avatar2.jpg" },
];

const userColumns = [
  { header: "ID", key: "id" },
  { header: "Name", key: "avatarUrl" },
  { header: "Username", key: "username" },
  { header: "Email", key: "email" },
];

const MyComponent = () => {
  return (
    <GenericTable
      data={users}
      columns={userColumns}
      caption="List of Users"
      onRowClick={(user) => console.log(user)}
    />
  );
};
```

Props
The GenericTable component accepts the following props:

| Prop            | Type                                  | Default Value | Description                                                                                |
|-----------------|---------------------------------------|---------------|--------------------------------------------------------------------------------------------|
| `data`          | `T[]`                                 | -             | The array of data to be displayed in the table.                                          |
| `columns`       | `Column<T>[]`                        | -             | An array defining the table columns, where `Column` has a `header` (string) and `key` (key of T). |
| `caption`       | `string`                             | -             | Optional caption for the table, displayed above the table.                               |
| `onRowClick`    | `(item: T) => void`                  | -             | Optional callback function triggered when a row is clicked.                               |
| `itemsPerPage`  | `number`                             | `10`          | The number of items displayed per page.                                                  |


interface Column<T> {
  header: string;      // The display name for the column header
  key: keyof T;       // The key of the data item to display in the column
}

