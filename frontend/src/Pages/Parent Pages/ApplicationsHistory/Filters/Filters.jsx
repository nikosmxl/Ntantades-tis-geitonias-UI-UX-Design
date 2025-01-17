import React from 'react';
import FilterSection from '../../../../Components/FilterSection/FilterSection';
import s from './FiltersStyle.module.css';
import { ageOptions, experienceOptions, genderOptions, nationalityOptions } from '../../../../utils/options';

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
          sectionLabel='Aπασχόληση'
          fields={[
            {type: 'checkbox', name: 'partTime', label: 'Μερική', isChecked: filters.partTime, onChange: () => onFilterChange({ ...filters, partTime: !filters.partTime })},
            {type: 'checkbox', name: 'fullTime', label: 'Πλήρης', isChecked: filters.fullTime, onChange: () => onFilterChange({ ...filters, fullTime: !filters.fullTime })},
          ]}
        />

        <FilterSection
          sectionLabel='Φύλο Νταντάς'
          fields={[
            {type: 'dropdown', name: 'babysitterGender', placeholder: 'Επιλέξτε φύλο', options: genderOptions, onChange: (selectedOption) => onFilterChange({ ...filters, babysitterGender: selectedOption.value })},
          ]}
        />

        <FilterSection
          sectionLabel='Ηλικία Νταντάς'
          fields={[
            {type: 'dropdown', name: 'babysitterMinAge', placeholder: 'Από', options: ageOptions, onChange: (selectedOption) => onFilterChange({ ...filters, babysitterMinAge: selectedOption.value })},
            {type: 'dropdown', name: 'babysitterMaxAge', placeholder: 'Εώς', options: ageOptions.reverse(), onChange: (selectedOption) => onFilterChange({ ...filters, babysitterMaxAge: selectedOption.value })},
          ]}
        />

        <FilterSection
          sectionLabel='Εθνικότητα Νταντάς'
          fields={[
            {type: 'dropdown', name: 'babysitterNationality', placeholder: 'Επιλέξτε εθνικότητα', options: nationalityOptions, onChange: (selectedOption) => onFilterChange({ ...filters, babysitterNationality: selectedOption.value })},
          ]}
        />

        <FilterSection
          sectionLabel='Έτη Προϋπηρεσίας'
          fields={[
            {type: 'dropdown', name: 'babysitterExperience', placeholder: '', options: experienceOptions, onChange: (selectedOption) => onFilterChange({ ...filters, babysitterExperience: selectedOption.value })},
          ]}
        />

        <FilterSection
          sectionLabel='Ειδίκευση σε'
          fields={[
            {type: 'checkbox', name: 'specialNeeds', label: 'ΑμεΑ', isChecked: filters.specialNeeds, onChange: () => onFilterChange({ ...filters, specialNeeds: !filters.specialNeeds })},
            {type: 'checkbox', name: 'asl', label: 'Νοηματική', isChecked: filters.asl, onChange: () => onFilterChange({ ...filters, asl: !filters.asl })},
          ]}
        />

        <FilterSection
          sectionLabel='Μετακίνηση παιδιών'
          fields={[
            {type: 'checkbox', name: 'babysitterCar', label: 'Με Ι.Χ. Νταντάς', isChecked: filters.babysitterCar, onChange: () => onFilterChange({ ...filters, babysitterCar: !filters.babysitterCar })},
            {type: 'checkbox', name: 'familyCar', label: 'Με Ι.Χ. Οικογένειας', isChecked: filters.familyCar, onChange: () => onFilterChange({ ...filters, familyCar: !filters.familyCar })},
          ]}
        />

        <FilterSection
          sectionLabel='Υπηρεσίες'
          fields={[
            {type: 'checkbox', name: 'cooking', label: 'Μαγείρεμα', isChecked: filters.cooking, onChange: () => onFilterChange({ ...filters, cooking: !filters.cooking })},
            {type: 'checkbox', name: 'cleaning', label: 'Καθάρισμα Σπιτιού', isChecked: filters.cleaning, onChange: () => onFilterChange({ ...filters, cleaning: !filters.cleaning })},
            {type: 'checkbox', name: 'ironing', label: 'Σιδέρωμα', isChecked: filters.ironing, onChange: () => onFilterChange({ ...filters, ironing: !filters.ironing })},
            {type: 'checkbox', name: 'firstAid', label: 'Α` βοήθειες', isChecked: filters.firstAid, onChange: () => onFilterChange({ ...filters, firstAid: !filters.firstAid })},
            {type: 'checkbox', name: 'babysitterCertificate', label: 'Πιστοποίηση Νταντάς', isChecked: filters.babysitterCertificate, onChange: () => onFilterChange({ ...filters, babysitterCertificate: !filters.babysitterCertificate })},
            {type: 'checkbox', name: 'homeworkHelp', label: 'Βοήθεια με Μαθήματα', isChecked: filters.homeworkHelp, onChange: () => onFilterChange({ ...filters, homeworkHelp: !filters.homeworkHelp })},
            {type: 'checkbox', name: 'visits', label: 'Εκδρομές / Επισκέψεις', isChecked: filters.visits, onChange: () => onFilterChange({ ...filters, visits: !filters.visits })},
            {type: 'checkbox', name: 'accompanyToActivities', label: 'Συνοδεία σε Δραστηριότητες', isChecked: filters.accompanyToActivities, onChange: () => onFilterChange({ ...filters, accompanyToActivities: !filters.accompanyToActivities })},
            {type: 'checkbox', name: 'outdoorActivities', label: 'Δραστηριότητες Εξωτερικού Χώρου', isChecked: filters.outdoorActivities, onChange: () => onFilterChange({ ...filters, outdoorActivities: !filters.outdoorActivities })},
            {type: 'checkbox', name: 'emergencyAvailability', label: 'Έκτακτη Διαθεσιμότητα', isChecked: filters.emergencyAvailability, onChange: () => onFilterChange({ ...filters, emergencyAvailability: !filters.emergencyAvailability })},
            {type: 'checkbox', name: 'englishNativeSpeaker', label: 'English native speaker', isChecked: filters.englishNativeSpeaker, onChange: () => onFilterChange({ ...filters, englishNativeSpeaker: !filters.englishNativeSpeaker })},
            {type: 'checkbox', name: 'hosting', label: 'Φιλοξενία στην οικία μου', isChecked: filters.hosting, onChange: () => onFilterChange({ ...filters, hosting: !filters.hosting })},
          ]}
        />
      </div>
    </div>
  );
};
 
export default Filters;