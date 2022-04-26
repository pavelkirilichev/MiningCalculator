import { HTTPClient } from "../api/client";
import { ICryptoItem } from "../store/modules/Crypto";

class CoinsService {
  getAll(search?: string) {
    return HTTPClient.create().get<ICryptoItem[]>(`/coins${search ? `/filter/${search.toLowerCase()}` : ''}`)
  }

  getByAlgorithmArray(algorithms: string[]) {
    const formData = new FormData()
    algorithms.forEach(item => {
      formData.append('algorithm[]', item)
    })

    return HTTPClient.create().post<any[]>(`coins/algorithm`, formData)
  }
}

export { CoinsService }