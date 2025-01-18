import React, { useState } from 'react';
import s from './AvailabilityCalendarStyle.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { getFormattedDate } from '../../utils/date';
import { days, months, times } from '../../utils/options';

const AvailabilityCalendar = ({availability, selectedTimeslot, onAvailabilityChange, onTimeslotChange, editableAvailability=false, showWeeks=true, isEditable=true, width='100%'}) => {
  const [weekIndex, setWeekIndex] = useState(0);

  const currDate = new Date();
  currDate.setUTCDate(currDate.getUTCDate() + (weekIndex * 7));
  let week = [];

  const dayOfWeek = currDate.getDay(); // 0 for Sunday, 1 for Monday, etc.
  const startOfWeek = currDate.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1); // Adjust for Monday

  for (let i = 0; i < 7; i++) {
    const date = new Date(currDate.setDate(startOfWeek + i));
    const dayNumber = date.getDate();
    const dayName = days[i];
    const monthName = months[date.getMonth()];
    week.push({tableLabel: `${dayNumber} ${dayName}`, headerLabel: `${dayNumber} ${monthName}`, dateLabel: getFormattedDate(date)});
  }

  const getStyleForCell = (dayIndex, timeIndex) => {
    if (selectedTimeslot?.day === dayIndex && selectedTimeslot?.time === timeIndex) {
      return {
        'backgroundColor': 'rgba(47, 114, 239, 0.8)',
        'cursor': 'pointer',
      };
    }

    const timeslot = availability.find(timeslot => {
      return timeslot.day === dayIndex && timeslot.time === timeIndex;
    });

    if (timeslot) {
      return {
        'backgroundColor': 'rgba(78, 166, 10, 0.6)',
        'cursor': 'pointer',
      };
    }
    return {};
  };

  const handleTimeslotClick = (dayIndex ,timeIndex) => {
    if (!isEditable) return;

    const timeslotAvailable = availability.find(timeslot => {
      return timeslot.day === dayIndex && timeslot.time === timeIndex;
    });

    if (editableAvailability) {
      if (timeslotAvailable) {
        onAvailabilityChange(availability.filter(timeslot => {
          return timeslot.day !== dayIndex || timeslot.time !== timeIndex;
        }));
      } else {
        onAvailabilityChange([...availability, {day: dayIndex, time: timeIndex}]);
      }
      return;
    }

    if (selectedTimeslot?.day === dayIndex && selectedTimeslot?.time === timeIndex) {
      onTimeslotChange({day: null, time: null});
      return;
    }

    if (!timeslotAvailable) {
      return;
    }

    onTimeslotChange({ day: dayIndex, time: timeIndex, }, week[dayIndex].dateLabel);
  };

  return (
    <div
      className={s.availability_calendar_container}
      style={{
        width: width,
      }}
    >
      {
        showWeeks && (
          <div className={s.availability_calendar_header_container}>
            <div
              className={weekIndex > 0 ? s.change_week_button : s.change_week_button_disabled}
              onClick={() => {
                if (weekIndex <= 0) return;
                setWeekIndex((prevWeekIndex) => prevWeekIndex-1)
              }}
            >
              <FontAwesomeIcon icon={faAngleLeft} color='rgba(0, 0, 0, 0.65)'/>
            </div>
            
            <p>{week[0].headerLabel} - {week[week.length-1].headerLabel}</p>
    
            <div
              className={s.change_week_button}
              onClick={() => setWeekIndex((prevWeekIndex) => prevWeekIndex+1)}
            >
              <FontAwesomeIcon icon={faAngleRight} color='rgba(0, 0, 0, 0.65)'/>
            </div>
          </div>
        )
      }
      <table className={s.availability_calendar}>
        <thead>
          <tr>
            <th></th>
            {week.map((day, index) => (
              <th key={index}>{day.tableLabel}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {times.map((time, rowIndex) => (
            <tr key={rowIndex}>
              <td className={s.time_label}>{time}</td>
              {days.map((_, colIndex) => {
                const cellStyle = getStyleForCell(colIndex, rowIndex);
                return(
                  <td
                    key={colIndex}
                    style={{
                      ...cellStyle,
                      'transition': '0.1s all ease-in',
                    }}
                    onClick={() => handleTimeslotClick(colIndex, rowIndex)}
                  />
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}
 
export default AvailabilityCalendar;