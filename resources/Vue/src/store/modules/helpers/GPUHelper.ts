import { ICryptoItem } from "../Crypto";
import { IGPUItem, SelectedIGPUItem } from "../GPU";

class GPUHelper {
  static findAlgorithmByCoin(coin: ICryptoItem, device: SelectedIGPUItem) {
    return device.algorithms.find(algorithm => algorithm.key === coin.algorithm)
  }
}

export { GPUHelper }