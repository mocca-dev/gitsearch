import React from 'react';
import UserItem from './UserItem';
import './UserList.css';

const UserList = ({ error, loading, data }) => {
  return (
    <div className="user-list-container">
      {error && <p>Error in search query</p>}
      {loading ? (
        <p>Loading...</p>
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
        <p className="no-result">There are no results</p>
      )}
    </div>
  );
};

export default UserList;
