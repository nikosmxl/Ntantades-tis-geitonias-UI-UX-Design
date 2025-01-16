import React, { useEffect, useState, useMemo } from 'react';
import s from './FamilyProfileStyle.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faFloppyDisk, faXmark } from '@fortawesome/free-solid-svg-icons';
import FamilyInfo from '../../../Components/FamilyInfo/FamilyInfo';
import Breadcrumbs from '../../../Components/Breadcrumbs/Breadcrumbs';
import { db, storage } from '../../../firebase';
import { getDoc, setDoc, doc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

const FamilyProfile = () => {
  const [isEditOpen, setEditOpen] = useState(false);
  const [parent, setParentInfo] = useState({});

  const parentId = useMemo(() => JSON.parse(localStorage.getItem('user'))['id'], []);

  const fetchData = async () => {
    const parentDocRef = doc(db, 'Users', parentId);
    const parentSnap = await getDoc(parentDocRef);

    const fetchedData = parentSnap.data();
    const profilePictureRef = ref(storage, `profilePictures/${parentId}.${fetchedData.profilePictureType}`);
    const profilePictureUrl = await getDownloadURL(profilePictureRef);
    setParentInfo({ ...fetchedData, profilePicture: profilePictureUrl});
  };

  const saveData = async (newParentInfo) => {
    const parentDocRef = doc(db, 'Users', parentId);
    await setDoc(parentDocRef, newParentInfo);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleKidsNumChange = (newNumKids) => {
    const newKids = Array.from(parent.kids);
    
    while (newKids.length < newNumKids.value) {
      newKids.push({id: newKids.length+1, age: null, gender: null, hasDisabilities: false, hasAllergies: false, description: ''});
    }
    
    while (newKids.length > newNumKids.value) {
      newKids.pop();
    }
    setParentInfo({
      ...parent,
      kids: newKids
    });
  };

  const handleKidChange = (updatedKid) => {
    const updatedKids = parent.kids.map(kid => {
      if (kid.id !== updatedKid.id) return kid;

      return updatedKid
    });
    setParentInfo({
      ...parent,
      kids: updatedKids
    });
  };

  const handleDescriptionChange = (e) => {
    e.preventDefault();
    setParentInfo({
      ...parent,
      familyDescription: e.target.value.trim(),
    });
  };

  const handleHasPetsChange = (newValue) => {
    setParentInfo({
      ...parent,
      hasPets: newValue,
    });
  };

  const handleImageUpload = async (event) => {
      const file = event.target.files[0];
      const fileType = file.name.split('.')[1];
      if (file){
        const filesFolderRef = ref(storage, `profilePictures/${parentId}.${fileType}`);
        try {
          const result = await uploadBytes(filesFolderRef, file);
          await saveData({
            ...parent,
            profilePictureType: result.metadata.contentType.split('/')[1],
          });
          await fetchData();
        } catch (err) {
          console.error(err);
        }
      }
      event.target.value = '';
  };

  const handleEdit = () => {
    setEditOpen(true);
  };

  const handleCancel = () => {
    fetchData();
    setEditOpen(false);
  };

  const handleSave = async () => {
    await saveData(parent);
    setEditOpen(false);
  };

  return (
    <div>
      <div className={s.breadcrumbs_container}>
        <Breadcrumbs
          breadcrumbItems={[
            { label: 'Αρχική Σελίδα', route: ''},
            { label: 'Προφίλ', route: '.'},
          ]}
        />
      </div>
      <div className={s.family_profile_main_content}>
        <div className={s.family_profile_top_container}>
          <div className={s.family_profile_left_sidebar}>
            <img src={parent?.profilePicture} className={s.profile_pic} alt='Profile'/>
            <label className={s.add_image} htmlFor="imageInput">Προσθέστε φωτογραφία +</label>
            <input
                type="file"
                id="imageInput"
                accept="image/png, image/jpg, image/jpeg"
                className={s.image_input}
                name="Upload Photo"
                onChange={handleImageUpload}
            />
          </div>
          
          <div className={s.family_profile_top_container_main}>
            <h2>Προσωπικά Στοιχεία</h2>
            <p>Τα <span>κόκκινα</span> πεδία είναι αμετάβλητα</p>
            <hr />
            <div className={s.family_profile_personal_info}>
              <p>Όνομα :</p>
              <p>{parent?.name}</p>
              <p>Επώνυμο :</p>
              <p>{parent?.surname}</p>
              <p>Email :</p>
              <p>{parent?.email}</p>
              <p>Τηλέφωνο :</p>
              <p>{parent?.phoneNumber}</p>
              <p>Κινητό :</p>
              <p>{parent?.cellNumber}</p>
              <p>Εθνικότητα :</p>
              <p>{parent?.nationality}</p>
              <p>Περιοχή Διαμονής :</p>
              <p>{parent?.area}</p>
              <p>Μητρική Γλώσσα :</p>
              <p>{parent?.language}</p>
            </div>
          </div>
        </div>

        <FamilyInfo 
          isEditable={isEditOpen} 
          description={parent?.familyDescription}
          onDescriptionChange={handleDescriptionChange} 
          kids={parent?.kids ?? []}
          onKidsNumChange={handleKidsNumChange}
          onKidChange={handleKidChange}
          hasPets={parent?.hasPets}
          onHasPetsChange={handleHasPetsChange}
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