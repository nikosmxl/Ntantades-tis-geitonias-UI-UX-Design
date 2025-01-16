import s from "./MyListingsStyle.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClockRotateLeft, faPlus } from "@fortawesome/free-solid-svg-icons";
import Listing from "../../../Components/Listing/Listing";
import ListHeader from "../../../Components/ListHeader/ListHeader";
import Pagination from "../../../Components/Pagination/Pagination";
import { useState, useMemo, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Breadcrumbs from '../../../Components/Breadcrumbs/Breadcrumbs';
import { db } from '../../../firebase';
import { collection, getDocs, where, query, doc, setDoc, orderBy } from "firebase/firestore";

function MyListings(){
    const [listings, setListings] = useState([]);
    const [editableListingsPageSize, setEditableListingsPageSize] = useState(5);
    const [editableListingsSorting, setEditableListingsSorting] = useState("Πιο πρόσφατη");
    const editableListingsSortingOptions = ["Πιο πρόσφατη", "Λιγότερο πρόσφατη"];
    const [editableListingsCurrentPage, setEditableListingsCurrentPage] = useState(1);
        
    const navigate = useNavigate();
    const location = useLocation();
    const { status } = location?.state ?? {};

    const babysitterId = useMemo(() => JSON.parse(localStorage.getItem('user'))['id'], []);

    const fetchData = async () => {
      const babysitterDocRef = doc(db, 'Users', babysitterId);
      const q = query(
        collection(db, 'Listings'),
        where("status", "!=", "delete"),
        where("babysitter", "==", babysitterDocRef),
        orderBy("date", editableListingsSorting === "Πιο πρόσφατη" ? 'desc' : 'asc')
      );
      const listingSnaps = await getDocs(q);
      const fetchedListings = listingSnaps.docs.map(listingDoc => ({ ...listingDoc.data(), id: listingDoc.id}));
      const publishedListing = fetchedListings.find(listing => listing.status === 'publish');
      setListings({
        published: publishedListing,
        editableListings: fetchedListings.filter(listing => listing != publishedListing),
      });
    };

    useEffect(() => {
      fetchData();
    }, [editableListingsSorting]);

    const editableListingsByPage = useMemo(() => {
      return (listings?.editableListings ?? []).slice(
        (editableListingsCurrentPage-1)*editableListingsPageSize,
        editableListingsCurrentPage*editableListingsPageSize
      );
    }, [editableListingsCurrentPage, editableListingsPageSize, listings.editableListings]);

    const editableListingsPages = useMemo(() => {
      return Math.ceil((listings?.editableListings ?? []).length / editableListingsPageSize)
    }, [editableListingsPageSize, listings.editableListings]);

    const handleListingDelete = async (listing) => {
      // api call to delete
      const listingDocRef = doc(db, 'Listings', listing.id);
      await setDoc(
        listingDocRef,
        {
          ...listing,
          status: 'delete',
        }
      );
      await fetchData();
    };

    return (
        <div className={s.applications_page}>
            <div className={s.breadcrumbs}>
                <Breadcrumbs
                  breadcrumbItems={[
                    { label: 'Αρχική Σελίδα', route: ''},
                    { label: 'Αγγελίες', route: '.'},
                  ]}
                />
            </div>
            <div className={s.title_history_row}>
                <h3>Οι αγγελίες μου</h3>
                <button className={s.history_button} onClick={() => navigate('/babysitter/history/listings')}>
                    <FontAwesomeIcon icon={faClockRotateLeft} />
                    Ιστορικό αγγελιών
                </button>
            </div>

            <b className={s.running_listing_title}>Τρέχουσα αγγελία</b>
            <div className={s.running_listing}>
              {
                listings?.published && (
                  <Listing
                    isHistory={false}
                    isEditable={false}
                    listing={listings.published}
                    onDelete={() => handleListingDelete(listings.published)}
                  />
                )
              }
            </div>

            <div className={s.list_header}>
                <ListHeader title={"Υπό επεξεργασία"} listElementName={"Αγγελίες"} 
                    listSize={(listings?.editableListings ?? []).length} pageSize={editableListingsPageSize}
                    sorting={editableListingsSorting} sortingOptions={editableListingsSortingOptions}
                    onPageSizeChange={setEditableListingsPageSize} onSortingChange={setEditableListingsSorting}
                />
            </div>

            <button className={s.create_listing} onClick={() => navigate('/babysitter/listings/listing-create')}>
                Δημιουργία αγγελίας
                <FontAwesomeIcon icon={faPlus} />
            </button>

            <div className={s.column}>
              {
                (editableListingsByPage).map(listing => {
                  return (
                    <Listing
                      key={listing.id}
                      isHistory={false}
                      isEditable={true}
                      onDelete={() => handleListingDelete(listing)}
                      listing={listing}
                    />
                  );
                })
              }
            </div>
            <Pagination pages={editableListingsPages} currentPage={editableListingsCurrentPage}
                onChange={setEditableListingsCurrentPage} width="620px"
            />
        </div>
    )
}

export default MyListings;