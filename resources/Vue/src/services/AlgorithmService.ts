import { HTTPClient } from "../api/client";

class AlgorithmService {
  getByIdArray(ids: string[]) {
    const formData = new FormData()
    ids.forEach(id => {
      formData.append('id[]', id)
    })
    return HTTPClient.create().post<any[]>(`algorithm/hardware`, formData)
  }
}

export { AlgorithmService }