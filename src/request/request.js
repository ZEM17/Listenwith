import axios from 'axios'

const request = axios.create({
	timeout: 5000,
	headers: {
		'Content-Type': 'application/json',
	},
})

const token = localStorage.getItem('token') || ''

request.interceptors.request.use(
	(config) => {
	  config.headers.Authorization = `Bearer ${token}`;
	  return config;
	},
	(error) => {
	  return Promise.reject(error);
	}
  );
  
export default request
