import React from 'react';
import s from './BabysitterListingCardStyle.module.css';
import trollProf from '../../Assets/Pictures/troll_prof.jpg';
import Stars from '../Stars/Stars';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSuitcase, faLocationDot } from '@fortawesome/free-solid-svg-icons';

const BabysitterListingCard = ({ babysitterCard = {} }) => {



  return (
    <div
      className={s.babysitter_listing_card_container}
      onClick={() => console.log('will navigate to babysitter profile')}
    >
      <div className={s.babysitter_listing_card}>

        <div className={s.babysitter_listing_card_bio}>
          <div className={s.babysitter_listing_card_picture}>
            <img src={trollProf} alt="Profile"/>
            <p>40 ετών</p>
          </div>
          <div className={s.babysitter_listing_card_bio_content}>
            <h4>Ονοματεπώνυμο</h4>

            <div className={s.babysitter_listing_card_bio_rating}>
              <Stars rating={4.1} showRating={true}/>
              <p>•</p>
              <p>18 αξιολογήσεις</p>
            </div>

            <div className={s.babysitter_listing_card_bio_availability}>
              <p className={s.babysitter_listing_card_bio_availability_days}>Διαθεσιμότητα: Δευτέρα - Παρασκευή</p>
              <p className={s.babysitter_listing_card_bio_availability_current}>
                (<span className={s.available}>•</span> Άμεσα διαθέσιμος/η)
              </p>
            </div>

            <p>Είμαι υπεύθυνη, γλυκιά, και αποφάσισα να ασχοληθώ με τα παιδιά, λόγω της αγάπης που έχω για αυτά! Είμαι συνεπής, υπομονετική και ευδιάθετη. Όντας μάνα δύο παιδιών, κατasdasdadas</p>
          </div>
        </div>

        <div className={s.babysitter_listing_card_basic_info}>
          <div>
            <FontAwesomeIcon icon={faLocationDot} color='#5C5C5C'/>
            <p>Άγιος Κωνσταντίνος</p>
          </div>

          <div className={s.vertical_line}/>

          <div>
            <FontAwesomeIcon icon={faSuitcase} color='#5C5C5C'/>
            <p>10-15 Χρόνια</p>
          </div>

          <div className={s.vertical_line}/>

          <div>
            <p>Πλήρης απασχόληση</p>
          </div>
        </div>

      </div>
      <div className={s.babysitter_listing_card_last_rating}>
        <div className={s.babysitter_listing_card_last_rating_metadata}>
          <div>
            <p>Γιώργος</p>
            <p>•</p>
            <Stars rating={4.1} showRating={false}/>
          </div>
          <p>23/10/2024</p>
        </div>
        <p>Πολυ συνεργάσιμη και ευχάριστη κοπέλα! Μιλήσαμε στο τηλέφωνο, και θα συνεργαστούμε για τον 2χρονο γιο μου</p>
      </div>
    </div>
  );
};

export default BabysitterListingCard;