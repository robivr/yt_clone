import React from 'react';
import { FaHome, FaRegCompass } from 'react-icons/fa';
import { BsFillCollectionPlayFill } from 'react-icons/bs';

import styles from './Sidebar.module.css';

interface SidebarProps {
  isOpen: boolean;
  isHidden?: boolean;
}

const Sidebar = ({ isOpen, isHidden }: SidebarProps) => {
  if (!isOpen && isHidden) {
    return null;
  }

  return (
    <div
      className={styles.sidebar + ' ' + (isOpen ? '' : styles.sidebar_small)}
    >
      <div className={styles.sidebar_item}>
        <FaHome className={styles.sidebar_icon} />
        <div
          className={styles.sidebar_text + ' ' + (isOpen ? '' : styles.hidden)}
        >
          Home
        </div>
      </div>
      <div className={styles.sidebar_item}>
        <FaRegCompass className={styles.sidebar_icon} />
        <p
          className={styles.sidebar_text + ' ' + (isOpen ? '' : styles.hidden)}
        >
          Explore
        </p>
      </div>
      <div className={styles.sidebar_item}>
        <BsFillCollectionPlayFill className={styles.sidebar_icon} />
        <p
          className={styles.sidebar_text + ' ' + (isOpen ? '' : styles.hidden)}
        >
          Subscriptions
        </p>
      </div>
      <hr className={styles.sidebar_hr + ' ' + (isOpen ? '' : styles.hidden)} />
    </div>
  );
};

export default Sidebar;
