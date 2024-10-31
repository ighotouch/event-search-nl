export const PaginationControls = ({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) => (
  <div className="flex justify-between mt-4">
    <button
      className={`px-4 py-2 rounded-md ${
        currentPage === 1 ? "bg-gray-600" : "bg-red-600"
      }`}
      onClick={() => onPageChange(currentPage - 1)}
      disabled={currentPage === 1}
    >
      Previous
    </button>
    <div className="flex items-center">
      <span className="text-white">
        Page {currentPage} of {totalPages}
      </span>
    </div>
    <button
      className={`px-4 py-2 rounded-md ${
        currentPage === totalPages ? "bg-gray-600" : "bg-red-600"
      }`}
      onClick={() => onPageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
    >
      Next
    </button>
  </div>
);
