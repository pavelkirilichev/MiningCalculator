import { ICryptoItem, ISelectedCryptoItem } from "../Crypto";
import { IGPUItem, SelectedIGPUItem } from "../GPU";

class CryptoHelper {
  static findCoinByDevices(coins: ISelectedCryptoItem[], devices: IGPUItem[]) {
    return coins.filter(coin => devices.every(device => device.algorithms.some(alg => alg.key === coin.algorithm)))
  }
}

export { CryptoHelper }