import React from 'react';
import s from './DateDropdownsStyle.module.css';
import Select from 'react-select';

const DateDropdowns = ({ day, month, year, onChange, isEnabled=true}) => {
  const getDaysInMonth = (selectedMonth, selectedYear) => {
    if (!selectedMonth || !selectedYear) return Array.from({ length: 30 }, (_, i) => i + 1);
    const monthIndex = parseInt(selectedMonth, 10);
    const date = new Date(selectedYear, monthIndex + 1, 0);
    return Array.from({ length: date.getDate() }, (_, i) => i + 1);
  };

  const months = [
    "Ιανουαρίου", "Φεβρουαρίου", "Μαρτίου", "Απριλίου", "Μαΐου", "Ιουνίου", 
    "Ιουλίου", "Αυγούστου", "Σεπτεμβρίου", "Οκτωβρίου", "Νοεμβρίου", "Δεκεμβρίου"
  ];
  const monthOptions = Array.from(new Array(12), (val, index) => index+1);
  const currentYear = (new Date()).getFullYear();
  const yearOptions = Array.from(new Array(20), (val, index) => index + currentYear);
  
  const dayOptions = getDaysInMonth(month, year);

  return (
    <div className={s.date_dropdowns_container}>
      <Select
        options={dayOptions.map(dayOption => ({
          value: dayOption,
          label: dayOption
        }))}
        isDisabled={!isEnabled}
        onChange={(selectedOption) => onChange({
          day: selectedOption.value,
          month: month,
          year: year,
        })}
      />
      <Select
        options={monthOptions.map(monthOption => ({
          value: monthOption-1,
          label: months[monthOption-1]
        }))}
        isDisabled={!isEnabled}
        onChange={(selectedOption) => onChange({
          day: day,
          month: selectedOption.value,
          year: year,
        })}
      />
      <Select
        options={yearOptions.map(yearOption => ({
          value: yearOption,
          label: yearOption
        }))}
        isDisabled={!isEnabled}
        onChange={(selectedOption) => onChange({
          day: day,
          month: month,
          year: selectedOption.value,
        })}
      />
    </div>
  );
};

export default DateDropdowns;
