import axios from './axios';

export default async (query, variables, response) => {
  console.log(query);
  const res = await axios.post('graphql', {
    query,
    variables,
  });
  console.log(response);
  if (response) {
    return res.data.data[response];
  }
  return res.data.data;
};
