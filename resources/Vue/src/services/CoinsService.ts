import { HTTPClient } from "../api/client";
import { ICryptoItem } from "../store/modules/Crypto";

class CoinsService {
  getAll(search?: string) {
    return HTTPClient.create().get<ICryptoItem[]>(`/coins${search ? `/${search.toLowerCase()}` : ''}`)
  }
}

export { CoinsService }