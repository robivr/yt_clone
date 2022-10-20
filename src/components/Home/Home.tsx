import React, { useEffect, useState } from 'react';

import VideoTile from '../VideoTile/VideoTile';
import Video from '../../types/Video';
import styles from './Home.module.css';
import Sidebar from '../Sidebar/Sidebar';

const API_URL = `https://www.googleapis.com/youtube/v3/videos?key=${process.env.REACT_APP_YT_API_KEY}`;

interface HomeProps {
  sidebarOpen: boolean;
}

const Home = ({ sidebarOpen }: HomeProps) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    document.title = 'FejkTube';
  }, []);

  useEffect(() => {
    const fetchVideos = async () => {
      const params =
        '&part=contentDetails, snippet, statistics&chart=mostPopular&maxResults=30';
      const result = await fetch(API_URL + params);
      const videoData = await result.json();

      console.log('home', videoData.items);

      setVideos(videoData.items);
    };

    fetchVideos();
  }, []);

  return (
    <div className={styles.home}>
      <Sidebar isOpen={sidebarOpen} />
      <div className={styles.container}>
        {videos.map((video: Video) => (
          <VideoTile key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
};

export default Home;
