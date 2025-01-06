import EducationExperience from "../EducationExperience/EducationExperience";
import PersonalDetails from "../../../../Components/PersonalDetails/PersonalDetails";
import s from "./BabysitterConfirmAndSignupStyle.module.css"

function BabysitterConfirmAndSignup({
    userData, onProfileChange, 
    fixHeight, updateStepError,
    selectedLevel, setSelectedLevel,
    selectedSpecialty, setSelectedSpecialty,
    educationCertificates, setEducationCertificates,
    selectedLanguages, setSelectedLanguages,
    selectedExperience, setSelectedExperience,
    setSelectedAgeExperience, setSelectedSpecializations
    }){
    return (
        <div className={s.container}>
            <PersonalDetails 
                userData={userData} 
                onProfileChange={onProfileChange} 
                ShowOff
            />
            <EducationExperience 
                fixHeight={fixHeight} handleErrorChange={updateStepError}
                selectedLevel={selectedLevel} setSelectedLevel={setSelectedLevel}
                selectedSpecialty={selectedSpecialty} setSelectedSpecialty={setSelectedSpecialty}
                educationCertificates={educationCertificates} setEducationCertificates={setEducationCertificates}
                selectedLanguages={selectedLanguages} setSelectedLanguages={setSelectedLanguages} 
                selectedExperience={selectedExperience} setSelectedExperience={setSelectedExperience}
                setSelectedAgeExperience={setSelectedAgeExperience}
                setSelectedSpecializations={setSelectedSpecializations}
                ShowOff
            />
        </div>
    )
}

export default BabysitterConfirmAndSignup;