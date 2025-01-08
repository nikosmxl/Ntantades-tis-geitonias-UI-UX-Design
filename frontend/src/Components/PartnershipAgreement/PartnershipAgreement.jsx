import React from 'react';
import s from './PartnershipAgreementStyle.module.css';
import trollProf from '../../Assets/Pictures/troll_prof.jpg';
import StyledSelect from '../StyledSelect/StyledSelect';
import Checkbox from '../Checkbox/Checkbox';
import DateDropdowns from '../DateDropdowns/DateDropdowns';
import Timetable from '../Timetable/Timetable';
import { useNavigate } from 'react-router-dom';

const PartnershipAgreement = ({ data, onChange, showOff=false, horizontalMargin='320px', alignLeft=false, showBabysitter=true }) => {
  const {
    address,
    dimos,
    perioxh,
    partTime,
    fullTime,
    startDate,
    endDate,
    availability,
    specialNeeds,
    asl,
    babysitterCar,
    familyCar,
    languages,
    services,
  } = data;

  const {
    cooking,
    cleaning,
    ironing,
    firstAid,
    babysitterCertificate,
    homeworkHelp,
    visits,
    accompanyToActivities,
    outdoorActivities,
    emergencyAvailability,
    englishNativeSpeaker,
    hosting,
  } = services;

  const {
    english,
    french,
    italian,
    spanish,
    russian,
    arabic,
    german,
  } = languages;
  
  const navigate = useNavigate();

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
                navigate('../babysitter-details/1', {path: '..'});
              }}
              style={{
                alignSelf: alignLeft ? 'left' : 'center',
                marginLeft: alignLeft ? '213px' : '0',
              }}
            >
              <img src={trollProf} alt='Profile' />
              <p>Ονοματεπώνυμο Νταντάς</p>
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
                value={{value: dimos, label: dimos}}
                onChange={(selectedOption) => {
                  onChange({
                    ...data,
                    dimos: selectedOption.dimos,
                  });
                }}
                isDisabled={showOff}
                isSearchable={false}
              />
              <div className={s.inner_dropdown}>
                  <StyledSelect
                    value={{value: perioxh, label: perioxh}}
                    onChange={(selectedOption) => {
                      onChange({
                        ...data,
                        perioxh: selectedOption.value,
                      });
                    }}
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
                value={address}
                onChange={(e) => {
                  onChange({
                    ...data,
                    address: e.target.value.trim(),
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
              <Checkbox
                name='partTime'
                label='Μερική απασχόληση'
                isChecked={partTime}
                onChange={() => {
                  onChange({
                    ...data,
                    partTime: !partTime,
                    fullTime: !fullTime,
                  });
                }}
                isEnabled={!showOff}
              />
              <Checkbox
                name='fullTime'
                label='Πλήρης απασχόληση'
                isChecked={fullTime}
                onChange={() => {
                  onChange({
                    ...data,
                    partTime: !partTime,
                    fullTime: !fullTime,
                  });
                }}
                isEnabled={!showOff}
              />
            </div>
          </div>

          <div className={s.partnership_section}>
            <div>
              <h4>Ημερομηνία έναρξης συνεργασίας*</h4>
              <hr />
            </div>
            <div className={s.section_content}>
              <DateDropdowns
                day={startDate?.day ?? null}
                month={startDate?.month ?? null}
                year={startDate?.year ?? null}
                isEnabled={!showOff}
                onChange={(newStartDate) => {
                  onChange({
                    ...data,
                    startDate: newStartDate,
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
                day={endDate?.day ?? null}
                month={endDate?.month ?? null}
                year={endDate?.year ?? null}
                isEnabled={!showOff}
                onChange={(newEndDate) => {
                  onChange({
                    ...data,
                    endDate: newEndDate,
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
                checkedSlots={availability}
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
              <Checkbox
                name='specialNeeds'
                label='ΑμεΑ'
                isChecked={specialNeeds}
                isEnabled={!showOff}
                onChange={() => {
                  onChange({
                    ...data,
                    specialNeeds: !specialNeeds,
                  });
                }}
              />
              <Checkbox
                name='asl'
                label='Νοηματική'
                isChecked={asl}
                isEnabled={!showOff}
                onChange={() => {
                  onChange({
                    ...data,
                    asl: !asl,
                  });
                }}
              />
            </div>
          </div>

          <div className={s.partnership_section}>
            <div>
              <h4>Μετακίνηση παιδιών</h4>
              <hr />
            </div>
            <div className={s.section_content}>
              <Checkbox
                name='babysitterCar'
                label='Με Ι.Χ. Νταντάς'
                isChecked={babysitterCar}
                isEnabled={!showOff}
                onChange={()=>{
                  onChange({
                    ...data,
                    babysitterCar: !babysitterCar,
                  });
                }}
              />
              <Checkbox
                name='familyCar'
                label='Με Ι.Χ. Οικογένειας'
                isChecked={familyCar}
                isEnabled={!showOff}
                onChange={()=>{
                  onChange({
                    ...data,
                    familyCar: !familyCar,
                  });
                }}
              />
            </div>
          </div>

          <div className={s.partnership_section}>
            <div>
              <h4>Υπηρεσίες</h4>
              <hr />
            </div>
            <div className={s.section_content}>
              <Checkbox
                name='english'
                label='Αγγλικά'
                isChecked={english}
                isEnabled={!showOff}
                onChange={()=>{
                  onChange({
                    ...data,
                    languages: { ...languages, english: !english },
                  });
                }}
              />
              <Checkbox
                name='french'
                label='Γαλλικά'
                isChecked={french}
                isEnabled={!showOff}
                onChange={()=>{
                  onChange({
                    ...data,
                    languages: { ...languages, french: !french },
                  });
                }}
              />
              <Checkbox
                name='italian'
                label='Ιταλικά'
                isChecked={italian}
                isEnabled={!showOff}
                onChange={()=>{
                  onChange({
                    ...data,
                    languages: { ...languages, italian: !italian },
                  });
                }}
              />
              <Checkbox
                name='spanish'
                label='Ισπανικά'
                isChecked={spanish}
                isEnabled={!showOff}
                onChange={()=>{
                  onChange({
                    ...data,
                    languages: { ...languages, spanish: !spanish },
                  });
                }}
              />
              <Checkbox
                name='russian'
                label='Ρωσικά'
                isChecked={russian}
                isEnabled={!showOff}
                onChange={()=>{
                  onChange({
                    ...data,
                    languages: { ...languages, russian: !russian },
                  });
                }}
              />
              <Checkbox
                name='arabic'
                label='Αραβικά'
                isChecked={arabic}
                isEnabled={!showOff}
                onChange={()=>{
                  onChange({
                    ...data,
                    languages: { ...languages, arabic: !arabic },
                  });
                }}
              />
              <Checkbox
                name='german'
                label='Γερμανικά'
                isChecked={german}
                isEnabled={!showOff}
                onChange={()=>{
                  onChange({
                    ...data,
                    languages: { ...languages, german: !german }
                  });
                }}
              />
            </div>
          </div>

          <div className={s.partnership_section}>
            <div>
              <h4>Μετακίνηση παιδιών </h4>
              <hr />
            </div>
            <div className={s.section_content}>
              <Checkbox
                name='cooking'
                label='Μαγείρεμα'
                isChecked={cooking}
                isEnabled={!showOff}
                onChange={()=>{
                  onChange({
                    ...data,
                    services: { ...services, cooking: !cooking }
                  });
                }}
              />
              <Checkbox
                name='cleaning'
                label='Καθάρισμα Σπιτιού'
                isChecked={cleaning}
                isEnabled={!showOff}
                onChange={()=>{
                  onChange({
                    ...data,
                    services: { ...services, cleaning: !cleaning }
                  });
                }}
              />
              <Checkbox
                name='ironing'
                label='Σιδέρωμα'
                isChecked={ironing}
                isEnabled={!showOff}
                onChange={()=>{
                  onChange({
                    ...data,
                    services: { ...services, ironing: !ironing }
                  });
                }}
              />
              <Checkbox
                name='firstAid'
                label='Α` βοήθειες'
                isChecked={firstAid}
                isEnabled={!showOff}
                onChange={()=>{
                  onChange({
                    ...data,
                    services: { ...services, firstAid: !firstAid }
                  });
                }}
              />
              <Checkbox
                name='babysitterCertificate'
                label='Πιστοποίηση Νταντάς'
                isChecked={babysitterCertificate}
                isEnabled={!showOff}
                onChange={()=>{
                  onChange({
                    ...data,
                    services: { ...services, babysitterCertificate: !babysitterCertificate }
                  });
                }}
              />
              <Checkbox
                name='homeworkHelp'
                label='Βοήθεια με Μαθήματα'
                isChecked={homeworkHelp}
                isEnabled={!showOff}
                onChange={()=>{
                  onChange({
                    ...data,
                    services: { ...services, homeworkHelp: !homeworkHelp }
                  });
                }}
              />
              <Checkbox
                name='visits'
                label='Εκδρομές / Επισκέψεις'
                isChecked={visits}
                isEnabled={!showOff}
                onChange={()=>{
                  onChange({
                    ...data,
                    services: { ...services, visits: !visits }
                  });
                }}
              />
              <Checkbox
                name='accompanyToActivities'
                label='Συνοδεία σε Δραστηριότητες'
                isChecked={accompanyToActivities}
                isEnabled={!showOff}
                onChange={()=>{
                  onChange({
                    ...data,
                    services: { ...services, accompanyToActivities: !accompanyToActivities }
                  });
                }}
              />
              <Checkbox
                name='outdoorActivities'
                label='Δραστηριότητες Εξωτερικού Χώρου'
                isChecked={outdoorActivities}
                isEnabled={!showOff}
                onChange={()=>{
                  onChange({
                    ...data,
                    services: { ...services, outdoorActivities: !outdoorActivities }
                  });
                }}
              />
              <Checkbox
                name='emergencyAvailability'
                label='Έκτακτη Διαθεσιμότητα'
                isChecked={emergencyAvailability}
                isEnabled={!showOff}
                onChange={()=>{
                  onChange({
                    ...data,
                    services: { ...services, emergencyAvailability: !emergencyAvailability }
                  });
                }}
              />
              <Checkbox
                name='englishNativeSpeaker'
                label='English native speaker'
                isChecked={englishNativeSpeaker}
                isEnabled={!showOff}
                onChange={()=>{
                  onChange({
                    ...data,
                    services: { ...services, englishNativeSpeaker: !englishNativeSpeaker }
                  });
                }}
              />
              <Checkbox
                name='hosting'
                label='Φιλοξενία στην οικία μου'
                isChecked={hosting}
                isEnabled={!showOff}
                onChange={()=>{
                  onChange({
                    ...data,
                    services: { ...services, hosting: !hosting }
                  });
                }}
              />
            </div>
          </div>


        </div>
      </div>
    </div>
  );
}
 
export default PartnershipAgreement;