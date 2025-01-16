import s from "./CertificatesListStyle.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { storage } from "../../firebase";
import { getDownloadURL, ref } from 'firebase/storage';

function CertificatesList({babysitterId, certificates, isEditable, handleCertificateRemove}){

    const handleDownload = async (certificate) => {
      const certificateRef = ref(storage, `certificates/${babysitterId}/${certificate.name}`);
      const certificateUrl = await getDownloadURL(certificateRef);
      window.open(certificateUrl, '_blank');
    };

    return (
        <ul className={s.certificates_list}>
            {certificates.map((file, index) => (
                <li key={index} className={s.certificate_item}>
                    <span onClick={() => handleDownload(file)} style={{cursor: 'pointer'}}>{file.name}</span>
                    {isEditable &&
                        <button
                            className={s.remove_button}
                            onClick={() => handleCertificateRemove(certificates.filter(certificate => file.name != certificate.name))}
                        >
                            <FontAwesomeIcon icon={faX} />
                        </button>
                    }
                </li>
            ))}
        </ul>
    )
}

export default CertificatesList;