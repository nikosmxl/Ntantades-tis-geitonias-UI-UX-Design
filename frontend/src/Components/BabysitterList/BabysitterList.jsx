import React, { useState, useEffect } from 'react';
import s from "./BabysitterListStyle.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import BabysitterCard from "./BabysitterCard/BabysitterCard";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { getDocs, collection, query, where } from "firebase/firestore";

function BabysitterList(){
    const [babysitters, setBabysitters] = useState([]);
    const listRef = useRef(null);

    const scrollLeft = () => {
        listRef.current.scrollBy({ left: -1050 }); // Σκρολ προς τα αριστερά
    };

    const scrollRight = () => {
        listRef.current.scrollBy({ left: 1050 }); // Σκρολ προς τα δεξιά
    };

    const navigate = useNavigate();

    const fetchData = async () => {
      const q = query(
        collection(db, 'Users'),
        where("role", "==", "babysitter")
      );
      const babysitterSnaps = await getDocs(q);
      const fetchedBabysitters = babysitterSnaps.docs.map(babysitterDoc => ({ ...babysitterDoc.data(), id: babysitterDoc.id}));
      setBabysitters(fetchedBabysitters)
    };

    useEffect(() => {
      fetchData();
    }, []);

    return (
        <div className={s.babysitters_show}>
            <b>Κάποιοι από τους αξιόπιστους επαγγελματίες μας</b>
            <div className={s.babysitters_list_area}>
                <FontAwesomeIcon icon={faAngleLeft} className={s.left_angle} onClick={scrollLeft}/>
                <div className={s.babysitters_list} ref={listRef}>
                    {
                      babysitters.map(babysitter => {
                        return (
                          <BabysitterCard
                            key={babysitter.id}
                            babysitter={babysitter}
                          />
                        );
                      })
                    }
                </div>
                <FontAwesomeIcon icon={faAngleRight} className={s.right_angle} onClick={scrollRight}/>
            </div>
            <b className={s.show_more_babysitters} onClick={() => navigate('babysitter-search')}>Δείτε όλες τις νταντάδες μας</b>
        </div>
    )
}

export default BabysitterList;