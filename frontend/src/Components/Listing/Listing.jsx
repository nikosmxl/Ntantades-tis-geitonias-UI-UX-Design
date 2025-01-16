import s from "./ListingStyle.module.css"
import troll_prof from "../../Assets/Pictures/troll_prof.jpg"
import Timetable from "../Timetable/Timetable";
import { useEffect, useState } from "react";
import ExpandButtons from "../ExpandButtons/ExpandButtons";
import { useNavigate } from "react-router-dom";
import { getDoc } from "firebase/firestore";
import { languageOptions, servicesMapper, specializationOptions } from "../../utils/options";
import { getDateFromMs, getFormattedDate } from "../../utils/date";

function Listing({ isHistory = false, isEditable = false, onDelete, listing }){
    const [babysitter, setBabysitter] = useState({})

    const fetchData = async () => {
      const babysitterSnap = await getDoc(listing.babysitter);

      const fetchedData = babysitterSnap.data();
      setBabysitter(fetchedData);
    };

    useEffect(() => {
      fetchData();
    }, [listing]);

    const [isExpanded, setIsExpanded] = useState(false);
    const [isExpanded2, setIsExpanded2] = useState(false);

    const toggleIsExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    const toggleIsExpanded2 = () => {
        setIsExpanded2(!isExpanded2);
    };

    const setVariables = () => {
        toggleIsExpanded2();
        setTimeout(() => {
            toggleIsExpanded();
        }, 250);
    }

    const setVariables2 = () => {
        toggleIsExpanded2();
        toggleIsExpanded();
    }

    const navigate = useNavigate();

    return (
        <div className={s.listing_with_buttons}>
            <div className={`${s.listing} ${isExpanded2 ? s.open : ''}`}>
                <img src={babysitter?.profilePicture} alt="Profile" />
                <div className={`${s.second_column} ${!isExpanded ? s.collapsed : ''}`}>
                    <p><span>Ονοματεπώνυμο:</span>{babysitter?.name} {babysitter?.surname}</p>
                    <p><span>Ηλικία:</span>{babysitter?.age}</p>
                    <p><span>Προϋπηρεσία:</span>{babysitter?.experience}</p>
                    <p><span>Εμπειρία με παιδιά ηλικίας:</span></p>
                    <ul>
                        {(babysitter?.ageExperience ?? []).map((experience, index) => (
                            <li key={index}>
                                <p>{experience}</p>
                            </li>
                        ))}
                    </ul>
                    <p className={s.always_show}><span className={s.always_show}>Περιοχές εξυπηρέτησης:</span></p>
                    <ul className={s.always_show}>
                        {listing.areas.map((area, index) => (
                            <li key={index} className={s.region_areas_list}>
                                <p className={s.always_show}>{area.city.label}:</p>
                                <div className={s.areas_list}>
                                    {area.neighborhoods.map(neighborhood => neighborhood.label).join(", ")}
                                </div>
                            </li>
                        ))}
                    </ul>
                    <p>
                      <span>Γνώσεις ξένων γλωσσών:</span>
                      {
                        (babysitter?.languages ?? []).map(language => {
                          return languageOptions.find(languageOption => languageOption.value === language).label;
                        }).join(", ")
                      }
                    </p>
                    <p><span>Ειδίκευση σε:</span>
                      {
                        babysitter?.specialization && Object.keys(babysitter.specialization).filter((key) => babysitter.specialization[key]).map(specialization => {
                          return specializationOptions.find(specializationOption => specializationOption.name === specialization).label;
                        }).join(', ')
                      }
                    </p>
                    <p><span>Μετακίνηση παιδιών:</span>{listing.transportation === 'babysitterCar' ? 'Με Ι.Χ. Νταντάς' : 'Με Ι.Χ. Οικογένειας'}</p>
                    <p><span>Υπηρεσίες:</span></p>
                    <ul>
                        {(listing?.services ?? []).map((service, index) => (
                            <li key={index}>
                                <p>{servicesMapper[service]}</p>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={`${s.third_column} ${!isExpanded ? s.collapsed : ''}`}>
                    <p className={s.always_show}><span className={s.always_show}>Χρόνος απασχόλησης:</span>{listing.workingHours}</p>
                    <p><span>Διαθεσιμότητα και ώρες:</span></p>
                    <div className={s.timetable}>
                        <Timetable width="360px" height="200px" isEnabled={false} checkedSlots={listing.availability} />
                    </div>
                    <p><span>Διαθέσιμος/η από:</span>
                      {
                        listing.startingDate?.day ?
                        `${listing.startingDate.day}/${listing.startingDate.month}/${listing.startingDate.year}` :
                        'Άμεσα διαθέσιμος/η'
                      }
                    </p>
                    <p><span>Διαθέσιμος/η εώς:</span>
                      {
                        listing.endingDate?.day ?
                        `${listing.endingDate.day}/${listing.endingDate.month}/${listing.endingDate.year}` :
                        'Αόριστο'
                      }
                    </p>
                    <p><span>Λίγα λόγια:</span></p>
                    <p className={s.few_words}>{listing?.few_words ?? '-'}</p>
                </div>
                <p className={`${s.listing_date} ${!isExpanded ? s.collapsed : ''}`}>{getFormattedDate(getDateFromMs(listing.date))}</p>
            </div>
            <ExpandButtons isExpanded={isExpanded} toggleIsExpanded={isExpanded ? setVariables : setVariables2}
                showOptionsButtons={!isHistory} showDeleteButton={true}
                showEditButton={isEditable} 
                onDelete={() => onDelete()}
                onEdit={() => navigate(`/babysitter/listings/listing-create/${listing.id}`)}
            />
        </div>
    )
}

export default Listing;