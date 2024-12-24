import s from "./WelcomeNavBarStyle.module.css"
import { useNavigate } from "react-router-dom";
import logo from "../../Assets/Pictures/govgrlogo.png"

function WelcomeNavBar(){

  const navigate = useNavigate();
    return (
        <div className={s.nav_bar}>
            <div className={s.upper_navbar}>
                <div className={s.logo}>
                    <img src={logo} alt="logo"/>
                </div>
                <div className={s.buttons}>
                    <p className={s.navbar_button}>Βρείτε Εργασία</p>
                    <p className={s.navbar_button} onClick={() => navigate('/babysitter-search')}>Βρείτε Νταντά</p>
                    <button className={s.signup_button}>Εγγραφή με Taxis</button>
                    <button className={s.login_button}>Σύνδεση με Taxis</button>
                </div>
            </div>
            <div className={s.bottom_navbar}></div>
        </div>
    )
}

export default WelcomeNavBar;