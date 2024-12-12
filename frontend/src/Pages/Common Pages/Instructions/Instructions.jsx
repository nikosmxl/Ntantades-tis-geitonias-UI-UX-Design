import React, { useState } from "react";
import s from "./InstructionsStyle.module.css";
import HowItWorks from "./HowItWorks/HowItWorks";


function Instructions() {
    const [openSection, setOpenSection] = useState(null);

    const toggleSection = (section) => {
        setOpenSection(openSection === section ? null : section);
    };

    return (
        <div className={s.instructions_container}>
            <h2>Οδηγίες</h2>
            <div className={s.instructions_column}>
                <HowItWorks openSection={openSection} toggleSection={toggleSection}/>

                

                {/* <div className="accordion-item">
                    <button
                        className="accordion-header"
                        onClick={() => toggleSection("forParents")}
                    >
                        Για Κηδεμόνες
                    </button>
                    {openSection === "forParents" && (
                        <div className="accordion-content">
                            Περιεχόμενο για Κηδεμόνες
                        </div>
                    )}
                </div>

                <div className="accordion-item">
                    <button
                        className="accordion-header"
                        onClick={() => toggleSection("forBabysitters")}
                    >
                        Για Νταντάδες
                    </button>
                    {openSection === "forBabysitters" && (
                        <div className="accordion-content">
                            Περιεχόμενο για Νταντάδες
                        </div>
                    )}
                </div>

                <div className="accordion-item">
                    <button
                        className="accordion-header"
                        onClick={() => toggleSection("help")}
                    >
                        Χρειάζομαι παραπάνω βοήθεια
                    </button>
                    {openSection === "help" && (
                        <div className="accordion-content">
                            Περιεχόμενο για βοήθεια
                        </div>
                    )}
                </div>

                <div className="accordion-item">
                    <button
                        className="accordion-header"
                        onClick={() => toggleSection("municipalities")}
                    >
                        Δήμοι που συμμετέχουν στην εφαρμογή
                    </button>
                    {openSection === "municipalities" && (
                        <div className="accordion-content">
                            Περιεχόμενο για Δήμους
                        </div>
                    )}
                </div> */}
            </div>
        </div>
    );
}

export default Instructions;
