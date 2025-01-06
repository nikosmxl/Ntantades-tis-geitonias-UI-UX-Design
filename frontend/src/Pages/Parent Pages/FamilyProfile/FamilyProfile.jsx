import React, { useState } from 'react';
import s from './FamilyProfileStyle.module.css';
import trollProf from '../../../Assets/Pictures/troll_prof.jpg';
import Select from 'react-select';
import KidCard from '../../../Components/KidCard/KidCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faFloppyDisk, faXmark } from '@fortawesome/free-solid-svg-icons';

const FamilyProfile = ({}) => {
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
            <img src={trollProf} className={s.profile_pic}/>
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

        <div className={s.family_profile_section_container}>
          <h3>Οικογένεια</h3>
          <hr />

          <div className={s.family_profile_family_info}>
            <textarea
              className={isEditOpen ? s.family_description_editable : s.family_description}
              disabled={!isEditOpen}
              value={description}
              onChange={handleDescriptionChange}
            />

            <div className={s.family_profile_info_with_dropdown_container}>
              <p>Αριθμός Παιδιών:</p>
              <Select
                defaultValue={{label: kids.length, value: kids.length}}
                options={[
                  {label: 1, value: 1},
                  {label: 2, value: 2},
                  {label: 3, value: 3},
                  {label: 4, value: 4},
                ]}
                onChange={(selectedOption) => handleKidsNumChange(selectedOption)}
                isDisabled={!isEditOpen}
              />
            </div>

            {
              kids.map((kid, index) => {
                return (
                  <KidCard
                    key={`${kid.id} ${kid.age} ${kid.gender} ${index}`}
                    kid={kid}
                    onChange={handleKidChange}
                    isEditable={isEditOpen}
                  />
                );
              })
            }

            <div className={s.family_profile_info_with_dropdown_container}>
              <p>Κατοικίδια:</p>
              <Select
                defaultValue={{label: 'Οχι', value: false}}
                options={[
                  {label: 'Ναι', value: true},
                  {label: 'Οχι', value: false},
                ]}
                onChange={(selectedOption) => setHasPets(selectedOption.value)}
                isDisabled={!isEditOpen}
              />
            </div>
          </div>

        </div>

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