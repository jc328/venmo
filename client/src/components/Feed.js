import React, { useEffect, useState } from 'react';
import { usePromiseTracker, trackPromise } from 'react-promise-tracker';
import Loader from 'react-loader-spinner';
import { baseUrl } from '../config';
import { useSelector } from 'react-redux';
import '../styles/feed.css';
import Transaction from './Transaction';

const Feed = () => {
  const [transactionsData, setTransactionsData] = useState(null)
  const [tab, setTab] = useState(0)
  const currentUserId = useSelector(state => state.authentication.user.id)
  const { promiseInProgress } = usePromiseTracker();

  useEffect(() => {
    const fetchData = async () => {
      if (tab === 0) {
        setTransactionsData([]);
        const result = await trackPromise(fetch(`${baseUrl}/transaction/public`));
        if (result.ok) {
          const resultJSON = await result.json();
          setTransactionsData(resultJSON.data);
        }
      }
      else if (tab === 1) {
        setTransactionsData([]);
        const result = await trackPromise(fetch(`${baseUrl}/transaction/${currentUserId}/friends`));
        if (result.ok) {
          const resultJSON = await result.json();
          setTransactionsData(resultJSON.data);
        }
      }
      else if (tab === 2) {
        setTransactionsData([]);
        const result = await trackPromise(fetch(`${baseUrl}/transaction/${currentUserId}`));
        if (result.ok) {
          const resultJSON = await result.json();
          setTransactionsData(resultJSON.data);
        }
      }
    };
    fetchData();
  }, [currentUserId, tab]);

  
  const LoadingIndicator = () => {
    return (
      <div style={{ width: "100%", height: "100", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Loader type="Rings" color="#adccf7" height={50} width={50} />
      </div>
    )
  }

  return (
    <div className="feed">
      <div className="feed__tabs">
        <button className={tab === 0 ? "pressed" : ""} onClick={() => setTab(0)}>PUBLIC</button>
        <button className={tab === 1 ? "pressed" : ""} onClick={() => setTab(1)}>FRIENDS</button>
        <button className={tab === 2 ? "pressed" : ""} onClick={() => setTab(2)}>MINE</button>
      </div>
      {promiseInProgress || !transactionsData
        ? <LoadingIndicator/> 
        : transactionsData.map((t, index) => <Transaction key={t.id} transaction={t} index={index} transactionsData={transactionsData} newTransactionsData={transactionsData => setTransactionsData(transactionsData)} />)}
    </div>
  );
}

export default Feed;
