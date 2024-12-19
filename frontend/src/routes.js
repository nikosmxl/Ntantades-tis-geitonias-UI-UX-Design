import BabysitterApplications from "./Pages/Babysitter Pages/BabysitterApplications/BabysitterApplications";
import MyListings from "./Pages/Babysitter Pages/MyListings/MyListings";
import Home from "./Pages/Common Pages/Home/Home";
import ParentApplications from "./Pages/Parent Pages/Parent Applications/ParentApplications";

/*
  Εδώ ορίζουμε όλα τα routes.
  context: σε ποιο βασικό route θέλουμε να φαίνεται.
  path: το υπο-route του url στο οποίο θέλουμε να βάλουμε νέα σελίδα
  page: το στοιχείο/component/σελίδα που θέλουμε να εμφανίζεται στο νέο route
*/
const routes = [
  {
    context: 'loggedOut',
    path: 'test',
    page: <Home />,
  },
  {
    context: 'parent',
    path: 'applications',
    page: <ParentApplications />,
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