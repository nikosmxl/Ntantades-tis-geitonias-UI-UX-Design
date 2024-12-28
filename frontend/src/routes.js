
import BabysitterApplications from "./Pages/Babysitter Pages/BabysitterApplications/BabysitterApplications";
import MyListings from "./Pages/Babysitter Pages/MyListings/MyListings";
import BabysitterSearch from "./Pages/Common Pages/BabysitterSearch/BabysitterSearch";
import ParentApplications from "./Pages/Parent Pages/Parent Applications/ParentApplications";
import BabysitterDetails from './Pages/Parent Pages/BabysitterDetails/BabysitterDetails';
// import FamilyProfile from "./Pages/Parent Pages/FamilyProfile/FamilyProfile";
import ParentPartnership from "./Pages/Parent Pages/Parent Partnership/ParentPartnership";
import ParentDates from "./Pages/Parent Pages/ParentDates/ParentDates";

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
    context: 'parent',
    path: 'babysitter-search',
    page: <BabysitterSearch />,
  },
  {
    context: 'parent',
    path: 'babysitter-details/:babysitterId',
    page: <BabysitterDetails />,
  },
  // {
  //   context: 'parent',
  //   path: 'family-profile/:id',
  //   page: <FamilyProfile />,
  // },
  {
    context: 'parent',
    path: 'applications',
    page: <ParentApplications />,
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
    context: 'babysitter',
    path: 'applications',
    page: <BabysitterApplications />,
  },
  {
    context: 'babysitter',
    path: 'listings',
    page: <MyListings />,
  },
];

export default routes;