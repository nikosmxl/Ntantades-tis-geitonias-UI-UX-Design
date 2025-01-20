import s from "./ParentApplicationsStyle.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Application from "../../../Components/Application/Application";
import { faClockRotateLeft } from "@fortawesome/free-solid-svg-icons";
import ListHeader from "../../../Components/ListHeader/ListHeader";
import Pagination from "../../../Components/Pagination/Pagination";
import { useState, useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Breadcrumbs from '../../../Components/Breadcrumbs/Breadcrumbs';
import NotificationPopUp from '../../../PopUps/NotificationPopUp/NotificationPopUp';
import { db } from '../../../firebase';
import { collection, getDocs, where, query, doc, setDoc, orderBy } from "firebase/firestore";

function ParentApplications(){
    const navigate = useNavigate();
    const location = useLocation();

    const [applications, setApplications] = useState({});
    const [submittedApplicationsPageSize, setSubmittedApplicationsPageSize] = useState(5);
    const [submittedApplicationsSorting, setSubmittedApplicationsSorting] = useState("Πιο πρόσφατη");
    const submittedApplicationsSortingOptions = ["Πιο πρόσφατη", "Λιγότερο πρόσφατη"];
    const [submittedApplicationsCurrentPage, setSubmittedApplicationsCurrentPage] = useState(1);
    
    const [editableApplicationsPageSize, setEditableApplicationsPageSize] = useState(5);
    const [editableApplicationsSorting, setEditableApplicationsSorting] = useState("Πιο πρόσφατη");
    const editableApplicationsSortingOptions = ["Πιο πρόσφατη", "Λιγότερο πρόσφατη"];
    const [editableApplicationsCurrentPage, setEditableApplicationsCurrentPage] = useState(1);
    const [status, setStatus] = useState(location?.state?.status ?? null);

    const parentId = useMemo(() => JSON.parse(localStorage.getItem('user'))['id'], []);

    const fetchData = async () => {
      const parentDocRef = doc(db, 'Users', parentId);
      const saq = query(
        collection(db, 'Applications'),
        where("status", "in", ["sent", "decline", "accept"]),
        where("parent", "==", parentDocRef),
        orderBy("dateCreated", submittedApplicationsSorting === "Πιο πρόσφατη" ? 'desc' : 'asc')
      );
      const submittedApplicationSnaps = await getDocs(saq);
      const fetchedSubmittedApplications = submittedApplicationSnaps.docs.map(submittedApplicationDoc => ({ ...submittedApplicationDoc.data(), id: submittedApplicationDoc.id}));

      const eaq = query(
        collection(db, 'Applications'),
        where("status", "==", "saved"),
        where("parent", "==", parentDocRef),
        orderBy("dateCreated", editableApplicationsSorting === "Πιο πρόσφατη" ? 'desc' : 'asc')
      );
      const editableApplicationSnaps = await getDocs(eaq);
      const fetchedEditableApplications = editableApplicationSnaps.docs.map(editableApplicationDoc => ({ ...editableApplicationDoc.data(), id: editableApplicationDoc.id}));

      setApplications({
        submittedApplications: fetchedSubmittedApplications.filter(app => !app.isHistory),
        editableApplications: fetchedEditableApplications.filter(app => !app.isHistory),
      });

      await setHistory(fetchedSubmittedApplications.filter(app => !app.isHistory));
    };

    const submittedApplicationsByPage = useMemo(() => {
      return (applications?.submittedApplications ?? []).slice(
        (submittedApplicationsCurrentPage-1)*submittedApplicationsPageSize,
        submittedApplicationsCurrentPage*submittedApplicationsPageSize
      );
    }, [submittedApplicationsCurrentPage, submittedApplicationsPageSize, applications.submittedApplications]);

    const submittedApplicationsPages = useMemo(() => {
      return Math.ceil((applications?.submittedApplications ?? []).length / submittedApplicationsPageSize)
    }, [submittedApplicationsPageSize, applications.submittedApplications]);

    const editableApplicationsByPage = useMemo(() => {
      return (applications?.editableApplications ?? []).slice(
        (editableApplicationsCurrentPage-1)*editableApplicationsPageSize,
        editableApplicationsCurrentPage*editableApplicationsPageSize
      );
    }, [editableApplicationsCurrentPage, editableApplicationsPageSize, applications.editableApplications]);

    const editableApplicationsPages = useMemo(() => {
      return Math.ceil((applications?.editableApplications ?? []).length / editableApplicationsPageSize)
    }, [editableApplicationsPageSize, applications.editableApplications]);

    useEffect(() => {
      fetchData();
    }, [submittedApplicationsSorting, editableApplicationsSorting]);

    const handleApplicationDelete = async (application) => {
      // api call to delete
      const applicationDocRef = doc(db, 'Applications', application.id);
      await setDoc(
        applicationDocRef,
        {
          ...application,
          status: 'delete',
        }
      );
      await fetchData();
    };

    const setHistory = async (submittedApplications) => {
      const historyApplications = submittedApplications.filter(application => {
        return application.status == 'decline' || application.status == 'accept';
      });

      await Promise.all(historyApplications.map(async (historyApplication) => {
        const historyApplicationDocRef = doc(db, 'Applications', historyApplication.id);
        await setDoc(
          historyApplicationDocRef,
          {
            ...historyApplication,
            isHistory: true,
          }
        );
      }));
    };

    return (
        <div className={s.applications_page}>
            {
              status != null && (
                <NotificationPopUp
                  status={status === 'sent' ? 'success' : status}
                  message={status === 'sent' ? 'Η Αίτηση σας στάλθηκε επιτυχώς.' : 'Η Αίτηση σας έχει αποθηκευτεί προσωρινά. Βρείτε την στις Υπό Επεξεργασία αιτήσεις.'}
                  onClose={() => setStatus(null)}
                />
              )
            }
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
                <button className={s.history_button} onClick={() => navigate('/parent/history/applications')}>
                    <FontAwesomeIcon icon={faClockRotateLeft} />
                    Ιστορικό αιτήσεων
                </button>
            </div>

            <div className={s.list_header}>
                <ListHeader title={"Σε κατάσταση οριστικής υποβολής"} listElementName={"Αιτήσεις"} 
                    listSize={(applications?.submittedApplications ?? []).length} pageSize={submittedApplicationsPageSize}
                    sorting={submittedApplicationsSorting} sortingOptions={submittedApplicationsSortingOptions}
                    onPageSizeChange={setSubmittedApplicationsPageSize} onSortingChange={setSubmittedApplicationsSorting}
                />
            </div>
            <div className={s.column}>
                {
                  submittedApplicationsByPage.map(submittedApplication => {
                    return (
                      <Application
                        key={submittedApplication.id}
                        application={submittedApplication}
                        isParent={true}
                        application_state={0}
                        isHistory={false}
                        isEditable={false}
                        onDelete={() => handleApplicationDelete(submittedApplication)}
                      />
                    );
                  })
                }
            </div>
            <Pagination pages={submittedApplicationsPages} currentPage={submittedApplicationsCurrentPage}
                onChange={setSubmittedApplicationsCurrentPage} width="620px"
            />

            <div className={s.list_header}>
                <ListHeader title={"Υπό επεξεργασία"} listElementName={"Αιτήσεις"} 
                    listSize={(applications?.editableApplications ?? []).length} pageSize={editableApplicationsPageSize}
                    sorting={editableApplicationsSorting} sortingOptions={editableApplicationsSortingOptions}
                    onPageSizeChange={setEditableApplicationsPageSize} onSortingChange={setEditableApplicationsSorting}
                />
            </div>
            <div className={s.column}>
                {
                  editableApplicationsByPage.map(editableApplication => {
                    return (
                      <Application
                        key={editableApplication.id}
                        application={editableApplication}
                        isParent={true}
                        application_state={0}
                        isHistory={false}
                        isEditable={true}
                        onDelete={() => handleApplicationDelete(editableApplication)}
                      />
                    );
                  })
                }
            </div>
            <Pagination pages={editableApplicationsPages} currentPage={editableApplicationsCurrentPage}
                onChange={setEditableApplicationsCurrentPage} width="620px"
            />
        </div>
    )
}

export default ParentApplications;