import s from "./SignupStyle.module.css";
import babysitter_icon from "../../../Assets/Icons/babysitter_icon.png";
import family_icon from "../../../Assets/Icons/family_icon.png";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "../../../Components/Breadcrumbs/Breadcrumbs";


const Signup = () => {
    const navigate = useNavigate();
    return (
        <div className={s.container}>
            <div className={s.breadcrumbs_container}>
                <Breadcrumbs
                  breadcrumbItems={[
                    { label: 'Αρχική Σελίδα', route: ''},
                    { label: 'Εγγραφή με Taxis', route: '.'},
                  ]}
                />
            </div>
            
            <div className={s.step}>
                <h2 className={s.step_text}>Φόρμα Εγγραφής</h2>
                <hr />
                
                <div className={s.pics}>
                
                    <div className = {s.button_section}>
                        <button className={s.butts} onClick={() => navigate('/signup/parent')}>Είμαι Κηδεμόνας</button>
                        <img src={family_icon} alt="Family" />
                    </div>
                    
                    <hr className={s.vert}/>
                    
                    <div className = {s.button_section}>
                        <button className={s.butts} onClick={() => navigate('/signup/babysitter')}>Είμαι Nταντά</button>
                        <img src={babysitter_icon} alt="Babysitter" />
                    </div>
                </div>

                <h3 className={s.alrsign}>Έχετε ήδη εγγραφεί? <span className={s.log} onClick={() => navigate('/login')}>Συνδεθείτε</span> </h3>


            </div>
        </div>    
    )
}

export default Signup;