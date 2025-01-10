import s from "./HomeStyle.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faSearch } from "@fortawesome/free-solid-svg-icons";
import FamousSearches from "./FamousSearches/FamousSearches";
import BabysitterList from "../../../Components/BabysitterList/BabysitterList";
import Instructions from "../../../Components/Instructions/Instructions";

function Home(){
    return (
        <div className={s.home_page}>
            <div className={s.background_pic}>
                <div className={s.search_text_row}>
                    <div className={s.search_column}>
                        <div className={s.location_search}>
                            <p>Αναζήτηση με βάση την περιοχή</p>
                            <div className={s.search_area}>
                                <FontAwesomeIcon icon={faLocationDot} className={s.location_icon} />
                                <input type="text" placeholder="Γλυφάδα, Αττική"/>
                                <div className={s.location_search_button}>
                                    <FontAwesomeIcon icon={faSearch} className={s.search_icon} />    
                                </div>
                            </div>
                        </div>
                        <FamousSearches />
                    </div>
                    <h1>Βρείτε νταντά ή εργαστείτε ως νταντά,
                        <span> εύκολα </span>
                        και
                        <span> γρήγορα
                            <span className={s.exclamation}>!</span>
                        </span>
                    </h1>
                </div>
                <div className={s.gradient_white}></div>
            </div>
            <BabysitterList /> 
            <Instructions />
        </div>
    )
}

export default Home;