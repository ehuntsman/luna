import axios from 'axios';

export const getUserInfo = function() {
  return axios.get('/api/myteam')
  .then(res => {console.log(res, "am I console logging?"); return res.data})
}