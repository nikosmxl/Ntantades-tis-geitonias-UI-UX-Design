import React, { useState, useMemo } from 'react';
import s from "./NavBarCategoryStyle.module.css";
import { useLocation, useNavigate } from "react-router-dom";

function NavBarCategory({ header, toRoute }) {
    const [showHistoryCategories, setShowHistoryCategories] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = useMemo(() => location.pathname.startsWith(`/${toRoute}`), [location.pathname, toRoute]);

    const handleClick = () =>{
      toRoute === location.pathname ? window.location.reload() : navigate(`../${toRoute}`, {path: '..'})
    };

    return (
        <div
            className={s.navbar_category_container}
            onMouseEnter={() => {
                if (toRoute.includes('history')) {
                    setShowHistoryCategories(true);
                }
            }}
            onMouseLeave={() => {
                if (toRoute.includes('history')) {
                    setShowHistoryCategories(false);
                }
            }}
        >
            <button
                className={`${s.navbar_category_button} ${isActive ? s.active : ''}`}
                onClick={handleClick}
            >
                {header}
            </button>
            {toRoute.includes('history') && (
                <div className={`${s.dropdown_menu} ${showHistoryCategories ? s.open : ""}`}>
                    <div className={s.dropdown_triangle}>
                        <div className={s.inner_dropdown_triangle}></div>
                    </div>
                    <div className={s.options_menu}>
                        <div className={s.menu_item} onClick={() => navigate(`/${toRoute}/partnerships`)}>
                            <p className={s.label}>Συνεργασιών</p>
                        </div>
                        <div className={s.menu_item} onClick={() => navigate(`/${toRoute}/applications`)}>
                            <p className={s.label}>Αιτήσεων</p>
                        </div>
                        <div className={s.menu_item} onClick={() => navigate(`/${toRoute}/payments`)}>
                            <p className={s.label}>Πληρωμών</p>
                        </div>
                        {toRoute.includes('babysitter') && (
                            <div className={s.menu_item} onClick={() => navigate(`/${toRoute}/listings`)}>
                                <p className={s.label}>Αγγελιών</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default NavBarCategory;
