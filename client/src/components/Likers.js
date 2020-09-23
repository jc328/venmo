import React from 'react';
import '../styles/feed.css';


const Likers = ({ likers_full, liked }) => {

  return (
    <div className="transaction__likes-likers">
    {liked
     ? (likers_full.length === 1
        ? <div><span className="transaction__liker">You</span> like this.</div>
        : likers_full.length === 2
          ? <div><span className="transaction__liker">You</span> and <span className="transaction__liker">{likers_full[1].user_full_name}</span> like this.</div>
          : likers_full.length > 2
            ? <div><span className="transaction__liker">You</span> and <span className="transaction__likers">{likers_full.length - 1} others</span> like this.</div>
            : <span className="transaction__likers">Be the first to like this.</span>)
      : (likers_full.length === 1
        ? <div><span className="transaction__liker">{likers_full[0].user_full_name}</span> likes this.</div>
        : likers_full.length === 2
          ? <div><span className="transaction__liker">{likers_full[0].user_full_name}</span> and <span className="transaction__liker">{likers_full[1].user_full_name}</span> like this.</div>
          : likers_full.length > 2
            ? <div><span className="transaction__liker">{likers_full[0].user_full_name}</span> and <span className="transaction__likers">{likers_full.length - 1} others</span> like this.</div>
            : <span className="transaction__likers">Be the first to like this.</span>)
    }
    </div>
  );
}

export default Likers;
