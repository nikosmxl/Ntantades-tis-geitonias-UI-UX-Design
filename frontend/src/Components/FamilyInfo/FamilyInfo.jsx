import s from "./FamilyInfoStyle.module.css"
import Select from 'react-select';
import KidCard from "../KidCard/KidCard";
import trollProf from "../../Assets/Pictures/troll_prof.jpg";
import { useNavigate } from 'react-router-dom';
import StyledSelect from "../StyledSelect/StyledSelect";

function FamilyInfo({isEditable, description, onDescriptionChange, kids, onKidsNumChange, onKidChange, hasPets, onHasPetsChange, MandatoryFields=false, showNote=false, showParent=false, alignLeft=false, isForApplication=false}){

  const navigate = useNavigate();

  return(
      <div className={s.family_profile_section_container}>
        {
          showParent && (
            <div className={s.partnered_parent_container}>
              <h3 className={s.inner_title}>Συνεργαζόμενος κηδεμόνας</h3>
              <hr />
              <div
                className={s.partnered_parent}
                onClick={() => {
                  navigate('../parent-details/1', {path: '..'});
                }}
                style={{
                  alignSelf: alignLeft ? 'left' : 'center',
                  marginLeft: alignLeft ? '213px' : '0',
                }}
              >
                <img src={trollProf} alt='Profile' />
                <p>Ονοματεπώνυμο Κηδεμόνα</p>
              </div>
            </div>
          )
        }

        <div className={s.family_profile}>
          {!isForApplication &&
          <>
            <h3>Οικογένεια</h3>
            {isEditable && showNote && <p>Τα πεδία με τον αστερίσκο (*) είναι υποχρεωτικά</p>}
            <hr />
          </>
          }

          <div className={s.family_profile_family_info}>
            {!isForApplication &&
              <textarea
                className={isEditable ? s.family_description_editable : s.family_description}
                disabled={!isEditable}
                value={description}
                onChange={onDescriptionChange}
              />
            }

            <div className={s.family_profile_info_with_dropdown_container}>
              <p>{isEditable && MandatoryFields ? "Αριθμός Παιδιών*:" : "Αριθμός Παιδιών:"}</p>
              <StyledSelect
                value={{label: kids?.length, value: kids?.length}}
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
              kids?.map((kid, index) => {
                return (
                  <KidCard
                    key={`${kid?.id} ${kid?.age} ${kid?.gender} ${index}`}
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
              <StyledSelect
                value={{label: hasPets ? 'Ναι' : 'Οχι', value: hasPets}}
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

      </div>
  );
}

export default FamilyInfo;