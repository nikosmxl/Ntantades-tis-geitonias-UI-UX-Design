import React, { useState } from 'react';
import s from './ListingsHistoryStyle.module.css';
import ListHeader from "../../../Components/ListHeader/ListHeader";
import Filters from './Filters/Filters';
import Pagination from "../../../Components/Pagination/Pagination";
import Listing from '../../../Components/Listing/Listing';
import Breadcrumbs from '../../../Components/Breadcrumbs/Breadcrumbs';

const ListingsHistory = ({}) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [sorting, setSorting] = useState('Πιο πρόσφατη');
  const [filters, setFilters] = useState({});

  return (
    <div className={s.listings_history_container}>
      <div className={s.breadcrumbs_container}>
        <Breadcrumbs
          breadcrumbItems={[
            { label: 'Αρχική Σελίδα', route: ''},
            { label: 'Ιστορικό', route: 'history'},
            { label: 'Ιστορικό Αγγελιών', route: '.'},
          ]}
        />
      </div>
      <div className={s.listings_history_main_content}>
        <ListHeader
          title='Ιστορικό Αγγελιών'
          listSize={8}
          listElementName='Αγγελίες'
          pageSize={pageSize}
          sorting={sorting}
          sortingOptions={['Πιο πρόσφατη', 'Λιγότερο πρόσφατη']}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          onSortingChange={(newSorting) => setSorting(newSorting)}
        />

        <div className={s.listings_history_table_with_filters}>

          <Filters
            filters={filters}
            onFilterChange={setFilters}
          />

          <div className={s.listings_history_table}>
            <Listing
              isHistory={true}
            />
            <Pagination
              pages={3}
              currentPage={page}
              onChange={(pageNum) => setPage(pageNum)}
              width='501px'
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default ListingsHistory;