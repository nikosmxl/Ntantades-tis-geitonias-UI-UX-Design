import React, { useEffect, useMemo, useState } from "react";
import s from "./ApplicationCreateStyle.module.css"
import FamilyInfo from "../../../Components/FamilyInfo/FamilyInfo";
import Checkbox from "../../../Components/Checkbox/Checkbox";
import Timetable from "../../../Components/Timetable/Timetable";
import DateDropdowns from "../../../Components/DateDropdowns/DateDropdowns";
import ErrorFields from "../../../Components/ErrorFields/ErrorFields";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGavel, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faFloppyDisk } from "@fortawesome/free-regular-svg-icons";
import ConfirmationPopUp from "../../../PopUps/ConfirmationPopUp/ConfirmationPopUp";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Breadcrumbs from '../../../Components/Breadcrumbs/Breadcrumbs';
import { db } from '../../../firebase';
import { getDoc, doc, collection, addDoc, setDoc } from 'firebase/firestore';
import { servicesMapper, specializationOptions, transportationOptions } from "../../../utils/options";

function ApplicationCreate(){
    const { appId } = useParams();
    const location = useLocation();
    const babysitterId = location?.state?.babysitterId ?? null;
    const userId = useMemo(() => JSON.parse(localStorage.getItem('user'))['id'], []);

    const [babysitter, setBabysitter] = useState({});
    const [parent, setParent] = useState({});
    const [application, setApplication] = useState({});

    const parentDocRef = useMemo(() => doc(db, 'Users', userId), [userId]);

    const fetchData = async () => {
      if (appId) {
        const applicationDocRef = doc(db, 'Applications', appId);
        const applicationSnap = await getDoc(applicationDocRef);
        const applicationData = applicationSnap.data();
        setApplication({ ...applicationData, id: appId });

        const babysitterSnap = await getDoc(applicationData.babysitter);
        const babysitterData = babysitterSnap.data();
        setBabysitter({ ...babysitterData, id: applicationData.babysitter.id })
      } else if (babysitterId) {
        const babysitterDocRef = doc(db, 'Users', babysitterId);
        const babysitterSnap = await getDoc(babysitterDocRef);
        const babysitterData = babysitterSnap.data();
        setBabysitter({ ...babysitterData, id: babysitterId })
      }

      const parentSnap = await getDoc(parentDocRef);
      const parentData = parentSnap.data();
      setParent({ ...parentData, id: userId })
    };

    const saveData = async (status) => {
      const babysitterDocRef = doc(db, 'Users', babysitter?.id);
      if (!appId) {
        await addDoc(collection(db, 'Applications'), { ...application, status: status, babysitter: babysitterDocRef, parent: parentDocRef, dateCreated: Date.now(), isHistory: false});
      } else {
        const applicationDocRef = doc(db, 'Applications', appId);
        await setDoc(applicationDocRef, { ...application, status: status, babysitter: babysitterDocRef, parent: parentDocRef, isHistory: false});
      }
    };

    useEffect(() => {
      fetchData();
    }, [appId, babysitterId]);

    const [error, setError] = useState(null);
    const [isErrorVisible, setIsErrorVisible] = useState(false);
    
    const [isCancelPopupOpen, setIsCancelPopupOpen] = useState(false);
    const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);

    const dictionaries = {
        languages: {
            'english': "Αγγλικά",
            'french': "Γαλλικά",
            'italian': "Ιταλικά",
            'spanish': "Ισπανικά",
            'german': "Γερμανικά",
            'russian': "Ρώσικα",
            'arabic': "Αραβικά"
        },
        services: servicesMapper,
    };

    const navigate = useNavigate();

    const openConfirmPopup = () => {
        setIsConfirmPopupOpen(true);
    }

    const handleConfirmPopupClose = () => {
        setIsConfirmPopupOpen(false); // Κλεινει το PopUp
    };

    const onConfirm = async () => {
      await saveData('sent');
      navigate('/parent/applications', { state: { status: 'sent' }});
    }

    const openCancelPopup = () => {
        setIsCancelPopupOpen(true);
    }

    const handleCancelPopupClose = () => {
        setIsCancelPopupOpen(false); // Κλεινει το PopUp
    };

    const onCancel = () => {
      navigate(-1);
    };

    const handleSave = async () => {
      await saveData('saved');
      navigate('/parent/applications', { state: { status: 'saved' }});
    };

    const handleAddressChange = (event) => {
        setApplication({ ...application, address: event.target.value});
    };

    const handleCheckboxChange = (state, setState, value) => {
        if (state.includes(value)) {
            setState(state.filter(item => item !== value));
        } else {
            setState([...state, value]);
        }
    };

    const handleTransportationChange = (option) => {
      if (option.value !== application?.transportation) {
        setApplication({ ...application, transportation: option.value });
      } else {
        const otherTransportationOption = transportationOptions.find(transportationOption => option.value !== transportationOption.value);
        setApplication({ ...application, transportation: otherTransportationOption.value });
      }
    };

    const handleFewWordsChange = (e) => {
        e.preventDefault();
        setApplication({ ...application, fewWords: e.target.value });
    };

    const handleSubmit = () => {
        if (error){
            setIsErrorVisible(true);
            return;
        }
        openConfirmPopup();
    }

    useEffect(() => {
        const missingFields = new Set();

        if (application?.address === null || (application?.address ?? '').trim() === ''){
            missingFields.add("Οδός και Αριθμός κατοικίας");
        }
        if (application?.workingHours === null){
            missingFields.add("Χρόνος απασχόλησης");
        }
        if ((application?.availability ?? []).length === 0){
            missingFields.add("Ημερολόγιο απασχόλησης");
        }
        if (Object.keys(application?.startingDate ?? {}).length === 0){
            missingFields.add("Ημερομηνία έναρξης συνεργασίας");
        }
        if (Object.keys(application?.endingDate ?? {}).length === 0){
            missingFields.add("Ημερομηνία λήξης συνεργασίας");
        }
    
        if (missingFields.size === 0) {
            setError(null); // Όλα τα πεδία είναι συμπληρωμένα
        } else {
            const errorMessage = `Κάποια από τα υποχρεωτικά πεδία δεν συμπληρώθηκαν: ${Array.from(missingFields).join(", ")}`;
            setError(errorMessage);
        }
    }, [application?.address, application?.workingHours, application?.availabilityList, application?.startingDate, application?.endingDate]);

    return (
        <div className={s.container}>
            <div className={s.breadcrumbs}>
              <Breadcrumbs
                breadcrumbItems={[
                  { label: 'Αρχική Σελίδα', route: ''},
                  { label: 'Βρείτε νταντά', route: 'babysitter-search'},
                  { label: 'Δημιουργία νέας Αίτησης', route: '.'},
                ]}
              />
            </div>

            <h3 className={s.title}>Δημιουργία νέας Αίτησης</h3>
            <p className={s.note}>Τα πεδία με <span>Κόκκινο</span> είναι αμετάβλητα. Επεξεργαστείτε το Προφίλ για να τα αλλάξετε.</p>
            <p className={s.note}>Τα πεδία με αστερίσκο (*) είναι υποχρεωτικά.</p>
            <hr/>

            <div className={s.application_create_container}>
                <div className={s.parent_fullname}>
                    <label htmlFor="fullname">Ονοματεπώνυμο Κηδεμόνα:</label>
                    <input type="text" id="fullname" value={`${parent?.name} ${parent?.surname}`} readOnly />
                </div>

                <div className={s.place_of_residence}>
                    <label htmlFor="state">Δήμος κατοικίας:</label>
                    <input type="text" id="state" value={parent?.area} readOnly />
                </div>

                <div className={s.address}>
                    <label htmlFor="address">Οδός και Αριθμός Διαμονής*:</label>
                    <input
                        type="text"
                        id="address"
                        value={application?.address}
                        onChange={handleAddressChange}
                        placeholder="Η διεύθυνσή σας..."
                    />
                </div>

                <div className={s.family_info}>
                    <FamilyInfo
                        isEditable={false}
                        description={parent?.familyDescription}
                        kids={parent?.kids ?? []}
                        hasPets={parent?.hasPets}
                        isForApplication
                    />
                </div>

                <div className={s.working_hours}>
                    <b>Χρόνος απασχόλησης*</b>
                    {["Πλήρης απασχόληση", "Μερική απασχόληση"].map(option => (
                        <Checkbox
                            key={option}
                            name="workingHours"
                            isChecked={application?.workingHours === option}
                            onChange={() => setApplication({ ...application, workingHours: option })}
                            label={option}
                        />
                    ))}
                </div>

                <div className={s.calendar_area}>
                    <b>Ημερολόγιο απασχόλησης*</b>
                    <Timetable width="400px" height="220px" onChange={(newAvailabilityList) => setApplication({ ...application, availability: newAvailabilityList })} checkedSlots={application?.availability ?? []} />
                </div>

                <div className={s.starting_date}>
                    <b>Ημερομηνία Έναρξης Συνεργασίας*</b>
                    <Checkbox 
                        name={"startingDate"}
                        isChecked={application?.startingDate === "Anytime"}
                        onChange={() => {
                            if (application?.startingDate === "Anytime") {
                                setApplication({ ...application, startingDate: {}, }); // Επαναφορά του startingDate για να είναι editable
                            } else {
                                setApplication({ ...application, startingDate: "Anytime", }); // Ορισμός ως "Anytime"
                            }
                        }}
                        label={"Άμεσα διαθέσιμος/η"}
                    />
                    <div className={s.date_dropdowns_area}>
                        <DateDropdowns
                            day={application?.startingDate?.day ?? null}
                            month={application?.startingDate?.month ?? null}
                            year={application?.startingDate?.year ?? null}
                            isEnabled={application?.startingDate !== "Anytime"}
                            onChange={(newStartDate) => {
                                setApplication({ ...application, startingDate: newStartDate });
                            }}
                        />
                    </div>
                </div>

                <div className={s.ending_date}>
                    <b>Ημερομηνία Λήξης Συνεργασίας*</b>
                    <Checkbox 
                        name={"endingDate"}
                        isChecked={application?.endingDate === "Anytime"}
                        onChange={() => {
                            if (application?.endingDate === "Anytime") {
                                setApplication({ ...application, endingDate: {}, }); // Επαναφορά του startingDate για να είναι editable
                            } else {
                                setApplication({ ...application, endingDate: "Anytime", }); // Ορισμός ως "Anytime"
                            }
                        }}
                        label={"Αορίστου χρόνου"}
                    />
                    <div className={s.date_dropdowns_area}>
                        <DateDropdowns
                            day={application?.endingDate?.day ?? null}
                            month={application?.endingDate?.month ?? null}
                            year={application?.endingDate?.year ?? null}
                            isEnabled={application?.endingDate !== "Anytime"}
                            onChange={(newStartDate) => {
                                setApplication({ ...application, endingDate: newStartDate });
                            }}
                        />
                    </div>
                </div>

                <div className={s.checkbox_area}>
                    <b>Ειδίκευση σε</b>
                    {["specialNeeds", "asl"].map(option => (
                        <Checkbox
                            key={option}
                            name={"specialties"}
                            isChecked={application?.specialization?.[option] ?? false}
                            isEnabled={true}
                            label={option === "specialNeeds" ? "ΑμεΑ" : "Νοηματική"}
                            onChange={() => {
                              setApplication({
                                ...application,
                                specialization: {
                                  ...application.specialization,
                                  [option]: !application?.specialization?.[option]
                                }
                              })
                            }}
                        />
                    ))}
                </div>

                <div className={s.checkbox_area}>
                    <b>Μετακίνηση παιδιών</b>
                    {transportationOptions.map(option => (
                        <Checkbox
                            key={option}
                            name={"transportation"}
                            isChecked={(application?.transportation ?? '') === option.value}
                            onChange={() => handleTransportationChange(option)}
                            label={option.label}
                        />
                    ))}
                </div>

                <div className={s.checkbox_area}>
                    <b>Γνώσεις ξένων γλωσσών</b>
                    {Object.entries(dictionaries.languages).map(([language, translation]) => (
                        <Checkbox
                            key={language}
                            name={"language"}
                            isChecked={(application?.languages ?? []).includes(language)}
                            onChange={() => handleCheckboxChange(application?.languages ?? [], (newLanguages) => setApplication({ ...application, languages: newLanguages }), language)}
                            label={translation}
                        />
                    ))}
                </div>
                
                <div className={s.checkbox_area}>
                    <b>Υπηρεσίες</b>
                    {Object.entries(dictionaries.services).map(([service, translation]) => (
                        <Checkbox
                            key={service}
                            name={"services"}
                            isChecked={(application?.services ?? []).includes(service)}
                            onChange={() => handleCheckboxChange(application?.services ?? [], (newServices) => setApplication({ ...application, services: newServices }), service)}
                            label={translation}
                        />
                    ))}
                </div>
                <div className={s.few_words_area}>
                    <b>Λίγα λόγια</b>
                    <textarea
                        className={s.few_words}
                        value={application?.fewWords}
                        placeholder="Λίγα λόγια..."
                        onChange={handleFewWordsChange}
                    />
                </div>

                {isErrorVisible && error &&
                    <ErrorFields error={error} onXmarkClick={() => {setIsErrorVisible(false)}} />
                }

                <div className={s.buttons}>
                    <button
                        className={`${s.button} ${s.cancel}`}
                        onClick={openCancelPopup}
                    >
                        <FontAwesomeIcon icon={faXmark} fontSize={'18px'} />
                        Ακύρωση
                    </button>
                    
                    <button
                        className={`${s.button} ${s.save}`}
                        onClick={handleSave}
                    >
                        <FontAwesomeIcon icon={faFloppyDisk} fontSize={'18px'} />
                        Προσωρινή Αποθήκευση
                    </button>
                    
                    <button
                        className={`${s.button} ${s.submit}`}
                        onClick={handleSubmit}
                    >
                        <FontAwesomeIcon icon={faGavel} fontSize={'18px'} />
                        Οριστική Υποβολή
                    </button>
                </div>
            </div>
            {isConfirmPopupOpen && 
                <ConfirmationPopUp 
                    context={"Είστε σίγουρος ότι θέλετε να υποβάλετε οριστικά την αίτηση;"} 
                    onConfirm={onConfirm} 
                    onClose={handleConfirmPopupClose} 
                />
            }
            {isCancelPopupOpen && 
                <ConfirmationPopUp
                    context={appId == null
                            ? 
                            "Είστε σίγουρος/η ότι θέλετε να ακυρώσετε την δημιουργία της αίτησης; Η αίτηση δεν θα αποθηκευτεί." 
                            : 
                            "Είστε σίγουρος/η ότι θέλετε να ακυρώσετε την επεξεργασία της αίτησης;"
                        } 
                    onConfirm={onCancel} 
                    onClose={handleCancelPopupClose} 
                />
            }
        </div>
    )
}

export default ApplicationCreate;