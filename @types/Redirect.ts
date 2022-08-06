export type Redirect = {
  to: {
    url: string;
    cached_url: string;
    linktype: 'url' | 'story';
  };
  from: {
    url: string;
    cached_url: string;
    linktype: 'url' | 'story';
  };
  status: 200 | 301 | 302 | 404;
};
