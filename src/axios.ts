import Axios from 'axios';

export const axios = Axios.create({
  baseURL: import.meta.env.VITE_BO_URL,
});
