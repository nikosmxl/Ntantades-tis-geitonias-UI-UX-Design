import React from 'react';
import s from './KidCardStyle.module.css';
import Select from 'react-select';
import Checkbox from '../Checkbox/Checkbox';

const KidCard = ({ kid, onChange, isEditable=false }) => {
  const labelValueMapper = {
    "boy": "Αγόρι",
    "girl": "Κορίτσι",
  };

  const handleAgeChange = (newAge) => {
    const updatedKid = {
      ...kid,
      age: newAge.value
    };
    onChange(updatedKid);
  };

  const handleGenderChange = (newGender) => {
    const updatedKid = {
      ...kid,
      gender: newGender.value
    };
    onChange(updatedKid);
  };

  const handleHasDisabilitiesChange = () => {
    const updatedKid = {
      ...kid,
      hasDisabilities: !kid.hasDisabilities
    };
    onChange(updatedKid);
  };

  const handleHasAllergiesChange = () => {
    const updatedKid = {
      ...kid,
      hasAllergies: !kid.hasAllergies
    };
    onChange(updatedKid);
  };

  const handleDescriptionChange = (newDescription) => {
    const updatedKid = {
      ...kid,
      description: newDescription,
    };
    onChange(updatedKid);
  };

  return (
    <div className={s.kid_card}>
      <div className={s.kid_card_info}>
        <p>Ηλικία:</p>
        <Select
          value={kid.age !== null ? {label: kid.age, value: kid.age} : null}
          options={[
            {label: 1, value: 1},
            {label: 2, value: 2},
            {label: 3, value: 3},
            {label: 4, value: 4},
          ]}
          isDisabled={!isEditable}
          onChange={(selectedOption) => handleAgeChange(selectedOption)}
        />
        <p>Φύλο:</p>
        <Select
          value={kid.gender !== null ? {label: labelValueMapper[kid.gender], value: kid.gender} : null}
          options={[
            {label: 'Αγόρι', value: 'boy'},
            {label: 'Κορίτσι', value: 'girl'},
          ]}
          isDisabled={!isEditable}
          onChange={(selectedOption) => handleGenderChange(selectedOption)}          
        />
        <p>ΑμεΑ:</p>
        <Checkbox
          name='hasDisabilities'
          isChecked={kid.hasDisabilities}
          width='28px'
          height='28px'
          isEnabled={isEditable}
          onChange={() => handleHasDisabilitiesChange()}
        />
        <p>Αλλεργίες:</p>
        <Checkbox
          name='hasAllergies'
          isChecked={kid.hasAllergies}
          width='28px'
          height='28px'
          isEnabled={isEditable}
          onChange={() => handleHasAllergiesChange()}
        />
      </div>

      <div className={s.kid_description_container}>
        <p>Περιγραφή:</p>
        <textarea
          className={isEditable ? s.kid_description_editable : s.kid_description}
          disabled={!isEditable}
          value={kid.description}
          onChange={(e) => handleDescriptionChange(e.target.value.trim())}
        />
      </div>
    </div>
  );
}
 
export default KidCard;