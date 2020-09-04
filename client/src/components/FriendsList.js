import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../styles/feed.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { getFriends } from '../actions/friends';
import { setValErrors } from '../actions/authentication';
import TransactionForm from './TransactionForm';
import DashHeader from './DashHeader';

const FriendsList = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.authentication.user.id);
  const balance = useSelector((state)=> state.authentication.user.balance);
  const [friends, setFriends] = useState(null)
  const [newBalance, setNewBalance] = useState(balance)

  useEffect(() => {
      const awaitFriends = async () => {
          const list = await dispatch(getFriends(userId))
          setFriends(list);
      };
      awaitFriends()
  }, [dispatch]);

  if (!friends) {
    return null;
  }
  console.log(friends.data)

  return (
      <>
        <DashHeader />
        <h1>friends</h1>
        {friends.data.map((friend) => {
            return (
                <div key={friend.id}>
                    <div className="transaction__icon" style={{ backgroundImage: `url('${friend.picUrl}')` }} />
                    <p>
                        {friend.first_name} {friend.last_name} (@{friend.username})
                    </p>
                    <TransactionForm userId={userId} friendId={friend.id} balance={newBalance} newBalance={newBalance => setNewBalance(newBalance)}/>
                </div>
            )
        })}
      </>
  );
}

export default FriendsList;
