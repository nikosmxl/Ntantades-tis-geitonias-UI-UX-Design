import React, { useState } from 'react';
import s from './BabysitterDatesStyle.module.css';
import ListHeader from '../../../Components/ListHeader/ListHeader';
import Pagination from '../../../Components/Pagination/Pagination';
import DateGridView from '../../../Components/DateGridView/DateGridView';
import DatePopUp from '../../../PopUps/DatePopUp/DatePopUp';
import Breadcrumbs from '../../../Components/Breadcrumbs/Breadcrumbs';

const BabysitterDates = ({}) => {
    const [isDatePopupOpen, setDatePopupOpen] = useState(false);
    const[dateToDisplay, setDateToDisplay] = useState(null);
    const[page, setPage] = useState(1);
    const [dates, setDates] = useState([
        { status: 'responded', place: 'online' },
        { status: 'scheduled', place: 'inPerson' },
        { status: 'scheduled', place: 'online' },
        { status: 'pending', place: 'inPerson' },
        { status: 'pending', place: 'online' },
        { status: 'rejected', place: 'inPerson' },
        { status: 'completed', place: 'online' },
        { status: 'completed', place: 'inPerson' },
    ]);
    const [babysitters, setBabysitters] = useState([
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 4 },
        { id: 5 },
    ]);

    const onDateClick = (date) => {
        setDatePopupOpen(true);
        setDateToDisplay(date);
    };

    return (
        <div className='s.babysitter_dates_container'>
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
                pageSize={8}
                sorting={'Αξιολόγηση (Φθίνουσα)'}
                sortingOptions={['Αξιολόγηση (Φθίνουσα)', 'Αξιολόγηση (Αύξουσα)']}
                onPageSizeChange={() => {}}
                onSortingChange={() => {}}
                />
            
                <DateGridView
                    dates={dates}
                    onDateClick={onDateClick}
                />

                <Pagination 
                    pages={1}
                    currentPage={page}
                    onChange={(newPage) => setPage(newPage)}
                    width='500px'                            
                />                
            </div>

            {isDatePopupOpen && (
                <DatePopUp
                    date={dateToDisplay}
                    onClose={ () => {
                        setDatePopupOpen(false);
                        setDateToDisplay(null);
                    }}
                />
            )}
        </div>
    );
};

export default BabysitterDates;