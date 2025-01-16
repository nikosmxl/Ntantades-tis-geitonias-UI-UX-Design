import React from 'react';
import s from './ReferenceStyle.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileLines } from '@fortawesome/free-solid-svg-icons';
import { storage } from "../../firebase";
import { getDownloadURL, ref } from 'firebase/storage';

const Reference = ({ babysitterId, reference }) => {

    const handleDownload = async () => {
      const referenceRef = ref(storage, `references/${babysitterId}/${reference.filename}`);
      const referenceUrl = await getDownloadURL(referenceRef);
      window.open(referenceUrl, '_blank');
    };

  return (
    <div className={s.reference} onClick={handleDownload} style={{cursor: 'pointer'}}>
      <div className={s.reference_info}>
        <FontAwesomeIcon icon={faFileLines} />
        <h4>{reference.filename}</h4>
      </div>
      <p>13/12/2023</p>
    </div>
  );
}
 
export default Reference;