import React, { useEffect, useMemo, useState } from 'react';
import s from './MyRatingsStyle.module.css';
import ListHeader from '../../../Components/ListHeader/ListHeader';
import Rating from '../../../Components/Rating/Rating';
import Pagination from '../../../Components/Pagination/Pagination';
import Filters from './Filters/Filters';
import trollProf from '../../../Assets/Pictures/troll_prof.jpg';
import Stars from '../../../Components/Stars/Stars';
import Breadcrumbs from '../../../Components/Breadcrumbs/Breadcrumbs';
import { db } from '../../../firebase';
import { getDoc, doc } from 'firebase/firestore';
import { getAverageRating } from '../../../utils/calc';

const MyRatings = ({}) => {
  const [babysitter, setBabysitter] = useState({});
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [sorting, setSorting] = useState('Πιο πρόσφατη');
  const [filters, setFilters] = useState({});

  const babysitterId = useMemo(() => JSON.parse(localStorage.getItem('user'))['id'], []);

  const fetchData = async () => {
    const babysitterDocRef = doc(db, 'Users', babysitterId);
    const babysitterSnap = await getDoc(babysitterDocRef);

    const fetchedData = babysitterSnap.data();
    setBabysitter(fetchedData);
  };
  
  useEffect(() => {
    fetchData();
  }, []);

  const averageRating = useMemo(() => {
    const avg = getAverageRating(babysitter);
    return avg;
  }, [babysitter]);

  return (
    <div className={s.my_ratings_page}>
      <div className={s.breadcrumbs}>
        <Breadcrumbs
          breadcrumbItems={[
            { label: 'Αρχική Σελίδα', route: ''},
            { label: 'Οι αξιολογήσεις μου', route: '.'},
          ]}
        />
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
            listSize={(babysitter?.ratings ?? []).length}
            pageSize={pageSize}
            sorting={sorting}
            sortingOptions={['Πιο πρόσφατη', 'Παλαιότερη', 'Αύξουσα βαθμολογία', 'Φθίνουσα βαθμολογία']}
            onPageSizeChange={setPageSize}
            onSortingChange={setSorting}
            title='Οι Αξιολογήσεις μου'
          />

          <div className={s.ratings_list}>
          {
            (babysitter?.ratings ?? []).map(rating => {
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
            pages={Math.ceil(parseInt((babysitter?.ratings ?? []).length) / parseInt(pageSize))}
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