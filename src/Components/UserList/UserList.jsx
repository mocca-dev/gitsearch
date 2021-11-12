import React from 'react';
import './UserList.css';

const UserList = ({ error, loading, data }) => {
  return (
    <div className="user-list-container">
      {error && <p>Error in search query</p>}
      {loading ? (
        <p>Loading...</p>
      ) : data ? (
        <>
          <p className="result-counter">{data.search.edges.length} results</p>
          <ul>
            {data?.search.edges.map(
              (node, i) =>
                node.node.login && (
                  <li key={node.node.login + i}>{node.node.login}</li>
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
