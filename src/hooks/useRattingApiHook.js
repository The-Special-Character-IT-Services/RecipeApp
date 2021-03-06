export const rattingQuery = (pageIndex, limit, sort = 'id:ASC', where = '{}') => `{
    courses(
      start: ${pageIndex * 10},
      limit: ${limit}, 
      sort: "${sort}", 
      where: ${where}) {
      id
      rattings{
          id
          ratting
      }
    }
  }`;

export default null;
