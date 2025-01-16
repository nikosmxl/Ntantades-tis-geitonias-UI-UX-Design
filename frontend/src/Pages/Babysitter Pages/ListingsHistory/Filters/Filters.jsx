import React from 'react';
import FilterSection from '../../../../Components/FilterSection/FilterSection';
import s from './FiltersStyle.module.css';

const Filters = ({ filters, onFilterChange }) => {

  return (
    <div className={s.listings_history_filters_container}>
      <p>Φίλτρα</p>
      <div className={s.listings_history_filters}>
        <FilterSection
          sectionLabel='Ημερομηνία Δημοσίευσης'
          fields={[
            {type: 'date', name: 'publishedFrom', date: filters.publishedFrom, onChange: (newDate) => onFilterChange({...filters, publishedFrom: newDate})},
            {type: 'date', name: 'publishedTo', date: filters.publishedTo, onChange: (newDate) => onFilterChange({...filters, publishedTo: newDate})},
          ]}
        />

        <FilterSection
          sectionLabel='Περιοχή'
          fields={[
            {type: 'input', name: 'area', value: filters.area, placeholder: 'Πόλη', onChange: (newArea) => onFilterChange({ ...filters, area: newArea })},
          ]}
        />

        <FilterSection
          sectionLabel='Aπασχόληση'
          fields={[
            {type: 'checkbox', name: 'partTime', label: 'Μερική', isChecked: filters.partTime, onChange: () => onFilterChange({ ...filters, partTime: !filters.partTime })},
            {type: 'checkbox', name: 'fullTime', label: 'Πλήρης', isChecked: filters.fullTime, onChange: () => onFilterChange({ ...filters, fullTime: !filters.fullTime })},
          ]}
        />

      </div>
    </div>
  );
};
 
export default Filters;