import { Pagination } from "react-bootstrap";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import React, { useState } from "react";

interface PaginationProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
}
const PaginationComponent: React.FC<PaginationProps> = ({
  currentPage,
  setCurrentPage,
}) => {
  const [totalPages] = useState(1);
  const { countPages } = useSelector((state: RootState) => state.reservations);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Pagination>
      <Pagination.First
        onClick={() => handlePageChange(1)}
        disabled={currentPage === 1}
      />
      <Pagination.Prev
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      />

      {Array.from({ length: countPages }, (_, index) => (
        <Pagination.Item
          key={index + 1}
          active={index + 1 === currentPage}
          onClick={() => handlePageChange(index + 1)}
        >
          {index + 1}
        </Pagination.Item>
      ))}

      <Pagination.Next
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      />
      <Pagination.Last
        onClick={() => handlePageChange(totalPages)}
        disabled={currentPage === totalPages}
      />
    </Pagination>
  );
};

export default PaginationComponent;
