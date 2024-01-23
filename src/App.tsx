import { MantineProvider } from "@mantine/core";

import { theme } from "./theme";
import "@mantine/core/styles.css";

import { useEffect, useState } from "react";

// import { io } from "socket.io-client";

import { Navbar } from "./components/Navbar";
import { DiscussionsList } from "./components/DiscussionsList";
import { ChatWindow } from "./components/ChatWindow";

import {
  CONTACTS_ENDPOINT,
  DISCUSSIONS_ENDPOINT,
  MESSAGES_ENDPOINT,
  AUTHENTICATE_ENDPOINT,
} from "./constants/URL";

function App() {
  const [contacts, setContacts] = useState<Iuser[]>([]);

  const [connectedUser, setConnectedUser] = useState<Iuser | null>(null);
  const [userDiscussions, setUserDiscussions] = useState<Idiscussion[]>([]);
  const [activeDiscussion, setActiveDiscussion] = useState<Idiscussion | null>(
    null
  );

  const [discussionMessages, setDiscussionMessages] = useState<Imessage[]>([]);

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
    const url = `${DISCUSSIONS_ENDPOINT}/?user_id=${user_id}`;
    if (user_id === undefined) return;

    try {
      const response = await fetch(url);
      if (!response.ok)
        throw new Error("there was a problem at getting user discussion");
      const data = await response.json();
      setUserDiscussions(data);
    } catch (err) {
      console.error(err);
    }
  };

  const getMessages = async (discussion_id: string | undefined) => {
    const url = `${MESSAGES_ENDPOINT}/?discussion_id=${discussion_id}`;
    try {
      const response = await fetch(url);
      if (!response.ok)
        throw new Error("There was a problem when getting discussion messages");
      const data = await response.json();
      setDiscussionMessages(data);
    } catch (err) {
      console.log(err);
    }
  };
  // const url = `ws://localhost:8000`;

  // const socket = io(`http://localhost:8000/ws/${connectedUser?.id}`);
  // useEffect(() => {
  //   socket.on("connection", (connect: any) => {
  //     console.log("Connected", connect);
  //   });

  //   return () => {
  //     socket.disconnect();
  //   };
  // });

  const log = async (usernameSaved: string, passwordSaved: string) => {
    const body = {
      name: usernameSaved,
      password: passwordSaved,
    };
    try {
      const response = await fetch(AUTHENTICATE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!response.ok)
        throw new Error(
          "There was a problem when tryng to get the saved login data"
        );
      const data = await response.json();
      console.log("try this");
      setConnectedUser(data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    const usernameSaved = localStorage.getItem("username");
    const passwordSaved = localStorage.getItem("password");
    if (usernameSaved && passwordSaved) log(usernameSaved, passwordSaved);

    if (connectedUser) {
      getContacts();
      getDiscussions(connectedUser?.id);
      setDiscussionMessages([]);
      setActiveDiscussion(null);
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
          setDiscussionMessages={setDiscussionMessages}
          setActiveDiscussion={setActiveDiscussion}
        />
        <main className="mx-2 flex gap-2 h-[calc(100vh-10vh)]">
          <DiscussionsList
            connectedUser={connectedUser}
            userDiscussions={userDiscussions}
            setActiveDiscussion={setActiveDiscussion}
            getMessages={getMessages}
          />
          <ChatWindow
            connectedUser={connectedUser}
            discussionMessages={discussionMessages}
            activeDiscussion={activeDiscussion}
            getMessages={getMessages}
          />
        </main>
        ;
      </MantineProvider>
    </>
  );
}

export default App;
