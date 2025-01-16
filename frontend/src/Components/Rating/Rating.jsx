import React, { useEffect, useState } from 'react';
import s from './RatingStyle.module.css';
import Stars from '../Stars/Stars';
import { useLocation, useNavigate } from 'react-router-dom';
import { getDoc } from 'firebase/firestore';

const Rating = ({ rating }) => {
  const [parent, setParent] = useState({});

  const navigate = useNavigate();
  const location = useLocation();
  const context = location.pathname.split('/')[1];

  const fetchData = async () => {
    const parentSnap = await getDoc(rating.parent);

    const fetchedData = parentSnap.data();
    setParent(fetchedData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={s.rating_container}>
      <div className={s.family_avatar_container}>
        <img
          src={parent?.profilePicture}
          onClick={() => context === 'parent' ? {} : navigate(`/${context}/parent-details/1`)}
        />
      </div>

      <div className={s.rating_info_container}>
        <div className={s.rating_info}>
          <p>{parent?.name} {parent?.surname}</p>
          <div className={s.rating_stars_container}>
            <p>Βαθμολογία :</p>
            <Stars
              rating={rating.rating}
              color='#E9BA00'
            />
          </div>
        </div>
        {
          rating.text != null && (
            <textarea
              disabled
              value={rating.text}
            />
          )
        }
      </div>

      <div className={s.rating_date_container}>
        <p>13/12/2023</p>
      </div>
    </div>
  );
}
 
export default Rating;