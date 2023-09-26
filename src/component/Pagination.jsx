
import React from 'react';

const Pagination = ({ currentPage, totalPages, onNextPage, onPrevPage, onPageClick }) => {
  const cardsPerPage = 3; 
  const startIndex = (currentPage - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="pagination">
      <button onClick={onPrevPage}>Previous</button>
      {pageNumbers.map((pageNumber) => {
        if (pageNumber >= startIndex / cardsPerPage + 1 && pageNumber <= endIndex / cardsPerPage) {
          return (
            <button key={pageNumber} onClick={() => onPageClick(pageNumber)}>
              {pageNumber}
            </button>
          );
        }
        return null;
      })}
      <button onClick={onNextPage}>Next</button>
    </div>
  );
};

export default Pagination;

