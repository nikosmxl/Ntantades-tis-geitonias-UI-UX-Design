import React from 'react';
import Select from 'react-select';
import { languageOptions } from '../../utils/options';

const MultiDropdownMenu = ({ options = languageOptions, placeholder = "Διαλέξτε τις γλώσσες σας...", selectedOptions, setSelectedOptions, isDisabled = false }) => {

    // Custom styles
    const customStyles = {
        container: (styles) => ({
            ...styles,
            width: '100%',
        }),
        multiValue: (styles) => ({
            ...styles,
            backgroundColor: '#A7BDD9',
            borderRadius: '6px',
        }),
        multiValueLabel: (styles) => ({
            ...styles,
            color: 'black', // Χρώμα για τα labels
        }),
        multiValueRemove: (styles) => ({
            ...styles,
            color: '#870000',
            borderRadius: '0px 6px 6px 0px',
            cursor: 'pointer',
            ':hover': {
                color: 'white',
                backgroundColor: '#870000',
            }
        }),
        control: (styles, { isFocused }) => ({
            ...styles,
            borderColor: isFocused ? '#003475' : styles.borderColor,
            outline: isFocused ? '1px solid #003475' : styles.outline,
            ':hover': {
                borderColor: isFocused ? '#003475' : styles.borderColor,
            },
        }),
        menu: (styles) => ({
            ...styles,
            zIndex: 10,
        }),
        menuPortal: (styles) => ({
            ...styles,
            zIndex: 10, // Τοποθέτηση του dropdown στο κορυφαίο stacking context
        }),
        dropdownIndicator: (styles) => ({
            ...styles,
            cursor: 'pointer',
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
        })
    }

    return (
        <Select 
            isMulti
            placeholder={placeholder}
            value={selectedOptions}
            onChange={setSelectedOptions}
            options={options}
            styles={customStyles} // Προσθήκη custom styles
            menuPortalTarget={document.body} // Τοποθετεί το dropdown στο <body>
            noOptionsMessage={() => 'Δεν βρέθηκαν επιλογές'}
            isDisabled={isDisabled}
        />
    )
}

export default MultiDropdownMenu;
