import s from "./ParentPartnershipStyle.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClockRotateLeft } from "@fortawesome/free-solid-svg-icons";
import Partnership from "../../../Components/Partnership/Partnership";
import ListHeader from "../../../Components/ListHeader/ListHeader";
import { useState } from "react";
import Pagination from "../../../Components/Pagination/Pagination";
import BabysitterGridView from '../../../Components/BabysitterGridView/BabysitterGridView';
import CreateRatingPopup from "../../../PopUps/CreateRatingPopup/CreateRatingPopup";

function ParentPartnership(){
    const [futurePartnershipsPageSize, setFuturePartnershipsPageSize] = useState(3);
    const [futurePartnershipsSorting, setFuturePartnershipsSorting] = useState("most recent");
    const futurePartnershipsSortingOptions = ["most recent", "least recent", "alphabetically"];
    const futurePartnershipPages = 5;
    const [futurePartnershipCurrentPage, setFuturePartnershipCurrentPage] = useState(1);

    const [sentPartnershipsPageSize, setSentPartnershipsPageSize] = useState(3);
    const [sentPartnershipsSorting, setSentPartnershipsSorting] = useState("most recent");
    const sentPartnershipsSortingOptions = ["most recent", "least recent", "alphabetically"];
    const sentPartnershipPages = 5;
    const [sentPartnershipCurrentPage, setSentPartnershipCurrentPage] = useState(1);

    const [recommendedBabysittersPageSize, setRecommendedBabysittersPageSize] = useState(3);
    const [recommendedBabysittersSorting, setRecommendedBabysittersSorting] = useState("most recent");
    const recommendedBabysittersSortingOptions = ["most recent", "least recent", "alphabetically"];
    const recommendedBabysittersPages = 5;
    const [recommendedBabysittersCurrentPage, setRecommendedBabysittersCurrentPage] = useState(1);

    const [editablePartnershipsPageSize, setEditablePartnershipsPageSize] = useState(3);
    const [editablePartnershipsSorting, setEditablePartnershipsSorting] = useState("most recent");
    const editablePartnershipsSortingOptions = ["most recent", "least recent", "alphabetically"];
    const editablePartnershipsPages = 5;
    const [editablePartnershipsCurrentPage, setEditablePartnershipsCurrentPage] = useState(1);

    const [showCreateRatingPopup, setShowCreateRatingPopup] = useState(false);
    
    const [babysitters, setBabysitters] = useState([
      { id: 1, name: 'Δήμητρα Χατζή'},
      { id: 2, name: 'Δήμητρα Χατζή'},
      { id: 3, name: 'Δήμητρα Χατζή'},
      { id: 4, name: 'Δήμητρα Χατζή'},
      { id: 5, name: 'Δήμητρα Χατζή'},
      { id: 6, name: 'Δήμητρα Χατζή'},
    ]);

    return (
        <div className={s.partnership_page}>
            <div className={s.breadcrumbs}>
                <p>Αρχική</p>
                <p>{">"}</p>
                <p>Συνεργασία</p>
            </div>
            <div className={s.title_history_row}>
                <h3>Οι συνεργασίες μου</h3>
                <button className={s.history_button}>
                    <FontAwesomeIcon icon={faClockRotateLeft} />
                    Ιστορικό συνεργασιών
                </button>
            </div>
            
            <b className={s.running_partnership_title}>Τρέχουσα συνεργασία</b>
            <div className={s.running_partnership}>
                <Partnership isParent={true} isRunning={true} isFuture={false} isSent={false} isPending={false} isEditable={false} isHistory={false} onCreateRating={() => setShowCreateRatingPopup(true)}/>
            </div>

            <div className={s.list_header}>
                <ListHeader title={"Μελλοντικές συνεργασίες"} listElementName={"Συνεργασίες"} 
                    listSize={100} pageSize={futurePartnershipsPageSize}
                    sorting={futurePartnershipsSorting} sortingOptions={futurePartnershipsSortingOptions}
                    onPageSizeChange={setFuturePartnershipsPageSize} onSortingChange={setFuturePartnershipsSorting}
                />
            </div>
            <div className={s.column}>
                <Partnership isParent={true} isRunning={false} isFuture={true} isSent={false} isPending={false} isEditable={false} isHistory={false}/>
                <Partnership isParent={true} isRunning={false} isFuture={true} isSent={false} isPending={false} isEditable={false} isHistory={false}/>
                <Partnership isParent={true} isRunning={false} isFuture={true} isSent={false} isPending={false} isEditable={false} isHistory={false}/>
            </div>
            <Pagination pages={futurePartnershipPages} currentPage={futurePartnershipCurrentPage}
                onChange={setFuturePartnershipCurrentPage} width="620px"
            />

            <div className={s.list_header}>
                <ListHeader title={"Απεσταλμένα συμφωνητικά"} listElementName={"Συμφωνητικά"} 
                    listSize={100} pageSize={sentPartnershipsPageSize}
                    sorting={sentPartnershipsSorting} sortingOptions={sentPartnershipsSortingOptions}
                    onPageSizeChange={setSentPartnershipsPageSize} onSortingChange={setSentPartnershipsSorting}
                />
            </div>
            <div className={s.column}>
                <Partnership isParent={true} isRunning={false} isFuture={false} isSent={true} isPending={true} isEditable={false} isHistory={false}/>
                <Partnership isParent={true} isRunning={false} isFuture={false} isSent={true} isPending={true} isEditable={false} isHistory={false}/>
                <Partnership isParent={true} isRunning={false} isFuture={false} isSent={true} isPending={false} isEditable={false} isHistory={false}/>
            </div>
            <Pagination pages={sentPartnershipPages} currentPage={sentPartnershipCurrentPage}
                onChange={setSentPartnershipCurrentPage} width="620px"
            />

            <div className={s.list_header}>
                <ListHeader title={"Υπογράψτε νέο συμφωνητικό"} listElementName={"Διαθέσιμες νταντάδες"} 
                    listSize={100} pageSize={recommendedBabysittersPageSize}
                    sorting={recommendedBabysittersSorting} sortingOptions={recommendedBabysittersSortingOptions}
                    onPageSizeChange={setRecommendedBabysittersPageSize} onSortingChange={setRecommendedBabysittersSorting}
                />
            </div>
            <div className={s.column}>
                <BabysitterGridView
                    babysitters={babysitters}
                />
            </div>
            {/* Εδώ θα μπουν τα dates */}
            <Pagination pages={recommendedBabysittersPages} currentPage={recommendedBabysittersCurrentPage}
                onChange={setRecommendedBabysittersCurrentPage} width="620px"
            />
            
            <div className={s.list_header}>
                <ListHeader title={"Υπό επεξεργασία Συμφωνητικά Συνεργασίας"} listElementName={"Συμφωνητικά"} 
                    listSize={100} pageSize={editablePartnershipsPageSize}
                    sorting={editablePartnershipsSorting} sortingOptions={editablePartnershipsSortingOptions}
                    onPageSizeChange={setEditablePartnershipsPageSize} onSortingChange={setEditablePartnershipsSorting}
                />
            </div>
            <div className={s.column}>
                <Partnership isParent={true} isRunning={false} isFuture={false} isSent={false} isPending={false} isEditable={true} isHistory={false}/>
                <Partnership isParent={true} isRunning={false} isFuture={false} isSent={false} isPending={false} isEditable={true} isHistory={false}/>
                <Partnership isParent={true} isRunning={false} isFuture={false} isSent={false} isPending={false} isEditable={true} isHistory={false}/>
            </div>
            <Pagination pages={editablePartnershipsPages} currentPage={editablePartnershipsCurrentPage}
                onChange={setEditablePartnershipsCurrentPage} width="620px"
            />

            {
              showCreateRatingPopup && (
                <CreateRatingPopup
                  babysitter={{ name: 'Γεωργία' }}
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