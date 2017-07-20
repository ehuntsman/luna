import axios from 'axios';

export const getUserInfo = function() {
  return axios.get('/api/myteam')
  .then(res => {return res.data})
}