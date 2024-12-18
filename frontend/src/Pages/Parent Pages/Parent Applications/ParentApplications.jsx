import s from "./ParentApplicationsStyle.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Application from "../../../Components/Application/Application";
import { faClockRotateLeft } from "@fortawesome/free-solid-svg-icons";

function ParentApplications(){
    
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
            <Application isParent={true} application_state={1} isHistory={false} isEditable={true} />
        </div>
    )
}

export default ParentApplications;