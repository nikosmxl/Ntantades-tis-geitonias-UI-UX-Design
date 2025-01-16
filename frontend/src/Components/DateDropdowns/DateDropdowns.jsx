import React from 'react';
import s from './DateDropdownsStyle.module.css';
import StyledSelect from '../StyledSelect/StyledSelect';

const DateDropdowns = ({ day, month, year, onChange, isEnabled=true, layout='row'}) => {
  const getDaysInMonth = (selectedMonth, selectedYear) => {
    if (!selectedMonth || !selectedYear) return Array.from({ length: 30 }, (_, i) => i + 1);
    const monthIndex = parseInt(selectedMonth, 10);
    const date = new Date(selectedYear, monthIndex + 1, 0);
    return Array.from({ length: date.getDate() }, (_, i) => i + 1);
  };

  const monthOptions = Array.from(new Array(12), (val, index) => index+1);
  const currentYear = (new Date()).getFullYear();
  const yearOptions = Array.from(new Array(20), (val, index) => index + currentYear);
  
  const dayOptions = getDaysInMonth(month, year);

  return (
    <div
      className={s.date_dropdowns_container}
      style={{
        flexDirection: layout,
        alignItems: layout === 'row' ? 'center' : 'stretch',
      }}
    >
      <StyledSelect
        placeholder={'Ημέρα'}
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
        isSearchable={false}
      />
      <StyledSelect
        placeholder={'Μήνας'}
        options={monthOptions.map(monthOption => ({
          value: monthOption,
          label: monthOption
        }))}
        isDisabled={!isEnabled}
        onChange={(selectedOption) => onChange({
          day: day,
          month: selectedOption.value,
          year: year,
        })}
        isSearchable={false}
      />
      <StyledSelect
        placeholder={'Έτος'}
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
        isSearchable={false}
      />
    </div>
  );
};

export default DateDropdowns;
