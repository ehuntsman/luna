import axios from 'axios';

export const getUserInfo = function() {
  return axios.get('http://localhost:3000/myteam')
  .then(res => {console.log(res, "am I console logging?"); return res.data})
}