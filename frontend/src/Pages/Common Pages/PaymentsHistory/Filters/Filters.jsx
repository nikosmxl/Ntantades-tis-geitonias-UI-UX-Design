import React from 'react';
import FilterSection from '../../../../Components/FilterSection/FilterSection';
import s from './FiltersStyle.module.css';

const Filters = ({ filters, onFilterChange }) => {
  return (
    <div className={s.payments_history_filters_container}>
      <p>Φίλτρα</p>
      <div className={s.payments_history_filters}>
        <FilterSection
          sectionLabel='Κατάσταση Πληρωμής'
          fields={[
            {type: 'checkbox', name: 'redeemed', label: 'Έγινε εξαργύρωση', isChecked: filters.redeemed, onChange: () => onFilterChange({ ...filters, redeemed: !filters.redeemed })},
            {type: 'checkbox', name: 'notRedeemed', label: 'Εκκρεμεί εξαργύρωση', isChecked: filters.notRedeemed, onChange: () => onFilterChange({ ...filters, notRedeemed: !filters.notRedeemed })},
          ]}
        />

        <FilterSection
          sectionLabel='Ημερομηνία Πληρωμής'
          fields={[
            {type: 'date', name: 'paymentDate', date: filters.paymentDate, onChange: (newDate) => onFilterChange({...filters, paymentDate: newDate})},
          ]}
        />
      </div>
    </div>
  );
};
 
export default Filters;