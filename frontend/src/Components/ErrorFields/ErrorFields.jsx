import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import s from "./ErrorFieldsStyle.module.css"
import { faXmark } from "@fortawesome/free-solid-svg-icons";

function ErrorFields({error, width, onXmarkClick}){


    return(
        <div className={s.error_message} style={{width: width}}>
            <b>{error}</b>
            <FontAwesomeIcon icon={faXmark} className={s.icon} onClick={onXmarkClick}/>
        </div>
    )
}

export default ErrorFields;