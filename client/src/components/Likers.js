import React from 'react';
import '../styles/feed.css';


const Likers = ({ transaction, liked }) => {

  return (
    <div className="transaction__likes-likers">
    {liked
     ? (transaction.likers.length === 1
        ? <div><span className="transaction__liker">You</span> like this.</div>
        : transaction.likers.length === 2
          ? <div><span className="transaction__liker">You</span> and <span className="transaction__liker">{transaction.likers[1].name}</span> like this.</div>
          : transaction.likers.length > 2
            ? <div><span className="transaction__liker">You</span> and <span className="transaction__likers">{transaction.likers.length - 1} others</span> like this.</div>
            : <span className="transaction__likers">Be the first to like this.</span>)
      : (transaction.likers.length === 1
        ? <div><span className="transaction__liker">{transaction.likers[0].name}</span> likes this.</div>
        : transaction.likers.length === 2
          ? <div><span className="transaction__liker">{transaction.likers[0].name}</span> and <span className="transaction__liker">{transaction.likers[1].name}</span> like this.</div>
          : transaction.likers.length > 2
            ? <div><span className="transaction__liker">{transaction.likers[0].name}</span> and <span className="transaction__likers">{transaction.likers.length - 1} others</span> like this.</div>
            : <span className="transaction__likers">Be the first to like this.</span>)
    }
    </div>
  );
}

export default Likers;
