import React, { useState, useCallback, useRef, useEffect } from 'react';

import puff from './puff.svg';
import UserItem from './UserItem';
import './UserList.css';

const UserList = ({ error, loading, data, onLoadMore, loadingMore }) => {
  const [hitLoadMore, setHitLoadMore] = useState(false);
  const loader = useRef(null);

  useEffect(() => {
    if (hitLoadMore) {
      onLoadMore();
      setHitLoadMore(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hitLoadMore]);

  const handleObserver = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setHitLoadMore(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
  }, [handleObserver, loader]);

  return (
    <>
      {!!data.search.edges.length && (
        <p className="result-counter">
          Showing <strong>{data.search.edges.length}</strong> results
        </p>
      )}
      <div className="user-list-container">
        {error && <p>Error in search query</p>}
        {loading ? (
          <img className="loader-svg" src={puff} height="50px" alt="loader" />
        ) : data?.search.edges.length ? (
          <>
            <ul className="list-items">
              {data?.search.edges.map(
                (node, i) =>
                  node.node.login && (
                    <UserItem key={node.node.login + i} user={node.node} />
                  )
              )}
            </ul>
          </>
        ) : (
          <p className="no-result">There are no results to show</p>
        )}
        {loadingMore && (
          <img
            className="loader-more-svg"
            src={puff}
            height="50px"
            alt="loader"
          />
        )}
        <div className="mobile-load-more" ref={loader}></div>
        {!!data.search.edges.length && (
          <button className="load-more-btn" onClick={() => onLoadMore()}>
            Load more
          </button>
        )}
      </div>
    </>
  );
};

export default UserList;
