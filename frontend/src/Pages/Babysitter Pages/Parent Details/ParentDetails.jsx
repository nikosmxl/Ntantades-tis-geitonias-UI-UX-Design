import React, {useState} from 'react';
import s from './ParentDetailsStyle.module.css';
import trollProf from '../../../Assets/Pictures/troll_prof.jpg';
import Select from 'react-select';
import KidCard from '../../../Components/KidCard/KidCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const ParentDetails = ({}) => {
    const kids = [
        {
            id: 1, 
            age: 2, 
            gender: 'girl',
            hasDisabilities: false,
            hasAllergies: false,
            description: 'Την λένε Γιώτα, της αρέσει το μπαλέτο ,αγαπάει τη φύση',
        }, 

        {
            id: 2, 
            age: 1, 
            gender: 'boy',
            hasDisabilities: false,
            hasAllergies: false,
            description: '',
        }
    ]

    const [description] = useState('Λίγα λόγια για την Οικογένεια...');
    const [hasPets, setHasPets] = useState(false);

    return (
        <div>
            <div className={s.breadcrumbs_container}>
                Αρχική Σελίδα {'>'} Αιτήσεις {'>'} Ονοματεπώνυμο Κηδεμόνα
            </div>

            <div className= {s.parent_details_main_content}>
                <div className={s.parent_details_top_container}>
                    <div className={s.parent_details_left_sidebar}>
                        <img src={trollProf} className={s.profile_pic} />
                    </div>
                    
                    <div className={s.parent_details_top_container_main}>
                        <h2>Μπάκης Μπαμπάκης</h2>
                        <hr className={s.line_under_name}/>
                        
                        <h3>Προσωπικά Στοιχεία</h3>
                        <hr className={s.line_under_personal_info}/>
                        <div className={s.parent_details_personal_info}>
                            <p>Φύλο :</p>
                            <p>Άνδρας</p>
                            <p>Ηλικία</p>
                            <p>43</p>
                            <p>Εθνικότητα :</p>
                            <p>Ελληνική</p>
                            <p>Μητρική Γλώσσα :</p>
                            <p>Ελληνικά</p>
                        </div>         
                    </div>                
                </div>

                <div className={s.family_profile_section_container}>
                    <h3>Οικογένεια</h3>
                    <hr />

                    <div className={s.parent_details_family_info}>
                        <textarea 
                            className={s.family_description}
                            value={description}
                        />

                        <div className={s.parent_details_info_kids}>
                            <p>Αριθμός Παιδιών :</p>
                        </div>

                        {
                            kids.map((kid, index) => {
                                return (
                                <KidCard
                                    key={`${kid.id} ${kid.age} ${kid.gender} ${index}`}
                                    kid={kid}
                                    isEditable={false}
                                />
                                );
                            })
                        }
                        <div className={s.parent_details_info_kids}>
                            <p>Κατοικίδια :</p>
                           

                           
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ParentDetails;