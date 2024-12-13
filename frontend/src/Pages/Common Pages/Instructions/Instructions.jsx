import React, { useState } from "react";
import s from "./InstructionsStyle.module.css";
import HowItWorks from "./HowItWorks/HowItWorks";
import ForParents from "./ForParents/ForParents";


function Instructions() {
    const [openSection, setOpenSection] = useState(null);

    const toggleSection = (section) => {
        setOpenSection(openSection === section ? null : section);
    };

    const isHowItWorksOpen = openSection === "howItWorks";
    const isForParentsOpen = openSection === "forParents";

    return (
        <div className={s.instructions_container}>
            <h2>Οδηγίες</h2>
            <div className={s.instructions_column}>
                <HowItWorks isOpen={isHowItWorksOpen} toggleSection={toggleSection} />

                <ForParents isOpen={isForParentsOpen} toggleSection={toggleSection} />

            </div>
        </div>
    );
}

export default Instructions;
