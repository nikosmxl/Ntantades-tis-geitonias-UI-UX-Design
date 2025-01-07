import React from 'react';
import s from './StyledSelectStyle.module.css';
import Select from 'react-select';

const StyledSelect = (props) => {
  
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

  return (
    <Select
      {...props}
      styles={customStyles}
    />
  );
}
 
export default StyledSelect;