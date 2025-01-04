import s from "./ParentApplicationsStyle.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Application from "../../../Components/Application/Application";
import { faClockRotateLeft } from "@fortawesome/free-solid-svg-icons";
import ListHeader from "../../../Components/ListHeader/ListHeader";
import Pagination from "../../../Components/Pagination/Pagination";
import { useState } from "react";

function ParentApplications(){
    const [submittedApplicationsPageSize, setSubmittedApplicationsPageSize] = useState(3);
    const [submittedApplicationsSorting, setSubmittedApplicationsSorting] = useState("most recent");
    const submittedApplicationsSortingOptions = ["most recent", "least recent", "alphabetically"];
    const submittedApplicationsPages = 5;
    const [submittedApplicationsCurrentPage, setSubmittedApplicationsCurrentPage] = useState(1);
    
    const [editableApplicationsPageSize, setEditableApplicationsPageSize] = useState(3);
    const [editableApplicationsSorting, setEditableApplicationsSorting] = useState("most recent");
    const editableApplicationsSortingOptions = ["most recent", "least recent", "alphabetically"];
    const editableApplicationsPages = 5;
    const [editableApplicationsCurrentPage, setEditableApplicationsCurrentPage] = useState(1);
    
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
                <ListHeader title={"Σε κατάσταση οριστικής υποβολής"} listElementName={"Αιτήσεις"} 
                    listSize={100} pageSize={submittedApplicationsPageSize}
                    sorting={submittedApplicationsSorting} sortingOptions={submittedApplicationsSortingOptions}
                    onPageSizeChange={setSubmittedApplicationsPageSize} onSortingChange={setSubmittedApplicationsSorting}
                />
            </div>
            <div className={s.column}>
                <Application isParent={true} application_state={1} isHistory={false} isEditable={false} />
                <Application isParent={true} application_state={0} isHistory={false} isEditable={false} />
                <Application isParent={true} application_state={2} isHistory={false} isEditable={false} />
            </div>
            <Pagination pages={submittedApplicationsPages} currentPage={submittedApplicationsCurrentPage}
                onChange={setSubmittedApplicationsCurrentPage} width="620px"
            />

            <div className={s.list_header}>
                <ListHeader title={"Υπό επεξεργασία"} listElementName={"Αιτήσεις"} 
                    listSize={100} pageSize={editableApplicationsPageSize}
                    sorting={editableApplicationsSorting} sortingOptions={editableApplicationsSortingOptions}
                    onPageSizeChange={setEditableApplicationsPageSize} onSortingChange={setEditableApplicationsSorting}
                />
            </div>
            <div className={s.column}>
                <Application isParent={true} application_state={0} isHistory={false} isEditable={true} />
                <Application isParent={true} application_state={0} isHistory={false} isEditable={true} />
                <Application isParent={true} application_state={0} isHistory={false} isEditable={true} />
            </div>
            <Pagination pages={editableApplicationsPages} currentPage={editableApplicationsCurrentPage}
                onChange={setEditableApplicationsCurrentPage} width="620px"
            />
        </div>
    )
}

export default ParentApplications;