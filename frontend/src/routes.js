
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
  {
    context: 'parent',
    path: 'family-profile/:id',
    page: <FamilyProfile />,
  },
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
    path: 'partnership',
    page: <BabysitterPartnership />,
  },
  {
    context: 'babysitter',
    path: 'edit-date/:id',
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
    path: 'parent-details',
    page: <ParentDetails />,
  },


];

export default routes;