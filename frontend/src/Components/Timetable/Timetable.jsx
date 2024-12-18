import React from "react";
import s from "./TimetableStyle.module.css";

function Timetable({ width = "400px", height = "200px", isEnabled = true }) {
  const days = ["Δ", "T", "T", "Π", "Π", "Σ", "Κ"];
  const times = [
    "6-9 πμ",
    "9-12 πμ",
    "12-3 μμ",
    "3-6 μμ",
    "6-9 μμ",
    "9-12 μμ",
    "12-6 πμ",
  ];

  const tableStyle = {
    width: width,
    height: height,
  };

  return (
    <div className={s.availability_container} style={tableStyle}>
      <table className={s.availability_table}>
        <thead>
          <tr>
            <th></th>
            {days.map((day, index) => (
              <th key={index}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {times.map((time, rowIndex) => (
            <tr key={rowIndex}>
              <td className={s.time_label}>{time}</td>
              {days.map((_, colIndex) => (
                <td key={colIndex}>
                  <input
                    disabled={!isEnabled}
                    type="checkbox"
                    className={s.checkbox}
                    style={{
                      width: `calc(${width} / 15)`,
                      height: `calc(${height} / 15)`,
                    }}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Timetable;
