import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import s from "./BabysitterSignupFormStyle.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleLeft, faCircleRight, faRightToBracket, faRotateLeft } from "@fortawesome/free-solid-svg-icons";
import ProgressBar from "../../../Components/ProgressBar/ProgressBar";
import PersonalDetails from "./PersonalDetails/PersonalDetails";
import EducationExperience from "./EducationExperience/EducationExperience";
import AcceptTerms from "./AcceptTerms/AcceptTerms";
import ErrorFields from "../../../Components/ErrorFields/ErrorFields";
import ConfirmAndSignup from "./ConfirmAndSignup/ConfirmAndSignup";

function BabysitterSignupForm() {
  const data_sample = {
    "name": "Ιωάννα",
    "surname": "Χατζή",
    "age": 29,
    "email": "ioanna123@gmail.com",
    "gender": "Γυναίκα",
    "mobile": "6912345678",
    "phone": "2102345678",
    "ethnicity": "Ελληνική",
    "residence": "Άνω Πατήσια, Αττική",
    "language": "Ελληνικά"
  }

  const [profilePicture, setProfilePicture] = useState("");
  
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [educationCertificates, setEducationCertificates] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([])
  const [selectedExperience, setSelectedExperience] = useState("");

  const [selectedAgeExperience, setSelectedAgeExperience] = useState([]);
  const [selectedSpecializations, setSelectedSpecializations] = useState([]);

  // const [errors, setErrors] = useState({});
  const [errorStep2, setErrorStep2] = useState(null);
  const [errorStep3, setErrorStep3] = useState(null);

  const [isErrorVisible, setIsErrorVisible] = useState(false);

  // Εδώ υποτίθεται θα γινόταν κάποιο load δεδομένων από το taxis...

  const [step, setStep] = useState(0); // Βήματα εγγραφής
  const formContainerRef = useRef(null);

  const errorStep2Exists = useMemo(() => (
    step === 1 && errorStep2
  ), [step, errorStep2]);
  const errorStep3Exists = useMemo(() => (
    step === 2 && errorStep3
  ), [step, errorStep3]);

  const fixHeight = useCallback(() => {
    if (formContainerRef.current) {
      const activeChild = formContainerRef.current.children[step];
      formContainerRef.current.style.height = `${activeChild.offsetHeight}px`;
    }
  }, [step]);
  
  const handleErrorStep2Change = (error) => {
    setErrorStep2(error)
  };

  const handleErrorStep3Change = (error) => {
    setErrorStep3(error)
  };

  const steps = [
    {
      title: "Προσωπικά Στοιχεία",
      note: null,
      content: <PersonalDetails 
      userData={data_sample} 
      onProfileChange={setProfilePicture} />,
    },
    {
      title: "Εκπαίδευση και Εμπειρία",
      note: "Τα πεδία με τον αστερίσκο (*) είναι υποχρεωτικά",
      content: <EducationExperience 
          fixHeight={fixHeight} handleErrorChange={handleErrorStep2Change}
          selectedLevel={selectedLevel} setSelectedLevel={setSelectedLevel}
          selectedSpecialty={selectedSpecialty} setSelectedSpecialty={setSelectedSpecialty}
          educationCertificates={educationCertificates} setEducationCertificates={setEducationCertificates}
          selectedLanguages={selectedLanguages} setSelectedLanguages={setSelectedLanguages} 
          selectedExperience={selectedExperience} setSelectedExperience={setSelectedExperience}
          setSelectedAgeExperience={setSelectedAgeExperience}
          setSelectedSpecializations={setSelectedSpecializations}
        />,
    },
    {
      title: "Αποδοχή Όρων",
      note: "Όλα τα πεδία είναι υποχρεωτικά",
      content: <AcceptTerms handleErrorChange={handleErrorStep3Change} />,
    },
    {
      title: "Επιβεβαίωση και Εγγραφή",
      note: null,
      content: <ConfirmAndSignup 
        userData={data_sample}
        onProfileChange={setProfilePicture}
        fixHeight={fixHeight} updateStepError={handleErrorStep2Change}
        selectedLevel={selectedLevel} setSelectedLevel={setSelectedLevel}
        selectedSpecialty={selectedSpecialty} setSelectedSpecialty={setSelectedSpecialty}
        educationCertificates={educationCertificates} setEducationCertificates={setEducationCertificates}
        selectedLanguages={selectedLanguages} setSelectedLanguages={setSelectedLanguages} 
        selectedExperience={selectedExperience} setSelectedExperience={setSelectedExperience}
        setSelectedAgeExperience={setSelectedAgeExperience}
        setSelectedSpecializations={setSelectedSpecializations}
      />,
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
    if (errorStep2Exists || errorStep3Exists){
      setIsErrorVisible(true);
      scrollToBottom();
      return;
    }

    // Δεν υπάρχει error
    setIsErrorVisible(false);
    if (step < steps.length - 1) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 0) setStep(step - 1);
  };

  useEffect(() => {
    scrollToTop();  // Scroll πάνω πάνω στο Επόμενο/Προηγούμενο
  }, [step]);

  const signUp = () => {

  }

  return (
    <div className={s.container}>
      <div className={s.breadcrumbs_return_row}>
          <div className={s.breadcrumbs}>
              <p>Αρχική</p>
              <p>{">"}</p>
              <p>Εγγραφή με taxis</p>
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

        {isErrorVisible && (errorStep2Exists || errorStep3Exists) &&
          <ErrorFields error={step === 1 ? errorStep2 : step === 2 ? errorStep3 : ''} width={'50%'} onXmarkClick={() => {setIsErrorVisible(false)}} />
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
            <button onClick={signUp} className={s.signup_button}>
              <FontAwesomeIcon className={s.icon} icon={faRightToBracket} fontSize={"20px"} />
              Εγγραφή
            </button>
          }
        </div>
    </div>
  );
}

export default BabysitterSignupForm;
