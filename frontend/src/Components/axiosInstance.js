import axios from 'axios';

// Create an instance of axios
const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
});

// Add a request interceptor
axiosInstance.interceptors.request.use(request => {
    if (request.data instanceof FormData) {
        console.log('FormData being sent:');
        for (let pair of request.data.entries()) {
            console.log(`${pair[0]}: ${pair[1]}`);
        }
    }
    return request;
}, error => {
    return Promise.reject(error);
});

export default axiosInstance;
