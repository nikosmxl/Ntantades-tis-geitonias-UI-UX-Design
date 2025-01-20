import React from 'react';
import s from './ConfirmAndSignStyle.module.css';
import PartnershipAgreement from '../../../../Components/PartnershipAgreement/PartnershipAgreement';
import PersonalDetails from '../../../../Components/PersonalDetails/PersonalDetails';
import Checkbox from '../../../../Components/Checkbox/Checkbox';
import FamilyInfo from '../../../../Components/FamilyInfo/FamilyInfo';


const ConfirmAndSign = ({ data, parent, babysitter, onChange, showOff=false }) => {
  return (
    <div className={s.confirm_and_sign_container}>
      <div classNam={s.confirm_container}>
        <h3>Επιβεβαίωση</h3>
        <hr />
        <div className={s.confirm}>
          <PersonalDetails
            userData={parent}
            ShowOff={true}
          />
          <FamilyInfo
            isEditable={false}
            description={parent.description}
            kids={parent.kids}
            hasPets={parent.hasPets}
          />
          <PartnershipAgreement
            data={data}
            babysitter={babysitter}
            showOff={true}
            horizontalMargin='0'
            alignLeft={true}
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
              isChecked={data?.parentSigned ?? false}
              onChange={() => {
                onChange({
                  ...data,
                  parentSigned: !data?.parentSigned,
                });
              }}
              isEnabled={!showOff}
              width='90px'
              height='90px'
            />
          </div>
          <div className={s.babysitter_signature}>
            <Checkbox
              name='babysitterSigned'
              isChecked={data?.babysitterSigned ?? false}
              isEnabled={false}
              width='90px'
              height='90px'
            />
            <h3>Υπογραφή Νταντάς</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
 
export default ConfirmAndSign;