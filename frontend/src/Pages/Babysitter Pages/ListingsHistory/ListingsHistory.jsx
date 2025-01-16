import React, { useState, useEffect, useMemo } from 'react';
import s from './ListingsHistoryStyle.module.css';
import ListHeader from "../../../Components/ListHeader/ListHeader";
import Filters from './Filters/Filters';
import Pagination from "../../../Components/Pagination/Pagination";
import Listing from '../../../Components/Listing/Listing';
import Breadcrumbs from '../../../Components/Breadcrumbs/Breadcrumbs';
import { db } from '../../../firebase';
import { collection, getDocs, where, query, orderBy, doc } from 'firebase/firestore';
import { getDateFromMs, getDateFromObj } from '../../../utils/date';

const ListingsHistory = ({}) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [sorting, setSorting] = useState('Πιο πρόσφατη');
  const [filters, setFilters] = useState({});
  const [listings, setListings] = useState([]);

  const filterData = (listings) => {
    const filteredListings = listings.filter(listing => {
      if (filters.publishedFrom && getDateFromObj(filters.publishedFrom) > getDateFromMs(listing.date)) return false;

      if (filters.publishedTo && getDateFromObj({...filters.publishedTo, day: filters.publishedTo.day+1}) < getDateFromMs(listing.date)) return false;

      if (filters.area && !listing.areas.find(area => area.city.label.toLowerCase().includes(filters.area.toLowerCase()))) return false;

      if (filters.partTime && filters.fullTime) return true;

      if (filters.partTime && listing.workingHours != 'Μερική απασχόληση') return false;

      if (filters.fullTime && listing.workingHours != 'Πλήρης απασχόληση') return false;

      return true;
    });

    setListings(filteredListings);
  };

  const fetchData = async () => {
    const babysitterDocRef = doc(db, 'Users', babysitterId);
    const q = query(
      collection(db, 'Listings'),
      where("status", "==", "delete"),
      where("babysitter", "==", babysitterDocRef),
      orderBy("date", sorting === "Πιο πρόσφατη" ? 'desc' : 'asc')
    );
    const listingSnaps = await getDocs(q);
    const fetchedListings = listingSnaps.docs.map(listingDoc => ({ ...listingDoc.data(), id: listingDoc.id}));
    filterData(fetchedListings);
  };

  const babysitterId = useMemo(() => JSON.parse(localStorage.getItem('user'))['id'], []);

  useEffect(() => {
    fetchData();
  }, [babysitterId, sorting, filters]);

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
          listSize={listings.length}
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
            {
              listingsByPage.map(listing => {
                return (
                  <Listing
                    key={listing.id}
                    listing={listing}
                    isHistory={true}
                  />
                );
              })
            }
            <Pagination
              pages={listingsPages}
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