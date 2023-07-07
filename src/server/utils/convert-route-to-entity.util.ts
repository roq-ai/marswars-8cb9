const mapping: Record<string, string> = {
  comments: 'comment',
  debaters: 'debater',
  organizations: 'organization',
  posts: 'post',
  users: 'user',
  videos: 'video',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
