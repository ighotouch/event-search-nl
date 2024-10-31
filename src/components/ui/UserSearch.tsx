import { debounce, DEBOUNCE_DELAY } from "@/lib/utils";
import React, { useState, useCallback } from "react";

interface UserSearchProps {
  onSearch: (query: string) => void;
  onClear: () => void;
}

// NOTE: search is only implement to match name or email as stated in the assignment
const UserSearch: React.FC<UserSearchProps> = React.memo(
  ({ onSearch, onClear }) => {
    const [query, setQuery] = useState("");

    const handleSearch = useCallback(
      debounce<[string]>((value) => {
        if (value.trim() === "") {
          onClear();
        } else {
          onSearch(value);
        }
      }, DEBOUNCE_DELAY),
      [onSearch, onClear]
    );

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setQuery(value);
      handleSearch(value);
    };

    const clearSearch = () => {
      setQuery("");
      onClear();
    };

    return (
      <div className="flex space-x-2 mb-4">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search by name or email"
          className="bg-gray-700 border border-gray-600 text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Search Users"
        />
        <button
          onClick={clearSearch}
          className="p-2 bg-red-500 text-white rounded"
          aria-label="Clear Search"
        >
          Clear Search
        </button>
      </div>
    );
  }
);

UserSearch.displayName = "UserSearch";

export default UserSearch;
