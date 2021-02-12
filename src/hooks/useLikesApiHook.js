export const likesQuery = (user, course) => `{
  likes(where : { user:${user}, course:${course} }){
    id
  }
}`;

export const b = 'b';
