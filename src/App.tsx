import { MantineProvider } from "@mantine/core";

import { theme } from "./theme";
import "@mantine/core/styles.css";

import { useEffect, useState } from "react";

import { Navbar } from "./components/Navbar";
import { DiscussionsList } from "./components/DiscussionsList";
import { ChatWindow } from "./components/ChatWindow";

import {
  CONTACTS_ENDPOINT,
  DISCUSSIONS_ENDPOINT,
  // MESSAGES_ENDPOINT,
} from "./constants/URL";

interface Iuser {
  id: string;
  name: string;
  password: string;
}
interface Idiscussion {
  id?: string;
  contacts: [];
  name?: string;
  group_name?: string;
  status?: string;
}

function App() {
  const [connectedUser, setConnectedUser] = useState<Iuser>();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [contacts, setContacts] = useState<Iuser[]>([]);
  const [userDiscussions, setUserDiscussions] = useState<Idiscussion[]>([]);
  const [selectedDiscussion, setSelectedDiscussion] = useState<Idiscussion>();
  // const [userMessages, setUserMessages] = useState([]);

  const getContacts = async () => {
    const response = await fetch(CONTACTS_ENDPOINT);
    const data = await response.json();
    setContacts(data);
  };

  const getDiscussions = async (user_id: string | undefined) => {
    const correctURL = `${DISCUSSIONS_ENDPOINT}/?user_id=${user_id}`;

    const response = await fetch(correctURL);
    const data = await response.json();
    setUserDiscussions(data);
  };
  // const getMessages = async (discusson_id: string | undefined) => {
  //   const response = await fetch(MESSAGES_ENDPOINT);
  //   const data = await response.json();
  //   setUserMessages(data);
  // };

  useEffect(() => {
    if (connectedUser !== undefined) {
      getContacts();
      getDiscussions(connectedUser?.id);
    }
  }, [connectedUser]);
  return (
    <>
      <MantineProvider theme={theme}>
        <Navbar
          isLoggedIn={isLoggedIn}
          logFunction={setIsLoggedIn}
          contacts={contacts}
          connectedUser={connectedUser}
          setConnectedUser={setConnectedUser}
          getDiscussions={getDiscussions}
        />
        <main className="mx-2 flex gap-2 h-[calc(100vh-10vh)]">
          <DiscussionsList
            isLoggedIn={isLoggedIn}
            userDiscussions={userDiscussions}
          />
          <ChatWindow isLoggedIn={isLoggedIn} />
        </main>
      </MantineProvider>
    </>
  );
}

export default App;
