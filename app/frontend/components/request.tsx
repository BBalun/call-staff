import { IRequest } from "../interfaces/request";

interface IRequestProps extends IRequest {}

export default function Request(props: IRequestProps) {
  return (
    <>
      <p>id: {props.id}</p>
      <p>button: {props.button}</p>
      <p>time: {props.time}</p>
    </>
  );
}
