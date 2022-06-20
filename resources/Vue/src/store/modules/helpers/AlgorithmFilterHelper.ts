import { ICryptoItem } from "../Crypto"
import { IGPUItem } from "../GPU"

const whiteList = ['Ethash', 'Etchash', 'SHA-256', 'BCD']

function filterCryptoByAlgorithm(array: ICryptoItem[]) {
  // return array.filter(el => whiteList.some(alg => el.algorithm.toLowerCase() === alg.toLowerCase()))
  return array
}

function filterGpuByAlgorithm(array: IGPUItem[]) {
  // return array.filter(el => {
  //   const algs = el.algorithms.map(alg => alg.key)
  //   algs.some(alg => whiteList.map(al => al.toLowerCase()).includes(alg.toLowerCase()))
  // })
  return array
}

export { filterCryptoByAlgorithm, filterGpuByAlgorithm }