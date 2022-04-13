import { AxiosError } from 'axios';
import { api } from '../modules/api';

const GetInfo = () => api.get('/info')

api.interceptors.response.use(res => res, (err: AxiosError) => {
  console.log(err.config.params)
})

api.get("/a", {
  params: {
    retry: false
  }
})

export { 
  GetInfo
}