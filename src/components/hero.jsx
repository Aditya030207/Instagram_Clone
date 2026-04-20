import { useState, useEffect } from 'react';
import '/src/components/hero.css';


const appData = {
  usernames: ['dog_lover', 'adiarra073', 'canine_king', 'stan_mc', 'damon0302'],
  likes: [124, 89, 432, 91, 560]
};

const names = appData.usernames;

function getLikes(index) {
  return appData.likes[index % appData.likes.length];
}

const Stories_comp = ({ images }) => {
  return (
    <div className='stories-container'>
      {images && images.map((img, i) => (
        <div key={i} className='story-item'>
          <div className='grad-ring'>
            <img src={img} alt="story" className='story-pic' />
          </div>
          <span className='username-item'>{names[i % names.length]}</span>
        </div>
      ))}
    </div>
  )
}

const Post_comp = ({ src, index }) => {
  const user = names[index];
  const dp = src;
  const likes = getLikes(index);

  return (
    <div className='post-container'>
      <div className='post-header'>
        <img src={dp} alt="dp" className='post-dp' />
        <span className='post-user'>{user}</span>
      </div>

      <div className='img-box'>
        <img src={src} alt="post" className='main-pic' loading="lazy" />
      </div>

      <div className='reactions-container'>
        <span className='item' style={{ cursor: 'pointer', fontSize: '24px' }}>
          🤍
        </span>
        <span className='item' style={{ cursor: 'pointer', fontSize: '24px' }}>
          💬
        </span>
        <span className='item' style={{ cursor: 'pointer', fontSize: '24px' }}>
          ↗️
        </span>
      </div>

      <div className='likes-item'>
        {likes.toLocaleString()} likes
      </div>
    </div>
  )
}

const Feed_comp = ({ pics }) => {
  return (
    <div className='feed-container'>
      {pics && pics.map((p, i) => (
        <Post_comp key={i} src={p} index={i} />
      ))}
    </div>
  )
}

const Hero = () => {
  const [topPics, SetTopPics] = useState([]);
  const [mainPics, SetMainPics] = useState([]);

  useEffect(() => {
    const loadImages = async () => {
      try {
        const res1 = await fetch('https://dog.ceo/api/breeds/image/random/8');
        const data1 = await res1.json();
        console.log("got stories data", data1);
        if (data1.status === 'success') {
          SetTopPics(data1.message);
        }

        const res2 = await fetch('https://dog.ceo/api/breeds/image/random/5');
        const data2 = await res2.json();
        if (data2.status === 'success') {
          SetMainPics(data2.message);
        }
      } catch (e) {
        console.error("Failed to fetch images:", e);
      }
    };
    loadImages();
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <main className="main-content" style={{ width: '100%' }}>
        <Stories_comp images={topPics} />
        <Feed_comp pics={mainPics} />
      </main>
    </div>
  )
}

export default Hero
