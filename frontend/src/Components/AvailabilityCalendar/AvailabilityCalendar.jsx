import React, { useState } from 'react';
import s from './AvailabilityCalendarStyle.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

const AvailabilityCalendar = ({}) => {
  const [weekIndex, setWeekIndex] = useState(0);
  const [availableTimeslots, setAvailableTimeslots] = useState([
    {day: 0, time: 0},
    {day: 0, time: 1},
    {day: 0, time: 2},
    {day: 0, time: 3},
    {day: 1, time: 0},
    {day: 1, time: 1},
    {day: 1, time: 2},
    {day: 1, time: 3},
    {day: 1, time: 4},
    {day: 1, time: 5},
    {day: 1, time: 6},
  ]);
  const [selectedTimeslot, setSelectedTimeslot] = useState({
    day: 1,
    time: 1,
  });

  const days = ["Δευτέρα", "Tρίτη", "Tετάρτη", "Πέμπτη", "Παρασκευή", "Σάββατο", "Κυριακή"];
  const months = [
    "Ιανουαρίου", "Φεβρουαρίου", "Μαρτίου", "Απριλίου", "Μαΐου", "Ιουνίου", 
    "Ιουλίου", "Αυγούστου", "Σεπτεμβρίου", "Οκτωβρίου", "Νοεμβρίου", "Δεκεμβρίου"
  ];
  const times = [
    "07:00 πμ",
    "08:00 πμ",
    "09:00 πμ",
    "10:00 πμ",
    "11:00 πμ",
    "12:00 μμ",
    "01:00 μμ",
    "02:00 μμ",
    "03:00 μμ",
    "04:00 μμ",
    "05:00 μμ",
    "06:00 μμ",
    "07:00 μμ",
    "08:00 μμ",
    "09:00 μμ",
    "10:00 μμ",
    "11:00 μμ",
  ];

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
    week.push({tableLabel: `${dayNumber} ${dayName}`, headerLabel: `${dayNumber} ${monthName}`});
  }

  const getStyleForCell = (dayIndex, timeIndex) => {
    if (selectedTimeslot.day === dayIndex && selectedTimeslot.time === timeIndex) {
      return {
        'backgroundColor': 'rgba(47, 114, 239, 0.8)',
        'cursor': 'pointer',
      };
    }

    const timeslot = availableTimeslots.find(timeslot => {
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
    if (selectedTimeslot.day === dayIndex && selectedTimeslot.time === timeIndex) {
      setSelectedTimeslot({day: null, time: null});
      return;
    }

    const timeslot = availableTimeslots.find(timeslot => {
      return timeslot.day === dayIndex && timeslot.time === timeIndex;
    });

    if (!timeslot) {
      return;
    }

    setSelectedTimeslot({ day: dayIndex, time: timeIndex });
  };

  return (
    <div className={s.availability_calendar_container}>
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
                    style={cellStyle}
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