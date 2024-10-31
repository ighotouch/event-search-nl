import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { PageButtons } from "./PageButtons";

describe("PageButtons", () => {
  it("renders correctly with 5 pages and current page 1", () => {
    const { container } = render(
      <PageButtons totalPages={5} currentPage={1} onPageClick={() => {}} />
    );
    expect(container).toMatchSnapshot();
  });

  it("renders correctly with 5 pages and current page 3", () => {
    const { container } = render(
      <PageButtons totalPages={5} currentPage={3} onPageClick={() => {}} />
    );
    expect(container).toMatchSnapshot();
  });

  it("renders correctly with 0 pages", () => {
    const { container } = render(
      <PageButtons totalPages={0} currentPage={1} onPageClick={() => {}} />
    );
    expect(container).toMatchSnapshot();
  });

  it("renders correctly with 1 page", () => {
    const { container } = render(
      <PageButtons totalPages={1} currentPage={1} onPageClick={() => {}} />
    );
    expect(container).toMatchSnapshot();
  });
});
