import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import s from './BabysitterDetailsStyle.module.css';
import Stars from '../../../Components/Stars/Stars';
import Reference from '../../../Components/Reference/Reference';
import Pagination from '../../../Components/Pagination/Pagination';
import Checkbox from '../../../Components/Checkbox/Checkbox';
import DateDropdowns from '../../../Components/DateDropdowns/DateDropdowns';
import Timetable from '../../../Components/Timetable/Timetable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis, faPencil } from '@fortawesome/free-solid-svg-icons';
import Rating from '../../../Components/Rating/Rating';
import CertificatesList from '../../../Components/CertificatesList/CertificatesList';
import Breadcrumbs from '../../../Components/Breadcrumbs/Breadcrumbs';
import { db, storage } from '../../../firebase';
import { getDoc, doc, collection, getDocs, query, where } from 'firebase/firestore';
import { getDownloadURL, ref } from 'firebase/storage';
import { languageOptions, servicesMapper } from '../../../utils/options';
import { getAverageRating } from '../../../utils/calc';

const BabysitterDetails = () => {
  const [isOptionsOpen, setOptionsOpen] = useState(true);
  const [ratingsPage, setRatingsPage] = useState(1);

  const { babysitterId } = useParams();
  const [babysitter, setBabysitter] = useState({});
  const [listing, setListing] = useState(null);
  const [options, setOptions] = useState([]);

  const parentId = useMemo(() => JSON.parse(localStorage.getItem('user'))['id'], []);
  const navigate = useNavigate();

  const fetchData = async () => {
    const babysitterDocRef = doc(db, 'Users', babysitterId);
    const babysitterSnap = await getDoc(babysitterDocRef);

    const fetchedData = babysitterSnap.data();
    const profilePictureRef = ref(storage, `profilePictures/${babysitterId}.${fetchedData?.profilePictureType}`);
    const profilePictureUrl = await getDownloadURL(profilePictureRef);
    setBabysitter({ ...fetchedData, profilePicture: profilePictureUrl});

    const q = query(
      collection(db, 'Listings'),
      where("status", "==", "publish"),
      where("babysitter", "==", babysitterDocRef),
    );
    const listingSnaps = await getDocs(q);

    if (listingSnaps.docs.length > 0) setListing(listingSnaps.docs[0].data());

    const tempOptions = [];

    const parentDocRef = doc(db, 'Users', parentId);

    const aq = query(
      collection(db, 'Applications'),
      where("babysitter", "==", babysitterDocRef),
      where("parent", "==", parentDocRef),
      where("status", "==", "saved"),
    );
    const applicationSnaps = await getDocs(aq);

    const saq = query(
      collection(db, 'Applications'),
      where("babysitter", "==", babysitterDocRef),
      where("parent", "==", parentDocRef),
      where("status", "in", ["sent", "accepted"]),
    );
    const submittedApplicationSnaps = await getDocs(saq);

    if (applicationSnaps.docs.length == 0 && submittedApplicationSnaps.docs.length == 0) {
      tempOptions.push({
        label: 'Αίτημα Συνεργασίας',
        icon: faPencil,
        onClick: () => navigate('../applications/application-create', { state: { babysitterId: babysitterId } }),
      });
    } else {
      const applicationDoc = applicationSnaps.docs[0];
      tempOptions.push({
        label: 'Αίτημα Συνεργασίας',
        icon: faPencil,
        onClick: () => navigate(`../applications/application-create/${applicationDoc.id}`),
      });
    }

    setOptions(tempOptions);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const ratingsByPage = useMemo(() => {
    return (babysitter?.ratings ?? []).slice((ratingsPage-1)*4, ratingsPage*4);
  }, [ratingsPage, babysitter.ratings]);

  const averageRating = useMemo(() => {
    const avg = getAverageRating();
    return avg;
  }, [babysitter]);

  return (
    <div>
      <div className={s.breadcrumbs}>
        <Breadcrumbs
          breadcrumbItems={[
            { label: 'Αρχική Σελίδα', route: ''},
            { label: 'Βρείτε νταντά', route: 'babysitter-search'},
            { label: `${babysitter?.name} ${babysitter?.surname}`, route: '.'},
          ]}
        />
      </div>
      <div className={s.babysitter_details_main_content}>
        <div className={s.babysitter_details_top_container}>
          <div className={s.babysitter_details_left_sidebar}>
            <img src={babysitter?.profilePicture} className={s.profile_pic}/>
            <div className={s.babysitter_details_rating}>
              <Stars
                rating={averageRating}
                showRating={true}
                color={'#E9BA00'}
              />
              <p>•</p>
              <p>{(babysitter?.ratings ?? []).length} {(babysitter?.ratings ?? []).length === 1 ? 'αξιολόγηση' : 'αξιολογήσεις'}</p>
            </div>
            {
              listing && (
                <div>
                  <h3>Προσωπικά στοιχεία</h3>
                  <hr />
                  <div className={s.babysitter_details_personal_info}>
                    <div className={s.personal_info_content}>
                      <p className={s.info_label}>Φύλο:</p>
                      <p>{babysitter?.gender === 'male' ? 'Άντρας' : 'Γυναίκα'}</p>
                    </div>
                    <div className={s.personal_info_content}>
                      <p className={s.info_label}>Ηλικία:</p>
                      <p>{babysitter?.age}</p>
                    </div>
                    <div className={s.personal_info_content}>
                      <p className={s.info_label}>Εθνικότητα:</p>
                      <p>{babysitter?.nationality}</p>
                    </div>
                    <div className={s.personal_info_content}>
                      <p className={s.info_label}>Μητρική Γλώσσα:</p>
                      <p>{babysitter?.language}</p>
                    </div>
                  </div>
                </div>
              )
            }
          </div>

          <div className={s.babysitter_details_top_container_main}>
            <div className={s.babysitter_details_top_bar}>
              <h2>{babysitter?.name} {babysitter?.surname}</h2>
              <div
                className={s.babysitter_details_options_button}
                onClick={() => setOptionsOpen(!isOptionsOpen)}
              >
                <FontAwesomeIcon icon={faEllipsis} />
                <div className={`${s.dropdown_menu} ${isOptionsOpen && options.length != 0 ? s.open : ""}`}>
                    <div className={s.dropdown_triangle}>
                        <div className={s.inner_dropdown_triangle}></div>
                    </div>
                    <div className={s.options_menu}>
                      {options.map((option, index) => (
                        <div
                          key={index}
                          className={`${s.menu_item} ${
                            index === 0 ? s.first : index === options.length - 1 ? s.last : ""
                          }`}
                          onClick={option.onClick}
                        >
                          {option?.icon && 
                            <FontAwesomeIcon icon={option.icon} className={s.options_icon} />
                          }
                          <p className={s.label}>{option.label}</p>
                        </div>
                      ))}
                    </div>
                </div>
              </div>
            </div>
            <hr />
            {
              listing ? (
                <>
                  <p>Λίγα λόγια:</p>
                  <textarea
                    disabled
                    value={listing?.fewWords}
                  />
                </>
              )
              : (
                <div className={s.personal_info_no_active_listing}>
                  <div className={s.babysitter_details_personal_info}>
                    <div className={s.personal_info_content}>
                      <p className={s.info_label}>Φύλο:</p>
                      <p>{babysitter?.gender === 'male' ? 'Άντρας' : 'Γυναίκα'}</p>
                    </div>
                    <div className={s.personal_info_content}>
                      <p className={s.info_label}>Ηλικία:</p>
                      <p>{babysitter?.age}</p>
                    </div>
                    <div className={s.personal_info_content}>
                      <p className={s.info_label}>Εθνικότητα:</p>
                      <p>{babysitter?.nationality}</p>
                    </div>
                    <div className={s.personal_info_content}>
                      <p className={s.info_label}>Μητρική Γλώσσα:</p>
                      <p>{babysitter?.language}</p>
                    </div>
                  </div>
                </div>
              )
            }
          </div>
        </div>

        <div className={s.babysitter_details_section_container}>
          <h3>Πληροφορίες</h3>
          <hr />
          <div className={s.babysitter_details_general_info}>
              {
                listing && (
                  <>
                    <p>Περιοχές Απασχόλησης: </p>
                    <p>{(listing?.areas ?? []).map(area => area.city.label).join(', ')}</p>
                  </>
                )
              }
              <p>Γνώσεις Ξένων Γλωσσών :</p>
              <p>
                {
                  (babysitter?.languages ?? []).map(language => {
                    return languageOptions.find(langOption => {
                      return langOption.value === language;
                    })?.label;
                  }).join(', ')
                }
              </p>
              {
                listing && (
                  <>
                    <p>Μετακίνηση παιδιών: </p>
                    <p>{listing?.transportation === 'babysitterCar' ? 'Με Ι.Χ. Νταντάς' : 'Με Ι.Χ. Οικογένειας'}</p>
                  </>
                )
              }
          </div>
        </div>

        <div className={s.babysitter_details_section_container}>
          <h3>Εκπαίδευση</h3>
          <hr />
          <div className={s.babysitter_details_education}>
            <h3>Επίπεδο Σπουδών :</h3>
            <div className={s.babysitter_details_education_field}>
              <p>{babysitter?.educationLevel}</p>
            </div>
            <h3>Ειδικότητα :</h3>
            <div className={s.babysitter_details_education_field}>
              <p>{babysitter?.specialty}</p>
            </div>
          </div>
          <div className={s.babysitter_details_certification_container}>
            <CertificatesList
              babysitterId={babysitterId}
              certificates={babysitter?.certificates ?? []}
              isEditable={false}
            />
          </div>
        </div>

        <div className={s.babysitter_details_section_container}>
          <h3>Εμπειρία</h3>
          <hr />
          <div className={s.babysitter_details_experience}>
            <p><span>Προϋπηρεσία:</span> {babysitter?.experience}</p>
            <div>
              <p><span>Εμπειρία με παιδιά ηλικίας:</span></p>
              <ul>
                {
                  (babysitter?.ageExperience ?? []).map(age => (
                    <li key={age}><p>{age}</p></li>
                  ))
                }
              </ul>
            </div>
            <div>
              <p><span>Ειδίκευση σε:</span></p>
              <ul>
                {
                  (babysitter?.specialization?.specialNeeds ?? false) && (
                    <li><p>ΑμεΑ</p></li>
                  )
                }
                {
                  (babysitter?.specialization?.asl ?? false) && (
                    <li><p>Νοηματική</p></li>
                  )
                }
              </ul>
            </div>
          </div>
        </div>

        {
          listing && (
            <div className={s.babysitter_details_section_container}>
              <h3>Υπηρεσίες</h3>
              <hr />
              <div className={s.babysitter_details_services}>
                <ul>
                  {
                    (listing?.services ?? []).map(service => {
                      return (
                        <li key={service}><p>{servicesMapper[service]}</p></li>
                      );
                    })
                  }
                </ul>
              </div>
            </div>
          )
        }

        {
          listing && (

            <div className={s.babysitter_details_section_container}>
              <h3>Διαθεσιμότητα</h3>
              <hr />
              <div className={s.babysitter_details_availability}>
                <div className={s.occupation_type}>
                  <p>Τύπος Απασχόλησης:</p>
                  <Checkbox
                    name='partTime'
                    label='Μερική'
                    isChecked={listing?.workingHours === 'Μερική απασχόληση'}
                    onChange={() => {}}
                    isEnabled={false}
                    width='20px'
                    height='20px'
                  />
                  <Checkbox
                    name='fullTime'
                    label='Πλήρης'
                    isChecked={listing?.workingHours === 'Πλήρης απασχόληση'}
                    onChange={() => {}}
                    isEnabled={false}
                    width='20px'
                    height='20px'
                  />
                </div>
                <div className={s.babysitter_availability_date_container}>
                  <Checkbox
                    name='availableNow'
                    label='Άμεσα διαθέσιμος/η'
                    isChecked={listing?.startingDate === 'Anytime'}
                    onChange={() => {}}
                    isEnabled={false}
                    width='20px'
                    height='20px'
                  />
                  <Checkbox
                    name='availableFrom'
                    label='Διαθέσιμος/η από :'
                    isChecked={listing?.startingDate !== 'Anytime'}
                    onChange={() => {}}
                    isEnabled={false}
                    width='20px'
                    height='20px'
                  />
                  <div>
                    {
                      listing?.startingDate !== 'Anytime' && (
                        <DateDropdowns
                          isEnabled={false}
                          day={listing?.startingDate?.day ?? null}
                          month={listing?.startingDate?.month ?? null}
                          year={listing?.startingDate?.year ?? null}
                        />
                      )
                    }
                  </div>
                  <Checkbox
                    name='availabilityUndefined'
                    label='Αόριστη Συνεργασία'
                    isChecked={listing?.endingDate === 'Anytime'}
                    onChange={() => {}}
                    isEnabled={false}
                    width='20px'
                    height='20px'
                  />
                  <Checkbox
                    name='availableTo'
                    label='Διαθέσιμος/η έως :'
                    isChecked={listing?.endingDate !== 'Anytime'}
                    onChange={() => {}}
                    isEnabled={false}
                    width='20px'
                    height='20px'
                  />
                  <div>
                    {
                      listing?.endingDate !== 'Anytime' && (
                        <DateDropdowns
                          isEnabled={false}
                          day={listing?.endingData?.day ?? null}
                          month={listing?.endingData?.month ?? null}
                          year={listing?.endingData?.year ?? null}
                        />
                      )
                    }
                  </div>
                </div>
                <Timetable
                  width='414px'
                  height='330px'
                  isEnabled={false}
                  checkedSlots={listing?.availability ?? []}
                />
              </div>
            </div>
          )
        }

        <div className={s.babysitter_details_section_container}>
          <h3>Συστατικές Επιστολές</h3>
          <hr />
          <div className={s.babysitter_details_references_container}>
            {
              (babysitter?.references ?? []).length > 0 && babysitter?.references.map(reference => {
                return <Reference
                  key={`${reference}`}
                  babysitterId={babysitterId}
                  reference={reference}
                />
              })
            }
          </div>
        </div>

        <div className={s.babysitter_details_section_container}>
          <h3>Αξιολογήσεις</h3>
          <hr />
          <div className={s.babysitter_ratings_container}>

            <div className={s.babysitter_ratings_list}>
              {
                ratingsByPage.map(rating => {
                  return (
                    <Rating
                      key={rating}
                      rating={rating}
                    />
                  );
                })
              }
            </div>

            <Pagination
              pages={Math.ceil((babysitter?.ratings ?? []).length / 4)}
              currentPage={ratingsPage}
              onChange={setRatingsPage}
              width={'500px'}
            />
          </div>
        </div>

      </div>
    </div>
  );
}
 
export default BabysitterDetails;