import React from 'react';
import trollProf from '../../Assets/Pictures/troll_prof.jpg';
import s from './RatingStyle.module.css';
import Stars from '../Stars/Stars';
import { useNavigate } from 'react-router-dom';

const Rating = ({ rating }) => {
  const hasText = false;

  const navigate = useNavigate();
  

  return (
    <div className={s.rating_container}>
      <div className={s.family_avatar_container}>
        <img
          src={trollProf}
          onClick={() => navigate('../family-profile/1', {path: '..'})}
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