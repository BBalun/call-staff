export interface IRequest {
  id: string;
  button: number;
  time: string;
  timeFinished: string | null;
  battery: number;
  deviceMac: string;
}
