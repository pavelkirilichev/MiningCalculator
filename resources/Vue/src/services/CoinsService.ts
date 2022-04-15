import { HTTPClient } from "../api/client";
import { ICryptoItem } from "../store/modules/Crypto";

class CoinsService {
  getAll() {
    return HTTPClient.create().get<ICryptoItem[]>("/coins")
  }
}

export { CoinsService }