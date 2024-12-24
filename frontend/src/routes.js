import BabysitterSearch from "./Pages/Common Pages/BabysitterSearch/BabysitterSearch";
import ParentApplications from "./Pages/Parent Pages/Parent Applications/ParentApplications";
import BabysitterDetails from './Pages/Parent Pages/BabysitterDetails/BabysitterDetails';
import FamilyProfile from "./Pages/Parent Pages/FamilyProfile/FamilyProfile";

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
];

export default routes;