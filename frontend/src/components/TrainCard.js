import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';

function TrainCard(props) {
  const { name, slug, imgUrl, type, price } = props.item;
  return (
    <div className="train__card">
      <Link to={`/trains/${slug}`}>
        <div className="train__img">
          <img src={imgUrl} alt={name} className="" />
        </div>
      </Link>

      <p>{type}</p>
      <Link to={`/trains/${slug}`}>
        <h5>{name}</h5>
      </Link>

      <div className="price__bookmark">
        <h4>
          <span>R</span>
          {price}
        </h4>

        <div className="add__item">
          <Icon className="bookmark" icon="bi:bookmark-plus-fill" />
          <Icon icon="carbon:add-filled" className="add__round" />
        </div>
      </div>
    </div>
  );
}

export default TrainCard;
