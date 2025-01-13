import s from "./BabysitterPartnershipStyle.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClockRotateLeft } from "@fortawesome/free-solid-svg-icons";
import Partnership from "../../../Components/Partnership/Partnership";
import ListHeader from "../../../Components/ListHeader/ListHeader";
import { useState } from "react";
import Pagination from "../../../Components/Pagination/Pagination";
import { useNavigate } from "react-router-dom";

function BabysitterPartnership(){
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

    const navigate = useNavigate();

    const handlePartnershipDelete = (partnershipId) => {
      // api call to delete
    };
    
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
                    <FontAwesomeIcon icon={faClockRotateLeft} onClick={() => navigate('/babysitter/history/partnerships')}/>
                    Ιστορικό συνεργασιών
                </button>
            </div>
            
            <b className={s.running_partnership_title}>Τρέχουσα συνεργασία</b>
            <div className={s.running_partnership}>
                <Partnership isParent={false} isRunning={true} isFuture={false} isSent={false} isPending={false} isEditable={false} isHistory={false}/>
            </div>

            <div className={s.list_header}>
                <ListHeader title={"Μελλοντικές συνεργασίες"} listElementName={"Συνεργασίες"} 
                    listSize={100} pageSize={futurePartnershipsPageSize}
                    sorting={futurePartnershipsSorting} sortingOptions={futurePartnershipsSortingOptions}
                    onPageSizeChange={setFuturePartnershipsPageSize} onSortingChange={setFuturePartnershipsSorting}
                />
            </div>
            <div className={s.column}>
                <Partnership isParent={false} isRunning={false} isFuture={true} isSent={false} isPending={false} isEditable={false} isHistory={false}/>
                <Partnership isParent={false} isRunning={false} isFuture={true} isSent={false} isPending={false} isEditable={false} isHistory={false}/>
                <Partnership isParent={false} isRunning={false} isFuture={true} isSent={false} isPending={false} isEditable={false} isHistory={false}/>
            </div>
            <Pagination pages={futurePartnershipPages} currentPage={futurePartnershipCurrentPage}
                onChange={setFuturePartnershipCurrentPage} width="620px"
            />

            <div className={s.list_header}>
                <ListHeader title={"Εισερχόμενα συμφωνητικά"} listElementName={"Συμφωνητικά"} 
                    listSize={100} pageSize={sentPartnershipsPageSize}
                    sorting={sentPartnershipsSorting} sortingOptions={sentPartnershipsSortingOptions}
                    onPageSizeChange={setSentPartnershipsPageSize} onSortingChange={setSentPartnershipsSorting}
                />
            </div>
            <div className={s.column}>
                <Partnership isParent={true} isRunning={false} isFuture={false} isSent={false} isPending={true} isEditable={true} onDelete={handlePartnershipDelete}/>
                <Partnership isParent={true} isRunning={false} isFuture={false} isSent={false} isPending={true} isEditable={true} onDelete={handlePartnershipDelete}/>
                <Partnership isParent={true} isRunning={false} isFuture={false} isSent={false} isPending={false} isEditable={true} onDelete={handlePartnershipDelete}/>
            </div>
            <Pagination pages={sentPartnershipPages} currentPage={sentPartnershipCurrentPage}
                onChange={setSentPartnershipCurrentPage} width="620px"
            />
        </div>
    )
}

export default BabysitterPartnership;