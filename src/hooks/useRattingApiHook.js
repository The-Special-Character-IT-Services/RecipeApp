export const rattingQuery = (pageIndex, limit, sort = 'id:ASC', where = {}) => `{
    courses(sort: "${sort}", where: ${where}) {
      id
      rattings{
          id
          ratting
      }
     
    }
  }`;

export default null;
