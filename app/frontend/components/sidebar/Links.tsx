import { UnorderedList, ListItem, Link } from "@chakra-ui/react";
import nextLink from "next/link";
import { useIsAdmin } from "../../hooks/useIsAdmin";

export default function Links() {
  const isAdmin = useIsAdmin();

  if (isAdmin) {
    return (
      <UnorderedList listStyleType="none" spacing="5" fontSize="xl" m="0">
        <ListItem>
          <Link href="/admin" as={nextLink}>
            Add new user
          </Link>
        </ListItem>

        <ListItem>
          <Link href="/changePassword" as={nextLink}>
            Change password
          </Link>
        </ListItem>

        <ListItem>
          <Link href="/logout" as={nextLink}>
            Logout
          </Link>
        </ListItem>
      </UnorderedList>
    );
  }

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

      <ListItem>
        <Link href="/changePassword" as={nextLink}>
          Change password
        </Link>
      </ListItem>

      <ListItem>
        <Link href="/logout" as={nextLink}>
          Logout
        </Link>
      </ListItem>
    </UnorderedList>
  );
}
