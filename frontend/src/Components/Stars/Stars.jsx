import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { faStarHalfStroke } from "@fortawesome/free-solid-svg-icons";
import s from "./StarsStyle.module.css";

function Stars({ rating, showRating }) {
  const roundedRating = Math.round(rating * 2) / 2;
  const fullStars = Math.floor(roundedRating);
  const hasHalfStar = roundedRating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className={s.stars_container}>
        {Array(fullStars)
            .fill(null)
            .map((_, i) => (
            <FontAwesomeIcon key={`full-${i}`} icon={solidStar} className={s.star} />
            ))}
        {hasHalfStar && (
            <FontAwesomeIcon icon={faStarHalfStroke} className={s.star} />
        )}
        {Array(emptyStars)
            .fill(null)
            .map((_, i) => (
            <FontAwesomeIcon key={`empty-${i}`} icon={regularStar} className={s.star} />
        ))}
        {showRating && (
            <p className={s.rating}>{`(${rating})`}</p>
        )}
    </div>
  );
}

export default Stars;
