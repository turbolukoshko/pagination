import { FC, useEffect, useState } from "react";

import { useIsMobile } from "../../hooks/useIsMobile";
import { ArrowRight } from "./shared/ArrowRight";
import { ArrowLeft } from "./shared/ArrowLeft";
import "./Pagination.css";

type PaginationProps = {
  /* current active page*/
  activePage?: number;
  /* maximum number of elements on the page*/
  limit?: number;
  /* total number of pages */
  pageCount?: number;
  /* total number of elements*/
  itemsCount?: number;
  /* callback, change current page*/
  onPageChange?: (page: number) => void;
  /* additional styles*/
  className?: string;
};

const FIRST_PAGE = 1;

export const Pagination: FC<PaginationProps> = ({
  activePage = 1,
  limit = 20,
  pageCount,
  itemsCount = 0,
  onPageChange,
  className = "",
}): JSX.Element | null => {
  const isPhone = useIsMobile();
  const totalPageCount = pageCount ?? Math.ceil(itemsCount / limit);
  const [currentPage, setCurrentPage] = useState<number>(activePage);

  useEffect(() => {
    setCurrentPage(activePage);
  }, [activePage]);

  const findLeftOrder = () => {
    if (currentPage >= 2) {
      return currentPage > 2 ? 4 : 3;
    }

    return 2;
  };

  const siblingLeftDefault = currentPage > 3 ? 2 : currentPage - FIRST_PAGE;
  const siblingRightDefault =
    currentPage > 3 ? currentPage + FIRST_PAGE : findLeftOrder();

  const isLastElement =
    totalPageCount - currentPage > 2 ||
    (totalPageCount === 5 && currentPage === 3 && currentPage < 5);
  const isShowDots = totalPageCount - currentPage === FIRST_PAGE;

  const siblingLeftMobile =
    currentPage === FIRST_PAGE ? currentPage - 1 : currentPage - 2;
  const siblingRightMobile = currentPage + 1;

  const siblingLeft = !isPhone
    ? currentPage - siblingLeftDefault
    : siblingLeftMobile;
  const siblingRight = !isPhone ? siblingRightDefault : siblingRightMobile;

  const paginate = (page: number) => {
    onPageChange?.(page);
    setCurrentPage(page);
  };

  const renderPagination = () => {
    const pages = [];

    for (let i = 0; i < totalPageCount; i++) {
      pages.push(i + FIRST_PAGE);
    }
    return pages;
  };

  const paginationElements = renderPagination();

  const isLastPage =
    paginationElements.length &&
    paginationElements.length !== currentPage &&
    !isShowDots &&
    !isPhone;

  return totalPageCount >= 1 ? (
    <div className={`pagination ${className}`}>
      <ul>
        {currentPage !== FIRST_PAGE && (
          <li key="0">
            <button onClick={() => paginate(currentPage - 1)} className="arrow">
              <ArrowLeft />
            </button>
          </li>
        )}
        {!isPhone && (
          <li key="1">
            <button
              onClick={(e) => paginate(+(e.target as HTMLButtonElement).value)}
              value={FIRST_PAGE}
              className={`
              element
              ${currentPage === FIRST_PAGE && "active"}
              `}
            >
              {FIRST_PAGE}
            </button>
          </li>
        )}
        {currentPage >= 4 && !isPhone && <span className="dots" />}
        {paginationElements
          .slice(siblingLeft, siblingRight)
          .map((element, idx) => {
            return (
              <li key={element + idx}>
                <button
                  onClick={(e) =>
                    paginate(+(e.target as HTMLButtonElement).value)
                  }
                  value={element}
                  className={`element
                    ${currentPage === element && "active"}
                  `}
                >
                  {element}
                </button>
              </li>
            );
          })}
        {paginationElements.length !== currentPage &&
          isLastElement &&
          !isPhone && <span className="dots" />}
        {isLastPage && (
          <li key="2">
            <button
              className={`element
                ${currentPage === paginationElements.length && "active"}
              `}
              onClick={(e) => paginate(+(e.target as HTMLButtonElement).value)}
              value={paginationElements.length}
            >
              {paginationElements.length}
            </button>
          </li>
        )}
        {paginationElements.length !== currentPage && (
          <li key="3">
            <button
              onClick={() => paginate(currentPage + 1)}
              className="arrow right"
            >
              <ArrowRight />
            </button>
          </li>
        )}
      </ul>
    </div>
  ) : null;
};
