import axios from './axios';

export default async (query, variables, response) => {
  const res = await axios.post('graphql', {
    query,
    variables,
  });

  if (response) {
    return res.data.data[response];
  }
  return res.data.data;
};
