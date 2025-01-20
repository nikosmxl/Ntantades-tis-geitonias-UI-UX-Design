import s from "./BabysitterPartnershipStyle.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClockRotateLeft } from "@fortawesome/free-solid-svg-icons";
import Partnership from "../../../Components/Partnership/Partnership";
import ListHeader from "../../../Components/ListHeader/ListHeader";
import { useState, useMemo, useEffect } from "react";
import Pagination from "../../../Components/Pagination/Pagination";
import { useNavigate, useLocation } from "react-router-dom";
import Breadcrumbs from "../../../Components/Breadcrumbs/Breadcrumbs";
import { getAverageRating } from "../../../utils/calc";
import NotificationPopUp from '../../../PopUps/NotificationPopUp/NotificationPopUp';
import { db } from '../../../firebase';
import { collection, getDocs, where, query, doc, setDoc, orderBy, getDoc } from "firebase/firestore";

function BabysitterPartnership(){
    const navigate = useNavigate();

    const location = useLocation();
    const [status, setStatus] = useState(location?.state?.status ?? null);
    
    const [partnerships, setPartnerships] = useState({});

    const [futurePartnershipsPageSize, setFuturePartnershipsPageSize] = useState(3);
    const [futurePartnershipsSorting, setFuturePartnershipsSorting] = useState("Πιο πρόσφατη");
    const futurePartnershipsSortingOptions = ["Πιο πρόσφατη", "Λιγότερο πρόσφατη"];
    const [futurePartnershipCurrentPage, setFuturePartnershipCurrentPage] = useState(1);

    const [editablePartnershipsPageSize, setEditablePartnershipsPageSize] = useState(3);
    const [editablePartnershipsSorting, setEditablePartnershipsSorting] = useState("Πιο πρόσφατη");
    const editablePartnershipsSortingOptions = ["Πιο πρόσφατη", "Λιγότερο πρόσφατη"];
    const [editablePartnershipsCurrentPage, setEditablePartnershipsCurrentPage] = useState(1);

    const babysitterId = useMemo(() => JSON.parse(localStorage.getItem('user'))['id'], []);

    const fetchData = async () => {
        const babysitterDocRef = doc(db, 'Users', babysitterId);
        const spq = query(
            collection(db, 'Partnerships'),
            where("status", "in", ["running", "future"]),
            where("babysitter", "==", babysitterDocRef),
            orderBy("dateCreated", futurePartnershipsSorting === "Πιο πρόσφατη" ? 'desc' : 'asc')
        );
        const submittedPartnershipSnaps = await getDocs(spq);
        const fetchedSubmittedPartnerships = submittedPartnershipSnaps.docs.map(snap => ({ ...snap.data(), id: snap.id}));
        const runningPartnership = fetchedSubmittedPartnerships.find(p => p.status === 'running');
        const futurePartnerships = fetchedSubmittedPartnerships.filter(p => p != runningPartnership);

        const sentpq = query(
            collection(db, 'Partnerships'),
            where("status", "in", ["sent", "declined"]),
            where("babysitter", "==", babysitterDocRef),
            orderBy("dateCreated", editablePartnershipsSorting === "Πιο πρόσφατη" ? 'desc' : 'asc')
        );
        const sentPartnershipSnaps = await getDocs(sentpq);
        const sentPartnerships = sentPartnershipSnaps.docs.map(snap => ({ ...snap.data(), id: snap.id}));

        sortData(runningPartnership, futurePartnerships, sentPartnerships);
    };

    useEffect(() => {
        fetchData();
    }, [futurePartnershipsSorting, editablePartnershipsSorting]);

    const sortData = async (runningPartnership, futurePartnerships, sentPartnerships) => {
      switch (futurePartnershipsSorting) {
        case 'Πιο πρόσφατη':
            futurePartnerships.sort((partnershipA, partnershipB) => {
                return getAverageRating(partnershipB) - getAverageRating(partnershipA);
            });
            break;
        case 'Λιγότερο πρόσφατη':
            futurePartnerships.sort((partnershipA, partnershipB) => {
                return getAverageRating(partnershipA) - getAverageRating(partnershipB);
            });
            break;
      }
      switch (editablePartnershipsSorting) {
        case 'Πιο πρόσφατη':
            sentPartnerships.sort((partnershipA, partnershipB) => {
                return getAverageRating(partnershipB) - getAverageRating(partnershipA);
            });
            break;
        case 'Λιγότερο πρόσφατη':
            sentPartnerships.sort((partnershipA, partnershipB) => {
                return getAverageRating(partnershipA) - getAverageRating(partnershipB);
            });
            break;
      }
  
      setPartnerships({
        runningPartnership: runningPartnership,
        futurePartnerships: futurePartnerships,
        editablePartnerships: sentPartnerships,
      });
    };

    const futurePartnershipsByPage = useMemo(() => {
        return (partnerships?.futurePartnerships ?? []).slice(
            (futurePartnershipCurrentPage-1)*futurePartnershipsPageSize,
            futurePartnershipCurrentPage*futurePartnershipsPageSize
        );
    }, [futurePartnershipCurrentPage, futurePartnershipsPageSize, partnerships.futurePartnerships]);

    const futurePartnershipsPages = useMemo(() => {
        return Math.ceil((partnerships?.futurePartnerships ?? []).length / futurePartnershipsPageSize)
    }, [futurePartnershipsPageSize, partnerships.futurePartnerships]);

    const editablePartnershipsByPage = useMemo(() => {
        return (partnerships?.editablePartnerships ?? []).slice(
            (editablePartnershipsCurrentPage-1)*editablePartnershipsPageSize,
            editablePartnershipsCurrentPage*editablePartnershipsPageSize
        );
    }, [editablePartnershipsCurrentPage, editablePartnershipsPageSize, partnerships.editablePartnerships]);

    const editablePartnershipsPages = useMemo(() => {
        return Math.ceil((partnerships?.editablePartnerships ?? []).length / editablePartnershipsPageSize)
    }, [editablePartnershipsPageSize, partnerships.editablePartnerships]);
    
    return (
        <div className={s.partnership_page}>
            {
            status != null && (
                <NotificationPopUp
                status={status !== 'sent' ? 'success' : status}
                message={status !== 'sent' ? 'Το συμφωνητικό συνεργασίας σας στάλθηκε επιτυχώς.' : 'Το συμφωνητικό συνεργασίας σας έχει αποθηκευτεί προσωρινά. Βρείτε το στα Υπο Επεξεργασία Συμφωνητικά Συνεργασίας.'}
                onClose={() => setStatus(null)}
                />
            )
            }
            <div className={s.breadcrumbs}>
                <Breadcrumbs
                  breadcrumbItems={[
                    { label: 'Αρχική Σελίδα', route: '' },
                    { label: 'Συνεργασία', route: '.' },
                  ]}
                />
            </div>
            <div className={s.title_history_row}>
                <h3>Οι συνεργασίες μου</h3>
                <button className={s.history_button}>
                    <FontAwesomeIcon icon={faClockRotateLeft} onClick={() => navigate('/babysitter/history/partnerships')}/>
                    Ιστορικό συνεργασιών
                </button>
            </div>
            
            <b className={s.running_partnership_title}>Τρέχουσα συνεργασία</b>
            <div className={s.running_partnership}>
                {partnerships.runningPartnership &&
                    <Partnership 
                        partnership={partnerships.runningPartnership}
                        isParent={false} 
                        isRunning={true} 
                        isFuture={false} 
                        isSent={false} 
                        isPending={false} 
                        isEditable={false} 
                        isHistory={false} 
                    />
                }
            </div>

            <div className={s.list_header}>
                <ListHeader title={"Μελλοντικές συνεργασίες"} listElementName={"Συνεργασίες"} 
                    listSize={(partnerships?.futurePartnerships ?? []).length} pageSize={futurePartnershipsPageSize}
                    sorting={futurePartnershipsSorting} sortingOptions={futurePartnershipsSortingOptions}
                    onPageSizeChange={setFuturePartnershipsPageSize} onSortingChange={setFuturePartnershipsSorting}
                />
            </div>
            <div className={s.column}>
                {futurePartnershipsByPage.map(fp => {
                    return(
                        <Partnership 
                            key={fp.id}
                            partnership={fp}
                            isParent={false} 
                            isRunning={false} 
                            isFuture={true} 
                            isSent={false} 
                            isPending={false} 
                            isEditable={false} 
                            isHistory={false}
                        />
                    );
                }) 
                }
            </div>
            <Pagination pages={futurePartnershipsPages} currentPage={futurePartnershipCurrentPage}
                onChange={setFuturePartnershipCurrentPage} width="620px"
            />

            <div className={s.list_header}>
                <ListHeader title={"Εισερχόμενα συμφωνητικά"} listElementName={"Συμφωνητικά"} 
                    listSize={(partnerships?.editablePartnerships ?? []).length} pageSize={editablePartnershipsPageSize}
                    sorting={editablePartnershipsSorting} sortingOptions={editablePartnershipsSortingOptions}
                    onPageSizeChange={setEditablePartnershipsPageSize} onSortingChange={setEditablePartnershipsSorting}
                />
            </div>
            <div className={s.column}>
                {editablePartnershipsByPage.map(fp => {
                    return(
                        <Partnership 
                            key={fp.id}
                            partnership={fp}
                            isParent={false} 
                            isRunning={false} 
                            isFuture={false} 
                            isSent={false} 
                            isPending={true} 
                            isEditable={true} 
                            isHistory={false}
                        />
                    );
                }) 
                }
            </div>
            <Pagination pages={editablePartnershipsPages} currentPage={editablePartnershipsCurrentPage}
                onChange={setEditablePartnershipsCurrentPage} width="620px"
            />
        </div>
    )
}

export default BabysitterPartnership;