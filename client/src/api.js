import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api', // ensure server port matches
});

export default api;
