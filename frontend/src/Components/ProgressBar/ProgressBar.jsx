import React from "react";
import s from "./ProgressBarStyle.module.css";

function ProgressBar({ step, steps, stepChange }) {

  return (
    <div className={s.progress_bar}>
        {steps.map((currentStep, index) => (
        <div key={index} className={s.step_circle_with_connection}>
            <div className={`${s.step_circle} ${index !== 0 ? s.not_first : ""} ${index < step ? s.completed : index === step ? s.current : ""}`} onClick={() => {stepChange(index)}}>
                <p>{currentStep.title}</p>
            </div>
            {index !== steps.length - 1 &&
                <div className={`${s.connection} ${index < step ? s.completed : ""}`}></div>
            }
        </div>
        ))}
    </div>
  );
}

export default ProgressBar;
