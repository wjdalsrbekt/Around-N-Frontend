import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:9997/board',
  headers: {
    'Content-type': 'application/json',
  },
});
