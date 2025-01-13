import s from "./BabysitterCardStyle.module.css"
import profile_pic from "../../../Assets/Pictures/troll_prof.jpg"
import Stars from "../../Stars/Stars";
import { useNavigate } from "react-router-dom";

function BabysitterCard(){
    const navigate = useNavigate();
    return (
        <div className={s.babysitter_card} onClick={() => navigate('./babysitter-details/1')}>
            <img src={profile_pic} alt="Profile"/>
            <p className={s.babysitter_name}>Δήμητρα Χατζή</p>
            <p className={s.babysitter_location}>Καλλιθέα</p>
            <Stars rating={4.4} showRating={true} />
            <p className={s.babysitter_ratings}>12 αξιολογήσεις</p>
        </div>
    )
}

export default BabysitterCard;