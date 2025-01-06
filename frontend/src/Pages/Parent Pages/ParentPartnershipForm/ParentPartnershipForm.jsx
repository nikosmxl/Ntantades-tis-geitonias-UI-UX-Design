import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import s from './ParentPartnershipFormStyle.module.css';
import trollProf from '../../../Assets/Pictures/troll_prof.jpg'; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGavel, faCircleLeft, faCircleRight, faRotateLeft, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import ProgressBar from "../../../Components/ProgressBar/ProgressBar";
import ConfirmAndSign from './ConfirmAndSign/ConfirmAndSign';
import FamilyInfo from '../../../Components/FamilyInfo/FamilyInfo';
import PartnershipAgreement from '../../../Components/PartnershipAgreement/PartnershipAgreement';
import ErrorFields from "../../../Components/ErrorFields/ErrorFields";
import PersonalDetails from '../../Common Pages/BabysitterSignupForm/PersonalDetails/PersonalDetails';
import { useNavigate } from 'react-router-dom';

const ParentPartnershipForm = ({}) => {
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
      "address": 'Βλαστού 2',
      "description": "Λίγα Λόγια",
      "kids": [
        {id: 1, age: 2, gender: 'boy', hasDisabilities: false, hasAllergies: false, description: ''},
      ],
      "hasPets": false,
    },
    "partnershipDetails": {
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

  const [errorStep3, setErrorStep3] = useState(null);
  const [errorStep4, setErrorStep4] = useState(null);

  const [isErrorVisible, setIsErrorVisible] = useState(false);
  const [step, setStep] = useState(0); // Βήματα εγγραφής
  const formContainerRef = useRef(null);

  const errorStep3Exists = useMemo(() => (
    step === 2 && errorStep3
  ), [step, errorStep3]);

  const errorStep4Exists = useMemo(() => (
    step === 3 && errorStep4
  ), [step, errorStep4]);

  const navigate = useNavigate();
  
  const fixHeight = useCallback(() => {
    if (formContainerRef.current) {
      const activeChild = formContainerRef.current.children[step];
      formContainerRef.current.style.height = `${activeChild.offsetHeight}px`;
    }
  }, [step]);

  const steps = [
    {
      title: "Επιβεβαίωση Προσωπικών Στοιχείων",
      note: null,
      content: <PersonalDetails
      userData={partnershipData.parentDetails}
      ShowOff={true} />,
    },
    {
      title: "Επιβεβαίωση Στοιχείων Οικογένειας",
      note: null,
      content: <FamilyInfo
      isEditable={false}
      description={partnershipData.familyDetails.description}
      kids={partnershipData.familyDetails.kids}
      hasPets={partnershipData.familyDetails.hasPets}
      />,
    },
    {
      title: "Συμφωνία Συνεργασίας",
      note: 'Τα πεδία με τον αστερίσκο (*) είναι υποχρεωτικά',
      content: <PartnershipAgreement
      data={partnershipData.partnershipDetails}
      onChange={(newPartnershipDetails) => setPartnershipData({
        ...partnershipData,
        partnershipDetails: newPartnershipDetails,
      })}
      />,
    },
    {
      title: "Επιβεβαίωση και Υπογραφή",
      note: null,
      content: <ConfirmAndSign
      data={partnershipData}
      onChange={(newPartnershipData) => setPartnershipData(newPartnershipData)}/>,
    },
  ];
  
  useEffect(() => {
    fixHeight();
  }, [step, fixHeight]);

  const scrollToTop = () => {
    const pageContainer = document.querySelector('.page-container');
    if (pageContainer) {
      pageContainer.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  const scrollToBottom = () => {
    const pageContainer = document.querySelector('.page-container');
    if (pageContainer) {
      pageContainer.scrollTo({
        top: pageContainer.scrollHeight - 1100,
        behavior: 'smooth',
      });
    }
  };

  const progressBarStepChange = (index) => {
    // Υπάρχει error
    if (step < index){
      nextStep();
      return;
    }

    // Δεν υπάρχει error
    setIsErrorVisible(false);
    setStep(index);
  };

  const nextStep = () => {
    // Υπάρχει error
    if (errorStep3Exists || errorStep4Exists){
      setIsErrorVisible(true);
      scrollToBottom();
      return;
    }

    // Δεν υπάρχει error
    setIsErrorVisible(false);
    setErrorStep3(null);
    setErrorStep4(null);
    if (step < steps.length - 1) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 0) setStep(step - 1);
  };

  useEffect(() => {
    scrollToTop();  // Scroll πάνω πάνω στο Επόμενο/Προηγούμενο
  }, [step]);

  useEffect(() => {
    const missingFields = [];

    const {
      partnershipDetails,
      parentSigned,
    } = partnershipData;

    const {
      dimos,
      perioxh,
      address,
      startDate,
      endDate,
      availability
    } = partnershipDetails;

    if (step === 3 && !parentSigned) {
      setErrorStep4('Κάποια από τα υποχρεωτικά πεδία δεν συμπληρώθηκαν: Υπογραφή Κηδεμόνα');
      return;
    }

    if (!dimos || !perioxh) {
      missingFields.push("Περιοχή εξυπηρέτησης");
    }

    if (!address || address.trim === '') {
      missingFields.push("Οδός και αριθμός κατοικίας εξυπηρέτησης");
    }

    if (!startDate || (startDate?.day ?? null) === null || (startDate?.month ?? null) === null || (startDate?.year ?? null) === null) {
      missingFields.push("Ημερομηνία έναρξης συνεργασίας");
    }

    if (!endDate || (endDate?.day ?? null) === null || (endDate?.month ?? null) === null || (endDate?.year ?? null) === null) {
      missingFields.push("Ημερομηνία λήξης συνεργασίας");
    }

    if (availability.length === 0) {
      missingFields.push("Διαθεσιμότητα και ώρες");
    }

    if (missingFields.length === 0) {
      setErrorStep3(null); // Όλα τα πεδία είναι συμπληρωμένα
      setErrorStep4(null);
    } else {
      const errorMessage = `Κάποια από τα υποχρεωτικά πεδία δεν συμπληρώθηκαν: ${missingFields.join(", ")}`;
      setErrorStep3(errorMessage); // Ρύθμιση του μηνύματος σφάλματος
      setErrorStep4(null);
    }
  }, [partnershipData, step]);

  const handleTemporarySave = () => {
    // api call to save partnershipDetails
    navigate('../partnership', {path: '..'});
  };

  const confirmAndSend = () => {
    if (errorStep4Exists) {
      setIsErrorVisible(true);
      scrollToBottom();
      return;
    }
    setIsErrorVisible(false);
    // api call to save partnershipDetails
    navigate('../partnership', {path: '..'});
  };

  return (
    <div className={s.container}>
      <div className={s.breadcrumbs_return_row}>
          <div className={s.breadcrumbs}>
              <p>Αρχική</p>
              <p>{">"}</p>
              <p>Υπογραφή Συμφωνητικού Συνεργασίας</p>
          </div>
          <button className={s.return_button}>
              <FontAwesomeIcon icon={faRotateLeft} />
              Επιστροφή
          </button>
      </div>

      {/* Progress Bar */}
      <ProgressBar step={step} steps={steps} stepChange={progressBarStepChange}/>

        {/* Form */}
        <div className={s.form_container} style={{ transform: `translateX(-${step * 104}%)` }} ref={formContainerRef}>
            {steps.map((stepData, index) => (
            <div key={index} className={s.form_step}>
                <h2 className={`${s.step_title} ${stepData.note === null ? s.undelined : ''}`}>{stepData.title}</h2>
                {stepData.note !== null &&
                  <p className={s.title_note}>{stepData.note}</p>
                }
                {stepData.content}
            </div>
            ))}
        </div>

        {isErrorVisible && (errorStep3Exists || errorStep4Exists) &&
          <ErrorFields error={step === 2 ? errorStep3 : (step === 3 ? errorStep4 : '')} width={'50%'} onXmarkClick={() => {setIsErrorVisible(false)}} />
        }

        {/* Buttons */}
        <div className={s.buttons}>
          <button onClick={prevStep} disabled={step === 0} className={s.prev_button}>
            <FontAwesomeIcon className={s.icon} icon={faCircleLeft} fontSize={"24px"} />
            Προηγούμενο
          </button>
          {step < steps.length - 1
          ?
            <button onClick={nextStep} className={s.next_button}>
              Επόμενο
              <FontAwesomeIcon className={s.icon} icon={faCircleRight} fontSize={"24px"} />
            </button>
          :
            <button onClick={confirmAndSend} className={s.confirm_and_send_button}>
              <FontAwesomeIcon className={s.icon} icon={faGavel} fontSize={"18px"} />
              Οριστική υποβολή
            </button>
          }
        </div>

        <div className={s.temporary_save_button_container}>
          <button onClick={handleTemporarySave} className={s.temporary_save_button}>
            <FontAwesomeIcon className={s.icon} icon={faFloppyDisk} fontSize={"24px"} />
            Προσωρινή Αποθήκευση
          </button>
        </div>
    </div>
  );
}
 
export default ParentPartnershipForm;