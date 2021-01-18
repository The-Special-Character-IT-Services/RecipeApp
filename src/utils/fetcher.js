import axios from './axios';

export default async (query, variables) => {
  const res = await axios.post('graphql', {
    query,
    variables,
  });
  return res.data.data;
};
