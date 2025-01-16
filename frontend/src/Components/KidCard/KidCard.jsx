import React from 'react';
import s from './KidCardStyle.module.css';
import Checkbox from '../Checkbox/Checkbox';
import StyledSelect from '../StyledSelect/StyledSelect';

const KidCard = ({ kid, onChange, isEditable=false, MandatoryFields=false }) => {
  const labelValueMapper = {
    "male": "Αγόρι",
    "female": "Κορίτσι",
  };

  const ageLabelDictionary = {
    0.4: "6 μηνών",
    0.5: "7 μηνών",
    0.6: "8 μηνών",
    0.7: "9 μηνών",
    0.8: "10 μηνών",
    0.9: "11 μηνών",
    1: "1 έτους",
    1.5: "1,5 έτους",
    2: "2 ετών",
    2.5: "2,5 ετών",
    3: "3 ετών",
    4: "4 ετών",
    5: "5 ετών",
    6: "6 ετών",
    7: "7 ετών",
    8: "8 ετών",
    9: "9 ετών",
    10: "10 ετών",
    11: "11 ετών",
    12: "12 ετών",
    13: "13 ετών",
    14: "14 ετών",
    15: "15 ετών",
    16: "16 ετών",
    17: "17 ετών",
  }

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
        <p>{isEditable && MandatoryFields ? "Ηλικία*:" : "Ηλικία:"}</p>
        <StyledSelect
          placeholder="Ηλικία..."
          value={kid.age !== null ? {label: ageLabelDictionary[kid.age], value: kid.age} : null}
          options={Object.entries(ageLabelDictionary)
            .sort(([keyA], [keyB]) => parseFloat(keyA) - parseFloat(keyB)) // Ταξινόμηση βάσει αριθμητικής σειράς
            .map(([key, value]) => ({
              label: value,
              value: parseFloat(key), // Μετατροπή των τιμών σε αριθμούς
            }))}
          isDisabled={!isEditable}
          onChange={(selectedOption) => handleAgeChange(selectedOption)}
        />
        <p>{isEditable && MandatoryFields ? "Φύλο*:" : "Φύλο:"}</p>
        <StyledSelect
          placeholder="Φύλο..."
          value={kid.gender !== null ? {label: labelValueMapper[kid.gender], value: kid.gender} : null}
          options={[
            {label: 'Αγόρι', value: 'male'},
            {label: 'Κορίτσι', value: 'female'},
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