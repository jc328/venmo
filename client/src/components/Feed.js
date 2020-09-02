import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTransactions } from '../actions/transactions';


const Feed = () => {
  const dispatch = useDispatch();
  const transactions = useSelector(state => state.transactions.list);

  useEffect(() => {
    dispatch(getTransactions());
  }, [dispatch]);

  if (!transactions) {
    return null;
  }


  return (
    <div className="feed-transaction-posts">
      {transactions.data.map((transaction) => {
        return (
          <div key={transaction.id} className="feed-transaction-post">
              <div className="feed-profile-photo" style={{ backgroundImage: `url('${transaction.picUrl}')` }} />
              <div className="feed-profile-name">{transaction.first_name}</div>
            <div className="feed-image-info">
              <div className="feed-caption">
                <span className="feed-caption-text">{transaction.message}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Feed;