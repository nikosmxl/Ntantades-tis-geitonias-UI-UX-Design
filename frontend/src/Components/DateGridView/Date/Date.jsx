import React, { useEffect, useMemo, useState } from 'react';
import trollProf from '../../../Assets/Pictures/troll_prof.jpg';
import s from './DateStyle.module.css';
import { useNavigate } from 'react-router-dom';
import { getDoc } from 'firebase/firestore';
import { times } from '../../../utils/options';

const Date = ({ date, onClick }) => {
  const userRole = useMemo(() => JSON.parse(localStorage.getItem('user'))['role'], []);
  const [babysitter, setBabysitter] = useState({});
  const [parent, setParent] = useState({});
  const navigate = useNavigate();

  const fetchData = async () => {
    const babysitterSnap = await getDoc(date.babysitter);
    const parentSnap = await getDoc(date.parent);

    setBabysitter({...babysitterSnap.data(), id: babysitterSnap.id});
    setParent({...parentSnap.data(), id: parentSnap.id});
  };

  useEffect(() => {
    fetchData()
  }, [userRole, date]);

  const handleUserClick = () => {
    if (userRole === 'babysitter') return navigate(`/babysitter/parent-details/${parent.id}`);

    navigate(`/parent/babysitter-details/${babysitter.id}`);
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
    const sentBy = date.sentBy;
    let className = null;

    switch (dateStatus) {
      case 'scheduled':
        className = s.date_container_scheduled;
        break;
      case 'pending':
        if (sentBy !== userRole) className = s.date_container_responded;
        else className = s.date_container_pending;
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
    const sentBy = date.sentBy;
    let className = null;
    let label = null;

    switch (dateStatus) {
      case 'scheduled':
        label = 'Περισσότερα';
        className = s.date_action_button_scheduled;
        break;
      case 'pending':
        if (sentBy !== userRole) {
          label = 'Απάντηση';
          className = s.date_action_button_responded;
        } else {
          label = 'Εκκρεμεί';
          className = s.date_action_button_pending;
        }
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
      <p>{userRole === 'parent' ? `${babysitter?.name} ${babysitter?.surname}` : `${parent?.name} ${parent?.surname}`}</p>
      <div className={s.date_info_container}>
        <p>Τοποθεσία:</p>
        <p>{date?.address}</p>
        <p>Ημερομηνία:</p>
        <p>{date?.scheduledDate}</p>
        <p>Ώρα:</p>
        <p>{times[date?.selectedTimeslot?.time ?? 0]}</p>
      </div>

      { getButtonBasedOnStatus() }
    </div>
  );
}
 
export default Date;