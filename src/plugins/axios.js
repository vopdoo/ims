import axios from 'axios';

axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL;

axios.interceptors.request.use(
    config => {

        let access_token = sessionStorage.getItem('access_token');
        if(access_token) {
            let token_type = sessionStorage.getItem('token_type');
            config.headers.Authorization = `${token_type} ${access_token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export {
    axios
}
