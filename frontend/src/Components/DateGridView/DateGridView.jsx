import React from 'react';
import s from './DateGridViewStyle.module.css';
import Date from './Date/Date';

const DateGridView = ({ dates, onDateClick }) => {
  return (

    <div className={s.grid_view}>
      {
        dates.map((date, index) => {
          return (
            <Date
              key={`${date.status} ${index}`}
              date={date}
              onClick={onDateClick}
            />
          )
        })
      }
    </div>
  );
}
 
export default DateGridView;