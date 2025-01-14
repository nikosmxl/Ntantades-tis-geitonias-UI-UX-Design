import React, { useState } from 'react';
import s from './PaymentStyle.module.css';
import troll_prof from "../../Assets/Pictures/troll_prof.jpg";
import qr_code from "../../Assets/Pictures/qr_code.png";
import ExpandButtons from '../ExpandButtons/ExpandButtons';
import { useNavigate } from 'react-router-dom';

const Payment = ({ payment, isParent = true }) => {
  const [isExpanded, setExpanded] = useState(false);
  
  const navigate = useNavigate();
  
  const toggleIsExpanded = () => {
    setExpanded(!isExpanded);
  };

  const handleViewPartnership = () => {
    navigate('../partnership/1', {path: '..'});
  };

  const handleUserClick = () => {
    if (isParent) return navigate('/parent/babysitter-details/1');

    navigate('/babysitter/parent-details/1');
  };

  return (
    <div className={s.payment_container}>

      <div
        className={`${s.payment} ${isExpanded ? s.open : ''}`}
        style={{
          borderColor: payment.status === 'redeemed' ? '#429602' : '#2761CE',
        }}
      >
        <div className={s.payment_top_row}>
          <div className={s.payment_general_info}>
            <img src={troll_prof} alt="Profile" onClick={handleUserClick}/>
            <b className={s.name}>Δήμητρα Χατζή</b>
            <p>•</p>
            {payment.status === 'redeemed'
            ?
              <p>Έγινε εξαργύρωση</p>
            :
              <p>Εκκρεμεί εξαργύρωση</p>
            }
          </div>
          <div className={s.first_row_right_side}>
            <p className={`${s.payment_date} ${!isExpanded ? s.not_expanded : ''}`}>22/12/2024</p>
          </div>
        </div>
        <div className={s.payment_details}>
          <div
            className={s.view_agreement}
            onClick={handleViewPartnership}
          >
            <h4>ΠΡΟΒΟΛΗ ΣΥΜΦΩΝΗΤΙΚΟΥ ΣΥΝΕΡΓΑΣΙΑΣ</h4>
          </div>
          <hr />
          <div className={s.qr_container}>
            <p>Κωδικός QR:</p>
            <img src={qr_code} alt="Payment QR Code"/>
          </div>
        </div>
      </div>

      <ExpandButtons
        isExpanded={isExpanded}
        toggleIsExpanded={toggleIsExpanded}
        showExpandButton={!isParent}
        showOptionsButtons={false}
        showDeleteButton={false} 
        showDeclineButton={false}
        showEditButton={false}
        showAcceptButton={!false} 
      />
    </div>
  );
}
 
export default Payment;