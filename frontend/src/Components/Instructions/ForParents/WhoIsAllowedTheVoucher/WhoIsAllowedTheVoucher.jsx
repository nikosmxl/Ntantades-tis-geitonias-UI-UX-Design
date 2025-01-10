import React from "react";
import s from "./WhoIsAllowedTheVoucherStyle.module.css";
import mother_icon from "../../../../Assets/Icons/mother_icon.png"
import father_icon from "../../../../Assets/Icons/father_icon.png"
import parent_icon from "../../../../Assets/Icons/parent_icon.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";

function WhoIsAllowedTheVoucher({isOpen, toggleInnerSections}) {

    return (
        <div className={s.who_is_allowed_the_voucher}>
            <button
                className={`${s.inner_instruction} ${isOpen ? s.open : ''}`}
                onClick={() => toggleInnerSections("whoIsAllowedTheVoucher")}
            >
                <p>Ποιοί δικαιούνται το voucher;</p>
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
                        <img src={mother_icon} alt="Mothers" />
                        <div className={s.step_text}>
                            <p><span>Μητέρες</span> (φυσικές, θετές ή ανάδοχες), <span>με βρέφος ή νήπιο</span>, που τηρούν ένα από τα παρακάτω:</p>
                            <p className={s.inner}>α) <span>εργάζονται</span> με οποιαδήποτε μορφή εργασίας</p>
                            <p className={s.inner}>β) είναι εγγεγραμμένες στα μητρώα της Δ.ΥΠ.Α (πρώην ΟΑΕΔ) ως <span>άνεργες</span></p>
                        </div>
                    </div>
                    <div className={s.step}>
                        <div className={s.step_rect}></div>
                        <img src={father_icon} alt="Mothers" />
                        <div className={s.step_text}>
                            <p><span>Πατέρες</span> (φυσικοί, θετοί ή ανάδοχοι), που ασκούν την αποκλειστική γονική μέριμνα <span>βρέφους ή νηπίου</span>,
                            και <span>εργάζονται</span> με οποιαδήποτε μορφή εργασίας</p>
                        </div>
                    </div>
                    <div className={s.step}>
                        <div className={s.step_rect}></div>
                        <img src={parent_icon} alt="Mothers" />
                        <div className={s.step_text}>
                            <p><span>Κάθε πρόσωπο</span> στο οποίο έχει ανατεθεί, με δικαστική απόφαση ή εισαγγελική διάταξη, η αποκλειστική
                            επιμέλεια <span>βρέφους ή νηπίου</span>, και <span>εργάζεται</span> με οποιαδήποτε μορφή εργασίας</p>
                        </div>
                    </div>
                    <div className={s.rest_info}>
                        <p><span>Και επίσης να ισχύουν όλα τα παρακάτω</span> (για όλες τις παραπάνω κατηγορίες):</p>
                        <p className={s.inner}>α) το <span>ετήσιο ατομικό εισόδημα</span> σας για το έτος <span>2022</span> να <span>μην</span> υπερβαίνει τα 24.000€</p>
                        <p className={s.inner}>β) να έχετε παιδί από <span>2 μηνών</span> εώς <span>2,5 ετών</span></p>
                        <p className={s.inner}>γ) να <span>μην</span> έχετε πάρει άδεια (μητρότητας/πατρότητας/ανατροφής τέκνου/γονική ή επαγγελματική άδεια)</p>
                        <p className={s.inner}>δ) να μένετε εντός των Δήμων που συμμετέχουν στην εφαρμογή</p>
                    </div>
                    <p className={s.attention}>Προσοχή: Οι συνταξιούχοι ΔΕΝ δικαιούνται το voucher</p>
                </div>
            </div>
        </div>
    );
}

export default WhoIsAllowedTheVoucher;
