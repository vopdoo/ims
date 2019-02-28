import axios from 'axios';

axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL;

const access_token = sessionStorage.getItem('access_token');
const token_type = sessionStorage.getItem('token_type');

if (access_token) {
    axios.defaults.headers.Authorization = `${token_type} ${access_token}`;
}

export {
    axios
}
