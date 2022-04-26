import { HTTPClient } from "../api/client";
import { IGPUItem } from "../store/modules/GPU";

class GPUService {
  getAll(search?: string) {
    return HTTPClient.create().get<IGPUItem[]>(`/hardware${search ? `/filter/${search.toLowerCase()}` : ''}`)
  }
}

export { GPUService }