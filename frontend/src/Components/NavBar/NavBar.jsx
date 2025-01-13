import s from "./NavBarStyle.module.css"
import logo from "../../Assets/Pictures/govgrlogo.png"
import UserProfileDropdown from "../User Profile Dropdown/UserProfileDropdown";
import NavBarCategory from "./NavBarCategory/NavBarCategory";
import { useNavigate } from "react-router-dom";

function NavBar({ context }){
    const navigate = useNavigate()

    const parentNavbarCategories = [
      { header: 'Βρείτε Νταντά', toRoute: 'parent/babysitter-search' },
      { header: 'Συνεργασία', toRoute: 'parent/partnership' },
      { header: 'Αιτήσεις', toRoute: 'parent/applications' },
      { header: 'Ραντεβού Γνωριμίας', toRoute: 'parent/dates' },
      { header: 'Ιστορικό', toRoute: 'parent/history' },
      { header: 'Οδηγίες', toRoute: 'parent/help' },
    ];
    const babysitterNavbarCategories = [
      { header: 'Αγγελίες', toRoute: 'babysitter/listings' },
      { header: 'Συνεργασία', toRoute: 'babysitter/partnership' },
      { header: 'Αιτήσεις', toRoute: 'babysitter/applications' },
      { header: 'Ραντεβού Γνωριμίας', toRoute: 'babysitter/dates' },
      { header: 'Ιστορικό', toRoute: 'babysitter/history' },
      { header: 'Οδηγίες', toRoute: 'babysitter/help' },
    ];

    const handleLogoClick = () => {
        if (context === 'parent') {
            navigate('/parent');
        } else if (context === 'babysitter') {
            navigate('/babysitter');
        }
    };
    return (
        <div className={s.nav_bar}>
            <div className={s.upper_navbar}>
                <div className={s.logo_categories_row}>
                    <div className={s.logo}>
                      <img src={logo} alt="logo" title="Home" onClick={handleLogoClick}/>
                    </div>
                    <div className={s.categories}>
                        {
                          context === 'parent' ? (
                            parentNavbarCategories.map((navBarCategory, index) => {
                              return (
                                <NavBarCategory
                                  key={`${navBarCategory.header} ${index}`}
                                  header={navBarCategory.header}
                                  toRoute={navBarCategory.toRoute}
                                />
                              );
                            })
                          ) : (
                            babysitterNavbarCategories.map((navBarCategory, index) => {
                              return (
                                <NavBarCategory
                                  key={`${navBarCategory.header} ${index}`}
                                  header={navBarCategory.header}
                                  toRoute={navBarCategory.toRoute}
                                />
                              );
                            })
                          )
                        }                            
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