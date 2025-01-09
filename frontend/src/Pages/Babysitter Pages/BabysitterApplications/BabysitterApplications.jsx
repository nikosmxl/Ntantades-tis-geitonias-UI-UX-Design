import s from "./BabysitterApplicationsStyle.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Application from "../../../Components/Application/Application";
import { faClockRotateLeft } from "@fortawesome/free-solid-svg-icons";
import ListHeader from "../../../Components/ListHeader/ListHeader";
import Pagination from "../../../Components/Pagination/Pagination";
import { useState } from "react";
import Notification from "../../../Components/Notification/Notification";

function BabysitterApplications(){
    const [incomingApplicationsPageSize, setIncomingApplicationsPageSize] = useState(3);
    const [incomingApplicationsSorting, setIncomingApplicationsSorting] = useState("most recent");
    const incomingApplicationsSortingOptions = ["most recent", "least recent", "alphabetically"];
    const incomingApplicationsPages = 5;
    const [incomingApplicationsCurrentPage, setIncomingApplicationsCurrentPage] = useState(1);
    
    return (
        <div className={s.applications_page}>
            <div className={s.breadcrumbs}>
                <p>Αρχική</p>
                <p>{">"}</p>
                <p>Αιτήσεις</p>
            </div>
            <div className={s.title_history_row}>
                <h3>Οι αιτήσεις μου</h3>
                <button className={s.history_button}>
                    <FontAwesomeIcon icon={faClockRotateLeft} />
                    Ιστορικό αιτήσεων
                </button>
            </div>
            
            <div className={s.list_header}>
                <ListHeader title={"Εισερχόμενες Αιτήσεις"} listElementName={"Αιτήσεις"} 
                    listSize={100} pageSize={incomingApplicationsPageSize}
                    sorting={incomingApplicationsSorting} sortingOptions={incomingApplicationsSortingOptions}
                    onPageSizeChange={setIncomingApplicationsPageSize} onSortingChange={setIncomingApplicationsSorting}
                />
            </div>
            <div className={s.column}>
                <Notification context={"Η Γεωργία Χατζηχρήστου κατέθεσε μία νέα αίτηση στις 16/12/2024 και ώρα 16:24."} width={'950px'} />
                <Application isParent={false} application_state={0} isHistory={false} isEditable={true} />
                <Application isParent={false} application_state={0} isHistory={false} isEditable={true} />
                <Application isParent={false} application_state={0} isHistory={false} isEditable={true} />
            </div>
            <Pagination pages={incomingApplicationsPages} currentPage={incomingApplicationsCurrentPage}
                onChange={setIncomingApplicationsCurrentPage} width="620px"
            />
        </div>
    )
}

export default BabysitterApplications;