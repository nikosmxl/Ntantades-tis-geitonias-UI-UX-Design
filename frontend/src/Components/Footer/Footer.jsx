import s from "./FooterStyle.module.css"
import logo from "../../Assets/Pictures/govgr_logo_footer_cropped.jpg"
import { useNavigate, useLocation } from "react-router-dom";

function Footer(){
    const navigate = useNavigate();
    const location = useLocation();
    const context = location.pathname.split('/')[1];

    return (
        <div className={s.footer}>
            <img src={logo} alt="Logo" onClick={() => navigate(`../${context}/`, { relative: 'route' })}/>
            <div className={s.category}>
                <b>Για επαγγελματίες</b>
                <div className={s.links}>
                    <p onClick={() => navigate(`../${context}/profile`, { relative: 'route' })}>Βιογραφικό</p>
                    <p onClick={() => navigate(`../${context}/help`, { relative: 'route' })}>Τι κάνει μια νταντά;</p>
                    <p onClick={() => navigate(`../${context}/help`, { relative: 'route' })}>Έγγραφα/Πιστοποιητικά</p>
                    <p onClick={() => navigate(`../${context}/help`, { relative: 'route' })}>Πώς βρίσκω εργασία;</p>
                    <p onClick={() => navigate(`../${context}/help`, { relative: 'route' })}>Πώς λαμβάνω την πληρωμή μου;</p>
                    <p onClick={() => navigate(`../${context}/help`, { relative: 'route' })}>Πώς διαχειρίζομαι τις αγγελίες μου;</p>
                    <p onClick={() => navigate(`../${context}/help`, { relative: 'route' })}>Πώς διαχειρίζομαι τις συνεργασίες μου;</p>
                    <p onClick={() => navigate(`../${context}/help`, { relative: 'route' })}>Πώς διαχειρίζομαι τις αιτήσεις μου</p>
                    <p onClick={() => navigate(`../${context}/help`, { relative: 'route' })}>Πώς διαχειρίζομαι τα ραντεβού γνωριμίας μου;</p>
                </div>
            </div>
            <div className={s.category}>
                <b>Για Κηδεμόνες</b>
                <div className={s.links}>
                    <p onClick={() => navigate(`../${context}/babysitter-search`, { relative: 'route' })}>Βρείτε νταντά</p>
                    <p onClick={() => navigate(`../${context}/help`, { relative: 'route' })}>Οδηγίες Voucher;</p>
                    <p onClick={() => navigate(`../${context}/help`, { relative: 'route' })}>Πώς επιλέγω νταντά;</p>
                    <p onClick={() => navigate(`../${context}/help`, { relative: 'route' })}>Πώς διαχειρίζομαι τις αιτήσεις μου;</p>
                    <p onClick={() => navigate(`../${context}/help`, { relative: 'route' })}>Πώς διαχειρίζομαι τις συνεργασίες μου;</p>
                    <p onClick={() => navigate(`../${context}/help`, { relative: 'route' })}>Πώς διαχειρίζομαι τα ραντεβού γνωριμίας μου;</p>
                </div>
            </div>
            <div className={`${s.category} ${s.help}`}>
                <b>Βοήθεια</b>
                <div className={s.links}>
                    <p onClick={() => navigate(`../${context}/help`, { relative: 'route' })}>Πώς λειτουργεί;</p>
                    <p>Live Chat</p>
                </div>
                
            </div>
        </div>
    )
}

export default Footer;