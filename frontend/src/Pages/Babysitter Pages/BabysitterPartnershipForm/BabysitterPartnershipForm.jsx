import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import s from './BabysitterPartnershipFormStyle.module.css';
import trollProf from '../../../Assets/Pictures/troll_prof.jpg'; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGavel, faCircleLeft, faCircleRight, faRotateLeft, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import ProgressBar from "../../../Components/ProgressBar/ProgressBar";
import ConfirmAndSign from './ConfirmAndSign/ConfirmAndSign';
import ErrorFields from "../../../Components/ErrorFields/ErrorFields";
import PersonalDetails from '../../Common Pages/BabysitterSignupForm/PersonalDetails/PersonalDetails';
import { useNavigate } from 'react-router-dom';

const BabysitterPartnershipForm = ({}) => {
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

  const [errorStep2, setErrorStep2] = useState(null);

  const [isErrorVisible, setIsErrorVisible] = useState(false);
  const [step, setStep] = useState(0); // Βήματα εγγραφής
  const formContainerRef = useRef(null);

  const errorStep2Exists = useMemo(() => (
    step === 0 && errorStep2
  ), [step, errorStep2]);

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
      userData={partnershipData.babysitterDetails}
      ShowOff={true} />,
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
    if (errorStep2Exists){
      setIsErrorVisible(true);
      scrollToBottom();
      return;
    }

    // Δεν υπάρχει error
    setIsErrorVisible(false);
    setErrorStep2(null);
    if (step < steps.length - 1) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 0) setStep(step - 1);
  };

  useEffect(() => {
    scrollToTop();  // Scroll πάνω πάνω στο Επόμενο/Προηγούμενο
  }, [step]);

  useEffect(() => {
    const {
      babysitterSigned,
    } = partnershipData;

    if (step === 1 && !babysitterSigned) {
      setErrorStep2('Κάποια από τα υποχρεωτικά πεδία δεν συμπληρώθηκαν: Υπογραφή Νταντάς');
      setIsErrorVisible(true);
      scrollToBottom();
      return;
    }
    setErrorStep2(null); // Όλα τα πεδία είναι συμπληρωμένα

  }, [partnershipData, step]);

  const handleTemporarySave = () => {
    // api call to save partnershipDetails
    navigate('../partnership', {path: '..'});
  };

  const confirmAndSend = () => {
    const {
      babysitterSigned,
    } = partnershipData;

    if (errorStep2Exists || !babysitterSigned) {
      setErrorStep2('Κάποια από τα υποχρεωτικά πεδία δεν συμπληρώθηκαν: Υπογραφή Νταντάς');
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

        {isErrorVisible && (errorStep2Exists) &&
          <ErrorFields error={step === 1 ? errorStep2 : ''} width={'50%'} onXmarkClick={() => {setIsErrorVisible(false)}} />
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
 
export default BabysitterPartnershipForm;