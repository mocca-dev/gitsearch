import React from 'react';
import { useLocation } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  const location = useLocation();
  const { user } = location.state;
  const { repositories, followers, following } = user;

  return (
    <div className="profile-container">
      <h3>{user?.name}</h3>
      <img src={user.avatarUrl} alt="ProfilePic" />
      <div>
        Repos: {repositories.edges.length} | Followers: {followers.edges.length}{' '}
        | Following: {following.edges.length}{' '}
      </div>
    </div>
  );
};

export default Profile;
