import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTransactions, createLike, destroyLike } from '../actions/transactions';
import '../styles/feed.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';

const Feed = () => {
  const dispatch = useDispatch();
  const transactions = useSelector(state => state.transactions.list);
  const currentUserId = useSelector(state => state.authentication.user.id)

  useEffect(() => {
    dispatch(getTransactions());
  }, [dispatch]);

  if (!transactions) {
    return null;
  }

  return (
    <div className="feed">
      <div className="feed__tabs">
        <button className="pressed">PUBLIC</button>
        <button className="">FRIENDS</button>
        <button className="">MINE</button>
      </div>
      {transactions.data.map((transaction) => {
        const likerStatus = transaction.likers.filter(liker => liker.id === currentUserId).length === 1;
        const id = `${transaction.id}`;
        return (
          <div key={transaction.id} className="feed__transaction">
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
                  <FontAwesomeIcon className="transaction__audience" icon={faGlobe}/>
                </div>
                <div className="transaction__message">{transaction.message}</div>
              </div>
            </div>
            <div className="transaction__likes">
              {likerStatus
              ? <button className="transaction__like" onClick={() => dispatch(destroyLike(id, currentUserId))}>
                  <FontAwesomeIcon className="transaction__heart liked" icon={farHeart} />
                </button>
              : <button className="transaction__like" onClick={()=> dispatch(createLike(id, currentUserId))}>
                  <FontAwesomeIcon className="transaction__heart" icon={farHeart} />
                </button>}
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
      })}
    </div>
  );
}

export default Feed;