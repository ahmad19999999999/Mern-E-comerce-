import React, { useState, useEffect } from 'react';
import '../Style/componentStyles/Rating.css';

// مكون التقييم (Rating Component)
const Rating = ({ value, onRatingChange, disabled }) => {
  const [hoverRating, setHoverRating] = useState(0);
  const [selectedRating, setSelectedRating] = useState(value || 0);

  // مزامنة selectedRating مع القيمة القادمة من الأب
  useEffect(() => {
    setSelectedRating(value || 0);
  }, [value]);

  const handleMouseEnter = (rating) => {
    if (!disabled) setHoverRating(rating);
  };

  const handleMouseLeave = () => {
    if (!disabled) setHoverRating(0);
  };

  const handleClick = (rating) => {
    if (!disabled) {
      setSelectedRating(rating);
      if (onRatingChange) onRatingChange(rating);
    }
  };

  const generateStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const isFilled = i <= (hoverRating || selectedRating);
      stars.push(
        <span
          key={i}
          className={`star ${isFilled ? 'filled' : 'empty'}`}
          onMouseEnter={() => handleMouseEnter(i)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick(i)}
          style={{
            pointerEvents: disabled ? 'none' : 'auto',
            cursor: disabled ? 'default' : 'pointer',
          }}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  return <div className="rating">{generateStars()}</div>;
};

export default Rating;
