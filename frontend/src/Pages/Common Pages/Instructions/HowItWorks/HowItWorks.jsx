import s from "./HowItWorksStyle.module.css"
import signup_icon from "../../../../Assets/Icons/sign_up_icon.png"
import search_icon from "../../../../Assets/Icons/search_icon.png"
import pay_icon from "../../../../Assets/Icons/pay_icon.png"
import deal_icon from "../../../../Assets/Icons/deal_icon.png"
import calendar_icon from "../../../../Assets/Icons/calendar_icon.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";

function HowItWorks({isOpen, toggleSection}){
    return (
        <div className={s.how_it_works}>
            <button
                className={`${s.instruction_item} ${isOpen ? s.open : ''}`}
                onClick={() => toggleSection("howItWorks")}
            >
                <p>Πώς λειτουργεί</p>
                {isOpen ? 
                <FontAwesomeIcon icon={faAngleUp} className={s.angle_icon}/>
                : 
                <FontAwesomeIcon icon={faAngleDown} className={s.angle_icon}/>
                }
            </button>
            <div className={`${s.instruction_dropdown} ${isOpen ? s.open : ''}`}>
                <div className={s.instruction_content}>
                    <div className={s.instruction_row1}>
                        <div className={s.step}>
                            <div className={s.white_circle}>
                                <img src={signup_icon} alt="Signup step" />
                            </div>
                            <div className={s.white_rect}>
                                <p>
                                    Εγγράφεστε στην εφαρμογή είτε ως
                                    κηδεμόνας είτε ως νταντά με τους 
                                    <span> κωδικούς Taxis</span> σας.
                                </p>
                            </div>
                        </div>
                        <div className={s.step}>
                            <div className={s.white_circle}>
                                <img src={search_icon} alt="Search step" />
                            </div>
                            <div className={s.white_rect}>
                                <p>
                                    Οι νταντάδες ανεβάζουν <span> αγγελίες </span>
                                    ψάχνοντας εργασία. Οι κηδεμόνες μέσα από
                                    τις <span> αγγελίες</span>, αναζητούν την πιο κατάλληλη
                                    για αυτούς νταντά.
                                </p>
                            </div>
                        </div>
                        <div className={s.step}>
                            <div className={s.white_circle}>
                                <img src={calendar_icon} alt="Meeting step" />
                            </div>
                            <div className={s.white_rect}>
                                <p>
                                    Οι κηδεμόνες κάνουν <span>αίτηση ενδιαφέροντος </span>
                                    στη νταντά που επέλεξαν, και αφού η
                                    νταντά αποδεχτεί, κανονίζουν <span> ραντεβού
                                    γνωριμίας.</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className={s.instruction_row2}>
                        <div className={s.step}>
                            <div className={s.white_circle}>
                                <img src={deal_icon} alt="Contract step" />
                            </div>
                            <div className={s.white_rect}>
                                <p>
                                    Ο κηδεμόνας με τη νταντά <span>συνεργάζονται </span>
                                    επίσημα, αφού υπογράψουν ένα
                                    <span> συμφωνητικό συνεργασίας.</span>
                                </p>
                            </div>
                        </div>
                        <div className={s.step}>
                            <div className={s.white_circle}>
                                <img src={pay_icon} alt="Payment step" />
                            </div>
                            <div className={s.white_rect}>
                                <p>
                                    Ο κηδεμόνας πληρώνει την νταντά
                                    <span> αποκλειστικά</span> μέσω του <span>voucher</span> (χωρίς να
                                    πληρώσει και ο κηδεμόνας).
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HowItWorks;