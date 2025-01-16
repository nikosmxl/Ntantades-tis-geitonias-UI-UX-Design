import { useEffect, useMemo, useState } from "react";
import s from "./ListingCreateStyle.module.css"
import Select from 'react-select'
import Checkbox from "../../../Components/Checkbox/Checkbox";
import Timetable from "../../../Components/Timetable/Timetable";
import DateDropdowns from "../../../Components/DateDropdowns/DateDropdowns";
import ErrorFields from "../../../Components/ErrorFields/ErrorFields";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGavel, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faFloppyDisk } from "@fortawesome/free-regular-svg-icons";
import ConfirmationPopUp from "../../../PopUps/ConfirmationPopUp/ConfirmationPopUp";
import { useNavigate, useParams } from "react-router-dom";
import DropdownAreas from "../../../Components/DropdownAreas/DropdownAreas";
import Breadcrumbs from '../../../Components/Breadcrumbs/Breadcrumbs';
import { db } from '../../../firebase';
import { getDoc, doc, addDoc, setDoc, collection, getDocs, where, query } from "firebase/firestore";
import { servicesMapper, transportationOptions } from "../../../utils/options";

function ListingCreate(){
    const [babysitter, setBabysitter] = useState({});
    const [listing, setListing] = useState({});

    const [error, setError] = useState(null);
    const [isErrorVisible, setIsErrorVisible] = useState(false);
    
    const [isCancelPopupOpen, setIsCancelPopupOpen] = useState(false);
    const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);

    const params = useParams();
    const { listingId } = params;
    const navigate = useNavigate();
    const babysitterId = JSON.parse(localStorage.getItem('user'))['id'];
    const babysitterDocRef = useMemo(() => doc(db, 'Users', babysitterId), [babysitterId]);

    const fetchData = async () => {
      const babysitterSnap = await getDoc(babysitterDocRef);
  
      const fetchedBabysitterData = babysitterSnap.data();
      setBabysitter(fetchedBabysitterData);

      if (!listingId) return;

      const listingDocRef = doc(db, 'Listings', listingId);
      const listingSnap = await getDoc(listingDocRef);

      const fetchedListingData = listingSnap.data();
      setListing(fetchedListingData);
    };

    const calculateListingStatus = async () => {
      const q = query(
        collection(db, 'Listings'),
        where("status", "==", "publish"),
        where("babysitter", "==", babysitterDocRef),
      );
      const listingSnaps = await getDocs(q);
      const filteredListings = listingSnaps.docs.filter(doc => doc.id !== listingId);
    
      if (filteredListings.length > 0) return 'save';

      return 'publish';
    }

    const saveData = async () => {
      const status = await calculateListingStatus();
      if (!listingId) {
        await addDoc(collection(db, 'Listings'), { ...listing, status: status, babysitter: babysitterDocRef, date: Date.now()});
      } else {
        const listingDocRef = doc(db, 'Listings', listingId);
        await setDoc(listingDocRef, { ...listing, status: status, babysitter: babysitterDocRef});
      }
      return status;
    };

    useEffect(() => {
      fetchData();
    }, [babysitterId]);

    const dictionaries = {
        experience_with_ages: {
            "0-6 months": "0-6 μηνών",
            "6-12 months": "6-12 μηνών",
            "1-2 years": "1-2 ετών",
            ">2 years": ">2 ετών",
        },
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

    const openConfirmPopup = () => {
        setIsConfirmPopupOpen(true);
    }

    const handleConfirmPopupClose = () => {
        setIsConfirmPopupOpen(false); // Κλεινει το PopUp
    };

    const onConfirm = async () => {
      const status = await saveData();
      navigate('/babysitter/listings', {state: {status: status}});
    }

    const openCancelPopup = () => {
        setIsCancelPopupOpen(true);
    }

    const handleCancelPopupClose = () => {
        setIsCancelPopupOpen(false); // Κλεινει το PopUp
    };

    const onCancel = () => {
      navigate('/babysitter/listings');
    };

    const handleTemporarySave = async () => {
      await saveData();
      navigate('/babysitter/listings', {state: {status: 'save'}});
    };

    const handleCheckboxChange = (state, setState, value) => {
        if (state.includes(value)) {
            setState(state.filter(item => item !== value));
        } else {
            setState([...state, value]);
        }
    };

    const handleTransportationChange = (option) => {
      if (option.value !== listing?.transportation) {
        setListing({ ...listing, transportation: option.value });
      } else {
        const otherTransportationOption = transportationOptions.find(transportationOption => option.value !== transportationOption.value);
        setListing({ ...listing, transportation: otherTransportationOption.value });
      }
    };

    const handleFewWordsChange = (e) => {
        e.preventDefault();
        setListing({ ...listing, fewWords: e.target.value.trim() });
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
        
        const hasAtLeastOneCity = (listing?.areas ?? [{ city: null, neighborhoods: [] }]).some(area => area.city);
        const hasCityWithoutNeighborhoods = (listing?.areas ?? [{ city: null, neighborhoods: [] }]).some(area => area.city && area.neighborhoods.length === 0);

        if (!hasAtLeastOneCity) {
            missingFields.add("Περιοχές εξυπηρέτησης");
        } else if (hasCityWithoutNeighborhoods) {
            missingFields.add("Περιοχές εξυπηρέτησης (Συμπληρώστε τις γειτονίες σας σε κάθε πόλη)");
        }

        if (listing?.workingHours === null){
            missingFields.add("Χρόνος απασχόλησης");
        }
        if ((listing?.availability ?? []).length === 0){
            missingFields.add("Διαθεσιμότητα και ώρες");
        }
        if (Object.keys(listing?.startingDate ?? {}).length === 0){
            missingFields.add("Από πότε θα είστε διαθέσιμος/η;");
        }
        if (Object.keys(listing?.endingDate ?? {}).length === 0){
            missingFields.add("Εώς πότε θα είστε διαθέσιμος/η;");
        }
    
        if (missingFields.size === 0) {
            setError(null); // Όλα τα πεδία είναι συμπληρωμένα
        } else {
            const errorMessage = `Κάποια από τα υποχρεωτικά πεδία δεν συμπληρώθηκαν: ${Array.from(missingFields).join(", ")}`;
            setError(errorMessage);
        }
    }, [listing?.workingHours, listing?.availability, listing?.startingDate, listing?.endingDate, listing?.areas]);

    return (
        <div className={s.container}>
            <div className={s.breadcrumbs}>
                <Breadcrumbs
                  breadcrumbItems={[
                    { label: 'Αρχική Σελίδα', route: ''},
                    { label: 'Αγγελίες', route: 'listings'},
                    { label: 'Δημιουργία νέας Αγγελίας', route: '.'},
                  ]}
                />
            </div>

            <h3 className={s.title}>Δημιουργία νέας Αγγελίας</h3>
            <p className={s.note}>Τα πεδία με <span>Κόκκινο</span> είναι αμετάβλητα. Επεξεργαστείτε το Προφίλ για να τα αλλάξετε.</p>
            <p className={s.note}>Τα πεδία με αστερίσκο (*) είναι υποχρεωτικά.</p>
            <hr/>

            <div className={s.application_create_container}>
                <div className={s.red_field}>
                    <label htmlFor="fullname">Ονοματεπώνυμο:</label>
                    <input type="text" id="fullname" value={`${babysitter?.name} ${babysitter?.surname}`} readOnly />
                </div>

                <div className={s.red_field}>
                    <label htmlFor="age">Ηλικία:</label>
                    <input type="text" id="age" value={babysitter?.age} readOnly />
                </div>

                <div className={s.years_of_experience}>
                    <b>Προϋπηρεσία*:</b>
                    <Select
                        placeholder={babysitter?.experience}
                        isDisabled={true}
                        styles={{
                            container: (provided) => ({
                                ...provided,
                                width: '230px',
                            }),
                            placeholder: (provided) => ({
                                ...provided,
                                color: 'rgba(255, 0, 0, 0.8)',
                            }),
                        }}
                    />
                </div>

                <div className={s.checkbox_area}>
                    <b>Εμπειρία με παιδιά ηλικίας</b>
                    {Object.entries(dictionaries.experience_with_ages).map(([xp, translation]) => (
                        <Checkbox
                            key={xp}
                            name="experienceWithAge"
                            isChecked={(babysitter?.ageExperience ?? []).includes(translation)}
                            readOnly
                            isEnabled={false}
                            isRed
                            label={translation}
                        />
                    ))}
                </div>

                <div className={s.working_places}>
                    <b>Περιοχές  εξυπηρέτησης*</b>
                    <div className={s.dropdowns_area}>
                        <DropdownAreas areas={listing?.areas ?? [{ city: null, neighborhoods: [] }]} setAreas={(newAreas) => setListing({ ...listing, areas: newAreas, })} />
                    </div>
                </div>

                <div className={s.working_hours}>
                    <b>Χρόνος απασχόλησης*</b>
                    {["Πλήρης απασχόληση", "Μερική απασχόληση"].map(option => (
                        <Checkbox
                            key={option}
                            name="workinghrs"
                            isChecked={listing?.workingHours === option}
                            onChange={() => setListing({
                              ...listing,
                              workingHours: option,
                            })}
                            label={option}
                        />
                    ))}
                </div>

                <div className={s.calendar_area}>
                    <b>Διαθεσιμότητα και ώρες*</b>
                    <Timetable width="400px" height="220px" onChange={(newAvailabilityList) => setListing({ ...listing, availability: newAvailabilityList, })} checkedSlots={listing?.availability ?? []} />
                </div>

                <div className={s.starting_date}>
                    <b>Από πότε θα είστε διαθέσιμος/η;*</b>
                    <Checkbox 
                        name={"startingDate"}
                        isChecked={listing?.startingDate === "Anytime"}
                        onChange={() => {
                            if (listing?.startingDate === "Anytime") {
                                setListing({ ...listing, startingDate: {}, }); // Επαναφορά του startingDate για να είναι editable
                            } else {
                                setListing({ ...listing, startingDate: "Anytime", }); // Ορισμός ως "Anytime"
                            }
                        }}
                        label={"Άμεσα διαθέσιμος/η"}
                    />
                    <div className={s.date_dropdowns_area}>
                        <DateDropdowns
                            day={listing?.startingDate?.day ?? null}
                            month={listing?.startingDate?.month ?? null}
                            year={listing?.startingDate?.year ?? null}
                            isEnabled={listing?.startingDate !== "Anytime"}
                            onChange={(newStartDate) => {
                                setListing({ ...listing, startingDate: newStartDate });
                            }}
                        />
                    </div>
                </div>

                <div className={s.ending_date}>
                    <b>Εώς πότε θα είστε διαθέσιμος/η;*</b>
                    <Checkbox 
                        name={"endingDate"}
                        isChecked={listing?.endingDate === "Anytime"}
                        onChange={() => {
                            if (listing?.endingDate === "Anytime") {
                                setListing({ ...listing, endingDate: {}, }); // Επαναφορά του startingDate για να είναι editable
                            } else {
                                setListing({ ...listing, endingDate: "Anytime", }); // Ορισμός ως "Anytime"
                            }
                        }}
                        label={"Αορίστου χρόνου"}
                    />
                    <div className={s.date_dropdowns_area}>
                        <DateDropdowns
                            day={listing?.endingDate?.day ?? null}
                            month={listing?.endingDate?.month ?? null}
                            year={listing?.endingDate?.year ?? null}
                            isEnabled={listing?.endingDate !== "Anytime"}
                            onChange={(newEndingDate) => {
                                setListing({ ...listing, endingDate: newEndingDate });
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
                            isChecked={(babysitter?.specialization ?? {})[option]}
                            readOnly
                            isEnabled={false}
                            isRed
                            label={option === "specialNeeds" ? "ΑμεΑ" : "Νοηματική"}
                        />
                    ))}
                </div>

                <div className={s.checkbox_area}>
                    <b>Μετακίνηση παιδιών</b>
                    {transportationOptions.map(option => (
                        <Checkbox
                            key={option}
                            name={"transportation"}
                            isChecked={(listing?.transportation ?? '') === option.value}
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
                            name="language"
                            isChecked={(babysitter?.languages ?? []).includes(language)}
                            isEnabled={false}
                            isRed
                            label={translation}
                        />
                    ))}
                </div>
                
                <div className={s.checkbox_area}>
                    <b>Υπηρεσίες</b>
                    {Object.entries(dictionaries.services).map(([service, translation]) => (
                        <Checkbox
                            key={service}
                            name="services"
                            isChecked={(listing?.services ?? []).includes(service)}
                            onChange={() => handleCheckboxChange(listing?.services ?? [], (newServices) => setListing({ ...listing, services: newServices }), service)}
                            label={translation}
                        />
                    ))}
                </div>

                <div className={s.few_words_area}>
                    <b>Λίγα λόγια</b>
                    <textarea
                        className={s.few_words}
                        value={listing?.fewWords}
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
                        onClick={handleTemporarySave}
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
                    context={"Είστε σίγουρος ότι θέλετε να υποβάλετε οριστικά την αγγελία;"} 
                    onConfirm={onConfirm} 
                    onClose={handleConfirmPopupClose} 
                />
            }
            {isCancelPopupOpen && 
                <ConfirmationPopUp
                    context={listingId == null
                            ? 
                            "Είστε σίγουρος/η ότι θέλετε να ακυρώσετε την δημιουργία της αγγελίας; Η αγγελία δεν θα αποθηκευτεί." 
                            : 
                            "Είστε σίγουρος/η ότι θέλετε να ακυρώσετε την επεξεργασία της αγγελίας;"
                        } 
                    onConfirm={onCancel} 
                    onClose={handleCancelPopupClose} 
                />
            }
        </div>
    )
}

export default ListingCreate;