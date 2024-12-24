import React from 'react';
import s from './DateDropdownsStyle.module.css';
import Select from 'react-select';

const DateDropdowns = ({ day, month, year, onChange, isEnabled=true}) => {
  const getDaysInMonth = (selectedMonth, selectedYear) => {
    if (!selectedMonth || !selectedYear) return Array.from({ length: 30 }, (_, i) => i + 1);
    const monthIndex = parseInt(selectedMonth, 10) - 1;
    const date = new Date(selectedYear, monthIndex + 1, 0);
    return Array.from({ length: date.getDate() }, (_, i) => i + 1);
  };

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
        value={day}
        isDisabled={!isEnabled}
      />
      <Select
        options={monthOptions.map(monthOption => ({
          value: monthOption,
          label: monthOption
        }))}
        value={month}
        isDisabled={!isEnabled}
      />
      <Select
        options={yearOptions.map(yearOption => ({
          value: yearOption,
          label: yearOption
        }))}
        value={year}
        isDisabled={!isEnabled}
      />
    </div>
  );
};

export default DateDropdowns;
