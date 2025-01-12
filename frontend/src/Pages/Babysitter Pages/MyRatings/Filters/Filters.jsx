import React from 'react';
import s from './FiltersStyle.module.css';
import FilterSection from '../../../../Components/FilterSection/FilterSection';

const Filter = ({ filters, onFilterChange }) => {
  return (
    <div className={s.my_ratings_filters_container}>
      <p>Φίλτρα</p>
      <div className={s.my_ratings_filters}>

        <FilterSection
          sectionLabel='Βαθμολογία'
          fields={[
            {type: 'stars', name: 'ratingFrom', label: 'Από', rating: filters?.ratingFrom ?? 0, onChange: (newRating) => onFilterChange({ ...filters, ratingFrom: newRating })},
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
          sectionLabel='Ονοματεπώνυμο Κηδεμόνα'
          fields={[
            {type: 'input', name: 'parentName', value: filters.area, placeholder: 'Ονοματεπώνυμο', onChange: (newParentName) => onFilterChange({ ...filters, parentName: newParentName })},
          ]}
        />

        <FilterSection
          sectionLabel='Περιοχή'
          fields={[
            {type: 'input', name: 'area', value: filters.area, placeholder: 'Πόλη ή Τ.Κ.', onChange: (newArea) => onFilterChange({ ...filters, area: newArea })},
          ]}
        />

        <FilterSection
          sectionLabel='Ηλικία Παιδιού'
          fields={[
            {type: 'checkbox', name: 'twoToSixMonths', label: '2-6 μηνών', isChecked: filters.twoToSixMonths, onChange: () => onFilterChange({ ...filters, twoToSixMonths: !filters.twoToSixMonths })},
            {type: 'checkbox', name: 'sixToTwelveMonths', label: '6-12 μηνών', isChecked: filters.sixToTwelveMonths, onChange: () => onFilterChange({ ...filters, sixToTwelveMonths: !filters.sixToTwelveMonths })},
            {type: 'checkbox', name: 'oneToTwoyears', label: '1-2 ετών', isChecked: filters.oneToTwoyears, onChange: () => onFilterChange({ ...filters, oneToTwoyears: !filters.oneToTwoyears })},
            {type: 'checkbox', name: 'moreThanTwoYears', label: '> 2 ετών', isChecked: filters.moreThanTwoYears, onChange: () => onFilterChange({ ...filters, moreThanTwoYears: !filters.moreThanTwoYears })},
          ]}
        />

        <FilterSection
          sectionLabel='Ειδίκευση σε'
          fields={[
            {type: 'checkbox', name: 'specialNeeds', label: 'ΑμεΑ', isChecked: filters.specialNeeds, onChange: () => onFilterChange({ ...filters, specialNeeds: !filters.specialNeeds })},
            {type: 'checkbox', name: 'asl', label: 'Νοηματική', isChecked: filters.asl, onChange: () => onFilterChange({ ...filters, asl: !filters.asl })},
          ]}
        />

      </div>
    </div>
  );
}
 
export default Filter;