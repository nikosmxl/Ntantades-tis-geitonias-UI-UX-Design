import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import s from "./ParentSignupFormStyle.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleLeft, faCircleRight, faRightToBracket, faRotateLeft } from "@fortawesome/free-solid-svg-icons";
import ProgressBar from "../../../Components/ProgressBar/ProgressBar";
import PersonalDetails from "../../../Components/PersonalDetails/PersonalDetails";
import ErrorFields from "../../../Components/ErrorFields/ErrorFields";
import FamilyInfo from "../../../Components/FamilyInfo/FamilyInfo";
import AcceptParentTerms from "./AcceptParentTerms/AcceptParentTerms";
import ParentConfirmAndSignup from "./ParentConfirmAndSignup/ParentConfirmAndSignup";

function ParentSignupForm() {
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
  
  const [description, setDescription] = useState('');
  const [kids, setKids] = useState([]);
  const [hasPets, setHasPets] = useState(false);
  
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

  const handleErrorStep3Change = (error) => {
    setErrorStep3(error)
  };

  const handleKidsNumChange = (newNumKids) => {
    const newKids = Array.from(kids);
    
    while (newKids.length < newNumKids.value) {
      newKids.push({id: newKids.length+1, age: null, gender: null, hasDisabilities: false, hasAllergies: false, description: ''});
    }
    
    while (newKids.length > newNumKids.value) {
      newKids.pop();
    }
    setKids(newKids);
  };

  const handleKidChange = (updatedKid) => {
    const updatedKids = kids.map(kid => {
      if (kid.id !== updatedKid.id) return kid;

      return updatedKid
    });
    setKids(updatedKids);
  };

  const handleDescriptionChange = (e) => {
    e.preventDefault();
    setDescription(e.target.value.trim());
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
      title: "Στοιχεία Οικογένειας",
      note: "Τα πεδία με τον αστερίσκο (*) είναι υποχρεωτικά",
      content: <FamilyInfo 
        isEditable={true}
        description={description}
        onDescriptionChange={handleDescriptionChange}
        kids={kids}
        onKidsNumChange={handleKidsNumChange}
        onKidChange={handleKidChange}
        onHasPetsChange={setHasPets}
        MandatoryFields
      />,
    },
    {
      title: "Αποδοχή Όρων",
      note: "Όλα τα πεδία είναι υποχρεωτικά",
      content: <AcceptParentTerms handleErrorChange={handleErrorStep3Change} />,
    },
    {
      title: "Επιβεβαίωση και Εγγραφή",
      note: null,
      content: <ParentConfirmAndSignup
        userData={data_sample}
        onProfileChange={setProfilePicture}
        description={description}
        onDescriptionChange={handleDescriptionChange}
        kids={kids}
        onKidsNumChange={handleKidsNumChange}
        onKidChange={handleKidChange}
        onHasPetsChange={setHasPets}
      />,
    },
  ];

  useEffect(() => {
    if (kids.length === 0){
        const errorMessage = `Ο αριθμός παιδιών πρέπει να είναι μεγαλύτερος του μηδενός.`;
        setErrorStep2(errorMessage);
        return;
    }

    const missingFields = new Set(); 
    for (const kid of kids){
        if (kid.age === null) {
            missingFields.add("Ηλικία");
        }
        if (kid.gender === null) {
            missingFields.add("Φύλο");
        }
    }

    if (missingFields.size === 0) {
        setErrorStep2(null); // Όλα τα πεδία είναι συμπληρωμένα
    } else {
        const errorMessage = `Κάποια από τα υποχρεωτικά πεδία δεν συμπληρώθηκαν: ${Array.from(missingFields).join(", ")}`;
        setErrorStep2(errorMessage);
    }
  }, [kids]);

  useEffect(() => {
    fixHeight();
  }, [step, kids.length, fixHeight]);

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
              <FontAwesomeIcon className={s.icon} icon={faRightToBracket} fontSize={"18px"} />
              Εγγραφή
            </button>
          }
        </div>
    </div>
  );
}

export default ParentSignupForm;
