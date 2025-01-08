import React, { useState } from 'react';
import s from './FamilyProfileStyle.module.css';
import trollProf from '../../../Assets/Pictures/troll_prof.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faFloppyDisk, faXmark } from '@fortawesome/free-solid-svg-icons';
import FamilyInfo from '../../../Components/FamilyInfo/FamilyInfo';

const FamilyProfile = () => {
  const [isEditOpen, setEditOpen] = useState(false);
  const [description, setDescription] = useState('');
  const [kids, setKids] = useState([]);
  const [hasPets, setHasPets] = useState(false);

  const handleKidsNumChange = (newNumKids) => {
    const newKids = Array.from(kids);
    
    while (newKids.length < newNumKids.value) {
      newKids.push({id: newKids.length+1, age: null, gender: null, hasDisabilities: false, hasAllergies: false, description: ''});
    }
    
    while (newKids.length > newNumKids.value) {
      newKids.pop();
    }
    setKids(newKids);
  };

  const handleKidChange = (updatedKid) => {
    const updatedKids = kids.map(kid => {
      if (kid.id !== updatedKid.id) return kid;

      return updatedKid
    });
    setKids(updatedKids);
  };

  const handleDescriptionChange = (e) => {
    e.preventDefault();
    setDescription(e.target.value.trim());
  };

  const handleEdit = () => {
    setEditOpen(true);
  };

  const handleCancel = () => {
    // refetch data from api
    setEditOpen(false);
  };

  const handleSave = () => {
    // check for fields
    // post request to api
    setEditOpen(false);
  };

  return (
    <div>
      <div className={s.breadcrumbs_container}>
        Αρχική Σελίδα > Προφίλ
      </div>
      <div className={s.family_profile_main_content}>
        <div className={s.family_profile_top_container}>
          <div className={s.family_profile_left_sidebar}>
            <img src={trollProf} className={s.profile_pic} alt='Profile'/>
            <p>+ Προσθέστε Φωτογραφία</p>
          </div>
          
          <div className={s.family_profile_top_container_main}>
            <h2>Προσωπικά Στοιχεία</h2>
            <p>Τα <span>κόκκινα</span> πεδία είναι αμετάβλητα</p>
            <hr />
            <div className={s.family_profile_personal_info}>
              <p>Όνομα :</p>
              <p>Μπάμπης</p>
              <p>Επώνυμο :</p>
              <p>Μπαμπάκης</p>
              <p>Email :</p>
              <p>bcotton@gmail.com</p>
              <p>Τηλέφωνο :</p>
              <p>2102419800</p>
              <p>Κινητό :</p>
              <p>6988676321</p>
              <p>Εθνικότητα :</p>
              <p>Ελληνική</p>
              <p>Περιοχή Διαμονής :</p>
              <p>Αχαρνές, Αττική</p>
              <p>Μητρική Γλώσσα :</p>
              <p>Ελληνικά</p>
            </div>
          </div>
        </div>

        <FamilyInfo 
          isEditable={isEditOpen} 
          description={description}
          onDescriptionChange={handleDescriptionChange} 
          kids={kids}
          onKidsNumChange={handleKidsNumChange}
          onKidChange={handleKidChange}
          onHasPetsChange={setHasPets}
        />

        <div className={s.family_profile_action_buttons_container}>
        {
          isEditOpen ? (
            <>
              <button
                className={s.cancel_button}
                onClick={handleCancel}
              >
                <FontAwesomeIcon icon={faXmark}/><p>Ακύρωση</p>
              </button>
              <button
                className={s.save_button}
                onClick={handleSave}
              >
                <FontAwesomeIcon icon={faFloppyDisk}/><p>Αποθήκευση Επιλογών</p>
              </button>
            </>
          ) : (
            <button
              className={s.edit_button}
              onClick={handleEdit}
            >
              <FontAwesomeIcon icon={faPencil}/><p>Επεξεργασία</p>
            </button>
          )
        }
        </div>

      </div>
    </div>
  );
}
 
export default FamilyProfile;