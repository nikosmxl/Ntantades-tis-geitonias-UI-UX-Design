import React, { useState, useEffect, useMemo } from 'react';
import s from './BabysitterProfileStyle.module.css';
import Reference from '../../../Components/Reference/Reference';
import Checkbox from '../../../Components/Checkbox/Checkbox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faFloppyDisk, faPencil } from '@fortawesome/free-solid-svg-icons';
import CertificatesList from '../../../Components/CertificatesList/CertificatesList';
import { ageExperienceOptions, specializationOptions, educationSpecialties, educationLevels, experienceOptions, languageOptions } from '../../../utils/options';
import MultiDropdownMenu from '../../../Components/MultiDropdownMenu/MultiDropdownMenu';
import Select from 'react-select';
import AvailabilityCalendar from '../../../Components/AvailabilityCalendar/AvailabilityCalendar';
import Breadcrumbs from '../../../Components/Breadcrumbs/Breadcrumbs';
import { db, storage } from '../../../firebase';
import { getDoc, setDoc, doc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

const BabysitterProfile = ({}) => {
  const [babysitter, setBabysitter] = useState({});
  const [editableSections, setEditableSections] = useState({
    'contactDetails': false,
    'education': false,
    'experience': false,
    'reference': false,
    'availability': false,
  });

  const babysitterId = useMemo(() => JSON.parse(localStorage.getItem('user'))['id'], []);

  const fetchData = async () => {
    const babysitterDocRef = doc(db, 'Users', babysitterId);
    const babysitterSnap = await getDoc(babysitterDocRef);

    const fetchedData = babysitterSnap.data();
    const profilePictureRef = ref(storage, `profilePictures/${babysitterId}.${fetchedData.profilePictureType}`);
    const profilePictureUrl = await getDownloadURL(profilePictureRef);
    setBabysitter({ ...fetchedData, profilePicture: profilePictureUrl});
  };

  const saveData = async (newBabysitterInfo) => {
    const certificates = newBabysitterInfo?.certificates ?? [];
    const references = newBabysitterInfo?.references ?? [];

    const babysitterDocRef = doc(db, 'Users', babysitterId);
    const newCertificates = await Promise.all(certificates.map(async (certificate) => {
      if (!(certificate?.size ?? false)) return certificate;

      const certificateRef = ref(storage, `certificates/${babysitterId}/${certificate.name}`)
      await uploadBytes(certificateRef, certificate);
      return { name: certificate.name, date: Date.now() };
    }));

    const newReferences = await Promise.all(references.map(async (reference) => {
      if (!(reference?.size ?? false)) return reference;

      const referenceRef = ref(storage, `references/${babysitterId}/${reference.name}`)
      await uploadBytes(referenceRef, reference);
      return { name: reference.name, date: Date.now() };
    }));

    const dataToBeSaved = {
      ...newBabysitterInfo,
      certificates: newCertificates,
      references: newReferences,
    };
    await setDoc(babysitterDocRef, dataToBeSaved);
  };

  useEffect(() => {
    fetchData();
  }, []);
  
  const handleImageUpload = async (event) => {
      const file = event.target.files[0];
      const fileType = file.name.split('.')[1];
      if (file){
        const filesFolderRef = ref(storage, `profilePictures/${babysitterId}.${fileType}`);
        try {
          const result = await uploadBytes(filesFolderRef, file);
          await saveData({
            ...babysitter,
            profilePictureType: result.metadata.contentType.split('/')[1],
          });
          await fetchData();
        } catch (err) {
          console.error(err);
        }
      }
      event.target.value = '';
  };

  const handleFileUpload = async (event, fileType) => {
    const files = Array.from(event.target.files);
    setBabysitter({
      ...babysitter,
      [fileType]: [...babysitter[fileType], ...files],
    });
    event.target.value = '';
  };

  const handleEdit = (section) => {
    setEditableSections({
      ...editableSections,
      [section]: true,
    });
  };

  const handleCancel = (section) => {
    fetchData();
    setEditableSections({
      ...editableSections,
      [section]: false,
    });
  };

  const handleSave = async (section) => {
    await saveData(babysitter);
    setEditableSections({
      ...editableSections,
      [section]: false,
    });
  };

  const getSectionOptions = (section) => {
    return (
      <div className={s.section_options}>
        {
          editableSections[section] ? (
            <>
              <button
                className={s.cancel_button}
                onClick={() => handleCancel(section)}
              >
                <FontAwesomeIcon icon={faXmark}/><p>Ακύρωση</p>
              </button>
              <button
                className={s.save_button}
                onClick={() => handleSave(section)}
              >
                <FontAwesomeIcon icon={faFloppyDisk}/><p>Αποθήκευση Επιλογών</p>
              </button>
            </>
          ) : (
            <button
              className={s.edit_button}
              onClick={() => handleEdit(section)}
            >
              <FontAwesomeIcon icon={faPencil}/><p>Επεξεργασία</p>
            </button>
          )
        }
      </div>
    );
  };

  return (
    <div className={s.babysitter_profile_page}>
      <div className={s.breadcrumbs}>
        <Breadcrumbs
          breadcrumbItems={[
            { label: 'Αρχική Σελίδα', route: ''},
            { label: 'Προφίλ', route: '.'},
          ]}
        />
      </div>
      <div className={s.babysitter_profile_main_content}>
        <div className={s.babysitter_profile_top_container}>
          <div className={s.babysitter_profile_left_sidebar}>
            <img src={babysitter?.profilePicture} className={s.profile_pic}/>
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

          <div className={s.babysitter_profile_top_container_main}>
            <div className={s.personal_details_container}>
              <h3>Προσωπικά Στοιχεία</h3>
              <p className={s.note_red_inputs}>
                Τα <span>κόκκινα</span> πεδία είναι αμετάβλητα
              </p>
              <hr />
              <form>
                <div className={s.form_group}>
                  <label className={s.form_group_label} htmlFor="name">Όνομα:</label>
                  <input className={s.form_group_input}
                    type="text" 
                    id="name"
                    value={babysitter?.name}
                    disabled={true}
                  />
                </div>
                <div className={s.form_group}>
                  <label className={s.form_group_label} htmlFor="surname">Επώνυμο:</label>
                  <input className={s.form_group_input}
                    type="text"
                    id="surname"
                    value={babysitter?.surname}
                    disabled={true}
                  />
                </div>
                <div className={s.form_group}>
                  <label className={s.form_group_label} htmlFor="age">Ηλικία:</label>
                  <input className={s.form_group_input}
                    type="number"
                    id="age"
                    value={babysitter?.age}
                    disabled={true}
                  />
                </div>
                <div className={s.form_group}>
                  <label className={s.form_group_label} htmlFor="email">Email:</label>
                  <input className={s.form_group_input}
                    type="email"
                    id="email" 
                    value={babysitter?.email}
                    disabled={true}
                  />
                </div>
                <div className={s.form_group}>
                  <label className={s.form_group_label} htmlFor="gender">Φύλο:</label>
                  <input className={s.form_group_input}
                    type="text"
                    id="gender"
                    value={babysitter?.gender === 'male' ? 'Άντρας' : 'Γυναίκα'}
                    disabled={true}
                  />
                </div>
                <div className={s.form_group}>
                  <label className={s.form_group_label} htmlFor="mobile">Κινητό:</label>
                  <input className={s.form_group_input}
                    type="tel"
                    id="mobile"
                    value={babysitter?.cellNumber}
                    disabled={true}
                  />
                </div>
                <div className={s.form_group}>
                  <label className={s.form_group_label} htmlFor="phone">Σταθερό:</label>
                  <input className={s.form_group_input}
                    type="tel"
                    id="phone"
                    value={babysitter?.phoneNumber}
                    disabled={true}
                  />
                </div>
                <div className={s.form_group}>
                  <label className={s.form_group_label} htmlFor="ethnicity">Εθνικότητα:</label>
                  <input className={s.form_group_input}
                    type="text"
                    id="ethnicity"
                    value={babysitter?.nationality}
                    disabled={true}
                  />
                </div>
                <div className={s.form_group}>
                  <label className={s.form_group_label} htmlFor="residence">Περιοχή Διαμονής:</label>
                  <input className={s.form_group_input}
                    type="text"
                    id="residence"
                    value={babysitter?.area}
                    disabled={true}
                  />
                </div>
                <div className={s.form_group}>
                  <label className={s.form_group_label} htmlFor="language">Μητρική Γλώσσα:</label>
                  <input className={s.form_group_input}
                    type="text"
                    id="language"
                    value={babysitter?.language}
                    disabled={true}
                  />
                </div>
              </form>
            </div>

            <div className={s.contact_details_container}>
              <h3>Στοιχεία Επικοινωνίας</h3>
              <hr />
              <form>
                <div className={s.form_group}>
                  <label className={s.form_group_label} htmlFor="skypeId">Skype id:</label>
                  <input className={s.form_group_input} 
                    type="text"
                    id="skypeId"
                    value={babysitter?.skypeId}
                    disabled={!editableSections['contactDetails']}
                  />
                </div>
                <div className={s.form_group}>
                  <label className={s.form_group_label} htmlFor="zoomLink">Zoom link:</label>
                  <input className={s.form_group_input} 
                    type="text"
                    id="zoomLink"
                    value={babysitter?.zoomLink}
                    disabled={!editableSections['contactDetails']}
                  />
                </div>
              </form>
              { getSectionOptions('contactDetails') }
            </div>
          </div>
        </div>

        <div className={s.babysitter_profile_section_container}>
          <h3>Εκπαίδευση</h3>
          <p className={s.note_red_inputs}>Τα πεδία με τον αστερίσκο (*) είναι υποχρεωτικά</p>
          <hr />
          <div className={s.educational_level}>
            <h3>Επίπεδο σπουδών*:</h3>
            <Select
              value={educationLevels.find((option) => option.value === babysitter?.educationLevel)}
              onChange={(selectedOption) => setBabysitter({
                ...babysitter,
                educationLevel: selectedOption.label,
              })}
              options={educationLevels}
              isDisabled={!editableSections['education']}
              placeholder="Επιλέξτε Επίπεδο Εκπαίδευσης"
              styles={{
                container: (provided) => ({
                  ...provided,
                  width: '480px',
                })
              }}
            />
          </div>
          
          <form>
            <h3 className={s.specialty}>Ειδικότητα*:</h3>
            <div className={s.specialty_options}>
              {(educationSpecialties[babysitter?.educationLevel ?? null] ?? []).map((option) => (
                <div
                  className={s.specialty_option}
                  key={option}
                >
                  <input
                    type="radio"
                    id={option}
                    name="specialty"
                    value={option}
                    checked={babysitter?.specialty === option}
                    onChange={() => setBabysitter({
                      ...babysitter,
                      specialty: option,
                    })}
                    disabled={!editableSections['education']}
                    style={{
                      cursor: editableSections['education'] ? 'pointer' : null
                    }}  
                  />
                  <label
                    htmlFor={option}
                    style={{
                      cursor: editableSections['education'] ? 'pointer' : null
                    }}  
                  >
                    {option}
                  </label>
                </div>
              ))}
            </div>
          </form>

          {editableSections['education'] &&
            <>
              <label className={s.add_certificate} htmlFor="certificateInput">Προσθέστε Πιστοποιητικό / Βεβαίωση* +</label>
              <input
                type="file"
                id="certificateInput"
                accept=".pdf, .doc, .docx"
                className={s.certificate_input}
                name="Upload Certificate"
                onChange={(e) => handleFileUpload(e, 'certificates')}
                multiple
              />
            </>
          }

          {(babysitter?.certificates ?? []).length > 0 && (
            <div className={s.certificates_list}>
                <CertificatesList
                  babysitterId={babysitterId}
                  certificates={babysitter?.certificates}
                  isEditable={editableSections['education']}
                  handleCertificateRemove={(newCertificates) => setBabysitter({
                    ...babysitter, certificates: newCertificates
                  })}
                />
            </div>
          )}

          <div className={s.languages_dropdown}>
            <h3>Ξένες Γλώσσες:</h3>
            <MultiDropdownMenu
              selectedOptions={languageOptions.filter(languageOption => (babysitter?.languages ?? []).find(language => language === languageOption.value))}
              setSelectedOptions={(selectedOptions) => setBabysitter({
                ...babysitter,
                languages: selectedOptions.map(selectedOption => selectedOption.value),
              })}
              isDisabled={!editableSections['education']}
              options={languageOptions}
            />
          </div>
          { getSectionOptions('education') }

        </div>

        <div className={s.babysitter_profile_section_container}>
          <h3>Εμπειρία</h3>
          <p className={s.note_red_inputs}>Τα πεδία με τον αστερίσκο (*) είναι υποχρεωτικά</p>
          <hr />
          <div className={s.experience}>

            <div className={s.years_of_experience}>
              <h3>Προϋπηρεσία*:</h3>
              <Select
                value={experienceOptions.find((option) => option.value === babysitter?.experience)}
                onChange={(selectedOption) => setBabysitter({
                  ...babysitter,
                  experience: selectedOption.value,
                })}
                options={experienceOptions}
                isDisabled={!editableSections['experience']}
                placeholder="Επιλέξτε Έτη Προϋπηρεσίας"
              />
            </div>

            <div className={s.checkbox_category}>
              <h3>Εμπειρία με παιδιά ηλικίας:</h3>
              <div className={s.checkbox_options}>
                {ageExperienceOptions.map((option) => {

                  return (
                    <Checkbox
                      key={option}
                      isChecked={(babysitter?.ageExperience ?? []).find((exp) => exp === option)}
                      name={"ageExperience"}
                      onChange={() => {}}
                      label={option}
                      width="20px"
                      height="20px"
                      isEnabled={editableSections['experience']}
                    />
                  )
                })}
              </div>
            </div>

            <div className={s.checkbox_category}>
              <h3>Ειδίκευση σε:</h3>
              <div className={s.checkbox_options}>
                {specializationOptions.map((option) => {
                  return (
                    <Checkbox
                      key={option}
                      isChecked={(babysitter?.specialization ?? {})[option.name]}
                      name={"specialization"}
                      onChange={() => {}}
                      label={option.label}
                      width="20px"
                      height="20px"
                      isEnabled={editableSections['experience']}
                    />
                  );
                })}
              </div>
            </div>

          </div>
          { getSectionOptions('experience') }

        </div>

        <div className={s.babysitter_profile_section_container}>
          <h3>Συστατικές Επιστολές</h3>
          <hr />
          <div className={s.references}>

            {editableSections['references'] &&
              <>
                <label className={s.add_reference} htmlFor="certificateInput">Προσθέστε Συστατική Επιστολή +</label>
                <input
                  type="file"
                  id="referenceInput"
                  accept=".pdf, .doc, .docx"
                  className={s.reference_input}
                  name="Upload Reference"
                  onChange={(e) => handleFileUpload(e, 'references')}
                  multiple
                />
              </>
            }

            {
              (babysitter?.references ?? []).length > 0 && babysitter?.references.map(reference => {
                return <Reference
                  key={`${reference}`}
                  babysitterId={babysitterId}
                  reference={reference}
                />
              })
            }
          </div>
          { getSectionOptions('references') }

        </div>

        <div className={s.babysitter_profile_section_container}>
          <h3>Διαθεσιμότητα για Ραντεβού</h3>
          <hr />
          <AvailabilityCalendar
            availability={babysitter?.dateAvailability ?? []}
            onAvailabilityChange={(newAvailability) => setBabysitter({
              ...babysitter,
              dateAvailability: newAvailability,
            })}
            editableAvailability={true}
            showWeeks={false}
            isEditable={editableSections['availability']}
            width='972px'
          />
          { getSectionOptions('availability') }

        </div>
      </div>
    </div>
  );
}
 
export default BabysitterProfile;