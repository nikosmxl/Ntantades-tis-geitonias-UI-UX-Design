import React, { useEffect, useState } from 'react';
import s from './ParentDetailsStyle.module.css';
import KidCard from '../../../Components/KidCard/KidCard';
import Breadcrumbs from '../../../Components/Breadcrumbs/Breadcrumbs';
import { db, storage } from '../../../firebase';
import { getDoc, doc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import { getDownloadURL, ref } from 'firebase/storage';

const ParentDetails = ({}) => {
    const [parentInfo, setParentInfo] = useState({});

    const { parentId } = useParams();
    
    const fetchData = async () => {
      const parentDocRef = doc(db, 'Users', parentId);
      const parentSnap = await getDoc(parentDocRef);
  
      const fetchedData = parentSnap.data();
      const profilePictureRef = ref(storage, `profilePictures/${parentId}.${fetchedData.profilePictureType}`);
      const profilePictureUrl = await getDownloadURL(profilePictureRef);
      setParentInfo({ ...fetchedData, profilePicture: profilePictureUrl});
    };

    useEffect(() => {
      fetchData();
    }, []);

    return (
        <div>
            <div className={s.breadcrumbs_container}>
              <Breadcrumbs
                breadcrumbItems={[
                  { label: 'Αρχική Σελίδα', route: ''},
                  { label: 'Αιτήσεις', route: 'applications'},
                  { label: `${parentInfo?.name} ${parentInfo?.surname}`, route: '.'},
                ]}
              />
            </div>

            <div className= {s.parent_details_main_content}>
                <div className={s.parent_details_top_container}>
                    <div className={s.parent_details_left_sidebar}>
                        <img src={parentInfo?.profilePicture} className={s.profile_pic} />
                    </div>
                    
                    <div className={s.parent_details_top_container_main}>
                        <h2>{parentInfo?.name} {parentInfo?.surname}</h2>
                        <hr className={s.line_under_name}/>
                        
                        <h3>Προσωπικά Στοιχεία</h3>
                        <hr className={s.line_under_personal_info}/>
                        <div className={s.parent_details_personal_info}>
                            <p>Φύλο :</p>
                            <p>{parentInfo?.gender === 'male' ? 'Άντρας' : 'Γυναίκα'}</p>
                            <p>Ηλικία</p>
                            <p>{parentInfo?.age}</p>
                            <p>Εθνικότητα :</p>
                            <p>{parentInfo?.nationality}</p>
                            <p>Μητρική Γλώσσα :</p>
                            <p>{parentInfo?.language}</p>
                        </div>         
                    </div>                
                </div>

                <div className={s.family_profile_section_container}>
                    <h3>Οικογένεια</h3>
                    <hr />

                    <div className={s.parent_details_family_info}>
                        <textarea 
                            className={s.family_description}
                            value={parentInfo?.familyDescription}
                        />

                        <div className={s.parent_details_info_kids}>
                            <p>Αριθμός Παιδιών :</p>
                            <p className={s.unmodified_arrays}>{(parentInfo?.kids ?? []).length}</p>
                        </div>

                        {
                            (parentInfo?.kids ?? []).map((kid, index) => {
                                return (
                                <KidCard
                                    key={`${kid.age} ${kid.gender} ${index}`}
                                    kid={kid}
                                    isEditable={false}
                                />
                                );
                            })
                        }
                        <div className={s.parent_details_info_kids}>
                            <p>Κατοικίδια :</p>
                            <p className={s.unmodified_arrays}>{parentInfo?.hasPets ? 'Ναι' : 'Όχι'}</p>
                           
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ParentDetails;