import { Avatar, Modal, MultiSelect } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { useState } from "react";

import { Button } from "./Button";

import { LogInNav } from "./LogInNav";

import { DISCUSSIONS_ENDPOINT } from "../constants/URL";

interface IProps {
  contacts: Iuser[];
  connectedUser: Iuser | null;
  setConnectedUser: (arg: Iuser | null) => void;
  getDiscussions: (arg: string) => void;
  setDiscussionMessages: (arg: Imessage[]) => void;
  setActiveDiscussion: (arg: Idiscussion | null) => void;
}

export const Navbar = ({
  contacts,
  connectedUser,
  setConnectedUser,
  getDiscussions,
  setDiscussionMessages,
  setActiveDiscussion,
}: IProps) => {
  const [contactsOpened, { open: contactsOpen, close: contactsClose }] =
    useDisclosure(false);

  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);

  const [desc, setDesc] = useState("");

  const createDiscussion = async (selectedContacts: string[]) => {
    const body = {
      contacts: [...selectedContacts, connectedUser?.id],
    };
    try {
      const response = await fetch(DISCUSSIONS_ENDPOINT, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        setSelectedContacts([]);
        setDesc("Discussion already exists");
        setTimeout(setDesc, 3000, "");
        throw new Error("Discussion already exists");
      }
      const data = await response.json();
      console.log("discussion data: ", data);
      if (connectedUser) getDiscussions(connectedUser.id);
      setSelectedContacts([]);
      contactsClose();
    } catch (err) {
      console.log(err);
    }
  };

  const logOut = () => {
    window.localStorage.removeItem("username");
    window.localStorage.removeItem("password");
    setTimeout(() => {
      setConnectedUser(null);
      setDiscussionMessages([]);
      setActiveDiscussion(null);
    }, 100);
  };

  return (
    <nav className="px-8 py-4 flex text-white">
      {!connectedUser && <LogInNav setConnectedUser={setConnectedUser} />}
      {connectedUser && (
        <>
          <section>
            <Button click={contactsOpen}>New Chat</Button>
            <Modal
              className="text-red-500"
              title={desc}
              opened={contactsOpened}
              onClose={contactsClose}
              centered
              size="40vw"
              styles={{
                content: { backgroundColor: "#121212" },
                header: { backgroundColor: "#121212" },
              }}
            >
              <div className="bg-primary p-6 rounded-lg text-white text-2xl h-[450px]">
                <MultiSelect
                  label="Contacts"
                  placeholder={
                    selectedContacts.length !== 0
                      ? ""
                      : "Please select a contact"
                  }
                  error
                  description="Select contacts"
                  data={contacts.map((contact) => {
                    return { value: contact.id, label: contact.name };
                  })}
                  dropdownOpened
                  size="lg"
                  style={{ backgroundColor: "transparent" }}
                  value={selectedContacts}
                  onChange={(selectedContacts) => {
                    setSelectedContacts(selectedContacts);
                  }}
                  clearable
                />
                <div className="flex justify-center text-2xl mt-[250px]">
                  <Button click={() => createDiscussion(selectedContacts)}>
                    Create Discussion
                  </Button>
                </div>
              </div>
            </Modal>
          </section>

          <section className="ml-auto flex items-center">
            <span className=" bg-light-blue py-2 px-4 rounded-lg">
              {connectedUser?.name}
            </span>
            <Avatar size="md" className="mx-4">
              {connectedUser?.name.charAt(0).toUpperCase()}
            </Avatar>
            <Button click={logOut}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                />
              </svg>
            </Button>
          </section>
        </>
      )}
    </nav>
  );
};
