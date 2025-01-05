import s from "./MyListingsStyle.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClockRotateLeft, faPlus } from "@fortawesome/free-solid-svg-icons";
import Listing from "../../../Components/Listing/Listing";
import ListHeader from "../../../Components/ListHeader/ListHeader";
import Pagination from "../../../Components/Pagination/Pagination";
import { useState } from "react";

function MyListings(){
    const [editableListingsPageSize, setEditableListingsPageSize] = useState(3);
    const [editableListingsSorting, setEditableListingsSorting] = useState("most recent");
    const editableListingsSortingOptions = ["most recent", "least recent", "alphabetically"];
    const editableListingsPages = 5;
    const [editableListingsCurrentPage, setEditableListingsCurrentPage] = useState(1);
    
    return (
        <div className={s.applications_page}>
            <div className={s.breadcrumbs}>
                <p>Αρχική</p>
                <p>{">"}</p>
                <p>Αιτήσεις</p>
            </div>
            <div className={s.title_history_row}>
                <h3>Οι αγγελίες μου</h3>
                <button className={s.history_button}>
                    <FontAwesomeIcon icon={faClockRotateLeft} />
                    Ιστορικό αγγελιών
                </button>
            </div>
            
            <b className={s.running_listing_title}>Τρέχουσα αγγελία</b>
            <div className={s.running_listing}>
                <Listing isHistory={false} isEditable={false} />
            </div>
            
            <div className={s.list_header}>
                <ListHeader title={"Υπό επεξεργασία"} listElementName={"Αγγελίες"} 
                    listSize={100} pageSize={editableListingsPageSize}
                    sorting={editableListingsSorting} sortingOptions={editableListingsSortingOptions}
                    onPageSizeChange={setEditableListingsPageSize} onSortingChange={setEditableListingsSorting}
                />
            </div>

            <button className={s.create_listing}>
                Δημιουργία αγγελίας
                <FontAwesomeIcon icon={faPlus} />
            </button>

            <div className={s.column}>
                <Listing isHistory={false} isEditable={true} />
                <Listing isHistory={false} isEditable={true} />
                <Listing isHistory={false} isEditable={true} />
            </div>
            <Pagination pages={editableListingsPages} currentPage={editableListingsCurrentPage}
                onChange={setEditableListingsCurrentPage} width="620px"
            />
        </div>
    )
}

export default MyListings;