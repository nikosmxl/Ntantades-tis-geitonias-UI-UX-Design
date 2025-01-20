import s from "./PartnershipStyle.module.css"
import Timetable from "../Timetable/Timetable";
import { useEffect, useState } from "react";
import ConfirmationPopUp from "../../PopUps/ConfirmationPopUp/ConfirmationPopUp";
import ExpandButtons from "../ExpandButtons/ExpandButtons";
import DateDropdowns from '../DateDropdowns/DateDropdowns';
import StyledSelect from "../StyledSelect/StyledSelect";
import { useNavigate } from "react-router-dom";
import { getDateFromMs, getDateFromObj, getFormattedDate } from "../../utils/date";
import { getDoc } from "firebase/firestore";

function Partnership({partnership, isParent = true, isRunning = true, isFuture = false, isSent = false, isPending = false, isHistory = false, isEditable = false, onCreateRating, onDelete, onTerminate}){
    const [isExpanded, setIsExpanded] = useState(false);
    const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
    const isPartnershipOver = getDateFromObj(partnership?.endingDate) < getDateFromMs(Date.now());
    const isPayAvailable = true;

    const [shownUser, setShownUser] = useState({})

    const fetchData = async () => {
        if (isParent) {
            const babysitterSnap = await getDoc(partnership.babysitter);
            const fetchedBabysitterData = babysitterSnap.data();
            setShownUser({ ...fetchedBabysitterData, id: partnership.babysitter.id });
        } else {
            const parentSnap = await getDoc(partnership.parent);
            const fetchedParentData = parentSnap.data();
            setShownUser({ ...fetchedParentData, id: partnership.parent.id });
        }
    };

    useEffect(() => {
        fetchData();
    }, [partnership]);

    const navigate = useNavigate();

    const toggleIsExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    const openConfirmPopup = () => {
        setIsConfirmPopupOpen(true);
    }

    const handleConfirm = () => {
        onTerminate();
    };

    const handleConfirmPopupClose = () => {
        setIsConfirmPopupOpen(false); // Closes popup
    };

    const handleViewPartnership = () => {
      navigate(`/partnership/${partnership.id}`);
    };

    const handleUserClick = () => {
      if (!isParent) return navigate(`/babysitter/parent-details/${partnership.parent.id}`);

      navigate(`/parent/babysitter-details/${partnership.babysitter.id}`);
    };

    const handleMonthCompletion = () => {
      // api call to complete month
      if (isParent) return;

      navigate('/babysitter/history/payments');
    };

    const handleRenew = () => {
      navigate(`sign-partnership/${partnership.id}`);
    }
  
    return (
        <div className={s.partnership_with_buttons}>
            <div className={`${s.partnership} ${isExpanded ? s.open : ''} ${((isParent && isSent) || isHistory) ? (isPending ? s.pending : s.declined) : ''}`}>
                {isRunning && 
                    <span className={`${s.partnership_dot} ${!isParent || isExpanded || !isPayAvailable ? s.disabled : ''}`}></span>
                }
                <div className={s.partnership_row}>
                    <img src={shownUser?.profilePicture} alt="Profile" onClick={handleUserClick}/>
                    <div className={s.second_column}>
                        <p><span>Ονοματεπώνυμο:</span>{shownUser?.name} {shownUser?.surname}</p>
                        <p><span>Χρόνος απασχόλησης:</span>{partnership?.workingHours}</p>
                        <div className={`${s.timetable_to_hide} ${!isExpanded ? s.hidden : ''}`}>
                            <p className={s.underline}><span>Διαθεσιμότητα και ώρες</span></p>
                            <div>
                                <Timetable width="360px" height="200px" isEnabled={false} checkedSlots={partnership?.availability} />
                            </div>
                        </div>
                    </div>
                    <div className={s.third_column}>
                        <div className={`${s.section_to_hide} ${!isExpanded ? s.hidden : ''}`}>
                            <p className={s.underline}><span>Περιοχές εξυπηρέτησης</span></p>
                            <div className={s.dropdown}>
                                <StyledSelect
                                  isDisabled
                                  value={{value: partnership?.area, label: partnership?.area}}
                                />
                                <div className={s.inner_dropdown}>
                                    <StyledSelect
                                      isDisabled
                                      value={{value: partnership?.neighbourhood, label: partnership?.neighbourhood}}
                                    />
                                </div>
                            </div>
                            <p><span>Οδός εξυπηρέτησης:</span>{partnership?.address}</p>
                        </div>
                        <p className={s.underline}><span>Ημερομηνία έναρξης συνεργασίας</span></p>
                        <div className={s.dropdown_row}>
                          <DateDropdowns
                            day={partnership?.startingDate?.day ?? null}
                            month={partnership?.startingDate?.month ?? null}
                            year={partnership?.startingDate?.year ?? null}
                            isEnabled={false}
                          />
                        </div>
                        <div className={`${s.dropdown_to_hide} ${!isExpanded ? s.hidden : ''}`}>
                            <p className={s.underline}><span>Ημερομηνία λήξης συνεργασίας</span></p>
                            <div className={s.dropdown_row}>
                              <DateDropdowns
                                day={partnership?.endingDate?.day ?? null}
                                month={partnership?.endingDate?.month ?? null}
                                year={partnership?.endingDate?.year ?? null}
                                isEnabled={false}
                              />
                            </div>
                        </div>
                    </div>
                    {((isParent && isSent) || isHistory) && (
                        isPending ? (
                            <p className={`${s.status} ${s.yellow} ${!isExpanded ? s.collapsed : ''}`}>Εκκρεμεί απάντηση...</p>
                        ):(
                            <p className={`${s.status} ${s.red} ${!isExpanded ? s.collapsed : ''}`}>Απορρίφθηκε</p>
                        )
                    )}
                    <p className={`${s.partnership_date} ${!isExpanded ? s.collapsed : ''}`}>{getFormattedDate(getDateFromMs(partnership.dateCreated))}</p>
                </div>
                {(isRunning || isHistory || isFuture) &&
                    <div className={`${s.partnership_buttons_row} ${!isExpanded ? s.collapsed : ''}`}>
                        <button
                          className={s.view_agreement_button}
                          onClick={handleViewPartnership}
                        >
                            ΠΡΟΒΟΛΗ ΣΥΜΦΩΝΗΤΙΚΟΥ ΣΥΝΕΡΓΑΣΙΑΣ
                        </button>
                        {isRunning &&
                            <>
                                {isParent &&
                                    <button className={`${s.end_partnership_button} ${!isPartnershipOver ? s.disabled : ''}`} onClick={openConfirmPopup}>
                                        ΛΗΞΗ ΣΥΝΕΡΓΑΣΙΑΣ
                                    </button>
                                }
                                {isPartnershipOver && !isPayAvailable
                                ?
                                    <button className={s.renew_button} onClick={handleRenew}>
                                        ΑΝΑΝΕΩΣΗ ΣΥΝΕΡΓΑΣΙΑΣ
                                    </button>
                                :
                                    <button className={`${s.complete_month_button} ${!isPayAvailable ? s.disabled : ''}`} onClick={handleMonthCompletion}>
                                        ΟΛΟΚΛΗΡΩΣΗ ΜΗΝΑ
                                        <span className={s.dot}></span>
                                    </button>
                                }
                            </>
                        }
                    </div>
                }
                {isParent && isPartnershipOver && isRunning &&
                    <div className={`${s.rate_button_area} ${!isExpanded ? s.collapsed : ''}`}>
                        <button className={s.rate_button} onClick={onCreateRating}>
                            ΑΞΙΟΛΟΓΗΣΗ
                        </button>
                    </div>
                }
            </div>
            <ExpandButtons isExpanded={isExpanded} toggleIsExpanded={toggleIsExpanded} 
                showOptionsButtons={isEditable} showDeleteButton={isParent} 
                showEditButton={true} onDelete={onDelete} onEdit={() => navigate(`../sign-partnership/${partnership.id}`)}
            />
            {isConfirmPopupOpen && 
                <ConfirmationPopUp onConfirm={handleConfirm} onClose={handleConfirmPopupClose}/>
            }
        </div>
    )
}

export default Partnership;