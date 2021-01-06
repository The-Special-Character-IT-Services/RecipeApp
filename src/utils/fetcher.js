import axios from './axios';

export default async resource => {
  const res = await axios.request({
    resource,
  });
  return res.data;
};
