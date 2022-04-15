import { AxiosError, AxiosRequestConfig } from 'axios';
import { api } from '../modules/api';

interface JSONResponse<T> {
  data?: T
}

class HTTPClient {
  static create() {
    return new HTTPClient
  }

  private _request<T = any>(url: string, options?: AxiosRequestConfig): Promise<{ status: true, data: T } | { status: false, error: string }> {
    const req = api.request<T>({
      ...options,
      url,
    })

    return req.then(res => {
      const { data } = res
      
      if (data) {
        return {
          status: true,
          data
        }
      }
      else {
        return {
          status: false,
          error: 'no data'
        }
      }
    })
  }

  get<T = any>(url: string, options?: AxiosRequestConfig) {
    return this._request<T>(url, {
      ...options,
      method: "GET"
    })
  }
  
  post<T = any, D = any>(url: string, data: D, options?: AxiosRequestConfig) {
    return this._request<T>(url, {
      ...options,
      method: 'POST',
      data
    })
  }
}

export { HTTPClient }