import { useEffect, useState } from "react";
import Checkbox from "../../../../Components/Checkbox/Checkbox";
import s from "./AcceptTermsStyle.module.css"

function AcceptTerms({handleErrorChange}){
    const [firstTerm, setFirstTerm] = useState(false);
    const [secondTerm, setSecondTerm] = useState(false);
    const [thirdTerm, setThirdTerm] = useState(false);

    const firstTermLabel = "Δεν τελώ υπό καθεστώς δικαστικής συμπαράστασης";
    const secondTermLabel = "Δεν εκκρεμεί εις βάρος μου μήνυση ή έγκληση ενώπιον αρμόδιας αρχής και δεν διώκομαι ως φυγόδικος ή φυγόποινος και δεν έχω καταδικαστεί για οποιοδήποτε κακούργημα, για αδικήματα που επισύρουν, σύμφωνα με το άρθρο 1537 ΑΚ, έκπτωση από τη γονική μέριμνα ή για αδικήματα κατά της σωματικής ακεραιότητας, κατά της προσωπικής ελευθερίας, κατά της γενετήσιας ελευθερίας, για αδικήματα του ν. 3500/2006 (Α’ 232), καθώς και για αδικήματα που συνδέονται με ναρκωτικά ή εμπορία οργάνων";
    const thirdTermLabel = "Υποχρεούμαι να δηλώσω οποιαδήποτε μεταβολή των στοιχείων που καταχωρούνται στο Μητρώο Επιμελητών εντός δέκα (10) ημερών από την επέλευση της μεταβολής αυτών";

    useEffect(() => {
        if (firstTerm && secondTerm && thirdTerm) {
            handleErrorChange(null); // Όλα τα πεδία είναι συμπληρωμένα
        } else {
            const errorMessage = `Πρέπει να αποδεχτείτε όλους τους όρους για να συνεχίσετε`;
            handleErrorChange(errorMessage);
        }
    }, [firstTerm, secondTerm, thirdTerm, handleErrorChange]);

    const handleCheckboxChange = (type) => {
        if (type === 'first') {
            setFirstTerm(!firstTerm);
        } else if (type === 'second') {
            setSecondTerm(!secondTerm);
        } else if (type === 'third') {
            setThirdTerm(!thirdTerm);
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

                <Checkbox
                    name={'term'}
                    isChecked={thirdTerm}
                    onChange={() => handleCheckboxChange('third')}
                    label={thirdTermLabel}
                    width="20px"
                    height="20px"
                />
            </div>
        </div>
    )
}

export default AcceptTerms;