import React, { useState } from 'react';
import s from './ApplicationsHistoryStyle.module.css';
import ListHeader from "../../../Components/ListHeader/ListHeader";
import Filters from './Filters/Filters';
import Pagination from "../../../Components/Pagination/Pagination";
import Application from '../../../Components/Application/Application';

const ApplicationsHistory = ({}) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [sorting, setSorting] = useState('Πιο πρόσφατη');
  const [filters, setFilters] = useState({});

  return (
    <div className={s.applications_history_container}>
      <div className={s.breadcrumbs_container}>
        Αρχική Σελίδα > Ιστορικό > Ιστορικό Αιτήσεων
      </div>
      <div className={s.applications_history_main_content}>
        <ListHeader
          title='Ιστορικό Αιτήσεων'
          listSize={8}
          listElementName='Αιτήσεις'
          pageSize={pageSize}
          sorting={sorting}
          sortingOptions={['Πιο πρόσφατη', 'Λιγότερο πρόσφατη']}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          onSortingChange={(newSorting) => setSorting(newSorting)}
        />

        <div className={s.applications_history_table_with_filters}>

          <Filters
            filters={filters}
            onFilterChange={setFilters}
          />

          <div className={s.applications_history_table}>
            <Application
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

export default ApplicationsHistory;