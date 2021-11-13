import React from 'react';
import { Link } from 'react-router-dom';
import './UserItem.css';

const UserItem = ({ user }) => {
  return (
    <Link to="/profile" state={{ user }}>
      <li className="user-card-container">
        <span className="left-column">
          <span className="user-name">
            <strong> {user.name}</strong>
          </span>
          <span className="user-login">{user.login}</span>
          <span className="user-email">{user.email}</span>
        </span>
        <span className="right-column">
          <img src={user.avatarUrl} alt="" />
        </span>
      </li>
    </Link>
  );
};

export default UserItem;
