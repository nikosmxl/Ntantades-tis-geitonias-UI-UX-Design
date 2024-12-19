import React from 'react';
import s from './PagiationStyle.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';

const Pagination = ({ pages, currentPage, onChange }) => {

  const getPaginationItems = () => {
    let paginationItems = [];
    for (let i = 1; i <= pages; i++) {
      paginationItems.push((
        <div
          className={`${s.pagination_item} ${currentPage === i ? s.active : ''}`}
          onClick={() => onChange(i)}
        >
          <p>{i}</p>
        </div>
      ));
    }

    return paginationItems;
  };

  const handlePrevious = (e) => {
    e.preventDefault();
    if (currentPage !== 1) {
      onChange(currentPage-1);
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (currentPage !== pages) {
      onChange(currentPage+1);
    }
  };

  return (
    <div className={s.pagination_container}>
      <div className={s.pagination_items}>
        <div
          className={`${s.pagination_item} ${s.active}`}
          onClick={handlePrevious}
        >
          <FontAwesomeIcon icon={faAngleLeft} />
        </div>
        <div className={s.pagination_contained_pages}>
          {
            getPaginationItems()
          }
        </div>
        <div
          className={`${s.pagination_item} ${s.active}`}
          onClick={handleNext}
        >
          <FontAwesomeIcon icon={faAngleRight} />
        </div>
      </div>
      <hr/>
    </div>
  );
}
 
export default Pagination;