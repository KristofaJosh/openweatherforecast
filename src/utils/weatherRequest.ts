import axios from 'axios';

const weatherRequest = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    timeout: 10000,
    params: {
        q: 'abuja,ng',
        cnt: 40,
        appid: process.env.REACT_APP_APPID,
    },
});

export default weatherRequest;
