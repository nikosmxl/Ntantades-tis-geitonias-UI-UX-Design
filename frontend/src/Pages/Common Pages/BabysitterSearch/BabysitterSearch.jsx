import React, { useEffect, useState } from 'react';
import s from './BabysitterSearchStyle.module.css';
import BabysitterListingCard from '../../../Components/BabysitterListingCard/BabysitterListingCard';
import Pagination from '../../../Components/Pagination/Pagination';
import Filters from './Filters/Filters';
import ListHeader from '../../../Components/ListHeader/ListHeader';

const BabysitterSearch = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sorting, setSorting] = useState('Αξιολόγηση (Φθίνουσα)');
  const [filters, setFilters] = useState({});
  const [availabilityFilter, setAvailabilityFilter] = useState([]);

  const fetchBabysitterListings = () => {
    console.log('api call here');
  };

  useEffect(() => {
    fetchBabysitterListings();
  }, [page, pageSize, sorting, filters]);

  return (
    <div>
      <div className={s.breadcrumbs_container}>
        Αρχική Σελίδα > Βρείτε νταντά
      </div>
      <div className={s.babysitter_search_main_content}>

        <ListHeader
          title='Βρείτε νταντά'
          listSize={147}
          listElementName='Αγγελίες'
          pageSize={pageSize}
          sorting={sorting}
          sortingOptions={['Αξιολόγηση (Φθίνουσα)', 'Αξιολόγηση (Αύξουσα)']}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          onSortingChange={(newSorting) => setSorting(newSorting)}
        />
        <hr />

        <div className={s.babysitter_search_table_with_filters}>

          <Filters
            filters={filters}
            availabilityFilter={availabilityFilter}
            onFilterChange={setFilters}
            onAvailabilityFilterChange={setAvailabilityFilter}
            triggerFetch={fetchBabysitterListings}
          />

          <div className={s.babysitter_search_table}>
            <BabysitterListingCard />
            <BabysitterListingCard />
            <BabysitterListingCard />
            <BabysitterListingCard />
            <BabysitterListingCard />
            <BabysitterListingCard />
            <BabysitterListingCard />
            <BabysitterListingCard />
            <BabysitterListingCard />
            <BabysitterListingCard />
            <Pagination
              pages={3}
              currentPage={page}
              onChange={(pageNum) => setPage(pageNum)}
            />
          </div>

        </div>

      </div>
    </div>
  );
};

export default BabysitterSearch;