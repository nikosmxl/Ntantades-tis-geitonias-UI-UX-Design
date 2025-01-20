import s from "./ParentPartnershipStyle.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClockRotateLeft } from "@fortawesome/free-solid-svg-icons";
import Partnership from "../../../Components/Partnership/Partnership";
import ListHeader from "../../../Components/ListHeader/ListHeader";
import { useEffect, useMemo, useState } from "react";
import Pagination from "../../../Components/Pagination/Pagination";
import BabysitterGridView from '../../../Components/BabysitterGridView/BabysitterGridView';
import CreateRatingPopup from "../../../PopUps/CreateRatingPopup/CreateRatingPopup";
import { useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "../../../Components/Breadcrumbs/Breadcrumbs";
import { db } from '../../../firebase';
import { collection, getDocs, where, query, doc, setDoc, orderBy, getDoc } from "firebase/firestore";
import NotificationPopUp from "../../../PopUps/NotificationPopUp/NotificationPopUp";
import { getAverageRating } from "../../../utils/calc";

function ParentPartnership(){
    const navigate = useNavigate();

    const location = useLocation();
    const [status, setStatus] = useState(location?.state?.status ?? null);
    
    const [partnerships, setPartnerships] = useState({});
    const [babysitters, setBabysitters] = useState([]);

    const [futurePartnershipsPageSize, setFuturePartnershipsPageSize] = useState(3);
    const [futurePartnershipsSorting, setFuturePartnershipsSorting] = useState("Πιο πρόσφατη");
    const futurePartnershipsSortingOptions = ["Πιο πρόσφατη", "Λιγότερο πρόσφατη"];
    const [futurePartnershipCurrentPage, setFuturePartnershipCurrentPage] = useState(1);

    const [sentPartnershipsPageSize, setSentPartnershipsPageSize] = useState(3);
    const [sentPartnershipsSorting, setSentPartnershipsSorting] = useState("Πιο πρόσφατη");
    const sentPartnershipsSortingOptions = ["Πιο πρόσφατη", "Λιγότερο πρόσφατη"];
    const [sentPartnershipCurrentPage, setSentPartnershipCurrentPage] = useState(1);

    const [recommendedBabysittersPageSize, setRecommendedBabysittersPageSize] = useState(3);
    const [recommendedBabysittersSorting, setRecommendedBabysittersSorting] = useState("Αξιολόγηση (Φθίνουσα)");
    const recommendedBabysittersSortingOptions = ["Αξιολόγηση (Φθίνουσα)", "Αξιολόγηση (Αύξουσα)"];
    const [recommendedBabysittersCurrentPage, setRecommendedBabysittersCurrentPage] = useState(1);

    const [editablePartnershipsPageSize, setEditablePartnershipsPageSize] = useState(3);
    const [editablePartnershipsSorting, setEditablePartnershipsSorting] = useState("Πιο πρόσφατη");
    const editablePartnershipsSortingOptions = ["Πιο πρόσφατη", "Λιγότερο πρόσφατη"];
    const [editablePartnershipsCurrentPage, setEditablePartnershipsCurrentPage] = useState(1);

    const [showCreateRatingPopup, setShowCreateRatingPopup] = useState(false);
    
    const parentId = useMemo(() => JSON.parse(localStorage.getItem('user'))['id'], []);
    
    const [runningBabysitter, setRunningBabysitter] = useState({});

    const fetchData = async () => {
        const parentDocRef = doc(db, 'Users', parentId);
        const spq = query(
            collection(db, 'Partnerships'),
            where("status", "in", ["running", "future"]),
            where("parent", "==", parentDocRef),
            orderBy("dateCreated", futurePartnershipsSorting === "Πιο πρόσφατη" ? 'desc' : 'asc')
        );
        const submittedPartnershipSnaps = await getDocs(spq);
        const fetchedSubmittedPartnerships = submittedPartnershipSnaps.docs.map(snap => ({ ...snap.data(), id: snap.id}));
        const runningPartnership = fetchedSubmittedPartnerships.find(p => p.status === 'running');

        const babysitterSnap = await getDoc(runningPartnership.babysitter);
        const babysitterData = babysitterSnap.data();
        setRunningBabysitter({ ...babysitterData, id: babysitterData.id })

        const sentpq = query(
            collection(db, 'Partnerships'),
            where("status", "in", ["sent", "declined"]),
            where("parent", "==", parentDocRef),
            orderBy("dateCreated", sentPartnershipsSorting === "Πιο πρόσφατη" ? 'desc' : 'asc')
        );
        const sentPartnershipSnaps = await getDocs(sentpq);
        const sentPartnerships = sentPartnershipSnaps.docs.map(snap => ({ ...snap.data(), id: snap.id}));

        const savedpq = query(
            collection(db, 'Partnerships'),
            where("status", "==", "saved"),
            where("parent", "==", parentDocRef),
            orderBy("dateCreated", editablePartnershipsSorting === "Πιο πρόσφατη" ? 'desc' : 'asc')
            );
            const savedPartnershipSnaps = await getDocs(savedpq);
            const savedPartnerships = savedPartnershipSnaps.docs.map(snap => ({ ...snap.data(), id: snap.id}));

        setPartnerships({
            runningPartnership: runningPartnership,
            futurePartnerships: fetchedSubmittedPartnerships.filter(p => p != runningPartnership),
            sentPartnerships: sentPartnerships.filter(app => !app.isHistory),
            savedPartnerships: savedPartnerships,
        });

        const dq = query(
            collection(db, 'Dates'),
            where("parent", "==", parentDocRef),
        );
        const dateSnaps = await getDocs(dq);
        const babysittersWithDate = dateSnaps.docs.map(snap => snap.data().babysitter);
    
        const babysittersForPartnership = [];
        await Promise.all(babysittersWithDate.map(async (babysitter) => {
        const datesWithBabysitterSnaps = await getDocs(query(
            collection(db, 'Dates'),
            where('parent', '==', parentDocRef),
            where('babysitter', '==', babysitter),
        ));
    
        const partnershipsWithBabysitterSnaps = await getDocs(query(
            collection(db, 'parnt'),
            where('parent', '==', parentDocRef),
            where('babysitter', '==', babysitter),
        ));
    
        const shouldBeAvailableForPartnership = datesWithBabysitterSnaps.docs.length > partnershipsWithBabysitterSnaps.docs.length;
        if (shouldBeAvailableForPartnership && !babysittersForPartnership.find(babysitterForPartnership => babysitterForPartnership.id === babysitter.id)) {
            const babysitterSnap = await getDoc(babysitter);
            babysittersForPartnership.push({ ...babysitterSnap.data(), id: babysitter.id });
        }
        }));

        await setHistory(sentPartnerships.filter(app => !app.isHistory));
        sortData(
            runningPartnership,
            fetchedSubmittedPartnerships.filter(p => p != runningPartnership),
            sentPartnerships.filter(app => !app.isHistory),
            babysittersForPartnership,
            savedPartnerships
        );
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

    const sentPartnershipsByPage = useMemo(() => {
        return (partnerships?.sentPartnerships ?? []).slice(
            (sentPartnershipCurrentPage-1)*sentPartnershipsPageSize,
            sentPartnershipCurrentPage*sentPartnershipsPageSize
        );
    }, [sentPartnershipCurrentPage, sentPartnershipsPageSize, partnerships.sentPartnerships]);

    const sentPartnershipsPages = useMemo(() => {
        return Math.ceil((partnerships?.sentPartnerships ?? []).length / sentPartnershipsPageSize)
    }, [sentPartnershipsPageSize, partnerships.sentPartnerships]);

    const savedPartnershipsByPage = useMemo(() => {
        return (partnerships?.savedPartnerships ?? []).slice(
            (editablePartnershipsCurrentPage-1)*editablePartnershipsPageSize,
            editablePartnershipsCurrentPage*editablePartnershipsPageSize
        );
    }, [editablePartnershipsCurrentPage, editablePartnershipsPageSize, partnerships.savedPartnerships]);

    const savedPartnershipsPages = useMemo(() => {
        return Math.ceil((partnerships?.savedPartnerships ?? []).length / editablePartnershipsPageSize)
    }, [editablePartnershipsPageSize, partnerships.savedPartnerships]);

    const recommendedBabsittersByPage = useMemo(() => {
      return babysitters.slice(
        (recommendedBabysittersCurrentPage-1)*recommendedBabysittersPageSize,
        recommendedBabysittersCurrentPage*recommendedBabysittersPageSize
      );
    }, [recommendedBabysittersCurrentPage, recommendedBabysittersPageSize, babysitters]);
  
    const recommendedBabysittersPages = useMemo(() => {
      return Math.ceil(babysitters.length / recommendedBabysittersPageSize)
    }, [recommendedBabysittersPageSize, babysitters]);

    useEffect(() => {
        fetchData();
    }, [futurePartnershipsSorting, editablePartnershipsSorting, sentPartnershipsSorting]);

    const sortData = async (
        runningPartnership,
        futurePartnerships,
        sentPartnerships,
        babysittersForPartnership,
        savedPartnerships
    ) => {
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
        switch (sentPartnerships) {
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
        switch (recommendedBabysittersSorting) {
            case 'Αξιολόγηση (Φθίνουσα)':
                babysittersForPartnership.sort((babysitterA, babysitterB) => {
                    return getAverageRating(babysitterB) - getAverageRating(babysitterA);
                });
                break;
            case 'Αξιολόγηση (Αύξουσα)':
                babysittersForPartnership.sort((babysitterA, babysitterB) => {
                    return getAverageRating(babysitterA) - getAverageRating(babysitterB);
                });
                break;
        }
        switch (savedPartnerships) {
            case 'Πιο πρόσφατη':
                savedPartnerships.sort((partnershipA, partnershipB) => {
                    return getAverageRating(partnershipB) - getAverageRating(partnershipA);
                });
                break;
            case 'Λιγότερο πρόσφατη':
                savedPartnerships.sort((partnershipA, partnershipB) => {
                    return getAverageRating(partnershipA) - getAverageRating(partnershipB);
                });
                break;
        }

      setBabysitters(babysitters);
      setPartnerships({
        runningPartnership: runningPartnership,
        futurePartnerships: futurePartnerships,
        sentPartnerships: sentPartnerships,
        babysitters: babysittersForPartnership,
        savedPartnerships: savedPartnerships,
      });
    };

    const setOutdated = async () => {
        const runningPartnershipDocRef = doc(db, 'Partnerships', partnerships.runningPartnership.id);
        await setDoc(
            runningPartnershipDocRef,
            {
                ...partnerships.runningPartnership,
                status: "outdated",
            }
        );
    };

    const setHistory = async (sentPartnerships) => {
        const declinedPartnerships = sentPartnerships.filter(p => {
            return p.status == 'decline';
        });

        await Promise.all(declinedPartnerships.map(async (declinedPartnership) => {
            const declinedPartnershipDocRef = doc(db, 'Partnerships', declinedPartnership.id);
            await setDoc(
                declinedPartnershipDocRef,
                {
                    ...declinedPartnership,
                    isHistory: true,
                }
            );
        }));
    };

    const handlePartnershipDelete = async (partnership) => {
        // api call to delete
        const partnershipDocRef = doc(db, 'Partnerships', partnership.id);
        await setDoc(
            partnershipDocRef,
            {
                ...partnership,
                status: 'delete',
            }
        );
        await fetchData();
    };

    return (
        <div className={s.partnership_page}>
            {
              status != null && (
                <NotificationPopUp
                  status={status === 'sent' ? 'success' : status}
                  message={status === 'sent' ? 'Το συμφωνητικό συνεργασίας σας στάλθηκε επιτυχώς.' : 'Το συμφωνητικό συνεργασίας σας έχει αποθηκευτεί προσωρινά. Βρείτε το στα Υπο Επεξεργασία Συμφωνητικά Συνεργασίας.'}
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
                <button className={s.history_button} onClick={() => navigate('/parent/history/partnerships')}>
                    <FontAwesomeIcon icon={faClockRotateLeft} />
                    Ιστορικό συνεργασιών
                </button>
            </div>
            
            <b className={s.running_partnership_title}>Τρέχουσα συνεργασία</b>
            <div className={s.running_partnership}>
                {partnerships.runningPartnership &&
                    <Partnership 
                        partnership={partnerships.runningPartnership}
                        isParent={true} 
                        isRunning={true} 
                        isFuture={false} 
                        isSent={false} 
                        isPending={false} 
                        isEditable={false} 
                        isHistory={false} 
                        onDelete={handlePartnershipDelete}
                        onCreateRating={() => setShowCreateRatingPopup(true)}
                        onTerminate={() => setOutdated()}
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
                            isParent={true} 
                            isRunning={false} 
                            isFuture={true} 
                            isSent={false} 
                            isPending={false} 
                            isEditable={false} 
                            onDelete={handlePartnershipDelete}
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
                <ListHeader title={"Απεσταλμένα συμφωνητικά"} listElementName={"Συμφωνητικά"} 
                    listSize={(partnerships?.sentPartnerships ?? []).length} pageSize={sentPartnershipsPageSize}
                    sorting={sentPartnershipsSorting} sortingOptions={sentPartnershipsSortingOptions}
                    onPageSizeChange={setSentPartnershipsPageSize} onSortingChange={setSentPartnershipsSorting}
                />
            </div>
            <div className={s.column}>
                {sentPartnershipsByPage.map(fp => {
                    return(
                        <Partnership 
                            key={fp.id}
                            partnership={fp}
                            isParent={true} 
                            isRunning={fp.status === "running"} 
                            isFuture={fp.status === "future"} 
                            isSent={fp.status === "sent"} 
                            isPending={fp.status !== "declined"} 
                            isEditable={false} 
                            onDelete={handlePartnershipDelete}
                            isHistory={false}
                        />
                    );
                }) 
                }
            </div>
            <Pagination pages={sentPartnershipsPages} currentPage={sentPartnershipCurrentPage}
                onChange={setSentPartnershipCurrentPage} width="620px"
            />

            <div className={s.list_header}>
                <ListHeader title={"Υπογράψτε νέο συμφωνητικό"} listElementName={"Διαθέσιμες νταντάδες"} 
                    listSize={babysitters.length} pageSize={recommendedBabysittersPageSize}
                    sorting={recommendedBabysittersSorting} sortingOptions={recommendedBabysittersSortingOptions}
                    onPageSizeChange={setRecommendedBabysittersPageSize} onSortingChange={setRecommendedBabysittersSorting}
                />
            </div>
            <div className={s.column}>
                <BabysitterGridView
                    babysitters={recommendedBabsittersByPage}
                />
            </div>
            {/* Εδώ θα μπουν τα dates */}
            <Pagination pages={recommendedBabysittersPages} currentPage={recommendedBabysittersCurrentPage}
                onChange={setRecommendedBabysittersCurrentPage} width="620px"
            />
            
            <div className={s.list_header}>
                <ListHeader title={"Υπό επεξεργασία Συμφωνητικά Συνεργασίας"} listElementName={"Συμφωνητικά"} 
                    listSize={(partnerships?.savedPartnerships ?? []).length} pageSize={editablePartnershipsPageSize}
                    sorting={editablePartnershipsSorting} sortingOptions={editablePartnershipsSortingOptions}
                    onPageSizeChange={setEditablePartnershipsPageSize} onSortingChange={setEditablePartnershipsSorting}
                />
            </div>
            <div className={s.column}>
                {savedPartnershipsByPage.map(fp => {
                    return(
                        <Partnership 
                            key={fp.id}
                            partnership={fp}
                            isParent={true} 
                            isRunning={false} 
                            isFuture={false} 
                            isSent={false} 
                            isPending={false} 
                            isEditable={true} 
                            onDelete={handlePartnershipDelete}
                            isHistory={false}
                        />
                    );
                }) 
                }
            </div>
            <Pagination pages={savedPartnershipsPages} currentPage={editablePartnershipsCurrentPage}
                onChange={setEditablePartnershipsCurrentPage} width="620px"
            />

            {
              showCreateRatingPopup && (
                <CreateRatingPopup
                  babysitter={runningBabysitter}
                  onCreate={() => {
                    // api call to create rating
                    setShowCreateRatingPopup(false);
                  }}
                  onClose={() => setShowCreateRatingPopup(false)}
                />
              )
            }
        </div>
    )
}

export default ParentPartnership;