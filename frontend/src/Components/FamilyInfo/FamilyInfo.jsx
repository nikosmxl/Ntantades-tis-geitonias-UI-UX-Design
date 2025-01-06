import s from "./FamilyInfoStyle.module.css"
import Select from 'react-select';
import KidCard from "../KidCard/KidCard";
import { useEffect } from "react";

function FamilyInfo({isEditable, description, onDescriptionChange, kids, onKidsNumChange, onKidChange, onHasPetsChange, MandatoryFields=false}){

  return(
      <div className={s.family_profile_section_container}>
        <h3>Οικογένεια</h3>
        {MandatoryFields && <p>Τα πεδία με τον αστερίσκο (*) είναι υποχρεωτικά</p>}
        <hr />

        <div className={s.family_profile_family_info}>
          <textarea
            className={isEditable ? s.family_description_editable : s.family_description}
            disabled={!isEditable}
            value={description}
            onChange={onDescriptionChange}
          />

          <div className={s.family_profile_info_with_dropdown_container}>
            <p>Αριθμός Παιδιών:</p>
            <Select
              defaultValue={{label: kids.length, value: kids.length}}
              options={[
                {label: 1, value: 1},
                {label: 2, value: 2},
                {label: 3, value: 3},
                {label: 4, value: 4},
              ]}
              onChange={(selectedOption) => onKidsNumChange(selectedOption)}
              isDisabled={!isEditable}
            />
          </div>

          {
            kids.map((kid, index) => {
              return (
                <KidCard
                  key={`${kid.id} ${kid.age} ${kid.gender} ${index}`}
                  kid={kid}
                  onChange={onKidChange}
                  isEditable={isEditable}
                  MandatoryFields={MandatoryFields}
                />
              );
            })
          }

          <div className={s.family_profile_info_with_dropdown_container}>
            <p>Κατοικίδια:</p>
            <Select
              defaultValue={{label: 'Οχι', value: false}}
              options={[
                {label: 'Ναι', value: true},
                {label: 'Οχι', value: false},
              ]}
              onChange={(selectedOption) => onHasPetsChange(selectedOption.value)}
              isDisabled={!isEditable}
            />
          </div>
        </div>

      </div>
  );
}

export default FamilyInfo;