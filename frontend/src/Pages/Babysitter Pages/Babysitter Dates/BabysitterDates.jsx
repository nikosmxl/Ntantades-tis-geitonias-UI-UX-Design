import React, { useState, useMemo, useEffect } from 'react';
import s from './BabysitterDatesStyle.module.css';
import ListHeader from '../../../Components/ListHeader/ListHeader';
import Pagination from '../../../Components/Pagination/Pagination';
import DateGridView from '../../../Components/DateGridView/DateGridView';
import DatePopUp from '../../../PopUps/DatePopUp/DatePopUp';
import Breadcrumbs from '../../../Components/Breadcrumbs/Breadcrumbs';
import { useLocation } from 'react-router-dom';
import { getAverageRating } from '../../../utils/calc';
import { doc, getDoc, getDocs, collection, query, where, setDoc } from 'firebase/firestore';
import { db } from '../../../firebase';
import NotificationPopUp from '../../../PopUps/NotificationPopUp/NotificationPopUp';

const BabysitterDates = ({}) => {
    const location = useLocation();

    const [dates, setDates] = useState([]);
    const [datesPageSize, setDatesPageSize] = useState(8);
    const [datesSorting, setDatesSorting] = useState('Κατάσταση');
    const datesSortingOptions = ['Κατάσταση'];
    const [datesCurrentPage, setDatesCurrentPage] = useState(1);

    const [status, setStatus] = useState(location?.state?.status ?? null);
    const [isDatePopupOpen, setDatePopupOpen] = useState(false);
    const [dateToDisplay, setDateToDisplay] = useState(null);

    const babysitterId = useMemo(() => JSON.parse(localStorage.getItem('user'))['id'], []);

    const onDateClick = (date) => {
        setDatePopupOpen(true);
        setDateToDisplay(date);
    };
    
    const fetchData = async () => {
      const babysitterDocRef = doc(db, 'Users', babysitterId);
      const dq = query(
        collection(db, 'Dates'),
        where("babysitter", "==", babysitterDocRef),
      );
      const dateSnaps = await getDocs(dq);
      const nonHistoryDates = dateSnaps.docs.map(dateSnap => ({ ...dateSnap.data(), id: dateSnap.id })).filter(date => !date?.isHistory);

      sortData(nonHistoryDates);
      await setHistory(nonHistoryDates);
    };
    
    const sortData = async (dates) => {
      dates.sort((dateA, dateB) => {
        return dateA.status - dateB.status;
      });

      setDates(dates);
    };
  
    useEffect(() => {
      fetchData();
    }, []);
  
    useEffect(() => {
      sortData(dates);
    }, [datesSorting]);
    
    const datesByPage = useMemo(() => {
      return dates.slice(
        (datesCurrentPage-1)*datesPageSize,
        datesCurrentPage*datesPageSize
      );
    }, [datesCurrentPage, datesCurrentPage, dates]);
  
    const datesPages = useMemo(() => {
      return Math.ceil(dates.length / datesPageSize)
    }, [datesPageSize, dates]);
    
    const setHistory = async (allDates) => {
      const historyDates = allDates.filter(date => {
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

    return (
        <div className='s.babysitter_dates_container'>
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
            <div className={s.babysitter_dates_main_content}>
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
            </div>

            {isDatePopupOpen && (
                <DatePopUp
                    date={dateToDisplay}
                    onClose={() => {
                      setDatePopupOpen(false);
                      setDateToDisplay(null);
                    }}
                />
            )}
        </div>
    );
};

export default BabysitterDates;