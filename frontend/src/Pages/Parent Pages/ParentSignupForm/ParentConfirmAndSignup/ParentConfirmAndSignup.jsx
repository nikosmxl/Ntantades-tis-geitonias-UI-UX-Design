import PersonalDetails from "../../../../Components/PersonalDetails/PersonalDetails";
import s from "./ParentConfirmAndSignupStyle.module.css"
import FamilyInfo from "../../../../Components/FamilyInfo/FamilyInfo";

function ParentConfirmAndSignup({
    userData, onProfileChange, 
    description, onDescriptionChange, 
    kids, onKidsNumChange,
    onKidChange, onHasPetsChange
    }){
    return (
        <div className={s.container}>
            <PersonalDetails 
                userData={userData} 
                onProfileChange={onProfileChange} 
                ShowOff
            />
            <FamilyInfo
                isEditable={false}
                description={description}
                onDescriptionChange={onDescriptionChange}
                kids={kids}
                onKidsNumChange={onKidsNumChange}
                onKidChange={onKidChange}
                onHasPetsChange={onHasPetsChange}
            />
        </div>
    )
}

export default ParentConfirmAndSignup;