import React from 'react';
import FilterSection from '../../../../Components/FilterSection/FilterSection';
import s from './FiltersStyle.module.css';
import { ageOptions, experienceOptions, genderOptions, nationalityOptions } from '../../../../utils/options';

const Filters = ({ filters, availabilityFilter, onFilterChange, onAvailabilityFilterChange, triggerFetch }) => {

  return (
    <div className={s.babysitter_search_filters_container}>
      <p>Φίλτρα</p>
      <div className={s.babysitter_search_filters}>
        <FilterSection
          sectionLabel='Περιοχή'
          fields={[
            {type: 'input', name: 'area', value: filters.area, placeholder: 'Πόλη', onChange: (newArea) => onFilterChange({ ...filters, area: newArea })},
          ]}
        />

        <FilterSection
          sectionLabel='Δημοφιλείς αναζητήσεις'
          fields={[
            {type: 'checkbox', name: 'cookingFamousSearch', label: 'Μαγείρεμα', isChecked: filters.cooking, onChange: () => onFilterChange({ ...filters, cooking: !filters.cooking })},
            {type: 'checkbox', name: 'firstAidFamousSearch', label: 'Α` βοήθειες', isChecked: filters.firstAid, onChange: () => onFilterChange({ ...filters, firstAid: !filters.firstAid })},
            {type: 'checkbox', name: 'babysitterCertificateFamousSearch', label: 'Πιστοποίηση Νταντάς', isChecked: filters.babysitterCertificate, onChange: () => onFilterChange({ ...filters, babysitterCertificate: !filters.babysitterCertificate })},
            {type: 'checkbox', name: 'homeworkHelpFamousSearch', label: 'Βοήθεια με μαθήματα', isChecked: filters.homeworkHelp, onChange: () => onFilterChange({ ...filters, homeworkHelp: !filters.homeworkHelp })},
            {type: 'checkbox', name: 'englishNativeSpeakerFamousSearch', label: 'English Native Speaker', isChecked: filters.englishNativeSpeaker, onChange: () => onFilterChange({ ...filters, englishNativeSpeaker: !filters.englishNativeSpeaker })},
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
          sectionLabel='Χρόνος Απασχόλησης'
          fields={[
            {type: 'checkbox', name: 'partTime', label: 'Μερική', isChecked: filters.partTime, onChange: () => onFilterChange({ ...filters, partTime: !filters.partTime })},
            {type: 'checkbox', name: 'fullTime', label: 'Πλήρης', isChecked: filters.fullTime, onChange: () => onFilterChange({ ...filters, fullTime: !filters.fullTime })},
          ]}
        />

        <FilterSection
          sectionLabel='Διαθεσιμότητα & ώρα'
          fields={[
            {type: 'checkbox', name: 'currentlyAvailable', label: 'Άμεσα Διαθέσιμος/η', isChecked: filters.currentlyAvailable, onChange: () => onFilterChange({ ...filters, babysitterExperience: !filters.currentlyAvailable })},
            {type: 'timetable', width: '275px', height: '200px', checkedSlots: availabilityFilter, onChange: onAvailabilityFilterChange},
          ]}
        />

        <button
          className={s.availability_search_button}
          onClick={() => triggerFetch()}
        >
          Αναζήτηση
        </button>

        <FilterSection
          sectionLabel='Έτη Προϋπηρεσίας'
          fields={[
            {type: 'dropdown', name: 'babysitterExperience', placeholder: '', options: experienceOptions, onChange: (selectedOption) => onFilterChange({ ...filters, babysitterExperience: selectedOption.value })},
          ]}
        />

        <FilterSection
          sectionLabel='Εμπειρία με παιδιά ηλικίας'
          fields={[
            {type: 'checkbox', name: 'twoToSixMonths', label: '2-6 μηνών', isChecked: filters.twoToSixMonths, onChange: () => onFilterChange({ ...filters, twoToSixMonths: !filters.twoToSixMonths })},
            {type: 'checkbox', name: 'sixToTwelveMonths', label: '6-12 μηνών', isChecked: filters.sixToTwelveMonths, onChange: () => onFilterChange({ ...filters, sixToTwelveMonths: !filters.sixToTwelveMonths })},
            {type: 'checkbox', name: 'oneToTwoyears', label: '1-2 ετών', isChecked: filters.oneToTwoyears, onChange: () => onFilterChange({ ...filters, oneToTwoyears: !filters.oneToTwoyears })},
            {type: 'checkbox', name: 'moreThanTwoYears', label: '> 2 ετών', isChecked: filters.moreThanTwoYears, onChange: () => onFilterChange({ ...filters, moreThanTwoYears: !filters.moreThanTwoYears })},
          ]}
        />

        <FilterSection
          sectionLabel='Γνώσεις ξένων γλωσσών'
          fields={[
            {type: 'checkbox', name: 'english', label: 'Αγγλικά', isChecked: filters.english, onChange: () => onFilterChange({ ...filters, english: !filters.english })},
            {type: 'checkbox', name: 'french', label: 'Γαλλικά', isChecked: filters.french, onChange: () => onFilterChange({ ...filters, french: !filters.french })},
            {type: 'checkbox', name: 'italian', label: 'Ιταλικά', isChecked: filters.italian, onChange: () => onFilterChange({ ...filters, italian: !filters.italian })},
            {type: 'checkbox', name: 'spanish', label: 'Ισπανικά', isChecked: filters.spanish, onChange: () => onFilterChange({ ...filters, spanish: !filters.spanish })},
            {type: 'checkbox', name: 'russian', label: 'Ρωσικά', isChecked: filters.russian, onChange: () => onFilterChange({ ...filters, russian: !filters.russian })},
            {type: 'checkbox', name: 'arabic', label: 'Αραβικά', isChecked: filters.arabic, onChange: () => onFilterChange({ ...filters, arabic: !filters.arabic })},
            {type: 'checkbox', name: 'german', label: 'Γερμανικά', isChecked: filters.german, onChange: () => onFilterChange({ ...filters, german: !filters.german })},
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
}
 
export default Filters;