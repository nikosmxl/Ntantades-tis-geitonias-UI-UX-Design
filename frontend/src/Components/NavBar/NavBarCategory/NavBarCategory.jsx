import React, { useState } from 'react';
import s from "./NavBarCategoryStyle.module.css"
import { useNavigate } from "react-router-dom";

function NavBarCategory({header, toRoute, currentPage}){
    const [showHistoryCategories, setShowHistoryCategories] = useState(false);

    const navigate = useNavigate();

    const handleClick = () =>{
        toRoute === currentPage ? window.location.reload() : navigate(`../${toRoute}`, {path: '..'})
    };

    const handleAgreementHistory = () => {
      navigate(`../${toRoute}/partnerships`, {path: '..'});
    };

    const handleApplicationHistory = () => {
      navigate(`../${toRoute}/applications`, {path: '..'});
    };

    const handlePaymentHistory = () => {
      navigate(`../${toRoute}/payments`, {path: '..'});
    };

    const handleListingHistory = () => {
      navigate(`../${toRoute}/listings`, {path: '..'});
    };

    return(
      <div
        className={s.navbar_category_container}
        onMouseEnter={() => {
          if (toRoute.includes('history')) {
            setShowHistoryCategories(true);
          }
        }}
        onMouseLeave={() => {
          if (toRoute.includes('history')) {
            setShowHistoryCategories(false)
          }
        }}
      >
        <button
          className={`${s.navbar_category_button} ${toRoute === currentPage ? s.active : ''}`}
          onClick={handleClick}
        >
            {header}
        </button>
        <div className={`${s.dropdown_menu} ${showHistoryCategories ? s.open : ""}`}>
          <div className={s.dropdown_triangle}>
              <div className={s.inner_dropdown_triangle}></div>
          </div>
          <div className={s.options_menu}>
            <div
              className={s.menu_item}
              onClick={handleAgreementHistory}
            >
              <p className={s.label}>Συνεργασιών</p>
            </div>
            <div
              className={s.menu_item}
              onClick={handleApplicationHistory}
            >
              <p className={s.label}>Αιτήσεων</p>
            </div>
            <div
              className={s.menu_item}
              onClick={handlePaymentHistory}
            >
              <p className={s.label}>Πληρωμών</p>
            </div>
            {
              toRoute.includes('babysitter') && (
                <div
                  className={s.menu_item}
                  onClick={handleListingHistory}
                >
                  <p className={s.label}>Αγγελιών</p>
                </div>
              )
            }
          </div>
        </div>
      </div>
        
    );
}

export default NavBarCategory;