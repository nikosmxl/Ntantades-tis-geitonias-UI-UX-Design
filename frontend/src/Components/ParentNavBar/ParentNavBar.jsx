import s from "./ParentNavBarStyle.module.css"
import logo from "../../Pictures/govgrlogo.png"

function WelcomeNavBar(){
    return (
        <div className={s.nav_bar}>
            <div className={s.upper_navbar}>
                <div className={s.navbar_row}>
                    <div className={s.logo_categories_row}>
                        <div className={s.logo}>
                            <img src={logo} alt="logo"/>
                        </div>
                        <div className={s.categories}>
                            <p>Βρείτε Νταντά</p>
                            <p>Συνεργασία</p>
                            <p>Αιτήσεις</p>
                            <p>Ραντεβού Γνωριμίας</p>
                            <p>Ιστορικό</p>
                            <p>Οδηγίες</p>
                        </div>
                    </div>
                    <div className={s.profile_icon}>
                        
                    </div>
                </div>
            </div>
            <div className={s.bottom_navbar}></div>
        </div>
    )
}

export default WelcomeNavBar;