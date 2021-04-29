import { Center, Container } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { IRequest } from "../../interfaces/request";
import { getRequests } from "../../utils/getRequests";
import Request from "./request";
import RequestListOptions from "./requestListOptions";

export default function RequestList() {
  const [groupId, setGroupId] = useState<string>(null);
  const [requests, setRequests] = useState<IRequest[]>([]); // TODO change request

  useEffect(() => {
    const timer = setInterval(async () => {
      const [ok, newRequests, msg] = await getRequests(groupId); // TODO catch error
      if (!ok) {
        alert(msg); // TODO
        return;
      }
      setRequests(newRequests);
    }, 1000);

    return function cleanUp() {
      clearInterval(timer);
    };
  }, [groupId]);

  return (
    <>
      <Container minW="85%" centerContent>
        <Center h="100vh" w="100%" bg="blackAlpha.100" d="flex" flexDirection="column">
          <RequestListOptions setGroupId={setGroupId} />
          {requests.map((request) => {
            return <Request {...request} key={request.id} />;
          })}
        </Center>
      </Container>
    </>
  );
}
