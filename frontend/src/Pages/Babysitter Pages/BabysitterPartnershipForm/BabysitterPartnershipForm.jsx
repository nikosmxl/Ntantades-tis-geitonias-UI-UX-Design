import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import s from './BabysitterPartnershipFormStyle.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGavel, faCircleLeft, faCircleRight, faRotateLeft, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import ProgressBar from "../../../Components/ProgressBar/ProgressBar";
import ConfirmAndSign from './ConfirmAndSign/ConfirmAndSign';
import ErrorFields from "../../../Components/ErrorFields/ErrorFields";
import PersonalDetails from '../../../Components/PersonalDetails/PersonalDetails';
import { useNavigate, useParams } from 'react-router-dom';
import PartnershipAgreementPopUp from '../../../PopUps/PartnershipAgreementPopUp/PartnershipAgreementPopUp';
import Breadcrumbs from '../../../Components/Breadcrumbs/Breadcrumbs';
import { db, storage } from '../../../firebase';
import { getDoc, doc, collection, setDoc, addDoc } from 'firebase/firestore';
import { getDownloadURL, ref } from 'firebase/storage';
import { getDateFromMs, getDateFromObj } from '../../../utils/date';

const BabysitterPartnershipForm = () => {
  const { id } = useParams();
  const userId = useMemo(() => JSON.parse(localStorage.getItem('user'))['id'], []);

  const [babysitter, setBabysitter] = useState({});
  const [parent, setParent] = useState({});
  const [partnership, setPartnership] = useState({});

  const babysitterDocRef = useMemo(() => doc(db, 'Users', userId), [userId]);
  
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);

  const navigate = useNavigate();

  const openConfirmPopup = () => {
      setIsConfirmPopupOpen(true);
  };

  const handleSubmit = () => {
    if (errorStep2Exists){
        setIsErrorVisible(true);
        return;
    }
    openConfirmPopup();
  }

  const confirmAndSend = async () => {
    if (errorStep2Exists || !partnership?.babysitterSigned) {
      setErrorStep2('Κάποια από τα υποχρεωτικά πεδία δεν συμπληρώθηκαν: Υπογραφή Νταντάς');
      setIsErrorVisible(true);
      scrollToBottom();
      return;
    }
    setIsErrorVisible(false);
    if (getDateFromMs(partnership?.dateCreated) < getDateFromObj(partnership?.startingDate)){
      await saveData('future', true);
      navigate('/babysitter/partnership', { state: { status: 'accept' }});
    }
    else if (getDateFromMs(partnership?.dateCreated) < getDateFromObj(partnership?.endingDate)){
      await saveData('running', true);
      navigate('/babysitter/partnership', { state: { status: 'accept' }});
    }
  };

  const handleReject = async () => {
    await saveData('decline');
    navigate('/babysitter/partnership', { state: { status: 'decline' }});
  };

  const handleConfirmPopupClose = () => {
      setIsConfirmPopupOpen(false); // Κλεινει το PopUp
  };

  const fetchData = async () => {
    if (id) {
      const partnershipDocRef = doc(db, 'Partnerships', id);
      const partnershipSnap = await getDoc(partnershipDocRef);
      const partnershipData = partnershipSnap.data();
      setPartnership({ ...partnershipData, id: id });

      const parentSnap = await getDoc(partnershipData.parent);
      const parentData = parentSnap.data();
      const profilePictureRef = ref(storage, `profilePictures/${partnershipData.parent.id}.${parentData?.profilePictureType}`);
      const profilePictureUrl = await getDownloadURL(profilePictureRef);
      setParent({ ...parentData, id: partnershipData.parent.id, profilePicture: profilePictureUrl })
    }

    const babysitterSnap = await getDoc(babysitterDocRef);
    const babysitterData = babysitterSnap.data();
    setBabysitter({ ...babysitterData, id: userId })
  };

  const handleSave = async () => {
    await saveData('sent');
    navigate('/babysitter/partnership', { state: { status: 'saved' }});
  };

  const saveData = async (status, isHistory = false) => {
    const babysitterDocRef = doc(db, 'Users', babysitter?.id);
    const partnershipDocRef = doc(db, 'Partnerships', id);
    await setDoc(partnershipDocRef, { ...partnership, status: status, babysitter: babysitterDocRef, isHistory: isHistory});
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const [errorStep2, setErrorStep2] = useState(null);

  const [isErrorVisible, setIsErrorVisible] = useState(false);
  const [step, setStep] = useState(0); // Βήματα εγγραφής
  const formContainerRef = useRef(null);

  const errorStep2Exists = useMemo(() => (
    step === 1 && errorStep2
  ), [step, errorStep2]);
  
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
      userData={babysitter}
      ShowOff={true} />,
    },
    {
      title: "Επιβεβαίωση και Υπογραφή",
      note: null,
      content: <ConfirmAndSign
      data={partnership}
      parent={parent}
      babysitter={babysitter}
      onChange={handleChange}
      onReject={handleReject}
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
    if (step === 1 && !partnership?.babysitterSigned) {
      setErrorStep2('Κάποια από τα υποχρεωτικά πεδία δεν συμπληρώθηκαν: Υπογραφή Νταντάς');
      setIsErrorVisible(true);
      scrollToBottom();
      return;
    }
    setErrorStep2(null); // Όλα τα πεδία είναι συμπληρωμένα

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
            gender={parent.gender}
            name={parent.name}
            surname={parent.surname}
          />
        }
    </div>
  );
}
 
export default BabysitterPartnershipForm;