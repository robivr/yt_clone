interface Thumbnail {
  url: string;
  width: number;
  height: number;
}

interface Video {
  id: string;
  snippet: {
    title: string;
    channelTitle: string;
    publishedAt: string;
    channelId: string;
    thumbnails: {
      default: Thumbnail;
      high: Thumbnail;
    };
  };
  contentDetails: {
    duration: string;
  };
  statistics: {
    commentCount: number;
    viewCount: number;
  };
}

export default Video;