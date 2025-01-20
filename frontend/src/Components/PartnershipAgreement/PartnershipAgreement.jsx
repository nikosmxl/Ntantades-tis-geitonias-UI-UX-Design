import React, { useEffect } from 'react';
import s from './PartnershipAgreementStyle.module.css';
import StyledSelect from '../StyledSelect/StyledSelect';
import Checkbox from '../Checkbox/Checkbox';
import DateDropdowns from '../DateDropdowns/DateDropdowns';
import Timetable from '../Timetable/Timetable';
import { useNavigate } from 'react-router-dom';
import { cityNeighborhoods, cityOptions, servicesMapper, transportationOptions } from '../../utils/options';

const PartnershipAgreement = ({ data, babysitter, onChange, showOff=false, horizontalMargin='320px', alignLeft=false, showBabysitter=true }) => {
  const dictionaries = {
    languages: {
        'english': "Αγγλικά",
        'french': "Γαλλικά",
        'italian': "Ιταλικά",
        'spanish': "Ισπανικά",
        'german': "Γερμανικά",
        'russian': "Ρώσικα",
        'arabic': "Αραβικά"
    },
    services: servicesMapper,
};
  
  const navigate = useNavigate();

  const handleCheckboxChange = (state, setState, value) => {
      if (state.includes(value)) {
          setState(state.filter(item => item !== value));
      } else {
          setState([...state, value]);
      }
  };

  // useEffect(() => {
  //   onChange({ ...data, neighbourhood: null });
  // }, [data.area]);

  return (
    <div
      className={s.partnership_agreement_container}
      style={{
        margin: `0 ${horizontalMargin}`,
      }}
    >
      {
        showBabysitter && (
          <div className={s.partnered_babysitter_container}>
            <h3 className={s.inner_title}>Συνεργαζόμενη νταντά</h3>
            <hr />
            <div
              className={s.partnered_babysitter}
              onClick={() => {
                navigate(`../babysitter-details/${babysitter.id}`, {path: '..'});
              }}
              style={{
                alignSelf: alignLeft ? 'left' : 'center',
                marginLeft: alignLeft ? '213px' : '0',
              }}
            >
              <img src={babysitter?.profilePicture} alt='Profile' />
              <p>{babysitter?.name} {babysitter?.surname}</p>
            </div>
          </div>
        )
      }

      <div className={s.family_needs_container}>
        <h3 className={s.inner_title}>Ανάγκες οικογένειας</h3>
        <hr />
        <div
          className={s.family_needs}
          style={{
            alignSelf: alignLeft ? 'left' : 'center',
            marginLeft: alignLeft ? '213px' : '0',
          }}
        >
          <div className={s.partnership_section}>
            <div>
              <h4>Περιοχή εξυπηρέτησης*</h4>
              <hr />
            </div>
            <div className={s.section_content}>
              <StyledSelect
                value={cityOptions.find(option => option.value === data?.area)}
                onChange={(selectedOption) => {
                  onChange({
                    ...data,
                    area: selectedOption.value,
                  });
                }}
                options={cityOptions}
                isDisabled={showOff}
                isSearchable={false}
              />
              <div className={s.inner_dropdown}>
                  <StyledSelect
                    value={cityNeighborhoods[data?.area]?.find(option => option.value === data?.neighbourhood)}
                    onChange={(selectedOption) => {
                      onChange({
                        ...data,
                        neighbourhood: selectedOption.value,
                      });
                    }}
                    options={cityNeighborhoods[data?.area]}
                    isDisabled={showOff}
                    isSearchable={false}
                />
              </div>
            </div>
          </div>

          <div className={s.partnership_section}>
            <div>
              <h4>Οδός και αριθμός κατοικίας εξυπηρέτησης*</h4>
              <hr />
            </div>
            <div className={s.section_content}>
              <input className={s.form_group_input}
                type="text"
                id="address"
                value={data?.address}
                onChange={(e) => {
                  onChange({
                    ...data,
                    address: e.target.value,
                  });
                }}
                disabled={showOff}
              />
            </div>
          </div>

          <div className={s.partnership_section}>
            <div>
              <h4>Χρόνος απασχόλησης*</h4>
              <hr />
            </div>
            <div className={s.section_content}>
              {["Πλήρης απασχόληση", "Μερική απασχόληση"].map(option => (
                  <Checkbox
                      key={option}
                      name="workingHours"
                      isChecked={data?.workingHours === option}
                      onChange={() => onChange({ ...data, workingHours: option })}
                      label={option}
                      isEnabled={!showOff}
                  />
              ))}
            </div>
          </div>

          <div className={s.partnership_section}>
            <div>
              <h4>Ημερομηνία έναρξης συνεργασίας*</h4>
              <hr />
            </div>
            <div className={s.section_content}>
              <DateDropdowns
                day={data?.startingDate?.day ?? null}
                month={data?.startingDate?.month ?? null}
                year={data?.startingDate?.year ?? null}
                isEnabled={!showOff}
                onChange={(newStartDate) => {
                  onChange({
                    ...data,
                    startingDate: newStartDate,
                  });
                }}
              />
            </div>
          </div>

          <div className={s.partnership_section}>
            <div>
              <h4>Ημερομηνία λήξης συνεργασίας*</h4>
              <hr />
            </div>
            <div className={s.section_content}>
              <DateDropdowns
                day={data?.endingDate?.day ?? null}
                month={data?.endingDate?.month ?? null}
                year={data?.endingDate?.year ?? null}
                isEnabled={!showOff}
                onChange={(newEndDate) => {
                  onChange({
                    ...data,
                    endingDate: newEndDate,
                  });
                }}
              />
            </div>
          </div>

          <div className={s.partnership_section}>
            <div>
              <h4>Διαθεσιμότητα και ώρες*</h4>
              <hr />
            </div>
            <div className={s.section_content}>
              <Timetable
                width='359px'
                height='263px'
                checkedSlots={data?.availability ?? []}
                isEnabled={!showOff}
                onChange={(newTimetable) => {
                  console.log(newTimetable)
                  onChange({
                    ...data,
                    availability: newTimetable,
                  });
                }}
              />
            </div>
          </div>

          <div className={s.partnership_section}>
            <div>
              <h4>Ειδίκευση σε</h4>
              <hr />
            </div>
            <div className={s.section_content}>
              {["specialNeeds", "asl"].map(option => (
                  <Checkbox
                      key={option}
                      name={"specialties"}
                      isChecked={data?.specialization?.[option] ?? false}
                      isEnabled={!showOff}
                      label={option === "specialNeeds" ? "ΑμεΑ" : "Νοηματική"}
                      onChange={() => {
                        onChange({
                          ...data,
                          specialization: {
                            ...data.specialization,
                            [option]: !data?.specialization?.[option]
                          }
                        })
                      }}
                  />
              ))}
            </div>
          </div>

          <div className={s.partnership_section}>
            <div>
              <h4>Μετακίνηση παιδιών</h4>
              <hr />
            </div>
            <div className={s.section_content}>
              {transportationOptions.map(option => (
                  <Checkbox
                      key={option}
                      name={"transportation"}
                      isChecked={(data?.transportation) === option.value}
                      isEnabled={!showOff}
                      onChange={() => {
                        if (option.value !== data?.transportation) {
                          onChange({ ...data, transportation: option.value });
                        } else {
                          const otherTransportationOption = transportationOptions.find(transportationOption => option.value !== transportationOption.value);
                          onChange({ ...data, transportation: otherTransportationOption.value });
                        }
                      }}
                      label={option.label}
                  />
              ))}
            </div>
          </div>

          <div className={s.partnership_section}>
            <div>
              <h4>Γνώσεις ξένων γλωσσών</h4>
              <hr />
            </div>
            <div className={s.section_content}>
              {Object.entries(dictionaries.languages).map(([language, translation]) => (
                  <Checkbox
                      key={language}
                      name={"language"}
                      isChecked={Array.isArray(data?.languages) && data.languages.includes(language)}
                      onChange={() => handleCheckboxChange(data?.languages ?? [], (newLanguages) => onChange({ ...data, languages: newLanguages }), language)}
                      label={translation}
                      isEnabled={!showOff}
                  />
              ))}
            </div>
          </div>

          <div className={s.partnership_section}>
            <div>
              <h4>Υπηρεσίες</h4>
              <hr />
            </div>
            <div className={s.section_content}>
              {Object.entries(dictionaries.services).map(([service, translation]) => (
                  <Checkbox
                      key={service}
                      name={"services"}
                      isChecked={Array.isArray(data?.services) && data.services.includes(service)}
                      onChange={() => handleCheckboxChange(data?.services ?? [], (newServices) => onChange({ ...data, services: newServices }), service)}
                      label={translation}
                      isEnabled={!showOff}
                  />
              ))}
            </div>
          </div>


        </div>
      </div>
    </div>
  );
}
 
export default PartnershipAgreement;