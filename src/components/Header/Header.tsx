import React from 'react';
import { FaSearch, FaBars, FaVideo, FaTh, FaRegBell } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

import styles from './Header.module.css';

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Header = ({ sidebarOpen, setSidebarOpen }: HeaderProps) => {
  const [search, setSearch] = React.useState('');
  const navigate = useNavigate();

  const searchClickHandler = () => {
    console.log('search');
  };

  const sidebarHandler = () => {
    console.log('sidebar is now', !sidebarOpen);
    setSidebarOpen(!sidebarOpen);
  };

  const searchChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const searchKeyPressHandler = (e: React.FormEvent) => {
    e.preventDefault();

    console.log('search', search);

    navigate(`/search/${search}`);
  };

  return (
    <div className={styles.header}>
      <div className={styles.header_left}>
        <FaBars className={styles.menu} onClick={sidebarHandler} />
        <span className={styles.logo}></span>
        <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
          <span className={styles.logo_name}>FejkTube</span>
        </Link>
      </div>
      <div id={styles.search}>
        <form id={styles.search_form} onSubmit={searchKeyPressHandler}>
          <div className={styles.form_inner}>
            <input
              type="text"
              placeholder="Search"
              className={styles.form_input}
              value={search}
              onChange={searchChangeHandler}
            />
          </div>
        </form>
        <button className={styles.search_button} onClick={searchClickHandler}>
          <FaSearch className={styles.search_icon} />
        </button>
      </div>
      <div className={styles.header_right}>
        <FaVideo className={styles.header_right_icon} />
        <FaTh className={styles.header_right_icon} />
        <FaRegBell className={styles.header_right_icon} />
        <span className={styles.user_icon}>U</span>
      </div>
    </div>
  );
};

export default Header;
