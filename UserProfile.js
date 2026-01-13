// UserProfile.js
import React, { memo } from 'react';

const UserProfile = memo(({ user }) => {
  // Missing prop validation
  const { name, age, email } = user;
  
  return (
    <div className="user-profile">
      <h3>{name}</h3>
      <p>Age: {age}</p>
      <p>Email: {email}</p>
      <p>Status: {age >= 30 ? 'Senior' : 'Junior'}</p>
    </div>
  );
});

// Missing PropTypes definition
export default UserProfile;
