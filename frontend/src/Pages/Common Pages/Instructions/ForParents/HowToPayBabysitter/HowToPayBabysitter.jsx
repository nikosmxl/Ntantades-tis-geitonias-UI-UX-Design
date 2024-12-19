import React from "react";
import s from "./HowToPayBabysitterStyle.module.css";
import pay_icon from "../../../../../Assets/Icons/pay_icon.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";

function HowToPayBabysitter({isOpen, toggleInnerSections}) {

    return (
        <div className={s.how_to_pay_babysitter}>
            <button
                className={`${s.inner_instruction} ${isOpen ? s.open : ''}`}
                onClick={() => toggleInnerSections("howToPayBabysitter")}
            >
                <p>Πώς πληρώνω την Νταντά μέσω του Voucher;</p>
                {isOpen ? 
                <FontAwesomeIcon icon={faAngleUp} className={s.angle_icon}/>
                : 
                <FontAwesomeIcon icon={faAngleDown} className={s.angle_icon}/>
                }
            </button>
            <div className={`${s.inner_instruction_dropdown} ${isOpen ? s.open : ''}`}>
                <div className={s.inner_instruction_content}>
                    <div className={s.step}>
                        <div className={s.step_rect}></div>
                        <img src={pay_icon} alt="Pay Icon" />
                        <div className={s.step_text}>
                            <ul>
                                <li>
                                    <p>
                                        Η πληρωμη της Νταντάς πραγματοποιείται με τη μορφή <span>Ψηφιακού Voucher</span>                                        
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        Εφόσον έχετε ολοκληρώσει τον μήνα συνεργασίας σας με την Νταντά, μπορείτε κάνοντας κλικ στο κουμπί
                                        "Ολοκλήρωση Μήνα" να ενεργοποιήσετε την διαδικασία πληρωμής, την οποία εξαργυρώνει  η Νταντά μέσω <span>QR Code </span>
                                       
                                    </p>
                                </li>
                                <li>
                                    <p>Το ποσό της μηνιαίας πληρωμής της Νταντάς καλύπτεται <span>εξ ολοκλήρου από το voucher</span>.</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HowToPayBabysitter;
