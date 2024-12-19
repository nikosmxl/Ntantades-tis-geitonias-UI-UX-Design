import s from "./MyListingsStyle.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClockRotateLeft } from "@fortawesome/free-solid-svg-icons";
import Listing from "../../../Components/Listing/Listing";

function MyListings(){
    
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
            <Listing isHistory={false} isEditable={true} />
        </div>
    )
}

export default MyListings;