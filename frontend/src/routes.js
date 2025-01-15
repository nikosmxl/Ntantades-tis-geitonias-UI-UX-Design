
import BabysitterApplications from "./Pages/Babysitter Pages/BabysitterApplications/BabysitterApplications";
import MyListings from "./Pages/Babysitter Pages/MyListings/MyListings";
import BabysitterSearch from "./Pages/Common Pages/BabysitterSearch/BabysitterSearch";
import ParentApplications from "./Pages/Parent Pages/Parent Applications/ParentApplications";
import BabysitterDetails from './Pages/Parent Pages/BabysitterDetails/BabysitterDetails';
import FamilyProfile from "./Pages/Parent Pages/FamilyProfile/FamilyProfile";
import ParentPartnership from "./Pages/Parent Pages/Parent Partnership/ParentPartnership";
import ParentDates from "./Pages/Parent Pages/ParentDates/ParentDates";
import BabysitterPartnership from "./Pages/Babysitter Pages/Babysitter Partnership/BabysitterPartnership";
import EditDate from "./Pages/Common Pages/EditDate/EditDate";
import Signup from "./Pages/Common Pages/Member Signup/Signup";
import BabysitterDates from "./Pages/Babysitter Pages/Babysitter Dates/BabysitterDates";
import ParentDetails from "./Pages/Babysitter Pages/Parent Details/ParentDetails";
import History from './Pages/Common Pages/History/History';
import ApplicationsHistory from './Pages/Common Pages/ApplicationsHistory/ApplicationsHistory';
import PaymentsHistory from './Pages/Common Pages/PaymentsHistory/PaymentsHistory';
import PartnershipHistory from './Pages/Common Pages/PartnershipHistory/PartnershipHistory';
import ListingsHistory from './Pages/Babysitter Pages/ListingsHistory/ListingsHistory';
import BabysitterSignupForm from "./Pages/Babysitter Pages/BabysitterSignupForm/BabysitterSignupForm";
import ParentSignupForm from "./Pages/Parent Pages/ParentSignupForm/ParentSignupForm";
import ParentPartnershipForm from "./Pages/Parent Pages/ParentPartnershipForm/ParentPartnershipForm";
import BabysitterPartnershipForm from "./Pages/Babysitter Pages/BabysitterPartnershipForm/BabysitterPartnershipForm";
import ApplicationCreate from "./Pages/Parent Pages/ApplicationCreate/ApplicationCreate";
import ViewPartnership from "./Pages/Common Pages/ViewPartnership/ViewPartnership";
import ListingCreate from "./Pages/Babysitter Pages/ListingCreate/ListingCreate";
import InstructionsPage from "./Pages/Common Pages/InstructionsPage/InstructionsPage";
import BabysitterProfile from "./Pages/Babysitter Pages/BabysitterProfile/BabysitterProfile";
import MyRatings from "./Pages/Babysitter Pages/MyRatings/MyRatings";
import Login from './Pages/Common Pages/Login/Login';

