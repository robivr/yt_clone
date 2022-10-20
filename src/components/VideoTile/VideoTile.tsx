import React from 'react';
import { Link } from 'react-router-dom';

import Video from '../../types/Video';
import styles from './VideoTile.module.css';

import numberToAbbreviatedString from '../../utils/numberToAbbreviatedString';
import timeSince from '../../utils/utils';

const VideoTile = (props: { video: Video }) => {
  return (
    <div className={styles.video_tile}>
      <Link
        to={`/watch/${props.video.id}`}
        className={styles.video_tile__inner}
      >
        <img src={props.video.snippet.thumbnails.high.url} alt="" />
        <h4 className={styles.video_tile__metadata}>
          {props.video.snippet.title}
        </h4>
        <p
          className={`${styles.video_tile__metadata} ${styles.video_tile__sublink}`}
        >
          {props.video.snippet.channelTitle}
        </p>
        <p className={styles.video_tile__metadata}>
          <span className={styles.video_tile__margin}>
            {numberToAbbreviatedString(props.video.statistics.viewCount)} views
          </span>
          {timeSince(props.video.snippet.publishedAt)} ago
        </p>
      </Link>
    </div>
  );
};

export default VideoTile;
