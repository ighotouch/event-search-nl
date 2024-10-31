export const PageButtons = ({
  totalPages,
  currentPage,
  onPageClick,
}: {
  totalPages: number;
  currentPage: number;
  onPageClick: (page: number) => void;
}) => (
  <div className="flex justify-center mt-2 space-x-1">
    {Array.from({ length: totalPages }, (_, index) => (
      <button
        key={index + 1}
        className={`px-3 py-1 rounded-md ${
          currentPage === index + 1
            ? "bg-red-600 text-white"
            : "bg-gray-600 text-gray-200"
        }`}
        onClick={() => onPageClick(index + 1)}
      >
        {index + 1}
      </button>
    ))}
  </div>
);
