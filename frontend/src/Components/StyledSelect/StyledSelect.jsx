import React from 'react';
import s from './StyledSelectStyle.module.css';
import Select from 'react-select';

const StyledSelect = (props) => {
  const disabled = props?.isDisabled ?? false;
  
  const customStyles = {
    control: (styles) => ({
      ...styles,
      borderColor: disabled ? '#F2F2F2' : 'rgba(0, 52, 117, 0.7)',
      outline: disabled ? '1px solid #F2F2F2' : '1px solid rgba(0, 52, 117, 0.7)',
      ':hover': {
        borderColor: disabled ? '#F2F2F2' : 'rgba(0, 52, 117, 0.7)',
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
      color: '#CCCCCC',
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
      backgroundColor: disabled ? '#F2F2F2' : 'rgba(217, 217, 217, 0.7)',
    }),
    indicatorSeparator: (styles) => ({
      ...styles,
      backgroundColor: disabled ? '#F2F2F2' : 'rgba(0, 52, 117, 0.7)',
      margin: '0px',
    }),
    valueContainer: (styles) => ({
      ...styles,
      width: '63px',
      textAlign: 'center',
    }),
    menuList: (base) => ({
      ...base,
      "::-webkit-scrollbar": {
        width: "8px",
      },
      "::-webkit-scrollbar-thumb": {
        background: "#888",
        borderRadius: '4px',
      },
      "::-webkit-scrollbar-thumb:hover": {
        background: "#555",
      }
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