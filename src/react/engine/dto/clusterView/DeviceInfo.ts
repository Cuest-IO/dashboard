import { Battery, Resources } from "../common";

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
    status?: string;
  }
}
