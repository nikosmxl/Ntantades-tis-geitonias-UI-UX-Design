import s from "./ParentPartnershipStyle.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClockRotateLeft } from "@fortawesome/free-solid-svg-icons";
import Partnership from "../../../Components/Partnership/Partnership";

function ParentPartnership(){
    
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
            <Partnership isParent={true} isRunning={true} isFuture={false} isSent={false} isPending={false} isEditable={false} isHistory={false}/>
        </div>
    )
}

export default ParentPartnership;