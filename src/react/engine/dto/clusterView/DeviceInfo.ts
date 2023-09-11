import { Battery } from "./Battery";
import { Resources } from "./Resources";

export interface DeviceInfo {
  connectivity: boolean;
  state: {
    battery?: Battery;
    device?: {
      load?: Resources
      system?: Resources
    };
    vm?: {
      load?: Resources;
      system?: Resources;
    };
    status: string;
  }
}
