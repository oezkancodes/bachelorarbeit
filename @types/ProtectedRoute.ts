export type ProtectedRoute = {
  route: {
    url: string;
    cached_url: string;
    linktype: 'url' | 'story';
  };
  username: string;
  password: string;
};
