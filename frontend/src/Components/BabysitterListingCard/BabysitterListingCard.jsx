import React, { useState, useEffect, useMemo } from 'react';
import s from './BabysitterListingCardStyle.module.css';
import Stars from '../Stars/Stars';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSuitcase, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { getDoc } from 'firebase/firestore';
import { getDateFromSeconds, getFormattedDate } from '../../utils/date';
import { getAverageRating } from '../../utils/calc';


const BabysitterListingCard = ({ listing }) => {
  const [babysitter, setBabysitter] = useState({});
  const [ratingParent, setRatingParent] = useState({});

  const navigate = useNavigate();
  const location = useLocation();
  const context = location.pathname.split('/')[1];
  
  const fetchData = async () => {
    setBabysitter(listing.babysitter);

    const ratingParentSnap = await getDoc(listing.babysitter.ratings[0].parent);

    const fetchedRatingParentData = ratingParentSnap.data();
    setRatingParent({...fetchedRatingParentData, id: listing.babysitter.ratings[0].parent.id});
  };

  useEffect(() => {
    fetchData();
  }, []);

  const averageRating = useMemo(() => {
    const avg = getAverageRating(babysitter);
    return avg;
  }, [babysitter]);

  const availableDays = useMemo(() => {
    const days = ['Δευτέρα', 'Τρίτη', 'Τετάρτη', 'Πέμπτη', 'Παρασκευή', 'Σάββατο', 'Κυριακή'];
    const foundDays = {};

    days.forEach((day, idx) => {
      const timeslotForDay = listing.availability.find(timeslot => timeslot.dayIndex === idx);
      if (timeslotForDay) foundDays[idx] = day;
    });

    const sets = Object.keys(foundDays).reduce((accumulator, dayIdx) => {
      if (accumulator.length === 0) {
        return [[0]];
      }

      const lastSet = accumulator[accumulator.length - 1];
      const lastIndexOfLastSet = lastSet[lastSet.length - 1];
      if (parseInt(dayIdx) === lastIndexOfLastSet + 1) {
        accumulator[accumulator.length - 1].push(parseInt(dayIdx));
        return accumulator;
      }

      accumulator.push([parseInt(dayIdx)]);
      return accumulator;
    }, []);

    const filteredSets = sets.map(set => {
      return set.filter((_, index) => {
        return index === 0 || index === set.length-1
      }).map(dayIdx => days[dayIdx]);
    });

    return filteredSets.map(set => set.join('-')).join(', ');
  }, listing.availability);

  return (
    <div
      className={s.babysitter_listing_card_container}
      onClick={() => navigate(context === 'parent' ? `../babysitter-details/${babysitter?.id}` : '../signup', {relative: 'path'})}
    >
      <div className={s.babysitter_listing_card}>

        <div className={s.babysitter_listing_card_bio}>
          <div className={s.babysitter_listing_card_picture}>
            <img src={babysitter?.profilePicture} alt="Profile"/>
            <p>{babysitter?.age} ετών</p>
          </div>
          <div className={s.babysitter_listing_card_bio_content}>
            <h4>{babysitter?.name} {babysitter?.surname}</h4>

            <div className={s.babysitter_listing_card_bio_rating}>
              <Stars rating={averageRating} showRating={true} color={'#E9BA00'}/>
              <p>•</p>
              <p>{(babysitter?.ratings ?? []).length} αξιολογήσεις</p>
            </div>

            <div className={s.babysitter_listing_card_bio_availability}>
              <p className={s.babysitter_listing_card_bio_availability_days}>Διαθεσιμότητα: {availableDays}</p>
              {
                listing?.startingDate === 'Anytime' && (
                  <p className={s.babysitter_listing_card_bio_availability_current}>
                    (<span className={s.available}>•</span> Άμεσα διαθέσιμος/η)
                  </p>
                )
              }
              {
                listing?.startingDate && listing.startingDate !== 'Anytime' && (
                  <p className={s.babysitter_listing_card_bio_availability_current}>
                    (<span className={s.available}>•</span> Διαθέσιμος/η από {listing.startingDate.day}/{listing.startingDate.month}/{listing.startingDate.year})
                  </p>
                )
              }
            </div>

            <p>{listing.fewWords}</p>
          </div>
        </div>

        <div className={s.babysitter_listing_card_basic_info}>
          <div>
            <FontAwesomeIcon icon={faLocationDot} color='#5C5C5C'/>
            <p>{babysitter?.area}</p>
          </div>

          <div className={s.vertical_line}/>

          <div>
            <FontAwesomeIcon icon={faSuitcase} color='#5C5C5C'/>
            <p>{babysitter?.experience}</p>
          </div>

          <div className={s.vertical_line}/>

          <div>
            <p>{listing.workingHours}</p>
          </div>
        </div>

      </div>
      <div className={s.babysitter_listing_card_last_rating}>
        <div className={s.babysitter_listing_card_last_rating_metadata}>
          <div>
            <p>{ratingParent?.name}</p>
            <p>•</p>
            <Stars rating={(babysitter?.ratings ?? [{}])[0]?.rating ?? 0} showRating={false} color={'#E9BA00'}/>
          </div>
          <p>{getFormattedDate(getDateFromSeconds((babysitter?.ratings ?? [{}])[0]?.date?.seconds ?? 0))}</p>
        </div>
        <p>{(babysitter?.ratings ?? [{}])[0]?.text}</p>
      </div>
    </div>
  );
};

export default BabysitterListingCard;