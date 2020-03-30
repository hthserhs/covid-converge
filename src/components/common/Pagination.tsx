import React, { FC } from 'react';

interface Props {
  fromItem: number;
  toItem: number;
  total: number;
  onNextPage: () => void;
  onPreviousPage: () => void;
}

const Pagination: FC<Props> = ({
  fromItem,
  toItem,
  total,
  onNextPage,
  onPreviousPage
}) => {
  return (
    <nav
      className="pagination is-centered"
      role="navigation"
      aria-label="pagination"
    >
      <button
        className="button pagination-previous"
        onClick={onPreviousPage}
        disabled={fromItem <= 1}
      >
        Previous
      </button>
      <button
        className="button pagination-next"
        onClick={onNextPage}
        disabled={toItem === total}
      >
        Next page
      </button>
      <ul className="pagination-list">
        <li className="has-text-weight-bold">
          {fromItem}-{toItem} of {total}
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
