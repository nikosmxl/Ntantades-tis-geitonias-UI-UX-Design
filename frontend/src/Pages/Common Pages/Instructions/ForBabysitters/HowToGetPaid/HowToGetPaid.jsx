import React from "react";
import s from "./HowToGetPaidStyle.module.css";
import pay_icon2 from "../../../../../Assets/Icons/pay_icon2.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";

function HowToGetPaid({isOpen, toggleInnerSections}) {

    return (
        <div className={s.who_is_allowed_the_voucher}>
            <button
                className={`${s.inner_instruction} ${isOpen ? s.open : ''}`}
                onClick={() => toggleInnerSections("howToGetPaid")}
            >
                <p>Πώς λαμβάνω την πληρωμή μου;</p>
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
                        <img src={pay_icon2} alt="Pay Icon" />
                        <div className={s.step_text}>
                            <ul>
                                <li>
                                    <p>Η πληρωμή γίνεται μετά από κάθε <span>ολοκληρωμένο</span> μήνα συνεργασίας με κηδεμόνα, και έχει την μορφή voucher.</p>
                                </li>
                                <li>
                                    <p>Μπορείτε να <span>εξαργυρώσετε τα voucher</span> που έχετε λάβει είτε από τη σελίδα <span>"Συνεργασία"</span> 
                                        με το κουμπί "Ολοκλήρωση Μήνα" <span>αφού ο γονέας το ενεργοποιήσει</span>, είτε από την σελίδα
                                        <span> “Ιστορικό Πληρωμών”</span>, σκανάροντας τον κωδικό QR για κάθε <span>μη</span> εξαργυρωμένη πληρωμή.
                                    </p>
                                </li>
                                <li>
                                    <p>Το ποσό της μηνιαίας πληρωμής σας καλύπτεται <span>εξ ολοκλήρου από το voucher</span>.</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HowToGetPaid;
