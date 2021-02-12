export const likesQuery = (user, course) => `{
    courses(where : {like_event : { user:${user}, course:${course} }}){
      id
    }
  }`;

export const b = 'b';
