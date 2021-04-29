import { Center, Container, Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { IRequest } from "../../interfaces/request";
import { getRequests } from "../../utils/getRequests";
import { getSettings } from "../../utils/getSettings";
import Request from "./request";
import RequestListOptions from "./requestListOptions";

export default function RequestList() {
  const [groupId, setGroupId] = useState<string>(null);
  const [requests, setRequests] = useState<IRequest[]>([]);
  const [buttons, setButtons] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  async function onLoad() {
    const [ok, data, msg] = await getSettings();
    if (!ok) {
      alert(msg);
      return;
    }
    setButtons([data.button1, data.button2, data.button3, data.button4, data.button5]);
  }

  useEffect(() => {
    onLoad();
  }, []);

  useEffect(() => {
    const timer = setInterval(async () => {
      const [ok, newRequests, msg] = await getRequests(groupId);
      if (!ok) {
        alert(msg); // TODO
        return;
      }
      setRequests(newRequests);
      setLoading(false);
    }, 1000);

    return function cleanUp() {
      clearInterval(timer);
      setLoading(true);
    };
  }, [groupId]);

  return (
    <>
      <Container minW="85%" centerContent h="100vh" d="flex" flexDirection="column" pt="28">
        <Box w="100%" d="flex" justifyContent="flex-end">
          <RequestListOptions setGroupId={setGroupId} />
        </Box>
        <Box d="flex" flexDirection="row">
          {loading && <div>Loading ...</div>}
          {!loading &&
            requests.map((req) => {
              // id: string; button: string; time: string; name: string;
              return (
                <Box m="2" key={req.id} textAlign="center" p="2">
                  <Request
                    key={req.id}
                    id={req.id}
                    buttonName={buttons[req.button - 1]}
                    time={req.time}
                    deviceName={req.device.name}
                  />
                </Box>
              );
            })}
        </Box>
      </Container>
    </>
  );
}
