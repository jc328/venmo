import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { baseUrl } from '../config';
import '../styles/feed.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';

const Transaction = ({ transaction }) => {
  const currentUserId = useSelector(state => state.authentication.user.id)
  const transId = transaction.id;
  const transLiked = transaction.likers.filter(liker => liker.id === currentUserId).length === 1
  const [liked, setLiked] = useState(transLiked);

  useEffect(() => {}, [currentUserId, liked]);

  const createLike = (transaction_id, user_id) => async (getState) => {
    const { authentication: { token } } = getState();
    await fetch(`${baseUrl}/like/${transaction_id}/${user_id}`, {});
  };

  const destroyLike = (transaction_id, user_id) => async (getState) => {
    const { authentication: { token } } = getState();
    await fetch(`${baseUrl}/like/unlike/${transaction_id}/${user_id}`, {});
  };

  const addLike = (transaction_id, user_id) => {
    setLiked(true);
    createLike(transaction_id, user_id);
  };

  const removeLike = (transaction_id, user_id) => {
    setLiked(false);
    destroyLike(transaction_id, user_id);
  }

  const handleClickRemove = () => {
    console.log('click remove')
    removeLike(transId, currentUserId)
  }
  const handleClickLike = () => {
    console.log('click like')
    setLiked(true)
    createLike(transId, currentUserId)
  }



  return (
    <div className="feed__transaction">
      <div className="transaction__description">
        <div className="transaction__icon" style={{ backgroundImage: `url('${transaction.payee_pic}')` }} />
        <div className="transaction__details">
          <div className="transaction__details-name">
            <span className="transaction__pay-name">{transaction.payee_name}</span>
            <span className="transaction__paid"> paid </span>
            <span className="transaction__pay-name">{transaction.payer_name}</span>
          </div>
          <div className="transaction__details-date">
            <div className="transaction__date">{transaction.created_at}&nbsp;</div>
            <FontAwesomeIcon className="transaction__audience" icon={faGlobe} />
          </div>
          <div className="transaction__message">{transaction.message}</div>
        </div>
      </div>
      <div className="transaction__likes">
        {liked
          ? <button className="transaction__like" onClick={handleClickRemove}>
          {/* ? <button className="transaction__like" > */}
            <FontAwesomeIcon className="transaction__heart liked" icon={farHeart} />
          </button>
           : <button className="transaction__like" onClick={handleClickLike}>
          {/* : <button className="transaction__like" > */}
            <FontAwesomeIcon className="transaction__heart" icon={farHeart} />
          </button>
        }
        <div className="transaction__likes-likers">
          {transaction.likers.length === 1
            ? <div><span className="transaction__liker">{transaction.likers[0].name}</span> likes this.</div>
            : transaction.like_count === 2
              ? <div><span className="transaction__liker">{transaction.likers[0].name}</span> and <span className="transaction__liker">{transaction.likers[1].name}</span> like this.</div>
              : transaction.like_count > 2
                ? <div><span className="transaction__liker">{transaction.likers[0].name}</span> and <span className="transaction__likers">{transaction.likers.length - 1} others</span> like this.</div>
                : <span className="transaction__likers">Be the first to like this.</span>}
        </div>
      </div>
    </div>
  );
}

export default Transaction;
