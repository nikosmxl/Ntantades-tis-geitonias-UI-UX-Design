import { useEffect, useState } from "react";
import Checkbox from "../../../../Components/Checkbox/Checkbox";
import s from "./AcceptParentTermsStyle.module.css"

function AcceptParentTerms({handleErrorChange}){
    const [firstTerm, setFirstTerm] = useState(false);
    const [secondTerm, setSecondTerm] = useState(false);

    const firstTermLabel = "Δηλώνω υπεύθυνα ότι τα στοιχεία που έχω υποβάλει είναι αληθινά.";
    const secondTermLabel = "Συμφωνώ με του Όρους Χρήσης και τις πολιτικές προστασίας δεδομένων.";
    
    useEffect(() => {
        if (firstTerm && secondTerm) {
            handleErrorChange(null); // Όλα τα πεδία είναι συμπληρωμένα
        } else {
            const errorMessage = `Πρέπει να αποδεχτείτε όλους τους όρους για να συνεχίσετε`;
            handleErrorChange(errorMessage);
        }
    }, [firstTerm, secondTerm, handleErrorChange]);

    const handleCheckboxChange = (type) => {
        if (type === 'first') {
            setFirstTerm(!firstTerm);
        } else if (type === 'second') {
            setSecondTerm(!secondTerm);
        }
    };

    return (
        <div className={s.container}>
            <h3 className={s.terms_title}>Αυτός ο οδηγός δημιουργήθηκε για να εξυπηρετήσει τους πολίτες, μέσω φιλικών ψηφιακών εμπειριών χρήσης.</h3>
            <div className={s.terms}>
                <Checkbox
                    name={'term'}
                    isChecked={firstTerm}
                    onChange={() => handleCheckboxChange('first')}
                    label={firstTermLabel}
                    width="20px"
                    height="20px"
                />

                <Checkbox
                    name={'term'}
                    isChecked={secondTerm}
                    onChange={() => handleCheckboxChange('second')}
                    label={secondTermLabel}
                    width="20px"
                    height="20px"
                />
            </div>
        </div>
    )
}

export default AcceptParentTerms;