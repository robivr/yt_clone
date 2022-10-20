const timeSince = (datetime: string) => {
  // const date = new Date(datetime);
  // const now = new Date();
  // const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  // const minutes = Math.floor(seconds / 60);
  // const hours = Math.floor(minutes / 60);
  // const days = Math.floor(hours / 24);

  // if (days > 0) {
  //   return `${days}d`;
  // } else if (hours > 0) {
  //   return `${hours}h`;
  // } else if (minutes > 0) {
  //   return `${minutes}m`;
  // } else {
  //   return `${seconds}s`;
  // }

  const seconds = Math.floor((new Date().getTime() - new Date(datetime).getTime()) / 1000);
  let interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return interval + " years";
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + " months";
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + " days";
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + " hours";
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + " minutes";
  }
  return Math.floor(seconds) + " seconds";
}

export default timeSince;
