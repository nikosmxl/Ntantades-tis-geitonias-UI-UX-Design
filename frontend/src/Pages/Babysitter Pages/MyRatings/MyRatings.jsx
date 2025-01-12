import React, { useMemo, useState } from 'react';
import s from './MyRatingsStyle.module.css';
import ListHeader from '../../../Components/ListHeader/ListHeader';
import Rating from '../../../Components/Rating/Rating';
import Pagination from '../../../Components/Pagination/Pagination';
import Filters from './Filters/Filters';
import trollProf from '../../../Assets/Pictures/troll_prof.jpg';
import Stars from '../../../Components/Stars/Stars';

const MyRatings = ({}) => {
  const [ratings, setRatings] = useState([
    { rating: 4 },
    { rating: 4 },
    { rating: 3, text: 'Πολύ καλή γυναίκα και εξυπηρετική! Συνεργαστήκαμε για ενα 6μηνο, έμεινα ικανοποιημένη και θα ξανασυνεργαζόμουν!' },
  ]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [sorting, setSorting] = useState('Πιο πρόσφατη');
  const [filters, setFilters] = useState({});

  const averageRating = useMemo(
    () => parseInt(ratings.reduce((accumulator, rating) => (rating.rating + accumulator), 0)) / parseInt(ratings.length),
    [],
  );

  return (
    <div className={s.my_ratings_page}>
      <div className={s.breadcrumbs}>
        <p>Αρχική</p>
        <p>{">"}</p>
        <p>Οι αξιολογήσεις μου</p>
      </div>
      <div className={s.my_ratings_main_content}>
        <div className={s.ratings_sidebar}>
          <img src={trollProf} alt='Profile picture' />
          <Stars
            rating={averageRating}
            showRating={true}
            color='#E9BA00'
          />
          <Filters
            filters={filters}
            onFilterChange={setFilters}
          />
        </div>

        <div className={s.ratings_list_with_header}>
          <ListHeader
            listElementName='Αξιολογήσεις'
            listSize={ratings.length}
            pageSize={pageSize}
            sorting={sorting}
            sortingOptions={['Πιο πρόσφατη', 'Παλαιότερη', 'Αύξουσα βαθμολογία', 'Φθίνουσα βαθμολογία']}
            onPageSizeChange={setPageSize}
            onSortingChange={setSorting}
            title='Οι Αξιολογήσεις μου'
          />

          <div className={s.ratings_list}>
          {
            ratings.map(rating => {
              return (
                <Rating
                  key={rating}
                  rating={rating}
                />
              );
            })
          }
          </div>

          <Pagination
            pages={Math.ceil(parseInt(ratings.length) / parseInt(pageSize))}
            currentPage={page}
            onChange={setPage}
            width='501px'
          />
        </div>
      </div>
    </div>
  );
}
 
export default MyRatings;