import React, { useState } from "react";
import s from "./ForParentsStyle.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import WhoIsAllowedTheVoucher from "./WhoIsAllowedTheVoucher/WhoIsAllowedTheVoucher";
import HowToChooseBabysitter from "./HowToChooseBabysitter/HowToChooseBabysitter";


function ForParents({isOpen, toggleSection}) {
    const [openInnerSections, setOpenInnerSections] = useState([]);

    const toggleInnerSections = (section) => {
        setOpenInnerSections((prevSections) =>
            prevSections.includes(section)
                ? prevSections.filter((s) => s !== section) // Αφαιρει το section απο τη λιστα
                : [...prevSections, section] // Προσθετει το section στη λιστα
        );
    };

    const isWhoIsAllowedTheVoucherOpen = openInnerSections.includes("whoIsAllowedTheVoucher");
    const isHowToFindBabysitterOpen = openInnerSections.includes("howToChooseBabysitter")

    return (
        <div className={s.for_parents}>
            <button
                className={s.instruction_item}
                onClick={() => toggleSection("forParents")}
            >
                <p>Για Κηδεμόνες</p>
                {isOpen ? 
                <FontAwesomeIcon icon={faAngleUp} className={s.angle_icon}/>
                : 
                <FontAwesomeIcon icon={faAngleDown} className={s.angle_icon}/>
                }
            </button>
            <div className={`${s.instruction_dropdown} ${isOpen ? s.open : ''}`}>
                <WhoIsAllowedTheVoucher isOpen={isWhoIsAllowedTheVoucherOpen} toggleInnerSections={toggleInnerSections} />
                <HowToChooseBabysitter isOpen={isHowToFindBabysitterOpen} toggleInnerSections={toggleInnerSections} />
            </div>
        </div>
    );
}

export default ForParents;