/*
  Εδώ ορίζουμε όλα τα routes.
  context: σε ποιο βασικό route θέλουμε να φαίνεται.
  path: το υπο-route του url στο οποίο θέλουμε να βάλουμε νέα σελίδα
  page: το στοιχείο/component/σελίδα που θέλουμε να εμφανίζεται στο νέο route
*/
const routes = [
  {
    context: 'loggedOut',
    path: 'babysitter-search',
    page: <BabysitterSearch />,
  },
  {
    context: 'loggedOut',
    path: 'signup/babysitter',
    page: <BabysitterSignupForm />,
  },
  {
    context: 'loggedOut',
    path: 'signup/parent',
    page: <ParentSignupForm />,
  },
  {
    context: 'parent',
    path: 'babysitter-search',
    page: <BabysitterSearch />,
  },
  {
    context: 'parent',
    path: 'babysitter-details/:babysitterId',
    page: <BabysitterDetails />,
  },
  {
    context: 'parent',
    path: 'babysitter-details/:babysitterId/application-create',
    page: <ApplicationCreate />,
  },
  {
    context: 'parent',
    path: 'family-profile/:id',
    page: <FamilyProfile />,
  },
  {
    context: 'babysitter',
    path: 'profile',
    page: <BabysitterProfile />,
  },
  {
    context: 'babysitter',
    path: 'ratings',
    page: <MyRatings />,
  },
  {
    context: 'parent',
    path: 'applications',
    page: <ParentApplications />,
  },
  {
    context: 'parent',
    path: 'applications/application-create',
    page: <ApplicationCreate />,
  },
  {
    context: 'parent',
    path: 'applications/application-create/:appId',
    page: <ApplicationCreate />,
  },
  {
    context: 'parent',
    path: 'partnership',
    page: <ParentPartnership />,
  },
  {
    context: 'parent',
    path: 'dates',
    page: <ParentDates />,
  },
  {
    context: 'parent',
    path: 'edit-date/:id',
    page: <EditDate />,
  },
  {
    context: 'babysitter',
    path: 'applications',
    page: <BabysitterApplications />,
  },
  {
    context: 'babysitter',
    path: 'listings',
    page: <MyListings />,
  },
  {
    context: 'babysitter',
    path: 'listings/listing-create',
    page: <ListingCreate />,
  },
  {
    context: 'babysitter',
    path: 'listings/listing-create/:listingId',
    page: <ListingCreate />,
  },
  {
    context: 'babysitter',
    path: 'partnership',
    page: <BabysitterPartnership />,
  },
  {
    context: 'babysitter',
    path: 'edit-date/:id',
    page: <EditDate />,
  },
  {
    context: 'parent',
    path: 'edit-date',
    page: <EditDate />,
  },
  {
    context: 'babysitter',
    path: 'edit-date',
    page: <EditDate />,
  },
  {
    context: 'loggedOut',
    path: 'Signup',
    page: <Signup />,
  },

  {
    context: 'babysitter',
    path: 'dates',
    page: <BabysitterDates />,
  },

  {
    context: 'babysitter',
    path: 'parent-details/:id',
    page: <ParentDetails />,
  },
  {
    context: 'parent',
    path: 'history',
    page: <History />,
  },
  {
    context: 'babysitter',
    path: 'history',
    page: <History />,
  },
  {
    context: 'parent',
    path: 'history/applications',
    page: <ApplicationsHistory />,
  },
  {
    context: 'parent',
    path: 'history/payments',
    page: <PaymentsHistory />,
  },
  {
    context: 'parent',
    path: 'history/partnerships',
    page: <PartnershipHistory />,
  },
  {
    context: 'babysitter',
    path: 'history/applications',
    page: <ApplicationsHistory />,
  },
  {
    context: 'babysitter',
    path: 'history/payments',
    page: <PaymentsHistory />,
  },
  {
    context: 'babysitter',
    path: 'history/partnerships',
    page: <PartnershipHistory />,
  },
  {
    context: 'babysitter',
    path: 'history/listings',
    page: <ListingsHistory />,
  },
  {
    context: 'parent',
    path: 'sign-partnership/:id',
    page: <ParentPartnershipForm />,
  },
  {
    context: 'babysitter',
    path: 'sign-partnership/:id',
    page: <BabysitterPartnershipForm />,
  },
  {
    context: 'parent',
    path: 'partnership/:id',
    page: <ViewPartnership />,
  },
  {
    context: 'babysitter',
    path: 'partnership/:id',
    page: <ViewPartnership />,
  },
  {
    context: 'parent',
    path: 'help',
    page: <InstructionsPage />,
  },
  {
    context: 'babysitter',
    path: 'help',
    page: <InstructionsPage />,
  },
  {
    context: 'loggedOut',
    path: 'login',
    page: <Login />,
  },
];

export default routes;