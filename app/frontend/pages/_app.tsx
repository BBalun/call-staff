import "../styles/global.css";
import { ChakraProvider } from "@chakra-ui/react";
import { UserContext } from "../contexts/userContext";
import { IUser } from "../interfaces/user";
import { useState } from "react";

function App({ Component, pageProps }) {
  const [user, setUser] = useState<IUser>(null);
  return (
    <ChakraProvider>
      <UserContext.Provider value={[user, setUser]}>
        <Component {...pageProps} />
      </UserContext.Provider>
    </ChakraProvider>
  );
}

export default App;
