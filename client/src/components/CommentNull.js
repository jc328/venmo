import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import '../styles/feed.css';

const CommentNull = () => {
  const currentUserPic = useSelector(state => state.authentication.user.picUrl);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="transaction__comments disabled">
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
          className="transaction__comment-form" >
          <input 
            className="transaction__comment-input disabled" 
            type="text" 
            value='' 
            placeholder="Become a friend with either person to write a comment..." 
            disabled="disabled"
            />
        </form>
      </div>
    </div>
  );
}

export default CommentNull;
