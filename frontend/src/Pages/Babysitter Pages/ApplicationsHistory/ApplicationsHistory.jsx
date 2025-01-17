import React, { useState, useMemo, useEffect } from 'react';
import s from './ApplicationsHistoryStyle.module.css';
import ListHeader from "../../../Components/ListHeader/ListHeader";
import Filters from './Filters/Filters';
import Pagination from "../../../Components/Pagination/Pagination";
import Application from '../../../Components/Application/Application';
import Breadcrumbs from '../../../Components/Breadcrumbs/Breadcrumbs';
import { filterData } from './filterData';
import { db } from '../../../firebase';
import { collection, getDocs, where, query, orderBy, doc } from 'firebase/firestore';

const ApplicationsHistory = ({}) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [sorting, setSorting] = useState('Πιο πρόσφατη');
  const [filters, setFilters] = useState({});
  const [applications, setApplications] = useState([]);
  
  const babysitterId = useMemo(() => JSON.parse(localStorage.getItem('user'))['id'], []);
console.log(filters)
  const fetchData = async () => {
    const babysitterDocRef = doc(db, 'Users', babysitterId);
    
    let applicationStatusFilter = [];
    if (filters?.accepted && !filters?.rejected) applicationStatusFilter = ["accept"];
    else if (!filters?.accepted && filters?.rejected) applicationStatusFilter = ["decline"];
    else applicationStatusFilter = ["accept", "decline"];

    const q = query(
      collection(db, 'Applications'),
      where("status", "in", applicationStatusFilter),
      where("babysitter", "==", babysitterDocRef),
      orderBy("dateCreated", sorting === "Πιο πρόσφατη" ? 'desc' : 'asc')
    );
    const applicationSnaps = await getDocs(q);
    const fetchedApplications = applicationSnaps.docs.map(applicationDoc => ({ ...applicationDoc.data(), id: applicationDoc.id}));
    filterData(fetchedApplications.filter(app => app.isHistory), filters, setApplications);
  };

  useEffect(() => {
    fetchData();
  }, [babysitterId, sorting, filters]);
  
  const applicationsByPage = useMemo(() => {
    return applications.slice(
      (page-1)*pageSize,
      page*pageSize
    );
  }, [page, pageSize, applications]);

  const applicationsPages = useMemo(() => {
    return Math.ceil(applications.length / pageSize)
  }, [pageSize, applications]);

  return (
    <div className={s.applications_history_container}>
      <div className={s.breadcrumbs_container}>
        <Breadcrumbs
          breadcrumbItems={[
            { label: 'Αρχική Σελίδα', route: ''},
            { label: 'Ιστορικό', route: 'history'},
            { label: 'Ιστορικό Αιτήσεων', route: '.'},
          ]}
        />
      </div>
      <div className={s.applications_history_main_content}>
        <ListHeader
          title='Ιστορικό Αιτήσεων'
          listSize={applications.length}
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
            {
              applicationsByPage.map(application => {
                return (
                  <Application
                    key={application.id}
                    application={application}
                    isParent={false}
                    isHistory={true}
                  />
                );
              })
            }
            <Pagination
              pages={applicationsPages}
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