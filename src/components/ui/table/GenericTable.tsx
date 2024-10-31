import React, { useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { User } from "@/schemas/user";
import UserAvatar from "@/components/ui/UserAvatar";
import { PaginationControls } from "./PaginationControls";
import { PageButtons } from "./PageButtons";

interface Column<T> {
  header: string;
  key: keyof T;
  hideOnSmallScreen?: boolean;
}

interface GenericTableProps<T> {
  data?: T[];
  columns: Column<T>[];
  caption?: string;
  onRowClick?: (item: T) => void;
  itemsPerPage?: number;
}

const GenericTable = <T extends User>({
  data,
  columns,
  caption,
  onRowClick,
  itemsPerPage = 10,
}: GenericTableProps<T>) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T;
    direction: "ascending" | "descending";
  } | null>(null);

  const sortedData = useMemo(() => {
    const sortableItems = data ? [...data] : [];
    if (sortConfig) {
      sortableItems.sort((a, b) => {
        const aValue =
          sortConfig.key === "avatarUrl" ? a.name : a[sortConfig.key];
        const bValue =
          sortConfig.key === "avatarUrl" ? b.name : b[sortConfig.key];
        return aValue < bValue
          ? sortConfig.direction === "ascending"
            ? -1
            : 1
          : aValue > bValue
          ? sortConfig.direction === "ascending"
            ? 1
            : -1
          : 0;
      });
    }
    return sortableItems;
  }, [data, sortConfig]);

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const handleSort = (key: keyof T) => {
    setSortConfig((prev) => {
      const isAscending = prev?.key === key && prev.direction === "ascending";
      return { key, direction: isAscending ? "descending" : "ascending" };
    });
  };

  return (
    <div className="overflow-x-auto">
      <Table className="table-auto min-w-full">
        {caption && (
          <TableCaption className="text-sm text-gray-300 mb-4">
            {caption}
          </TableCaption>
        )}
        <TableHeader className="bg-gray-700">
          <TableRow>
            {columns.map((column, index) => (
              <TableHead
                key={index}
                className={`py-2 px-4 text-left font-semibold text-white cursor-pointer ${
                  column.hideOnSmallScreen ? "hidden md:table-cell" : ""
                }`}
                onClick={() => handleSort(column.key)}
              >
                {column.header}
                {sortConfig?.key === column.key && (
                  <span>
                    {sortConfig.direction === "ascending" ? " 🔼" : " 🔽"}
                  </span>
                )}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.length > 0 ? (
            paginatedData.map((item, index) => (
              <TableRow
                key={index}
                onClick={() => onRowClick && onRowClick(item)}
                className={`${
                  onRowClick ? "cursor-pointer hover:bg-gray-700" : ""
                } bg-gray-800 border-b border-gray-700`}
              >
                {columns.map((column) => (
                  <TableCell
                    key={column.key as string}
                    className={`py-3 px-4 ${
                      column.hideOnSmallScreen ? "hidden md:table-cell" : ""
                    }`}
                  >
                    {column.key === "avatarUrl" ? (
                      <UserAvatar user={item as User} />
                    ) : (
                      (item[column.key] as React.ReactNode)
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center py-4">
                No users found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      <PageButtons
        totalPages={totalPages}
        currentPage={currentPage}
        onPageClick={handlePageChange}
      />
    </div>
  );
};

export default GenericTable;
