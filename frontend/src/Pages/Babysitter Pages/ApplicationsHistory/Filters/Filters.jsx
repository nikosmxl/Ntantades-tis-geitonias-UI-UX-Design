import React from 'react';
import FilterSection from '../../../../Components/FilterSection/FilterSection';
import s from './FiltersStyle.module.css';

const Filters = ({ filters, onFilterChange }) => {
  return (
    <div className={s.applications_history_filters_container}>
      <p>Φίλτρα</p>
      <div className={s.applications_history_filters}>
        <FilterSection
          sectionLabel='Κατάσταση αίτησης'
          fields={[
            {type: 'checkbox', name: 'accepted', label: 'Έγινε Αποδοχή', isChecked: filters.accepted, onChange: () => onFilterChange({ ...filters, accepted: !filters.accepted })},
            {type: 'checkbox', name: 'rejected', label: 'Απορρίφθηκε', isChecked: filters.rejected, onChange: () => onFilterChange({ ...filters, rejected: !filters.rejected })},
          ]}
        />

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
            {type: 'input', name: 'area', value: filters.area, placeholder: 'Περιοχή', onChange: (newArea) => onFilterChange({ ...filters, area: newArea })},
          ]}
        />

        <FilterSection
          sectionLabel='Aπασχόληση'
          fields={[
            {type: 'checkbox', name: 'partTime', label: 'Μερική', isChecked: filters.partTime, onChange: () => onFilterChange({ ...filters, partTime: !filters.partTime })},
            {type: 'checkbox', name: 'fullTime', label: 'Πλήρης', isChecked: filters.fullTime, onChange: () => onFilterChange({ ...filters, fullTime: !filters.fullTime })},
          ]}
        />

        <FilterSection
          sectionLabel='Αριθμός Παιδιών'
          fields={[
            {type: 'dropdown', name: 'numKids', placeholder: '', options: [{label: 1, value: 1},{label: 2, value: 2},{label: 3, value: 3},{label: 4, value: 4},], onChange: (selectedOption) => onFilterChange({ ...filters, numKids: selectedOption.value })},
          ]}
        />

        <FilterSection
          sectionLabel='Ειδίκευση'
          fields={[
            {type: 'checkbox', name: 'specialNeeds', label: 'ΑμεΑ', isChecked: filters.specialNeeds, onChange: () => onFilterChange({ ...filters, specialNeeds: !filters.specialNeeds })},
            {type: 'checkbox', name: 'asl', label: 'Νοηματική', isChecked: filters.asl, onChange: () => onFilterChange({ ...filters, asl: !filters.asl })},
          ]}
        />

      </div>
    </div>
  );
};
 
export default Filters;