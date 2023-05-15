import { useState } from "react";

const usePagination = (data: any[], itemsPerPage: number) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const maxPage: number = Math.ceil(data.length / itemsPerPage);

  const currentData = () => {
    const begin: number = (currentPage - 1) * itemsPerPage;
    const end: number = begin + itemsPerPage;
    return data.slice(begin, end);
  };

  function next() {
    setCurrentPage((currentPage) => Math.min(currentPage + 1, maxPage));
  }

  function prev() {
    setCurrentPage((currentPage) => Math.max(currentPage - 1, 1));
  }

  function jump(page: number) {
    const pageNumber: number = Math.max(1, page);
    setCurrentPage((currentPage) => Math.min(pageNumber, maxPage));
  }

  return { next, prev, jump, currentData, currentPage, maxPage };
};

export default usePagination;
