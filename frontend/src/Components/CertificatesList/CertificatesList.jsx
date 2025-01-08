import s from "./CertificatesListStyle.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

function CertificatesList({certificates, isEditable, handleCertificateRemove}){

    
    return (
        <ul className={s.certificates_list}>
            {certificates.map((file, index) => (
                <li key={index} className={s.certificate_item}>
                    <span>{file.name}</span>
                    {isEditable &&
                        <button
                            className={s.remove_button}
                            onClick={() => handleCertificateRemove(index)}
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