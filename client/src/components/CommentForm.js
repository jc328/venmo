import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { createComment } from '../actions/transactions'
import moment from 'moment';
import '../styles/feed.css';

const Comment = ({ 
                tdx, transactionId, transactionsData, newTransactionsData, transaction,
                transaction: { comments_full }
                }) => {

  const currentUserId = useSelector(state => state.authentication.user.id);
  const first_name = useSelector(state => state.authentication.user.first_name);
  const last_name = useSelector(state => state.authentication.user.last_name);
  const currentUserFullname = `${first_name} ${last_name}`;
  const currentUserPic = useSelector(state => state.authentication.user.picUrl);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [message, setMessage] = useState('');
  const [focused, setFocus] = useState(false);
  const dispatch = useDispatch()

  const handleCommentAdd = async (e) => {
    e.preventDefault();
    const createdComment = await dispatch(createComment(message, transactionId, currentUserId));
    const correctedDate = moment().format("ddd, D MMM YYYY HH:mm:ss [GMT]");
    console.log("CORRECTED DATE:", correctedDate);
    const commentDateNow = `${correctedDate}`;
    console.log("commentDateNow:", commentDateNow);
    const newComment = { 
                      "user_id": currentUserId, 
                      "user_full_name": currentUserFullname, 
                      "user_pic": currentUserPic,
                      "transaction_id": transactionId,
                      "message": message,
                      "created_at": commentDateNow,
                      }
    console.log(newComment);
    const newComments = [...comments_full, newComment];
    const newTransaction = { ...transaction, "comments_full": newComments };
    const newTransactions = { ...transactionsData, "transactions": [...transactionsData.transactions.slice(0, tdx), newTransaction, ...transactionsData.transactions.slice(tdx + 1)]};
    newTransactionsData(newTransactions);

    if (createdComment){
      handleCreated();
    }
  }

  const handleCreated = () => {
    setMessage('');
  }

  const handleMessageChange = (e) => {
    e.preventDefault();
    setMessage(e.target.value);
  }

  const keyPressed = (e) => {
    if (e.key === "Enter") {
      e.target.blur();
    }
  }

  const handleFocus = (e) => {
    e.stopPropagation();
    setFocus(true)
  }

  const handleBlur = (e) => {
    e.stopPropagation();
    setFocus(false)
  }

  return (
    <div className={focused ? "transaction__comments comment-form focused" : "transaction__comments comment-form"}>
      <div className="transaction__comment-left-new">
        <div className="transaction__comment-icon">
          <img
            src={currentUserPic}
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
        <form 
          className="transaction__comment-form" 
          onSubmit={handleCommentAdd}>
          <input 
            className="transaction__comment-input" 
            type="text" 
            value={message} 
            placeholder="Write a comment..." 
            onClick={handleFocus}
            onChange={handleMessageChange} 
            onKeyPress={keyPressed}
            onBlur={handleBlur}
          />
        </form>
      </div>
    </div>
  );
}

export default Comment;
