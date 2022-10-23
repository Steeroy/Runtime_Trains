import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { Store } from '../Store';

function TrainCard(props) {
  const { _id, name, slug, imgUrl, type, price } = props.item;

  const { state, dispatch: ctxDispatch } = useContext(Store);

  const {
    cart: { cartItems, bookmarkItems },
  } = state;

  const addTicketsHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === _id);

    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/trains/${item._id}`);

    if (data.tickets < quantity) {
      window.alert('Sorry. The train is fully booked');
      return;
    }
    ctxDispatch({
      type: 'BOOK__TRAIN',
      payload: { ...item, quantity },
    });
  };

  const addBookmarkTicket = async (item) => {
    const quantity = 1;

    ctxDispatch({
      type: 'BOOKMARK__TRAIN',
      payload: { ...item, quantity },
    });
  };

  const removeBookmarkTicket = async (item) => {
    ctxDispatch({
      type: 'REMOVE__BOOKMARK',
      payload: { ...item },
    });
  };

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
          <Icon
            type="button"
            onClick={() => removeBookmarkTicket(props.item)}
            className="bookmark"
            icon="bi:bookmark-dash-fill"
          />

          <Icon
            type="button"
            onClick={() => addBookmarkTicket(props.item)}
            className="bookmark"
            icon="bi:bookmark-plus-fill"
          />

          <Icon
            type="button"
            icon="carbon:add-filled"
            onClick={() => addTicketsHandler(props.item)}
            className="add__round"
          />
        </div>
      </div>
    </div>
  );
}

export default TrainCard;
