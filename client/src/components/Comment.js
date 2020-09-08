import React from 'react';
import '../styles/feed.css';

const Comment = ({ userPic, fullname, createdAt, message}) => {

  return (
    <div className="transaction__comments">
      <div className="transaction__comment-left">
        <div className="transaction__comment-icon" style={{ backgroundImage: `url('${userPic}')` }} />
      </div>
      <div className="transaction__comment-right">
        <div className="transaction__comment-detail">
          <div className="transaction__comment-name">{fullname}</div><div className="transaction__comment-date">{createdAt}</div>
        </div>
        <div>{message}</div>
      </div>
    </div>
  );
}

export default Comment;
