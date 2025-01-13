import s from "./BabysitterListStyle.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import BabysitterCard from "./BabysitterCard/BabysitterCard";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

function BabysitterList(){
    const listRef = useRef(null);

    const scrollLeft = () => {
        listRef.current.scrollBy({ left: -1050 }); // Σκρολ προς τα αριστερά
    };

    const scrollRight = () => {
        listRef.current.scrollBy({ left: 1050 }); // Σκρολ προς τα δεξιά
    };

    const navigate = useNavigate();

    return (
        <div className={s.babysitters_show}>
            <b>Κάποιοι από τους αξιόπιστους επαγγελματίες μας</b>
            <div className={s.babysitters_list_area}>
                <FontAwesomeIcon icon={faAngleLeft} className={s.left_angle} onClick={scrollLeft}/>
                <div className={s.babysitters_list} ref={listRef}>
                    <BabysitterCard />
                    <BabysitterCard />
                    <BabysitterCard />
                    <BabysitterCard />
                    <BabysitterCard />
                    <BabysitterCard />
                    <BabysitterCard />
                    <BabysitterCard />
                </div>
                <FontAwesomeIcon icon={faAngleRight} className={s.right_angle} onClick={scrollRight}/>
            </div>
            <b className={s.show_more_babysitters} onClick={() => navigate('babysitter-search')}>Δείτε όλες τις νταντάδες μας</b>
        </div>
    )
}

export default BabysitterList;