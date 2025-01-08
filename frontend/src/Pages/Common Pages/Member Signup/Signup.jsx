import s from "./SignupStyle.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // τα  εικονίδια από fontawesome
import { faLocationDot, faSearch } from "@fortawesome/free-solid-svg-icons"; // Αναζητήστε με βάση περιοχή (δεν το θέλουμε εδω)
import babysitter_icon from "../../../Assets/Icons/babysitter_icon.png";
import family_icon from "../../../Assets/Icons/family_icon.png";


const Signup = () => {
    return (
        <div className={s.container}>
            <div className={s.breadcrumbs_container}>
                Αρχική Σελίδα {`>`} Εγγραφή με Taxis 
            </div>
            
            <div className={s.step}>
                <h2 className={s.step_text}>Φόρμα Εγγραφής</h2>
                <hr />
                
                <div className={s.pics}>
                
                    <div className = {s.button_section}>
                        <button className={s.butts}>Είμαι Κηδεμόνας</button>
                        <img src={family_icon} alt="Family" />
                    </div>
                    
                    <hr className={s.vert}/>
                    
                    <div className = {s.button_section}>
                        <button className={s.butts}>Είμαι Nταντά</button>
                        <img src={babysitter_icon} alt="Babysitter" />
                    </div>
                </div>

                <h3 className={s.alrsign}>Έχετε ήδη εγγραφεί? <span className={s.log}>Συνδεθείτε</span> </h3>


            </div>
        </div>    
    )
}

export default Signup;