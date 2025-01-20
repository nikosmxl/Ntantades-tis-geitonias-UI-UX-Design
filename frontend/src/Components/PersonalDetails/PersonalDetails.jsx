import s from "./PersonalDetailsStyle.module.css"
import blankProfilePic from "../../Assets/Pictures/blankProfilePic.png"
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function PersonalDetails({ userData, onProfileChange, ShowOff = false, formMarginRight='220px', horizontalMargin='320px', }){
    const [profilePicturePreview, setProfilePicturePreview] = useState(blankProfilePic);
    const navigate = useNavigate();
    const location = useLocation();
    const context = location.pathname.split('/')[1];

    useEffect(() => {
        if (userData?.profilePicture) {
            setProfilePicturePreview(userData.profilePicture);
        }
    }, [userData?.profilePicture]);

    const handleParentClick = () => {
      if (context === 'parent') return;

      navigate('/babysitter/parent-details/1');
    };

    const handleBabysitterClick = () => {
      if (context === 'parent') return navigate('/parent/babysitter-details/1');

      navigate('/babysitter/profile');
    }

    const handleProfilePictureClick = () => {
      const isParent = userData?.role === 'parent';

      if (isParent) return handleParentClick();

      handleBabysitterClick();
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file){
            onProfileChange(file);
            setProfilePicturePreview(URL.createObjectURL(file));
        }
    };

    return (
        <div
          className={s.personal_details_container}
          style={{
            margin: `0 ${horizontalMargin}`,
          }}
        >
            <h3 className={s.first_inner_title}>Φωτογραφία Προφίλ</h3>
            <img src={profilePicturePreview} alt="Profile" onClick={() => handleProfilePictureClick()}/>
            {!ShowOff &&
                <>
                    <label className={s.add_image} htmlFor="imageInput">Προσθέστε φωτογραφία +</label>
                    <input
                        type="file"
                        id="imageInput"
                        accept="image/png, image/jpg, image/jpeg"
                        className={s.image_input}
                        name="Upload Photo"
                        onChange={handleImageUpload}
                    />
                </>
            }
                
            <h3 className={s.second_inner_title}>Προσωπικά Στοιχεία</h3>
            <p className={s.note_red_inputs}>
                Τα <span>κόκκινα</span> πεδία είναι αμετάβλητα
            </p>
            <form
              style={{ marginRight: formMarginRight }}
            >
                <div className={s.form_group}>
                    <label className={s.form_group_label} htmlFor="name">Όνομα:</label>
                    <input className={s.form_group_input} 
                        type="text" 
                        id="name" 
                        value={userData.name} 
                        disabled={true} 
                    />
                </div>
                <div className={s.form_group}>
                    <label className={s.form_group_label} htmlFor="surname">Επώνυμο:</label>
                    <input className={s.form_group_input} 
                        type="text" 
                        id="surname" 
                        value={userData.surname} 
                        disabled={true} 
                    />
                </div>
                <div className={s.form_group}>
                    <label className={s.form_group_label} htmlFor="age">Ηλικία:</label>
                    <input className={s.form_group_input} 
                        type="number" 
                        id="age" 
                        value={userData.age} 
                        disabled={true} 
                    />
                </div>
                <div className={s.form_group}>
                    <label className={s.form_group_label} htmlFor="email">Email:</label>
                    <input className={s.form_group_input} 
                        type="email" 
                        id="email" 
                        value={userData.email} 
                        disabled={true} 
                    />
                </div>
                <div className={s.form_group}>
                    <label className={s.form_group_label} htmlFor="gender">Φύλο:</label>
                    <input className={s.form_group_input} 
                        type="text" 
                        id="gender"
                        value={userData.gender === "male" ? "Άνδρας" : "Γυναίκα"} 
                        disabled={true} 
                    />
                </div>
                <div className={s.form_group}>
                    <label className={s.form_group_label} htmlFor="mobile">Κινητό:</label>
                    <input className={s.form_group_input} 
                        type="tel" 
                        id="mobile" 
                        value={userData.cellNumber} 
                        disabled={true} 
                    />
                </div>
                <div className={s.form_group}>
                    <label className={s.form_group_label} htmlFor="phone">Σταθερό:</label>
                    <input className={s.form_group_input} 
                        type="tel" 
                        id="phone" 
                        value={userData.phoneNumber} 
                        disabled={true} 
                    />
                </div>
                <div className={s.form_group}>
                    <label className={s.form_group_label} htmlFor="ethnicity">Εθνικότητα:</label>
                    <input className={s.form_group_input} 
                        type="text" 
                        id="ethnicity" 
                        placeholder="Ελληνική" 
                        value={userData.nationality} 
                        disabled={true} 
                    />
                </div>
                <div className={s.form_group}>
                    <label className={s.form_group_label} htmlFor="residence">Περιοχή Διαμονής:</label>
                    <input className={s.form_group_input} 
                        type="text" 
                        id="residence" 
                        value={userData.area} 
                        disabled={true} 
                    />
                </div>
                <div className={s.form_group}>
                    <label className={s.form_group_label} htmlFor="language">Μητρική Γλώσσα:</label>
                    <input className={s.form_group_input} 
                        type="text" 
                        id="language" 
                        value={userData.language} 
                        disabled={true} 
                    />
                </div>
            </form>
        </div>
    )
}

export default PersonalDetails;