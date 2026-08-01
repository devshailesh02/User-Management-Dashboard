import React from "react";
import { useSearchParams } from "react-router-dom";

const Pagination = ({
  currentPage = 1,
  totalPages = 1,
  total = 0,
  limit = 10,
  siblingCount = 1,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Hide pagination if everything fits on one page
  if (totalPages <= 1 || total <= limit) {
    return null;
  }

  const changePage = (page) => {
    if (page < 1 || page > totalPages) return;

    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());

    setSearchParams(params);
  };

  const pages = [];

  const start = Math.max(1, currentPage - siblingCount);
  const end = Math.min(totalPages, currentPage + siblingCount);

  if (start > 1) {
    pages.push(1);

    if (start > 2) {
      pages.push("...");
    }
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (end < totalPages) {
    if (end < totalPages - 1) {
      pages.push("...");
    }

    pages.push(totalPages);
  }

  return (
    <div className="mt-6 flex flex-col items-center justify-between gap-4 rounded-lg border bg-white p-4 shadow-sm sm:flex-row">
      {/* Information */}
      <div className="text-sm text-gray-600">
        Showing{" "}
        <span className="font-semibold">{(currentPage - 1) * limit + 1}</span> -
        <span className="font-semibold">
          {" "}
          {Math.min(currentPage * limit, total)}
        </span>{" "}
        of <span className="font-semibold">{total}</span> companies
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        <button
          onClick={() => changePage(currentPage - 1)}
          disabled={currentPage === 1}
          className="rounded-lg border px-3 py-2 text-sm transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Previous
        </button>

        {pages.map((page, index) =>
          page === "..." ? (
            <span key={index} className="px-2 text-gray-500">
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => changePage(page)}
              className={`h-10 w-10 rounded-lg text-sm font-medium transition ${
                currentPage === page
                  ? "bg-blue-600 text-white"
                  : "border hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          ),
        )}

        <button
          onClick={() => changePage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="rounded-lg border px-3 py-2 text-sm transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
