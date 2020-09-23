import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { baseUrl } from '../config';
import NumberFormat from 'react-number-format';
import moment from 'moment';
import '../styles/feed.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faUserFriends, faLock } from '@fortawesome/free-solid-svg-icons';
import Likers from './Likers';
import Comment from './Comment';
import CommentForm from './CommentForm';
import CommentNull from './CommentNull';

const Transaction = ({ 
                    tdx, transactionsData, newTransactionsData, transaction,
                    transaction:  { 
                                  id, privacy, amount, message, updated_at,
                                  payee_id, payee_full_name, payer_id, payer_full_name, payer_pic, 
                                  likers_full, comments_full, friend_ids
                                  } 
                    }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const currentUserId = useSelector(state => state.authentication.user.id);
  const first_name = useSelector(state => state.authentication.user.first_name);
  const last_name = useSelector(state => state.authentication.user.last_name);
  const userFullname = `${first_name} ${last_name}`;

  const isFriend = friend_ids.filter(friend_id => friend_id === currentUserId).length > 0;
  const findLike = likers_full.filter(liker => liker.user_id === currentUserId).length === 1;
  const [liked, setLiked] = useState(findLike);

  const createLike = async () => {
    await fetch(`${baseUrl}/like/${id}/${currentUserId}`, {});
  };

  const destroyLike = async () => {
    await fetch(`${baseUrl}/like/unlike/${id}/${currentUserId}`, {});
  };

  const handleUnlike = async (e) => {
    e.preventDefault();
    await destroyLike(id, currentUserId);
    setLiked(false)
    
    const ldx = likers_full.findIndex(liker => liker.user_id === currentUserId);
    const newLikers =  [
                      ...likers_full.slice(0, ldx), 
                      ...likers_full.slice(ldx + 1)
                      ];
    const newTransaction = { ...transaction, "likers_full": newLikers };
    const newTransactions = {...transactionsData, "transactions": [
                        ...transactionsData.transactions.slice(0, tdx), 
                        newTransaction, 
                        ...transactionsData.transactions.slice(tdx + 1)
                        ]};
    newTransactionsData(newTransactions);
  }

  const handleLike = async (e) => {
    e.preventDefault();
    await createLike(id, currentUserId);
    setLiked(true)

    const ldx = likers_full.findIndex(liker => liker.user_id === currentUserId);
    const newLiker = { "user_id": currentUserId, "user_full_name": userFullname, "transaction_id": id };
    const newLikers =  [
                      ...likers_full.slice(0, ldx), 
                      newLiker,
                      ...likers_full.slice(ldx + 1)
                      ];
    const newTransaction = { ...transaction, "likers_full": newLikers };
    const newTransactions = { ...transactionsData, "transactions": [
                        ...transactionsData.transactions.slice(0, tdx), 
                        newTransaction, 
                        ...transactionsData.transactions.slice(tdx + 1)
                        ]};
    newTransactionsData(newTransactions);
  }

  return (
    <div className="feed__transaction" style={{ animation: `fadeIn 0.5s` }}>
      <div className="transaction__description">
        <div className="transaction__icon">
          <img
            src={payer_pic}
            alt={"profile-pic"}
            className={`smooth-image image-${
              imageLoaded ? 'visible' : 'hidden'
              }`}
            onLoad={() => setImageLoaded(true)}
          />
          {!imageLoaded && (
            <div className="smooth-preloader">
              <span className="loader" />
            </div>
          )}
        </div>
        <div className="transaction__details">
          <div className="transaction__names-amount">
            <div className="transaction__names">
              <span className="transaction__pay-name">{payer_full_name}</span>
              <span className="transaction__paid"> paid </span>
              <span className="transaction__pay-name">{payee_full_name}</span>
            </div>
          </div>
          <div className="transaction__details-date">
            <div className="transaction__date">{moment(updated_at).format('MMMM Do, YYYY, h:mm A')}&nbsp;</div>
            {privacy === 0
              ? <FontAwesomeIcon className="transaction__audience" icon={faGlobe} />
              : privacy === 1
                ? <FontAwesomeIcon className="transaction__audience" icon={faUserFriends} />
                : <FontAwesomeIcon className="transaction__audience" icon={faLock} />
            }
          </div>
          <div className="transaction__message">{message}</div>
        </div>
        {payee_id === currentUserId  
          ? <div className="transaction__amount">$<NumberFormat value={amount} displayType={'text'} decimalScale={2} fixedDecimalScale={true} /></div>
          : payer_id === currentUserId &&
            <div className="transaction__amount payee">-$<NumberFormat value={amount} displayType={'text'} decimalScale={2} fixedDecimalScale={true} /></div>
        }
      </div>
      <div className="transaction__likes">
        <div className="transaction__likes-heart">
        {liked
          ? <button id="heart" className="transaction__heart-button liked" onClick={handleUnlike}>
              <svg viewBox="0 0 20 20" width="20" height="20">
                <path d="M10 5.6c.4-1.8 2.2-3.2 4.2-3 2.4 0 4.8 1.7 4.6 5.5-.3 4.2-7.2 11-8.7 11C8.7 19 1.7 12 1.5 8c-.4-3.8 2-5.5 4.4-5.5 2 0 3.8 1.3 4.2 3"></path>
                <path d="M10 5.6c.4-1.8 2.2-3.2 4.2-3 2.4 0 4.8 1.7 4.6 5.5-.3 4.2-7.2 11-8.7 11C8.7 19 1.7 12 1.5 8c-.4-3.8 2-5.5 4.4-5.5 2 0 3.8 1.3 4.2 3"></path>
                <path d="M10 5.6c.4-1.8 2.2-3.2 4.2-3 2.4 0 4.8 1.7 4.6 5.5-.3 4.2-7.2 11-8.7 11C8.7 19 1.7 12 1.5 8c-.4-3.8 2-5.5 4.4-5.5 2 0 3.8 1.3 4.2 3"></path>
              </svg>
            </button>
          : <button id="heart" className="transaction__heart-button" onClick={handleLike}>
            <svg viewBox="0 0 20 20" width="20" height="20">
              <path d="M10 5.6c.4-1.8 2.2-3.2 4.2-3 2.4 0 4.8 1.7 4.6 5.5-.3 4.2-7.2 11-8.7 11C8.7 19 1.7 12 1.5 8c-.4-3.8 2-5.5 4.4-5.5 2 0 3.8 1.3 4.2 3"></path>
              <path d="M10 5.6c.4-1.8 2.2-3.2 4.2-3 2.4 0 4.8 1.7 4.6 5.5-.3 4.2-7.2 11-8.7 11C8.7 19 1.7 12 1.5 8c-.4-3.8 2-5.5 4.4-5.5 2 0 3.8 1.3 4.2 3"></path>
              <path d="M10 5.6c.4-1.8 2.2-3.2 4.2-3 2.4 0 4.8 1.7 4.6 5.5-.3 4.2-7.2 11-8.7 11C8.7 19 1.7 12 1.5 8c-.4-3.8 2-5.5 4.4-5.5 2 0 3.8 1.3 4.2 3"></path>
            </svg>
          </button>
        }
        </div>
        <Likers likers_full={likers_full} liked={liked}/>
      </div>
      {
      comments_full && 
        comments_full.map((comment, cdx) => <Comment 
                                              key={cdx}  
                                              tdx={tdx} 
                                              cdx={cdx}
                                              transactionsData={transactionsData} 
                                              newTransactionsData={newTransactionsData}
                                              transaction={transaction} 
                                              comment={comment} />)
      }
      { isFriend 
        ? <CommentForm 
            tdx={tdx} 
            transactionId={id}
            transactionsData={transactionsData} 
            newTransactionsData={newTransactionsData}
            transaction={transaction}  
          />
        : <CommentNull/>
      }
    </div>
  );
}

export default Transaction;
