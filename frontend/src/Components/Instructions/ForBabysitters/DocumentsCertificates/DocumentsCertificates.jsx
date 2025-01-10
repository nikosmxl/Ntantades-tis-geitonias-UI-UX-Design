import React from "react";
import s from "./DocumentsCertificatesStyle.module.css";
import document_icon from "../../../../Assets/Icons/document_icon.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";

function DocumentsCertificates({isOpen, toggleInnerSections}) {

    return (
        <div className={s.who_is_allowed_the_voucher}>
            <button
                className={`${s.inner_instruction} ${isOpen ? s.open : ''}`}
                onClick={() => toggleInnerSections("documentsCertificates")}
            >
                <p>Έγγραφα/Πιστοποιητικά</p>
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
                        <img src={document_icon} alt="Document Icon" />
                        <div className={s.step_text}>
                            <ul>
                                <li>
                                    <p><span>Τίτλος Σπουδών</span> (Δευτεροβάθμιας ή ανωτέρας Εκπαίδευσης) (<span>Υποχρεωτικό</span>)</p>
                                </li>
                                <li>
                                    <p><span>Πιστοποιητικό Υγείας τελευταίου 3μήνου</span> από Δερματολόγο, Παθολόγο, Ψυχίατρο (Συνίσταται)</p>
                                </li>
                                <li>
                                    <p><span>Αντίγραφο Ποινικού Μητρώου</span> (Συνίσταται)</p>
                                </li>
                                <li>
                                    <p><span>Πιστοποιητικό Πρώτων Βοηθειών</span> (Συνίσταται)</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DocumentsCertificates;
