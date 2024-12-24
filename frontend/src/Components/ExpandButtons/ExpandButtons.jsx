import s from "./ExpandButtonsStyle.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faEye, faPencil, faTrashCan, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
import ConfirmationPopUp from "../../PopUps/ConfirmationPopUp/ConfirmationPopUp";
import DeletionPopUp from "../../PopUps/DeletionPopUp/DeletionPopUp";

function ExpandButtons({isExpanded, toggleIsExpanded, showOptionsButtons = false, showDeleteButton = false, onDelete, showEditButton = false, onEdit, showAcceptButton = false, onAccept, showDeclineButton = false, onDecline}){
    const [isAcceptConfirmPopupOpen, setIsAcceptConfirmPopupOpen] = useState(false);
    const [isDeclineConfirmPopupOpen, setIsDeclineConfirmPopupOpen] = useState(false);
    const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);

    const openAcceptConfirmPopup = () => {
        setIsAcceptConfirmPopupOpen(true);
    }

    const handleAcceptConfirmPopupClose = () => {
        setIsAcceptConfirmPopupOpen(false); // Κλεινει το PopUp
    };
    
    const openDeclineConfirmPopup = () => {
        setIsDeclineConfirmPopupOpen(true);
    }

    const handleDeclineConfirmPopupClose = () => {
        setIsDeclineConfirmPopupOpen(false); // Κλεινει το PopUp
    };

    const openDeletePopup = () => {
        setIsDeletePopupOpen(true);
    }

    const handleDeletePopupClose = () => {
        setIsDeletePopupOpen(false); // Κλεινει το PopUp
    };

    return (
        <div className={s.buttons}>
            <button className={s.show_more_button} onClick={toggleIsExpanded}>
                {isExpanded 
                ?
                    <FontAwesomeIcon icon={faEye} className={s.expanded} />
                :
                    <FontAwesomeIcon icon={faEyeSlash} className={s.not_expanded} />
                }
            </button>
            <div className={`${s.smooth_transition} ${isExpanded && showOptionsButtons ? s.open : ''}`}>
                <div className={s.options_buttons}>
                    {showDeleteButton &&
                        <button className={s.delete_button} onClick={openDeletePopup}>
                            <FontAwesomeIcon icon={faTrashCan} />
                        </button>
                    }
                    {showDeclineButton &&
                        <button className={s.decline_button} onClick={openDeclineConfirmPopup}>
                            <FontAwesomeIcon icon={faXmark} />
                        </button>
                    }
                    {showEditButton && 
                        <button className={s.edit_button} onClick={onEdit}>
                            <FontAwesomeIcon icon={faPencil} />
                        </button>
                    }
                    {showAcceptButton &&
                        <button className={s.accept_button} onClick={openAcceptConfirmPopup}>
                            <FontAwesomeIcon icon={faCheck} />
                        </button>
                    }
                </div>
            </div>
            {isAcceptConfirmPopupOpen && 
                <ConfirmationPopUp onConfirm={onAccept} onClose={handleAcceptConfirmPopupClose}/>
            }
            {isDeclineConfirmPopupOpen && 
                <ConfirmationPopUp onConfirm={onDecline} onClose={handleDeclineConfirmPopupClose}/>
            }
            {isDeletePopupOpen && 
                <DeletionPopUp onDelete={onDelete} onClose={handleDeletePopupClose} />
            }
        </div>
    )
}

export default ExpandButtons;