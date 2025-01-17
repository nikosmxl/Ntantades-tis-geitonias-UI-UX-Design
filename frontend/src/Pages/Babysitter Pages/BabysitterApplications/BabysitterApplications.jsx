import s from "./BabysitterApplicationsStyle.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Application from "../../../Components/Application/Application";
import { faClockRotateLeft } from "@fortawesome/free-solid-svg-icons";
import ListHeader from "../../../Components/ListHeader/ListHeader";
import Pagination from "../../../Components/Pagination/Pagination";
import { useState, useEffect, useMemo } from "react";
import Notification from "../../../Components/Notification/Notification";
import { useNavigate, useLocation } from "react-router-dom";
import Breadcrumbs from '../../../Components/Breadcrumbs/Breadcrumbs';
import { db } from '../../../firebase';
import { collection, getDocs, where, query, doc, setDoc, orderBy } from "firebase/firestore";

function BabysitterApplications(){
    const navigate = useNavigate();

    const [applications, setApplications] = useState({});
    const [incomingApplicationsPageSize, setIncomingApplicationsPageSize] = useState(3);
    const [incomingApplicationsSorting, setIncomingApplicationsSorting] = useState("Πιο πρόσφατη");
    const incomingApplicationsSortingOptions = ["Πιο πρόσφατη", "Λιγότερο πρόσφατη"];
    const [incomingApplicationsCurrentPage, setIncomingApplicationsCurrentPage] = useState(1);

    const babysitterId = useMemo(() => JSON.parse(localStorage.getItem('user'))['id'], []);

    const fetchData = async () => {
      const babysitterDocRef = doc(db, 'Users', babysitterId);
      const aq = query(
        collection(db, 'Applications'),
        where("status", "==", "sent"),
        where("babysitter", "==", babysitterDocRef),
        orderBy("dateCreated", incomingApplicationsSorting === "Πιο πρόσφατη" ? 'desc' : 'asc')
      );
      const incomingdApplicationSnaps = await getDocs(aq);
      const fetchedIncomingApplications = incomingdApplicationSnaps.docs.map(incomingApplicationDoc => ({ ...incomingApplicationDoc.data(), id: incomingApplicationDoc.id}));

      setApplications({
        incomingApplications: fetchedIncomingApplications,
      });
    };

    const incomingApplicationsByPage = useMemo(() => {
      return (applications?.incomingApplications ?? []).slice(
        (incomingApplicationsCurrentPage-1)*incomingApplicationsPageSize,
        incomingApplicationsCurrentPage*incomingApplicationsPageSize
      );
    }, [incomingApplicationsCurrentPage, incomingApplicationsPageSize, applications.incomingApplications]);

    const incomingApplicationsPages = useMemo(() => {
      return Math.ceil((applications?.incomingApplications ?? []).length / incomingApplicationsPageSize)
    }, [incomingApplicationsPageSize, applications.incomingApplications]);

    useEffect(() => {
      fetchData();
    }, [incomingApplicationsSorting]);

    const handleApplicationDecline = async (application) => {
      // api call to decline
      const applicationDocRef = doc(db, 'Applications', application.id);
      await setDoc(
        applicationDocRef,
        {
          ...application,
          status: 'decline',
        }
      );
      await fetchData();
    };

    const handleApplicationAccept = async (application) => {
      // api call to accept
      const applicationDocRef = doc(db, 'Applications', application.id);
      await setDoc(
        applicationDocRef,
        {
          ...application,
          status: 'accept',
        }
      );
      await fetchData();
    };

    return (
        <div className={s.applications_page}>
            <div className={s.breadcrumbs}>
                <Breadcrumbs
                  breadcrumbItems={[
                    { label: 'Αρχική Σελίδα', route: '' },
                    { label: 'Αιτήσεις', route: '.' },
                  ]}
                />
            </div>
            <div className={s.title_history_row}>
                <h3>Οι αιτήσεις μου</h3>
                <button className={s.history_button} onClick={() => navigate('/babysitter/history/applications')}>
                    <FontAwesomeIcon icon={faClockRotateLeft} />
                    Ιστορικό αιτήσεων
                </button>
            </div>
            
            <div className={s.list_header}>
                <ListHeader title={"Εισερχόμενες Αιτήσεις"} listElementName={"Αιτήσεις"} 
                    listSize={(applications?.incomingApplications ?? []).length} pageSize={incomingApplicationsPageSize}
                    sorting={incomingApplicationsSorting} sortingOptions={incomingApplicationsSortingOptions}
                    onPageSizeChange={setIncomingApplicationsPageSize} onSortingChange={setIncomingApplicationsSorting}
                />
            </div>
            <div className={s.column}>
                {/* <Notification context={"Η Γεωργία Χατζηχρήστου κατέθεσε μία νέα αίτηση στις 16/12/2024 και ώρα 16:24."} width={'950px'} /> */}
                {
                  incomingApplicationsByPage.map(incomingApplication => {
                    return (
                      <Application
                        isParent={false}
                        application={incomingApplication}
                        isHistory={false}
                        isEditable={true}
                        onDecline={() => handleApplicationDecline(incomingApplication)}
                        onAccept={() => handleApplicationAccept(incomingApplication)}
                      />
                    )
                  })
                }
            </div>
            <Pagination pages={incomingApplicationsPages} currentPage={incomingApplicationsCurrentPage}
                onChange={setIncomingApplicationsCurrentPage} width="620px"
            />
        </div>
    )
}

export default BabysitterApplications;