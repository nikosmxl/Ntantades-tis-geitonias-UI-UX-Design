import React from 'react';
import trollProf from '../../../Assets/Pictures/troll_prof.jpg';
import s from './DateStyle.module.css';
import { useNavigate } from 'react-router-dom';

const Date = ({ date, onClick }) => {
  const userRole = date?.user?.role ?? 'parent';

  const navigate = useNavigate();

  const handleUserClick = () => {
    if (userRole === 'parent') return navigate('/babysitter/family-profile/1');

    navigate('/parent/babysitter-details/1');
  };

  const handleAction = () => {
    const dateStatus = date.status;

    switch (dateStatus) {
      case 'rejected':
        break;
      case 'completed':
        // navigate to partnership or partnerships
        break;
      default:
        onClick(date);
        break;
    }
  };

  const getContainerClassName = () => {
    const dateStatus = date.status;
    let className = null;

    switch (dateStatus) {
      case 'responded':
        className = s.date_container_responded;
        break;
      case 'scheduled':
        className = s.date_container_scheduled;
        break;
      case 'pending':
        className = s.date_container_pending;
        break;
      case 'rejected':
        className = s.date_container_rejected;
        break;
      case 'completed':
        className = s.date_container_completed;
        break;
    }

    return className;
  };


  const getButtonBasedOnStatus = () => {
    const dateStatus = date.status;
    let className = null;
    let label = null;

    switch (dateStatus) {
      case 'responded':
        label = 'Απάντηση';
        className = s.date_action_button_responded;
        break;
      case 'scheduled':
        label = 'Περισσότερα';
        className = s.date_action_button_scheduled;
        break;
      case 'pending':
        label = 'Εκκρεμεί';
        className = s.date_action_button_pending;
        break;
      case 'rejected':
        label = 'Απορρίφθηκε';
        className = s.date_action_button_rejected;
        break;
      case 'completed':
        label = 'Συνεργάσου';
        className = s.date_action_button_completed;
        break;
    }

    return (
      <button
        className={className}
        onClick={handleAction}
      >
        {label}
      </button>
    );
  };

  return (
    <div className={getContainerClassName()}>
      {
        date.status === 'responded' && (
          <div className={s.date_responded_indicator}/>
        )
      }
      <img
        src={trollProf}
        onClick={handleUserClick}
      />
      <p>Ονοματεπώνυμο</p>
      <div className={s.date_info_container}>
        <p>Τοποθεσία:</p>
        <p>Καλλιθέα</p>
        <p>Ημερομηνία:</p>
        <p>23/10/24</p>
        <p>Ώρα:</p>
        <p>16:20</p>
      </div>

      { getButtonBasedOnStatus() }
    </div>
  );
}
 
export default Date;