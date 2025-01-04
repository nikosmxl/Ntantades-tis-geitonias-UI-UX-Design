import React, { useEffect, useState } from 'react';
import s from './ListHeaderStyle.module.css';
import Dropdown from '../Dropdown/Dropdown';

const ListHeader = ({
  listElementName,
  listSize,
  pageSize,
  sorting,
  sortingOptions,
  onPageSizeChange,
  onSortingChange,
  listType='list',
  title=null,
}) => {
  const [pageSizeOptions, setPageSizeOptions] = useState([]);
  
  useEffect(() => {
    if (listType === 'grid') {
      setPageSizeOptions([8]);
      return;
    }

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
    <>
      <div className={s.list_header_container}>
        {title && (<h2 className={s.list_header_title}>{title}</h2>)}
        <div className={s.list_header_table_info}>
          <div className={s.list_header_pagination_info}>
            <p>{listSize} {listElementName}</p>
            <p>•</p>
            <p>Εμφάνιση ανά:</p>
            <Dropdown
              selectedOption={pageSize}
              options={pageSizeOptions}
              onChange={(newPageSize) => onPageSizeChange(newPageSize)}
            />
          </div>
          <div className={s.list_header_sorting_info}>
            <p>Ταξινόμηση κατά:</p>
            <Dropdown
              selectedOption={sorting}
              options={sortingOptions}
              onChange={(newSorting) => onSortingChange(newSorting)}
            />
          </div>
        </div>
      </div>
      <hr />
    </>
  );
}
 
export default ListHeader;