import React from 'react';
import { Link } from 'react-router-dom';

import timeSince from '../../utils/utils';

import styles from './SearchTile.module.css';

interface SearchTileProps {
  id: string;
  publishedAt: string;
  title: string;
  description: string;
  uploader: {
    id: string;
    name: string;
    avatar: string;
  };
  thumbnails: {
    default: {
      url: string;
    };
    medium: {
      url: string;
    };
  };
}

const SearchTile = (props: SearchTileProps) => {
  return (
    <Link to={`/watch/${props.id}`} className={styles.tile__inner}>
      <div className={styles.tile}>
        <img src={props.thumbnails.medium.url} alt={props.title} />
        <div className={styles.tile__info}>
          <div className={styles.tile__info__title}>{props.title}</div>
          <div className={styles.tile__info__date}>
            {timeSince(props.publishedAt)}
          </div>
          <div className={styles.tile__info__uploader}>
            {/* <img src={props.uploader.avatar} alt={props.uploader.name} /> */}
            <div>by {props.uploader.name}</div>
          </div>
          <div className={styles.tile__info__description}>
            {props.description}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SearchTile;
