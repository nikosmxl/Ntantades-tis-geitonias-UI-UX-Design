import React from 'react';
import s from './ConfirmAndSignStyle.module.css';
import PartnershipAgreement from '../../../../Components/PartnershipAgreement/PartnershipAgreement';
import PersonalDetails from '../../../Common Pages/BabysitterSignupForm/PersonalDetails/PersonalDetails';
import Checkbox from '../../../../Components/Checkbox/Checkbox';
import FamilyInfo from '../../../../Components/FamilyInfo/FamilyInfo';
import { useNavigate } from 'react-router-dom';


const ConfirmAndSign = ({ data, onChange }) => {
  const navigate = useNavigate();
  
  const handleReject = () => {
    // api call to reject partnership
    navigate('../partnership', {path: '..'});
  };
  
  return (
    <div className={s.confirm_and_sign_container}>
      <div classNam={s.confirm_container}>
        <h3>Επιβεβαίωση</h3>
        <hr />
        <div className={s.confirm}>
          <PersonalDetails
            userData={data.parentDetails}
            ShowOff={true}
          />
          <FamilyInfo
            isEditable={false}
            description={data.familyDetails.description}
            kids={data.familyDetails.kids}
            hasPets={data.familyDetails.hasPets}
            showParent={true}
            alignLeft={true}
          />
          <PartnershipAgreement
            data={data.partnershipDetails}
            showOff={true}
            horizontalMargin='0'
            alignLeft={true}
            showBabysitter={false}
          />
        </div>
      </div>

      <div className={s.sign_container}>
        <h3>Υπογραφή και Οριστική Υποβολή</h3>
        <hr />
        <div className={s.sign}>
          <div className={s.parent_signature}>
            <h3>Υπογραφή Κηδεμόνα</h3>
            <Checkbox
              name='parentSigned'
              isChecked={data.parentSigned}
              isEnabled={false}
              width='90px'
              height='90px'
            />
          </div>
          <div className={s.babysitter_signature}>
            <Checkbox
              name='parentSigned'
              isChecked={data.babysitterSigned}
              isEnabled={true}
              onChange={() => {
                onChange({
                  ...data,
                  babysitterSigned: !data.babysitterSigned,
                });
              }}
              width='90px'
              height='90px'
            />
            <h3>Υπογραφή Νταντάς</h3>
          </div>
        </div>
        <p onClick={handleReject}>Απόρριψη Συμφωνητικού</p>
      </div>
    </div>
  );
}
 
export default ConfirmAndSign;