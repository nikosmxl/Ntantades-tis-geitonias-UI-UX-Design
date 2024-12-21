import s from "./NavBarStyle.module.css"
import logo from "../../Assets/Pictures/govgrlogo.png"
import UserProfileDropdown from "../User Profile Dropdown/UserProfileDropdown";
import NavBarCategory from "./NavBarCategory/NavBarCategory";

function NavBar(){
    return (
        <div className={s.nav_bar}>
            <div className={s.upper_navbar}>
                <div className={s.logo_categories_row}>
                    <div className={s.logo}>
                        <img src={logo} alt="logo" title="Home"/>
                    </div>
                    <div className={s.categories}>
                        
                        <NavBarCategory header="Βρείτε Νταντά" toRoute="babysitter-search" /> 
                        {/* Εδω θα λεμε ΑΝ type === Babysitter τοτε Αγγελιες ΑΛΛΙΩΣ Βρείτε Νταντά κάτι τέτοιο ειχα στο μυαλό μου */}
                    
                        <NavBarCategory header="Συνεργασία" toRoute="Babysitter_Search" />
                    
                        <NavBarCategory header="Αιτήσεις" toRoute="Babysitter_Search" />
                    
                        <NavBarCategory header="Ραντεβού Γνωριμίας" toRoute="Babysitter_Search" />
                    
                        <NavBarCategory header="Ιστορικό" toRoute="Babysitter_Search" />
                    
                        <NavBarCategory header="Οδηγίες" toRoute="Babysitter_Search" />
                            
                    </div>
                </div>
                <div className={s.profile_icon}>
                    <UserProfileDropdown />
                </div>
            </div>
            <div className={s.bottom_navbar}></div>
        </div>
    )
}

export default NavBar;