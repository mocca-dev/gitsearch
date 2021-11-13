import React from 'react';

import puff from './puff.svg';
import UserItem from './UserItem';
import './UserList.css';

const UserList = ({ error, loading, data }) => {
  return (
    <div className="user-list-container">
      {error && <p>Error in search query</p>}
      {loading ? (
        <img className="loader-svg" src={puff} height="50px" alt="loader" />
      ) : data ? (
        <>
          <p className="result-counter">
            Showing <strong>{data.search.edges.length}</strong> results
          </p>
          <ul>
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
    </div>
  );
};

export default UserList;
