import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import s from './BabysitterDetailsStyle.module.css';
import trollProf from '../../../Assets/Pictures/troll_prof.jpg';
import Stars from '../../../Components/Stars/Stars';
import Reference from '../../../Components/Reference/Reference';
import Pagination from '../../../Components/Pagination/Pagination';
import Checkbox from '../../../Components/Checkbox/Checkbox';
import DateDropdowns from '../../../Components/DateDropdowns/DateDropdowns';
import Timetable from '../../../Components/Timetable/Timetable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import Rating from '../../../Components/Rating/Rating';
import CertificatesList from '../../../Components/CertificatesList/CertificatesList';
import Breadcrumbs from '../../../Components/Breadcrumbs/Breadcrumbs';

const BabysitterDetails = () => {
  const [isOptionsOpen, setOptionsOpen] = useState(true);
  const [ratingsPage, setRatingsPage] = useState(1);
  const [date, setDate] = useState({
    day: null,
    month: null,
    year: null,
  });
  const [certificates, setCertificates] = useState([{name:'test'}, {name:'test'}]);
  const [ratings, setRatings] = useState([]);
  const { babysitterId } = useParams();
  const [babysitter, setBabysitter] = useState({
    educationLevel: 'Τίτλοι ανώτατης Εκπαίδευσης',
    specialty: 'Διαδικτυακή εκπαίδευση',
    references: [{},{},],
    availability: [],
    name: 'Μαρία',
    surname: 'Οικονόμου',
  });
  const babysitterHasActiveListing = true;

  return (
    <div>
      <div className={s.breadcrumbs}>
        <Breadcrumbs
          breadcrumbItems={[
            { label: 'Αρχική Σελίδα', route: ''},
            { label: 'Βρείτε νταντά', route: 'babysitter-search'},
            { label: `${babysitter?.name} ${babysitter?.surname}`, route: '.'},
          ]}
        />
      </div>
      <div className={s.babysitter_details_main_content}>
        <div className={s.babysitter_details_top_container}>
          <div className={s.babysitter_details_left_sidebar}>
            <img src={trollProf} className={s.profile_pic}/>
            <div className={s.babysitter_details_rating}>
              <Stars rating={4.1} showRating={true} color={'#E9BA00'}/>
              <p>•</p>
              <p>18 αξιολογήσεις</p>
            </div>
            {
              babysitterHasActiveListing && (
                <div>
                  <h3>Προσωπικά στοιχεία</h3>
                  <hr />
                  <div className={s.babysitter_details_personal_info}>
                    <div className={s.personal_info_content}>
                      <p className={s.info_label}>Φύλο:</p>
                      <p>Γυναίκα</p>
                    </div>
                    <div className={s.personal_info_content}>
                      <p className={s.info_label}>Ηλικία:</p>
                      <p>27</p>
                    </div>
                    <div className={s.personal_info_content}>
                      <p className={s.info_label}>Εθνικότητα:</p>
                      <p>Ελληνική</p>
                    </div>
                    <div className={s.personal_info_content}>
                      <p className={s.info_label}>Μητρική Γλώσσα:</p>
                      <p>Ελληνικά</p>
                    </div>
                  </div>
                </div>
              )
            }
          </div>

          <div className={s.babysitter_details_top_container_main}>
            <div className={s.babysitter_details_top_bar}>
              <h2>Ονοματεπώνυμο</h2>
              <div
                className={s.babysitter_details_options_button}
                onClick={() => setOptionsOpen(!isOptionsOpen)}
              >
                <FontAwesomeIcon icon={faEllipsis} />
              </div>
            </div>
            <hr />
            {
              babysitterHasActiveListing ? (
                <>
                  <p>Λίγα λόγια:</p>
                  <textarea
                    disabled
                    value='Είμαι ευγενική, υπομονετική, σεβαστική και πολύ αγαπημένη με τα παιδιά! Μου αρέσει αυτό που κάνω για αυτό το κάνω με όρεξη και μεράκι. Σπούδασα στο Πανεπιστήμιο της Πάτρας Βρεφονηπειοκόμος και έχω κάνει και ενα μεταπτυχιακό με τίτλο “Επιστήμες της Αγωγής”, μαζί με σεμινάρια σύνολο 900 ωρών. Θα χαρώ πολύ να συνεργαστούμε και να μπορέσω να φανώ χρήσιμη και να προσφέρω!'
                  />
                </>
              )
              : (
                <div className={s.personal_info_no_active_listing}>
                  <div className={s.babysitter_details_personal_info}>
                    <div className={s.personal_info_content}>
                      <p className={s.info_label}>Φύλο:</p>
                      <p>Γυναίκα</p>
                    </div>
                    <div className={s.personal_info_content}>
                      <p className={s.info_label}>Ηλικία:</p>
                      <p>27</p>
                    </div>
                    <div className={s.personal_info_content}>
                      <p className={s.info_label}>Εθνικότητα:</p>
                      <p>Ελληνική</p>
                    </div>
                    <div className={s.personal_info_content}>
                      <p className={s.info_label}>Μητρική Γλώσσα:</p>
                      <p>Ελληνικά</p>
                    </div>
                  </div>
                </div>
              )
            }
          </div>
        </div>

        <div className={s.babysitter_details_section_container}>
          <h3>Πληροφορίες</h3>
          <hr />
          <div className={s.babysitter_details_general_info}>
              <p>Περιοχή Απασχόλησης :</p>
              <p>Καλλιθέα</p>
              <p>Γνώσεις Ξένων Γλωσσών :</p>
              <p>Αγγλικά, Γαλλικά</p>
              <p>Μετακίνηση παιδιών :</p>
              <p>Με Ι.Χ. Οικογένειας</p>
          </div>
        </div>

        <div className={s.babysitter_details_section_container}>
          <h3>Εκπαίδευση</h3>
          <hr />
          <div className={s.babysitter_details_education}>
            <h3>Επίπεδο Σπουδών :</h3>
            <div className={s.babysitter_details_education_field}>
              <p>Δευτεροβάθμια Εκπαίδευση</p>
            </div>
            <h3>Ειδικότητα :</h3>
            <div className={s.babysitter_details_education_field}>
              <p>Πτυχίο ΕΠΑΛ της ειδικότητας «Βοηθός Βρεφονηπιοκόμων» επίπεδο 4 ΕΠΠ ή ισότιμος τίτλος</p>
            </div>
          </div>
          <div className={s.babysitter_details_certification_container}>
            <CertificatesList
              certificates={certificates}
              isEditable={false}
            />
          </div>
        </div>

        <div className={s.babysitter_details_section_container}>
          <h3>Εμπειρία</h3>
          <hr />
          <div className={s.babysitter_details_experience}>
            <p><span>Προϋπηρεσία:</span> 3 έτη</p>
            <div>
              <p><span>Εμπειρία με παιδιά ηλικίας:</span></p>
              <ul>
                <li><p>6 - 12 μηνών</p></li>
                <li><p>1 - 2 ετών</p></li>
              </ul>
            </div>
            <div>
              <p><span>Ειδίκευση σε:</span></p>
              <ul>
                <li><p>ΑμεΑ</p></li>
              </ul>
            </div>
          </div>
        </div>

        {
          babysitterHasActiveListing && (
            <div className={s.babysitter_details_section_container}>
              <h3>Υπηρεσίες</h3>
              <hr />
              <div className={s.babysitter_details_services}>
                <ul>
                  <li><p>Μαγείρεμα</p></li>
                  <li><p>Καθαρισμός Σπιτιού</p></li>
                  <li><p>Βοήθεια με Μαθήματα</p></li>
                  <li><p>Δραστηριότητες Εξωτερικού Χώρου</p></li>
                </ul>
              </div>
            </div>
          )
        }

        {
          babysitterHasActiveListing && (

            <div className={s.babysitter_details_section_container}>
              <h3>Διαθεσιμότητα</h3>
              <hr />
              <div className={s.babysitter_details_availability}>
                <div className={s.occupation_type}>
                  <p>Τύπος Απασχόλησης:</p>
                  <Checkbox
                    name='partTime'
                    label='Μερική'
                    isChecked={true}
                    onChange={() => {}}
                    isEnabled={false}
                    width='20px'
                    height='20px'
                  />
                  <Checkbox
                    name='fullTime'
                    label='Πλήρης'
                    isChecked={false}
                    onChange={() => {}}
                    isEnabled={false}
                    width='20px'
                    height='20px'
                  />
                </div>
                <div className={s.babysitter_availability_date_container}>
                  <Checkbox
                    name='availableNow'
                    label='Άμεσα διαθέσιμος/η'
                    isChecked={true}
                    onChange={() => {}}
                    isEnabled={false}
                    width='20px'
                    height='20px'
                  />
                  <Checkbox
                    name='availableFrom'
                    label='Διαθέσιμος/η από :'
                    isChecked={false}
                    onChange={() => {}}
                    isEnabled={false}
                    width='20px'
                    height='20px'
                  />
                  <div>
                    {
                      false && (
                        <DateDropdowns
                          isEnabled={false}
                        />
                      )
                    }
                  </div>
                  <Checkbox
                    name='availabilityUndefined'
                    label='Αόριστη Συνεργασία'
                    isChecked={false}
                    onChange={() => {}}
                    isEnabled={false}
                    width='20px'
                    height='20px'
                  />
                  <Checkbox
                    name='availableTo'
                    label='Διαθέσιμος/η έως :'
                    isChecked={true}
                    onChange={() => {}}
                    isEnabled={false}
                    width='20px'
                    height='20px'
                  />
                  <div>
                    {
                      true && (
                        <DateDropdowns
                          isEnabled={true}
                          day={date.day}
                          month={date.month}
                          year={date.year}
                          onChange={(newDate) => setDate(newDate)}
                        />
                      )
                    }
                  </div>
                </div>
                <Timetable
                  width='414px'
                  height='330px'
                  isEnabled={false}
                />
              </div>
            </div>
          )
        }

        <div className={s.babysitter_details_section_container}>
          <h3>Συστατικές Επιστολές</h3>
          <hr />
          <div className={s.babysitter_details_references_container}>
            <Reference />
            <Reference />
            <Reference />
          </div>
        </div>

        <div className={s.babysitter_details_section_container}>
          <h3>Αξιολογήσεις</h3>
          <hr />
          <div className={s.babysitter_ratings_container}>

            <div className={s.babysitter_ratings_list}>
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
              pages={3}
              currentPage={ratingsPage}
              onChange={setRatingsPage}
              width={'500px'}
            />
          </div>
        </div>

      </div>
    </div>
  );
}
 
export default BabysitterDetails;