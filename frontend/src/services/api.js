import axios from 'axios';

const api = axios.create({
    baseURL: 'https://backend-semana-omnistack-7.herokuapp.com'
});

export default api;
