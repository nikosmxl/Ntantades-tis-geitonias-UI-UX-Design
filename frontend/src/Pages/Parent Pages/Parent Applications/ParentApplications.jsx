import s from "./ParentApplicationsStyle.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Application from "../../../Components/Application/Application";

function ParentApplications(){
    
    return (
        <div className={s.applications_page}>
            <div className={s.breadcrumbs}>
                <p>Αρχική</p>
                <p>{">"}</p>
                <p>Αιτήσεις</p>
            </div>
            <Application isParent={true} application_state={1} isHistory={false} isEditable={true} />
        </div>
    )
}

export default ParentApplications;