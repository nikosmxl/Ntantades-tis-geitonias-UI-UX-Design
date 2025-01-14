import React, { useState } from 'react';
import s from './ViewPartnershipStyle.module.css';
import PersonalDetails from '../../../Components/PersonalDetails/PersonalDetails';
import FamilyInfo from '../../../Components/FamilyInfo/FamilyInfo';
import PartnershipAgreement from '../../../Components/PartnershipAgreement/PartnershipAgreement';
import trollProf from '../../../Assets/Pictures/troll_prof.jpg';
import Checkbox from '../../../Components/Checkbox/Checkbox';
import Breadcrumbs from '../../../Components/Breadcrumbs/Breadcrumbs';

const ViewPartnership = ({}) => {
  const [partnershipData, setPartnershipData] = useState({
    "parentDetails": {
      "profilePic": trollProf,
      "name": "Ιωάννα",
      "surname": "Χατζή",
      "age": 29,
      "email": "ioanna123@gmail.com",
      "gender": "Γυναίκα",
      "mobile": "6912345678",
      "phone": "2102345678",
      "ethnicity": "Ελληνική",
      "residence": "Άνω Πατήσια, Αττική",
      "language": "Ελληνικά",
    },
    "babysitterDetails": {
      "profilePic": trollProf,
      "name": "Ιωάννα",
      "surname": "Χατζή",
      "age": 29,
      "email": "ioanna123@gmail.com",
      "gender": "Γυναίκα",
      "mobile": "6912345678",
      "phone": "2102345678",
      "ethnicity": "Ελληνική",
      "residence": "Άνω Πατήσια, Αττική",
      "language": "Ελληνικά",
    },
    "familyDetails": {
      "description": "Λίγα Λόγια",
      "kids": [
        {id: 1, age: 2, gender: 'boy', hasDisabilities: false, hasAllergies: false, description: ''},
      ],
      "hasPets": false,
    },
    "partnershipDetails": {
      "address": 'Βλαστού 2',
      "dimos": 'ΔΗΜΟΣ ΚΑΛΛΙΘΕΑΣ',
      "perioxh": 'Τζιτζιφιές',
      "partTime": true,
      "fullTime": false,
      "startDate": {},
      "endDate": {},
      "availability": [],
      "specialNeeds": false,
      "asl": false,
      "babysitterCar": false,
      "familyCar": false,
      "languages": {
        "english": false,
        "french": false,
        "italian": false,
        "spanish": false,
        "russian": false,
        "arabic": false,
        "german": false,
      },
      "services": {
        "cooking": false,
        "cleaning": false,
        "ironing": false,
        "firstAid": false,
        "babysitterCertificate": false,
        "homeworkHelp": false,
        "visits": false,
        "accompanyToActivities": false,
        "outdoorActivities": false,
        "emergencyAvailability": false,
        "englishNativeSpeaker": false,
        "hosting": false,
      },
    },
    "parentSigned": false,
    "babysitterSigned": false,
  });

  return (
    <div className={s.view_partnership_container}>
      <div className={s.breadcrumbs_container}>
        <Breadcrumbs
          breadcrumbItems={[
            { label: 'Αρχική Σελίδα', route: ''},
            { label: 'Συνεργασία', route: 'partnership'},
            { label: 'Προβολή Συμφωνητικού Συνεργασίας', route: '.'},
          ]}
        />
      </div>
      <div className={s.view_partnership_main_content}>
        <div>
          <h2>Συμφωνητικό Συνεργασίας</h2>
          <hr />
          <div className={s.view_partnership_personal_details_container}>
            <PersonalDetails
              userData={partnershipData.parentDetails}
              ShowOff={true}
              formMarginRight='20px'
              horizontalMargin='0'
            />
            <hr />
            <PersonalDetails
              userData={partnershipData.babysitterDetails}
              ShowOff={true}
              formMarginRight='20px'
              horizontalMargin='0'
            />
          </div>
        </div>

        <FamilyInfo
          isEditable={false}
          description={partnershipData.familyDetails.description}
          kids={partnershipData.familyDetails.kids}
          hasPets={partnershipData.familyDetails.hasPets}
        />

        <PartnershipAgreement
          data={partnershipData.partnershipDetails}
          showOff={true}
          showBabysitter={false}
          alignLeft={true}
          horizontalMargin='0'
        />

        <div className={s.sign_container}>
          <h3>Υπογραφή και Οριστική Υποβολή</h3>
          <hr />
          <div className={s.sign}>
            <div className={s.parent_signature}>
              <h3>Υπογραφή Κηδεμόνα</h3>
              <Checkbox
                name='parentSigned'
                isChecked={partnershipData.parentSigned}
                isEnabled={false}
                width='90px'
                height='90px'
              />
            </div>
            <div className={s.babysitter_signature}>
              <Checkbox
                name='parentSigned'
                isChecked={partnershipData.babysitterSigned}
                isEnabled={false}
                width='90px'
                height='90px'
              />
              <h3>Υπογραφή Νταντάς</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
 
export default ViewPartnership;