import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useUsers } from "@/services/use-users";
import { UsersTable } from "./users-table";
import { DEBOUNCE_DELAY } from "@/lib/utils";

vi.mock("@/services/use-users", () => ({
  useUsers: vi.fn(),
}));

describe("UserTable Page", () => {
  const mockUsers = [
    {
      id: 1,
      name: "Johann Sebastian", // German composer and musician 
      username: "Bach",
      email: "Johann@example.com",
    },
    {
      id: 2,
      name: "Fedde Grand", // Also a popular name in the netherlands
      username: "FeddeGrand",
      email: "Fedde@example.com",
    },
  ];

  beforeEach(() => {
    (useUsers as jest.Mock).mockReturnValue({
      data: mockUsers,
      loading: false,
      error: null,
      setUsers: vi.fn(),
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders the search input field", () => {
    render(<UsersTable />);
    expect(screen.getByLabelText(/Search Users/i)).toBeTruthy();
  });

  it("filters users by name when typing in the search input", async () => {
    const searchInput = screen.getByLabelText(/search users/i);
    fireEvent.change(searchInput, { target: { value: "Johan" } });
    await waitFor(() => {
      expect(screen.getByText("Johann Sebastian")).toBeTruthy();
      expect(screen.queryByText("Fedde Grand")).toBeFalsy();
    });
  });

  it("filters users by email when typing in the search input", async () => {
    const searchInput = screen.getByLabelText(/search users/i);
    fireEvent.change(searchInput, { target: { value: "Fedde@example.com" } });

    await waitFor(() => {
      expect(screen.getByText("Fedde Grand")).toBeTruthy();
      expect(screen.queryByText("Johann Sebastian")).toBeFalsy();
    });
  });

  it("displays 'No users found' when no matches are found", async () => {
    const searchInput = screen.getByLabelText(/search users/i);
    fireEvent.change(searchInput, { target: { value: "Not Found" } });

    await waitFor(
      () => {
        expect(screen.getByText(/no users found/i)).toBeTruthy();
      },
      { timeout: DEBOUNCE_DELAY }
    );
  });

  it("clears search input and shows all users when clicking 'Clear Search'", async () => {
    const searchInput = screen.getByLabelText(/search users/i);
    fireEvent.change(searchInput, { target: { value: "Joh" } });

    await waitFor(() => {
      expect(screen.getByText("Johann Sebastian")).toBeTruthy();
      expect(screen.queryByText("Fedde Grand")).toBeFalsy();
    });

    const clearButton = screen.getByLabelText(/clear search/i);
    fireEvent.click(clearButton);

    await waitFor(() => {
      expect(screen.getByText("Johann Sebastian")).toBeTruthy();
      expect(screen.getByText("Fedde Grand")).toBeTruthy();
    });
  });
});
