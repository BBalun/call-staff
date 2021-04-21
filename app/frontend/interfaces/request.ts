export interface IRequest {
  id: string;
  button: number;
  time: Date;
  timeFinished: Date | null;
  battery: number;
  deviceMac: string;
}
