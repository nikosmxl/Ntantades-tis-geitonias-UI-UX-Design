import { useEffect } from "react";
import s from "./EducationExperienceStyle.module.css"
import MultiDropdownMenu from "../../../../Components/MultiDropdownMenu/MultiDropdownMenu";
import Checkbox from "../../../../Components/Checkbox/Checkbox";
import CertificatesList from "../../../../Components/CertificatesList/CertificatesList";

function EducationExperience({ 
    fixHeight, handleErrorChange,
    selectedLevel, setSelectedLevel, 
    selectedSpecialty, setSelectedSpecialty, 
    educationCertificates, setEducationCertificates, 
    selectedLanguages, setSelectedLanguages, 
    selectedExperience, setSelectedExperience, 
    setSelectedAgeExperience, 
    setSelectedSpecializations,
    ShowOff = false
    }){

    const ageExperienceOptions = ['2-6 μηνών', '6-12 μηνών', '1-2 ετών', '> 2 ετών'];
    const specializationOptions = ['ΑμεΑ', 'Νοηματική'];

    const educationSpecialties = {
        "Τίτλοι δευτεροβάθμιας Επαγγελματικής Εκπαίδευσης": [
          "Πτυχίο ΕΠΑΛ της ειδικότητας «Βοηθός Βρεφονηπιοκόμων» επίπεδο 4 ΕΠΠ ή ισότιμος τίτλος",
          "Πτυχίο Τεχνικού Επαγγελματικού Λυκείου (ΤΕΛ) του τομέα Κοινωνικών Υπηρεσιών, Τμήματος Βοηθών Βρεφονηπιοκόμων Παιδοκόμων ή ισότιμος τίτλος",
          "Πτυχίο του Τμήματος Ειδίκευσης συναφούς ειδικότητας του Κλάδου Κοινωνικής Πρόνοιας Ενιαίου Πολυκλαδικού Λυκείου (ΕΠΛ) ή ισότιμος τίτλος",
          "Πτυχίο Τεχνικού Επαγγελματικού Εκπαιδευτηρίου (ΤΕΕ) Β’ Κύκλου της ειδικότητας Βοηθός Βρεφονηπιοκόμων ή ισότιμος τίτλος",
          "Πτυχίο ΕΠΑΣ μαθητείας ΟΑΕΔ ειδικότητας «Βοηθός Γενικής Βρεφονηπιοκομίας» επίπεδο 4 ΕΠΠ ή ισότιμος τίτλος",
          "Πτυχίο Τεχνικού Επαγγελματικού Εκπαιδευτηρίου (ΤΕΕ) Α’ Κύκλου της ειδικότητας",
          "Βοηθός Βρεφονηπιοκόμων ή ισότιμος τίτλος",
          "Διαδικτυακή εκπαίδευση",
        ],
        "Τίτλοι επαγγελματικής Εκπαίδευσης/Κατάρτισης": [
          "Πτυχίο ΕΠΑΣ μαθητείας ΟΑΕΔ ειδικότητας «Βοηθός Γενικής Βρεφονηπιοκομίας» επίπεδο 3 ή ισότιμος τίτλος",
          "Διαδικτυακή εκπαίδευση",
        ],
        "Τίτλοι ανώτατης Εκπαίδευσης": [
          "Πτυχίο ΑΕΙ Αγωγής και Φροντίδας στην Πρώιμη Παιδική Ηλικία/ Τμήμα Αγωγής και Φροντίδας στην Πρώιμη Παιδική Ηλικία/ Σχολή Διοικητικών, Οικονομικών και Κοινωνικών Επιστημών/ Πανεπιστήμιο Δυτικής Αττικής ή ισότιμος τίτλος",
          "Πτυχίο ΑΕΙ Αγωγής και Φροντίδας στην Πρώιμη Παιδική Ηλικία/ Τμήμα Αγωγής και Φροντίδας στην Πρώιμη Παιδική Ηλικία/ Σχολή Κοινωνικών Επιστημών/ Διεθνές Πανεπιστήμιο της Ελλάδας ή ισότιμος τίτλος",
          "Πτυχίο ΑΕΙ Αγωγής και Φροντίδας στην Πρώιμη Παιδική Ηλικία/ Τμήμα Αγωγής και Φροντίδας στην Πρώιμη Παιδική Ηλικία/ Σχολή Κοινωνικών Επιστημών/ Πανεπιστήμιο Ιωαννίνων ή ισότιμος τίτλος",
          "Πτυχίο ΤΕΙ Προσχολικής Αγωγής/ Τμήμα Προσχολικής Αγωγής/ Σχολή Επαγγελμάτων Υγείας και Πρόνοιας/ ΤΕΙ Αθήνας ή ισότιμος τίτλος",
          "Πτυχίο ΤΕΙ Προσχολικής Αγωγής/ Τμήμα Προσχολικής Αγωγής/ Σχολή Επαγγελμάτων Υγείας και Πρόνοιας/ Αλεξάνδρειο Τεχνολογικό Εκπαιδευτικό Ίδρυμα Θεσσαλονίκης ή ισότιμος τίτλος",
          "Πτυχίο ΤΕΙ Προσχολικής Αγωγής/ Τμήμα Προσχολικής Αγωγής/ Σχολή Επαγγελμάτων Υγείας και Πρόνοιας/ ΤΕΙ Ηπείρου ή ισότιμος τίτλος",
          "Πτυχίο ΤΕΙ Βρεφονηπιοκομίας/ Τμήμα Βρεφονηπιοκομίας/ Σχολή Επαγγελμάτων Υγείας και Πρόνοιας/ ΤΕΙ Αθήνας ή ισότιμος τίτλος",
          "Πτυχίο ΤΕΙ Βρεφονηπιοκομίας/ Τμήμα Βρεφονηπιοκομίας/ Σχολή Επαγγελμάτων Υγείας και Πρόνοιας/ ΤΕΙ Θεσσαλονίκης ή ισότιμος τίτλος",
          "Πτυχίο ΤΕΙ Βρεφονηπιοκομίας/ Τμήμα Βρεφονηπιοκομίας/ Σχολή Επαγγελμάτων Υγείας και Πρόνοιας/ ΤΕΙ Ηπείρου ή ισότιμος τίτλος",
          "Πτυχίο Ανώτερας Σχολής Νηπιοβρεφοκόμων του Κέντρου Βρεφών «Η ΜΗΤΕΡΑ»",
          "Πτυχίο Ανώτερας Σχολής Νηπιοβρεφοκόμων του ΠΙΚΠΑ Ιωαννίνων",
          "Διαδικτυακή εκπαίδευση",
        ],
    };     

    const educationLevels = Object.keys(educationSpecialties);

    const experienceOptions = ["Καμία προϋπηρεσία", "1 έτος", "2 έτη", "3 έτη", "4 έτη", "5 έτη", "5-10 έτη", "10+ έτη"];

    const handleCheckboxChange = (value, type) => {
        if (type === 'experience') {
            setSelectedAgeExperience((prev) =>
                prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
        );
        } else if (type === 'specialization') {
            setSelectedSpecializations((prev) =>
                prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
        );
        }
    };

    const handleLevelChange = (e) => {
        setSelectedLevel(e.target.value);
        setSelectedSpecialty(""); // Reset οταν αλλάζει level
    };
    
    const handleSpecialtyChange = (e) => {
        setSelectedSpecialty(e.target.value);
    };
    
    const handleCertificateUpload = (e) => {
        const files = Array.from(e.target.files); 
        setEducationCertificates((prevCertificates) => [...prevCertificates, ...files]); // Προσθήκη πολλαπλών αρχείων στη λίστα

        // Επαναφορά της τιμής του input
        e.target.value = "";
    };

    const handleCertificateRemove = (index) => {
        setEducationCertificates((prevCertificates) =>
          prevCertificates.filter((_, i) => i !== index)
        );
    };
    
    const handleExperienceChange = (e) => {
        setSelectedExperience(e.target.value);
    };

    useEffect(() => {
        fixHeight();
    }, [selectedLevel, educationCertificates, fixHeight]);

    useEffect(() => {
        const missingFields = [];
      
        if (!selectedLevel) {
          missingFields.push("Επίπεδο Σπουδών");
        }
        if (!selectedSpecialty) {
          missingFields.push("Ειδικότητα");
        }
        if (educationCertificates.length === 0) {
          missingFields.push("Πιστοποιητικά Εκπαίδευσης");
        }
        if (!selectedExperience) {
          missingFields.push("Προϋπηρεσία");
        }
      
        if (missingFields.length === 0) {
            handleErrorChange(null); // Όλα τα πεδία είναι συμπληρωμένα
        } else {
          const errorMessage = `Κάποια από τα υποχρεωτικά πεδία δεν συμπληρώθηκαν: ${missingFields.join(", ")}`;
          handleErrorChange(errorMessage); // Ρύθμιση του μηνύματος σφάλματος
        }
    }, [selectedLevel, selectedSpecialty, educationCertificates, selectedExperience, handleErrorChange]);
    
    return (
        <div className={s.education_experience_container}>
            <h3 className={s.inner_title}>Εκπαίδευση</h3>
            <div className={s.educational_level}>
                <h3>Επίπεδο σπουδών*:</h3>
                <select
                    value={selectedLevel}
                    onChange={handleLevelChange}
                    disabled={ShowOff}
                >
                    <option value="" disabled>
                        Επιλέξτε Επίπεδο Εκπαίδευσης
                    </option>
                    {educationLevels.map((level) => (
                        <option key={level} value={level}>
                            {level}
                        </option>
                    ))}
                </select>
            </div>

            {selectedLevel && (
                <form>
                    <h3 className={s.specialty}>Ειδικότητα*:</h3>
                    <div className={s.specialty_options}>
                        {educationSpecialties[selectedLevel].map((option) => (
                            <div className={s.specialty_option} key={option}>
                                <input
                                    type="radio"
                                    id={option}
                                    name="specialty"
                                    value={option}
                                    checked={selectedSpecialty === option}
                                    onChange={handleSpecialtyChange}
                                    disabled={ShowOff}
                                />
                                <label htmlFor={option}>{option}</label>
                            </div>
                        ))}
                    </div>
                </form>
            )}

            {!ShowOff &&
                <>
                    <label className={s.add_certificate} htmlFor="certificateInput">Προσθέστε Πιστοποιητικό / Βεβαίωση* +</label>
                    <input
                        type="file"
                        id="certificateInput"
                        accept=".pdf, .doc, .docx"
                        className={s.certificate_input}
                        name="Upload Certificate"
                        onChange={handleCertificateUpload}
                        multiple
                    />
                </>
            }

            {educationCertificates.length > 0 && (
                <div className={s.certificates_list}>
                    <CertificatesList certificates={educationCertificates} isEditable={!ShowOff} handleCertificateRemove={handleCertificateRemove} />
                </div>
            )}

            <div className={s.languages_dropdown}>
                <h3>Ξένες Γλώσσες:</h3>
                <MultiDropdownMenu selectedOptions={selectedLanguages} setSelectedOptions={setSelectedLanguages} isDisabled={ShowOff}/>
            </div>

            <h3 className={s.inner_title}>Εμπειρία</h3>
            <div className={s.years_of_experience}>
                <h3>Προϋπηρεσία*:</h3>
                <select
                    value={selectedExperience}
                    onChange={handleExperienceChange}
                    disabled={ShowOff}
                >
                    <option value="" disabled>
                        Επιλέξτε Έτη Προϋπηρεσία
                    </option>
                    {experienceOptions.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>

            <div className={s.checkbox_category}>
                <h3>Εμπειρία με παιδιά ηλικίας:</h3>
                <div className={s.checkbox_options}>
                    {ageExperienceOptions.map((option) => (
                    <Checkbox 
                        key={option}
                        name={"ageExperience"} 
                        
                        onChange={() => handleCheckboxChange(option, 'experience')}
                        label={option}
                        width="20px"
                        height="20px"
                        isEnabled={!ShowOff}
                    />
                    ))}
                </div>
                
            </div>

            <div className={s.checkbox_category}>
                <h3>Ειδίκευση σε:</h3>
                <div className={s.checkbox_options}>
                    {specializationOptions.map((option) => (
                    <Checkbox 
                        key={option}
                        name={"specialization"} 
                        onChange={() => handleCheckboxChange(option, 'specialization')}
                        label={option}
                        width="20px"
                        height="20px"
                        isEnabled={!ShowOff}
                    />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default EducationExperience;