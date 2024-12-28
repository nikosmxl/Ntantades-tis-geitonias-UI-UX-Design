import React, { useState } from 'react';
import s from './ParentDatesStyle.module.css';
import ListHeader from '../../../Components/ListHeader/ListHeader';
import Pagination from '../../../Components/Pagination/Pagination';
import DateGridView from '../../../Components/DateGridView/DateGridView';
import BabysitterGridView from '../../../Components/BabysitterGridView/BabysitterGridView';

const ParentDates = ({}) => {
  const [page, setPage] = useState(1);
  const [dates, setDates] = useState([
    { status: 'responded' },
    { status: 'scheduled' },
    { status: 'scheduled' },
    { status: 'pending' },
    { status: 'pending' },
    { status: 'rejected' },
    { status: 'completed' },
    { status: 'completed' },
  ]);
  const [babysitters, setBabysitters] = useState([
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
  ]);
  
  return (
    <div className={s.parent_dates_container}>
      <div className={s.breadcrumbs_container}>
        Αρχική Σελίδα > Βρείτε νταντά
      </div>
      <div className={s.parent_dates_main_content}>
        <h2>Τα ραντεβού μου</h2>

        <ListHeader
          listType='grid'
          title='Ραντεβού'
          listSize={dates.length}
          listElementName='Ραντεβού'
          pageSize={8}
          sorting={'Αξιολόγηση (Φθίνουσα)'}
          sortingOptions={['Αξιολόγηση (Φθίνουσα)', 'Αξιολόγηση (Αύξουσα)']}
          onPageSizeChange={() => {}}
          onSortingChange={() => {}}
        />

        <DateGridView
          dates={dates}
        />

        <Pagination
          pages={1}
          currentPage={page}
          onChange={(newPage) => setPage(newPage)}
          width='500px'
        />

        <ListHeader
          listType='grid'
          title='Κανονίστε Ραντεβού'
          listSize={babysitters.length}
          listElementName='Διαθέσιμες Νταντάδες'
          pageSize={8}
          sorting={'Αξιολόγηση (Φθίνουσα)'}
          sortingOptions={['Αξιολόγηση (Φθίνουσα)', 'Αξιολόγηση (Αύξουσα)']}
          onPageSizeChange={() => {}}
          onSortingChange={() => {}}
        />

        <BabysitterGridView
          babysitters={babysitters}
        />

        <Pagination
          pages={1}
          currentPage={page}
          onChange={(newPage) => setPage(newPage)}
          width='500px'
        />
      </div>
    </div>
  );
};
 
export default ParentDates;