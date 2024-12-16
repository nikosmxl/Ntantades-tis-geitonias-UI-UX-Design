import s from "./MoreHelpStyle.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp, faMessage } from "@fortawesome/free-solid-svg-icons";

function MoreHelp({isOpen, toggleSection}){
    return (
        <div className={s.how_it_works}>
            <button
                className={`${s.instruction_item} ${isOpen ? s.open : ''}`}
                onClick={() => toggleSection("moreHelp")}
            >
                <p>Χρειάζομαι παραπάνω βοήθεια</p>
                {isOpen ? 
                <FontAwesomeIcon icon={faAngleUp} className={s.angle_icon}/>
                : 
                <FontAwesomeIcon icon={faAngleDown} className={s.angle_icon}/>
                }
            </button>
            <div className={`${s.instruction_dropdown} ${isOpen ? s.open : ''}`}>
                <div className={s.instruction_content}>
                    <div className={s.row}>
                        <p>Για περισσότερες ερωτήσεις, πληκτρολογήστε την ερώτηση σας στο Live Chat 
                            <FontAwesomeIcon icon={faMessage} className={s.live_chat_logo}/> 
                            και θα σας απαντήσει ένα μέλος της ομάδας τεχνικής υποστήριξης του συστήματος.
                        </p>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default MoreHelp;