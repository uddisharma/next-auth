"use client";
import React from "react";
import { Button } from "../ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

const Pagination = ({
  totalPages,
  currentPage,
}: {
  totalPages: number;
  currentPage: number;
}) => {
  const router = useRouter();

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      router.push(`/blogs?page=${page}`);
    }
  };

  const getVisiblePages = () => {
    const startPage = Math.max(1, currentPage - (currentPage % 4 || 4) + 1);
    return Array.from(
      { length: Math.min(4, totalPages - startPage + 1) },
      (_, index) => startPage + index,
    );
  };

  return (
    <div className="container mx-auto px-4 mb-10 flex justify-between gap-2">
      {/* Previous Button */}
      <Button
        variant="outline"
        className="border-gray1 text-btnblue"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage <= 1}
      >
        <ArrowLeft /> Previous
      </Button>

      {/* Page Numbers */}
      <div className="flex justify-center gap-2">
        {getVisiblePages().map((page) => (
          <Button
            key={page}
            variant={currentPage === page ? "default" : "outline"}
            className={
              currentPage === page
                ? "bg-btnblue text-white hover:bg-btnblue/80"
                : "border-gray1 text-btnblue"
            }
            onClick={() => handlePageChange(page)}
          >
            {page}
          </Button>
        ))}
      </div>

      {/* Next Button */}
      <Button
        variant="outline"
        className="border-gray1 text-btnblue"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
      >
        Next <ArrowRight />
      </Button>
    </div>
  );
};

export default Pagination;
