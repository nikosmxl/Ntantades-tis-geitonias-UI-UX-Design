import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import s from './ParentPartnershipFormStyle.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGavel, faCircleLeft, faCircleRight, faRotateLeft, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import ProgressBar from "../../../Components/ProgressBar/ProgressBar";
import ConfirmAndSign from './ConfirmAndSign/ConfirmAndSign';
import FamilyInfo from '../../../Components/FamilyInfo/FamilyInfo';
import PartnershipAgreement from '../../../Components/PartnershipAgreement/PartnershipAgreement';
import ErrorFields from "../../../Components/ErrorFields/ErrorFields";
import PersonalDetails from '../../../Components/PersonalDetails/PersonalDetails';
import { useNavigate, useParams, useLocation } from "react-router-dom";
import PartnershipAgreementPopUp from '../../../PopUps/PartnershipAgreementPopUp/PartnershipAgreementPopUp';
import Breadcrumbs from '../../../Components/Breadcrumbs/Breadcrumbs';
import { db, storage } from '../../../firebase';
import { getDoc, doc, collection, setDoc, addDoc } from 'firebase/firestore';
import { getDownloadURL, ref } from 'firebase/storage';

const ParentPartnershipForm = () => {
  const { id } = useParams();
  const location = useLocation();
  const babysitterId = location?.state?.babysitterId ?? null;
  const userId = useMemo(() => JSON.parse(localStorage.getItem('user'))['id'], []);

  const [babysitter, setBabysitter] = useState({});
  const [parent, setParent] = useState({});
  const [partnership, setPartnership] = useState({});

  const parentDocRef = useMemo(() => doc(db, 'Users', userId), [userId]);

  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);

  const navigate = useNavigate();

  const openConfirmPopup = () => {
      setIsConfirmPopupOpen(true);
  }

  const handleSubmit = () => {
    if (errorStep4Exists){
        setIsErrorVisible(true);
        return;
    }
    openConfirmPopup();
  }

  const handleConfirmPopupClose = () => {
      setIsConfirmPopupOpen(false); // Κλεινει το PopUp
  };

  const fetchData = async () => {
    if (id) {
      const partnershipDocRef = doc(db, 'Partnerships', id);
      const partnershipSnap = await getDoc(partnershipDocRef);
      const partnershipData = partnershipSnap.data();
      setPartnership({ ...partnershipData, id: id });

      const babysitterSnap = await getDoc(partnershipData.babysitter);
      const babysitterData = babysitterSnap.data();
      const profilePictureRef = ref(storage, `profilePictures/${partnershipData.babysitter.id}.${babysitterData?.profilePictureType}`);
      const profilePictureUrl = await getDownloadURL(profilePictureRef);
      setBabysitter({ ...babysitterData, id: partnershipData.babysitter.id, profilePicture: profilePictureUrl })
    } else if (babysitterId) {
      const babysitterDocRef = doc(db, 'Users', babysitterId);
      const babysitterSnap = await getDoc(babysitterDocRef);
      const babysitterData = babysitterSnap.data();
      const profilePictureRef = ref(storage, `profilePictures/${babysitterId}.${babysitterData?.profilePictureType}`);
      const profilePictureUrl = await getDownloadURL(profilePictureRef);
      setBabysitter({ ...babysitterData, id: babysitterId, profilePicture: profilePictureUrl })
    }

    const parentSnap = await getDoc(parentDocRef);
    const parentData = parentSnap.data();
    setParent({ ...parentData, id: userId })
  };

  const handleSave = async () => {
    await saveData('saved');
    navigate('/parent/partnership', { state: { status: 'saved' }});
  };

  const confirmAndSend = async () => {
    if (errorStep4Exists) {
      setIsErrorVisible(true);
      scrollToBottom();
      return;
    }
    setIsErrorVisible(false);
    await saveData('sent');
    navigate('/parent/partnership', { state: { status: 'sent' }});
  };

  const saveData = async (status) => {
    const babysitterDocRef = doc(db, 'Users', babysitter?.id);
    if (!id) {
      await addDoc(collection(db, 'Partnerships'), { ...partnership, status: status, babysitter: babysitterDocRef, parent: parentDocRef, dateCreated: Date.now(), isHistory: false});
    } else {
      const partnershipDocRef = doc(db, 'Partnerships', id);
      await setDoc(partnershipDocRef, { ...partnership, status: status, babysitter: babysitterDocRef, parent: parentDocRef, isHistory: false});
    }
  };

  useEffect(() => {
    fetchData();
  }, [id, babysitterId]);

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
  
  const fixHeight = useCallback(() => {
    if (formContainerRef.current) {
      const activeChild = formContainerRef.current.children[step];
      formContainerRef.current.style.height = `${activeChild.offsetHeight}px`;
    }
  }, [step]);

  const handleChange = (updatedData) => {
    setPartnership(prev => ({
      ...prev,
      ...updatedData,
    }));
  };

  const steps = [
    {
      title: "Επιβεβαίωση Προσωπικών Στοιχείων",
      note: null,
      content: <PersonalDetails
      userData={parent}
      ShowOff={true} />,
    },
    {
      title: "Επιβεβαίωση Στοιχείων Οικογένειας",
      note: null,
      content: <FamilyInfo
      isEditable={false}
      description={parent.familyDescription}
      kids={parent.kids}
      hasPets={parent.hasPets}
      />,
    },
    {
      title: "Συμφωνία Συνεργασίας",
      note: 'Τα πεδία με τον αστερίσκο (*) είναι υποχρεωτικά',
      content: <PartnershipAgreement
      data={partnership}
      babysitter={babysitter}
      onChange={handleChange}
      />,
    },
    {
      title: "Επιβεβαίωση και Υπογραφή",
      note: null,
      content: <ConfirmAndSign
      data={partnership}
      parent={parent}
      babysitter={babysitter}
      onChange={(newPartnershipData) => setPartnership(newPartnershipData)}/>,
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

    if (step === 3 && !partnership?.parentSigned) {
      setErrorStep4('Κάποια από τα υποχρεωτικά πεδία δεν συμπληρώθηκαν: Υπογραφή Κηδεμόνα');
      return;
    }

    if (!partnership?.area || !partnership?.neighbourhood) {
      missingFields.push("Περιοχή εξυπηρέτησης");
    }

    if (!partnership?.address || partnership?.address.trim === '') {
      missingFields.push("Οδός και αριθμός κατοικίας εξυπηρέτησης");
    }

    if (!partnership?.startingDate || (partnership?.startingDate?.day ?? null) === null || (partnership?.startingDate?.month ?? null) === null || (partnership?.startingDate?.year ?? null) === null) {
      missingFields.push("Ημερομηνία έναρξης συνεργασίας");
    }

    if (!partnership?.endingDate || (partnership?.endingDate?.day ?? null) === null || (partnership?.endingDate?.month ?? null) === null || (partnership?.endingDate?.year ?? null) === null) {
      missingFields.push("Ημερομηνία λήξης συνεργασίας");
    }

    if (partnership?.availability?.length === 0) {
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
  }, [partnership, step]);

  return (
    <div className={s.container}>
      <div className={s.breadcrumbs_return_row}>
          <Breadcrumbs
            breadcrumbItems={[
              { label: 'Αρχική Σελίδα', route: '' },
              { label: 'Υπογραφή Συμφωνητικού Συνεργασίας', route: '.' },
            ]}
          />
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
            <button onClick={handleSubmit} className={s.confirm_and_send_button}>
              <FontAwesomeIcon className={s.icon} icon={faGavel} fontSize={"18px"} />
              Οριστική υποβολή
            </button>
          }
        </div>

        <div className={s.temporary_save_button_container}>
          <button onClick={handleSave} className={s.temporary_save_button}>
            <FontAwesomeIcon className={s.icon} icon={faFloppyDisk} fontSize={"24px"} />
            Προσωρινή Αποθήκευση
          </button>
        </div>
        {isConfirmPopupOpen && 
          <PartnershipAgreementPopUp 
            onSubmit={confirmAndSend} 
            onClose={handleConfirmPopupClose}
            gender={babysitter.gender}
            name={babysitter.name}
            surname={babysitter.surname}
          />
        }
    </div>
  );
}
 
export default ParentPartnershipForm;