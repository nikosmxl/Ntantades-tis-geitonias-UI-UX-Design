import React from 'react';
import s from './BreadcrumbsStyle.module.css';
import { useLocation, useNavigate } from 'react-router-dom';

const Breadcrumbs = ({ breadcrumbItems }) => {

  const navigate = useNavigate();
  const location = useLocation();
  const context = location.pathname.split('/')[1];

  const compileBreadcrumbs = () => {
    let breadcrumbItemComponents = breadcrumbItems.map((breadcrumbItem, index) => (
      <>
        <div
          className={s.breadcrumb_item}
          onClick={() => {
            breadcrumbItem.route === '.' ?
            navigate(location.pathname) :
            navigate(`/${context}/${breadcrumbItem.route}`);
          }}
          key={breadcrumbItem}
        >
          {breadcrumbItem.label}
        </div> {index !== (breadcrumbItems.length - 1) ? '>' : ''} 
      </>
    ));

    return breadcrumbItemComponents;
  };
  
  return (
    <div className={s.breadcrumbs_container}>
      {/* Αρχική Σελίδα {`>`} Εγγραφή με Taxis */}
      { compileBreadcrumbs() }
    </div>
  );
}
 
export default Breadcrumbs;