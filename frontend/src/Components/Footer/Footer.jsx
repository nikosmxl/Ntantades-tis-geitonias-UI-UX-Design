import s from "./FooterStyle.module.css"
import logo from "../../Assets/Pictures/govgr_logo_footer_cropped.jpg"

function Footer(){
    return (
        <div className={s.footer}>
            <img src={logo} alt="Logo"/>
            <div className={s.category}>
                <b>Για επαγγελματίες</b>
                <div className={s.links}>
                    <p>Βιογραφικό</p>
                    <p>Τι κάνει μια νταντά;</p>
                    <p>Έγγραφα/Πιστοποιητικά</p>
                    <p>Πώς βρίσκω εργασία;</p>
                    <p>Πώς λαμβάνω την πληρωμή μου;</p>
                    <p>Πώς διαχειρίζομαι τις αγγελίες μου;</p>
                    <p>Πώς διαχειρίζομαι τις συνεργασίες μου;</p>
                    <p>Πώς διαχειρίζομαι τις αιτήσεις μου</p>
                    <p>Πώς διαχειρίζομαι τα ραντεβού γνωριμίας μου;</p>
                </div>
            </div>
            <div className={s.category}>
                <b>Για Κηδεμόνες</b>
                <div className={s.links}>
                    <p>Βρείτε νταντά</p>
                    <p>Οδηγίες Voucher;</p>
                    <p>Πώς επιλέγω νταντά;</p>
                    <p>Πώς διαχειρίζομαι τις αιτήσεις μου;</p>
                    <p>Πώς διαχειρίζομαι τις συνεργασίες μου;</p>
                    <p>Πώς διαχειρίζομαι τα ραντεβού γνωριμίας μου;</p>
                </div>
            </div>
            <div className={`${s.category} ${s.help}`}>
                <b>Βοήθεια</b>
                <div className={s.links}>
                    <p>Πώς λειτουργεί;</p>
                    <p>Live Chat</p>
                </div>
                
            </div>
        </div>
    )
}

export default Footer;