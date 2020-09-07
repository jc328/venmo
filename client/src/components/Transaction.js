import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { baseUrl } from '../config';
import '../styles/feed.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';

const Transaction = ({ transaction, audience, index, transactionsData, newTransactionsData }) => {
  const currentUserId = useSelector(state => state.authentication.user.id)
  const firstName = useSelector((state) => state.authentication.user.first_name)
  const lastName = useSelector((state) => state.authentication.user.last_name)
  const transId = transaction.id;
  console.log("TRANSACTION")
  
  const findLike = () => ( transactionsData[index].likers.filter(liker => liker.id === currentUserId).length === 1 );

  const [liked, setLiked] = useState(findLike);

  const createLike = async (getState) => {
    // const { authentication: { token } } = getState();
    await fetch(`${baseUrl}/like/${transId}/${currentUserId}`, {});
  };

  const destroyLike = async (getState) => {
    // const { authentication: { token } } = getState();
    await fetch(`${baseUrl}/like/unlike/${transId}/${currentUserId}`, {});
  };

  const handleUnlike = async (e) => {
    console.log('click remove')
    e.preventDefault();
    await destroyLike(transId, currentUserId);
    setLiked(false)
    const oldTransData = transactionsData[index];
    const likerIdx = oldTransData.likers.findIndex(liker => liker.id === currentUserId);
    const newLikers = [...oldTransData.likers.slice(0, likerIdx), ...oldTransData.likers.slice(likerIdx + 1)];
    const TransactionDataUpdate = { ...oldTransData, "likers": newLikers };
    const newTransData = [...transactionsData.slice(0, index), TransactionDataUpdate, ...transactionsData.slice(index + 1)];
    newTransactionsData(newTransData);
  }

  const handleLike = async (e) => {
    console.log('click like')
    e.preventDefault();
    await createLike(transId, currentUserId);
    setLiked(true)
    const oldTransData = transactionsData[index];
    const likerIdx = oldTransData.likers.findIndex(liker => liker.id === currentUserId);
    const newLiker = { "id": currentUserId, "name": `${firstName} ${lastName}`}
    const newLikers = [...oldTransData.likers.slice(0, likerIdx), newLiker,...oldTransData.likers.slice(likerIdx + 1)];
    const TransactionDataUpdate = { ...oldTransData, "likers": newLikers };
    const newTransData = [...transactionsData.slice(0, index), TransactionDataUpdate, ...transactionsData.slice(index + 1)];
    newTransactionsData(newTransData);
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
          ? <button className="transaction__like" onClick={handleUnlike}>
            <FontAwesomeIcon className="transaction__heart liked" icon={farHeart} />
          </button>
          : <button className="transaction__like" onClick={handleLike}>
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
