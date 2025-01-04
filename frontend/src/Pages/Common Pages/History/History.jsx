import React from 'react';
import s from './HistoryStyle.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const History = ({}) => {
  const navigate = useNavigate();

  const handleNavigateToPartnerships = () => {
    navigate('../history/partnerships');
  };

  const handleNavigateToApplications = () => {
    navigate('../history/applications');
  };

  const handleNavigateToPayments = () => {
    navigate('../history/payments');
  };

  const handleNavigateToListings = () => {
    navigate('../history/listings');
  };

  return (
    <div className={s.history_container}>
      <div className={s.breadcrumbs_container}>
        Αρχική Σελίδα > Ιστορικό
      </div>
      <div className={s.history_main_content}>
        <h2>Ιστορικό</h2>
        <hr />
        <div className={s.history_categories}>
          <div className={s.history_category}>
            <h2 onClick={handleNavigateToPartnerships}>Ιστορικό Συνεργασιών</h2>
            <FontAwesomeIcon
              icon={faUpRightFromSquare}
              fontSize={'20px'}
              cursor={'pointer'}
              onClick={handleNavigateToPartnerships}
            />
          </div>
          <div className={s.history_category}>
            <h2 onClick={handleNavigateToApplications}>Ιστορικό Αιτήσεων</h2>
            <FontAwesomeIcon 
              icon={faUpRightFromSquare}
              fontSize={'20px'}
              cursor={'pointer'}
              onClick={handleNavigateToApplications}
            />
          </div>
          <div className={s.history_category}>
            <h2 onClick={handleNavigateToPayments}>Ιστορικό Πληρωμών</h2>
            <FontAwesomeIcon
              icon={faUpRightFromSquare}
              fontSize={'20px'}
              cursor={'pointer'}
              onClick={handleNavigateToPayments}
            />
          </div>
          {
            false && (
              <div className={s.history_category}>
                <h2 onClick={handleNavigateToListings}>Ιστορικό Αγγελιών</h2>
                <FontAwesomeIcon
                  icon={faUpRightFromSquare}
                  fontSize={'20px'}
                  cursor={'pointer'}
                  onClick={handleNavigateToListings}
                />
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
};
 
export default History;