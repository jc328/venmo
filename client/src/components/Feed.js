import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';
import { usePromiseTracker, trackPromise } from 'react-promise-tracker';
import Loader from 'react-loader-spinner';
import { baseUrl } from '../config';
import { useSelector } from 'react-redux';
import '../styles/feed.css';
import Transaction from './Transaction';

const Feed = () => {
  const currentUserId = useSelector(state => state.authentication.user.id)
  const currentUserFriends = useSelector(state => state.authentication.user.has_friends)
  const { promiseInProgress } = usePromiseTracker();
  const feedDefault = currentUserFriends ? "friends" : "public";
  const initialPageData = { "page": 1, "loadMore": false, "tab": feedDefault};
  const [pageData, setPageData] = useState(initialPageData);
  const [allowScroll, setAllowScroll] = useState(false);
  const [loading, setLoading] = useState(false);
  const [transactionsData, setTransactionsData] = useState({"transactions": null, "moreData": false})
  const ref = useRef(null);
  
  const fetchData = async () => {
    const fetchPoint = { "public": `public/${pageData.page}`, "friends": `${currentUserId}/friends/${pageData.page}`, "mine": `${currentUserId}/${pageData.page}` };
    const result = await trackPromise(fetch(`${baseUrl}/transaction/${fetchPoint[pageData.tab]}`));
    if (result.ok) {
      const resultJSON = await result.json();
      if (pageData.loadMore) {
        setTransactionsData({ "transactions": [...transactionsData.transactions, ...resultJSON.data], "moreData": resultJSON.more_data });
      }
      else if (!pageData.loadMore) {
        setTransactionsData({ "transactions": [...resultJSON.data], "moreData": resultJSON.more_data });
        setLoading(false);
      }
      setAllowScroll(true);
    }
  };

  useEffect(() => {
    setAllowScroll(true);
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageData.tab]);
  
  useEffect(() => {
    if (pageData.page > 1){
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageData.page]);
  
  // useEffect(() => {}, [transactionsData])
  
  
  useLayoutEffect(() => {
    ref.current.scrollTop = 0;
  }, [pageData.tab]);

  const handleScroll = (e) => {
    e.stopPropagation();
    const target = e.target
    if (allowScroll && ((target.scrollHeight - target.scrollTop - (target.scrollTop / 2) <= target.clientHeight) && transactionsData.moreData)) {
      setAllowScroll(false);
      setPageData({...pageData, "page": pageData.page + 1, "loadMore": true});
    }
    else if (target.scrollHeight - target.scrollTop === target.clientHeight && !transactionsData.moreData) {
      setAllowScroll(false);
      setPageData({ ...pageData, "loadMore": false });
    }
  }

  const handleTabChange = (newTab) => {
    setLoading(true);
    setPageData({ "page": 1, "loadMore": false, "tab": newTab })
  }
  
  const LoadingIndicator = () => {
    return (
      <div style={{ width: "100%", height: "100", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Loader type="ThreeDots" color="#adccf7" height={50} width={50} />
      </div>
    )
  }

  return (
    <div className="feed">
      <div className="feed__tabs">
        <button className={pageData.tab === "public" ? "pressed" : ""} onClick={() => handleTabChange("public")}>PUBLIC</button>
        <button className={pageData.tab === "friends" ? "pressed" : ""} onClick={() => handleTabChange("friends")}>FRIENDS</button>
        <button className={pageData.tab === "mine" ? "pressed" : ""} onClick={() => handleTabChange("mine")}>MINE</button>
      </div>
      <div className="feed__scroll" ref={ref} onScroll={handleScroll}>
        {
          loading || (((promiseInProgress && !transactionsData.transactions) && !pageData.loadMore) || (!transactionsData.transactions && !pageData.loadMore))
          ? <LoadingIndicator/> 
          : 
          transactionsData.transactions.map((transaction, tdx) => <Transaction 
            key={tdx} 
            tdx={tdx}
            transaction={transaction} 
            transactionsData={transactionsData} 
            newTransactionsData={transactionsData => setTransactionsData(transactionsData)} 
          />)
        }
      </div>
    </div>
  );
}

export default Feed;
