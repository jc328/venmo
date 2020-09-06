import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
// import { createLike, destroyLike } from '../actions/transactions';
import '../styles/feed.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { baseUrl } from '../config';

const Transaction = ({transaction}) => {
  const currentUserId = useSelector(state => state.authentication.user.id)
  const transId = transaction.id;


  const initialState = transaction.likers.filter(liker => liker.id === currentUserId).length === 1 ? transId : null;
  console.log("initialState:", initialState)
  const [liked, setLiked] = useState([initialState])
  console.log("liked:", liked)
  useEffect(() => { }, [liked, currentUserId]);

  const addLike = () => setLiked([...liked, transId]);

  const removeLike = () => {
    const idx = liked.findIndex(t => t === transId);
    setLiked([
      ...liked.slice(0, idx),
      ...liked.slice(idx + 1)
    ]);
  };

  const createLike = (transaction_id, user_id) => async (getState) => {
    // const { authentication: { token } } = getState();
    const response = await fetch(`${baseUrl}/like/${transaction_id}/${user_id}`, {
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
    });
    if (response.ok){
      addLike();
    }
  };

  const destroyLike = (transaction_id, user_id) => async (getState) => {
    // const { authentication: { token } } = getState();
    const response = await fetch(`${baseUrl}/like/unlike/${transaction_id}/${user_id}`, {
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
    });
    if (response.ok) {
      removeLike();
    }
  };
  
  // const likerStatus = transaction.likers.filter(liker => liker.id === currentUserId).length === 1;
  // const transId = transaction.id;
  // const transLiked = transaction.likers.filter(liker => liker.id === currentUserId).length === 1
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
        {liked.includes(transId)
        ? <button className="transaction__like" onClick={destroyLike(transId, currentUserId)}>
            <FontAwesomeIcon className="transaction__heart liked" icon={farHeart} />
          </button>
        : <button className="transaction__like" onClick={createLike(transId, currentUserId)}>
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
