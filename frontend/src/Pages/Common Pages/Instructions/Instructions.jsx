import React, { useState } from "react";
import s from "./InstructionsStyle.module.css";
import HowItWorks from "./HowItWorks/HowItWorks";
import ForParents from "./ForParents/ForParents";
import ForBabysitters from "./ForBabysitters/ForBabysitters";
import MoreHelp from "./MoreHelp/MoreHelp";
import ParticipantStates from "./ParticipantStates/ParticipantStates";


function Instructions() {
    const [openSection, setOpenSection] = useState(null);

    const toggleSection = (section) => {
        setOpenSection(openSection === section ? null : section);
    };

    const isHowItWorksOpen = openSection === "howItWorks";
    const isForParentsOpen = openSection === "forParents";
    const isForBabysittersOpen = openSection === "forBabysitters";
    const isMoreHelpOpen = openSection === "moreHelp";
    const isParticipantStatesOpen = openSection === "participantStates";

    return (
        <div className={s.instructions_container}>
            <h2>Οδηγίες</h2>
            <div className={s.instructions_column}>
                <HowItWorks isOpen={isHowItWorksOpen} toggleSection={toggleSection} />

                <div className={s.dropdown_with_dropdowns}>
                    <ForParents isOpen={isForParentsOpen} toggleSection={toggleSection} />
                </div>
                
                <div className={s.dropdown_with_dropdowns}>
                    <ForBabysitters isOpen={isForBabysittersOpen} toggleSection={toggleSection} />
                </div>

                <MoreHelp isOpen={isMoreHelpOpen} toggleSection={toggleSection} />
                <ParticipantStates isOpen={isParticipantStatesOpen} toggleSection={toggleSection} />
            </div>
        </div>
    );
}

export default Instructions;
