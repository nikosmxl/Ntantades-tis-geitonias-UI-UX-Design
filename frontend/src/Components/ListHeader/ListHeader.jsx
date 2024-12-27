import React, { useEffect, useState } from 'react';
import s from './ListHeaderStyle.module.css';
import Dropdown from '../Dropdown/Dropdown';

const ListHeader = ({
  title,
  listElementName,
  listSize,
  pageSize,
  sorting,
  sortingOptions,
  onPageSizeChange,
  onSortingChange
}) => {
  const [pageSizeOptions, setPageSizeOptions] = useState([]);
  
  useEffect(() => {
    const newPageSizeOptions = [];
    const pageSizeOptionsTemplates = [5, 10, 20];
    let currentIteration = 0;
    let currentTemplate = 0;
    
    while (Math.pow(10, currentIteration) * pageSizeOptionsTemplates[currentTemplate] <= listSize) {
      
      newPageSizeOptions.push(Math.pow(10, currentIteration) * pageSizeOptionsTemplates[currentTemplate])
  
      if (currentTemplate === 2) {
        currentIteration++;
        currentTemplate = 0;
      } else {
        currentTemplate++;
      }
    }

    setPageSizeOptions(newPageSizeOptions);
  }, [listSize]);

  return ( 
    <div>
      <h2>{title}</h2>
      <div className={s.babysitter_search_table_info}>
        <div className={s.babysitter_search_pagination_info}>
          <p>{listSize} {listElementName}</p>
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