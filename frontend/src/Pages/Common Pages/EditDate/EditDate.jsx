import React, { useState } from 'react';
import s from './EditDateStyle.module.css';
import trollProf from '../../../Assets/Pictures/troll_prof.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import Select from 'react-select';
import AvailabilityCalendar from '../../../Components/AvailabilityCalendar/AvailabilityCalendar';
import ConfirmationPopUp from '../../../PopUps/ConfirmationPopUp/ConfirmationPopUp';
import { useNavigate, useParams } from 'react-router-dom';

const EditDate = () => {
  const labelHelper = {
    'online': 'Διαδικτυακά',
    'inPerson': 'Δια ζώσης',
    'zoom': 'Zoom',
    'googleMeet': 'Google Meet',
    'skype': 'Skype',
  };
  const [place, setPlace] = useState('online');
  const [address, setAddress] = useState(null);
  const [comments, setComments] = useState('');
  const [isConfirmPopupOpen, setConfirmPopupOpen] = useState(false);
  const [isCancelPopupOpen, setCancelPopupOpen] = useState(false);

  const navigate = useNavigate();

  const params = useParams();

  const handleChangePlace = (selectedOption) => {
    setPlace(selectedOption.value);
    setAddress(null);
  };

  const handleCancelChanges = () => {
    navigate('../dates', {path: '..'});
  };

  const handleConfirmChanges = () => {
    // api call to save changes
    navigate('../dates', {path: '..'});
  };

  return (
    <div className={s.edit_date_container}>
      <div className={s.breadcrumbs_container}>
        Αρχική Σελίδα > Ραντεβού Γνωριμίας > Επεξεργασία Ραντεβού
      </div>
      <div className={s.edit_date_main_content}>
        <h2>Επεξεργασία Ραντεβού</h2>
        <p className={s.mandatory_fields_info}>Τα πεδία με αστερίσκο (*) είναι υποχρεωτικά.</p>
        <hr />
        <div className={s.date_info_container}>
          <div className={s.date_info_user_avatar_container}>
            <img
              src={trollProf}
              className={s.date_info_user_avatar}
              alt='Profile'
            />
            <h3>Ονοματεπώνυμο</h3>
          </div>
          <div className={s.date_info}>
            <h3>Στοιχεία Ραντεβού</h3>
            <div className={s.date_details_flex}>
              <p>Μέσο*:</p>
              <Select
                defaultValue={{ value: place, label: labelHelper[place] }}
                options={[
                  { value: 'online', label: labelHelper['online'] },
                  { value: 'inPerson', label: labelHelper['inPerson'] },
                ]}
                onChange={handleChangePlace}
              />
            </div>
            <div className={s.date_details_flex}>
              <p>{place === 'online' ? 'Εφαρμογή' : 'Διεύθυνση'}*:</p>
              {
                place === 'online' ? (
                  <div className={s.date_online_address_container}>
                    <Select
                      defaultValue={null}
                      options={[
                        { value: 'zoom', label: labelHelper['zoom'] },
                        { value: 'googleMeet', label: labelHelper['googleMeet'] },
                        { value: 'skype', label: labelHelper['skype'] },
                      ]}
                      onChange={(selectedOption) => {
                        setAddress(selectedOption.value);
                      }}
                    />
                  </div>
                ) : (
                  <input
                    value={place === 'inPerson' ? address : null}
                    onChange={(e) => {
                      setAddress(e.target.value.trim());
                    }}
                  />
                )
              }
            </div>
            <div>
              <p>Σχόλια:</p>
              <textarea
                value={comments}
                placeholder='Γράψτε κάποιο σχόλιο εδώ...'
                onChange={(e) => {
                  setComments(e.target.value.trim())
                }}
              />
            </div>
          </div>
        </div>
        
        <div className={s.date_scheduler_container}>
          <p>Δήλωση Ώρας*:</p>
          <AvailabilityCalendar />
        </div>

        <div className={s.edit_date_actions_container}>
          <button
            className={s.cancel_edit_button}
            onClick={() => setCancelPopupOpen(true)}
          >
            <FontAwesomeIcon icon={faShare} flip="horizontal"/>Επιστροφή
          </button>
          <button
            className={s.confirm_changes_button}
            onClick={() => setConfirmPopupOpen(true)}
          >
            <FontAwesomeIcon icon={faPaperPlane}/>Αποστολή
          </button>
        </div>
      </div>
      {isCancelPopupOpen && 
        <ConfirmationPopUp 
          context={params.id == null ? 
            "Είστε σίγουρος/η ότι θέλετε να ακυρώσετε τον προγραμματισμό του ραντεβού; Το ραντεβού δεν θα αποθηκευτεί."
            :
            "Είστε σίγουρος/η ότι θέλετε να ακυρώσετε την επεξεργασία του ραντεβού;"
          }
          onCancel={handleCancelChanges} 
          onClose={() => setCancelPopupOpen(false)}
        />
      }
      {isConfirmPopupOpen && 
        <ConfirmationPopUp 
          context={params.id == null ? 
            "Είστε σίγουρος/η ότι θέλετε να προγραμματίσετε το ραντεβού;"
            :
            "Είστε σίγουρος/η ότι θέλετε να αλλάξετε τα στοιχεία του ραντεβού;"
          }
          onConfirm={handleConfirmChanges} 
          onClose={() => setConfirmPopupOpen(false)}
        />
      }
    </div>
  );
}
 
export default EditDate;