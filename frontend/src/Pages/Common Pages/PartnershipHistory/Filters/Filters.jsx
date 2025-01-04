import React from 'react';
import FilterSection from '../../../../Components/FilterSection/FilterSection';
import s from './FiltersStyle.module.css';

const Filters = ({ filters, onFilterChange }) => {
  return (
    <div className={s.partnership_history_filters_container}>
      <p>Φίλτρα</p>
      <div className={s.partnership_history_filters}>
        <FilterSection
          sectionLabel='Κατάσταση Συνεργασίας'
          fields={[
            {type: 'checkbox', name: 'active', label: 'Ενεργή', isChecked: filters.accepted, onChange: () => onFilterChange({ ...filters, active: !filters.active })},
            {type: 'checkbox', name: 'expired', label: 'Έληξε', isChecked: filters.expired, onChange: () => onFilterChange({ ...filters, expired: !filters.expired })},
            {type: 'checkbox', name: 'future', label: 'Μελλοντική', isChecked: filters.future, onChange: () => onFilterChange({ ...filters, future: !filters.future })},
          ]}
        />

        <FilterSection
          sectionLabel='Τύπος Απασχόλησης'
          fields={[
            {type: 'checkbox', name: 'partTime', label: 'Μερική', isChecked: filters.partTime, onChange: () => onFilterChange({ ...filters, partTime: !filters.partTime })},
            {type: 'checkbox', name: 'fullTime', label: 'Πλήρης', isChecked: filters.fullTime, onChange: () => onFilterChange({ ...filters, fullTime: !filters.fullTime })},
          ]}
        />

        <FilterSection
          sectionLabel='Ημερομηνία Έναρξης'
          fields={[
            {type: 'date', name: 'startDate', date: filters.startDate, onChange: (newDate) => onFilterChange({...filters, startDate: newDate})},
          ]}
        />

        <FilterSection
          sectionLabel='Ημερομηνία Λήξης'
          fields={[
            {type: 'date', name: 'endDate', date: filters.endDate, onChange: (newDate) => onFilterChange({...filters, endDate: newDate})},
          ]}
        />
      </div>
    </div>
  );
};
 
export default Filters;