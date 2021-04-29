import { UnorderedList, ListItem, Link } from "@chakra-ui/react";
import nextLink from "next/link";
import { updateYield } from "typescript";
import { useUserContext } from "../../contexts/userContext";

export default function Links() {
  const [user] = useUserContext();
  return (
    <UnorderedList listStyleType="none" spacing="5" fontSize="xl" m="0">
      <ListItem>
        <Link href="/home" as={nextLink}>
          Home
        </Link>
      </ListItem>
      <ListItem>
        <Link href="/groups" as={nextLink}>
          Groups
        </Link>
      </ListItem>
      <ListItem>
        <Link href="/devices" as={nextLink}>
          Devices
        </Link>
      </ListItem>
      <ListItem>
        <Link href="/statistics" as={nextLink}>
          Statistics
        </Link>
      </ListItem>
      <ListItem>
        <Link href="/settings" as={nextLink}>
          Settings
        </Link>
      </ListItem>

      {user.role.name === "admin" && (
        <ListItem>
          <Link href="/admin" as={nextLink}>
            Add new user
          </Link>
        </ListItem>
      )}

      <ListItem>
        <Link href="/logout" as={nextLink}>
          Logout
        </Link>
      </ListItem>
    </UnorderedList>
  );
}
