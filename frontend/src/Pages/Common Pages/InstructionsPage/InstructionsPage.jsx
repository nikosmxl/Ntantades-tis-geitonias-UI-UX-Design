import s from "./InstructionsPageStyle.module.css"
import Instructions from "../../../Components/Instructions/Instructions";

function InstructionsPage(){
    return (
        <div className={s.instructions_page_container}>
            <div className={s.breadcrumbs}>
                <p>Αρχική</p>
                <p>{">"}</p>
                <p>Οδηγίες</p>
            </div>
            <div className={s.instructions}>
                <Instructions />
            </div>
        </div>
    )
}

export default InstructionsPage;