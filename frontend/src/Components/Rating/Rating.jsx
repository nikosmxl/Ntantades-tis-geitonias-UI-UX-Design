import React from 'react';
import trollProf from '../../Assets/Pictures/troll_prof.jpg';
import s from './RatingStyle.module.css';
import Stars from '../Stars/Stars';
import { useLocation, useNavigate } from 'react-router-dom';

const Rating = ({ rating }) => {

  const navigate = useNavigate();
  const location = useLocation();
  const context = location.pathname.split('/')[1];

  return (
    <div className={s.rating_container}>
      <div className={s.family_avatar_container}>
        <img
          src={trollProf}
          onClick={() => navigate(`/${context}/family-profile/1`)}
        />
      </div>

      <div className={s.rating_info_container}>
        <div className={s.rating_info}>
          <p>Ειρήνη Δαμάσκου</p>
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