import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { baseUrl } from '../config';
import '../styles/feed.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faUserFriends, faLock } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import Likers from './Likers';

const Transaction = ({ transaction, index, transactionsData, newTransactionsData }) => {
  const currentUserId = useSelector(state => state.authentication.user.id)
  const firstName = useSelector((state) => state.authentication.user.first_name)
  const lastName = useSelector((state) => state.authentication.user.last_name)
  const transId = transaction.id;
  
  const findLike = () => ( transactionsData[index].likers.filter(liker => liker.id === currentUserId).length === 1 );
  const [liked, setLiked] = useState(findLike);

  const createLike = async () => {
    await fetch(`${baseUrl}/like/${transId}/${currentUserId}`, {});
  };

  const destroyLike = async () => {
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
<<<<<<< HEAD

=======
  
>>>>>>> 42c38fa46280a7bf817033ce7dee2c3ab8f5330f
  return (
    <div className="feed__transaction">
      <div className="transaction__description">
        <div className="transaction__icon" style={{ backgroundImage: `url('${transaction.payee_pic}')` }} />
        <div className="transaction__details">
          <div className="transaction__details-name">
            <span className="transaction__pay-name">{transaction.payer_name}</span>
            <span className="transaction__paid"> paid </span>
            <span className="transaction__pay-name">{transaction.payee_name}</span>
          </div>
          <div className="transaction__details-date">
            <div className="transaction__date">{transaction.updated}&nbsp;</div>
            {transaction.privacy === 0
              ? <FontAwesomeIcon className="transaction__audience" icon={faGlobe} />
              : transaction.privacy === 1
                ? <FontAwesomeIcon className="transaction__audience" icon={faUserFriends} />
                : <FontAwesomeIcon className="transaction__audience" icon={faLock} />
            }
          </div>
          <div className="transaction__message">{transaction.message}</div>
        </div>
      </div>
      <div className="transaction__likes">
        {liked
          ? <button className="transaction__like" onClick={handleUnlike}>
            <FontAwesomeIcon className="transaction__heart liked" icon={faHeart} />
          </button>
          : <button className="transaction__like" onClick={handleLike}>
            <FontAwesomeIcon className="transaction__heart" icon={faHeart} />
          </button>
        }
        <Likers transaction={transaction} liked={liked}/>
      </div>
    </div>
  );
}

export default Transaction;
