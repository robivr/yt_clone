import React, { useEffect, useState } from 'react';

import numberToCommaString from '../../utils/numberToCommaString';
import styles from './Comments.module.css';

interface CommentsProps {
  videoId: string | undefined;
  commentCount: number | undefined;
}

interface Comment {
  id: string;
  author: string;
  text: string;
}

const API_URL = `https://www.googleapis.com/youtube/v3/commentThreads?key=${process.env.REACT_APP_YT_API_KEY}`;

const Comments = (props: CommentsProps) => {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const fetchComments = async () => {
      const response = await fetch(
        `${API_URL}&part=snippet&videoId=${props.videoId}`
      );
      const data = await response.json();
      console.log(data.items);

      const comments = data.items.map((item: any) => {
        return {
          id: item.id,
          author: item.snippet.topLevelComment.snippet.authorDisplayName,
          text: item.snippet.topLevelComment.snippet.textDisplay,
        };
      });

      setComments(comments);
    };

    fetchComments();
  }, [props.videoId]);

  if (!props.commentCount) {
    return null;
  }

  return (
    <div className={styles.comments}>
      <p>{numberToCommaString(props.commentCount)} comments</p>
      {comments.map((comment: Comment) => {
        return (
          <div key={comment.id}>
            <h3>{comment.author}</h3>
            <p className={styles.comment__text}>{comment.text}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Comments;
