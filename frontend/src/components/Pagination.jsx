import React from 'react';
import '../Style/componentStyles/Pagination.css';
import { useSelector } from 'react-redux';

const Pagination = ({
  currentpage,
  onpagechange,
  activeClass = 'active',
  NextPageText = "Next",
  PrevPageText = "Prev",
  FirstPageText = "1st",
  LastPageText = "Last"
}) => {
  const { products, totalPages } = useSelector((state) => state.products);

  if (!products || products.length === 0 || totalPages <= 1) return null;

  const GetPageNumber = () => {
    const PageNumber = [];
    const PageWindow = 2;

    const startPage = Math.max(1, currentpage - PageWindow);
    const endPage = Math.min(totalPages, currentpage + PageWindow);

    for (let i = startPage; i <= endPage; i++) {
      PageNumber.push(i);
    }

    return PageNumber;
  };

  return (
    <div className='pagination'>
      {/* زر الصفحة الأولى والسابق */}
      {currentpage > 1 && (
        <>
          <button className="pagination-btn" onClick={() => onpagechange(1)}>
            {FirstPageText}
          </button>
          <button className="pagination-btn" onClick={() => onpagechange(currentpage - 1)}>
            {PrevPageText}
          </button>
        </>
      )}

      {/* أرقام الصفحات */}
      {GetPageNumber().map((number) => (
        <button
          className={`pagination-btn ${currentpage === number ? activeClass : ''}`}
          key={number}
          onClick={() => onpagechange(number)}
        >
          {number}
        </button>
      ))}

      {/* زر التالي والأخيرة */}
      {currentpage < totalPages && (
        <>
          <button className="pagination-btn" onClick={() => onpagechange(currentpage + 1)}>
            {NextPageText}
          </button>
          <button className="pagination-btn" onClick={() => onpagechange(totalPages)}>
            {LastPageText}
          </button>
        </>
      )}
    </div>
  );
};

export default Pagination;
