import { IGroup } from "./group";

export interface IDevice {
  macAddress: string;
  name: string;
  battery: number | null;
  establishmentId: string;
  groupId: string | null;
  group: IGroup | null;
}
