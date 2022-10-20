import React, { useEffect } from 'react';
import { useParams } from 'react-router';

import styles from './Search.module.css';
import SearchTile from './SearchTile';

const YT_SEARCH_URL = `https://www.googleapis.com/youtube/v3/search?key=${process.env.REACT_APP_YT_API_KEY}`;

interface SearchData {
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

const Search = () => {
  const [searchResults, setSearchResults] = React.useState<SearchData[]>([]);
  let routeParams = useParams();

  useEffect(() => {
    const fetchSearchResults = async () => {
      const response = await fetch(
        `${YT_SEARCH_URL}&q=${routeParams.searchParams}&part=snippet&type=video&maxResults=10`
      );
      const data = await response.json();
      console.log(data.items);

      const searchData = data.items.map((item: any) => {
        return {
          id: item.id.videoId,
          publishedAt: item.snippet.publishedAt,
          title: item.snippet.title,
          description: item.snippet.description,
          uploader: {
            id: item.snippet.channelId,
            name: item.snippet.channelTitle,
            avatar: item.snippet.thumbnails.default.url,
          },
          thumbnails: {
            default: {
              url: item.snippet.thumbnails.default.url,
            },
            medium: {
              url: item.snippet.thumbnails.medium.url,
            },
          },
        };
      });

      // setSearchResults(data.items);
      console.log('search data', searchData);
      setSearchResults(searchData);
    };

    fetchSearchResults();

    document.title = `${routeParams.searchParams} - FejkTube`;
  }, [routeParams.searchParams]);

  console.log('search route params:', routeParams.searchParams);

  // return (
  //   <div className={styles.search}>
  //     <h2>Search Results</h2>
  //     {searchResults.map((item) => (
  //       <div key={item.id + item.title} className={styles.result}>
  //         <img src={item.thumbnails.medium.url} alt={item.title} />
  //         <div className={styles.resultInfo}>
  //           <h3>{item.title}</h3>
  //           <p>{item.description}</p>
  //         </div>
  //       </div>
  //     ))}
  //   </div>
  // );

  return (
    <div className={styles.search}>
      <h2>Search Results</h2>
      {searchResults.map((item) => (
        <SearchTile key={item.id + item.title} {...item} />
      ))}
    </div>
  );
};

export default Search;
