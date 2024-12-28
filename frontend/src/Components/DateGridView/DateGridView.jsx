import React from 'react';
import s from './DateGridViewStyle.module.css';
import Date from './Date/Date';

const DateGridView = ({ dates }) => {
  return (

    <div className={s.grid_view}>
      {
        dates.map((date, index) => {
          return (
            <Date
              key={`${date.status} ${index}`}
              date={date}
            />
          )
        })
      }
    </div>
  );
}
 
export default DateGridView;