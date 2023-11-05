import { Resources } from '../common'

export interface SystemLoadMessage {
  device: 'SYSTEM';
  info: {
    load?: Resources;
    system?: Resources;
  }
  time: number;
}
