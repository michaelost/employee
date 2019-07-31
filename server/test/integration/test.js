const axios = require('axios');
const config = require('../../config/config');
console.log('config', config);

const { authServer } = config;

const userData = {
  username: 'mi',
  password: '123'
}
const baseUrl = config.authServer;


axios.post(`${baseUrl}/register`, userData)
  .then(response => {
    axios.post(`${baseUrl}/login`, userData)
      .then(response => {
        const { token } = response.data.user;
        console.log('token', token);
      })
  })
  .then(response => {

  })
  .catch(error => {
    console.log(error);
  });


