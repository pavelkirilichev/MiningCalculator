import { HTTPClient } from "../api/client";
import { IGPUItem } from "../store/modules/GPU";

class GPUService {
  getAll() {
    return HTTPClient.create().get<IGPUItem[]>("/gpu")
  }
}

export { GPUService }