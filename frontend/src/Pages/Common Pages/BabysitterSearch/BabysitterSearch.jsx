import React, { useEffect, useState, useMemo } from 'react';
import s from './BabysitterSearchStyle.module.css';
import BabysitterListingCard from '../../../Components/BabysitterListingCard/BabysitterListingCard';
import Pagination from '../../../Components/Pagination/Pagination';
import Filters from './Filters/Filters';
import ListHeader from '../../../Components/ListHeader/ListHeader';
import Breadcrumbs from '../../../Components/Breadcrumbs/Breadcrumbs';
import { db } from '../../../firebase';
import { getDocs, where, query, collection } from 'firebase/firestore';
import { filterData } from './filterData';
import { useLocation } from 'react-router-dom';

const BabysitterSearch = () => {
  const location = useLocation();

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sorting, setSorting] = useState('Αξιολόγηση (Φθίνουσα)');
  const [filters, setFilters] = useState(location?.state?.filters ?? {});
  const [availabilityFilter, setAvailabilityFilter] = useState([]);
  const [listings, setListings] = useState([]);

  const fetchData = async () => {
    const q = query(
      collection(db, 'Listings'),
      where('status', '==', 'publish')
    );
    const listingSnaps = await getDocs(q);
    const fetchedListings = listingSnaps.docs.map(listingDoc => ({ ...listingDoc.data(), id: listingDoc.id}));
    filterData(fetchedListings, {...filters, availability: availabilityFilter}, setListings, sorting);
  };

  useEffect(() => {
    fetchData();
  }, [sorting, filters]);

  const listingsByPage = useMemo(() => {
    return listings.slice(
      (page-1)*pageSize,
      page*pageSize
    );
  }, [page, pageSize, listings]);

  const listingsPages = useMemo(() => {
    return Math.ceil(listings.length / pageSize)
  }, [pageSize, listings]);

  return (
    <div>
      <div className={s.breadcrumbs_container}>
        <Breadcrumbs
          breadcrumbItems={[
            { label: 'Αρχική Σελίδα', route: ''},
            { label: 'Βρείτε νταντά', route: '.'},
          ]}
        />
      </div>
      <div className={s.babysitter_search_main_content}>
        <h2>Βρείτε νταντά</h2>
        <ListHeader
          listSize={listings.length}
          listElementName='Αγγελίες'
          pageSize={pageSize}
          sorting={sorting}
          sortingOptions={['Αξιολόγηση (Φθίνουσα)', 'Αξιολόγηση (Αύξουσα)']}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          onSortingChange={(newSorting) => setSorting(newSorting)}
        />

        <div className={s.babysitter_search_table_with_filters}>

          <Filters
            filters={filters}
            availabilityFilter={availabilityFilter}
            onFilterChange={setFilters}
            onAvailabilityFilterChange={setAvailabilityFilter}
            triggerFetch={() => fetchData(listings)}
          />

          <div className={s.babysitter_search_table}>
            {
              listingsByPage.map(listing => {
                return (
                  <BabysitterListingCard
                    key={listing.id}
                    listing={listing}
                  />
                );
              })
            }
            <Pagination
              pages={listingsPages}
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