import React, { useEffect, useState } from 'react';
import s from './BabysitterSearchStyle.module.css';
import BabysitterListingCard from '../../../Components/BabysitterListingCard/BabysitterListingCard';
import Pagination from '../../../Components/Pagination/Pagination';
import Dropdown from '../../../Components/Dropdown/Dropdown';
import Filters from './Filters/Filters';

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

        <h2>Βρείτε νταντά</h2>
        <div className={s.babysitter_search_table_info}>
          <div className={s.babysitter_search_pagination_info}>
            <p>147 Αγγελίες</p>
            <p>•</p>
            <p>Εμφάνιση ανά:</p>
            <Dropdown
              selectedOption={pageSize}
              options={[10, 20, 40]}
              onChange={(newPageSize) => setPageSize(newPageSize)}
            />
          </div>
          <div className={s.babysitter_search_sorting_info}>
            <p>Ταξινόμηση κατά:</p>
            <Dropdown
              selectedOption={sorting}
              options={['Αξιολόγηση (Φθίνουσα)', 'Αξιολόγηση (Αύξουσα)']}
              onChange={(newSorting) => setSorting(newSorting)}
            />
          </div>
        </div>

        <hr />

        <div className={s.babysitter_search_table_with_filters}>

          <Filters
            filters={filters}
            availabilityFilter={availabilityFilter}
            onChange={setFilters}
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