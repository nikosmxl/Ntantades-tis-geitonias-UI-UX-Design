import s from "./BabysitterCardStyle.module.css"
import profile_pic from "../../../Assets/Pictures/troll_prof.jpg"
import Stars from "../../Stars/Stars";
import { useNavigate } from "react-router-dom";
import { getAverageRating } from "../../../utils/calc";

function BabysitterCard({ babysitter }){
    const navigate = useNavigate();
    const averageRating = getAverageRating(babysitter);
    return (
        <div className={s.babysitter_card} onClick={() => navigate(`./babysitter-details/${babysitter.id}`)}>
            <img src={babysitter.profilePicture} alt="Profile"/>
            <p className={s.babysitter_name}>{babysitter.name} {babysitter.surname}</p>
            <p className={s.babysitter_location}>{babysitter.area}</p>
            <Stars rating={averageRating} showRating={true} />
            <p className={s.babysitter_ratings}>{babysitter.ratings.length} αξιολογήσεις</p>
        </div>
    )
}

export default BabysitterCard;