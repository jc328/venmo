import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { baseUrl } from '../config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import '../styles/feed.css';

moment.relativeTimeThreshold('d', 365);
moment.relativeTimeThreshold('M', 0);

moment.updateLocale('en', {
  relativeTime: {
    future: "in %s",
    past: function (input) {
      return input === 'just now'
        ? input
        : input + ' ago'
    },
    s: 'just now',
    ss: '%ds',
    m: "1m",
    mm: "%dm",
    h: "1h",
    hh: "%dh",
    d: "1d",
    dd: "%dd",
    w: "1w",
    ww: "%dw",
    M: "1m",
    MM: "%dm",
    y: "1y",
    yy: "%dy"
  }
});

const Comment = ({ 
                tdx, cdx, transactionsData, newTransactionsData, transaction,
                transaction: { id: transactionId, comments_full },
                comment: { user_id, user_full_name, user_pic, message, created_at }
                }) => {

  const currentUserId = useSelector(state => state.authentication.user.id);
  const [imageLoaded, setImageLoaded] = useState(false);

  const destroyComment = async () => {
    await fetch(`${baseUrl}/comment/delete/${transactionId}/${currentUserId}`, {});
  };
  
  const handleCommentRemove = async (e) => {
    e.preventDefault();
    const newComments = [
                      ...comments_full.slice(0, cdx), 
                      ...comments_full.slice(cdx + 1)
                      ];
    const newTransaction = { ...transaction, "comments_full": newComments };
    const newTransactions = {...transactionsData, "transactions": [
                        ...transactionsData.transactions.slice(0, tdx), 
                        newTransaction, 
                        ...transactionsData.transactions.slice(tdx + 1)
                        ]};
    newTransactionsData(newTransactions);
    await destroyComment(transactionId, currentUserId);
  }

  const tzOffset = { "h": moment().utcOffset() / 60, "m": moment().utcOffset() % 60};
  
  return (
    <div className="transaction__comments">
      <div className="transaction__comment-left">
        <div className="transaction__comment-icon">
          <img
            src={user_pic}
            alt={"profile-pic"}
            className={`smooth-image-small image-${
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
      </div>
      <div className="transaction__comment-right">
        <p className="transaction__comment-detail">
          <span className="transaction__comment-name">{user_full_name}</span>
          <span className="transaction__comment-date">{moment(created_at).subtract(tzOffset).fromNow()}</span>
        </p>
        <div className="transaction__comment-message">
          {message}
          {user_id === currentUserId && <button 
                                        className="transaction__comment-delete" 
                                        onClick={handleCommentRemove}>
                                        <FontAwesomeIcon 
                                          className="transaction__comment-trash" 
                                          icon={faTrash} />
                                      </button>
          }
        </div>
      </div>
    </div>
  );
}

export default Comment;
