import React, { useEffect, useMemo, useState } from 'react';
import s from './EditDateStyle.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import Select from 'react-select';
import AvailabilityCalendar from '../../../Components/AvailabilityCalendar/AvailabilityCalendar';
import ConfirmationPopUp from '../../../PopUps/ConfirmationPopUp/ConfirmationPopUp';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import Breadcrumbs from '../../../Components/Breadcrumbs/Breadcrumbs';
import { db } from '../../../firebase';
import { addDoc, collection, doc, getDoc, setDoc } from 'firebase/firestore';

const EditDate = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { dateId } = params;
  const location = useLocation();
  const babysitterId = location?.state?.babysitterId ?? null;
  const userId = useMemo(() => JSON.parse(localStorage.getItem('user'))['id'], []);
  const userRole = useMemo(() => JSON.parse(localStorage.getItem('user'))['role'], []);

  const [parent, setParent] = useState({});
  const [babysitter, setBabysitter] = useState({});
  const [date, setDate] = useState({});
  const [isConfirmPopupOpen, setConfirmPopupOpen] = useState(false);
  const [isCancelPopupOpen, setCancelPopupOpen] = useState(false);

  const fetchData = async () => {
    if (babysitterId) {
      // create date from parent
      const parentDocRef = doc(db, 'Users', userId);
      const parentSnap = await getDoc(parentDocRef);
      setParent({ ...parentSnap.data(), id: parentDocRef.id });

      const babysitterDocRef = doc(db, 'Users', babysitterId);
      const babysitterSnap = await getDoc(babysitterDocRef);
      setBabysitter({ ...babysitterSnap.data(), id: babysitterDocRef.id });
    } else {
      // edit date, need to check who is who
      const dateDocRef = doc(db, 'Dates', dateId);
      const dateSnap = await getDoc(dateDocRef);
      const fetchedDateData = { ...dateSnap.data(), id: dateDocRef.id }
      setDate(fetchedDateData);

      const parentSnap = await getDoc(fetchedDateData.parent);
      setParent({ ...parentSnap.data(), id: fetchedDateData.parent.id });

      const babysitterSnap = await getDoc(fetchedDateData.babysitter);
      setBabysitter({ ...babysitterSnap.data(), id: fetchedDateData.babysitter.id });
    }
  };

  const saveData = async () => {
    const babysitterDocRef = doc(db, 'Users', babysitter.id);
    const parentDocRef = doc(db, 'Users', parent.id);
    if (!dateId) {
      await addDoc(collection(db, 'Dates'), { ...date, status: 'pending', babysitter: babysitterDocRef, parent: parentDocRef, dateCreated: Date.now(), sentBy: 'parent'});
    } else {
      const dateDocRef = doc(db, 'Dates', dateId);
      await setDoc(dateDocRef, { ...date, status: 'pending', babysitter: babysitterDocRef, parent: parentDocRef, sentBy: userRole});
    }
  };

  useEffect(() => {
    fetchData();
  }, [userId, userRole, babysitterId])

  const labelHelper = {
    'online': 'Διαδικτυακά',
    'inPerson': 'Δια ζώσης',
    'zoom': 'Zoom',
    'skype': 'Skype',
  };

  const handleChangePlace = (selectedOption) => {
    setDate({
      ...date,
      place: selectedOption.value,
      address: null,
    });
  };

  const handleCancelChanges = () => {
    navigate('../dates');
  };

  const handleConfirmChanges = async () => {
    // api call to save changes
    await saveData();
    navigate('../dates', { state: { status: 'sent' }});
  };

  return (
    <div className={s.edit_date_container}>
      <div className={s.breadcrumbs_container}>
        <Breadcrumbs
          breadcrumbItems={[
            { label: 'Αρχική Σελίδα', route: ''},
            { label: 'Ραντεβού Γνωριμίας', route: 'dates'},
            { label: 'Επεξεργασία Ραντεβού', route: '.'},
          ]}
        />
      </div>
      <div className={s.edit_date_main_content}>
        <h2>Επεξεργασία Ραντεβού</h2>
        <p className={s.mandatory_fields_info}>Τα πεδία με αστερίσκο (*) είναι υποχρεωτικά.</p>
        <hr />
        <div className={s.date_info_container}>
          <div className={s.date_info_user_avatar_container}>
            <img
              src={userRole === 'parent' ? babysitter?.profilePicture : parent?.profilePicture}
              className={s.date_info_user_avatar}
              alt='Profile'
            />
            <h3>{userRole === 'parent' ? `${babysitter?.name} ${babysitter?.surname}` : `${parent?.name} ${parent?.surname}`}</h3>
          </div>
          <div className={s.date_info}>
            <h3>Στοιχεία Ραντεβού</h3>
            <div className={s.date_details_flex}>
              <p>Μέσο*:</p>
              <Select
                defaultValue={{ value: date?.place, label: labelHelper[date?.place] }}
                options={[
                  { value: 'online', label: labelHelper['online'] },
                  { value: 'inPerson', label: labelHelper['inPerson'] },
                ]}
                onChange={handleChangePlace}
              />
            </div>
            <div className={s.date_details_flex}>
              <p>{date?.place === 'online' ? 'Εφαρμογή' : 'Διεύθυνση'}*:</p>
              {
                date?.place === 'online' ? (
                  <div className={s.date_online_address_container}>
                    <Select
                      defaultValue={null}
                      options={[
                        { value: 'zoom', label: labelHelper['zoom'] },
                        { value: 'skype', label: labelHelper['skype'] },
                      ]}
                      onChange={(selectedOption) => {
                        setDate({ ...date, address: selectedOption.value});
                      }}
                    />
                  </div>
                ) : (
                  <input
                    value={date?.place === 'inPerson' ? date?.address : null}
                    onChange={(e) => {
                      setDate({...date, address: e.target.value});
                    }}
                  />
                )
              }
            </div>
            <div>
              <p>Σχόλια:</p>
              <textarea
                value={date?.fewWords}
                placeholder='Γράψτε κάποιο σχόλιο εδώ...'
                onChange={(e) => {
                  setDate({...date, fewWords: e.target.value});
                }}
              />
            </div>
          </div>
        </div>
        
        <div className={s.date_scheduler_container}>
          <p>Δήλωση Ώρας*:</p>
          <AvailabilityCalendar
            availability={babysitter?.dateAvailability ?? []}
            selectedTimeslot={date?.selectedTimeslot}
            onTimeslotChange={(timeslot, formattedDate) => setDate({...date, selectedTimeslot: timeslot, scheduledDate: formattedDate})}
          />
        </div>

        <div className={s.edit_date_actions_container}>
          <button
            className={s.cancel_edit_button}
            onClick={() => setCancelPopupOpen(true)}
          >
            <FontAwesomeIcon icon={faShare} flip="horizontal"/>Επιστροφή
          </button>
          <button
            className={!date?.place || !date?.address || !date?.selectedTimeslot ? s.cancel_edit_button : s.confirm_changes_button}
            onClick={() => setConfirmPopupOpen(true)}
            disabled={!date?.place || !date?.address || !date?.selectedTimeslot}
          >
            <FontAwesomeIcon icon={faPaperPlane}/>Αποστολή
          </button>
        </div>
      </div>
      {isCancelPopupOpen && 
        <ConfirmationPopUp 
          context={dateId == null ? 
            "Είστε σίγουρος/η ότι θέλετε να ακυρώσετε τον προγραμματισμό του ραντεβού; Το ραντεβού δεν θα αποθηκευτεί."
            :
            "Είστε σίγουρος/η ότι θέλετε να ακυρώσετε την επεξεργασία του ραντεβού;"
          }
          onConfirm={handleCancelChanges} 
          onClose={() => setCancelPopupOpen(false)}
        />
      }
      {isConfirmPopupOpen && 
        <ConfirmationPopUp 
          context={dateId == null ? 
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