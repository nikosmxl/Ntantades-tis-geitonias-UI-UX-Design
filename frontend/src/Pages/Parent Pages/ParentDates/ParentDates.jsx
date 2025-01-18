import React, { useState, useMemo, useEffect } from 'react';
import s from './ParentDatesStyle.module.css';
import ListHeader from '../../../Components/ListHeader/ListHeader';
import Pagination from '../../../Components/Pagination/Pagination';
import DateGridView from '../../../Components/DateGridView/DateGridView';
import BabysitterGridView from '../../../Components/BabysitterGridView/BabysitterGridView';
import DatePopUp from '../../../PopUps/DatePopUp/DatePopUp';
import Breadcrumbs from '../../../Components/Breadcrumbs/Breadcrumbs';
import { useLocation } from 'react-router-dom';
import { getAverageRating } from '../../../utils/calc';
import { doc, getDoc, getDocs, collection, query, where, setDoc } from 'firebase/firestore';
import { db } from '../../../firebase';
import NotificationPopUp from '../../../PopUps/NotificationPopUp/NotificationPopUp';

const ParentDates = ({}) => {
  const location = useLocation();

  const [dates, setDates] = useState([]);
  const [datesPageSize, setDatesPageSize] = useState(8);
  const [datesSorting, setDatesSorting] = useState('Κατάσταση');
  const datesSortingOptions = ['Κατάσταση', 'Αξιολόγηση (Φθίνουσα)', 'Αξιολόγηση (Αύξουσα)'];
  const [datesCurrentPage, setDatesCurrentPage] = useState(1);

  const [babysitters, setBabysitters] = useState([]);
  const [babysittersPageSize, setBabysittersPageSize] = useState(8);
  const [babysittersSorting, setBabysittersSorting] = useState('Αξιολόγηση (Φθίνουσα)');
  const babysittersSortingOptions = ['Αξιολόγηση (Φθίνουσα)', 'Αξιολόγηση (Αύξουσα)'];
  const [babysittersCurrentPage, setBabysittersCurrentPage] = useState(1);

  const [status, setStatus] = useState(location?.state?.status ?? null);
  const [isDatePopupOpen, setDatePopupOpen] = useState(false);
  const [dateToDisplay, setDateToDisplay] = useState(null);

  const parentId = useMemo(() => JSON.parse(localStorage.getItem('user'))['id'], []);

  const onDateClick = (date) => {
    setDatePopupOpen(true);
    setDateToDisplay(date);
  };

  const fetchData = async () => {
    const parentDocRef = doc(db, 'Users', parentId);
    const dq = query(
      collection(db, 'Dates'),
      where("parent", "==", parentDocRef),
    );
    const dateSnaps = await getDocs(dq);
    const nonHistoryDates = dateSnaps.docs.map(dateSnap => ({ ...dateSnap.data(), id: dateSnap.id })).filter(date => !date?.isHistory);

    const aq = query(
      collection(db, 'Applications'),
      where("parent", "==", parentDocRef),
      where("status", "==", "accept"),
    );
    const appSnaps = await getDocs(aq);
    const babysittersThatAccepted = appSnaps.docs.map(appSnap => appSnap.data().babysitter);

    const babysittersForDate = [];
    await Promise.all(babysittersThatAccepted.map(async (babysitter) => {
      const applicationsWithBabysitterSnaps = await getDocs(query(
        collection(db, 'Applications'),
        where('parent', '==', parentDocRef),
        where('babysitter', '==', babysitter),
        where('status', '==', 'accept'),
      ));

      const datesWithBabysitterSnaps = await getDocs(query(
        collection(db, 'Dates'),
        where('parent', '==', parentDocRef),
        where('babysitter', '==', babysitter),
      ));

      const shouldBeAvailableForDate = applicationsWithBabysitterSnaps.docs.length > datesWithBabysitterSnaps.docs;
      if (shouldBeAvailableForDate && !babysittersForDate.find(babysitterForDate => babysitterForDate.id === babysitter.id)) {
        const babysitterSnap = await getDoc(babysitter);
        babysittersForDate.push({ ...babysitterSnap.data(), id: babysitter.id });
      }
    }));

    sortData(nonHistoryDates, babysittersForDate);
  };

  const sortData = async (dates, babysitters) => {
    switch (datesSorting) {
      case 'Κατάσταση':
        dates.sort((dateA, dateB) => {
          return dateA.status - dateB.status;
        });
        break;
      case 'Αξιολόγηση (Φθίνουσα)':
        await Promise.all(dates.sort(async (dateA, dateB) => {
          const babysitterA = await getDoc(dateA.babysitter);
          const babysitterB = await getDoc(dateB.babysitter);

          return getAverageRating(babysitterB.data()) - getAverageRating(babysitterA.data());
        }));
        break;
      case 'Αξιολόγηση (Αύξουσα)':
        await Promise.all(dates.sort(async (dateA, dateB) => {
          const babysitterA = await getDoc(dateA.babysitter);
          const babysitterB = await getDoc(dateB.babysitter);

          return getAverageRating(babysitterA.data()) - getAverageRating(babysitterB.data());
        }));
        break;
    }

    switch (babysittersSorting) {
      case 'Αξιολόγηση (Φθίνουσα)':
        await Promise.all(dates.sort(async (babysitterA, babysitterB) => {

          return getAverageRating(babysitterB) - getAverageRating(babysitterA);
        }));
        break;
      case 'Αξιολόγηση (Αύξουσα)':
        await Promise.all(dates.sort(async (babysitterA, babysitterB) => {

          return getAverageRating(babysitterA) - getAverageRating(babysitterB);
        }));
        break;
    }

    setDates(dates);
    setBabysitters(babysitters);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    sortData(dates, babysitters);
  }, [datesSorting, babysittersSorting]);

  const datesByPage = useMemo(() => {
    return dates.slice(
      (datesCurrentPage-1)*datesPageSize,
      datesCurrentPage*datesPageSize
    );
  }, [datesCurrentPage, datesCurrentPage, dates]);

  const datesPages = useMemo(() => {
    return Math.ceil(dates.length / datesPageSize)
  }, [datesPageSize, dates]);

  const babsittersByPage = useMemo(() => {
    return babysitters.slice(
      (babysittersCurrentPage-1)*babysittersPageSize,
      babysittersCurrentPage*babysittersPageSize
    );
  }, [babysittersCurrentPage, babysittersPageSize, babysitters]);

  const babysittersPages = useMemo(() => {
    return Math.ceil(babysitters.length / babysittersPageSize)
  }, [babysittersPageSize, babysitters]);

  const setHistory = async () => {
    const historyDates = dates.filter(date => {
      return date.status == 'rejected';
    });

    await Promise.all(historyDates.map(async (historyDate) => {
      const historyDateDocRef = doc(db, 'Dates', historyDate.id);
      await setDoc(
        historyDateDocRef,
        {
          ...historyDate,
          isHistory: true,
        }
      );
    }));
  };

  const handleBabysitterDelete = (babysitterId) => {
    setBabysitters(babysitters.filter(babysitter => babysitter.id != babysitterId));
  };

  return (
    <div className={s.parent_dates_container}>
      {
        status != null && (
          <NotificationPopUp
            status={status === 'sent' ? 'success' : 'fail'}
            message={status === 'sent' ? 'Το Ραντεβού σας στάλθηκε επιτυχώς.' : 'Το Ραντεβού σας δεν στάλθηκε επιτυχώς.'}
            onClose={() => setStatus(null)}
          />
        )
      }
      <div className={s.breadcrumbs_container}>
        <Breadcrumbs
          breadcrumbItems={[
            { label: 'Αρχική Σελίδα', route: '' },
            { label: 'Ραντεβού Γνωριμίας', route: '.' },
          ]}
        />
      </div>
      <div className={s.parent_dates_main_content}>
        <h2>Τα ραντεβού μου</h2>

        <ListHeader
          listType='grid'
          title='Ραντεβού'
          listSize={dates.length}
          listElementName='Ραντεβού'
          pageSize={datesPageSize}
          sorting={datesSorting}
          sortingOptions={datesSortingOptions}
          onPageSizeChange={setDatesPageSize}
          onSortingChange={setDatesSorting}
        />

        <DateGridView
          dates={dates}
          onDateClick={onDateClick}
        />

        <Pagination
          pages={datesPages}
          currentPage={datesByPage}
          onChange={(newPage) => setDatesCurrentPage(newPage)}
          width='500px'
        />

        <ListHeader
          listType='grid'
          title='Κανονίστε Ραντεβού'
          listSize={babysitters.length}
          listElementName='Διαθέσιμες Νταντάδες'
          pageSize={babysittersPageSize}
          sorting={babysittersSorting}
          sortingOptions={babysittersSortingOptions}
          onPageSizeChange={setBabysittersPageSize}
          onSortingChange={setBabysittersSorting}
        />

        <BabysitterGridView
          babysitters={babsittersByPage}
          onBabysitterDelete={handleBabysitterDelete}
          onNavigate={setHistory}
        />

        <Pagination
          pages={babysittersPages}
          currentPage={babysittersCurrentPage}
          onChange={(newPage) => setBabysittersCurrentPage(newPage)}
          width='500px'
        />
      </div>
      {
        isDatePopupOpen && (
          <DatePopUp
            date={dateToDisplay}
            onClose={() => {
              setHistory();
              setDatePopupOpen(false);
              setDateToDisplay(null);
            }}
            onEdit={setHistory}
          />
        )
      }
    </div>
  );
};
 
export default ParentDates;