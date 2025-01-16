import React from 'react';
import s from './FilterSectionStyle.module.css';
import Checkbox from '../Checkbox/Checkbox';
import Timetable from '../Timetable/Timetable';
import Select from 'react-select';
import FilterSectionInput from '../Input/Input';
import Stars from '../Stars/Stars';
import { Input } from 'reactstrap';

const FilterSection = ({ sectionLabel, fields=[] }) => {

  const handleDateChange = (field, newDateStr) => {
    const newDate = new Date(newDateStr);

    const newDay = newDate.getDate();
    const newMonth = newDate.getMonth() + 1;
    const newYear = newDate.getFullYear();

    field.onChange(newDay && newMonth && newYear ? {
      day: newDay,
      month: newMonth,
      year: newYear,
    } : null);
  };

  return (
    <div className={s.filter_section}>
      <p>{sectionLabel}</p>
      <hr/>
      <div className={s.filters}>
        {
          fields.map(field => {
            if (field.type === 'checkbox') {
              return (
                <Checkbox
                  key={field.name}
                  name={field.name}
                  label={field.label}
                  isChecked={field.isChecked}
                  onChange={field.onChange}
                />
              );
            } else if (field.type === 'timetable') {
              return (
                <Timetable
                  key={field.name}
                  width={field.width}
                  height={field.height}
                  isEnabled={true}
                  onChange={field.onChange}
                  checkedSlots={field.checkedSlots}
                />
              );
            } else if (field.type === 'dropdown') {
              return (
                <Select
                  key={field.name}
                  placeholder={field.placeholder}
                  options={field.options}
                  onChange={field.onChange}
                />
              );
            } else if (field.type === 'input') {
              return (
                <FilterSectionInput
                  key={field.name}
                  name={field.name}
                  value={field.value}
                  placeholder={field.placeholder}
                  onChange={field.onChange}
                />
              );
            } else if (field.type === 'date') {
              return (
                <Input
                  key={field.name}
                  type='date'
                  onChange={(e) => handleDateChange(field, e.target.value)}
                  style={{
                    fontFamily: 'Inter',
                    fontSize: '14px',
                    padding: '3px 5px',
                    borderRadius: '10px',
                    border: '1px solid rgba(0, 0, 0, 0.5)',
                  }}
                />
              )
            } else if (field.type === 'stars') {
              return (
                <div
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}
                >
                  <p>{field.label}:</p>
                  <Stars
                    key={field.name}
                    rating={field.rating}
                    showRating={false}
                    onChange={field.onChange}
                    isEnabled={true}
                    color='#E9BA00'
                  />
                </div>
              )
            }
          })
        }
      </div>
    </div>
  );
};
 
export default FilterSection;