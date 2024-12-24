import React from 'react';
import s from './ReferenceStyle.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis, faFileLines } from '@fortawesome/free-solid-svg-icons';

const Reference = ({}) => {
  return (
    <div className={s.reference}>
      <div className={s.reference_info}>
        <FontAwesomeIcon icon={faFileLines} />
        <h4>Συστατική Επιστολή.pdf</h4>
      </div>
      <p>13/12/2023</p>
    </div>
  );
}
 
export default Reference;