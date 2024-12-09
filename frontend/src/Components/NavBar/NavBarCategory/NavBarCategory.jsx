import s from "./NavBarCategoryStyle.module.css"
import { useNavigate } from "react-router-dom";

function NavBarCategory({header, toRoute, currentPage}){

    const navigate = useNavigate();

    const handleClick = () =>{
        toRoute === currentPage ? window.location.reload() : navigate(`/${toRoute}`)
    };
    return(
        <button
        className={`${s.navbar_category_button} ${toRoute === currentPage ? s.active : ''}`}
        onClick={handleClick}
        >
            {header}
        </button>
    );
}

export default NavBarCategory;