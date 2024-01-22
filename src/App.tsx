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

function App() {
  const [contacts, setContacts] = useState<Iuser[]>([]);

  const [connectedUser, setConnectedUser] = useState<Iuser>();
  const [userDiscussions, setUserDiscussions] = useState<Idiscussion[]>([]);
  // const [userMessages, setUserMessages] = useState([]);
  // const [discussionMessages, setDiscussionMessages] = useState([]);

  const getContacts = async () => {
    try {
      const response = await fetch(CONTACTS_ENDPOINT);
      if (!response.ok)
        throw new Error("There was an error when tryng to get contacts");
      const data = await response.json();
      setContacts(data);
    } catch (err) {
      console.error(err);
    }
  };

  const getDiscussions = async (user_id: string | undefined) => {
    const correctURL = `${DISCUSSIONS_ENDPOINT}/?user_id=${user_id}`;

    try {
      const response = await fetch(correctURL);
      if (!response.ok)
        throw new Error("there was a problem at getting user discussion");
      const data = await response.json();
      setUserDiscussions(data);
    } catch (err) {
      console.error(err);
    }
  };

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
          connectedUser={connectedUser}
          setConnectedUser={setConnectedUser}
          contacts={contacts}
          getDiscussions={getDiscussions}
        />
        <main className="mx-2 flex gap-2 h-[calc(100vh-10vh)]">
          <DiscussionsList
            connectedUser={connectedUser}
            userDiscussions={userDiscussions}
            setDiscussionMessages={setDiscussionMessages}
          />
          <ChatWindow connectedUser={connectedUser} />
        </main>
        ;
      </MantineProvider>
    </>
  );
}

export default App;
