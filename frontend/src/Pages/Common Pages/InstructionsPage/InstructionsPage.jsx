import s from "./InstructionsPageStyle.module.css"
import Instructions from "../../../Components/Instructions/Instructions";
import Breadcrumbs from '../../../Components/Breadcrumbs/Breadcrumbs';

function InstructionsPage(){
    return (
        <div className={s.instructions_page_container}>
            <div className={s.breadcrumbs}>
                <Breadcrumbs
                  breadcrumbItems={[
                    { label: 'Αρχική Σελίδα', route: ''},
                    { label: 'Οδηγίες', route: '.'},
                  ]}
                />
            </div>
            <div className={s.instructions}>
                <Instructions />
            </div>
        </div>
    )
}

export default InstructionsPage;