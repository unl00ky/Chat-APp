import { Avatar, Modal, MultiSelect } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { Button } from "./Button";
import { useState } from "react";

import { AUTHENTICATE_ENDPOINT, DISCUSSIONS_ENDPOINT } from "../constants/URL";

interface Iuser {
  id: string;
  name: string;
  password: string;
}

interface IProps {
  isLoggedIn: boolean;
  logFunction: (arg: boolean) => void;
  contacts: Iuser[];
  connectedUser: Iuser | undefined;
  setConnectedUser: (arg: Iuser | undefined) => void;
  getDiscussions: (arg: string | undefined) => void;
}

export const Navbar = ({
  isLoggedIn,
  logFunction,
  contacts,
  connectedUser,
  setConnectedUser,
  getDiscussions,
}: IProps) => {
  const [contactsOpened, { open: contactsOpen, close: contactsClose }] =
    useDisclosure(false);
  const [authOpened, { open: authOpen, close: authClose }] =
    useDisclosure(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [contactsSelected, setContactsSelected] = useState<string[]>([]);

  const logIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!username || !password) return;
    const body = {
      name: username,
      password: password,
    };

    const response = await fetch(AUTHENTICATE_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    if (!data) return;

    authClose();
    logFunction(true);
    setUsername("");
    setPassword("");

    setConnectedUser(data);
  };

  const logOut = () => {
    logFunction(false);
    setConnectedUser(undefined);
  };

  const createDiscussion = async (contacts: string[]) => {
    const body = {
      contacts: contacts,
    };
    console.log(body);
    const response = await fetch(DISCUSSIONS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    if (data) console.log(data);
    contactsClose();
    getDiscussions(connectedUser?.id);
  };

  return (
    <nav className="px-8 py-4 flex text-white">
      {/* left size */}
      {isLoggedIn && (
        <div>
          <Button click={contactsOpen}>New Chat</Button>
          <Modal
            opened={contactsOpened}
            onClose={contactsClose}
            title="Contacts"
            centered
            size="40vw"
          >
            <div className="bg-primary p-6 rounded-lg text-white text-2xl h-[450px]">
              <MultiSelect
                label="Contacts"
                placeholder={
                  contactsSelected.length !== 0 ? "" : "Please select a contact"
                }
                error
                description="Select contacts"
                data={contacts.map((contact) => {
                  return { value: contact.id, label: contact.name };
                })}
                dropdownOpened
                size="lg"
                style={{ backgroundColor: "transparent" }}
                onChange={(contactsSelected) => {
                  setContactsSelected(contactsSelected);
                }}
                clearable
              />
              <div className="flex justify-center text-2xl mt-[250px]">
                <Button click={() => createDiscussion(contactsSelected)}>
                  Create Discussion
                </Button>
              </div>
            </div>
          </Modal>
        </div>
      )}

      {/* right part ------------------------------------------------*/}
      {!isLoggedIn && (
        <div className="ml-auto">
          <Button click={authOpen}>Log in</Button>

          <Modal
            opened={authOpened}
            onClose={authClose}
            centered
            overlayProps={{
              color: "black",
            }}
          >
            <form
              action=""
              onSubmit={(e) => logIn(e)}
              className="text-white bg-primary p-8 rounded-lg text-xl"
            >
              <fieldset>
                <label htmlFor="username">Username</label>
                <div className="bg-secondary my-4 py-2 px-4 rounded-lg flex focus-within:outline outline-2 outline-offset-2">
                  <input
                    className="bg-transparent block w-full outline-none"
                    type="text"
                    id="username"
                    autoComplete="off"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>

                <p
                  className={`text-red-500 bg-light-blue py-2 px-4 rounded-lg mb-4 ${
                    !username ? "block" : "hidden"
                  }`}
                >
                  Please put your username up there
                </p>
              </fieldset>
              <fieldset>
                <label htmlFor="password">Password</label>
                <div className="bg-secondary my-4 py-2 px-4 rounded-lg flex items-center focus-within:outline outline-2 outline-offset-2">
                  <input
                    className="bg-transparent block w-full outline-none"
                    type={`${isPasswordVisible ? "text" : "password"}`}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div
                    className="ml-4 cursor-pointer"
                    onClick={() => setIsPasswordVisible((prev) => !prev)}
                  >
                    {!isPasswordVisible ? (
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
                          d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                      </svg>
                    ) : (
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
                          d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                        />
                      </svg>
                    )}
                  </div>
                </div>

                <p
                  className={`text-red-500 bg-light-blue py-2 px-4 rounded-lg mb-4 ${
                    !password ? "block" : "hidden"
                  }`}
                >
                  Please put your password up there
                </p>

                <input
                  className="w-full bg-white text-black py-2 px-4 rounded-lg font-bold transition-all active:scale-95"
                  type="submit"
                />
              </fieldset>
            </form>
          </Modal>
        </div>
      )}

      {isLoggedIn && (
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
      )}
    </nav>
  );
};
