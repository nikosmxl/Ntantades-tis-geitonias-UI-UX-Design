import React from 'react';
import s from './ListHeaderStyle.module.css';
import Dropdown from '../Dropdown/Dropdown';

const ListHeader = ({
  title,
  listSize,
  pageSize,
  sorting,
  pageSizeOptions,
  sortingOptions,
  onPageSizeChange,
  onSortingChange
}) => {
  return ( 
    <div>
      <h2>{title}</h2>
      <div className={s.babysitter_search_table_info}>
        <div className={s.babysitter_search_pagination_info}>
          <p>{listSize}</p>
          <p>•</p>
          <p>Εμφάνιση ανά:</p>
          <Dropdown
            selectedOption={pageSize}
            options={pageSizeOptions}
            onChange={(newPageSize) => onPageSizeChange(newPageSize)}
          />
        </div>
        <div className={s.babysitter_search_sorting_info}>
          <p>Ταξινόμηση κατά:</p>
          <Dropdown
            selectedOption={sorting}
            options={sortingOptions}
            onChange={(newSorting) => onSortingChange(newSorting)}
          />
        </div>
      </div>
    </div>
  );
}
 
export default ListHeader;