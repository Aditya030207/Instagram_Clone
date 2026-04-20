import React, { useRef } from 'react';
import Story from './Story';
import './Story-Style.css';

function Stories() {
  const scrollRef = useRef(null);

  // Added 10 users to ensure there is plenty to slide through
  const users = [
    { id: 1, name: 'aditya_sh', img: 'https://placecats.com/300/300' },
    { id: 2, name: 'rahul_nst', img: 'https://placecats.com/301/301' },
    { id: 3, name: 'priya.v', img: 'https://placecats.com/302/302' },
    { id: 4, name: 'sneha_k', img: 'https://placecats.com/303/303' },
    { id: 5, name: 'vikram.v', img: 'https://placecats.com/304/304' },
    { id: 6, name: 'ishaan_d', img: 'https://placecats.com/305/305' },
    { id: 7, name: 'ananya_r', img: 'https://placecats.com/306/306' },
    { id: 8, name: 'kabir_v', img: 'https://placecats.com/307/307' },
    { id: 9, name: 'sanya_m', img: 'https://placecats.com/308/308' },
    { id: 10, name: 'aryan_z', img: 'https://placecats.com/309/309' },
  ];

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      // Moves the slider by about 3 circles worth of space
      const moveAmount = direction === 'left' ? -260 : 260;
      scrollRef.current.scrollBy({ left: moveAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="stories-container-main">
      <button className="nav-btn left-btn" onClick={() => handleScroll('left')}>‹</button>
      
      <div className="stories-wrapper" ref={scrollRef}>
        {users.map((user) => (
          <Story key={user.id} image={user.img} username={user.name} />
        ))}
      </div>

      <button className="nav-btn right-btn" onClick={() => handleScroll('right')}>›</button>
    </div>
  );
}

export default Stories;