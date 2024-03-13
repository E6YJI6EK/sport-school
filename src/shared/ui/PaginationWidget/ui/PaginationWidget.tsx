// const PaginationWidget: FC<PaginationWidgetProps> = (props) => {
//   const { currentPage, onPageChange, totalPages } = props;

//   const handlePrevPage = () => {
//     if (currentPage > 1) {
//       onPageChange(currentPage - 1);
//     }
//   };

//   const handleNextPage = () => {
//     if (currentPage < totalPages) {
//       onPageChange(currentPage + 1);
//     }
//   };

//   const renderPageNumbers = () => {
//     const pageNumbers = [];
//     for (let i = 1; i <= totalPages; i++) {
//       pageNumbers.push(
//         <button
//           key={i}
//           onClick={() => onPageChange(i)}
//           className={currentPage === i ? "active" : ""}
//         >
//           {i}
//         </button>
//       );
//     }
//     return pageNumbers;
//   };

//   return (
//     <div className="pagination">
//       <button onClick={handlePrevPage} disabled={currentPage === 1}>
//         {"<"}
//       </button>
//       {renderPageNumbers()}
//       <button onClick={handleNextPage} disabled={currentPage === totalPages}>
//         {">"}
//       </button>
//     </div>
//   );
// };

// export default PaginationWidget;

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import { FC } from "react";
import cls from "./PaginationWidget.module.scss";

interface PaginationWidgetProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (value: number) => void;
}

const PaginationWidget: FC<PaginationWidgetProps> = (props) => {
  const { currentPage, totalPages, onPageChange } = props;

  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageChange = (_: any, page: number) => {
    onPageChange(page);
  };

  return (
    <div className={cls.root}>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
      />
    </div>
  );
};

export default PaginationWidget;
