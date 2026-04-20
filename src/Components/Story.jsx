import React from 'react';
import './Story-Style.css';

function Story({ image, username }) {
  return (
    <div className="story">
      <div className="story-img">
        <img src={image} alt={username} />
      </div>
      <p>{username}</p>
    </div>
  );
}

export default Story;