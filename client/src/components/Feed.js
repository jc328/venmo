import React, { useEffect } from 'react';
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

  // console.log(currentUserId)
  // useEffect(() => {
  //   dispatch(getTransactions());
  //   dispatch(createLike());
  //   dispatch(destroyLike());
  // }, [dispatch]);

  // useEffect(() => {
  //   dispatch(createLike());
  // }, [dispatch]);

  // useEffect(() => {
  //   dispatch(destroyLike());
  // }, [dispatch]);

  if (!transactions) {
    return null;
  }

  
  // const changeLike = (idx, transactionId, userId) => {
    // console.log("CHANGE LIKE")
    // if (transactions.data[idx].likers.filter(liker => liker.id === userId).length === 1){
      // console.log("DESTROY")
      // destroyLike(transactionId, userId)
    // }
    // else{
      // console.log("CREATE") 
    // createLike(transactionId, userId)
    // }
    // const len = transactions.data[idx].likers.length
    // for (let i = 0; i < len; i++){
    //   console.log("LIKER-FOUND:", transactions.data[idx].likers[i].id === user_id);
    //   if (transactions.data[idx].likers[i].id === user_id){
    //     return true;
    //   }
    // }
  // }


  return (
    <div className="feed">
      <div className="feed__tabs">
        <button className="pressed">PUBLIC</button>
        <button className="">FRIENDS</button>
        <button className="">MINE</button>
      </div>
      {transactions.data.map((transaction, idx) => {
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
              {/* <button className="transaction__like" onClick={changeLike(idx, transaction.id, currentUserId)}> */}
                {transactions.data[idx].likers.filter(liker => liker.id === currentUserId).length === 1
                ? <button className="transaction__like" onClick={destroyLike(transaction.id, currentUserId)}>
                      <FontAwesomeIcon className="transaction__heart liked" icon={farHeart} />
                    </button>
                : <button className="transaction__like" onClick={createLike(transaction.id, currentUserId)}>
                    <FontAwesomeIcon className="transaction__heart" icon={farHeart} />
                  </button>}
              <div className="transaction__likes-likers">
                {transaction.like_count === 1
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