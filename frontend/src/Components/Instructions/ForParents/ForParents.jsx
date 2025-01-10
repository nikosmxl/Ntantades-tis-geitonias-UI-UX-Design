import React, { useState } from "react";
import s from "./ForParentsStyle.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import WhoIsAllowedTheVoucher from "./WhoIsAllowedTheVoucher/WhoIsAllowedTheVoucher";
import HowToChooseBabysitter from "./HowToChooseBabysitter/HowToChooseBabysitter";
import HowToHandlePartnerships from "./HowToHandlePartnerships/HowToHandlePartnerships";
import HowToHandleApplications from "./HowToHandleApplications/HowToHandleApplications";
import HowToHandleDates from "./HowToHandleDates/HowToHandleDates";
import HowToPayBabysitter from "./HowToPayBabysitter/HowToPayBabysitter";


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
    const isHowToFindBabysitterOpen = openInnerSections.includes("howToChooseBabysitter");
    const isHowToHandlePartnershipsOpen = openInnerSections.includes("howToHandlePartnerships");
    const isHowToHandleApplicationsOpen = openInnerSections.includes("howToHandleApplications");
    const isHowToHandleDatesOpen = openInnerSections.includes("howToHandleDates");
    const isHowToPayBabysitterOpen = openInnerSections.includes("howToPayBabysitter")

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
              <div>
                <WhoIsAllowedTheVoucher isOpen={isWhoIsAllowedTheVoucherOpen} toggleInnerSections={toggleInnerSections} />
                <HowToChooseBabysitter isOpen={isHowToFindBabysitterOpen} toggleInnerSections={toggleInnerSections} />
                <HowToHandlePartnerships isOpen={isHowToHandlePartnershipsOpen} toggleInnerSections={toggleInnerSections} />
                <HowToHandleApplications isOpen={isHowToHandleApplicationsOpen} toggleInnerSections={toggleInnerSections} />
                <HowToHandleDates isOpen={isHowToHandleDatesOpen} toggleInnerSections={toggleInnerSections} />
                <HowToPayBabysitter isOpen={isHowToPayBabysitterOpen} toggleInnerSections={toggleInnerSections}/>
              </div>
            </div>
        </div>
    );
}

export default ForParents;
