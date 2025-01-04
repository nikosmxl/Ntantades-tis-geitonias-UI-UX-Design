import React from 'react';
import s from './FilterSectionStyle.module.css';
import Checkbox from '../Checkbox/Checkbox';
import Timetable from '../Timetable/Timetable';
import Select from 'react-select';
import Input from '../Input/Input';
import DateDropdowns from '../DateDropdowns/DateDropdowns';

const FilterSection = ({ sectionLabel, fields=[] }) => {
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
                />
              );
            } else if (field.type === 'dropdown') {
              return (
                <Select
                  key={field.name}
                  placeholder={field.placeholder}
                  options={field.options.map(option => {
                    return {
                      value: option,
                      label: option,
                    };
                  })}
                  onChange={field.onChange}
                />
              );
            } else if (field.type === 'input') {
              return (
                <Input
                  key={field.name}
                  name={field.name}
                  value={field.value}
                  placeholder={field.placeholder}
                  onChange={field.onChange}
                />
              );
            } else if (field.type === 'date') {
              return (
                <DateDropdowns
                  key={field.name}
                  layout={'column'}
                  day={field.date?.day ?? ''}
                  month={field.date?.month ?? ''}
                  year={field.date?.year ?? ''}
                  onChange={field.onChange}
                />
              )
            }
          })
        }
      </div>
    </div>
  );
};
 
export default FilterSection;