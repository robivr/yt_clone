import React, { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';

import styles from './Watch.module.css';
import Sidebar from '../Sidebar/Sidebar';

import numberToCommaString from '../../utils/numberToCommaString';
import numberToAbbreviatedString from '../../utils/numberToAbbreviatedString';
import dateToString from '../../utils/dateToString';
import Comments from './Comments';

interface VideoData {
  id: string | undefined;
  title: string;
  description: string;
  publishedAt: string;
  views: number;
  likes: number;
  dislikes: number;
  commentCount: number;
  uploader: {
    id: string;
    name: string;
    avatar: string;
    subscribers: number;
  };
}

interface WatchProps {
  sidebarOpen: boolean;
}

const API_URL = `https://www.googleapis.com/youtube/v3/videos?key=${process.env.REACT_APP_YT_API_KEY}`;
const API_CHANNEL_URL = `https://www.googleapis.com/youtube/v3/channels?key=${process.env.REACT_APP_YT_API_KEY}`;

const Watch = ({ sidebarOpen }: WatchProps) => {
  const [video, setVideo] = useState<VideoData>();

  let routeParams = useParams();

  useEffect(() => {
    const fetchVideo = async () => {
      if (!routeParams.videoId) {
        return <Navigate to="/" />;
      }

      const params = `&part=contentDetails, snippet, statistics, player&id=${routeParams.videoId}`;
      const result = await fetch(API_URL + params);
      const videoData = await result.json();

      console.log('watch', videoData.items);

      let currentVideo: VideoData = {
        id: routeParams.videoId,
        title: videoData.items[0].snippet.title,
        description: videoData.items[0].snippet.description,
        publishedAt: videoData.items[0].snippet.publishedAt,
        views: videoData.items[0].statistics.viewCount,
        likes: videoData.items[0].statistics.likeCount,
        dislikes: videoData.items[0].statistics.dislikeCount,
        commentCount: videoData.items[0].statistics.commentCount,
        uploader: {
          id: videoData.items[0].snippet.channelId,
          name: videoData.items[0].snippet.channelTitle,
          avatar: videoData.items[0].snippet.thumbnails.default.url,
          subscribers: videoData.items[0].statistics.subscriberCount,
        },
      };

      const channelParams = `&part=snippet, statistics&id=${currentVideo.uploader.id}`;
      const channelResult = await fetch(API_CHANNEL_URL + channelParams);
      const channelData = await channelResult.json();

      console.log(API_CHANNEL_URL + channelParams);

      console.log('channel', channelData.items);

      currentVideo.uploader.avatar =
        channelData.items[0].snippet.thumbnails.default.url;

      currentVideo.uploader.subscribers =
        channelData.items[0].statistics.subscriberCount;

      setVideo(currentVideo);

      document.title = currentVideo.title;
    };

    fetchVideo();
  }, [routeParams.videoId]);

  console.log('params', routeParams);

  // const handleDimClick = () => {};

  if (!routeParams.videoId) {
    return <Navigate to="/" />;
  }

  if (!video) {
    return null;
  }

  return (
    <div className={styles.watch}>
      <div
        className={
          styles.watch_sidebar + ' ' + (sidebarOpen ? '' : styles.hidden)
        }
      >
        <Sidebar isOpen={sidebarOpen} isHidden={true} />
        <div className={styles.dim}></div>
      </div>
      <div className={styles.main}>
        <iframe
          className={styles.player}
          width="1120"
          height="630"
          src={`https://www.youtube.com/embed/${video?.id}`}
          title="Video"
          allowFullScreen
        />
        <br></br>
      </div>
      <div className={styles.video_info}>
        <div className={styles.info_left}>
          <h1 className={styles.video_title}>{video?.title}</h1>
          <div>
            <span className={styles.views_margin}>
              {numberToCommaString(video?.views)} views
            </span>
            <span>{dateToString(video.publishedAt)}</span>
          </div>
        </div>
        <div className={styles.info_right}>
          <div className={styles.like_dislike}>
            <span className={styles.like}>
              <FaThumbsUp /> {numberToAbbreviatedString(video?.likes)}
            </span>
            <span className={styles.dislike}>
              <FaThumbsDown /> {numberToAbbreviatedString(video?.dislikes)}
            </span>
          </div>
        </div>
      </div>
      <div className={styles.video_description}>
        <div className={styles.channel_info}>
          <div className={styles.channel_info_left}>
            <img
              src={video?.uploader.avatar}
              alt="avatar"
              className={styles.avatar}
            />
            <div>
              <p className={styles.channel_name}>{video?.uploader.name}</p>
              <p className={styles.channel_subs}>
                {numberToAbbreviatedString(video.uploader.subscribers)}{' '}
                subscribers
              </p>
            </div>
          </div>
          <div className={styles.channel_info_right}>
            <button className={styles.subscribe_button}>subscribe</button>
          </div>
        </div>
      </div>
      <div>
        <Comments videoId={video.id} commentCount={video.commentCount} />
      </div>
    </div>
  );
};

export default Watch;
