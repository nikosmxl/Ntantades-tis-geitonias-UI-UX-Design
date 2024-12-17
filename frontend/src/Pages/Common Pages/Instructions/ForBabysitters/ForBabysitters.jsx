import React, { useState } from "react";
import s from "./ForBabysittersStyle.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import WhatDoesABabysitterDo from "./WhatDoesABabysitterDo/WhatDoesABabysitterDo";
import DocumentsCertificates from "./DocumentsCertificates/DocumentsCertificates";
import HowToFindWork from "./HowToFindWork/HowToFindWork";
import HowToGetPaid from "./HowToGetPaid/HowToGetPaid";


function ForBabysitters({isOpen, toggleSection}) {
    const [openInnerSections, setOpenInnerSections] = useState([]);

    const toggleInnerSections = (section) => {
        setOpenInnerSections((prevSections) =>
            prevSections.includes(section)
                ? prevSections.filter((s) => s !== section) // Αφαιρει το section απο τη λιστα
                : [...prevSections, section] // Προσθετει το section στη λιστα
        );
    };

    const isWhatDoesABabysitterDoOpen = openInnerSections.includes("whatDoesABabysitterDo");
    const isDocumentsCertificatesOpen = openInnerSections.includes("documentsCertificates");
    const isHowToFindWorkOpen = openInnerSections.includes("howToFindWork");
    const isHowToGetPaidOpen = openInnerSections.includes("howToGetPaid");

    return (
        <div className={s.for_babysitters}>
            <button
                className={s.instruction_item}
                onClick={() => toggleSection("forBabysitters")}
            >
                <p>Για Νταντάδες</p>
                {isOpen ? 
                <FontAwesomeIcon icon={faAngleUp} className={s.angle_icon}/>
                : 
                <FontAwesomeIcon icon={faAngleDown} className={s.angle_icon}/>
                }
            </button>
            <div className={`${s.instruction_dropdown} ${isOpen ? s.open : ''}`}>
                <div>
                    <WhatDoesABabysitterDo isOpen={isWhatDoesABabysitterDoOpen} toggleInnerSections={toggleInnerSections} />
                    <DocumentsCertificates isOpen={isDocumentsCertificatesOpen} toggleInnerSections={toggleInnerSections} />
                    <HowToFindWork isOpen={isHowToFindWorkOpen} toggleInnerSections={toggleInnerSections} />
                    <HowToGetPaid isOpen={isHowToGetPaidOpen} toggleInnerSections={toggleInnerSections} />
                </div>
            </div>
        </div>
    );
}

export default ForBabysitters;
