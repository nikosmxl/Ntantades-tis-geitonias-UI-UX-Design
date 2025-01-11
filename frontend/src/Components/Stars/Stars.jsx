import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { faStarHalfStroke } from "@fortawesome/free-solid-svg-icons";
import s from "./StarsStyle.module.css";

function Stars({ rating, showRating, onChange, color='#E1E900', size='small', isEnabled=false }) {
  const roundedRating = Math.round(rating * 2) / 2;
  const fullStars = Math.floor(roundedRating);
  const hasHalfStar = roundedRating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  const onStarClick = (newRating) => {
    if (isEnabled) {
      onChange(newRating);
    }
  };

  return (
    <div className={s.stars_container}>
        {Array(fullStars)
            .fill(null)
            .map((_, i) => (
            <FontAwesomeIcon
              key={`full-${i}`}
              icon={solidStar}
              className={size === 'small' ? s.star : s.star_big}
              color={color}
              onClick={() => onStarClick(i+1)}
              style={{
                cursor: isEnabled ? 'pointer' : 'normal'
              }}
            />
            ))}
        {hasHalfStar && (
            <FontAwesomeIcon
              icon={faStarHalfStroke}
              className={size === 'small' ? s.star : s.star_big}
              color={color}
              onClick={() => onStarClick(fullStars+1)}
              style={{
                cursor: isEnabled ? 'pointer' : 'normal'
              }}
            />
        )}
        {Array(emptyStars)
            .fill(null)
            .map((_, i) => (
            <FontAwesomeIcon
              key={`empty-${i}`}
              icon={regularStar}
              className={size === 'small' ? s.star : s.star_big}
              color={color}
              onClick={() => onStarClick(fullStars+(roundedRating % 1)+i+1)}
              style={{
                cursor: isEnabled ? 'pointer' : 'normal'
              }}
            />
        ))}
        {showRating && (
            <p className={size === 'small' ? s.rating : s.rating_big}>{`(${rating})`}</p>
        )}
    </div>
  );
}

export default Stars;
