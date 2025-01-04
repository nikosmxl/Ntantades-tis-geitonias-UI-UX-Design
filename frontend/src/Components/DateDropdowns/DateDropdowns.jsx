import React from 'react';
import s from './DateDropdownsStyle.module.css';
import Select from 'react-select';

const DateDropdowns = ({ day, month, year, onChange, isEnabled=true, layout='row'}) => {
  const customStyles = {
    control: (styles) => ({
      ...styles,
      borderColor:'rgba(0, 52, 117, 0.7)',
      outline: '1px solid rgba(0, 52, 117, 0.7)',
      ':hover': {
        borderColor: 'rgba(0, 52, 117, 0.7)',
      },
      borderRadius: '5px'
    }),
    menu: (styles) => ({
      ...styles,
      zIndex: 10,
    }),
    menuPortal: (styles) => ({
      ...styles,
      zIndex: 10,
    }),
    dropdownIndicator: (styles) => ({
      ...styles,
      cursor: 'pointer',
      color: 'rgba(0, 0, 0, 0.7)',
    }),
    clearIndicator: (styles) => ({
        ...styles,
        cursor: 'pointer',
    }),
    option: (styles, { isFocused }) => ({
      ...styles,
      cursor: 'pointer',
      backgroundColor: isFocused
        ? '#f2f2f2'
        : styles.backgroundColor,
    }),
    indicatorsContainer: (styles) => ({
      ...styles,
      backgroundColor: 'rgba(217, 217, 217, 0.7)',
    }),
    indicatorSeparator: (styles) => ({
      ...styles,
      backgroundColor: 'rgba(0, 52, 117, 0.7)',
      margin: '0px',
    }),
    valueContainer: (styles) => ({
      ...styles,
      width: '63px',
      textAlign: 'center',
    })
  };

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
    <div
      className={s.date_dropdowns_container}
      style={{
        flexDirection: layout,
        alignItems: layout === 'row' ? 'center' : 'stretch',
      }}
    >
      <Select
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
        styles={customStyles}
      />
      <Select
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
        styles={customStyles}
      />
      <Select
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
        styles={customStyles}
      />
    </div>
  );
};

export default DateDropdowns;
