import React from 'react';
import { Icon } from '@iconify/react';

function Rating(props) {
  const { rating, numReviews } = props;

  return (
    <div className="rating">
      <span>
        <Icon
          icon={
            rating >= 1
              ? 'bi:star-fill'
              : rating >= 0.5
              ? 'bi:star-half'
              : 'bi:star'
          }
        />
      </span>
      <span>
        <Icon
          icon={
            rating >= 2
              ? 'bi:star-fill'
              : rating >= 1.5
              ? 'bi:star-half'
              : 'bi:star'
          }
        />
      </span>
      <span>
        <Icon
          icon={
            rating >= 3
              ? 'bi:star-fill'
              : rating >= 2.5
              ? 'bi:star-half'
              : 'bi:star'
          }
        />
      </span>
      <span>
        <Icon
          icon={
            rating >= 4
              ? 'bi:star-fill'
              : rating >= 3.5
              ? 'bi:star-half'
              : 'bi:star'
          }
        />
      </span>
      <span>
        <Icon
          icon={
            rating >= 5
              ? 'bi:star-fill'
              : rating >= 4.5
              ? 'bi:star-half'
              : 'bi:star'
          }
        />
      </span>
      <span>
        <Icon
          icon={
            rating >= 6
              ? 'bi:star-fill'
              : rating >= 5.5
              ? 'bi:star-half'
              : 'bi:star'
          }
        />
      </span>
      numReviews
    </div>
  );
}

export default Rating;
